import React, { useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useProfile } from '../context/ProfileContext';
import { useBusiness } from '../context/BusinessContext';
import { useRoadmap } from '../context/RoadmapContext';
import { SKILLS_DB, Skill } from '../data/skills';
import { OPPORTUNITIES_DB, calculateMatch } from '../data/opportunities';
import { 
  ArrowRight, Check, Sparkles, BrainCircuit, Blocks, 
  Layers, Compass, FolderKanban, ShieldCheck, Target,
  Combine, TrendingUp, Zap, Award, BookOpen
} from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';
import { KaushalPathwayBanner } from '../components/common/KaushalPathwayBanner';

export default function Dashboard() {
  const { profile, userSkills, customSkills, customOpportunities, getSkillDetails } = useProfile();
  const { activeScenario } = useBusiness();
  const { progressMetrics, projects } = useRoadmap();
  const navigate = useNavigate();

  const allSkills = useMemo(() => [...SKILLS_DB, ...customSkills], [customSkills]);
  const allOpps = useMemo(() => [...OPPORTUNITIES_DB, ...customOpportunities], [customOpportunities]);

  const studentFirstName = profile?.name?.trim() ? profile.name.split(' ')[0] : 'Garvit';

  // Dynamic greeting based on time of day
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  }, []);

  // Pathway Progress Milestones
  const pathwaySteps = useMemo(() => [
    {
      id: 'profile',
      label: 'Profile',
      completed: Boolean(profile?.name && profile.name.trim() !== ''),
      href: '/profile',
      description: 'Credentials & interests'
    },
    {
      id: 'skills',
      label: 'My Skills',
      completed: userSkills.length >= 3,
      href: '/skills',
      description: `${userSkills.length}/3 core skills`
    },
    {
      id: 'assessment',
      label: 'Assessment',
      completed: userSkills.some(s => s.indicativeProficiency),
      href: '/assessment',
      description: 'Competency verified'
    },
    {
      id: 'opportunities',
      label: 'Opportunities',
      completed: userSkills.length >= 2,
      href: '/opportunities',
      description: 'Pathways matched'
    },
    {
      id: 'build',
      label: 'Build',
      completed: (projects && projects.length > 0) || Boolean(activeScenario),
      href: '/build',
      description: 'Projects & ventures'
    },
    {
      id: 'roadmap',
      label: 'Roadmap',
      completed: progressMetrics.percentComplete >= 50,
      href: '/roadmap',
      description: 'Growth tracking'
    }
  ], [profile, userSkills, projects, activeScenario, progressMetrics]);

  const completedCount = pathwaySteps.filter(s => s.completed).length;
  const progressPercent = Math.round((completedCount / pathwaySteps.length) * 100);

  // Determine next milestone
  const nextStep = pathwaySteps.find(s => !s.completed) || pathwaySteps[pathwaySteps.length - 1];

  // Best matched opportunity
  const topMatch = useMemo(() => {
    if (userSkills.length === 0) {
      return {
        ...allOpps[0],
        matchScore: 82,
        explanation: 'Top vocational track matched for introductory learners.'
      };
    }
    const evaluated = allOpps.map(opp => ({
      ...opp,
      match: calculateMatch(userSkills, opp, allSkills)
    })).sort((a, b) => b.match.score - a.match.score);

    return {
      ...evaluated[0],
      matchScore: evaluated[0].match.score,
      explanation: evaluated[0].match.explanation
    };
  }, [allOpps, userSkills, allSkills]);

  // Skill DNA dimensions
  const dnaScores = useMemo(() => {
    let tech = 65, creative = 75, comm = 80, prob = 70, entre = 60;
    userSkills.forEach(us => {
      const details = getSkillDetails(us.skillId);
      const cat = details?.category?.toLowerCase() || '';
      const w = us.proficiency === 'Advanced' ? 25 : us.proficiency === 'Strong' ? 18 : 10;
      if (cat.includes('technical') || cat.includes('coding') || cat.includes('circuit')) tech = Math.min(95, tech + w);
      if (cat.includes('creative') || cat.includes('design') || cat.includes('craft')) creative = Math.min(95, creative + w);
      if (cat.includes('communication') || cat.includes('content') || cat.includes('social')) comm = Math.min(95, comm + w);
      if (cat.includes('problem') || cat.includes('analysis') || cat.includes('science')) prob = Math.min(95, prob + w);
      if (cat.includes('business') || cat.includes('finance') || cat.includes('marketing')) entre = Math.min(95, entre + w);
    });
    return { tech, creative, comm, prob, entre };
  }, [userSkills, getSkillDetails]);

  return (
    <div className="space-y-7 max-w-5xl mx-auto pb-16 animate-in fade-in duration-300">
      
      {/* 1. TOP HERO GREETING & PRIMARY CALL-TO-ACTION */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-xs relative overflow-hidden transition-colors">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-1.5 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wide">
                {greeting}, {studentFirstName}
              </span>
              <span className="text-slate-300 dark:text-slate-400">·</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                {profile.academicGrade || 'Class 10 Vocational'}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-heading font-bold text-slate-950 dark:text-white tracking-tight leading-tight">
              Turn what you learn into what you can create.
            </h1>
            
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pt-1">
              Your abilities connect directly to viable micro-ventures, client deliverables, and vocational opportunities.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            <button
              onClick={() => navigate(nextStep.href)}
              className="inline-flex items-center justify-center gap-2 bg-slate-950 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-700 text-white text-xs font-semibold px-5 py-3 rounded-xl transition-all shadow-xs btn-press"
            >
              <span>Continue Step: {nextStep.label}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 2. RECURRING SIGNATURE PATHWAY */}
      <KaushalPathwayBanner 
        currentStep={
          nextStep.id === 'profile' || nextStep.id === 'skills' ? 'SKILL' :
          nextStep.id === 'assessment' ? 'CAPABILITY' :
          nextStep.id === 'opportunities' ? 'OPPORTUNITY' :
          nextStep.id === 'build' ? 'APPLICATION' : 'CAREER_BUSINESS'
        }
      />

      {/* 3. PATHWAY PROGRESS STRIP */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 shadow-xs space-y-4 transition-colors">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div>
            <h2 className="text-xs font-mono font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider">
              YOUR JOURNEY MILESTONES
            </h2>
            <p className="text-sm font-heading font-semibold text-slate-900 dark:text-slate-100 mt-0.5">
              {progressPercent}% Journey Completed · Next Action: {nextStep.label}
            </p>
          </div>

          <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-300 tabular-nums bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
            {completedCount}/{pathwaySteps.length} Milestones
          </span>
        </div>

        {/* Master Progress Line */}
        <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${Math.max(8, progressPercent)}%` }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="h-full bg-blue-600 rounded-full"
          />
        </div>

        {/* Clean Step Sequence */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 pt-1">
          {pathwaySteps.map((step, idx) => {
            const isCurrent = step.id === nextStep.id;
            return (
              <Link
                key={step.id}
                to={step.href}
                className={cn(
                  "p-3 rounded-xl border text-left transition-all group flex flex-col justify-between",
                  step.completed 
                    ? "bg-slate-50/70 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                    : isCurrent
                      ? "bg-blue-50/70 dark:bg-blue-950/40 border-blue-300 dark:border-blue-700 ring-2 ring-blue-500/10"
                      : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700"
                )}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono font-semibold text-slate-400 dark:text-slate-400">
                    0{idx + 1}
                  </span>
                  {step.completed ? (
                    <span className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 flex items-center justify-center text-[10px] font-bold">
                      ✓
                    </span>
                  ) : isCurrent ? (
                    <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-slate-200 dark:bg-slate-700" />
                  )}
                </div>

                <div>
                  <span className={cn(
                    "text-xs font-bold block leading-tight",
                    step.completed 
                      ? "text-slate-800 dark:text-slate-200" 
                      : isCurrent 
                        ? "text-blue-900 dark:text-blue-300 font-bold" 
                        : "text-slate-500 dark:text-slate-400"
                  )}>
                    {step.label}
                  </span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-400 block truncate mt-0.5">
                    {step.description}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 4. SKILL DNA SIGNATURE & G-ONE REASONING INSIGHT */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Card A: YOUR SKILL DNA */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 shadow-xs flex flex-col justify-between transition-colors">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <BrainCircuit className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <h2 className="text-xs font-mono font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider">
                  SKILL DNA PROFILE
                </h2>
              </div>
              <Link 
                to="/dna"
                className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
              >
                <span>Explore Full DNA</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {/* 5-Axis Dimensional Overview */}
            <div className="p-4 bg-slate-50/80 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800 mb-4">
              <div className="grid grid-cols-5 gap-2 text-center">
                <div>
                  <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 block truncate">Technical</span>
                  <span className="text-xs font-mono font-bold text-slate-900 dark:text-slate-100 tabular-nums">{dnaScores.tech}%</span>
                  <div className="h-1 bg-slate-200 dark:bg-slate-700 rounded-full mt-1.5 overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: `${dnaScores.tech}%` }} />
                  </div>
                </div>
                <div>
                  <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 block truncate">Creative</span>
                  <span className="text-xs font-mono font-bold text-slate-900 dark:text-slate-100 tabular-nums">{dnaScores.creative}%</span>
                  <div className="h-1 bg-slate-200 dark:bg-slate-700 rounded-full mt-1.5 overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: `${dnaScores.creative}%` }} />
                  </div>
                </div>
                <div>
                  <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 block truncate">Comm</span>
                  <span className="text-xs font-mono font-bold text-slate-900 dark:text-slate-100 tabular-nums">{dnaScores.comm}%</span>
                  <div className="h-1 bg-slate-200 dark:bg-slate-700 rounded-full mt-1.5 overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: `${dnaScores.comm}%` }} />
                  </div>
                </div>
                <div>
                  <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 block truncate">Problem</span>
                  <span className="text-xs font-mono font-bold text-slate-900 dark:text-slate-100 tabular-nums">{dnaScores.prob}%</span>
                  <div className="h-1 bg-slate-200 dark:bg-slate-700 rounded-full mt-1.5 overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: `${dnaScores.prob}%` }} />
                  </div>
                </div>
                <div>
                  <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 block truncate">Venture</span>
                  <span className="text-xs font-mono font-bold text-slate-900 dark:text-slate-100 tabular-nums">{dnaScores.entre}%</span>
                  <div className="h-1 bg-slate-200 dark:bg-slate-700 rounded-full mt-1.5 overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: `${dnaScores.entre}%` }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Standout Combination Highlight */}
            <div className="space-y-1">
              <span className="text-[11px] font-mono font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider block">
                PRIMARY COMBINATION ADVANTAGE
              </span>
              <p className="text-sm font-heading font-semibold text-slate-900 dark:text-slate-100">
                Applied Technology + Visual Design + Local Value Delivery
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed pt-0.5">
                Positions you for standalone client digital identity projects, interactive web utilities, and local automation services.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between mt-4">
            <span className="font-hand text-slate-500 dark:text-slate-400 text-sm">
              “Your combination makes you unique.”
            </span>
            <Link
              to="/dna"
              className="text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              View DNA Clusters →
            </Link>
          </div>
        </div>

        {/* Card B: G-ONE REASONING INSIGHT */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 shadow-xs flex flex-col justify-between transition-colors">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <h2 className="text-xs font-mono font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider">
                  G-ONE REASONING
                </h2>
              </div>
              <span className="text-[11px] font-mono text-slate-400 dark:text-slate-400">
                Transparent Detection
              </span>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm sm:text-base font-heading font-bold text-slate-900 dark:text-slate-100 leading-snug">
                Based on your skills, you have strong alignment for {topMatch.title}.
              </h3>

              <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-slate-700 dark:text-slate-300">Skill Compatibility:</span>
                  <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400 tabular-nums">
                    {topMatch.matchScore}% affinity
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  {topMatch.explanation}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3 mt-4">
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Deterministic rule-based reasoning
            </span>
            <Link
              to="/insights"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
              <span>Explore G-ONE Logic</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

      </section>

      {/* 5. EXPEDIENT VOCATIONAL ACTION CARDS */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 shadow-xs space-y-4 transition-colors">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <h2 className="text-xs font-mono font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider">
            QUICK LAUNCHPAD
          </h2>
          <span className="text-xs text-slate-400 dark:text-slate-400 font-mono">
            Practical Tools
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            to="/opportunities"
            className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-all flex flex-col justify-between space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <Combine className="w-5 h-5 text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
              <span className="text-[10px] font-mono text-slate-400 dark:text-slate-400">DISCOVER</span>
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Opportunities Catalog</h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Explore 30+ practical pathways mapped to your curriculum skills.</p>
            </div>
          </Link>

          <Link
            to="/business-builder"
            className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-all flex flex-col justify-between space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <Blocks className="w-5 h-5 text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
              <span className="text-[10px] font-mono text-slate-400 dark:text-slate-400">CREATE</span>
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Build My Business</h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Guided 8-step venture modeling from customer need to unit economics.</p>
            </div>
          </Link>

          <Link
            to="/skill-to-income"
            className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-all flex flex-col justify-between space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <TrendingUp className="w-5 h-5 text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
              <span className="text-[10px] font-mono text-slate-400 dark:text-slate-400">PLAN</span>
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Skill-to-Income Map</h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Responsible scenario projections and break-even calculations.</p>
            </div>
          </Link>
        </div>
      </section>

    </div>
  );
}
