import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../context/ProfileContext';
import { useBusiness } from '../context/BusinessContext';
import { useRoadmap } from '../context/RoadmapContext';
import { SKILLS_DB, Skill } from '../data/skills';
import { OPPORTUNITIES_DB, calculateMatch } from '../data/opportunities';
import { MatchScoreBadge } from '../components/opportunities/MatchScoreBadge';
import { 
  Brain, ArrowRight, Combine, Blocks, 
  CheckCircle2, Circle, UserCheck, Compass, 
  ChevronRight, ArrowUpRight, Briefcase,
  FolderKanban
} from 'lucide-react';
import { cn } from '../lib/utils';
import { triggerFeatureTour } from '../components/OnboardingManager';
import { AnimatedNumber } from '../components/common/AnimatedNumber';

export default function Dashboard() {
  const { profile, userSkills, customSkills, customOpportunities, getSkillDetails } = useProfile();
  const { scenarios, activeScenario } = useBusiness();
  const { progressMetrics, targetOpportunity, projects } = useRoadmap();
  const navigate = useNavigate();

  const allSkills = useMemo(() => [...SKILLS_DB, ...customSkills], [customSkills]);
  const allOpps = useMemo(() => [...OPPORTUNITIES_DB, ...customOpportunities], [customOpportunities]);

  const isProfileSetup = Boolean(profile?.name && profile.name.trim() !== '' && profile?.role);

  const gettingStartedSteps = [
    {
      id: 'profile',
      title: 'Setup Profile & Role',
      description: 'Define your identity as a Student, Parent, or Educator.',
      completed: isProfileSetup,
      actionLabel: isProfileSetup ? 'Edit Profile' : 'Setup Profile',
      path: '/profile'
    },
    {
      id: 'skills',
      title: 'Add Your Core Skills',
      description: 'Add at least 3 skills from the curriculum or search.',
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
      path: '/assessment'
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
      completed: (scenarios && scenarios.length > 0) || (projects && projects.length > 0),
      actionLabel: 'Launch Builder',
      path: '/build'
    }
  ];

  const completedCount = gettingStartedSteps.filter(s => s.completed).length;
  const progressPercent = Math.min(100, Math.round((completedCount / gettingStartedSteps.length) * 100));

  const topOpportunities = useMemo(() => {
    if (userSkills.length === 0) {
      return allOpps.slice(0, 3).map(opp => ({
        ...opp,
        match: { score: 75, label: 'Curated Starter', matchedRequired: [], matchedPreferred: [], missingRequired: opp.requiredSkills, explanation: 'Explore this high-demand vocational pathway.' }
      }));
    }
    return allOpps.map(opp => {
      return { ...opp, match: calculateMatch(userSkills, opp, allSkills) };
    })
    .sort((a, b) => b.match.score - a.match.score)
    .slice(0, 3);
  }, [allOpps, userSkills, allSkills]);

  return (
    <div className="space-y-8 animate-in fade-in duration-200 pb-16 max-w-6xl mx-auto">
      
      {/* Platform Banner Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-0.5">
            Vocational Competency & Earning Pathways
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {profile?.name ? `Welcome back, ${profile.name}` : 'Welcome to Kaushal Setu'}
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm mt-0.5">
            Transforming student capabilities into real-world projects, micro-enterprises, and viable pathways.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={triggerFeatureTour}
            className="flex items-center gap-1.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors shadow-xs"
          >
            <span>Feature Guide (5 Steps)</span>
          </button>

          {profile?.role && (
            <div className="px-3.5 py-2 bg-blue-50 border border-blue-200 rounded-xl text-xs font-semibold text-blue-800 flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>Role: {profile.role}</span>
            </div>
          )}
        </div>
      </div>

      {/* 1. GETTING STARTED PROGRESS TRACKER */}
      <section className="bg-slate-900 text-white rounded-2xl border border-slate-800 overflow-hidden shadow-sm">
        <div className="p-6 md:p-7 border-b border-slate-800">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div className="space-y-1">
              <span className="text-[11px] font-semibold text-blue-400 uppercase tracking-wider">
                Getting Started Progress
              </span>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                Skill-to-Opportunity Pathway Roadmap
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm max-w-xl leading-relaxed">
                Complete your profile and skill mapping to enable transparent opportunity matching and customized venture blueprints.
              </p>
            </div>

            <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-4 flex flex-col items-center justify-center min-w-[150px] shrink-0 text-center">
              <span className="text-3xl font-black text-white font-mono">
                <AnimatedNumber value={Math.min(progressPercent, 100)} suffix="%" duration={600} />
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mt-0.5">
                {progressPercent >= 100 ? 'Fully Initialized' : 'Readiness Level'}
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-5">
            <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden border border-slate-700/60">
              <div 
                style={{ width: `${Math.min(progressPercent, 100)}%` }}
                className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full transition-all duration-500"
              />
            </div>
          </div>
        </div>

        {/* Step Items Grid */}
        <div className="p-5 md:p-6 bg-slate-950/40">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {gettingStartedSteps.slice(0, 3).map((step, idx) => (
              <div 
                key={step.id} 
                className={cn(
                  "p-4 rounded-xl border transition-colors flex flex-col justify-between",
                  step.completed 
                    ? "bg-slate-900 border-slate-700 text-white" 
                    : "bg-slate-900/60 border-slate-800 text-slate-300"
                )}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono text-slate-400">Step 0{idx + 1}</span>
                    {step.completed ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Done
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                        <Circle className="w-3 h-3" /> Pending
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-white text-sm mb-1">{step.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-3">{step.description}</p>
                </div>

                <button
                  onClick={() => navigate(step.path)}
                  className={cn(
                    "w-full py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-colors mt-auto",
                    step.completed
                      ? "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
                      : "bg-blue-600 hover:bg-blue-500 text-white"
                  )}
                >
                  <span>{step.actionLabel}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          {/* Secondary Action Steps */}
          <div className="mt-3.5 grid grid-cols-1 md:grid-cols-2 gap-3">
            {gettingStartedSteps.slice(3).map((step, idx) => (
              <div 
                key={step.id} 
                className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 flex items-center justify-between gap-3 text-white"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center shrink-0 font-mono text-xs font-bold">
                    0{idx + 4}
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xs sm:text-sm">{step.title}</h4>
                    <p className="text-[11px] text-slate-400 line-clamp-1">{step.description}</p>
                  </div>
                </div>

                <button
                  onClick={() => navigate(step.path)}
                  className="shrink-0 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
                >
                  <span>{step.actionLabel}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. G-ONE EXPLORER QUICK ACTION */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-2xl p-6 border border-blue-800/60 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-5 relative overflow-hidden">
        <div className="relative z-10 space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-300">
            <Brain className="w-4 h-4 text-blue-400" />
            <span>Curriculum-to-Market Synthesis Engine</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Interdisciplinary Skill-to-Opportunity Engine
          </h2>
          <p className="text-blue-200 text-xs sm:text-sm max-w-xl">
            Recommendations are evaluated against required competencies, proficiency levels, and real client problems.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-3 shrink-0 w-full md:w-auto">
          <button 
            onClick={() => navigate('/opportunities')}
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-xl font-semibold transition-colors flex items-center justify-center gap-1.5 text-xs sm:text-sm shadow-md shadow-blue-950/40 w-full md:w-auto"
          >
            <Combine className="w-4 h-4" />
            <span>Explore Pathways</span>
          </button>
          <button 
            onClick={() => navigate('/build')}
            className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-4 py-2.5 rounded-xl font-semibold transition-colors flex items-center justify-center gap-1.5 text-xs sm:text-sm w-full md:w-auto"
          >
            <Blocks className="w-4 h-4 text-blue-300" />
            <span>What Can I Build?</span>
          </button>
        </div>
      </div>

      {/* 3. TOP OPPORTUNITY MATCHES SECTION */}
      <section className="space-y-4">
        <div className="flex justify-between items-end border-b border-slate-200 pb-3">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-0.5">Curated Pathways</span>
            <h2 className="text-xl font-bold text-slate-900">Opportunities For You</h2>
            <p className="text-slate-500 text-xs">
              {userSkills.length > 0 
                ? 'Recommendations based on your verified skills and proficiency levels.' 
                : 'Featured entrepreneurship and financial literacy pathways.'}
            </p>
          </div>
          <button 
            onClick={() => navigate('/opportunities')}
            className="text-blue-600 font-semibold text-xs hover:text-blue-700 flex items-center gap-1 transition-colors"
          >
            <span>View All Pathways</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {topOpportunities.map(opp => (
            <div 
              key={opp.id} 
              className="bg-white rounded-2xl border border-slate-200 hover:border-slate-300 transition-colors shadow-sm flex flex-col justify-between overflow-hidden"
            >
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-3 gap-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200 uppercase tracking-wider">
                    {opp.category}
                  </span>
                  <MatchScoreBadge 
                    opportunity={opp} 
                    precomputedMatch={opp.match} 
                    variant="compact" 
                  />
                </div>
                
                <h3 className="text-base font-bold text-slate-900 mb-1.5 hover:text-blue-600 transition-colors">
                  {opp.title}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
                  {opp.solution}
                </p>
                
                <div className="mt-auto pt-3 border-t border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Required Skills</span>
                  <div className="flex flex-wrap gap-1">
                    {opp.requiredSkills.map(id => {
                      const hasSkill = userSkills.some(us => us.skillId === id);
                      return (
                        <span 
                          key={id} 
                          className={cn(
                            "text-[10px] px-2 py-0.5 rounded font-medium border flex items-center gap-1",
                            hasSkill 
                              ? "bg-emerald-50 text-emerald-800 border-emerald-200 font-semibold" 
                              : "bg-slate-50 text-slate-600 border-slate-200"
                          )}
                        >
                          {hasSkill && <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />}
                          {allSkills.find(s => s.id === id)?.name || id}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>

              <button 
                onClick={() => navigate(`/opportunities/${opp.id}`)}
                className="w-full bg-slate-50 p-3 text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors flex items-center justify-center gap-1 border-t border-slate-100"
              >
                <span>View Full Pathway</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 4. FINANCIAL SIMULATION & BUSINESS LAB */}
      <section className="bg-slate-900 text-white rounded-2xl border border-slate-800 p-6 shadow-md space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-0.5">
              <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
              <span>Financial Simulation Engine</span>
            </div>
            <h2 className="text-xl font-bold tracking-tight text-white">
              My Entrepreneurial Exploration
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Real-time tracking of business hypotheses, unit economics, and break-even customer targets.
            </p>
          </div>

          <button
            onClick={() => navigate('/business-builder')}
            className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <span>Open Business Lab</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 6 Key Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
              Pathways Explored
            </span>
            <span className="text-xl font-black text-white font-mono">
              {allOpps.length}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
              Models Created
            </span>
            <span className="text-xl font-black text-emerald-400 font-mono">
              {scenarios.length}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
              Active Scenario
            </span>
            <span className="text-xs font-bold text-white truncate block mt-1" title={activeScenario?.scenarioName}>
              {activeScenario?.scenarioName || 'None'}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
              Break-Even Target
            </span>
            <span className="text-xl font-black text-white font-mono">
              {activeScenario?.breakEvenCustomers !== null && activeScenario?.breakEvenCustomers !== undefined 
                ? `${activeScenario.breakEvenCustomers}` 
                : '3'}
              <span className="text-[10px] font-normal text-slate-400 ml-1">clients</span>
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
              Skills Applied
            </span>
            <span className="text-xl font-black text-white font-mono">
              {userSkills.length}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
              Next Skills to Gain
            </span>
            <span className="text-xl font-black text-white font-mono">
              {Math.max(0, allSkills.length - userSkills.length)}
            </span>
          </div>
        </div>

        {/* Active Scenario Banner */}
        {activeScenario && (
          <div className="p-4 rounded-xl bg-slate-800/90 border border-slate-700 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-sm">
                ₹
              </div>
              <div>
                <div className="font-bold text-white text-sm">
                  {activeScenario.scenarioName}: {activeScenario.opportunityTitle}
                </div>
                <div className="text-slate-400 text-xs">
                  Price: ₹{activeScenario.pricePerUnit.toLocaleString()} • Clients: {activeScenario.customerCount} • Monthly Revenue: ₹{activeScenario.revenue.toLocaleString()} • Surplus: +₹{activeScenario.surplus.toLocaleString()}
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate('/business-builder')}
              className="text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1 shrink-0"
            >
              <span>Refine Scenario</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </section>

      {/* 5. PERSONALIZED ACTION ROADMAP & PORTFOLIO */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-0.5">
              <Compass className="w-3.5 h-3.5 text-indigo-600" />
              <span>Action Roadmap & Evidence</span>
            </div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900">
              Personalised Skill & Action Roadmap
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Follow concrete stages from skill foundations to practical project delivery and low-stakes client trials.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/roadmap')}
              className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>View Roadmap</span>
            </button>
            <button
              onClick={() => navigate('/projects')}
              className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors flex items-center gap-1.5 border border-slate-200"
            >
              <FolderKanban className="w-3.5 h-3.5 text-slate-600" />
              <span>Portfolio</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-700 uppercase">Target Pathway</span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                {progressMetrics.percentComplete}% Complete
              </span>
            </div>
            <h3 className="font-bold text-slate-900 text-sm">
              {targetOpportunity?.title || 'Product Photography Service'}
            </h3>
            <p className="text-xs text-slate-600 line-clamp-2">
              {targetOpportunity?.solution || 'Help neighborhood stores with high-clarity catalog photos and social promo tiles.'}
            </p>
            <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs">
              <span className="text-slate-500">Actions:</span>
              <span className="font-bold text-slate-800">
                {progressMetrics.completedActions} / {progressMetrics.totalActions} Done
              </span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
            <span className="text-[11px] font-bold text-slate-700 uppercase block">Target Skills Covered</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-slate-900 font-mono">
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

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
            <span className="text-[11px] font-bold text-slate-700 uppercase block">Active Portfolio</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-slate-900 font-mono">
                {projects.length}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                tangible projects ({progressMetrics.completedProjects} verified)
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
