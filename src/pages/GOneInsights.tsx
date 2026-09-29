import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Compass, 
  ArrowRight, 
  CheckCircle2, 
  HelpCircle, 
  Send, 
  Layers, 
  Target, 
  Clock, 
  Lightbulb, 
  BrainCircuit, 
  UserCheck, 
  History, 
  Trash2, 
  Briefcase, 
  ChevronRight, 
  Zap, 
  AlertCircle,
  Database,
  ShieldCheck,
  DollarSign,
  ArrowDown,
  RefreshCw,
  Cpu,
  Layers3
} from 'lucide-react';
import { useProfile } from '../context/ProfileContext';
import { useBusiness } from '../context/BusinessContext';
import { useRoadmap } from '../context/RoadmapContext';
import { useGOne } from '../context/GOneContext';
import { Link, useNavigate } from 'react-router-dom';
import { KaushalPathwayBanner } from '../components/common/KaushalPathwayBanner';
import { cn } from '../lib/utils';

type GOnePipelineStage = 'Analyzing' | 'Connecting' | 'Matching' | 'Generating';

export const GOneInsights: React.FC = () => {
  const navigate = useNavigate();
  const { userSkills, allSkills, profile } = useProfile();
  const { activeScenario, scenarios } = useBusiness();
  const { targetOpportunity, projects, actions, progressMetrics } = useRoadmap();
  const { 
    oneNextStep, 
    smartRecommendations, 
    structuredAnswers, 
    askGOneQuery, 
    clearGOneHistory, 
    loadFullCbseJudgeEcosystem,
    studentJourney 
  } = useGOne();

  const [queryInput, setQueryInput] = useState('');
  const [activeTab, setActiveTab] = useState<'pipeline' | 'recommendations' | 'ask_gone'>('pipeline');
  const [pipelineState, setPipelineState] = useState<GOnePipelineStage>('Matching');

  useEffect(() => {
    const states: GOnePipelineStage[] = ['Analyzing', 'Connecting', 'Matching', 'Generating'];
    const timer = setInterval(() => {
      setPipelineState(prev => {
        const nextIdx = (states.indexOf(prev) + 1) % states.length;
        return states[nextIdx];
      });
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleAsk = (e: React.FormEvent) => {
    e.preventDefault();
    if (!queryInput.trim()) return;
    askGOneQuery(queryInput);
    setQueryInput('');
    setActiveTab('ask_gone');
  };

  const handleQuickPrompt = (prompt: string) => {
    askGOneQuery(prompt);
    setActiveTab('ask_gone');
  };

  const userSkillNames = userSkills.length > 0 
    ? userSkills.map(us => {
        const s = allSkills.find(k => k.id === us.skillId);
        return s ? s.name : us.skillId;
      })
    : ['Coding & Web Development', 'Graphic Design & Branding', 'Interpersonal Communication'];

  const reasoningPipeline = [
    {
      step: '01',
      title: 'YOUR SKILLS',
      badge: 'Portfolio Inputs',
      content: userSkillNames.join(' · '),
      detail: `${userSkills.length || 3} verified competency records anchored in secondary vocational curriculum.`
    },
    {
      step: '02',
      title: 'SKILL INTERSECTION',
      badge: 'Synergy Computation',
      content: `${userSkillNames.slice(0, 2).join(' + ')} Multidisciplinary Core`,
      detail: 'Connecting technical implementation with communicative presentation to eliminate external dependencies.'
    },
    {
      step: '03',
      title: 'POSSIBLE APPLICATIONS',
      badge: 'Real-World Translation',
      content: 'Digital storefront setup, micro-agency identity design, hyperlocal automation',
      detail: 'Translating knowledge into practical services viable for neighborhood commercial clients.'
    },
    {
      step: '04',
      title: 'OPPORTUNITY AREAS',
      badge: 'Curriculum & Market Matching',
      content: 'Local Business Digitization · Freelance Media Delivery · Vocational Tools',
      detail: 'Filtered for high educational safety, low capital overhead, and verified demand.'
    },
    {
      step: '05',
      title: 'WHAT YOU COULD BUILD',
      badge: 'Deliverable Output',
      content: 'WhatsApp Retail Catalog & UPI Ordering Kit for neighborhood bakers & merchants',
      detail: 'Zero-debt, high-tangibility starter project completed within a 3-week sprint.'
    },
    {
      step: '06',
      title: 'WHAT TO LEARN NEXT',
      badge: 'Continuous Growth Pathway',
      content: 'Pricing & Unit Economics · Client Requirement Negotiation · Deployment Ops',
      detail: 'Closing identified skill gaps to transition from foundational learner to self-sufficient builder.'
    }
  ];

  return (
    <div className="space-y-7 pb-16 max-w-6xl mx-auto animate-in fade-in duration-300">
      
      {/* 1. Signature Pathway */}
      <KaushalPathwayBanner 
        currentStep="VALUE"
        subtitle="G-ONE synthesizes your verified competencies into viable solutions, value creation, and market opportunities."
      />

      {/* 2. Top Banner Header */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 md:p-8 shadow-xs transition-colors">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase">
                INTELLIGENT REASONING ENGINE
              </span>
              <span className="font-hand text-slate-500 dark:text-slate-400 text-sm italic ml-1">
                “Grounded in your work, not guesswork.”
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-heading font-bold text-slate-950 dark:text-white tracking-tight mt-1">
              G-ONE Insights & Reasoning Hub
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
              Transparent, deterministic educational intelligence synthesizing your verified skills into viable vocational opportunities.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={loadFullCbseJudgeEcosystem}
              className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-slate-900 dark:bg-blue-600 text-white hover:bg-slate-800 dark:hover:bg-blue-700 transition-colors shadow-2xs flex items-center gap-1.5 btn-press"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-400 dark:text-white" />
              <span>Load Full Demo Ecosystem</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 pt-4 overflow-x-auto">
          <button
            onClick={() => setActiveTab('pipeline')}
            className={cn(
              "px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors border cursor-pointer shrink-0",
              activeTab === 'pipeline'
                ? "bg-slate-900 dark:bg-blue-600 border-slate-900 dark:border-blue-600 text-white shadow-2xs"
                : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
            )}
          >
            Transparent AI Workspace
          </button>
          <button
            onClick={() => setActiveTab('recommendations')}
            className={cn(
              "px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors border cursor-pointer shrink-0",
              activeTab === 'recommendations'
                ? "bg-slate-900 dark:bg-blue-600 border-slate-900 dark:border-blue-600 text-white shadow-2xs"
                : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
            )}
          >
            Next Action & Milestones ({smartRecommendations.length})
          </button>
          <button
            onClick={() => setActiveTab('ask_gone')}
            className={cn(
              "px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors border cursor-pointer shrink-0",
              activeTab === 'ask_gone'
                ? "bg-slate-900 dark:bg-blue-600 border-slate-900 dark:border-blue-600 text-white shadow-2xs"
                : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
            )}
          >
            Inquiry Console ({structuredAnswers.length})
          </button>
        </div>
      </section>

      {/* 3. TRANSPARENT REASONING WORKSPACE */}
      {activeTab === 'pipeline' && (
        <section className="bg-slate-900 dark:bg-slate-950 text-white rounded-2xl border border-slate-800 p-6 sm:p-8 shadow-xs relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800 mb-6 relative z-10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <BrainCircuit className="w-4 h-4 text-blue-400" />
                <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase">
                  REASONING WORKSPACE
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-white tracking-tight">
                6-Stage Transparent Pathway Pipeline
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Every deduction is inspectable, deterministic, and grounded in verified data.
              </p>
            </div>

            <div className="flex items-center gap-2 bg-slate-800/80 border border-slate-700/60 px-3 py-1.5 rounded-xl text-xs font-mono text-slate-300">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-slate-400">State:</span>
              <strong className="text-blue-400 font-semibold">{pipelineState}...</strong>
            </div>
          </div>

          {/* 6-Stage Reasoning Vertical Flow */}
          <div className="space-y-3.5 max-w-3xl mx-auto relative z-10">
            {reasoningPipeline.map((node, index) => {
              const isLast = index === reasoningPipeline.length - 1;
              return (
                <div key={node.step} className="relative">
                  <div className="p-4 sm:p-5 rounded-xl bg-slate-800/60 border border-slate-700/70 hover:border-slate-600 transition-all space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-blue-400">
                          {node.step}
                        </span>
                        <h3 className="text-xs font-mono font-bold tracking-wider text-slate-200 uppercase">
                          {node.title}
                        </h3>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-700/80 text-slate-300">
                        {node.badge}
                      </span>
                    </div>

                    <p className="text-sm sm:text-base font-heading font-bold text-white leading-snug">
                      {node.content}
                    </p>

                    <p className="text-xs text-slate-400 leading-relaxed">
                      {node.detail}
                    </p>
                  </div>

                  {!isLast && (
                    <div className="flex items-center justify-center py-1.5 text-slate-600">
                      <ArrowDown className="w-3.5 h-3.5 text-slate-500" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="pt-6 border-t border-slate-800 mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs relative z-10">
            <span className="text-slate-500 font-mono">
              G-ONE Architecture · Zero generic chatbot hallucinations
            </span>
            <button
              onClick={() => navigate('/opportunities')}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-4 py-2 rounded-xl transition-colors shadow-2xs self-start sm:self-auto"
            >
              <span>View Mapped Opportunities</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </section>
      )}

      {/* 4. NEXT ACTION & SMART RECOMMENDATIONS */}
      {activeTab === 'recommendations' && (
        <div className="space-y-5">
          {/* Spotlight Next Step */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 shadow-xs space-y-3.5 transition-colors">
            <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
              <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase">
                RECOMMENDED NEXT STEP
              </span>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950 text-blue-900 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                STAGE: {oneNextStep.stage.toUpperCase()}
              </span>
            </div>

            <div>
              <h2 className="text-lg sm:text-xl font-heading font-bold text-slate-950 dark:text-white">
                {oneNextStep.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                {oneNextStep.action}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 space-y-1">
              <span className="font-bold text-slate-800 dark:text-slate-200 font-mono text-[10px] uppercase block">
                Why G-ONE recommends this:
              </span>
              <p className="italic text-slate-500 dark:text-slate-400">
                "{oneNextStep.reason}"
              </p>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                onClick={() => navigate(oneNextStep.targetPath)}
                className="inline-flex items-center gap-2 bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors shadow-xs btn-press"
              >
                <span>Execute Next Step</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <span className="text-[11px] text-slate-400 font-mono">
                Data-grounded priority
              </span>
            </div>
          </div>

          {/* Recommendations List */}
          <div className="space-y-3">
            {smartRecommendations.map(rec => (
              <div
                key={rec.id}
                className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/90 dark:border-slate-800 p-5 shadow-xs space-y-2.5 transition-colors"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className={cn(
                      "px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase",
                      rec.priority === 'NOW'
                        ? "bg-rose-50 dark:bg-rose-950 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800"
                        : rec.priority === 'NEXT'
                        ? "bg-amber-50 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                    )}>
                      {rec.priority}
                    </span>

                    <span className="text-xs font-bold text-slate-900 dark:text-white font-heading">
                      {rec.title}
                    </span>
                  </div>

                  {rec.targetPath && (
                    <button
                      onClick={() => navigate(rec.targetPath!)}
                      className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
                    >
                      <span>Take action</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {rec.description}
                </p>

                <div className="text-[11px] text-slate-400 dark:text-slate-500 italic">
                  Rationale: "{rec.whyAmISeeingThis}"
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. INQUIRY CONSOLE */}
      {activeTab === 'ask_gone' && (
        <div className="space-y-5">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 shadow-xs space-y-4 transition-colors">
            <div>
              <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase">
                CURRICULUM INQUIRY CONSOLE
              </span>
              <h2 className="text-base sm:text-lg font-heading font-bold text-slate-900 dark:text-white mt-0.5">
                Query Educational & Commercial Pathways
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                G-ONE evaluates queries strictly against structured knowledge base records and vocational guidelines.
              </p>
            </div>

            <form onSubmit={handleAsk} className="flex gap-2">
              <input
                type="text"
                value={queryInput}
                onChange={(e) => setQueryInput(e.target.value)}
                placeholder="e.g. 'I know photography and web design, what can I build?'"
                className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-slate-900"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-700 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-2xs shrink-0 btn-press"
              >
                <span>Inquire</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
                Sample Questions:
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  'I like photography and marketing, what can I build?',
                  'How do I calculate my photography venture break-even?',
                  'I like electronics and agriculture, what is the pathway?',
                  'I like coding and food logistics, what can I build?'
                ].map(prompt => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => handleQuickPrompt(prompt)}
                    className="text-left text-[11px] px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-colors"
                  >
                    "{prompt}"
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Structured Answers Stream */}
          <div className="space-y-3.5">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
              <span className="text-xs font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Inquiry History ({structuredAnswers.length})
              </span>
              {structuredAnswers.length > 0 && (
                <button
                  type="button"
                  onClick={clearGOneHistory}
                  className="text-xs text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 flex items-center gap-1 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear History</span>
                </button>
              )}
            </div>

            {structuredAnswers.map((ans, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/90 dark:border-slate-800 p-5 shadow-xs space-y-3 transition-colors"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-2.5">
                  <span className="text-xs font-bold text-slate-900 dark:text-white font-heading">
                    Query: "{ans.query}"
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">{ans.timestamp}</span>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg space-y-1">
                    <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase block">
                      Based on profile:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {ans.basedOnProfile.map(b => (
                        <span key={b.skill} className="px-2 py-0.5 rounded bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-semibold border border-slate-200 dark:border-slate-700 text-[11px] font-mono">
                          {b.skill} ({b.proficiency})
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50/50 dark:bg-blue-950/40 rounded-lg border border-blue-100 dark:border-blue-900 space-y-1">
                    <span className="text-[10px] font-mono font-bold text-blue-900 dark:text-blue-300 uppercase block">
                      Viable direction:
                    </span>
                    <p className="text-slate-800 dark:text-slate-200 font-medium text-xs">
                      {ans.youCouldExplore}
                    </p>
                  </div>

                  <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg space-y-1">
                    <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase block">
                      Why this fits:
                    </span>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-xs">
                      {ans.why}
                    </p>
                  </div>

                  <div className="p-3 bg-emerald-50/70 dark:bg-emerald-950/40 rounded-lg border border-emerald-100 dark:border-emerald-900 space-y-1">
                    <span className="text-[10px] font-mono font-bold text-emerald-900 dark:text-emerald-300 uppercase block">
                      Suggested next step:
                    </span>
                    <p className="text-emerald-950 dark:text-emerald-300 font-semibold text-xs">
                      {ans.suggestedNextStep}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
