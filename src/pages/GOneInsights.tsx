import React, { useState } from 'react';
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
  DollarSign
} from 'lucide-react';
import { useProfile } from '../context/ProfileContext';
import { useBusiness } from '../context/BusinessContext';
import { useRoadmap } from '../context/RoadmapContext';
import { useGOne } from '../context/GOneContext';
import { Link, useNavigate } from 'react-router-dom';

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
  const [activeTab, setActiveTab] = useState<'overview' | 'recommendations' | 'ask_gone'>('overview');

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

  return (
    <div className="space-y-8 pb-16 max-w-7xl mx-auto">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
              <Database className="w-3.5 h-3.5 mr-1 text-emerald-600" />
              Data First. AI Second.
            </span>
            <span className="text-xs text-slate-500 font-medium">CBSE Skill Expo 2026</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
            G-ONE Insights & Navigation Hub
          </h1>
          <p className="text-sm md:text-base text-slate-600 mt-1 max-w-2xl">
            Synthesizing your verified skills, market opportunities, financial models, and project deliverables into transparent educational guidance.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            id="btn-load-judge-ecosystem"
            onClick={loadFullCbseJudgeEcosystem}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs md:text-sm font-semibold rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 transition-colors shadow-sm"
          >
            <Sparkles className="w-4 h-4" />
            <span>Load Complete CBSE Judge Tour</span>
          </button>
        </div>
      </div>

      {/* 1. SPOTLIGHT: YOUR NEXT STEP */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white rounded-3xl p-6 md:p-8 shadow-lg border border-indigo-700 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
              <Compass className="w-4 h-4" /> Recommended Next Action
            </div>
            <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-indigo-700/80 border border-indigo-500/50 text-indigo-100">
              Stage: {oneNextStep.stage.toUpperCase()}
            </span>
          </div>

          <div>
            <h2 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">
              {oneNextStep.title}
            </h2>
            <p className="text-sm md:text-base text-indigo-100 mt-1 max-w-3xl leading-relaxed">
              {oneNextStep.action}
            </p>
          </div>

          <div className="p-3.5 bg-indigo-950/60 rounded-2xl border border-indigo-800/80 text-xs text-indigo-200 flex items-start gap-2.5">
            <HelpCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white">Why G-ONE recommends this:</strong> {oneNextStep.reason}
            </div>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={() => navigate(oneNextStep.targetPath)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs md:text-sm hover:bg-amber-300 transition-all shadow-md shadow-amber-950/20"
            >
              <span>Take This Action Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <span className="text-[11px] text-indigo-300 italic">
              *Grounded strictly in Knowledge Base records and your verified activity.
            </span>
          </div>
        </div>
      </div>

      {/* TABS NAVIGATION */}
      <div className="flex border-b border-slate-200">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2.5 text-xs md:text-sm font-semibold border-b-2 flex items-center gap-2 transition-colors ${
            activeTab === 'overview'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <Compass className="w-4 h-4" />
          Student Journey Overview
        </button>

        <button
          onClick={() => setActiveTab('recommendations')}
          className={`px-4 py-2.5 text-xs md:text-sm font-semibold border-b-2 flex items-center gap-2 transition-colors ${
            activeTab === 'recommendations'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <Target className="w-4 h-4" />
          Smart Recommendations ({smartRecommendations.length})
        </button>

        <button
          onClick={() => setActiveTab('ask_gone')}
          className={`px-4 py-2.5 text-xs md:text-sm font-semibold border-b-2 flex items-center gap-2 transition-colors ${
            activeTab === 'ask_gone'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          Ask G-ONE ({structuredAnswers.length})
        </button>
      </div>

      {/* VIEW 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Profile Skills</span>
              <p className="text-2xl font-bold text-slate-900 mt-1">{userSkills.length}</p>
              <p className="text-xs text-slate-500 mt-1">Verified Foundation</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Target Opportunity</span>
              <p className="text-lg font-bold text-indigo-600 mt-1 truncate">{targetOpportunity?.title || 'None pinned'}</p>
              <p className="text-xs text-slate-500 mt-1">Curated Pathway</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Projects & Deliverables</span>
              <p className="text-2xl font-bold text-slate-900 mt-1">{projects.length}</p>
              <p className="text-xs text-slate-500 mt-1">{progressMetrics.completedActions} Actions Done</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Business Scenarios</span>
              <p className="text-2xl font-bold text-emerald-600 mt-1">{scenarios.length}</p>
              <p className="text-xs text-slate-500 mt-1">{activeScenario ? `₹${activeScenario.pricePerUnit} Unit Price` : 'Not calibrated'}</p>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: SMART RECOMMENDATIONS */}
      {activeTab === 'recommendations' && (
        <div className="space-y-4">
          {smartRecommendations.map(rec => (
            <div
              key={rec.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase ${
                    rec.priority === 'NOW'
                      ? 'bg-rose-100 text-rose-800 border border-rose-200'
                      : rec.priority === 'NEXT'
                      ? 'bg-amber-100 text-amber-800 border border-amber-200'
                      : 'bg-blue-100 text-blue-800 border border-blue-200'
                  }`}>
                    {rec.priority}
                  </span>

                  <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 text-slate-700">
                    {rec.confidence}
                  </span>

                  <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {rec.origin || 'Knowledge Base (Curated)'}
                  </span>
                </div>

                {rec.targetPath && (
                  <button
                    onClick={() => navigate(rec.targetPath!)}
                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 inline-flex items-center gap-1"
                  >
                    <span>Go to action</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <h3 className="text-base font-bold text-slate-900">
                {rec.title}
              </h3>

              <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                {rec.description}
              </p>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-slate-800">
                  <HelpCircle className="w-3.5 h-3.5 text-indigo-600" />
                  <span>WHY AM I SEEING THIS?</span>
                </div>
                <p className="text-slate-600 italic">
                  "{rec.whyAmISeeingThis}"
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* VIEW 3: NATURAL-LANGUAGE INPUT ("ASK G-ONE") */}
      {activeTab === 'ask_gone' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">
                <Sparkles className="w-4 h-4" /> Ask G-ONE
              </div>
              <h2 className="text-lg font-bold text-slate-900">
                Ask About Your Skills, Pathways, or Commercial Steps
              </h2>
              <p className="text-xs text-slate-500">
                G-ONE reasons strictly over structured Knowledge Base records.
              </p>
            </div>

            <form onSubmit={handleAsk} className="flex gap-2">
              <input
                type="text"
                value={queryInput}
                onChange={(e) => setQueryInput(e.target.value)}
                placeholder="e.g. 'I like photography and marketing, what can I build?'"
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs md:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs md:text-sm font-semibold transition-colors flex items-center gap-2 shadow-sm shrink-0"
              >
                <span>Ask</span>
                <Send className="w-4 h-4" />
              </button>
            </form>

            <div className="space-y-1.5 pt-2">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Suggested Prompt Inquiries:
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  'I like photography and marketing, what can I build?',
                  'How do I test my photography business break-even?',
                  'I like electronics and agriculture, what is the pathway?',
                  'I like coding and cooking, what can I build?'
                ].map(prompt => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => handleQuickPrompt(prompt)}
                    className="text-left text-[11px] px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors"
                  >
                    "{prompt}"
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Structured Answers Stream */}
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <h3 className="font-bold text-slate-900 text-sm">
                G-ONE Insights History ({structuredAnswers.length})
              </h3>
              {structuredAnswers.length > 0 && (
                <button
                  type="button"
                  onClick={clearGOneHistory}
                  className="text-xs text-slate-400 hover:text-rose-600 flex items-center gap-1 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear History</span>
                </button>
              )}
            </div>

            {structuredAnswers.map((ans, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-slate-800">
                      Query: "{ans.query}"
                    </span>
                    {ans.isKnowledgeGap ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        Knowledge Gap Protocol (Auto-Filled)
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" />
                        Knowledge Base Grounded ({ans.groundingSource || 'Validated'})
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-slate-400">{ans.timestamp}</span>
                </div>

                {ans.retrievalSummary && (
                  <div className="px-3 py-2 bg-slate-50 rounded-lg border border-slate-200 text-[11px] text-slate-600 flex items-center gap-2">
                    <Database className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{ans.retrievalSummary}</span>
                  </div>
                )}

                {/* Mandated 5-Part Structured Answer Format */}
                <div className="space-y-3 text-xs">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="font-bold text-slate-700 block mb-1">
                      Based on your profile:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {ans.basedOnProfile.map(b => (
                        <span key={b.skill} className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-semibold border border-indigo-100 text-[11px]">
                          {b.skill} — {b.proficiency}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100">
                    <span className="font-bold text-blue-900 block mb-1">
                      You could explore:
                    </span>
                    <span className="text-slate-800 font-medium text-sm">
                      {ans.youCouldExplore}
                    </span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="font-bold text-slate-700 block mb-1">
                      Why (Structured Knowledge):
                    </span>
                    <p className="text-slate-600 leading-relaxed">
                      {ans.why}
                    </p>
                  </div>

                  {/* Financial Grounding Tag */}
                  {ans.financialInsight && (
                    <div className="p-3 bg-amber-50/40 rounded-xl border border-amber-200/80 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-amber-600" />
                        <div>
                          <span className="font-semibold text-slate-800">
                            Recommended Unit Price: ₹{ans.financialInsight.suggestedPrice}
                          </span>
                          <span className="text-slate-500 text-[11px] block">
                            Break-Even Target: {ans.financialInsight.breakEvenUnits} {ans.financialInsight.unitDefinition}
                          </span>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-300">
                        {ans.financialInsight.modelType}
                      </span>
                    </div>
                  )}

                  <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-100">
                    <span className="font-bold text-amber-900 block mb-1">
                      Consider developing:
                    </span>
                    <span className="text-slate-800 font-medium">
                      {ans.considerDeveloping}
                    </span>
                  </div>

                  <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200">
                    <span className="font-bold text-emerald-900 block mb-1">
                      Suggested next step:
                    </span>
                    <p className="text-emerald-950 font-semibold text-sm">
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
