import React from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowDown, 
  CheckCircle2, 
  Target, 
  Briefcase, 
  Calculator, 
  TrendingUp, 
  Compass, 
  FolderKanban, 
  Layers, 
  HelpCircle, 
  Download, 
  User, 
  MapPin, 
  Lightbulb, 
  ShieldCheck 
} from 'lucide-react';
import { useProfile } from '../context/ProfileContext';
import { useBusiness } from '../context/BusinessContext';
import { useRoadmap } from '../context/RoadmapContext';
import { useGOne } from '../context/GOneContext';
import { Link, useNavigate } from 'react-router-dom';

export const SkillToIncomeMap: React.FC = () => {
  const navigate = useNavigate();
  const { profile, userSkills, allSkills } = useProfile();
  const { activeScenario, scenarios } = useBusiness();
  const { targetOpportunity, projects, actions, progressMetrics } = useRoadmap();
  const { oneNextStep, loadFullCbseJudgeEcosystem } = useGOne();

  // Primary scenario values
  const currentScenario = activeScenario || scenarios[0];
  const breakEven = currentScenario?.breakEvenCustomers ?? 3;
  const unitPrice = currentScenario?.pricePerUnit ?? 500;
  const monthlyRevenue = currentScenario?.revenue ?? 4000;
  const monthlySurplus = currentScenario?.surplus ?? 2000;
  const customerVol = currentScenario?.customerCount ?? 8;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-10 pb-20 max-w-5xl mx-auto">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
              <Sparkles className="w-3.5 h-3.5 mr-1 text-emerald-600" />
              Flagship Capstone Artifact
            </span>
            <span className="text-xs text-slate-500 font-medium">CBSE Skill Expo 2026</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            My Skill-to-Income Map
          </h1>
          <p className="text-sm md:text-base text-slate-600 mt-1 max-w-2xl">
            The end-to-end continuous journey connecting vocational student capabilities to tangible micro-enterprise validation.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={loadFullCbseJudgeEcosystem}
            className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-amber-50 text-amber-900 border border-amber-300 hover:bg-amber-100 transition-colors shadow-sm"
          >
            Load CBSE Judge Demo
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-sm flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Print Map</span>
          </button>
        </div>
      </div>

      {/* Flagship Visual Chain Architecture */}
      <div className="space-y-4">
        {/* NODE 1: MY SKILLS */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm relative hover:border-indigo-300 transition-colors">
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-wider">
              <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-[10px]">1</span>
              Phase 1: Know Me • My Skills & Proficiency
            </div>
            <Link to="/skills" className="text-xs text-indigo-600 font-semibold hover:underline">
              Edit Skills
            </Link>
          </div>
          <div className="flex flex-wrap gap-2">
            {userSkills.length === 0 ? (
              <span className="text-xs text-slate-400 italic">No skills registered yet. Add skills in My Skills.</span>
            ) : (
              userSkills.map(s => {
                const sk = allSkills.find(k => k.id === s.skillId);
                return (
                  <div key={s.skillId} className="px-3 py-1.5 rounded-xl bg-indigo-50/80 border border-indigo-200 text-xs flex items-center gap-2">
                    <strong className="text-slate-900">{sk ? sk.name : s.skillId}</strong>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-200 text-indigo-800 font-semibold">
                      {s.proficiency}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Down Arrow Indicator */}
        <div className="flex justify-center text-slate-400">
          <ArrowDown className="w-5 h-5" />
        </div>

        {/* NODE 2: MY APPLICATIONS & OPPORTUNITIES */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm relative hover:border-blue-300 transition-colors">
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider">
              <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[10px]">2</span>
              Phase 2: Show Me • My Applications & Selected Pathway
            </div>
            <Link to="/opportunities" className="text-xs text-blue-600 font-semibold hover:underline">
              Browse Pathways
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 bg-blue-50/50 rounded-xl border border-blue-100">
              <span className="text-slate-500 font-semibold block mb-1">Target Opportunity:</span>
              <strong className="text-base text-slate-900 block">
                {targetOpportunity?.title || 'Product Photography Service'}
              </strong>
              <p className="text-slate-600 mt-1">
                {targetOpportunity?.solution || 'Help neighborhood stores with high-clarity catalog photos and social promo tiles.'}
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-500 font-semibold block mb-1">Skill DNA Alignment:</span>
              <p className="text-slate-700 leading-relaxed">
                Combines visual-technical execution with direct client interaction. High feasibility for secondary students with zero debt liability.
              </p>
            </div>
          </div>
        </div>

        {/* Down Arrow Indicator */}
        <div className="flex justify-center text-slate-400">
          <ArrowDown className="w-5 h-5" />
        </div>

        {/* NODE 3: PROBLEM → CUSTOMER → SOLUTION */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm relative hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
              <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center text-[10px]">3</span>
              Value Proposition: Problem → Customer → Solution
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 bg-rose-50/50 rounded-xl border border-rose-100">
              <strong className="text-rose-900 block mb-1">Problem:</strong>
              <p className="text-slate-700">
                {currentScenario?.problem || 'Local food & craft merchants take dim, shaky mobile phone photos that fail to convey product quality online.'}
              </p>
            </div>
            <div className="p-3.5 bg-amber-50/50 rounded-xl border border-amber-100">
              <strong className="text-amber-900 block mb-1">Target Customer:</strong>
              <p className="text-slate-700">
                {currentScenario?.customerSegment || 'Neighborhood home bakers, specialty confectioners, and boutique craft shops.'}
              </p>
            </div>
            <div className="p-3.5 bg-emerald-50/50 rounded-xl border border-emerald-100">
              <strong className="text-emerald-900 block mb-1">Student Solution:</strong>
              <p className="text-slate-700">
                {currentScenario?.solution || 'Deliver a 5-photo high-resolution digital catalog pack with natural lighting calibration and WhatsApp crops.'}
              </p>
            </div>
          </div>
        </div>

        {/* Down Arrow Indicator */}
        <div className="flex justify-center text-slate-400">
          <ArrowDown className="w-5 h-5" />
        </div>

        {/* NODE 4: BUSINESS MODEL & FINANCIAL SIMULATION */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm relative hover:border-emerald-300 transition-colors">
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider">
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-[10px]">4</span>
              Phase 3: Let Me Test It • Business Scenario & Financial Literacy
            </div>
            <Link to="/business-builder" className="text-xs text-emerald-700 font-semibold hover:underline">
              Open Financial Simulator
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-500 block text-[11px]">Price Per Session</span>
              <span className="text-lg font-bold text-slate-900 font-mono">₹{unitPrice}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-500 block text-[11px]">Customer Volume</span>
              <span className="text-lg font-bold text-slate-900 font-mono">{customerVol} clients</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-500 block text-[11px]">Break-Even Target</span>
              <span className="text-lg font-bold text-amber-700 font-mono">{breakEven} clients</span>
            </div>
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
              <span className="text-emerald-800 block text-[11px]">Simulated Surplus</span>
              <span className="text-lg font-bold text-emerald-700 font-mono">+₹{monthlySurplus}</span>
            </div>
          </div>
          <p className="text-[11px] text-slate-400 mt-2 italic">
            *Financial simulations are educational models of unit economics, not guaranteed monetary earnings.
          </p>
        </div>

        {/* Down Arrow Indicator */}
        <div className="flex justify-center text-slate-400">
          <ArrowDown className="w-5 h-5" />
        </div>

        {/* NODE 5: SKILL GAPS & 6-STAGE ROADMAP */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm relative hover:border-indigo-300 transition-colors">
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-700 uppercase tracking-wider">
              <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-800 flex items-center justify-center text-[10px]">5</span>
              Phase 4: Help Me Grow • Skill Gaps, Roadmap & Projects
            </div>
            <Link to="/roadmap" className="text-xs text-indigo-700 font-semibold hover:underline">
              View 6-Stage Roadmap
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <span className="font-bold text-slate-800 block">Identified Skill Gaps to Bridge:</span>
              <div className="flex flex-wrap gap-1.5">
                <span className="px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200 font-semibold text-[11px]">
                  Pricing & Cost Estimation
                </span>
                <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200 font-semibold text-[11px]">
                  Client Communication & Briefing
                </span>
              </div>
              <p className="text-slate-500 text-[11px]">
                Addressed through low-stakes practice before reaching out to paying commercial clients.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <span className="font-bold text-slate-800 block">Verified Completed Projects ({projects.length}):</span>
              {projects.length === 0 ? (
                <p className="text-slate-400 italic">No projects logged yet.</p>
              ) : (
                projects.slice(0, 2).map(p => (
                  <div key={p.id} className="flex items-center justify-between text-slate-700">
                    <span className="font-medium truncate max-w-[200px]">{p.name}</span>
                    <span className="text-[10px] text-emerald-700 font-bold uppercase bg-emerald-50 px-1.5 py-0.5 rounded">
                      {p.status.replace('_', ' ')}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Down Arrow Indicator */}
        <div className="flex justify-center text-slate-400">
          <ArrowDown className="w-5 h-5" />
        </div>

        {/* NODE 6: THE NEXT IMMEDIATE STEP */}
        <div className="bg-slate-900 text-white rounded-2xl border border-slate-800 p-6 shadow-md relative">
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
              <Compass className="w-4 h-4" /> Next Practical Action
            </div>
            <span className="text-[11px] text-slate-400">Grounding in verified activity</span>
          </div>
          <h3 className="text-lg font-bold text-white mb-1">
            {oneNextStep.title}
          </h3>
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed mb-4">
            {oneNextStep.action}
          </p>
          <button
            onClick={() => navigate(oneNextStep.targetPath)}
            className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold transition-colors inline-flex items-center gap-1.5"
          >
            <span>Proceed to Action</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* G-ONE FINAL PERSONALIZED SUMMARY CARD */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" /> G-ONE Final Personalised Summary
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              Student Skill & Opportunity Assessment
            </h2>
          </div>
          <span className="text-xs text-slate-400 font-mono">Kaushal Setu Certified Record</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
            <strong className="text-slate-800 text-sm block">Your Strongest Competencies:</strong>
            <p className="text-slate-600 leading-relaxed">
              Photography (Strong), Communication & Pitching (Advanced). You demonstrate superior capability in framing visual subjects and collaborating with community partners.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
            <strong className="text-slate-800 text-sm block">Opportunities Worth Exploring:</strong>
            <p className="text-slate-600 leading-relaxed">
              Product Photography & Digital Catalog Service, Social Media Visual Content Creator, UI/UX Visual Prototyping.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
            <strong className="text-slate-800 text-sm block">Skills Recommended to Develop:</strong>
            <p className="text-slate-600 leading-relaxed">
              Pricing Strategy & Break-Even Cost Accounting, Formal Client Briefing & Scope Control.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
            <strong className="text-slate-800 text-sm block">Completed Platform Work:</strong>
            <p className="text-slate-600 leading-relaxed">
              {progressMetrics.completedActions} roadmap milestone actions, {projects.length} practical projects documented with structured reflection, and 1 calibrated financial model.
            </p>
          </div>
        </div>

        <div className="p-4 bg-indigo-50/60 rounded-2xl border border-indigo-100 flex items-center justify-between text-xs">
          <div>
            <strong className="text-indigo-950 block">Suggested Immediate Next Step:</strong>
            <p className="text-slate-700 mt-0.5">{oneNextStep.action}</p>
          </div>
          <button
            onClick={() => navigate(oneNextStep.targetPath)}
            className="px-3.5 py-1.5 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 shrink-0 ml-4"
          >
            Go Now
          </button>
        </div>

        <div className="pt-2 border-t border-slate-100 flex items-center gap-2 text-[11px] text-slate-400">
          <ShieldCheck className="w-4 h-4 text-slate-400" />
          <span>
            Responsible Advisory Disclaimer: Kaushal Setu is an educational platform designed for the CBSE Skill Expo. Insights reflect user-provided inputs and curriculum mappings, not legally binding financial guarantees.
          </span>
        </div>
      </div>
    </div>
  );
};
