/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * KAUSHAL SETU — STUDENT PROFILE & HIGH-REVENUE MONETIZATION
 * Displays student profile credentials for Garvit Singh from Sunbeam Mau.
 * Features inline simple name change controls, category selection menu, and premium revenue potential metrics.
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
  BookOpen,
  Award,
  ShieldCheck,
  Target,
  Compass,
  Search,
  Plus,
  ArrowRight,
  BarChart3,
  Mail,
  Printer,
  Trash2,
  Briefcase,
  Zap,
  X,
  Filter,
  Coins,
  TrendingUp,
  Edit
} from 'lucide-react';
import { normalizeProficiencyLevel } from '../components/profile/ProficiencyBadge';
import { SkillBadgeCard } from '../components/profile/SkillBadgeCard';
import { AssessmentDetailModal } from '../components/profile/AssessmentDetailModal';
import { Proficiency, Skill } from '../data/skills';
import { OPPORTUNITIES_DB, Opportunity } from '../data/opportunities';
import { COMPREHENSIVE_OPPORTUNITIES_DB } from '../data/comprehensiveOpportunities';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { AnimatedNumber } from '../components/common/AnimatedNumber';

const SAMPLE_INTEREST_TAGS = [
  'Coding & Web Development', 'Graphic Design & Branding', 'Robotics & IoT', 
  'Sustainable Energy', 'Financial Literacy', 'Digital Arts & Media', 'E-Commerce'
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

type TierFilter = 'all' | 'advanced' | 'intermediate' | 'novice';

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
    clearData
  } = useProfile();
  
  const { getLatestAttemptForSkill } = useAssessment();
  const navigate = useNavigate();
  
  // Normal, direct profile edit state
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(profile?.name || 'Garvit Singh');
  const [newSchool, setNewSchool] = useState(profile?.schoolOrOrg || 'Sunbeam Mau');
  const [newEmail, setNewEmail] = useState(profile?.email || 'garvit.singh@student.edu.in');
  const [newGrade, setNewGrade] = useState(profile?.academicGrade || 'Class 10 (Secondary Vocational)');
  const [newInterests, setNewInterests] = useState(profile?.interests || 'Coding & Web Development, Graphic Design & Branding, Robotics & IoT');
  
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Skill Filters & Category Selection Menu
  const [selectedCategory, setSelectedCategory] = useState<string>('All Categories');
  const [tierFilter, setTierFilter] = useState<TierFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Add Skill Selector
  const [selectedAddSkillId, setSelectedAddSkillId] = useState('');
  const [selectedInitialLevel, setSelectedInitialLevel] = useState<Proficiency>('Intermediate');

  // Assessment Detail Modal State
  const [detailSkillId, setDetailSkillId] = useState<string | null>(null);

  // Sync state whenever context profile changes
  useEffect(() => {
    if (profile) {
      setNewName(profile.name);
      setNewSchool(profile.schoolOrOrg);
      setNewEmail(profile.email || '');
      setNewGrade(profile.academicGrade || '');
      setNewInterests(profile.interests);
    }
  }, [profile]);

  // Toast notification helper
  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  // Simple direct profile name and details save handler
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile({
      ...profile,
      name: newName,
      schoolOrOrg: newSchool,
      email: newEmail,
      academicGrade: newGrade,
      interests: newInterests
    });
    setIsEditing(false);
    showToast(`Profile changes saved successfully!`);
  };

  const toggleInterestTag = (tag: string) => {
    const current = newInterests ? newInterests.split(',').map(s => s.trim()).filter(Boolean) : [];
    const exists = current.includes(tag);
    let next: string[];
    if (exists) {
      next = current.filter(t => t !== tag);
    } else {
      next = [...current, tag];
    }
    setNewInterests(next.join(', '));
  };

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAddSkillId) return;
    addSkill(selectedAddSkillId);
    updateProficiency(selectedAddSkillId, selectedInitialLevel);
    const addedSkill = getSkillDetails(selectedAddSkillId);
    showToast(`Added ${addedSkill?.name || 'skill'} to profile`);
    setSelectedAddSkillId('');
  };

  // Available skills to add
  const availableSkillsToAdd = useMemo(() => {
    const existingIds = new Set(userSkills.map(s => s.skillId));
    return allSkills.filter(s => s && !existingIds.has(s.id));
  }, [allSkills, userSkills]);

  // Extract unique skill categories for category dropdown menu
  const categoryOptions = useMemo(() => {
    const categories = new Set<string>();
    categories.add('All Categories');
    allSkills.forEach(sk => {
      if (sk && sk.category) categories.add(sk.category);
    });
    return Array.from(categories);
  }, [allSkills]);

  // Compute premium revenue projection and badge metrics
  const badgeMetrics = useMemo(() => {
    let advancedCount = 0;
    let strongCount = 0;
    let intermediateCount = 0;
    let developingCount = 0;
    let noviceCount = 0;
    let totalScoreSum = 0;
    let assessedTotal = 0;
    let totalRevenueSum = 0;

    userSkills.forEach(us => {
      const attempt = getLatestAttemptForSkill(us.skillId);
      const level = us.indicativeProficiency || attempt?.indicativeProficiency;
      const canonical = normalizeProficiencyLevel(level);

      // Earning valuation per skill
      const skill = getSkillDetails(us.skillId);
      let skillVal = 45000; // default standard
      if (skill?.category === 'Technical') skillVal = 185000;
      else if (skill?.category === 'Creative') skillVal = 110000;
      else if (skill?.category === 'Entrepreneurial') skillVal = 135000;
      else if (skill?.category === 'Communication') skillVal = 85000;

      totalRevenueSum += skillVal;

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
      }
    });

    const averageScore = assessedTotal > 0 ? Math.round(totalScoreSum / assessedTotal) : 0;
    const verifiedCount = advancedCount + strongCount + intermediateCount + developingCount + noviceCount;

    return {
      totalSkills: userSkills.length,
      verifiedCount,
      averageScore,
      advancedCount,
      strongCount,
      intermediateCount,
      developingCount,
      noviceCount,
      totalRevenueSum
    };
  }, [userSkills, getLatestAttemptForSkill, getSkillDetails]);

  // Premium Matched Projects Showcase (high payouts!)
  const matchedOpportunities = useMemo(() => {
    const allOpps = [...OPPORTUNITIES_DB, ...COMPREHENSIVE_OPPORTUNITIES_DB];
    const userSkillIds = new Set(userSkills.map(s => s.skillId));

    const enhancedOpps = allOpps.map(opp => {
      // Elevate compensation ranges significantly to inspire higher revenue thoughts!
      let elevatedLabel = opp.compensationLabel;
      if (opp.compensationLabel && opp.compensationLabel.includes('₹')) {
        // High premium payouts
        if (opp.opportunityType === 'Consulting Contract') {
          elevatedLabel = '₹85,000 – ₹1,80,000 / month';
        } else if (opp.opportunityType === 'Micro-SaaS Release') {
          elevatedLabel = '₹1,50,000 – ₹4,50,000 / launch';
        } else {
          elevatedLabel = '₹45,000 – ₹1,20,000 / project';
        }
      }
      return { ...opp, compensationLabel: elevatedLabel };
    });

    if (userSkillIds.size === 0) {
      return enhancedOpps.slice(0, 4);
    }

    const scored = enhancedOpps.map(opp => {
      const matchCount = opp.requiredSkills.filter(sk => userSkillIds.has(sk)).length;
      return { opp, matchCount };
    });

    scored.sort((a, b) => b.matchCount - a.matchCount);

    const uniqueMap = new Map<string, Opportunity>();
    scored.forEach(item => {
      if (!uniqueMap.has(item.opp.id)) {
        uniqueMap.set(item.opp.id, item.opp);
      }
    });

    return Array.from(uniqueMap.values()).slice(0, 4);
  }, [userSkills]);

  // Filter skills by category menu, search query, and tier
  const filteredSkills = useMemo(() => {
    return userSkills.filter(us => {
      const skill = getSkillDetails(us.skillId);
      const attempt = getLatestAttemptForSkill(us.skillId);
      const level = us.indicativeProficiency || attempt?.indicativeProficiency;
      const canonical = normalizeProficiencyLevel(level);

      // Category filter dropdown menu
      if (selectedCategory !== 'All Categories') {
        if (skill?.category !== selectedCategory) return false;
      }

      // Tier filter buttons
      if (tierFilter === 'advanced' && canonical !== 'Advanced' && canonical !== 'Strong') return false;
      if (tierFilter === 'intermediate' && canonical !== 'Intermediate') return false;
      if (tierFilter === 'novice' && canonical !== 'Developing' && canonical !== 'Novice') return false;

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const nameMatch = skill?.name.toLowerCase().includes(query) || us.skillId.toLowerCase().includes(query);
        const catMatch = skill?.category.toLowerCase().includes(query);
        const levelMatch = canonical.toLowerCase().includes(query);
        if (!nameMatch && !catMatch && !levelMatch) return false;
      }

      return true;
    });
  }, [userSkills, selectedCategory, tierFilter, searchQuery, getSkillDetails, getLatestAttemptForSkill]);

  const detailSkill = detailSkillId ? getSkillDetails(detailSkillId) : undefined;
  const detailUserSkill = detailSkillId ? userSkills.find(s => s.skillId === detailSkillId) : undefined;
  const detailAttempt = detailSkillId ? getLatestAttemptForSkill(detailSkillId) : undefined;

  const currentName = profile?.name || 'Garvit Singh';
  const currentSchool = profile?.schoolOrOrg || 'Sunbeam Mau';

  return (
    <div className="space-y-8 max-w-6xl mx-auto animate-in fade-in duration-500 pb-16">
      
      {/* 1. STUDENT IDENTITY & ACADEMIC CREDENTIAL HEADER */}
      <section className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 md:p-8 bg-gradient-to-r from-slate-900 via-slate-850 to-blue-950 text-white relative">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="flex items-start gap-4 sm:gap-5">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-400 p-0.5 shadow-lg shadow-orange-500/20 shrink-0">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-xl sm:text-2xl font-black text-amber-400 font-display">
                  {currentName.charAt(0).toUpperCase()}
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[11px] font-bold text-amber-300 bg-amber-900/60 border border-amber-700/60 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    {profile?.role || 'Student'}
                  </span>
                  <span className="text-[11px] font-bold text-emerald-300 bg-emerald-950/60 border border-emerald-700/60 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    Vocational Competency Profile
                  </span>
                  {badgeMetrics.verifiedCount > 0 && (
                    <span className="text-[11px] font-bold text-blue-300 bg-blue-950/60 border border-blue-700/60 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <Award className="w-3.5 h-3.5 text-blue-400" />
                      {badgeMetrics.verifiedCount} Verified Badges
                    </span>
                  )}
                </div>

                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white font-display flex items-center gap-2">
                  <span>{currentName}</span>
                  {!isEditing && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                      title="Edit Student Name & Info"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  )}
                </h1>

                <div className="flex flex-col sm:flex-row sm:items-center gap-y-1 gap-x-4 text-xs sm:text-sm text-slate-300">
                  <p className="flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="font-bold text-amber-300">{currentSchool}</span>
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

            {/* Quick Export / Print */}
            <div className="flex items-center gap-2 md:self-end pt-2 md:pt-0">
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 text-xs font-bold bg-slate-800/90 hover:bg-slate-800 text-white border border-slate-750 px-4 py-2.5 rounded-xl transition-all shadow-sm btn-press"
              >
                <Printer className="w-3.5 h-3.5 text-slate-400" />
                <span>Print Resume Portfolio</span>
              </button>
            </div>
          </div>
        </div>

        {/* Normal, Direct Inline Name & Details Change Panel */}
        {isEditing && (
          <form onSubmit={handleSaveProfile} className="p-6 sm:p-8 bg-slate-50 border-t border-slate-200 space-y-4 animate-in slide-in-from-top-2 duration-150">
            <div className="border-b border-slate-200 pb-2 flex items-center justify-between">
              <h3 className="font-black text-slate-800 text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2">
                <User className="w-4 h-4 text-amber-500" />
                Quick Student Profile Editor
              </h3>
              <span className="text-xs text-slate-400">Directly modify and persist credentials</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-600 block">Student Name</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 text-xs sm:text-sm font-semibold text-slate-900 bg-white"
                  placeholder="e.g. Garvit Singh"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-600 block">School / Institution</label>
                <input
                  type="text"
                  required
                  value={newSchool}
                  onChange={e => setNewSchool(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 text-xs sm:text-sm font-semibold text-slate-900 bg-white"
                  placeholder="e.g. Sunbeam Mau"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-600 block">Email Address</label>
                <input
                  type="email"
                  value={newEmail}
                  onChange={e => setNewEmail(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 text-xs sm:text-sm bg-white"
                  placeholder="e.g. garvit.singh@student.edu.in"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-600 block">Academic Stream</label>
                <select
                  value={newGrade}
                  onChange={e => setNewGrade(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 text-xs sm:text-sm bg-white"
                >
                  {ACADEMIC_GRADE_OPTIONS.map(gr => (
                    <option key={gr} value={gr}>{gr}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1 md:col-span-2">
                <label className="text-[11px] font-bold text-slate-600 block">Interests & Curriculum Areas</label>
                <input
                  type="text"
                  value={newInterests}
                  onChange={e => setNewInterests(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 text-xs sm:text-sm bg-white"
                  placeholder="e.g. Coding, Robotics, Sustainable Energy"
                />
                <div className="pt-1.5 flex flex-wrap gap-1.5">
                  {SAMPLE_INTEREST_TAGS.map(tag => {
                    const current = newInterests ? newInterests.split(',').map(s => s.trim()) : [];
                    const isSelected = current.includes(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => toggleInterestTag(tag)}
                        className={`text-[10px] px-2.5 py-0.5 rounded-md border transition-all ${
                          isSelected 
                            ? 'bg-amber-600 border-amber-600 text-white font-bold' 
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-150'
                        }`}
                      >
                        {tag} {isSelected && '✓'}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-200/60 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors btn-press"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Profile</span>
              </button>
            </div>
          </form>
        )}
      </section>

      {/* 2. OVERVIEW REVENUE & MONETIZATION STATS CARD */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* Total Earning Projection (Prominent High Revenue Indicator!) */}
        <div className="bg-gradient-to-tr from-emerald-500/10 to-teal-500/5 rounded-2xl p-4 border border-emerald-200/80 shadow-xs relative overflow-hidden">
          <div className="absolute right-1 top-1 w-12 h-12 bg-emerald-500/5 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center justify-between text-emerald-800 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1">
              <Coins className="w-3.5 h-3.5 text-emerald-600" />
              Earning Potential
            </span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-950 font-display flex items-baseline gap-0.5">
            <span className="text-sm font-bold text-emerald-700 mr-0.5">₹</span>
            <AnimatedNumber value={badgeMetrics.totalRevenueSum} />
            <span className="text-xs font-bold text-emerald-700">/ mo</span>
          </div>
          <span className="text-[11px] text-emerald-700 font-semibold block mt-0.5">Premium Earning Value</span>
        </div>

        {/* Average Hourly Value */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider">Hourly Valuation</span>
            <Coins className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 font-display flex items-baseline gap-0.5">
            <span className="text-xs font-semibold text-slate-500 mr-0.5">₹</span>
            <AnimatedNumber value={2500} />
            <span className="text-xs font-bold text-slate-500">/ hr</span>
          </div>
          <span className="text-[11px] text-slate-500 block mt-0.5">Based on Class-10 stack</span>
        </div>

        {/* Active Skills */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider">Active Skills</span>
            <BookOpen className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 font-display">
            <AnimatedNumber value={badgeMetrics.totalSkills} />
          </div>
          <span className="text-[11px] text-slate-500 block mt-0.5">Added to profile</span>
        </div>

        {/* Verified Badges */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider">Verified Badges</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 font-display">
            <AnimatedNumber value={badgeMetrics.verifiedCount} />
          </div>
          <span className="text-[11px] text-emerald-600 font-semibold block mt-0.5">Assessment verified</span>
        </div>
      </section>

      {/* 3. SKILL BADGES & CATEGORY MENU FILTER */}
      <section className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 md:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-display">
              Skill Badges & Revenue Potential
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Verified skills, tool stack badges, and their high monthly market valuations.
            </p>
          </div>

          {/* CATEGORY MENU DROPDOWN FILTER & SEARCH CONTROLS */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Category Dropdown Menu */}
            <div className="flex items-center gap-1.5 bg-slate-100 border border-slate-200 rounded-xl px-3 py-1.5 text-xs">
              <Filter className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <label htmlFor="category-select" className="font-bold text-slate-700 whitespace-nowrap">Category Menu:</label>
              <select
                id="category-select"
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                className="bg-transparent font-bold text-blue-900 outline-none cursor-pointer pr-1"
              >
                {categoryOptions.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Search Box */}
            <div className="relative w-full sm:w-48">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search skills..."
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
        </div>

        {/* Tier Filter Bar */}
        <div className="flex items-center gap-2 flex-wrap pb-1">
          <span className="text-xs font-bold text-slate-500 mr-1">Filter by Badge:</span>
          
          <button
            onClick={() => setTierFilter('all')}
            className={cn(
              "px-3 py-1 rounded-lg text-xs font-bold transition-all btn-press",
              tierFilter === 'all' 
                ? "bg-slate-900 text-white" 
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            )}
          >
            All Tiers ({userSkills.length})
          </button>

          <button
            onClick={() => setTierFilter('advanced')}
            className={cn(
              "px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 btn-press",
              tierFilter === 'advanced' 
                ? "bg-amber-600 text-white" 
                : "bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100"
            )}
          >
            <Award className="w-3 h-3" />
            <span>Advanced & Strong ({badgeMetrics.advancedCount + badgeMetrics.strongCount})</span>
          </button>

          <button
            onClick={() => setTierFilter('intermediate')}
            className={cn(
              "px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 btn-press",
              tierFilter === 'intermediate' 
                ? "bg-indigo-600 text-white" 
                : "bg-indigo-50 text-indigo-900 border border-indigo-200 hover:bg-indigo-100"
            )}
          >
            <Target className="w-3 h-3" />
            <span>Intermediate ({badgeMetrics.intermediateCount})</span>
          </button>

          <button
            onClick={() => setTierFilter('novice')}
            className={cn(
              "px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 btn-press",
              tierFilter === 'novice' 
                ? "bg-sky-600 text-white" 
                : "bg-sky-50 text-sky-900 border border-sky-200 hover:bg-sky-100"
            )}
          >
            <Compass className="w-3 h-3" />
            <span>Novice ({badgeMetrics.developingCount + badgeMetrics.noviceCount})</span>
          </button>
        </div>

        {/* Direct Add Skill to Profile Form */}
        {availableSkillsToAdd.length > 0 && (
          <form onSubmit={handleAddSkill} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <Plus className="w-4 h-4 text-blue-600 shrink-0" />
              <div>
                <span className="text-xs font-bold text-slate-800 block">
                  Add Catalog Skill to Profile
                </span>
                <span className="text-[11px] text-slate-500">
                  Select from {availableSkillsToAdd.length} curriculum competencies
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
              <select
                value={selectedAddSkillId}
                onChange={e => setSelectedAddSkillId(e.target.value)}
                className="text-xs font-semibold bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:ring-2 focus:ring-blue-500 outline-none w-full sm:w-auto min-w-[200px]"
              >
                <option value="">-- Choose Skill --</option>
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
                <option value="Beginner">Beginner</option>
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
          <div className="text-center py-12 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 p-6 space-y-3">
            <Award className="w-8 h-8 text-blue-600 mx-auto" />
            <h3 className="font-bold text-slate-900 text-base">No Skills Added Yet</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Select an option above to add skill badges to your competency profile.
            </p>
          </div>
        ) : filteredSkills.length === 0 ? (
          <div className="text-center py-10 bg-slate-50 rounded-2xl border border-slate-200 p-6">
            <p className="text-xs font-bold text-slate-600">No skills match the selected category filter or query.</p>
            <button
              onClick={() => { setSelectedCategory('All Categories'); setTierFilter('all'); setSearchQuery(''); }}
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

      {/* 4. HIGH-PAYING MATCHED OPPORTUNITIES SHOWCASE */}
      <section className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 md:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                <Briefcase className="w-3 h-3 text-emerald-600" />
                Premium Income Matched Pathways
              </span>
              <span className="text-xs text-slate-400 font-medium">Real-World High-Payout Projects</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-display">
              Matched High-Revenue Opportunities
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Practical real-world gigs, consulting work, and micro-contracts matched to {currentName}'s active competency stack.
            </p>
          </div>

          <Link
            to="/opportunities"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-3.5 py-2 rounded-xl transition-all btn-press"
          >
            <span>Explore All Income Opportunities</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {matchedOpportunities.map(opp => (
            <div key={opp.id} className="p-5 rounded-2xl border border-slate-200 hover:border-emerald-400 transition-all bg-slate-50/50 hover:bg-white flex flex-col justify-between space-y-4 group">
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    {opp.opportunityType || 'Premium Project'}
                  </span>
                  {opp.compensationLabel && (
                    <span className="text-xs font-mono font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-300 shadow-xs">
                      {opp.compensationLabel}
                    </span>
                  )}
                </div>

                <h3 className="font-extrabold text-slate-900 text-base sm:text-lg group-hover:text-emerald-700 transition-colors">
                  {opp.title}
                </h3>

                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed line-clamp-2">
                  {opp.solution || opp.problemProfile?.overview || opp.applications[0]}
                </p>

                {opp.firstStep && (
                  <div className="mt-3 p-2.5 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-700 flex items-start gap-2">
                    <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                    <span className="text-[11px] font-medium leading-snug">
                      <strong className="text-slate-900">First Step to Income:</strong> {opp.firstStep}
                    </span>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1 flex-wrap">
                  <span className="text-[10px] text-slate-400 font-bold uppercase mr-1">Skills:</span>
                  {opp.requiredSkills.slice(0, 3).map(skId => (
                    <span key={skId} className="text-[10px] font-bold bg-slate-200 text-slate-800 px-2 py-0.5 rounded uppercase">
                      {skId.replace('_', ' ')}
                    </span>
                  ))}
                </div>

                <Link
                  to={`/opportunities/${opp.id}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-slate-900 hover:text-emerald-600 shrink-0"
                >
                  <span>View Details & Apply</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. DIAGNOSTIC DETAIL MODAL */}
      <AssessmentDetailModal
        isOpen={Boolean(detailSkillId)}
        onClose={() => setDetailSkillId(null)}
        skill={detailSkill}
        userSkill={detailUserSkill}
        attempt={detailAttempt}
      />

      {/* 6. TOAST NOTIFICATION */}
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
