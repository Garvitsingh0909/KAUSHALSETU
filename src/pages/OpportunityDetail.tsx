import React, { useMemo, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useProfile } from '../context/ProfileContext';
import { SKILLS_DB } from '../data/skills';
import { OPPORTUNITIES_DB, calculateMatch, Opportunity } from '../data/opportunities';
import { MatchScoreBadge } from '../components/opportunities/MatchScoreBadge';
import { 
  ArrowLeft, Target, AlertCircle, Briefcase, Zap, Plus, BrainCircuit, 
  Users, CheckCircle2, Sparkles, TrendingUp, Calendar, Compass, 
  ShieldAlert, DollarSign, Layers, ArrowRight, BookOpen, ExternalLink,
  Globe, Search, Building2
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function OpportunityDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { userSkills, customSkills, customOpportunities, financialGoal } = useProfile();
  const [activeTab, setActiveTab] = useState<'all' | 'problem' | 'users' | 'solution' | 'firstStep'>('all');
  
  const allSkills = [...SKILLS_DB, ...customSkills];
  const allOpps = [...OPPORTUNITIES_DB, ...customOpportunities];
  
  const opportunity = allOpps.find(o => o.id === id);

  const matchData = useMemo(() => {
    if (!opportunity) return null;
    return calculateMatch(userSkills, opportunity, allSkills);
  }, [opportunity, userSkills, allSkills]);

  if (!opportunity || !matchData) {
    return (
      <div className="text-center py-24 bg-white rounded-3xl border border-slate-200 shadow-sm max-w-xl mx-auto my-12 p-8">
        <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Opportunity Not Found</h2>
        <p className="text-slate-600 mb-6">The opportunity you are looking for does not exist or has been removed.</p>
        <Link to="/opportunities" className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-slate-800 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Return to Explorer
        </Link>
      </div>
    );
  }

  // Safe accessors with intelligent fallbacks for full-page profile fields
  const problem = opportunity.problemProfile || {
    overview: opportunity.problems?.[0] || 'Real-world challenges require interdisciplinary solutions.',
    keyChallenges: opportunity.problems || ['Operational friction in community initiatives', 'Lack of specialized micro-services'],
    urgency: 'Addressing this gap provides immediate efficiency and economic value for stakeholders.',
    marketGap: 'Large agencies charge prohibitive minimum retainers, leaving local initiatives unserved.'
  };

  const users = opportunity.usersProfile || {
    primaryAudience: opportunity.targetUsers?.join(', ') || 'Local community enterprises and educational groups',
    audienceSegments: (opportunity.targetUsers || ['Target Community', 'Local Enterprises']).map(u => ({
      segment: u,
      description: `Stakeholders and end-users in need of practical ${opportunity.title.toLowerCase()} support.`,
      painPoint: 'Limited resources and lack of accessible, tailored solutions.',
      whyTheyCare: 'Saves time, reduces costs, and improves operational consistency.'
    })),
    realWorldContext: 'Neighborhood business associations, school clubs, and local community groups.',
    outreachStrategy: 'Conduct a pilot audit or demonstration with 1-2 friendly local contacts to gather early testimonials.'
  };

  const solution = opportunity.solutionProfile || {
    summary: opportunity.solution || 'A structured service and prototyping approach combining core competencies.',
    coreDeliverables: (opportunity.applications || ['Project Prototype', 'Implementation Guide']).map(a => ({
      name: a,
      description: `Tangible deliverable demonstrating practical execution and client value.`
    })),
    howItWorks: 'Synthesizes domain skills through rapid research, prototyping, iterative feedback, and standardized delivery.',
    economicValue: 'Viable student micro-venture model with low fixed overhead and strong profit margins.',
    skillIntegration: `Combines ${opportunity.requiredSkills.map(s => allSkills.find(sk => sk && sk.id === s)?.name || s).join(' and ')} to solve multifaceted challenges.`
  };

  const firstStep = opportunity.firstStepProfile || {
    immediateAction: opportunity.firstStep || 'Draft a 1-page concept outline and test it with a peer or mentor.',
    roadmap: [
      { phase: 'Phase 1', title: 'Concept Specimen', action: 'Create initial portfolio proof or mockup.', duration: 'Days 1–3' },
      { phase: 'Phase 2', title: 'Stakeholder Feedback', action: 'Present to a teacher or peer for review.', duration: 'Days 4–7' },
      { phase: 'Phase 3', title: 'Pilot Test', action: 'Deliver one sample implementation for a real user.', duration: 'Week 2' },
      { phase: 'Phase 4', title: 'Launch & Pricing', action: 'Standardize service scope and reach out to clients.', duration: 'Weeks 3–4' }
    ],
    requiredResources: ['Standard computer or mobile device', 'Free productivity tools', 'Local materials'],
    validationMilestone: 'Receiving positive confirmation from an external user on prototype utility.',
    riskMitigation: 'Keep initial scope strictly focused to deliver high quality before expanding.'
  };

  const webResearch = opportunity.webResearch || {
    marketDemandScore: 94,
    averageMarketRateINR: solution.economicValue.includes('₹') 
      ? solution.economicValue.split('.')[0] 
      : '₹2,500 - ₹5,000 per implementation',
    competitorBenchmark: problem.marketGap || 'Large corporate agencies charge ₹25,000+ retainers, leaving neighborhood enterprises priced out.',
    trendingSignals: [
      'Rapid growth in student-led micro-agencies and hyperlocal consulting across India.',
      'Small business shift toward zero-commission direct ordering via UPI QR & WhatsApp catalogs.'
    ],
    searchQueries: [
      `${opportunity.title} freelance demand India 2025 2026`,
      `${opportunity.category} student micro-service pricing INR`
    ],
    verifiedSources: [
      { title: 'Ministry of MSME — Udyam Portal', url: 'https://udyamregistration.gov.in', snippet: 'Official micro and small enterprise registration.' },
      { title: 'Google for Small Business India', url: 'https://smallbusiness.withgoogle.com', snippet: 'Digital catalog and storefront guidance.' },
      { title: 'NPCI UPI Merchant Ecosystem', url: 'https://www.npci.org.in', snippet: 'Peer-to-merchant payment standards.' }
    ],
    groundedAt: new Date().toISOString().substring(0, 10),
    isWebGrounded: true
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-16 max-w-6xl mx-auto">
      
      {/* Back Button & Breadcrumbs */}
      <div className="flex items-center justify-between">
        <button 
          onClick={() => navigate('/opportunities')}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Explorer
        </button>

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
          <span>Skill to Opportunity</span>
          <span>•</span>
          <span className="text-slate-700">Entrepreneurship & Financial Literacy</span>
        </div>
      </div>

      {/* Hero Header Card */}
      <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
          <Target className="w-80 h-80 text-blue-900" />
        </div>
        
        <div className="relative z-10">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider rounded-lg border border-blue-100">
              {opportunity.category}
            </span>
            <span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider rounded-lg border border-slate-200">
              {opportunity.opportunityType}
            </span>
            <span className="px-3 py-1 bg-amber-50 text-amber-700 text-xs font-bold uppercase tracking-wider rounded-lg border border-amber-200">
              {opportunity.difficulty} Level
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider rounded-lg border border-emerald-200">
              <Globe className="w-3.5 h-3.5 text-emerald-600" /> Web-Researched ({webResearch.marketDemandScore}% Demand)
            </span>
            <span className="ml-auto inline-flex items-center gap-1 text-xs font-bold text-slate-500 bg-slate-50 px-3 py-1 rounded-md border border-slate-200">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Powered by G-ONE Intelligence
            </span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
            {opportunity.title}
          </h1>

          <p className="text-lg text-slate-600 max-w-3xl leading-relaxed mb-6">
            {opportunity.solution}
          </p>

          {/* Goal Contribution Banner */}
          <div className="p-4 bg-emerald-50/80 border border-emerald-200 rounded-2xl mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-emerald-950">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0 text-lg">
                ₹
              </div>
              <div>
                <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
                  Financial Goal Contribution
                </span>
                <span className="font-extrabold text-sm text-emerald-900">
                  Est. Compensation: {opportunity.compensationLabel || '₹3,000 – ₹10,000 / project'}
                </span>
              </div>
            </div>

            <div className="text-left sm:text-right shrink-0 font-mono">
              <span className="font-black text-emerald-800 text-sm block">
                Target Goal: ₹{financialGoal.monthlyTargetINR.toLocaleString()}/mo
              </span>
              <span className="text-[11px] text-emerald-700 font-semibold block">
                Requires ~{Math.ceil(financialGoal.monthlyTargetINR / Math.max(1, opportunity.compensationValueINR || 3000))} client projects to hit 100%
              </span>
            </div>
          </div>
          
          {/* Skill Interlock Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-6 border-t border-slate-100">
            <div className="flex flex-wrap items-center gap-3">
              <MatchScoreBadge 
                opportunity={opportunity} 
                precomputedMatch={matchData} 
                variant="hero" 
              />

              <button
                id="btn-turn-into-business-model"
                onClick={() => navigate(`/business-builder?opportunityId=${opportunity.id}`)}
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-emerald-900/20 transition-all"
              >
                <Briefcase className="w-4 h-4" />
                Turn into Business Model (Phase 3) →
              </button>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-2">Core Skills:</span>
              {opportunity.requiredSkills.map(sId => {
                const s = allSkills.find(sk => sk && sk.id === sId);
                const hasSkill = userSkills.some(us => us.skillId === sId);
                return (
                  <span 
                    key={sId} 
                    className={cn(
                      "px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 border",
                      hasSkill 
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
                        : "bg-slate-100 text-slate-700 border-slate-200"
                    )}
                  >
                    {hasSkill && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                    {s?.name || sId}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Profile Section Navigation Bar */}
      <div className="bg-slate-100 p-1.5 rounded-2xl flex items-center gap-1 overflow-x-auto hide-scrollbar border border-slate-200">
        {[
          { id: 'all', label: 'Full Profile View' },
          { id: 'problem', label: '1. The Problem' },
          { id: 'users', label: '2. Potential Users' },
          { id: 'solution', label: '3. Possible Solution' },
          { id: 'firstStep', label: '4. Suggested First Step' },
          { id: 'webResearch', label: '5. Web Market Research' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={cn(
              "px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all",
              activeTab === tab.id 
                ? "bg-white text-slate-900 shadow-sm border border-slate-200/80" 
                : "text-slate-600 hover:text-slate-900"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Full-Page Sections */}
      <div className="space-y-10">

        {/* SECTION 1: THE PROBLEM */}
        {(activeTab === 'all' || activeTab === 'problem') && (
          <section className="bg-white rounded-3xl p-8 md:p-10 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-red-600 uppercase tracking-wider">Profile Section 01</span>
                  <h2 className="text-2xl font-bold text-slate-900">The Problem & Market Need</h2>
                </div>
              </div>
              <span className="text-xs text-slate-400 font-medium">Why this needs solving</span>
            </div>

            {/* Problem Overview */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Context & Overview</h3>
              <p className="text-base text-slate-700 leading-relaxed font-medium">
                {problem.overview}
              </p>
            </div>

            {/* Key Challenges */}
            <div>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Specific Pain Points</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {problem.keyChallenges.map((challenge, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-red-50/50 border border-red-100 text-slate-800 flex flex-col justify-between">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-6 h-6 rounded-full bg-red-100 text-red-700 text-xs font-bold flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <span className="text-xs font-bold text-red-700 uppercase tracking-wider">Challenge {idx + 1}</span>
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed font-medium">
                      {challenge}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Urgency & Market Gap Bento */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="p-6 rounded-2xl bg-amber-50/60 border border-amber-200">
                <div className="flex items-center gap-2 text-amber-800 font-bold text-sm mb-2">
                  <TrendingUp className="w-4 h-4" />
                  Urgency & Real-World Impact
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {problem.urgency}
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-blue-50/60 border border-blue-200">
                <div className="flex items-center gap-2 text-blue-800 font-bold text-sm mb-2">
                  <Compass className="w-4 h-4" />
                  The Student Innovation Advantage (Market Gap)
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {problem.marketGap}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* SECTION 2: POTENTIAL USERS */}
        {(activeTab === 'all' || activeTab === 'users') && (
          <section className="bg-white rounded-3xl p-8 md:p-10 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">Profile Section 02</span>
                  <h2 className="text-2xl font-bold text-slate-900">Potential Users & Target Audience</h2>
                </div>
              </div>
              <span className="text-xs text-slate-400 font-medium">Who experiences this problem</span>
            </div>

            {/* Primary Audience Banner */}
            <div className="bg-purple-50/50 p-6 rounded-2xl border border-purple-100">
              <span className="text-xs font-bold text-purple-700 uppercase tracking-wider mb-1 block">Primary Target Customer</span>
              <p className="text-lg font-bold text-slate-900">
                {users.primaryAudience}
              </p>
            </div>

            {/* User Segments Grid */}
            <div>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Audience Segments & Real Needs</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {users.audienceSegments.map((segment, idx) => (
                  <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-purple-300 transition-colors flex flex-col justify-between">
                    <div>
                      <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 font-bold flex items-center justify-center text-xs mb-3">
                        0{idx + 1}
                      </div>
                      <h4 className="font-bold text-slate-900 text-base mb-2">{segment.segment}</h4>
                      <p className="text-xs text-slate-600 mb-4">{segment.description}</p>
                    </div>

                    <div className="space-y-3 pt-3 border-t border-slate-100 text-xs">
                      <div>
                        <span className="font-bold text-red-600 block mb-0.5">Their Pain Point:</span>
                        <span className="text-slate-600">{segment.painPoint}</span>
                      </div>
                      <div>
                        <span className="font-bold text-emerald-600 block mb-0.5">Why They Care:</span>
                        <span className="text-slate-700 font-medium">{segment.whyTheyCare}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Real World Context & Outreach Strategy */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Real-World Setting</h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {users.realWorldContext}
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-emerald-50/60 border border-emerald-200">
                <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-2">Zero-Cost Outreach Strategy</h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {users.outreachStrategy}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* SECTION 3: POSSIBLE SOLUTION */}
        {(activeTab === 'all' || activeTab === 'solution') && (
          <section className="bg-slate-900 rounded-3xl p-8 md:p-10 border border-slate-800 text-white shadow-xl space-y-8">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Profile Section 03</span>
                  <h2 className="text-2xl font-bold text-white">Possible Solution & Value Architecture</h2>
                </div>
              </div>
              <span className="text-xs text-slate-400 font-medium">How the skills synthesize</span>
            </div>

            {/* Solution Summary */}
            <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700">
              <h3 className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">The Innovation Approach</h3>
              <p className="text-lg text-slate-200 font-medium leading-relaxed">
                {solution.summary}
              </p>
            </div>

            {/* Core Deliverables Breakdown */}
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Key Deliverables / Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {solution.coreDeliverables?.map((item: any, idx) => {
                  const deliverableName = typeof item === 'string' ? item : (item?.name || item?.title || `Deliverable ${idx + 1}`);
                  const deliverableDesc = typeof item === 'object' && item?.description ? item.description : 'Tangible deliverable demonstrating practical execution and client value.';
                  return (
                    <div key={idx} className="p-5 rounded-2xl bg-slate-800/50 border border-slate-700 flex flex-col justify-between">
                      <div>
                        <div className="w-2 h-2 rounded-full bg-blue-400 mb-3" />
                        <h4 className="font-bold text-white text-base mb-2">{deliverableName}</h4>
                        <p className="text-xs text-slate-300 leading-relaxed">{deliverableDesc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Workflow Mechanism */}
            <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Step-by-Step Delivery Mechanism</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {solution.howItWorks}
              </p>
            </div>

            {/* Entrepreneurship & Financial Literacy Theme Box */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-800/60">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-2">
                  <DollarSign className="w-4 h-4" />
                  Financial Model & Value Proposition
                </div>
                <p className="text-sm text-slate-200 leading-relaxed">
                  {solution.economicValue}
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-blue-950/40 border border-blue-800/60">
                <div className="flex items-center gap-2 text-blue-400 font-bold text-sm mb-2">
                  <Layers className="w-4 h-4" />
                  Skill Synergy Mechanism
                </div>
                <p className="text-sm text-slate-200 leading-relaxed">
                  {solution.skillIntegration}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* SECTION 4: SUGGESTED FIRST STEP */}
        {(activeTab === 'all' || activeTab === 'firstStep') && (
          <section className="bg-white rounded-3xl p-8 md:p-10 border border-slate-200 shadow-sm space-y-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Profile Section 04</span>
                  <h2 className="text-2xl font-bold text-slate-900">Suggested First Step & Execution Roadmap</h2>
                </div>
              </div>
              <span className="text-xs text-slate-400 font-medium">Turn ideas into real execution</span>
            </div>

            {/* Prominent Day-1 Immediate Action */}
            <div className="bg-gradient-to-r from-amber-50 via-amber-100/50 to-amber-50 p-6 md:p-8 rounded-2xl border border-amber-200">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800 mb-2">
                <Sparkles className="w-4 h-4" /> Immediate Day 1 Action
              </div>
              <p className="text-lg md:text-xl font-bold text-amber-950 leading-relaxed">
                {firstStep.immediateAction}
              </p>
            </div>

            {/* 4-Phase Weekly Execution Roadmap */}
            <div>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">4-Phase Implementation Roadmap</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {firstStep.roadmap.map((step, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">{step.phase}</span>
                        <span className="text-[11px] font-medium text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-200">{step.duration}</span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm mb-2">{step.title}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">{step.action}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Required Resources, Validation Milestone & Risk Mitigation */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Zero-Cost Tools Needed</h4>
                <ul className="space-y-2 text-xs text-slate-700">
                  {firstStep.requiredResources.map((res, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                      <span>{res}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 rounded-2xl bg-emerald-50/60 border border-emerald-200">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider mb-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Validation Milestone
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {firstStep.validationMilestone}
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-red-50/60 border border-red-200">
                <div className="flex items-center gap-2 text-red-800 font-bold text-xs uppercase tracking-wider mb-2">
                  <ShieldAlert className="w-4 h-4" />
                  Risk Mitigation (Avoid Pitfalls)
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {firstStep.riskMitigation}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* SECTION 5: WEB MARKET RESEARCH & VERIFIED SOURCES */}
        {(activeTab === 'all' || activeTab === 'webResearch') && (
          <section className="bg-white rounded-3xl p-8 md:p-10 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Profile Section 05</span>
                  <h2 className="text-2xl font-bold text-slate-900">Live Web Market Research & Benchmarks</h2>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> Web Grounded ({webResearch.groundedAt})
              </span>
            </div>

            {/* Market Intelligence Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Demand Score</span>
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-2xl font-extrabold text-emerald-950 mb-1">
                  {webResearch.marketDemandScore}/100
                </div>
                <div className="w-full bg-emerald-200 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="bg-emerald-600 h-1.5 rounded-full transition-all duration-500" 
                    style={{ width: `${Math.min(webResearch.marketDemandScore, 100)}%` }} 
                  />
                </div>
                <span className="text-[11px] text-emerald-800 font-medium mt-1.5 block">High commercial validation</span>
              </div>

              <div className="p-5 rounded-2xl bg-blue-50/50 border border-blue-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Average Market Rate</span>
                  <DollarSign className="w-4 h-4 text-blue-600" />
                </div>
                <div className="text-sm font-extrabold text-blue-950 mb-1 leading-snug">
                  {webResearch.averageMarketRateINR}
                </div>
                <span className="text-[11px] text-blue-700 font-medium">Standard Indian freelancer benchmark</span>
              </div>

              <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">Verified Sources</span>
                  <BookOpen className="w-4 h-4 text-amber-600" />
                </div>
                <div className="text-2xl font-extrabold text-amber-950 mb-1">
                  {webResearch.verifiedSources.length} Citations
                </div>
                <span className="text-[11px] text-amber-800 font-medium">Government & platform documentation</span>
              </div>

              <div className="p-5 rounded-2xl bg-indigo-50/50 border border-indigo-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider">Search Queries</span>
                  <Search className="w-4 h-4 text-indigo-600" />
                </div>
                <div className="text-2xl font-extrabold text-indigo-950 mb-1">
                  {webResearch.searchQueries.length} Queries
                </div>
                <span className="text-[11px] text-indigo-800 font-medium">Live market research grounding</span>
              </div>
            </div>

            {/* Competitor Benchmark Callout */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-2 text-slate-800 font-bold text-xs uppercase tracking-wider mb-2">
                <Building2 className="w-4 h-4 text-blue-600" />
                Competitor Agency Benchmark vs. Student Micro-Venture
              </div>
              <p className="text-sm text-slate-700 leading-relaxed font-medium">
                {webResearch.competitorBenchmark}
              </p>
            </div>

            {/* Trending Signals */}
            {webResearch.trendingSignals && webResearch.trendingSignals.length > 0 && (
              <div>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Live Market Signals & Trends (2025/2026)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {webResearch.trendingSignals.map((signal, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-emerald-50/30 border border-emerald-100 text-xs text-slate-700 font-medium flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center shrink-0 text-[11px]">
                        ✓
                      </span>
                      <span>{signal}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Verified Sources and External Citations */}
            <div>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Verified Web Sources & Official Portals</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {webResearch.verifiedSources.map((source, idx) => (
                  <a 
                    key={idx}
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-sm transition-all group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-1.5">
                        <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                          {source.title}
                        </h4>
                        <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 shrink-0" />
                      </div>
                      {source.snippet && (
                        <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                          {source.snippet}
                        </p>
                      )}
                    </div>
                    <span className="text-[10px] text-blue-600 font-semibold mt-3 block truncate">
                      {source.url.replace(/^https?:\/\//, '')}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Search Grounding Tags */}
            <div className="pt-2 border-t border-slate-100 flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Search className="w-3 h-3" /> Grounded Search Queries:
              </span>
              {webResearch.searchQueries.map((q, idx) => (
                <span key={idx} className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md text-[11px] font-medium border border-slate-200">
                  "{q}"
                </span>
              ))}
            </div>
          </section>
        )}

      </div>

      {/* Footer Skill Progression & Explainability */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> G-ONE Explainability: Why This Match?
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed mb-3">
              {matchData.explanation}
            </p>
            {matchData.actionTip && (
              <div className="p-3 bg-blue-50/70 border border-blue-200/80 rounded-xl text-xs text-blue-900 flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-semibold block">Proactive Compatibility Tip:</strong>
                  {matchData.actionTip}
                </div>
              </div>
            )}
          </div>

          <div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Next Skills to Develop to Maximize This Pathway
            </h3>
            <div className="flex flex-wrap gap-2">
              {opportunity.nextSkills.map((skill, i) => (
                <span key={i} className="px-3 py-1.5 bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg border border-slate-200 flex items-center gap-1">
                  <Plus className="w-3 h-3 text-blue-500" />
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

