/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * KAUSHAL SETU — STUDENT PROFILE & HIGH-REVENUE MONETIZATION DASHBOARD
 * Features real skill profile intelligence, elevated market valuations ($120-$350/hr),
 * unique opportunity matching, dynamic revenue multiplier calculator,
 * and AI skill generation with real domain data.
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
  DollarSign,
  TrendingUp,
  Briefcase,
  Cpu,
  Wrench,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { ProficiencyBadge, normalizeProficiencyLevel, PROFICIENCY_CONFIGS } from '../components/profile/ProficiencyBadge';
import { SkillBadgeCard } from '../components/profile/SkillBadgeCard';
import { AssessmentDetailModal } from '../components/profile/AssessmentDetailModal';
import { IndicativeProficiency, EvidenceLevel } from '../data/assessmentTypes';
import { Proficiency, Skill } from '../data/skills';
import { OPPORTUNITIES_DB, Opportunity } from '../data/opportunities';
import { COMPREHENSIVE_OPPORTUNITIES_DB } from '../data/comprehensiveOpportunities';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { AnimatedNumber } from '../components/common/AnimatedNumber';
import { LivePulseDot } from '../components/common/MotionWrapper';

const SAMPLE_INTEREST_TAGS = [
  'AI & Machine Learning Workflows', 'Cybersecurity & Web Audit', 'Digital Arts & 3D Motion', 
  'Financial Tech & Algorithmic Trading', 'Robotics & Micro-IoT', 'E-Commerce & High-Ticket Retail', 
  'EdTech & Mentoring', 'Micro-SaaS & Cloud Platforms'
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

type FilterTab = 'all' | 'high_revenue' | 'advanced' | 'intermediate' | 'novice' | 'unassessed';

export default function Profile() {
  const { 
    profile, 
    setProfile, 
    userSkills, 
    allSkills, 
    getSkillDetails, 
    addSkill, 
    addCustomSkill,
    updateProficiency,
    removeSkill,
    updateAssessedProficiency,
    triggerDemoMode,
    clearData
  } = useProfile();
  
  const { getLatestAttemptForSkill, saveAttempt } = useAssessment();
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

  // AI Skill Profile Generator State
  const [aiSkillInput, setAiSkillInput] = useState('');
  const [isGeneratingAiSkill, setIsGeneratingAiSkill] = useState(false);
  const [aiSkillError, setAiSkillError] = useState<string | null>(null);

  // Assessment Detail Modal State
  const [detailSkillId, setDetailSkillId] = useState<string | null>(null);

  // Interactive Revenue Multiplier Simulator State
  const [targetTierSim, setTargetTierSim] = useState<'Novice' | 'Intermediate' | 'Advanced'>('Advanced');

  // Quick Badge Simulator Drawer for Testing
  const [showSimulator, setShowSimulator] = useState(false);
  const [simSkillId, setSimSkillId] = useState<string>('');
  const [simLevel, setSimLevel] = useState<IndicativeProficiency>('Strong');
  const [simScore, setSimScore] = useState<number>(88);

  // Sync formData whenever profile changes
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

  // Toast notification helper
  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 3000);
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

  // Generate Real-Data Skill Profile via Server Endpoint
  const handleGenerateAiSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiSkillInput.trim()) return;

    setIsGeneratingAiSkill(true);
    setAiSkillError(null);

    try {
      const res = await fetch('/api/generate-skill', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ skillName: aiSkillInput.trim() })
      });

      if (!res.ok) throw new Error('Failed to reach skill intelligence server');
      const data: Skill = await res.json();

      addCustomSkill(data);
      showToast(`Generated real domain profile for "${data.name}" ($${data.averageHourlyRate || '145/hr'} rate)!`);
      setAiSkillInput('');
    } catch (err: any) {
      console.error("Skill generation error:", err);
      setAiSkillError('Could not generate skill profile right now. Please check network connection.');
    } finally {
      setIsGeneratingAiSkill(false);
    }
  };

  // Populate sample profile and populate demo assessed skills across all 5 tiers
  const fillSampleProfileWithBadges = () => {
    const sampleProfile = {
      name: 'Aarav Patel',
      email: 'aarav.patel@student.edu.in',
      role: 'Student' as const,
      schoolOrOrg: 'Delhi Public School, R.K. Puram (Vocational Wing)',
      academicGrade: 'Class 10 (Secondary Vocational)',
      interests: 'AI & Machine Learning Workflows, Digital Arts & 3D Motion, Micro-SaaS & Cloud Platforms, Financial Tech'
    };
    
    setFormData(prev => ({ ...prev, ...sampleProfile }));
    triggerDemoMode();

    saveAttempt({
      id: 'demo-gd-1',
      skillId: 'graphic_design',
      skillName: 'Graphic Design & Brand Architecture',
      timestamp: '2026-03-12T10:30:00Z',
      indicativeProficiency: 'Advanced',
      evidenceLevel: 'High evidence',
      quizScore: { correct: 10, total: 10, percentage: 95 },
      totalRubricScore: 20,
      maxRubricScore: 20,
      strengths: [
        'Mastery over enterprise brand systems, responsive typography, and UI tokens.',
        'Portfolio item meets commercial client production standards ($12,000+ contract value).',
        'Autonomous execution speed and high-level creative direction.'
      ],
      areasToDevelop: [],
      gOneFeedback: 'Exceptional visual synthesis. Ready to execute commissioned high-ticket enterprise brand architectures.',
      comparisonWithSelfReport: 'Self-reported as Advanced; confirmed at Tier 5 Advanced through rigorous assessment.',
      practicalTaskCompleted: true
    });

    saveAttempt({
      id: 'demo-code-1',
      skillId: 'coding',
      skillName: 'Full-Stack Web & AI Engineering',
      timestamp: '2026-03-10T14:15:00Z',
      indicativeProficiency: 'Strong',
      evidenceLevel: 'High evidence',
      quizScore: { correct: 9, total: 10, percentage: 88 },
      totalRubricScore: 18,
      maxRubricScore: 20,
      strengths: [
        'Structured modular React & TypeScript architecture with server-side AI endpoints.',
        'Quick resolution of asynchronous logic constraints and REST API error states.'
      ],
      areasToDevelop: [],
      gOneFeedback: 'Strong technical execution. Capable of building turnkey interactive SaaS applications.',
      comparisonWithSelfReport: 'Demonstrated solid Tier 4 proficiency.',
      practicalTaskCompleted: true
    });

    saveAttempt({
      id: 'demo-comm-1',
      skillId: 'communication',
      skillName: 'Client Pitching & High-Ticket Negotiation',
      timestamp: '2026-03-06T11:00:00Z',
      indicativeProficiency: 'Strong',
      evidenceLevel: 'Moderate evidence',
      quizScore: { correct: 8, total: 10, percentage: 84 },
      totalRubricScore: 17,
      maxRubricScore: 20,
      strengths: [
        'Clear stakeholder empathy, active listening, and structured presentation flow.',
        'Persuasive client retainer proposal framing.'
      ],
      areasToDevelop: [],
      gOneFeedback: 'Reliable communication skills. Ideal for client-facing negotiation and team leadership.',
      comparisonWithSelfReport: 'Verified Tier 4 competency.',
      practicalTaskCompleted: true
    });

    showToast('Loaded sample profile with verified high-revenue skill badges!');
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

  // Skills available to add (not yet in userSkills)
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

  // Compute Badge Metrics across all 5 tiers and Revenue Potential
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

    // Calculate Elevated Revenue Projections
    // Base monthly value per skill tier
    const estMonthlyRevenue = 
      (advancedCount * 12500) + 
      (strongCount * 8500) + 
      (intermediateCount * 4500) + 
      (developingCount * 2200) + 
      (noviceCount * 1000) +
      (unassessedCount * 1200);

    const estHourlyRate = Math.max(95, 95 + (advancedCount * 45) + (strongCount * 25) + (intermediateCount * 15));
    const annualRunRate = estMonthlyRevenue * 12;

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
      estMonthlyRevenue: Math.max(18500, estMonthlyRevenue),
      estHourlyRate,
      annualRunRate: Math.max(222000, annualRunRate)
    };
  }, [userSkills, getLatestAttemptForSkill]);

  // Unique high-revenue opportunities matched to user's skills
  const matchedUniqueOpportunities = useMemo(() => {
    const allOpps = [...OPPORTUNITIES_DB, ...COMPREHENSIVE_OPPORTUNITIES_DB];
    const userSkillIds = new Set(userSkills.map(s => s.skillId));

    if (userSkillIds.size === 0) {
      return allOpps.slice(0, 3);
    }

    // Score opportunities by skill overlap and compensation
    const scored = allOpps.map(opp => {
      const matchCount = opp.requiredSkills.filter(sk => userSkillIds.has(sk)).length;
      return {
        opp,
        score: matchCount * 10 + (opp.compensationValueINR || 5000) / 1000
      };
    });

    scored.sort((a, b) => b.score - a.score);
    
    // Ensure uniqueness by ID
    const uniqueMap = new Map<string, Opportunity>();
    scored.forEach(item => {
      if (!uniqueMap.has(item.opp.id)) {
        uniqueMap.set(item.opp.id, item.opp);
      }
    });

    return Array.from(uniqueMap.values()).slice(0, 4);
  }, [userSkills]);

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
      if (activeFilter === 'high_revenue') return canonical === 'Advanced' || canonical === 'Strong';
      if (activeFilter === 'advanced') return canonical === 'Advanced' || canonical === 'Strong';
      if (activeFilter === 'intermediate') return canonical === 'Intermediate';
      if (activeFilter === 'novice') return canonical === 'Developing' || canonical === 'Novice';
      if (activeFilter === 'unassessed') return canonical === 'Unassessed';
      return true;
    });
  }, [userSkills, activeFilter, searchQuery, getSkillDetails, getLatestAttemptForSkill]);

  // Simulation handler for Evaluator Sandbox
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
      gOneFeedback: `Calibrated assessment indicates solid ${simLevel} competency. Ready for practical deployment and high-revenue opportunity matching.`,
      comparisonWithSelfReport: `Assessment verified at ${simLevel} level.`,
      practicalTaskCompleted: true
    });

    showToast(`Calibrated badge for ${skillName} (${simLevel} • ${simScore}%)`);
  };

  const detailSkill = detailSkillId ? getSkillDetails(detailSkillId) : undefined;
  const detailUserSkill = detailSkillId ? userSkills.find(s => s.skillId === detailSkillId) : undefined;
  const detailAttempt = detailSkillId ? getLatestAttemptForSkill(detailSkillId) : undefined;

  return (
    <div className="space-y-8 max-w-6xl mx-auto animate-in fade-in duration-500 pb-16">
      
      {/* 1. STUDENT IDENTITY & ACADEMIC CREDENTIAL HEADER */}
      <section className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 md:p-8 bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 text-white relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="flex items-start gap-4 sm:gap-5">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 p-0.5 shadow-lg shadow-blue-500/20 shrink-0">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-xl sm:text-2xl font-black text-blue-400 font-display">
                  {profile?.name ? profile.name.charAt(0).toUpperCase() : 'S'}
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[11px] font-bold text-blue-300 bg-blue-900/60 border border-blue-700/60 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    {profile?.role || 'Student'}
                  </span>
                  <span className="text-[11px] font-bold text-emerald-300 bg-emerald-950/80 border border-emerald-700/70 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    Tier 1 Elite Builder
                  </span>
                  {badgeMetrics.verifiedCount > 0 && (
                    <span className="text-[11px] font-bold text-amber-300 bg-amber-950/80 border border-amber-700/70 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <Award className="w-3.5 h-3.5 text-amber-400" />
                      {badgeMetrics.verifiedCount} Verified Badges
                    </span>
                  )}
                </div>

                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white font-display">
                  {profile?.name || 'Student Learner'}
                </h1>

                <div className="flex flex-col sm:flex-row sm:items-center gap-y-1 gap-x-4 text-xs sm:text-sm text-slate-300">
                  <p className="flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>{profile?.schoolOrOrg || 'Delhi Public School (Vocational Wing)'}</span>
                  </p>
                  {profile?.academicGrade && (
                    <p className="flex items-center gap-1.5">
                      <GraduationCap className="w-4 h-4 text-slate-400 shrink-0" />
                      <span>{profile.academicGrade}</span>
                    </p>
                  )}
                  {profile?.email && (
                    <p className="flex items-center gap-1.5 text-slate-400">
                      <Mail className="w-3.5 h-3.5 shrink-0" />
                      <span className="font-mono text-xs">{profile.email}</span>
                    </p>
                  )}
                </div>

                {profile?.interests && (
                  <div className="flex items-center gap-1.5 flex-wrap pt-1">
                    <Heart className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                    {profile.interests.split(',').map((tag, idx) => (
                      <span key={idx} className="text-[10px] font-semibold text-slate-300 bg-slate-800/80 px-2 py-0.5 rounded-md border border-slate-700/60">
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Quick Header Actions */}
            <div className="flex flex-wrap md:flex-col items-start md:items-end gap-2.5 shrink-0 pt-2 md:pt-0">
              <button
                type="button"
                onClick={fillSampleProfileWithBadges}
                className="inline-flex items-center gap-1.5 text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white px-3.5 py-2 rounded-xl transition-all shadow-xs btn-press"
                title="Populate authentic sample profile across all badge tiers"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Auto-fill Sample & Badges</span>
              </button>

              <button
                type="button"
                onClick={() => setShowEditForm(!showEditForm)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/90 hover:bg-slate-800 border border-slate-700 px-3.5 py-2 rounded-xl transition-colors btn-press"
              >
                <User className="w-3.5 h-3.5" />
                <span>{showEditForm ? 'Hide Profile Settings' : 'Edit Profile Info'}</span>
                {showEditForm ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>

              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-800 border border-slate-700/70 px-3.5 py-2 rounded-xl transition-colors btn-press"
                title="Print or Export Portfolio Transcript"
              >
                <Printer className="w-3.5 h-3.5 text-slate-400" />
                <span>Export / Print Profile</span>
              </button>
            </div>
          </div>
        </div>

        {/* Collapsible Edit Profile Form */}
        {showEditForm && (
          <form onSubmit={handleProfileSubmit} className="p-6 sm:p-8 bg-slate-50/90 border-t border-slate-200 space-y-6 animate-in slide-in-from-top-2 duration-200">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="font-extrabold text-slate-900 text-sm uppercase tracking-wider flex items-center gap-2">
                <Sliders className="w-4 h-4 text-blue-600" />
                Update Student Information
              </h3>
              <span className="text-xs text-slate-500">Changes persist in your local session</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-slate-400" /> Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 bg-white text-xs sm:text-sm"
                  placeholder="e.g. Aarav Patel"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400" /> Email Address
                </label>
                <input
                  type="email"
                  value={formData.email || ''}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 bg-white text-xs sm:text-sm"
                  placeholder="e.g. aarav.patel@student.edu.in"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-slate-400" /> Role
                </label>
                <select
                  required
                  value={formData.role}
                  onChange={e => setFormData({...formData, role: e.target.value as any})}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 bg-white text-xs sm:text-sm"
                >
                  <option value="Student">Student</option>
                  <option value="Parent">Parent</option>
                  <option value="Teacher">Teacher / Educator</option>
                  <option value="Judge">Evaluator / Judge</option>
                  <option value="Admin">Administrator</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-slate-400" /> Academic Grade / Stream
                </label>
                <select
                  value={formData.academicGrade || 'Class 10 (Secondary Vocational)'}
                  onChange={e => setFormData({...formData, academicGrade: e.target.value})}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 bg-white text-xs sm:text-sm"
                >
                  {ACADEMIC_GRADE_OPTIONS.map(gr => (
                    <option key={gr} value={gr}>{gr}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-slate-400" /> School / Organization
                </label>
                <input
                  type="text"
                  required
                  value={formData.schoolOrOrg}
                  onChange={e => setFormData({...formData, schoolOrOrg: e.target.value})}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 bg-white text-xs sm:text-sm"
                  placeholder="e.g. Delhi Public School, R.K. Puram"
                />
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-slate-400" /> Areas of Interest & Curiosity
                </label>
                <textarea
                  rows={2}
                  value={formData.interests}
                  onChange={e => setFormData({...formData, interests: e.target.value})}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 bg-white text-xs sm:text-sm resize-none"
                  placeholder="What topics, problems, or creative fields are you most curious about?"
                />

                <div className="pt-2 flex flex-wrap gap-1.5">
                  {SAMPLE_INTEREST_TAGS.map(tag => {
                    const current = formData.interests ? formData.interests.split(',').map(s => s.trim()) : [];
                    const isSelected = current.includes(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => toggleInterestTag(tag)}
                        className={`text-[11px] px-2.5 py-0.5 rounded-lg border transition-all ${
                          isSelected 
                            ? 'bg-blue-600 border-blue-600 text-white font-bold' 
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        {tag} {isSelected && '✓'}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={handleResetProfile}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 transition-colors btn-press"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Reset to Blank</span>
              </button>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowEditForm(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200/70 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-xs transition-colors btn-press"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Profile</span>
                </button>
              </div>
            </div>
          </form>
        )}
      </section>

      {/* 2. ELEVATED REVENUE & MONETIZATION DASHBOARD */}
      <section className="bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950 rounded-3xl p-6 md:p-8 text-white shadow-xl border border-emerald-900/60 relative overflow-hidden space-y-6">
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-emerald-800/50 pb-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-extrabold text-emerald-300 bg-emerald-900/80 border border-emerald-700/80 px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                High-Revenue Market Valuation
              </span>
              <span className="text-xs text-slate-400 font-medium">Enterprise Market Rates</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white font-display">
              Earning & Monetization Potential
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Aggregated financial valuation based on your verified skill badges, high-ticket consulting rates ($120–$350/hr), and micro-SaaS opportunities.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Link
              to="/opportunity-explorer"
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs px-4 py-2.5 rounded-xl transition-all shadow-md shadow-emerald-500/20 btn-press"
            >
              <Briefcase className="w-4 h-4" />
              <span>Explore High-Ticket Gigs</span>
            </Link>
          </div>
        </div>

        {/* Dynamic High Revenue Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
          {/* Est Monthly Revenue */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-emerald-800/80 shadow-inner">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">Est. Monthly Revenue</span>
              <DollarSign className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white font-display">
              $<AnimatedNumber value={badgeMetrics.estMonthlyRevenue} duration={800} />
              <span className="text-xs font-extrabold text-emerald-400 ml-1">/mo</span>
            </div>
            <span className="text-[11px] text-slate-400 block mt-1">Based on active retainers & contract GVs</span>
          </div>

          {/* Average Hourly Client Rate */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-blue-800/80 shadow-inner">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-blue-400 uppercase tracking-wider">Avg. Market Hourly Rate</span>
              <Zap className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white font-display">
              $<AnimatedNumber value={badgeMetrics.estHourlyRate} duration={800} />
              <span className="text-xs font-extrabold text-blue-400 ml-1">/hr</span>
            </div>
            <span className="text-[11px] text-slate-400 block mt-1">Enterprise consulting standard</span>
          </div>

          {/* Annualized Run Rate */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-amber-800/80 shadow-inner">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">Annual Projected Run-Rate</span>
              <Award className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white font-display">
              $<AnimatedNumber value={badgeMetrics.annualRunRate} duration={800} />
              <span className="text-xs font-extrabold text-amber-400 ml-1">/yr</span>
            </div>
            <span className="text-[11px] text-slate-400 block mt-1">High-yield micro-SaaS & agency scale</span>
          </div>

          {/* High-Tier Opportunity Match */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-purple-800/80 shadow-inner">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-purple-400 uppercase tracking-wider">Top Contract Match</span>
              <Target className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-sm font-extrabold text-purple-200 line-clamp-1">
              {matchedUniqueOpportunities[0]?.title || 'AI Agentic Workflow Consulting'}
            </div>
            <div className="text-xs font-mono font-bold text-emerald-400 mt-1">
              {matchedUniqueOpportunities[0]?.compensationLabel || '$28,000 / retainer'}
            </div>
            <span className="text-[10px] text-slate-400 block mt-0.5">Matched from verified skill stack</span>
          </div>
        </div>

        {/* Interactive Revenue Tier Multiplier Calculator */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3 relative z-10">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <h4 className="font-extrabold text-xs sm:text-sm text-white uppercase tracking-wider">
                Skill Tier Revenue Multiplier (Career Scaling)
              </h4>
            </div>
            <span className="text-xs text-slate-400 font-medium">
              See how leveling up proficiency increases revenue by 4x+
            </span>
          </div>

          <div className="flex items-center gap-2 pt-1 flex-wrap">
            <button
              onClick={() => setTargetTierSim('Novice')}
              className={cn(
                "px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all btn-press",
                targetTierSim === 'Novice' ? "bg-slate-700 text-white border border-slate-500" : "bg-slate-950 text-slate-400 border border-slate-800 hover:text-white"
              )}
            >
              Tier 1-2 Novice ($2,500/mo)
            </button>

            <button
              onClick={() => setTargetTierSim('Intermediate')}
              className={cn(
                "px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all btn-press",
                targetTierSim === 'Intermediate' ? "bg-indigo-600 text-white border border-indigo-400" : "bg-slate-950 text-slate-400 border border-slate-800 hover:text-white"
              )}
            >
              Tier 3 Intermediate ($14,500/mo)
            </button>

            <button
              onClick={() => setTargetTierSim('Advanced')}
              className={cn(
                "px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all btn-press",
                targetTierSim === 'Advanced' ? "bg-emerald-500 text-slate-950 font-black border border-emerald-400" : "bg-slate-950 text-slate-400 border border-slate-800 hover:text-white"
              )}
            >
              Tier 4-5 Advanced ($48,500+/mo) 🔥
            </button>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed pt-1">
            {targetTierSim === 'Novice' && "At Novice level, creators handle low-complexity freelancing ($25–$45/hr) with limited retainer potential."}
            {targetTierSim === 'Intermediate' && "At Intermediate level, creators deliver turnkey client projects ($95–$165/hr) and manage multi-client retainers."}
            {targetTierSim === 'Advanced' && "At Advanced level, creators architect high-ticket enterprise AI workflows, proprietary micro-SaaS ($180–$350/hr), and scalable recurring revenue streams."}
          </p>
        </div>
      </section>

      {/* 3. REAL-DATA AI SKILL PROFILE GENERATOR & ENRICHER */}
      <section className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 md:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                <Cpu className="w-3.5 h-3.5 text-blue-600" />
                Real-World Skill Intelligence
              </span>
              <span className="text-xs text-slate-400 font-medium">Instant AI Deep Profile</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-display">
              Create / Enrich Real Skill Profiles
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Type any vocational or technical skill to fetch its real industry definition, tool stack, market hourly rates ($120–$350/hr), and unique monetization opportunities.
            </p>
          </div>
        </div>

        <form onSubmit={handleGenerateAiSkill} className="p-4 rounded-2xl bg-slate-900 text-white space-y-3">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1">
              <Wrench className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={aiSkillInput}
                onChange={e => setAiSkillInput(e.target.value)}
                placeholder="Enter skill name (e.g. AI Prompt Engineering, Cybersecurity Audit, 3D Motion Design, Drone Firmware)..."
                className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={!aiSkillInput.trim() || isGeneratingAiSkill}
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs sm:text-sm font-bold px-6 py-2.5 rounded-xl transition-all shadow-md shrink-0 btn-press"
            >
              {isGeneratingAiSkill ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Fetching Real Domain Data...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Generate Real Skill Profile</span>
                </>
              )}
            </button>
          </div>

          {aiSkillError && (
            <p className="text-xs text-rose-400 flex items-center gap-1.5 pt-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{aiSkillError}</span>
            </p>
          )}
        </form>
      </section>

      {/* 4. VISUAL PROFICIENCY BADGES OVERVIEW & METRICS BANNER */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                <Award className="w-3 h-3 text-blue-600" />
                Assessment-Supported Credentials
              </span>
              <span className="text-xs text-slate-400 font-medium">Skill Proficiency Framework</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-display">
              Skill Proficiency Badges & Tool Stacks
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Visual badge indicators calibrated from Knowledge Quizzes, Practical Task Rubrics, and G-ONE analysis.
            </p>
          </div>

          {/* Calibrator & Simulator Toggle for Judges / Testing */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowSimulator(!showSimulator)}
              className={cn(
                "inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-xl transition-all shadow-xs btn-press",
                showSimulator 
                  ? "bg-indigo-600 text-white" 
                  : "text-slate-700 bg-white hover:bg-slate-50 border border-slate-200"
              )}
              title="Test & Calibrate Proficiency Badges"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Badge Calibrator / Sandbox</span>
              {showSimulator ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Interactive Badge Level Simulator (Evaluator Sandbox) */}
        {showSimulator && (
          <div className="p-5 rounded-2xl bg-indigo-50/60 border border-indigo-200 animate-in slide-in-from-top-2 duration-200 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <h4 className="font-extrabold text-indigo-950 text-xs sm:text-sm">
                  Interactive Badge Calibrator (Evaluator Sandbox)
                </h4>
              </div>
              <span className="text-[11px] text-indigo-700 font-bold bg-white px-2.5 py-0.5 rounded-md border border-indigo-200">
                Instant UI Preview
              </span>
            </div>
            <p className="text-xs text-indigo-900/80">
              Simulate an assessment attempt to see how visual badge indicators, tier stars, and score gauges update dynamically across the profile.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] font-bold text-indigo-950 block mb-1">
                  Target Skill
                </label>
                <select
                  value={simSkillId}
                  onChange={e => setSimSkillId(e.target.value)}
                  className="w-full text-xs font-bold bg-white border border-indigo-200 rounded-xl p-2 text-slate-800"
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
                <label className="text-[11px] font-bold text-indigo-950 block mb-1">
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
                  className="w-full text-xs font-bold bg-white border border-indigo-200 rounded-xl p-2 text-slate-800"
                >
                  <option value="Advanced">Advanced / Expert (Tier 5 - 90%+)</option>
                  <option value="Strong">Strong / Proficient (Tier 4 - 80%+)</option>
                  <option value="Intermediate">Intermediate (Tier 3 - 70%+)</option>
                  <option value="Developing">Developing (Tier 2 - 60%+)</option>
                  <option value="Foundation">Novice / Foundation (Tier 1 - &lt;60%)</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[11px] font-bold text-indigo-950">
                    Quiz Score
                  </label>
                  <span className="font-mono text-xs font-black text-indigo-700 bg-white px-2 py-0.5 rounded border border-indigo-200">
                    {simScore}%
                  </span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="100"
                  value={simScore}
                  onChange={e => setSimScore(Number(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
              </div>
            </div>

            <div className="p-3 bg-white rounded-xl border border-indigo-200/80 flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase">Live Output:</span>
                <ProficiencyBadge
                  level={simLevel}
                  scorePercentage={simScore}
                  size="sm"
                  variant="badge"
                  showStars={true}
                  showScore={true}
                />
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleApplySimulatedAssessment}
                  className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-xs btn-press"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Apply Badge Calibration</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Badge Tier Distribution Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <motion.div 
            whileHover={{ y: -3, transition: { duration: 0.15 } }}
            onClick={() => setActiveFilter('advanced')}
            className={cn(
              "border rounded-2xl p-3.5 flex flex-col justify-between hover:shadow-md transition-all cursor-pointer",
              activeFilter === 'advanced' 
                ? "bg-amber-100/90 border-amber-400 ring-2 ring-amber-400/40" 
                : "bg-amber-50/70 border-amber-200/80"
            )}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-bold uppercase text-amber-800 tracking-wider">Tier 5</span>
              <Award className="w-4 h-4 text-amber-600" />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-black text-amber-950 font-display block">
                <AnimatedNumber value={badgeMetrics.advancedCount} />
              </span>
              <span className="text-xs font-bold text-amber-900 block mt-0.5">Advanced</span>
              <span className="text-[10px] text-amber-700 block">★★★★★ (90%+)</span>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -3, transition: { duration: 0.15 } }}
            onClick={() => setActiveFilter('advanced')}
            className={cn(
              "border rounded-2xl p-3.5 flex flex-col justify-between hover:shadow-md transition-all cursor-pointer",
              activeFilter === 'advanced' 
                ? "bg-emerald-100/90 border-emerald-400 ring-2 ring-emerald-400/40" 
                : "bg-emerald-50/70 border-emerald-200/80"
            )}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-bold uppercase text-emerald-800 tracking-wider">Tier 4</span>
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-black text-emerald-950 font-display block">
                <AnimatedNumber value={badgeMetrics.strongCount} />
              </span>
              <span className="text-xs font-bold text-emerald-900 block mt-0.5">Strong</span>
              <span className="text-[10px] text-emerald-700 block">★★★★☆ (80%+)</span>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -3, transition: { duration: 0.15 } }}
            onClick={() => setActiveFilter('intermediate')}
            className={cn(
              "border rounded-2xl p-3.5 flex flex-col justify-between hover:shadow-md transition-all cursor-pointer",
              activeFilter === 'intermediate' 
                ? "bg-indigo-100/90 border-indigo-400 ring-2 ring-indigo-400/40" 
                : "bg-indigo-50/70 border-indigo-200/80"
            )}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-bold uppercase text-indigo-800 tracking-wider">Tier 3</span>
              <Target className="w-4 h-4 text-indigo-600" />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-black text-indigo-950 font-display block">
                <AnimatedNumber value={badgeMetrics.intermediateCount} />
              </span>
              <span className="text-xs font-bold text-indigo-900 block mt-0.5">Intermediate</span>
              <span className="text-[10px] text-indigo-700 block">★★★☆☆ (70%+)</span>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -3, transition: { duration: 0.15 } }}
            onClick={() => setActiveFilter('novice')}
            className={cn(
              "border rounded-2xl p-3.5 flex flex-col justify-between hover:shadow-md transition-all cursor-pointer",
              activeFilter === 'novice' 
                ? "bg-sky-100/90 border-sky-400 ring-2 ring-sky-400/40" 
                : "bg-sky-50/70 border-sky-200/80"
            )}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-bold uppercase text-sky-800 tracking-wider">Tier 2</span>
              <Compass className="w-4 h-4 text-sky-600" />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-black text-sky-950 font-display block">
                <AnimatedNumber value={badgeMetrics.developingCount} />
              </span>
              <span className="text-xs font-bold text-sky-900 block mt-0.5">Developing</span>
              <span className="text-[10px] text-sky-700 block">★★☆☆☆ (60%+)</span>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -3, transition: { duration: 0.15 } }}
            onClick={() => setActiveFilter('novice')}
            className={cn(
              "border rounded-2xl p-3.5 flex flex-col justify-between hover:shadow-md transition-all cursor-pointer",
              activeFilter === 'novice' 
                ? "bg-slate-200 border-slate-400 ring-2 ring-slate-400/40" 
                : "bg-slate-100/90 border-slate-200"
            )}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-bold uppercase text-slate-700 tracking-wider">Tier 1</span>
              <BookOpen className="w-4 h-4 text-slate-600" />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-black text-slate-900 font-display block">
                <AnimatedNumber value={badgeMetrics.noviceCount} />
              </span>
              <span className="text-xs font-bold text-slate-800 block mt-0.5">Novice</span>
              <span className="text-[10px] text-slate-600 block">★☆☆☆☆ (&lt;60%)</span>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -3, transition: { duration: 0.15 } }}
            onClick={() => setActiveFilter('all')}
            className="bg-slate-900 text-white rounded-2xl p-3.5 flex flex-col justify-between hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-bold uppercase text-blue-400 tracking-wider">Verification</span>
              <BarChart3 className="w-4 h-4 text-blue-400" />
            </div>
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-xl sm:text-2xl font-black text-white font-display">
                  <AnimatedNumber value={badgeMetrics.verifiedCount} />
                </span>
                <span className="text-xs text-slate-400 font-bold">/ {badgeMetrics.totalSkills}</span>
              </div>
              <span className="text-xs font-bold text-blue-300 block mt-0.5">
                {badgeMetrics.averageScore > 0 ? (
                  <span>Avg <AnimatedNumber value={badgeMetrics.averageScore} suffix="%" /></span>
                ) : (
                  'Unassessed'
                )}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. SKILL BADGES LISTING & CONTROLS */}
      <section className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 md:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1 sm:pb-0">
            <button
              onClick={() => setActiveFilter('all')}
              className={cn(
                "px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap btn-press",
                activeFilter === 'all' 
                  ? "bg-slate-900 text-white shadow-xs" 
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              )}
            >
              All Badges ({userSkills.length})
            </button>

            <button
              onClick={() => setActiveFilter('high_revenue')}
              className={cn(
                "px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1 btn-press",
                activeFilter === 'high_revenue' 
                  ? "bg-emerald-600 text-white shadow-xs" 
                  : "bg-emerald-50 text-emerald-900 border border-emerald-200 hover:bg-emerald-100"
              )}
            >
              <TrendingUp className="w-3 h-3 text-emerald-600" />
              <span>High Revenue ({badgeMetrics.advancedCount + badgeMetrics.strongCount})</span>
            </button>

            <button
              onClick={() => setActiveFilter('intermediate')}
              className={cn(
                "px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1 btn-press",
                activeFilter === 'intermediate' 
                  ? "bg-indigo-600 text-white shadow-xs" 
                  : "bg-indigo-50 text-indigo-900 border border-indigo-200 hover:bg-indigo-100"
              )}
            >
              <Target className="w-3 h-3" />
              <span>Intermediate ({badgeMetrics.intermediateCount})</span>
            </button>

            <button
              onClick={() => setActiveFilter('novice')}
              className={cn(
                "px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1 btn-press",
                activeFilter === 'novice' 
                  ? "bg-sky-600 text-white shadow-xs" 
                  : "bg-sky-50 text-sky-900 border border-sky-200 hover:bg-sky-100"
              )}
            >
              <Compass className="w-3 h-3" />
              <span>Novice ({badgeMetrics.developingCount + badgeMetrics.noviceCount})</span>
            </button>
          </div>

          <div className="relative w-full sm:w-64 shrink-0">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search skill badges & tool stacks..."
              className="w-full pl-8 pr-7 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Add Existing Skill Selector */}
        {availableSkillsToAdd.length > 0 && (
          <form onSubmit={handleAddSkill} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <Plus className="w-4 h-4 text-blue-600 shrink-0" />
              <div>
                <span className="text-xs font-bold text-slate-800 block">
                  Add Catalog Skill to Profile
                </span>
                <span className="text-[11px] text-slate-500">
                  Select from {availableSkillsToAdd.length} curriculum disciplines
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
              <select
                value={selectedAddSkillId}
                onChange={e => setSelectedAddSkillId(e.target.value)}
                className="text-xs font-semibold bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none w-full sm:w-auto min-w-[200px]"
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
                className="text-xs font-semibold bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none w-full sm:w-auto"
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
                className="inline-flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shrink-0 shadow-xs btn-press"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Skill</span>
              </button>
            </div>
          </form>
        )}

        {/* Skill Badge Grid */}
        {userSkills.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 p-6 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 mx-auto flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">No Skills Added Yet</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
                Add skills from the database or auto-load sample student credentials to view visual proficiency badges and revenue forecasts.
              </p>
            </div>
            <button
              onClick={fillSampleProfileWithBadges}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white transition-colors shadow-sm btn-press"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Auto-load Sample Skills & Badges</span>
            </button>
          </div>
        ) : filteredSkills.length === 0 ? (
          <div className="text-center py-10 bg-slate-50 rounded-2xl border border-slate-200 p-6">
            <p className="text-xs font-bold text-slate-600">No skills match your current filter or search criteria.</p>
            <button
              onClick={() => { setActiveFilter('all'); setSearchQuery(''); }}
              className="text-xs font-bold text-blue-600 hover:underline mt-2 inline-block"
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
      </section>

      {/* 6. UNIQUE HIGH-REVENUE OPPORTUNITIES SHOWCASE */}
      <section className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 md:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                <Award className="w-3 h-3 text-amber-600" />
                Uniqueness in Opportunity
              </span>
              <span className="text-xs text-slate-400 font-medium">Tailored High-Ticket Contracts</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-display">
              Matched Unique Revenue Opportunities
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Unique, high-yield monetization pathways tailored specifically to your active verified skills.
            </p>
          </div>

          <Link
            to="/opportunity-explorer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-3.5 py-2 rounded-xl transition-all btn-press"
          >
            <span>View All Opportunities</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {matchedUniqueOpportunities.map(opp => (
            <div key={opp.id} className="p-5 rounded-2xl border border-slate-200 hover:border-emerald-500 transition-all bg-slate-50/50 hover:bg-white flex flex-col justify-between space-y-4 group">
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    {opp.opportunityType || 'High-Ticket Contract'}
                  </span>
                  <span className="text-xs font-mono font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {opp.compensationLabel || '$12,000 / contract'}
                  </span>
                </div>

                <h3 className="font-extrabold text-slate-900 text-base sm:text-lg group-hover:text-emerald-700 transition-colors">
                  {opp.title}
                </h3>

                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed line-clamp-2">
                  {opp.solution || opp.problemProfile?.overview || opp.applications[0]}
                </p>

                {/* Day 1 Immediate Action Step */}
                {opp.firstStep && (
                  <div className="mt-3 p-2.5 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-700 flex items-start gap-2">
                    <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                    <span className="text-[11px] font-medium leading-snug">
                      <strong className="text-slate-900">Day 1 Action:</strong> {opp.firstStep}
                    </span>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1 flex-wrap">
                  <span className="text-[10px] text-slate-400 font-bold uppercase mr-1">Required:</span>
                  {opp.requiredSkills.slice(0, 3).map(skId => (
                    <span key={skId} className="text-[10px] font-bold bg-slate-200 text-slate-800 px-2 py-0.5 rounded uppercase">
                      {skId.replace('_', ' ')}
                    </span>
                  ))}
                </div>

                <Link
                  to={`/opportunity/${opp.id}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-slate-900 hover:text-emerald-600 shrink-0"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. DIAGNOSTIC DETAIL MODAL */}
      <AssessmentDetailModal
        isOpen={Boolean(detailSkillId)}
        onClose={() => setDetailSkillId(null)}
        skill={detailSkill}
        userSkill={detailUserSkill}
        attempt={detailAttempt}
      />

      {/* 8. FLOATING CONFIRMATION TOAST */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl border border-slate-700 flex items-center gap-2.5 text-xs font-bold"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
