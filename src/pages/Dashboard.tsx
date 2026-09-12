import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../context/ProfileContext';
import { useBusiness } from '../context/BusinessContext';
import { useRoadmap } from '../context/RoadmapContext';
import { SKILLS_DB, Skill } from '../data/skills';
import { OPPORTUNITIES_DB, calculateMatch } from '../data/opportunities';
import { 
  Brain, Cpu, Target, ArrowRight, Zap, Combine, Blocks, 
  CheckCircle2, Circle, Sparkles, UserCheck, Award, Compass, 
  ChevronRight, ArrowUpRight, Briefcase, TrendingUp, Calculator, DollarSign,
  FolderKanban, MapPin
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function Dashboard() {
  const { profile, userSkills, customSkills, customOpportunities, getSkillDetails, isProfileComplete } = useProfile();
  const { scenarios, activeScenario } = useBusiness();
  const { progressMetrics, targetOpportunity, projects } = useRoadmap();
  const navigate = useNavigate();

  const allSkills = useMemo(() => [...SKILLS_DB, ...customSkills], [customSkills]);
  const allOpps = useMemo(() => [...OPPORTUNITIES_DB, ...customOpportunities], [customOpportunities]);

  const topSkills = [...userSkills]
    .sort((a, b) => {
      const weight = { Advanced: 5, Strong: 4, Intermediate: 3, Developing: 2, Beginner: 1 };
      return weight[b.proficiency] - weight[a.proficiency];
    })
    .slice(0, 3)
    .map(us => getSkillDetails(us.skillId))
    .filter(Boolean) as Skill[];

  // Comprehensive Getting Started Tracker Steps
  const isProfileSetup = Boolean(profile?.name && profile.name.trim() !== '' && profile?.role);

  const gettingStartedSteps = [
    {
      id: 'profile',
      title: 'Setup Profile & Role',
      description: 'Define your identity as a Student, Parent, or Educator/Judge.',
      completed: isProfileSetup,
      actionLabel: isProfileSetup ? 'Edit Profile' : 'Setup Profile',
      path: '/profile'
    },
    {
      id: 'skills',
      title: 'Add Your Core Skills',
      description: 'Add at least 3 skills from the curriculum or use G-ONE AI search.',
      completed: userSkills.length >= 3,
      badge: `${userSkills.length}/3 Skills`,
      actionLabel: userSkills.length >= 3 ? 'Manage Skills' : 'Add Skills',
      path: '/skills'
    },
    {
      id: 'proficiency',
      title: 'Assess Skill Proficiency',
      description: 'Calibrate your proficiency levels to visualize your unique Skill DNA.',
      completed: userSkills.length > 0 && userSkills.some(s => s.proficiency !== 'Beginner'),
      actionLabel: 'Calibrate Levels',
      path: '/skills'
    },
    {
      id: 'opportunities',
      title: 'Explore Mapped Opportunities',
      description: 'Discover viable micro-enterprises and project paths calculated for your skills.',
      completed: userSkills.length >= 2,
      actionLabel: 'Browse Pathways',
      path: '/opportunities'
    },
    {
      id: 'builder',
      title: 'Build With Your Skills',
      description: 'Follow the chain: Skill → Application → Problem → Solution.',
      completed: false, // interactive action
      actionLabel: 'Launch Builder',
      path: '/build'
    }
  ];

  const completedCount = gettingStartedSteps.filter(s => s.completed).length;
  const progressPercent = Math.round((completedCount / (gettingStartedSteps.length - 1)) * 100);

  // Calculate top opportunities
  const topOpportunities = useMemo(() => {
    if (userSkills.length === 0) {
      // If user hasn't added skills, showcase 3 prominent curated starter opportunities
      return allOpps.slice(0, 3).map(opp => ({
        ...opp,
        match: { score: 75, label: 'Curated Starter', matchedRequired: [], matchedPreferred: [], missingRequired: opp.requiredSkills, explanation: 'Explore this high-demand CBSE Expo pathway.' }
      }));
    }
    return allOpps.map(opp => {
      return { ...opp, match: calculateMatch(userSkills, opp, allSkills) };
    })
    .sort((a, b) => b.match.score - a.match.score)
    .slice(0, 3);
  }, [allOpps, userSkills, allSkills]);

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-16 max-w-7xl mx-auto">
      
      {/* Platform Banner Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" /> CBSE Skill Expo 2026 — Theme: Entrepreneurship & Financial Literacy
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            {profile?.name ? `Welcome back, ${profile.name}` : 'Welcome to Kaushal Setu'}
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Transforming student capabilities into real-world projects, micro-enterprises, and viable pathways with G-ONE intelligence.
          </p>
        </div>

        {profile?.role && (
          <div className="px-3.5 py-1.5 bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-blue-600" />
            <span>Role: {profile.role}</span>
          </div>
        )}
      </div>

      {/* PROMINENT GETTING STARTED PROGRESS TRACKER */}
      <section className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 p-6 md:p-8 text-white relative overflow-hidden">
          <div className="absolute -right-12 -top-12 opacity-10 pointer-events-none">
            <Compass className="w-72 h-72 text-white" />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider text-white">
                <Brain className="w-4 h-4 text-amber-300" />
                Getting Started Progress Tracker
              </div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                Skill-to-Opportunity Pathway Roadmap
              </h2>
              <p className="text-blue-100 text-sm max-w-2xl leading-relaxed">
                Complete your profile and skill mapping to enable G-ONE's transparent matching algorithm and unlock customized venture blueprints.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 md:p-5 flex flex-col items-center justify-center min-w-[170px] shrink-0 text-center">
              <span className="text-3xl md:text-4xl font-black text-white">{Math.min(progressPercent, 100)}%</span>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-200 mt-1">
                {progressPercent >= 100 ? 'Fully Initialized' : 'Readiness Level'}
              </span>
            </div>
          </div>

          {/* Master Progress Bar */}
          <div className="mt-6">
            <div className="h-2.5 w-full bg-blue-900/40 rounded-full overflow-hidden p-0.5 border border-white/10">
              <div 
                className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 rounded-full transition-all duration-700 ease-out"
                style={{ width: `${Math.min(progressPercent, 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Step Items Grid */}
        <div className="p-6 md:p-8 divide-y divide-slate-100">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2 pb-2">
            {gettingStartedSteps.slice(0, 3).map((step, idx) => (
              <div 
                key={step.id} 
                className={cn(
                  "p-5 rounded-2xl border transition-all flex flex-col justify-between",
                  step.completed 
                    ? "bg-emerald-50/40 border-emerald-200" 
                    : "bg-slate-50/60 border-slate-200 hover:border-slate-300"
                )}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Step 0{idx + 1}
                    </span>
                    {step.completed ? (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700 bg-amber-100/70 px-2 py-0.5 rounded-md">
                        <Circle className="w-3.5 h-3.5" /> Pending
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-slate-900 text-base mb-1.5">{step.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">{step.description}</p>
                </div>

                <button
                  onClick={() => navigate(step.path)}
                  className={cn(
                    "w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors mt-auto",
                    step.completed
                      ? "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
                      : "bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
                  )}
                >
                  <span>{step.actionLabel}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Secondary Action Steps Banner */}
          <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {gettingStartedSteps.slice(3).map((step, idx) => (
              <div 
                key={step.id}
                className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center justify-between gap-4 hover:shadow-sm transition-shadow"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 font-bold text-sm">
                    0{idx + 4}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{step.title}</h4>
                    <p className="text-xs text-slate-500 line-clamp-1">{step.description}</p>
                  </div>
                </div>

                <button
                  onClick={() => navigate(step.path)}
                  className="shrink-0 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1 transition-colors"
                >
                  <span>{step.actionLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* G-ONE Intelligence & Explorer Highlight Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 md:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 border border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Cpu className="w-64 h-64" />
        </div>
        
        <div className="relative z-10 space-y-3">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-blue-400" />
            <span className="text-xs font-bold tracking-widest uppercase text-blue-400">G-ONE Intelligence Layer Active</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Interdisciplinary Skill-to-Opportunity Engine
          </h2>
          <p className="text-slate-300 max-w-xl text-sm leading-relaxed">
            Every recommendation is calculated transparently against required skills, proficiency levels, and real-world commercial problems. Try combining your skills to uncover student-led micro-enterprises.
          </p>
        </div>
        
        <div className="relative z-10 shrink-0 flex flex-col sm:flex-row md:flex-col gap-3 w-full md:w-auto">
          <button 
            onClick={() => navigate('/opportunities')}
            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3.5 rounded-xl font-bold transition-colors shadow-lg flex items-center justify-center gap-2 w-full text-sm"
          >
            <Combine className="w-4 h-4" />
            Combine Skills in Explorer
          </button>
          <button 
            onClick={() => navigate('/build')}
            className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3 rounded-xl font-medium transition-colors backdrop-blur-sm flex items-center justify-center gap-2 w-full text-sm"
          >
            <Blocks className="w-4 h-4" />
            What Can I Build?
          </button>
        </div>
      </div>

      {/* Top Opportunity Matches Section */}
      <div>
        <div className="flex justify-between items-end mb-6">
          <div>
            <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">Curated Pathways</div>
            <h2 className="text-2xl font-bold text-slate-900">Opportunities For You</h2>
            <p className="text-slate-600 text-sm">
              {userSkills.length > 0 
                ? 'Top recommendations based on your current skills and proficiency levels' 
                : 'Featured entrepreneurship & financial literacy pathways from CBSE curriculum'}
            </p>
          </div>
          <button 
            onClick={() => navigate('/opportunities')}
            className="text-blue-600 font-bold text-sm hover:underline flex items-center gap-1"
          >
            View All Opportunities <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topOpportunities.map(opp => (
            <div key={opp.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col hover:shadow-md hover:border-slate-300 transition-all group">
              <div className="p-6 md:p-8 border-b border-slate-100 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4 gap-2">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-100 text-slate-700 uppercase tracking-wider">
                    {opp.category}
                  </span>
                  <div className={cn(
                    "px-2.5 py-1 rounded-xl text-xs font-bold flex items-center gap-1 border",
                    opp.match.score >= 80 ? "bg-emerald-50 text-emerald-800 border-emerald-200" : 
                    opp.match.score >= 50 ? "bg-blue-50 text-blue-800 border-blue-200" : "bg-slate-100 text-slate-700 border-slate-200"
                  )}>
                    {opp.match.score}% Match
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {opp.title}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-2 mb-6 leading-relaxed">
                  {opp.solution}
                </p>
                
                <div className="mt-auto pt-4 border-t border-slate-100">
                  <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Required Skills</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {opp.requiredSkills.map(id => {
                      const hasSkill = userSkills.some(us => us.skillId === id);
                      return (
                        <span 
                          key={id} 
                          className={cn(
                            "text-[11px] px-2 py-0.5 rounded-lg font-medium border flex items-center gap-1",
                            hasSkill 
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
                              : "bg-slate-50 text-slate-600 border-slate-200"
                          )}
                        >
                          {hasSkill && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                          {allSkills.find(s => s.id === id)?.name || id}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
              <button 
                onClick={() => navigate(`/opportunities/${opp.id}`)}
                className="w-full bg-slate-50 p-4 text-xs font-bold text-slate-700 hover:bg-slate-100 hover:text-blue-600 transition-colors flex items-center justify-center gap-2 border-t border-slate-100"
              >
                View Full Profile Pathway <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* PHASE 3: MY ENTREPRENEURIAL EXPLORATION */}
      <section className="bg-slate-900 text-white rounded-3xl border border-slate-800 p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-emerald-500/10 via-blue-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
                <Briefcase className="w-4 h-4" /> Phase 3 • Financial Simulation Engine
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-white">
                My Entrepreneurial Exploration
              </h2>
              <p className="text-xs text-slate-400 max-w-2xl mt-1">
                Real-time tracking of business hypotheses, unit economics, and break-even customer targets developed in the lab.
              </p>
            </div>

            <button
              onClick={() => navigate('/business-builder')}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-lg shadow-emerald-900/30 flex items-center gap-2"
            >
              Open Build My Business Lab <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* 6 Key Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                Opportunities Explored
              </span>
              <span className="text-2xl font-black text-white font-mono">
                {allOpps.length}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                Business Models Created
              </span>
              <span className="text-2xl font-black text-emerald-400 font-mono">
                {scenarios.length}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                Active Scenario
              </span>
              <span className="text-xs font-bold text-blue-300 truncate block mt-2" title={activeScenario?.scenarioName}>
                {activeScenario?.scenarioName || 'None'}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                Current Break-Even
              </span>
              <span className="text-2xl font-black text-amber-400 font-mono">
                {activeScenario?.breakEvenCustomers !== null && activeScenario?.breakEvenCustomers !== undefined 
                  ? `${activeScenario.breakEvenCustomers}` 
                  : 'N/A'}
                <span className="text-[10px] font-normal text-slate-400 ml-1">cust</span>
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                Skills Applied
              </span>
              <span className="text-2xl font-black text-white font-mono">
                {userSkills.length}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                Next Skills to Gain
              </span>
              <span className="text-2xl font-black text-indigo-400 font-mono">
                {Math.max(0, allSkills.length - userSkills.length)}
              </span>
            </div>
          </div>

          {/* Active Scenario Banner */}
          {activeScenario && (
            <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold">
                  ₹
                </div>
                <div>
                  <div className="font-bold text-white">
                    {activeScenario.scenarioName}: {activeScenario.opportunityTitle}
                  </div>
                  <div className="text-slate-400 text-[11px]">
                    Price: ₹{activeScenario.pricePerUnit.toLocaleString()} • Volume: {activeScenario.customerCount} customers • Projected Revenue: ₹{activeScenario.revenue.toLocaleString()} • Monthly Surplus: +₹{activeScenario.surplus.toLocaleString()}
                  </div>
                </div>
              </div>

              <button
                onClick={() => navigate('/business-builder')}
                className="text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1 shrink-0"
              >
                Refine Scenario <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* PHASE 4: PERSONALIZED ACTION ROADMAP & PORTFOLIO */}
      <section className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">
              <Compass className="w-4 h-4" /> Phase 4 • Action Roadmap & Evidence
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Personalised Skill & Action Roadmap
            </h2>
            <p className="text-xs text-slate-500 max-w-2xl mt-1">
              Follow 6 concrete stages from skill foundations to practical project delivery, low-stakes customer trials, and structured reflections.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/roadmap')}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
            >
              <Compass className="w-4 h-4" /> View My Roadmap
            </button>
            <button
              onClick={() => navigate('/projects')}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <FolderKanban className="w-4 h-4 text-indigo-600" /> Projects & Portfolio
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-5 rounded-2xl bg-indigo-50/50 border border-indigo-100 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-900 uppercase">Target Pathway</span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
                {progressMetrics.percentComplete}% Complete
              </span>
            </div>
            <h3 className="font-bold text-slate-900 text-base">
              {targetOpportunity?.title || 'Product Photography Service'}
            </h3>
            <p className="text-xs text-slate-600 line-clamp-2">
              {targetOpportunity?.solution || 'Help neighborhood stores with high-clarity catalog photos and social promo tiles.'}
            </p>
            <div className="pt-2 border-t border-indigo-100/80 flex items-center justify-between text-xs">
              <span className="text-slate-500">Milestone Actions:</span>
              <span className="font-bold text-slate-800">
                {progressMetrics.completedActions} / {progressMetrics.totalActions} Done
              </span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <span className="text-xs font-bold text-slate-700 uppercase">Target Skills Covered</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900">
                {progressMetrics.targetSkillsCovered}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                / {progressMetrics.totalTargetSkills} skills verified
              </span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(progressMetrics.targetSkillsCovered / Math.max(1, progressMetrics.totalTargetSkills)) * 100}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-500">
              Identified gaps: Pricing, Client Communication & Briefing.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <span className="text-xs font-bold text-slate-700 uppercase">Active Portfolio</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900">
                {projects.length}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                tangible projects ({progressMetrics.completedProjects} verified complete)
              </span>
            </div>
            <div className="text-xs text-slate-600 space-y-1">
              {projects.slice(0, 2).map(p => (
                <div key={p.id} className="truncate font-medium text-slate-700 flex items-center gap-1.5">
                  <CheckCircle2 className={`w-3.5 h-3.5 ${p.status === 'completed' ? 'text-emerald-600' : 'text-slate-400'}`} />
                  <span>{p.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

