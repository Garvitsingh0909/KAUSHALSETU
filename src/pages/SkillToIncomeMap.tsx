import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  ShieldCheck,
  Zap,
  IndianRupee,
  ChevronRight,
  BookOpen,
  DollarSign,
  Award,
  Filter,
  Eye,
  LayoutGrid,
  GitMerge
} from 'lucide-react';
import { useProfile } from '../context/ProfileContext';
import { useBusiness } from '../context/BusinessContext';
import { useRoadmap } from '../context/RoadmapContext';
import { useGOne } from '../context/GOneContext';
import { useViewMode } from '../context/ViewModeContext';
import { OPPORTUNITIES_DB, Opportunity } from '../data/opportunities';
import { Skill, SkillCategory } from '../data/skills';
import { Link, useNavigate } from 'react-router-dom';

export const SkillToIncomeMap: React.FC = () => {
  const navigate = useNavigate();
  const { profile, userSkills, allSkills, getSkillDetails } = useProfile();
  const { activeScenario, scenarios } = useBusiness();
  const { targetOpportunity, projects, actions, progressMetrics, setTargetOpportunity } = useRoadmap();
  const { oneNextStep, loadFullCbseJudgeEcosystem } = useGOne();
  const { isMinimal } = useViewMode();

  // Mode tab: 'normal_map' or 'capstone_journey'
  const [activeTab, setActiveTab] = useState<'normal_map' | 'capstone_journey'>(() => isMinimal ? 'normal_map' : 'normal_map');
  const [selectedSkillId, setSelectedSkillId] = useState<string>(() => {
    if (userSkills.length > 0) return userSkills[0].skillId;
    return allSkills[0]?.id || 'fine_arts_visual';
  });
  const [filterCategory, setFilterCategory] = useState<SkillCategory | 'All'>('All');

  // Selected skill object
  const selectedSkill: Skill | undefined = useMemo(() => {
    return allSkills.find(s => s.id === selectedSkillId) || allSkills[0];
  }, [allSkills, selectedSkillId]);

  // Matching opportunities for selected skill
  const matchingOpportunities: Opportunity[] = useMemo(() => {
    if (!selectedSkill) return [];
    const skillId = selectedSkill.id.toLowerCase();
    const skillName = selectedSkill.name.toLowerCase();

    return OPPORTUNITIES_DB.filter(opp => {
      const matchRequired = opp.requiredSkills.some(s => 
        s.toLowerCase() === skillId || 
        skillName.includes(s.toLowerCase()) || 
        s.toLowerCase().includes(skillId)
      );
      const matchPreferred = opp.preferredSkills?.some(s => 
        s.toLowerCase() === skillId || 
        skillName.includes(s.toLowerCase()) || 
        s.toLowerCase().includes(skillId)
      );
      const matchTitle = opp.title.toLowerCase().includes(skillName) || opp.solution.toLowerCase().includes(skillName);
      return matchRequired || matchPreferred || matchTitle;
    });
  }, [selectedSkill]);

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

  const handleSelectOpportunity = (opp: Opportunity) => {
    setTargetOpportunity(opp);
    navigate('/roadmap');
  };

  // Filter available skills list
  const filteredSkills = useMemo(() => {
    if (filterCategory === 'All') return allSkills;
    return allSkills.filter(s => s.category === filterCategory);
  }, [allSkills, filterCategory]);

  return (
    <div className="space-y-8 pb-20 max-w-6xl mx-auto">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
              <Sparkles className="w-3.5 h-3.5 mr-1 text-emerald-600" />
              Interactive Skill-to-Income Engine
            </span>
            <span className="text-xs text-slate-500 font-medium">CBSE Skill Expo • Financial Literacy</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Skill-to-Income Map
          </h1>
          <p className="text-sm md:text-base text-slate-600 mt-1 max-w-2xl">
            Select any vocational or digital skill to instantly analyze its core value propositions, client problems solved, real-world opportunities, and estimated revenue.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Map View Switcher */}
          <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('normal_map')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                activeTab === 'normal_map' 
                  ? 'bg-white text-slate-900 shadow-xs font-bold' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5 text-blue-600" />
              <span>Interactive Skill Map</span>
            </button>
            <button
              onClick={() => setActiveTab('capstone_journey')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                activeTab === 'capstone_journey' 
                  ? 'bg-white text-slate-900 shadow-xs font-bold' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <GitMerge className="w-3.5 h-3.5 text-indigo-600" />
              <span>Capstone Journey</span>
            </button>
          </div>

          <button
            onClick={loadFullCbseJudgeEcosystem}
            className="px-3 py-2 text-xs font-semibold rounded-xl bg-amber-50 text-amber-900 border border-amber-300 hover:bg-amber-100 transition-colors shadow-xs"
          >
            Load Demo
          </button>
          <button
            onClick={handlePrint}
            className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-xs flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Print Map</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: NORMAL INTERACTIVE SKILL MAP */}
      {activeTab === 'normal_map' && (
        <div className="space-y-6">
          {/* Skill Selector Matrix */}
          <div className="bg-white rounded-3xl border border-slate-200 p-5 md:p-6 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Target className="w-4 h-4 text-blue-600" />
                  Select a Skill to Map to Income & Opportunities
                </h2>
                <p className="text-xs text-slate-500">Click any skill below to generate instant economic breakdown and project matches.</p>
              </div>

              {/* Category Filter */}
              <div className="flex overflow-x-auto gap-1.5 pb-1">
                {(['All', 'Technical', 'Creative', 'Communication', 'Practical', 'Entrepreneurial'] as const).map(cat => (
                  <button
                    key={cat}
                    onClick={() => setFilterCategory(cat)}
                    className={`px-2.5 py-1 text-xs rounded-lg font-medium whitespace-nowrap transition-colors ${
                      filterCategory === cat
                        ? 'bg-blue-600 text-white font-bold'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Skill Chips */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
              {filteredSkills.map(skill => {
                const isSelected = skill.id === selectedSkillId;
                const isUserSkill = userSkills.some(us => us.skillId === skill.id);
                return (
                  <button
                    key={skill.id}
                    onClick={() => setSelectedSkillId(skill.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 border ${
                      isSelected
                        ? 'bg-blue-600 text-white border-blue-600 shadow-xs ring-2 ring-blue-300/50'
                        : isUserSkill
                        ? 'bg-blue-50 text-blue-900 border-blue-200 hover:bg-blue-100'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <span>{skill.name}</span>
                    {isUserSkill && (
                      <span className={`text-[9px] px-1 py-0.2 rounded font-bold ${
                        isSelected ? 'bg-blue-800 text-blue-100' : 'bg-blue-200 text-blue-900'
                      }`}>
                        My Skill
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Skill Details Breakdown */}
          {selectedSkill && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* LEFT COLUMN: MAIN POINTS & APPLICATIONS (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* 1. Skill Profile & Main Points */}
                <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-5">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
                    <div>
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 inline-block mb-1">
                        {selectedSkill.category} Capability
                      </span>
                      <h2 className="text-xl md:text-2xl font-extrabold text-slate-900">
                        {selectedSkill.name}
                      </h2>
                    </div>

                    {selectedSkill.estimatedRevenue && (
                      <div className="p-2.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-right">
                        <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">Estimated Project Yield</span>
                        <span className="text-sm md:text-base font-extrabold text-emerald-700 font-mono">
                          {selectedSkill.estimatedRevenue.perProject}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-1">
                      Skill Overview & Competency:
                    </span>
                    <p className="text-xs md:text-sm text-slate-700 leading-relaxed">
                      {selectedSkill.description}
                    </p>
                  </div>

                  {/* Main Points 1: Real-World Applications */}
                  <div className="space-y-2">
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-blue-600" />
                      Key Real-World Applications & Deliverables
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selectedSkill.applications?.map((app, idx) => (
                        <div key={idx} className="p-2.5 rounded-xl bg-blue-50/50 border border-blue-100 text-xs flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                          <span className="text-slate-800 font-medium">{app}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Main Points 2: Client Problems Solved */}
                  <div className="space-y-2">
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                      <Target className="w-3.5 h-3.5 text-rose-600" />
                      Client & Community Problems Solved
                    </h3>
                    <div className="space-y-1.5">
                      {selectedSkill.problemsSolved?.map((prob, idx) => (
                        <div key={idx} className="p-2.5 rounded-xl bg-rose-50/40 border border-rose-100 text-xs text-slate-800 flex items-start gap-2">
                          <span className="w-4 h-4 rounded-full bg-rose-200 text-rose-800 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <p className="leading-snug">{prob}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Next Skills */}
                  {selectedSkill.nextSkills && selectedSkill.nextSkills.length > 0 && (
                    <div className="pt-2 border-t border-slate-100">
                      <span className="text-xs font-bold text-slate-700 block mb-2">Recommended Next Skills to Scale:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedSkill.nextSkills.map((next, idx) => (
                          <span key={idx} className="px-2.5 py-1 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-900 font-semibold text-xs">
                            {next.replace(/_/g, ' ')}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. Direct Matching Opportunities */}
                <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-indigo-600" />
                        Matching Opportunities & Pathways ({matchingOpportunities.length})
                      </h3>
                      <p className="text-xs text-slate-500">Curated micro-enterprises and client services utilizing this skill.</p>
                    </div>
                    <Link to="/opportunities" className="text-xs font-bold text-indigo-600 hover:underline">
                      Explore All
                    </Link>
                  </div>

                  {matchingOpportunities.length === 0 ? (
                    <div className="p-6 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                      <p className="text-xs text-slate-500 font-medium">
                        Custom micro-services can be dynamically generated for this skill.
                      </p>
                      <button
                        onClick={() => navigate('/what-can-i-build')}
                        className="mt-3 px-3.5 py-1.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700"
                      >
                        Synthesize New Opportunity
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {matchingOpportunities.map(opp => (
                        <div
                          key={opp.id}
                          className="p-4 rounded-2xl border border-slate-200 hover:border-indigo-300 transition-all bg-slate-50/50 hover:bg-white space-y-2.5 group"
                        >
                          <div className="flex flex-wrap items-start justify-between gap-2">
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-bold text-slate-900 text-sm group-hover:text-indigo-600 transition-colors">
                                  {opp.title}
                                </h4>
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
                                  {opp.difficulty}
                                </span>
                              </div>
                              <span className="text-[11px] text-slate-500 font-medium">
                                {opp.opportunityType}
                              </span>
                            </div>

                            {opp.compensationLabel && (
                              <span className="text-xs font-extrabold text-emerald-700 px-2.5 py-1 bg-emerald-100/80 rounded-xl border border-emerald-200">
                                {opp.compensationLabel}
                              </span>
                            )}
                          </div>

                          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                            {opp.solution}
                          </p>

                          <div className="flex items-center justify-between pt-2 border-t border-slate-200/60">
                            <span className="text-[11px] text-slate-500">
                              {opp.applications?.[0] || 'Turnkey deliverable'}
                            </span>
                            <button
                              onClick={() => handleSelectOpportunity(opp)}
                              className="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors inline-flex items-center gap-1"
                            >
                              <span>Build This</span>
                              <ChevronRight className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* RIGHT COLUMN: ESTIMATED REVENUE & BREAK-EVEN SIMULATION (5 cols) */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Revenue Card */}
                <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-6 shadow-xl border border-slate-800 space-y-5">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
                        <TrendingUp className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white">Estimated Revenue Potential</h3>
                        <span className="text-[11px] text-slate-400">Verified Indian Market Benchmark</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                      INR Model
                    </span>
                  </div>

                  {/* Core Metrics */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3.5 bg-slate-850/80 rounded-2xl border border-slate-750">
                      <span className="text-[11px] text-slate-400 block mb-1">Per Project / Service</span>
                      <span className="text-base font-extrabold text-white font-mono">
                        {selectedSkill.estimatedRevenue?.perProject || '₹2,500 – ₹6,000'}
                      </span>
                      <span className="text-[10px] text-emerald-400 block mt-1">Per client commission</span>
                    </div>

                    <div className="p-3.5 bg-slate-850/80 rounded-2xl border border-slate-750">
                      <span className="text-[11px] text-slate-400 block mb-1">Monthly Potential</span>
                      <span className="text-base font-extrabold text-emerald-400 font-mono">
                        {selectedSkill.estimatedRevenue?.monthlyPotential || '₹18,000 – ₹42,000'}
                      </span>
                      <span className="text-[10px] text-slate-400 block mt-1">Part-time (4-6 hrs/wk)</span>
                    </div>
                  </div>

                  {/* Pricing Model Info */}
                  <div className="p-3.5 bg-slate-800/60 rounded-2xl border border-slate-700 text-xs space-y-1">
                    <span className="text-[11px] font-bold text-amber-400 block">Recommended Pricing Model:</span>
                    <p className="text-slate-300">
                      {selectedSkill.estimatedRevenue?.pricingModel || 'Deliverable-based fixed project fee with 50% advance deposit.'}
                    </p>
                  </div>

                  {/* Educational Unit Economics Simulator */}
                  <div className="space-y-3 pt-2 border-t border-slate-800 text-xs">
                    <span className="font-bold text-slate-200 block flex items-center justify-between">
                      <span>Quick Unit Economics Calculation</span>
                      <Calculator className="w-3.5 h-3.5 text-blue-400" />
                    </span>
                    <div className="space-y-2 text-slate-300">
                      <div className="flex justify-between py-1 border-b border-slate-800 text-[11px]">
                        <span>Suggested Entry Rate:</span>
                        <span className="font-mono text-white font-bold">₹1,500 / project</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-800 text-[11px]">
                        <span>Material / Tool Cost per Unit:</span>
                        <span className="font-mono text-slate-400">₹300</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-800 text-[11px]">
                        <span>Net Surplus per Client:</span>
                        <span className="font-mono text-emerald-400 font-bold">+₹1,200 (80% margin)</span>
                      </div>
                      <div className="flex justify-between py-1 text-[11px]">
                        <span>Clients to reach ₹6,000 surplus:</span>
                        <span className="font-mono text-amber-400 font-bold">5 Clients</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate('/business-builder')}
                    className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-md"
                  >
                    <span>Open Full Financial Simulator</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Actionable Next Step Card */}
                <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-indigo-700 uppercase tracking-wider">
                    <Compass className="w-4 h-4" /> Recommended Action
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    {selectedSkill.projectIdeas?.[0] || `Build an introductory 3-piece portfolio using ${selectedSkill.name}`}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Document this project in My Projects to establish proof-of-work before seeking commercial clients.
                  </p>
                  <button
                    onClick={() => navigate('/projects')}
                    className="w-full py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors"
                  >
                    Log in My Projects
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* VIEW 2: FULL CAPSTONE ROADMAP JOURNEY */}
      {activeTab === 'capstone_journey' && (
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
          </div>

          <div className="flex justify-center text-slate-400">
            <ArrowDown className="w-5 h-5" />
          </div>

          {/* NODE 5: THE NEXT IMMEDIATE STEP */}
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
      )}

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
              Fine Arts & Visual Craft (Advanced), Photography (Strong), Communication & Pitching (Advanced). You demonstrate superior capability in framing visual subjects and collaborating with community partners.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
            <strong className="text-slate-800 text-sm block">Opportunities Worth Exploring:</strong>
            <p className="text-slate-600 leading-relaxed">
              Fine Arts & Custom Canvas Mural Studio (₹3,500 – ₹12,000), AI-Powered Workflow Automation (₹4,000 – ₹12,000), Product Photography & Digital Catalog Service.
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

        <div className="pt-2 border-t border-slate-100 flex items-center gap-2 text-[11px] text-slate-400">
          <ShieldCheck className="w-4 h-4 text-slate-400" />
          <span>
            Responsible Advisory Disclaimer: Kaushal Setu is an educational platform designed for vocational skill development and student entrepreneurship. Insights reflect user-provided inputs and curriculum mappings, not legally binding financial guarantees.
          </span>
        </div>
      </div>
    </div>
  );
};
