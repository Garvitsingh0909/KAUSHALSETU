/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * KAUSHAL SETU — STUDENT PROFILE & SKILL PROFICIENCY BADGES (PHASE 5B)
 * Displays student identity, academic credentials, and visual badge indicators
 * for skill proficiency levels (Novice, Developing, Intermediate, Strong, Advanced)
 * calibrated from assessment data.
 */

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useProfile } from '../context/ProfileContext';
import { useAssessment } from '../context/AssessmentContext';
import { 
  Save, 
  User, 
  GraduationCap, 
  Building2, 
  Heart, 
  CheckCircle2, 
  Sparkles, 
  BookOpen,
  Award,
  ShieldCheck,
  Target,
  Compass,
  HelpCircle,
  Filter,
  Search,
  Plus,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  Sliders,
  ExternalLink,
  ArrowRight,
  Check,
  BarChart3,
  Layers,
  Zap,
  Info,
  Mail,
  Printer,
  Trash2,
  RefreshCw,
  FileText,
  Star,
  X,
  Moon,
  Sun
} from 'lucide-react';
import { ProficiencyBadge, normalizeProficiencyLevel, PROFICIENCY_CONFIGS, BadgeLevel } from '../components/profile/ProficiencyBadge';
import { SkillBadgeCard } from '../components/profile/SkillBadgeCard';
import { AssessmentDetailModal } from '../components/profile/AssessmentDetailModal';
import { IndicativeProficiency, EvidenceLevel } from '../data/assessmentTypes';
import { Proficiency } from '../data/skills';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { AnimatedNumber } from '../components/common/AnimatedNumber';
import { useTheme } from '../context/ThemeContext';
import { ThemeToggle } from '../components/ThemeToggle';

const SAMPLE_INTEREST_TAGS = [
  'Sustainable Energy', 'Robotics & IoT', 'Digital Arts & Media', 
  'Financial Tech', 'Community Healthcare', 'E-Commerce & Retail', 
  'EdTech & Mentoring', 'Handmade Crafts'
];

const ACADEMIC_GRADE_OPTIONS = [
  'Class 9 (Secondary Vocational)',
  'Class 10 (Secondary Vocational)',
  'Class 11 (Senior Secondary Vocational)',
  'Class 12 (Senior Secondary Vocational)',
  'Vocational ITI / Technical Certificate',
  'Polytechnic / Applied Diploma',
  'Undergraduate / Applied Sciences'
];

type FilterTab = 'all' | 'advanced' | 'intermediate' | 'novice' | 'unassessed';

