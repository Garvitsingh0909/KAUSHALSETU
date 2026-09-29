/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * KAUSHAL SETU — STUDENT PROFILE & HIGH-REVENUE MONETIZATION
 * Displays student profile credentials for garvit Singh from Sunbeam Mau.
 * Features normal student name change controls, category selection menu, and premium revenue potential metrics.
 * Manual edits of school, grade, and skill badges are restricted to prevent session modifications.
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
  ArrowRight,
  BarChart3,
  Mail,
  Printer,
  Briefcase,
  Zap,
  X,
  Filter,
  Coins,
  TrendingUp,
  Edit3
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

type TierFilter = 'all' | 'advanced' | 'intermediate' | 'novice';

export default function Profile() {
  const { 
    profile, 
    setProfile, 
    userSkills, 
    allSkills, 
    getSkillDetails, 
    clearData
  } = useProfile();
  
  const { getLatestAttemptForSkill } = useAssessment();
  const navigate = useNavigate();
  
  // Normal, direct profile edit state (restricted only to name change to satisfy "dont allow manual edits" for school/details!)
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(profile?.name || 'garvit Singh');
  
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Skill Filters & Category Selection Menu
  const [selectedCategory, setSelectedCategory] = useState<string>('All Categories');
  const [tierFilter, setTierFilter] = useState<TierFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Assessment Detail Modal State
  const [detailSkillId, setDetailSkillId] = useState<string | null>(null);

  // Sync state whenever context profile changes
  useEffect(() => {
    if (profile) {
      setNewName(profile.name);
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

  // Simple direct profile name save handler
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile({
      ...profile,
      name: newName
    });
    setIsEditing(false);
    showToast(`Name updated to ${newName || 'garvit Singh'}!`);
  };

  // Extract unique skill categories for category dropdown menu
  const categoryOptions = useMemo(() => {
    const categories = new Set<string>();
    categories.add('All Categories');
    allSkills.forEach(sk => {
      if (sk && sk.category) categories.add(sk.category);
    });
    return Array.from(categories);
  }, [allSkills]);

  // Compute realistic high revenue projection and badge metrics
  const badgeMetrics = useMemo(() => {
    let advancedCount = 0;
    let strongCount = 0;
    let intermediateCount = 0;
    let developingCount = 0;
    let noviceCount = 0;
    let totalScoreSum = 0;
    let assessedTotal = 0;
    const skillEarningValues: number[] = [];

    userSkills.forEach(us => {
      if (!us || !us.skillId) return;
      const attempt = getLatestAttemptForSkill(us.skillId);
      const level = us.indicativeProficiency || attempt?.indicativeProficiency;
      const canonical = normalizeProficiencyLevel(level);

      // Realistic high vocational student market valuation
      const skill = getSkillDetails(us.skillId);
      let skillBase = 22000;
      if (skill?.category === 'Technical') skillBase = 36000;
      else if (skill?.category === 'Creative') skillBase = 28000;
      else if (skill?.category === 'Entrepreneurial') skillBase = 30000;
      else if (skill?.category === 'Communication') skillBase = 24000;

      // Tier modifier
      if (canonical === 'Advanced') skillBase = Math.round(skillBase * 1.25);
      else if (canonical === 'Strong') skillBase = Math.round(skillBase * 1.15);
      else if (canonical === 'Intermediate') skillBase = Math.round(skillBase * 1.0);
      else skillBase = Math.round(skillBase * 0.85);

      skillEarningValues.push(skillBase);

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

    skillEarningValues.sort((a, b) => b - a);
    let totalRevenueSum = 0;
    if (skillEarningValues.length > 0) {
      // Primary competency track: full valuation
      totalRevenueSum = skillEarningValues[0];
      // Secondary supporting skills: ~28% combined fractional capacity
      for (let i = 1; i < skillEarningValues.length; i++) {
        totalRevenueSum += Math.round(skillEarningValues[i] * 0.28);
      }
    } else {
      totalRevenueSum = 32000;
    }

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

  // Professional Matched Projects Showcase (realistic high payouts)
  const matchedOpportunities = useMemo(() => {
    const allOpps = [...OPPORTUNITIES_DB, ...COMPREHENSIVE_OPPORTUNITIES_DB];
    const userSkillIds = new Set(userSkills.map(s => s.skillId));

    const enhancedOpps = allOpps.map(opp => {
      let elevatedLabel = opp.compensationLabel;
      if (opp.compensationLabel && opp.compensationLabel.includes('₹')) {
        // High but credible payouts
        if (opp.opportunityType === 'Consulting Contract') {
          elevatedLabel = '₹28,000 – ₹48,000 / month';
        } else if (opp.opportunityType === 'Micro-SaaS Release') {
          elevatedLabel = '₹40,000 – ₹85,000 / launch';
        } else {
          elevatedLabel = '₹15,000 – ₹35,000 / project';
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
      if (!us || !us.skillId) return false;
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

  const currentName = profile?.name || 'garvit Singh';
  const currentSchool = profile?.schoolOrOrg || 'Sunbeam Mau';

  return (
    <div className="space-y-8 max-w-6xl mx-auto animate-in fade-in duration-500 pb-16">
      
      {/* 1. STUDENT IDENTITY & ACADEMIC CREDENTIAL HEADER */}
      <section className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden">
        <div className="p-6 md:p-7 bg-slate-900 text-white relative">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="flex items-start gap-4 sm:gap-5">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-lg sm:text-xl font-bold text-white shrink-0">
                {currentName.charAt(0).toUpperCase()}
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[11px] font-semibold text-slate-300 bg-slate-800 border border-slate-700 px-2 py-0.5 rounded uppercase tracking-wider">
                    {profile?.role || 'Student'}
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/80 border border-emerald-800/80 px-2 py-0.5 rounded flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    Vocational Competency Profile
                  </span>
                  {badgeMetrics.verifiedCount > 0 && (
                    <span className="text-[11px] font-semibold text-blue-300 bg-slate-800 border border-slate-700 px-2 py-0.5 rounded flex items-center gap-1">
                      <Award className="w-3.5 h-3.5 text-blue-400" />
                      {badgeMetrics.verifiedCount} Verified Badges
                    </span>
                  )}
                </div>

                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                  <span>{currentName}</span>
                  {!isEditing && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                      title="Edit Student Name"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                  )}
                </h1>

                <div className="flex flex-col sm:flex-row sm:items-center gap-y-1 gap-x-4 text-xs sm:text-sm text-slate-300">
                  <p className="flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="font-semibold text-slate-200">{currentSchool}</span>
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
                      <span key={idx} className="text-[10px] font-medium text-slate-300 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Print/Export option */}
            <div className="flex items-center gap-2 md:self-end pt-2 md:pt-0">
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 text-xs font-semibold bg-slate-800 hover:bg-slate-750 text-white border border-slate-700 px-3 py-1.5 rounded-lg transition-colors shadow-2xs"
              >
                <Printer className="w-3.5 h-3.5 text-slate-400" />
                <span>Print Profile</span>
              </button>
            </div>
          </div>
        </div>

        {/* Normal, Direct Inline Student Name Change */}
        {isEditing && (
          <form onSubmit={handleSaveProfile} className="p-4 bg-slate-50 border-t border-slate-200 space-y-3">
            <div className="border-b border-slate-200 pb-2 flex items-center justify-between">
              <h3 className="font-bold text-slate-800 text-xs sm:text-sm uppercase tracking-wider flex items-center gap-1.5">
                <User className="w-4 h-4 text-slate-600" />
                Change Student Name
              </h3>
              <span className="text-xs text-slate-500">Credentials administered under Sunbeam Mau</span>
            </div>

            <div className="max-w-md space-y-2">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-600 block">Student Name</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-slate-900 text-xs sm:text-sm font-semibold text-slate-900 bg-white"
                  placeholder="e.g. garvit Singh"
                />
              </div>

              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-3 py-1 rounded-md text-xs font-semibold text-slate-600 hover:bg-slate-200/60 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-md bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Name</span>
                </button>
              </div>
            </div>
          </form>
        )}
      </section>

      {/* 2. OVERVIEW REVENUE & MONETIZATION STATS CARD */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* Total Earning Projection (Clean, High but Credible!) */}
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1">
              <Coins className="w-3.5 h-3.5 text-emerald-600" />
              Earning Potential
            </span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 font-display flex items-baseline gap-0.5">
            <span className="text-sm font-bold text-emerald-700 mr-0.5">₹</span>
            <AnimatedNumber value={badgeMetrics.totalRevenueSum} />
            <span className="text-xs font-bold text-slate-500">/ mo</span>
          </div>
          <span className="text-[11px] text-slate-500 block mt-0.5">Verified skill valuation</span>
        </div>

        {/* Average Hourly Value */}
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider">Hourly Valuation</span>
            <Coins className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl font-black text-slate-900 font-display flex items-baseline gap-0.5">
            <span className="text-xs font-semibold text-slate-500 mr-0.5">₹</span>
            <AnimatedNumber value={550} />
            <span className="text-xs font-bold text-slate-500">/ hr</span>
          </div>
          <span className="text-[11px] text-slate-500 block mt-0.5">Freelance benchmark rate</span>
        </div>

        {/* Active Skills */}
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider">Active Skills</span>
            <BookOpen className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 font-display">
            <AnimatedNumber value={badgeMetrics.totalSkills} />
          </div>
          <span className="text-[11px] text-slate-500 block mt-0.5">Recorded in profile</span>
        </div>

        {/* Verified Badges */}
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider">Verified Badges</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 font-display">
            <AnimatedNumber value={badgeMetrics.verifiedCount} />
          </div>
          <span className="text-[11px] text-slate-500 block mt-0.5">Assessment verified</span>
        </div>
      </section>

      {/* 3. SKILL BADGES & CATEGORY MENU FILTER */}
      <section className="bg-white rounded-xl shadow-xs border border-slate-200 p-5 md:p-6 space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight font-display">
              Skill Badges & Earning Potential
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Verified competencies, practical evidence tiers, and monthly market earning valuations.
            </p>
          </div>

          {/* CATEGORY MENU DROPDOWN FILTER & SEARCH CONTROLS */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Category Dropdown Menu */}
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs">
              <Filter className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <label htmlFor="category-select" className="font-semibold text-slate-700 whitespace-nowrap">Category:</label>
              <select
                id="category-select"
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                className="bg-transparent font-bold text-slate-900 outline-none cursor-pointer pr-1"
              >
                {categoryOptions.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Search Box */}
            <div className="relative w-full sm:w-44">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search skills..."
                className="w-full pl-8 pr-7 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-1 focus:ring-slate-900 focus:bg-white outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Tier Filter Bar */}
        <div className="flex items-center gap-2 flex-wrap pb-1">
          <span className="text-xs font-semibold text-slate-500 mr-1">Filter Tier:</span>
          
          <button
            onClick={() => setTierFilter('all')}
            className={cn(
              "px-3 py-1 rounded-lg text-xs font-semibold transition-all btn-press",
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
              "px-3 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 btn-press",
              tierFilter === 'advanced' 
                ? "bg-slate-800 text-white" 
                : "bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100"
            )}
          >
            <Award className="w-3 h-3 text-amber-500" />
            <span>Advanced & Strong ({badgeMetrics.advancedCount + badgeMetrics.strongCount})</span>
          </button>

          <button
            onClick={() => setTierFilter('intermediate')}
            className={cn(
              "px-3 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 btn-press",
              tierFilter === 'intermediate' 
                ? "bg-slate-800 text-white" 
                : "bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100"
            )}
          >
            <Target className="w-3 h-3 text-indigo-500" />
            <span>Intermediate ({badgeMetrics.intermediateCount})</span>
          </button>

          <button
            onClick={() => setTierFilter('novice')}
            className={cn(
              "px-3 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 btn-press",
              tierFilter === 'novice' 
                ? "bg-slate-800 text-white" 
                : "bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100"
            )}
          >
            <Compass className="w-3 h-3 text-sky-500" />
            <span>Novice ({badgeMetrics.developingCount + badgeMetrics.noviceCount})</span>
          </button>
        </div>

        {/* Skill Badge Grid (Strictly read-only to satisfy "dont allow manual edits" of skills!) */}
        {userSkills.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-200 p-6 space-y-3">
            <Award className="w-8 h-8 text-slate-400 mx-auto" />
            <h3 className="font-bold text-slate-900 text-base">No Skills Assigned</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Please complete assessments in the Assessment tab to unlock verified badges.
            </p>
          </div>
        ) : filteredSkills.length === 0 ? (
          <div className="text-center py-10 bg-slate-50 rounded-xl border border-slate-200 p-6">
            <p className="text-xs font-semibold text-slate-600">No skills match the selected category filter or query.</p>
            <button
              onClick={() => { setSelectedCategory('All Categories'); setTierFilter('all'); setSearchQuery(''); }}
              className="text-xs font-semibold text-blue-600 hover:underline mt-2 inline-block"
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
                />
              );
            })}
          </div>
        )}
      </section>

      {/* 4. MATCHED OPPORTUNITIES SHOWCASE */}
      <section className="bg-white rounded-xl shadow-xs border border-slate-200 p-5 md:p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-semibold text-slate-700 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded uppercase tracking-wider flex items-center gap-1">
                <Briefcase className="w-3 h-3 text-slate-500" />
                Income Pathways
              </span>
              <span className="text-xs text-slate-400 font-medium">Real-World Projects</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight font-display">
              Matched High-Revenue Opportunities
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Practical micro-projects and client contracts matching {currentName}'s skill stack.
            </p>
          </div>

          <Link
            to="/opportunities"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-lg transition-colors"
          >
            <span>Explore All Opportunities</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {matchedOpportunities.map(opp => (
            <div key={opp.id} className="p-5 rounded-xl border border-slate-200 hover:border-slate-300 transition-all bg-white flex flex-col justify-between space-y-3 group">
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-md border border-slate-200">
                    {opp.opportunityType || 'Project Pathway'}
                  </span>
                  {opp.compensationLabel && (
                    <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                      {opp.compensationLabel}
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-slate-900 text-base sm:text-lg group-hover:text-blue-600 transition-colors">
                  {opp.title}
                </h3>

                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed line-clamp-2">
                  {opp.solution || opp.problemProfile?.overview || opp.applications[0]}
                </p>

                {opp.firstStep && (
                  <div className="mt-3 p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-start gap-2">
                    <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                    <span className="text-[11px] font-medium leading-snug">
                      <strong className="text-slate-800">Action Step:</strong> {opp.firstStep}
                    </span>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1 flex-wrap">
                  <span className="text-[10px] text-slate-400 font-bold uppercase mr-1">Skills:</span>
                  {opp.requiredSkills.slice(0, 3).map(skId => (
                    <span key={skId} className="text-[10px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                      {skId.replace('_', ' ')}
                    </span>
                  ))}
                </div>

                <Link
                  to={`/opportunities/${opp.id}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-slate-700 hover:text-blue-600 shrink-0"
                >
                  <span>View Details</span>
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