export default function Profile() {
  const { 
    profile, 
    setProfile, 
    userSkills, 
    allSkills, 
    getSkillDetails, 
    addSkill, 
    updateProficiency,
    removeSkill,
    updateAssessedProficiency,
    triggerDemoMode,
    clearData
  } = useProfile();
  
  const { getLatestAttemptForSkill, saveAttempt } = useAssessment();
  const { theme, toggleTheme, isDark } = useTheme();
  const navigate = useNavigate();
  
  // Profile Form State
  const [formData, setFormData] = useState(profile);
  const [showEditForm, setShowEditForm] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Skill Badges Filter & Search State
  const [activeFilter, setActiveFilter] = useState<FilterTab>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAddSkillId, setSelectedAddSkillId] = useState('');
  const [selectedInitialLevel, setSelectedInitialLevel] = useState<Proficiency>('Intermediate');

  // Assessment Detail Modal State
  const [detailSkillId, setDetailSkillId] = useState<string | null>(null);

  // Quick Badge Simulator Drawer
  const [showSimulator, setShowSimulator] = useState(false);
  const [simSkillId, setSimSkillId] = useState<string>('');
  const [simLevel, setSimLevel] = useState<IndicativeProficiency>('Strong');
  const [simScore, setSimScore] = useState<number>(85);

  // Sync formData whenever profile changes in context
  useEffect(() => {
    setFormData(profile);
  }, [profile]);

  // Set default simulator target skill if not set
  useEffect(() => {
    if (!simSkillId) {
      if (userSkills.length > 0) {
        setSimSkillId(userSkills[0].skillId);
      } else if (allSkills.length > 0) {
        setSimSkillId(allSkills[0].id);
      }
    }
  }, [userSkills, allSkills, simSkillId]);

  // Show Toast Helper
  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  const toggleInterestTag = (tag: string) => {
    const current = formData.interests ? formData.interests.split(',').map(s => s.trim()).filter(Boolean) : [];
    const exists = current.includes(tag);
    let next: string[];
    if (exists) {
      next = current.filter(t => t !== tag);
    } else {
      next = [...current, tag];
    }
    setFormData(prev => ({ ...prev, interests: next.join(', ') }));
  };

  // Populate sample profile and populate demo assessed skills across all 5 tiers
  const fillSampleProfileWithBadges = () => {
    const sampleProfile = {
      name: 'Garvit Sharma',
      email: 'garvit.sharma@student.edu.in',
      role: 'Student' as const,
      schoolOrOrg: 'Delhi Public School, R.K. Puram (Vocational Wing)',
      academicGrade: 'Class 10 (Secondary Vocational)',
      interests: 'Robotics & IoT, Coding, Visual Design, Entrepreneurship'
    };
    
    setFormData(prev => ({ ...prev, ...sampleProfile }));
    triggerDemoMode();

    saveAttempt({
      id: 'demo-gd-1',
      skillId: 'graphic_design',
      skillName: 'Graphic Design & Branding',
      timestamp: '2026-03-12T10:30:00Z',
      indicativeProficiency: 'Advanced',
      evidenceLevel: 'High evidence',
      quizScore: { correct: 10, total: 10, percentage: 94 },
      totalRubricScore: 20,
      maxRubricScore: 20,
      strengths: [
        'Mastery over visual design principles, typography balance, and design systems.',
        'Practical portfolio items satisfy commercial client production standards.'
      ],
      areasToDevelop: [],
      gOneFeedback: 'Exceptional visual synthesis. Ready to take on commissioned brand identities and client deliverables.',
      comparisonWithSelfReport: 'Self-reported as Advanced; confirmed at Advanced (Tier 5) through rigorous assessment.',
      practicalTaskCompleted: true
    });

    saveAttempt({
      id: 'demo-code-1',
      skillId: 'coding',
      skillName: 'Coding & Web Development',
      timestamp: '2026-03-10T14:15:00Z',
      indicativeProficiency: 'Strong',
      evidenceLevel: 'High evidence',
      quizScore: { correct: 9, total: 10, percentage: 86 },
      totalRubricScore: 18,
      maxRubricScore: 20,
      strengths: [
        'Strong component-driven architecture and clean reactive state management.'
      ],
      areasToDevelop: [],
      gOneFeedback: 'Strong application capabilities. Ready for client website development and workflow automation.',
      comparisonWithSelfReport: 'Confirmed at Tier 4 (Strong).',
      practicalTaskCompleted: true
    });

    showToast('Loaded sample student profile & multi-tier verified badges!');
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(formData);
    showToast('Student profile information saved successfully!');
    setShowEditForm(false);
  };

  const handleResetProfile = () => {
    if (window.confirm('Reset student profile to a blank slate?')) {
      clearData();
      showToast('Profile reset to blank slate.');
    }
  };

  // Skills available to add
  const availableSkillsToAdd = useMemo(() => {
    const existingIds = new Set(userSkills.map(s => s.skillId));
    return allSkills.filter(s => s && !existingIds.has(s.id));
  }, [allSkills, userSkills]);

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAddSkillId) return;
    addSkill(selectedAddSkillId);
    updateProficiency(selectedAddSkillId, selectedInitialLevel);
    const addedSkill = getSkillDetails(selectedAddSkillId);
    showToast(`Added ${addedSkill?.name || 'skill'} to profile (${selectedInitialLevel})`);
    setSelectedAddSkillId('');
  };

  // Compute Badge Metrics
  const badgeMetrics = useMemo(() => {
    let advancedCount = 0;
    let strongCount = 0;
    let intermediateCount = 0;
    let developingCount = 0;
    let noviceCount = 0;
    let unassessedCount = 0;
    let totalScoreSum = 0;
    let assessedTotal = 0;

    userSkills.forEach(us => {
      const attempt = getLatestAttemptForSkill(us.skillId);
      const level = us.indicativeProficiency || attempt?.indicativeProficiency;
      const canonical = normalizeProficiencyLevel(level);

      const score = us.latestScorePercentage ?? attempt?.quizScore?.percentage;
      if (score !== undefined) {
        totalScoreSum += score;
        assessedTotal += 1;
      }

      switch (canonical) {
        case 'Advanced':
          advancedCount++;
          break;
        case 'Strong':
          strongCount++;
          break;
        case 'Intermediate':
          intermediateCount++;
          break;
        case 'Developing':
          developingCount++;
          break;
        case 'Novice':
          noviceCount++;
          break;
        default:
          unassessedCount++;
          break;
      }
    });

    const averageScore = assessedTotal > 0 ? Math.round(totalScoreSum / assessedTotal) : 0;
    const verifiedCount = advancedCount + strongCount + intermediateCount + developingCount + noviceCount;

    let highestTierLabel = 'None';
    if (advancedCount > 0) {
      highestTierLabel = 'Tier 5 · Advanced';
    } else if (strongCount > 0) {
      highestTierLabel = 'Tier 4 · Strong';
    } else if (intermediateCount > 0) {
      highestTierLabel = 'Tier 3 · Intermediate';
    } else if (developingCount > 0) {
      highestTierLabel = 'Tier 2 · Developing';
    } else if (noviceCount > 0) {
      highestTierLabel = 'Tier 1 · Novice';
    }

    return {
      totalSkills: userSkills.length,
      verifiedCount,
      unassessedCount,
      averageScore,
      advancedCount,
      strongCount,
      intermediateCount,
      developingCount,
      noviceCount,
      highestTierLabel
    };
  }, [userSkills, getLatestAttemptForSkill]);

  // Filter skills based on tab & search query
  const filteredSkills = useMemo(() => {
    return userSkills.filter(us => {
      const skill = getSkillDetails(us.skillId);
      const attempt = getLatestAttemptForSkill(us.skillId);
      const level = us.indicativeProficiency || attempt?.indicativeProficiency;
      const canonical = normalizeProficiencyLevel(level);

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const nameMatch = skill?.name.toLowerCase().includes(query) || us.skillId.toLowerCase().includes(query);
        const catMatch = skill?.category.toLowerCase().includes(query);
        const levelMatch = canonical.toLowerCase().includes(query);
        if (!nameMatch && !catMatch && !levelMatch) return false;
      }

      if (activeFilter === 'all') return true;
      if (activeFilter === 'advanced') return canonical === 'Advanced' || canonical === 'Strong';
      if (activeFilter === 'intermediate') return canonical === 'Intermediate';
      if (activeFilter === 'novice') return canonical === 'Developing' || canonical === 'Novice';
      if (activeFilter === 'unassessed') return canonical === 'Unassessed';
      return true;
    });
  }, [userSkills, activeFilter, searchQuery, getSkillDetails, getLatestAttemptForSkill]);

  const handleApplySimulatedAssessment = () => {
    if (!simSkillId) return;
    const targetSkill = getSkillDetails(simSkillId);
    const skillName = targetSkill?.name || simSkillId;
    const evidenceLevel: EvidenceLevel = simScore >= 80 ? 'High evidence' : simScore >= 60 ? 'Moderate evidence' : 'Limited evidence';
    const rubricScore = Math.round((simScore / 100) * 20);

    updateAssessedProficiency(simSkillId, simLevel, evidenceLevel, simScore, rubricScore);

    saveAttempt({
      id: `sim-${Date.now()}`,
      skillId: simSkillId,
      skillName,
      timestamp: new Date().toISOString(),
      indicativeProficiency: simLevel,
      evidenceLevel,
      quizScore: { correct: Math.round((simScore / 100) * 10), total: 10, percentage: simScore },
      totalRubricScore: rubricScore,
      maxRubricScore: 20,
      strengths: [
        `Demonstrates calibrated proficiency in ${skillName} foundational principles.`,
        `Practical execution rubric satisfied with ${rubricScore}/20 points.`
      ],
      areasToDevelop: [],
      gOneFeedback: `Calibrated assessment indicates solid ${simLevel} competency. Ready for practical deployment and vocational opportunity matching.`,
      comparisonWithSelfReport: `Assessment verified at ${simLevel} level.`,
      practicalTaskCompleted: true
    });

    showToast(`Calibrated badge for ${skillName} (${simLevel} • ${simScore}%)`);
  };

  const detailSkill = detailSkillId ? getSkillDetails(detailSkillId) : undefined;
  const detailUserSkill = detailSkillId ? userSkills.find(s => s.skillId === detailSkillId) : undefined;
  const detailAttempt = detailSkillId ? getLatestAttemptForSkill(detailSkillId) : undefined;

  return (
    <div className="space-y-7 max-w-6xl mx-auto animate-in fade-in duration-300 pb-16">
      
      {/* 1. STUDENT IDENTITY & ACADEMIC CREDENTIAL HEADER */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl shadow-xs border border-slate-200/90 dark:border-slate-800 overflow-hidden transition-colors">
        <div className="p-6 sm:p-7">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-4 sm:gap-5">
              {/* Monogram Avatar */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-slate-950 dark:bg-blue-600 text-white flex items-center justify-center text-xl sm:text-2xl font-bold font-heading shrink-0 shadow-xs">
                {profile?.name ? profile.name.charAt(0).toUpperCase() : 'G'}
              </div>

              {/* Identity & Academic Metadata */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium flex-wrap">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{profile?.role || 'Student'}</span>
                  <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">·</span>
                  <span>Vocational Track</span>
                  {badgeMetrics.verifiedCount > 0 && (
                    <>
                      <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">·</span>
                      <span className="font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        {badgeMetrics.verifiedCount}/{badgeMetrics.totalSkills} Badges Verified
                      </span>
                    </>
                  )}
                </div>

                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950 dark:text-white font-heading">
                  {profile?.name || 'Student Learner'}
                </h1>

                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-slate-500 dark:text-slate-400 pt-0.5">
                  <span className="text-slate-700 dark:text-slate-300 font-medium">{profile?.schoolOrOrg || 'Delhi Public School (Vocational Wing)'}</span>
                  {profile?.academicGrade && (
                    <>
                      <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">·</span>
                      <span>{profile.academicGrade}</span>
                    </>
                  )}
                  {profile?.email && (
                    <>
                      <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">·</span>
                      <span className="font-mono text-slate-500 dark:text-slate-400">{profile.email}</span>
                    </>
                  )}
                </div>

                {profile?.interests && (
                  <div className="text-xs text-slate-500 dark:text-slate-400 pt-1 flex items-center gap-1.5 flex-wrap">
                    <span className="text-slate-400 dark:text-slate-500 font-medium">Interests:</span>
                    <span>{profile.interests.split(',').map(s => s.trim()).join(' · ')}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex flex-wrap md:flex-col items-start md:items-end gap-2 shrink-0">
              <button
                type="button"
                onClick={fillSampleProfileWithBadges}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200/80 dark:hover:bg-slate-700 px-3.5 py-2 rounded-xl transition-colors btn-press"
                title="Populate authentic sample profile across badge tiers"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Auto-fill Sample & Badges</span>
              </button>

              <button
                type="button"
                onClick={() => setShowEditForm(!showEditForm)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 px-3.5 py-2 rounded-xl transition-colors btn-press"
              >
                <User className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                <span>{showEditForm ? 'Close Form' : 'Edit Profile Credentials'}</span>
                {showEditForm ? <ChevronUp className="w-3.5 h-3.5 text-slate-400" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-400" />}
              </button>

              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 px-3.5 py-2 rounded-xl transition-colors btn-press"
                title="Print or Export Portfolio Transcript"
              >
                <Printer className="w-3.5 h-3.5 text-slate-400" />
                <span>Export Transcript</span>
              </button>
            </div>
          </div>
        </div>

        {/* Collapsible Edit Profile Form */}
        {showEditForm && (
          <form onSubmit={handleProfileSubmit} className="p-6 sm:p-7 bg-slate-50/80 dark:bg-slate-800/40 border-t border-slate-200/80 dark:border-slate-800 space-y-5 animate-in slide-in-from-top-2 duration-200">
            <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-700 pb-3">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                <Sliders className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                Update Profile Credentials
              </h3>
              <span className="text-xs text-slate-500 dark:text-slate-400">Persisted locally in session</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-slate-400" /> Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-xs sm:text-sm"
                  placeholder="e.g. Garvit Sharma"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400" /> Email Address
                </label>
                <input
                  type="email"
                  value={formData.email || ''}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-xs sm:text-sm"
                  placeholder="e.g. garvit.sharma@student.edu.in"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-slate-400" /> Role
                </label>
                <select
                  required
                  value={formData.role}
                  onChange={e => setFormData({...formData, role: e.target.value as any})}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-xs sm:text-sm"
                >
                  <option value="Student">Student</option>
                  <option value="Parent">Parent</option>
                  <option value="Teacher">Teacher / Educator</option>
                  <option value="Judge">Evaluator / Judge</option>
                  <option value="Admin">Administrator</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-slate-400" /> Academic Grade / Stream
                </label>
                <select
                  value={formData.academicGrade || 'Class 10 (Secondary Vocational)'}
                  onChange={e => setFormData({...formData, academicGrade: e.target.value})}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-xs sm:text-sm"
                >
                  {ACADEMIC_GRADE_OPTIONS.map(gr => (
                    <option key={gr} value={gr}>{gr}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-slate-400" /> School / Organization
                </label>
                <input
                  type="text"
                  required
                  value={formData.schoolOrOrg}
                  onChange={e => setFormData({...formData, schoolOrOrg: e.target.value})}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-xs sm:text-sm"
                  placeholder="e.g. Delhi Public School, R.K. Puram"
                />
              </div>

              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-slate-400" /> Areas of Interest & Curiosity
                </label>
                <textarea
                  rows={2}
                  value={formData.interests}
                  onChange={e => setFormData({...formData, interests: e.target.value})}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-xs sm:text-sm resize-none"
                  placeholder="What topics or fields are you most curious about?"
                />

                <div className="pt-1.5 flex flex-wrap gap-1.5">
                  {SAMPLE_INTEREST_TAGS.map(tag => {
                    const current = formData.interests ? formData.interests.split(',').map(s => s.trim()) : [];
                    const isSelected = current.includes(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => toggleInterestTag(tag)}
                        className={`text-xs px-2.5 py-1 rounded-lg border transition-colors ${
                          isSelected 
                            ? 'bg-slate-900 dark:bg-blue-600 border-slate-900 dark:border-blue-600 text-white font-medium' 
                            : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                        }`}
                      >
                        {tag} {isSelected && '✓'}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-200/80 dark:border-slate-700">
              <button
                type="button"
                onClick={handleResetProfile}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Reset to Blank</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowEditForm(false)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-200/70 dark:hover:bg-slate-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-700 text-white text-xs font-semibold transition-colors btn-press"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Changes</span>
                </button>
              </div>
            </div>
          </form>
        )}
      </section>

      {/* 2. COMPETENCY OVERVIEW & METRICS */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl shadow-xs border border-slate-200/90 dark:border-slate-800 p-5 sm:p-6 space-y-5 transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight font-heading">
              Vocational Skill Proficiency Overview
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Assessment-supported competency records calibrated from practical tasks and knowledge rubrics.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowSimulator(!showSimulator)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 px-3 py-1.5 rounded-lg transition-colors shrink-0"
          >
            <Sliders className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
            <span>Badge Calibrator</span>
            {showSimulator ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* 4 Key Metric Tiles */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-3.5 rounded-xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-1">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">Verified Badges</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-bold text-slate-900 dark:text-white font-heading tabular-nums">
                <AnimatedNumber value={badgeMetrics.verifiedCount} />
              </span>
              <span className="text-xs text-slate-400 font-medium">/ {badgeMetrics.totalSkills} skills</span>
            </div>
            <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium block">
              {badgeMetrics.unassessedCount === 0 ? 'All skills verified' : `${badgeMetrics.unassessedCount} pending verification`}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-1">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">Highest Competency</span>
            <span className="text-base font-bold text-slate-900 dark:text-white font-heading block truncate">
              {badgeMetrics.highestTierLabel}
            </span>
            <span className="text-[11px] text-amber-600 dark:text-amber-400 font-medium block">
              {badgeMetrics.advancedCount > 0 ? `${badgeMetrics.advancedCount} at Tier 5 Expert` : 'Progression active'}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-1">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">Average Assessment Score</span>
            <span className="text-2xl font-bold text-slate-900 dark:text-white font-heading tabular-nums block">
              {badgeMetrics.averageScore > 0 ? (
                <AnimatedNumber value={badgeMetrics.averageScore} suffix="%" />
              ) : (
                '—'
              )}
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium block">
              Across {badgeMetrics.verifiedCount} evaluated skills
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-1">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">Upper Tier Fluency</span>
            <span className="text-base font-bold text-slate-900 dark:text-white font-heading block">
              {badgeMetrics.advancedCount + badgeMetrics.strongCount > 0 ? 'High Fluency' : 'Foundational'}
            </span>
            <span className="text-[11px] text-blue-600 dark:text-blue-400 font-medium block">
              {badgeMetrics.advancedCount + badgeMetrics.strongCount} in upper tiers (T4–T5)
            </span>
          </div>
        </div>

        {/* Collapsible Badge Level Simulator */}
        {showSimulator && (
          <div className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 animate-in slide-in-from-top-2 duration-200 space-y-3 mt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-slate-700 dark:text-slate-300" />
                <h4 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm font-heading">
                  Evaluator Badge Calibrator
                </h4>
              </div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                Testing Sandbox
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Simulate an assessment attempt to verify dynamic badge tier stars, score gauges, and diagnostic history.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Target Skill
                </label>
                <select
                  value={simSkillId}
                  onChange={e => setSimSkillId(e.target.value)}
                  className="w-full text-xs font-medium bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg p-2 text-slate-800 dark:text-slate-200"
                >
                  <optgroup label="User Added Skills">
                    {userSkills.map(us => {
                      const sk = getSkillDetails(us.skillId);
                      return (
                        <option key={us.skillId} value={us.skillId}>
                          {sk?.name || us.skillId}
                        </option>
                      );
                    })}
                  </optgroup>
                  <optgroup label="All Catalog Skills">
                    {allSkills.map(sk => (
                      <option key={sk.id} value={sk.id}>
                        {sk.name} ({sk.category})
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Proficiency Tier
                </label>
                <select
                  value={simLevel}
                  onChange={e => {
                    const val = e.target.value as IndicativeProficiency;
                    setSimLevel(val);
                    if (val === 'Advanced') setSimScore(92);
                    else if (val === 'Strong') setSimScore(84);
                    else if (val === 'Intermediate') setSimScore(74);
                    else if (val === 'Developing') setSimScore(62);
                    else setSimScore(48);
                  }}
                  className="w-full text-xs font-medium bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg p-2 text-slate-800 dark:text-slate-200"
                >
                  <option value="Advanced">Tier 5: Advanced (90%+)</option>
                  <option value="Strong">Tier 4: Strong (80%+)</option>
                  <option value="Intermediate">Tier 3: Intermediate (70%+)</option>
                  <option value="Developing">Tier 2: Developing (60%+)</option>
                  <option value="Foundation">Tier 1: Novice / Foundation (&lt;60%)</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Quiz Score
                  </label>
                  <span className="font-mono text-xs font-semibold text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-900 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                    {simScore}%
                  </span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="100"
                  value={simScore}
                  onChange={e => setSimScore(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between gap-3 flex-wrap border-t border-slate-200/80 dark:border-slate-700">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Output:</span>
                <ProficiencyBadge
                  level={simLevel}
                  scorePercentage={simScore}
                  size="sm"
                  variant="badge"
                  showStars={true}
                  showScore={true}
                />
              </div>

              <button
                type="button"
                onClick={handleApplySimulatedAssessment}
                className="inline-flex items-center gap-1.5 bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors shadow-xs btn-press"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Apply Calibration</span>
              </button>
            </div>
          </div>
        )}
      </section>

      {/* 3. SKILL BADGES LISTING & CONTROLS */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl shadow-xs border border-slate-200/90 dark:border-slate-800 p-5 sm:p-7 space-y-6 transition-colors">
        
        {/* Segmented Filter Tabs & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
          <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-xl overflow-x-auto scrollbar-none gap-1">
            <button
              onClick={() => setActiveFilter('all')}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap",
                activeFilter === 'all' 
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-semibold shadow-xs" 
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              )}
            >
              All ({userSkills.length})
            </button>

            <button
              onClick={() => setActiveFilter('advanced')}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap flex items-center gap-1.5",
                activeFilter === 'advanced' 
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-semibold shadow-xs" 
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              )}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Advanced & Strong ({badgeMetrics.advancedCount + badgeMetrics.strongCount})</span>
            </button>

            <button
              onClick={() => setActiveFilter('intermediate')}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap flex items-center gap-1.5",
                activeFilter === 'intermediate' 
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-semibold shadow-xs" 
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              )}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              <span>Intermediate ({badgeMetrics.intermediateCount})</span>
            </button>

            <button
              onClick={() => setActiveFilter('novice')}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap flex items-center gap-1.5",
                activeFilter === 'novice' 
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-semibold shadow-xs" 
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              )}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
              <span>Developing & Novice ({badgeMetrics.developingCount + badgeMetrics.noviceCount})</span>
            </button>

            {badgeMetrics.unassessedCount > 0 && (
              <button
                onClick={() => setActiveFilter('unassessed')}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap",
                  activeFilter === 'unassessed' 
                    ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-semibold shadow-xs" 
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                )}
              >
                Needs Assessment ({badgeMetrics.unassessedCount})
              </button>
            )}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64 shrink-0">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search skill badges..."
              className="w-full pl-8 pr-7 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-xl text-xs focus:ring-2 focus:ring-slate-400 outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                title="Clear search"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Add Skill to Profile Row */}
        {availableSkillsToAdd.length > 0 && (
          <form onSubmit={handleAddSkill} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Plus className="w-4 h-4 text-slate-500 dark:text-slate-400 shrink-0" />
              <div>
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 block">
                  Add Skill to Profile
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  Select from {availableSkillsToAdd.length} curriculum disciplines
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
              <select
                value={selectedAddSkillId}
                onChange={e => setSelectedAddSkillId(e.target.value)}
                className="text-xs font-medium bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-1.5 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-slate-400 outline-none w-full sm:w-auto min-w-[200px]"
              >
                <option value="">-- Choose Skill to Add --</option>
                {availableSkillsToAdd.map(sk => (
                  <option key={sk.id} value={sk.id}>
                    {sk.name} ({sk.category})
                  </option>
                ))}
              </select>

              <select
                value={selectedInitialLevel}
                onChange={e => setSelectedInitialLevel(e.target.value as Proficiency)}
                className="text-xs font-medium bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-1.5 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-slate-400 outline-none w-full sm:w-auto"
                title="Declared self-reported proficiency"
              >
                <option value="Beginner">Beginner / Novice</option>
                <option value="Developing">Developing</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Strong">Strong</option>
                <option value="Advanced">Advanced</option>
              </select>

              <button
                type="submit"
                disabled={!selectedAddSkillId}
                className="inline-flex items-center justify-center gap-1 bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-semibold px-3.5 py-1.5 rounded-lg transition-colors shrink-0 btn-press"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </div>
          </form>
        )}

        {/* Empty State */}
        {userSkills.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 p-6 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-400 mx-auto flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">No Skills Added Yet</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto mt-1">
                Add skills from the vocational database or auto-load sample student credentials to view visual proficiency badges.
              </p>
            </div>
            <button
              onClick={fillSampleProfileWithBadges}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-700 text-white transition-colors shadow-sm btn-press"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Auto-load Sample Skills & Badges</span>
            </button>
          </div>
        ) : filteredSkills.length === 0 ? (
          <div className="text-center py-10 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
            <p className="text-xs font-bold text-slate-600 dark:text-slate-400">No skills match your current filter or search criteria.</p>
            <button
              onClick={() => { setActiveFilter('all'); setSearchQuery(''); }}
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline mt-2 inline-block"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredSkills.map(us => {
              const skill = getSkillDetails(us.skillId);
              const attempt = getLatestAttemptForSkill(us.skillId);
              return (
                <SkillBadgeCard
                  key={us.skillId}
                  userSkill={us}
                  skillDetails={skill}
                  latestAttempt={attempt}
                  onViewDetails={(id) => setDetailSkillId(id)}
                  onRemoveSkill={(id) => {
                    removeSkill(id);
                    showToast(`Removed ${skill?.name || id} from profile`);
                  }}
                />
              );
            })}
          </div>
        )}

        {/* Bottom Educational Note on Badges */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-start gap-2.5 text-xs text-slate-500 dark:text-slate-400">
          <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
          <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
            <strong className="text-slate-700 dark:text-slate-300">Vocational Standards:</strong> Proficiency levels range across five tiers—Novice (Tier 1), Developing (Tier 2), Intermediate (Tier 3), Strong (Tier 4), and Advanced (Tier 5). Badges are verified through objective knowledge checks and rubric-scored practical artifacts.
          </p>
        </div>
      </section>

      {/* 4. ASSESSMENT DETAIL MODAL */}
      <AssessmentDetailModal
        isOpen={Boolean(detailSkillId)}
        onClose={() => setDetailSkillId(null)}
        skill={detailSkill}
        userSkill={detailUserSkill}
        attempt={detailAttempt}
      />

      {/* 5. FLOATING CONFIRMATION TOAST */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 bg-slate-900 dark:bg-slate-800 text-white px-4 py-3 rounded-2xl shadow-xl border border-slate-700 flex items-center gap-2.5 text-xs font-bold"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
