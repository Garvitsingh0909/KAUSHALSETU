import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, 
  Target, 
  CheckCircle2, 
  Clock, 
  Circle, 
  ArrowRight, 
  Sparkles, 
  BookOpen, 
  Plus, 
  Printer, 
  Copy, 
  Check, 
  ExternalLink, 
  Briefcase, 
  TrendingUp, 
  Layers, 
  HelpCircle, 
  RefreshCw,
  Award,
  ChevronDown,
  ChevronUp,
  X,
  FileText
} from 'lucide-react';
import { useProfile } from '../context/ProfileContext';
import { useBusiness } from '../context/BusinessContext';
import { useRoadmap } from '../context/RoadmapContext';
import { OPPORTUNITIES } from '../data/opportunities';
import { 
  ROADMAP_STAGES, 
  RoadmapStageId, 
  ActionItem, 
  PathwayType, 
  PracticalGoal, 
  getEducationalResource,
  EducationalSkillResource
} from '../data/roadmap';
import { Link, useNavigate } from 'react-router-dom';

export const MyRoadmap: React.FC = () => {
  const navigate = useNavigate();
  const { userSkills, allSkills } = useProfile();
  const { activeScenario, scenarios } = useBusiness();
  const { 
    targetOpportunityId, 
    targetOpportunity, 
    setTargetOpportunityId,
    pathwayType,
    setPathwayType,
    practicalGoal,
    setPracticalGoal,
    actions,
    addAction,
    updateActionStatus,
    deleteAction,
    skillGaps,
    progressMetrics,
    gOneRoadmapAdvice,
    loadDemoRoadmap,
    addProject
  } = useRoadmap();

  // Local state for modals and forms
  const [selectedSkillResource, setSelectedSkillResource] = useState<EducationalSkillResource | null>(null);
  const [showAddActionModal, setShowAddActionModal] = useState<boolean>(false);
  const [targetStageForNewAction, setTargetStageForNewAction] = useState<RoadmapStageId>('practice');
  const [newActionTitle, setNewActionTitle] = useState('');
  const [newActionDesc, setNewActionDesc] = useState('');
  const [newActionPurpose, setNewActionPurpose] = useState('');
  const [newActionOutput, setNewActionOutput] = useState('');

  const [showSummaryModal, setShowSummaryModal] = useState<boolean>(false);
  const [copiedSummary, setCopiedSummary] = useState<boolean>(false);

  // Expanded stage tracking
  const [expandedStages, setExpandedStages] = useState<Record<string, boolean>>({
    foundation: true,
    practice: true,
    portfolio: true,
    communication: true,
    test: true,
    reflect: true
  });

  const toggleStageExpand = (stageId: string) => {
    setExpandedStages(prev => ({ ...prev, [stageId]: !prev[stageId] }));
  };

  const handleCreateCustomAction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newActionTitle.trim() || !newActionDesc.trim()) return;

    addAction({
      stageId: targetStageForNewAction,
      title: newActionTitle.trim(),
      action: newActionDesc.trim(),
      purpose: newActionPurpose.trim() || 'Strengthen practical skill output.',
      output: newActionOutput.trim() || 'Verified completed deliverable.',
      status: 'not_started',
      isCustom: true
    });

    setNewActionTitle('');
    setNewActionDesc('');
    setNewActionPurpose('');
    setNewActionOutput('');
    setShowAddActionModal(false);
  };

  const handleTurnRoadmapIntoProject = () => {
    if (!targetOpportunity) return;
    
    // Create pre-populated project in My Projects
    const deliverables = actions.slice(0, 4).map((a, idx) => ({
      id: `del-${Date.now()}-${idx}`,
      title: a.title,
      completed: a.status === 'completed'
    }));

    const projId = addProject({
      name: `${targetOpportunity.title} Exploration Project`,
      targetOpportunityId: targetOpportunity.id,
      targetOpportunityTitle: targetOpportunity.title,
      skillsUsed: targetOpportunity.requiredSkills,
      problemSolved: targetOpportunity.problems[0] || 'Solving real-world community or business requirement.',
      whatICreated: 'Curated work outputs and practical deliverable set.',
      deliverables,
      date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      status: 'in_progress'
    });

    navigate('/projects');
  };

  const handleCopySummary = () => {
    const nextAction = actions.find(a => a.status === 'in_progress') || actions.find(a => a.status === 'not_started');
    const summaryText = `KAUSHAL SETU — ACTION ROADMAP SUMMARY
Target Opportunity: ${targetOpportunity?.title}
Pathway Type: ${pathwayType.toUpperCase()}
Practical Goal: ${practicalGoal.replace(/_/g, ' ').toUpperCase()}
Current Verified Skills: ${userSkills.map(s => `${s.skillId} (${s.proficiency})`).join(', ')}

SKILL GAPS ANALYSIS:
- Have: ${skillGaps.filter(g => g.status === 'have').map(g => g.skillName).join(', ') || 'None'}
- Developing: ${skillGaps.filter(g => g.status === 'developing').map(g => g.skillName).join(', ') || 'None'}
- Useful to Develop: ${skillGaps.filter(g => g.status === 'needed').map(g => g.skillName).join(', ') || 'None'}

MILESTONE ACTION PROGRESS:
- Total Actions: ${progressMetrics.totalActions}
- Completed: ${progressMetrics.completedActions} (${progressMetrics.percentComplete}%)
- Immediate Next Step: ${nextAction ? `${nextAction.title} — ${nextAction.action}` : 'All milestone actions completed'}

G-ONE ADVISORY NOTE:
${gOneRoadmapAdvice.summary}
*Educational pathway generated by Kaushal Setu for CBSE Skill Expo.*`;

    navigator.clipboard.writeText(summaryText);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);
  };

  const handlePrintSummary = () => {
    window.print();
  };

  const connectedBusinessScenario = activeScenario || scenarios[0];

  return (
    <div className="space-y-8 pb-16 max-w-7xl mx-auto">
      {/* Top Banner & Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
              Personalised Action Roadmap
            </span>
            <span className="text-xs text-slate-500 font-medium">CBSE Skill Expo</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
            My Action Roadmap
          </h1>
          <p className="text-sm md:text-base text-slate-600 mt-1 max-w-2xl">
            A step-by-step pathway bridging your current skills to real-world entrepreneurial execution.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            id="btn-expo-demo-roadmap"
            onClick={loadDemoRoadmap}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs md:text-sm font-medium rounded-xl bg-amber-50 text-amber-900 border border-amber-300 hover:bg-amber-100 transition-colors shadow-sm"
            title="Preload Aarav Patel's CBSE Expo Product Photography Demo"
          >
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Load CBSE Expo Demo</span>
          </button>

          <button
            id="btn-open-roadmap-summary"
            onClick={() => setShowSummaryModal(true)}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs md:text-sm font-medium rounded-xl bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 transition-colors shadow-sm"
          >
            <Printer className="w-4 h-4 text-slate-500" />
            <span>Summary & Export</span>
          </button>

          <button
            id="btn-turn-into-project"
            onClick={handleTurnRoadmapIntoProject}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs md:text-sm font-semibold rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-sm"
          >
            <Briefcase className="w-4 h-4" />
            <span>Turn into Project</span>
          </button>
        </div>
      </div>

      {/* Grid: Current Position + Target Explorer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Current Position Summary (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-indigo-600" />
                <h3 className="font-semibold text-slate-900 text-sm">Current Position</h3>
              </div>
              <Link
                to="/skill-dna"
                className="text-xs font-medium text-indigo-600 hover:text-indigo-700 inline-flex items-center gap-1"
              >
                <span>View Skill DNA</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {/* Verified Skills list */}
            <div>
              <p className="text-xs text-slate-500 font-medium mb-2.5">
                Verified Skills & Proficiency ({userSkills.length})
              </p>
              {userSkills.length === 0 ? (
                <div className="p-3.5 bg-slate-50 border border-dashed border-slate-200 rounded-xl text-center">
                  <p className="text-xs text-slate-500">No skills added yet.</p>
                  <Link
                    to="/skills"
                    className="mt-1 text-xs text-indigo-600 font-medium hover:underline inline-block"
                  >
                    + Add Skills to Profile
                  </Link>
                </div>
              ) : (
                <div className="space-y-1.5">
                  {userSkills.map(us => {
                    const skill = allSkills.find(s => s.id === us.skillId);
                    const name = skill ? skill.name : us.skillId.replace(/_/g, ' ');
                    let profColor = 'bg-slate-100 text-slate-700 border-slate-200';
                    if (us.proficiency === 'Advanced') profColor = 'bg-emerald-50 text-emerald-700 border-emerald-200';
                    else if (us.proficiency === 'Strong') profColor = 'bg-blue-50 text-blue-700 border-blue-200';
                    else if (us.proficiency === 'Intermediate') profColor = 'bg-amber-50 text-amber-700 border-amber-200';
                    else profColor = 'bg-slate-50 text-slate-600 border-slate-200';

                    return (
                      <div
                        key={us.skillId}
                        className="flex items-center justify-between p-2 rounded-lg bg-slate-50/80 border border-slate-100 text-xs"
                      >
                        <span className="font-medium text-slate-800">{name}</span>
                        <span className={`px-2 py-0.5 rounded-md font-semibold border ${profColor}`}>
                          {us.proficiency}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Pathway Type selection */}
            <div className="border-t border-slate-100 pt-3">
              <label className="text-xs text-slate-500 font-medium block mb-1.5">
                Pathway Framework
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {(['service', 'freelance', 'product', 'community'] as PathwayType[]).map(type => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setPathwayType(type)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border text-left transition-all ${
                      pathwayType === type
                        ? 'bg-indigo-50 border-indigo-300 text-indigo-800 font-semibold'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)} Pathway
                  </button>
                ))}
              </div>
            </div>

            {/* Practical Goal selection */}
            <div className="border-t border-slate-100 pt-3">
              <label className="text-xs text-slate-500 font-medium block mb-1.5">
                Practical Learning Goal
              </label>
              <select
                value={practicalGoal}
                onChange={(e) => setPracticalGoal(e.target.value as PracticalGoal)}
                className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <option value="create_portfolio">Create a 5-sample portfolio</option>
                <option value="build_first_project">Build my first working project</option>
                <option value="develop_skill">Develop a targeted practical skill</option>
                <option value="explore_idea">Explore an entrepreneurial idea</option>
                <option value="solve_problem">Solve a real school/community problem</option>
                <option value="learn_additional_skill">Acquire an complementary skill</option>
              </select>
            </div>
          </div>

          {/* G-ONE Roadmap Advisor Box */}
          <div className="bg-gradient-to-br from-indigo-50/90 to-blue-50/50 rounded-2xl border border-indigo-100 p-5 shadow-sm space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <h3 className="font-semibold text-indigo-950 text-sm">
                {gOneRoadmapAdvice.title}
              </h3>
            </div>
            <p className="text-xs leading-relaxed text-indigo-900">
              {gOneRoadmapAdvice.summary}
            </p>
            <div className="bg-white/80 rounded-xl p-3 border border-indigo-100 space-y-1">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-indigo-700">
                Suggested Next Step
              </div>
              <p className="text-xs font-medium text-slate-800">
                {gOneRoadmapAdvice.suggestedNextStep}
              </p>
            </div>
            <p className="text-[11px] text-slate-500 italic">
              *Advisor guidance is educational and explainable; it suggests practical pathways rather than guaranteeing outcomes.
            </p>
          </div>
        </div>

        {/* Right Column: Target Opportunity + Connected Business Model + Skill Gaps (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Target Opportunity Banner */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-indigo-600" />
                <div>
                  <h3 className="font-bold text-slate-900 text-base">
                    Target Opportunity
                  </h3>
                  <p className="text-xs text-slate-500">
                    The real-world application guiding this personalized action roadmap
                  </p>
                </div>
              </div>

              {/* Opportunity dropdown selector */}
              <div className="flex items-center gap-2">
                <label htmlFor="select-target-opp" className="text-xs text-slate-500 font-medium whitespace-nowrap">
                  Change Target:
                </label>
                <select
                  id="select-target-opp"
                  value={targetOpportunityId}
                  onChange={(e) => setTargetOpportunityId(e.target.value)}
                  className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {OPPORTUNITIES.map(opp => (
                    <option key={opp.id} value={opp.id}>
                      {opp.title} ({opp.category})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Target Details Card */}
            {targetOpportunity && (
              <div className="bg-slate-50/80 rounded-xl p-4 border border-slate-100 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-base font-bold text-slate-900">
                      {targetOpportunity.title}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800">
                      {targetOpportunity.category}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-slate-200 text-slate-700">
                      {targetOpportunity.difficulty}
                    </span>
                  </div>

                  <Link
                    to={`/opportunities/${targetOpportunity.id}`}
                    className="text-xs font-medium text-indigo-600 hover:text-indigo-700 inline-flex items-center gap-1"
                  >
                    <span>View Opportunity Dossier</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {targetOpportunity.solution}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-white border border-slate-200">
                    <span className="text-slate-500 font-medium block">Problem Solved:</span>
                    <span className="font-medium text-slate-800">
                      {targetOpportunity.problems[0]}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white border border-slate-200">
                    <span className="text-slate-500 font-medium block">Target Beneficiaries:</span>
                    <span className="font-medium text-slate-800">
                      {targetOpportunity.targetUsers.join(', ')}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Phase 3 Integration: Connected Business Model Banner */}
            {connectedBusinessScenario && (
              <div className="bg-emerald-50/80 rounded-xl p-3.5 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5 font-semibold text-emerald-950">
                    <TrendingUp className="w-4 h-4 text-emerald-700" />
                    <span>Connected to Phase 3 Business Model</span>
                  </div>
                  <p className="text-emerald-900">
                    <span className="font-semibold">{connectedBusinessScenario.scenarioName}</span> • Price ₹{connectedBusinessScenario.pricePerUnit.toLocaleString()} • Break-even {connectedBusinessScenario.breakEvenCustomers || 'N/A'} customers • Surplus ₹{connectedBusinessScenario.surplus.toLocaleString()}
                  </p>
                </div>

                <Link
                  to="/simulator"
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition-colors whitespace-nowrap text-center"
                >
                  Review Simulator
                </Link>
              </div>
            )}
          </div>

          {/* Skill Gap Analysis (Have → Developing → Useful to develop) */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">
                  Skill Gap Analysis
                </h3>
                <p className="text-xs text-slate-500">
                  Categorized visual alignment for {targetOpportunity?.title}
                </p>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                {progressMetrics.targetSkillsCovered} of {progressMetrics.totalTargetSkills} core skills verified
              </span>
            </div>

            {/* 3 Pillars: Have / Developing / Useful to develop */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Have Pillar */}
              <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-3.5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider">
                    Have (Verified)
                  </span>
                  <span className="text-xs font-bold px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    {skillGaps.filter(g => g.status === 'have').length}
                  </span>
                </div>
                <div className="space-y-1.5">
                  {skillGaps.filter(g => g.status === 'have').length === 0 ? (
                    <p className="text-xs text-slate-400 italic">None verified yet</p>
                  ) : (
                    skillGaps.filter(g => g.status === 'have').map(g => (
                      <div key={g.skillId} className="p-2 rounded-lg bg-white border border-emerald-200 text-xs shadow-2xs">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-slate-900">{g.skillName}</span>
                          <span className="text-[10px] px-1.5 py-0.5 font-semibold rounded bg-emerald-100 text-emerald-800">
                            {g.currentProficiency}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                          {g.reasonWhy}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Developing Pillar */}
              <div className="rounded-xl border border-amber-200 bg-amber-50/40 p-3.5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-900 uppercase tracking-wider">
                    Developing
                  </span>
                  <span className="text-xs font-bold px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-800">
                    {skillGaps.filter(g => g.status === 'developing').length}
                  </span>
                </div>
                <div className="space-y-1.5">
                  {skillGaps.filter(g => g.status === 'developing').length === 0 ? (
                    <p className="text-xs text-slate-400 italic">None in developing</p>
                  ) : (
                    skillGaps.filter(g => g.status === 'developing').map(g => (
                      <div key={g.skillId} className="p-2 rounded-lg bg-white border border-amber-200 text-xs shadow-2xs">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-slate-900">{g.skillName}</span>
                          <span className="text-[10px] px-1.5 py-0.5 font-semibold rounded bg-amber-100 text-amber-800">
                            {g.currentProficiency}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                          {g.reasonWhy}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Useful to Develop Pillar */}
              <div className="rounded-xl border border-blue-200 bg-blue-50/40 p-3.5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">
                    Useful to Develop
                  </span>
                  <span className="text-xs font-bold px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
                    {skillGaps.filter(g => g.status === 'needed').length}
                  </span>
                </div>
                <div className="space-y-1.5">
                  {skillGaps.filter(g => g.status === 'needed').length === 0 ? (
                    <p className="text-xs text-slate-400 italic">All skills covered!</p>
                  ) : (
                    skillGaps.filter(g => g.status === 'needed').map(g => (
                      <div key={g.skillId} className="p-2 rounded-lg bg-white border border-blue-200 text-xs shadow-2xs">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-slate-900">{g.skillName}</span>
                          <button
                            type="button"
                            onClick={() => setSelectedSkillResource(getEducationalResource(g.skillId, g.skillName))}
                            className="text-[10px] px-1.5 py-0.5 font-semibold rounded bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200"
                          >
                            Learn This
                          </button>
                        </div>
                        <p className="text-[11px] text-slate-600 mt-1">
                          {g.reasonWhy}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Explainable Gap Note */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-start gap-2">
              <HelpCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <span>
                <strong>Educational Philosophy:</strong> Rather than viewing missing skills as barriers, G-ONE identifies them as opportunities to learn through targeted actions.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Section: Personal Learning Roadmap (Stages 1 through 6) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-600" />
              <h2 className="text-xl font-bold text-slate-900">
                Action Plan & Milestones
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Structured progressive stages from conceptual understanding to live pilot validation
            </p>
          </div>

          {/* Overall Progress Tracker */}
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-xs text-slate-500">Milestone Progress</div>
              <div className="text-sm font-bold text-slate-900">
                {progressMetrics.completedActions} of {progressMetrics.totalActions} Done ({progressMetrics.percentComplete}%)
              </div>
            </div>
            <div className="w-28 h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
              <div 
                className="h-full bg-indigo-600 transition-all duration-500 rounded-full"
                style={{ width: `${progressMetrics.percentComplete}%` }}
              />
            </div>
          </div>
        </div>

        {/* 6 Stages Timeline Container */}
        <div className="space-y-4">
          {ROADMAP_STAGES.map((stage) => {
            const stageActions = actions.filter(a => a.stageId === stage.id);
            const isExpanded = expandedStages[stage.id] ?? true;
            const completedCount = stageActions.filter(a => a.status === 'completed').length;
            const isStageFullyComplete = stageActions.length > 0 && completedCount === stageActions.length;

            return (
              <div
                key={stage.id}
                className={`rounded-2xl border transition-all ${
                  isStageFullyComplete
                    ? 'border-emerald-200 bg-emerald-50/20'
                    : 'border-slate-200 bg-white'
                }`}
              >
                {/* Stage Header Accordion */}
                <div
                  onClick={() => toggleStageExpand(stage.id)}
                  className="p-4 flex items-center justify-between cursor-pointer select-none hover:bg-slate-50/50 rounded-2xl transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${
                      isStageFullyComplete
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 text-slate-700'
                    }`}>
                      {stage.order}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-slate-900 text-sm">
                          {stage.title}
                        </h4>
                        {isStageFullyComplete && (
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                            Milestone Reached
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500">
                        {stage.shortDesc} • <span className="font-medium text-slate-700">{stage.milestoneTitle}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-slate-600">
                      {completedCount}/{stageActions.length} Completed
                    </span>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setTargetStageForNewAction(stage.id);
                        setShowAddActionModal(true);
                      }}
                      className="p-1.5 text-xs text-indigo-600 hover:text-indigo-800 rounded-lg hover:bg-indigo-50 border border-indigo-200 transition-colors"
                      title="Add action to this stage"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>

                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                </div>

                {/* Stage Actions List */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-4 pb-4 pt-1 border-t border-slate-100 space-y-3"
                    >
                      {stageActions.length === 0 ? (
                        <div className="py-4 text-center text-xs text-slate-400">
                          No actions defined for this stage yet.{' '}
                          <button
                            type="button"
                            onClick={() => {
                              setTargetStageForNewAction(stage.id);
                              setShowAddActionModal(true);
                            }}
                            className="text-indigo-600 font-medium hover:underline"
                          >
                            + Add an action
                          </button>
                        </div>
                      ) : (
                        stageActions.map((action) => (
                          <div
                            key={action.id}
                            className={`p-3.5 rounded-xl border transition-all ${
                              action.status === 'completed'
                                ? 'bg-emerald-50/40 border-emerald-200'
                                : action.status === 'in_progress'
                                ? 'bg-amber-50/40 border-amber-200'
                                : 'bg-slate-50/60 border-slate-200'
                            }`}
                          >
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                              <div className="space-y-1.5 flex-1">
                                <div className="flex items-center gap-2">
                                  <h5 className={`font-semibold text-sm ${
                                    action.status === 'completed' ? 'text-emerald-950 line-through' : 'text-slate-900'
                                  }`}>
                                    {action.title}
                                  </h5>
                                  {action.isCustom && (
                                    <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                                      Custom
                                    </span>
                                  )}
                                </div>

                                <p className="text-xs text-slate-700">
                                  <strong>Action:</strong> {action.action}
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-[11px]">
                                  <div className="text-slate-600">
                                    <span className="font-semibold text-slate-700">Purpose:</span> {action.purpose}
                                  </div>
                                  <div className="text-slate-600">
                                    <span className="font-semibold text-slate-700">Expected Output:</span> {action.output}
                                  </div>
                                </div>
                              </div>

                              {/* Status Action Buttons */}
                              <div className="flex items-center gap-2 shrink-0 self-end sm:self-start">
                                <button
                                  type="button"
                                  onClick={() => updateActionStatus(
                                    action.id,
                                    action.status === 'completed' ? 'not_started' : 'completed'
                                  )}
                                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                                    action.status === 'completed'
                                      ? 'bg-emerald-600 text-white border-emerald-700 hover:bg-emerald-700'
                                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                                  }`}
                                >
                                  {action.status === 'completed' ? (
                                    <>
                                      <CheckCircle2 className="w-3.5 h-3.5" />
                                      <span>Done</span>
                                    </>
                                  ) : (
                                    <>
                                      <Circle className="w-3.5 h-3.5 text-slate-400" />
                                      <span>Mark Complete</span>
                                    </>
                                  )}
                                </button>

                                {action.status !== 'completed' && (
                                  <button
                                    type="button"
                                    onClick={() => updateActionStatus(
                                      action.id,
                                      action.status === 'in_progress' ? 'not_started' : 'in_progress'
                                    )}
                                    className={`p-1.5 rounded-lg border text-xs ${
                                      action.status === 'in_progress'
                                        ? 'bg-amber-100 border-amber-300 text-amber-900 font-semibold'
                                        : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
                                    }`}
                                    title={action.status === 'in_progress' ? 'Pause Action' : 'Set In Progress'}
                                  >
                                    <Clock className="w-3.5 h-3.5" />
                                  </button>
                                )}

                                {action.isCustom && (
                                  <button
                                    type="button"
                                    onClick={() => deleteAction(action.id)}
                                    className="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                                    title="Delete custom action"
                                  >
                                    <X className="w-3.5 h-3.5" />
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal: Educational Resource ("Learn This") */}
      <AnimatePresence>
        {selectedSkillResource && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200 space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-indigo-600" />
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">
                      {selectedSkillResource.name}
                    </h3>
                    <span className="text-xs text-slate-500">
                      {selectedSkillResource.category} Skill Exploration
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedSkillResource(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="font-semibold text-slate-900 block mb-1">
                    What it is:
                  </span>
                  <p className="text-slate-600 leading-relaxed">
                    {selectedSkillResource.explanation}
                  </p>
                </div>

                <div className="p-3 bg-indigo-50/70 border border-indigo-100 rounded-xl">
                  <span className="font-semibold text-indigo-950 block mb-1">
                    Why it matters for this opportunity:
                  </span>
                  <p className="text-indigo-900 leading-relaxed">
                    {selectedSkillResource.whyItMatters}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="font-semibold text-slate-800 block mb-1">
                      Suggested Practice Exercise:
                    </span>
                    <p className="text-slate-600">
                      {selectedSkillResource.suggestedPractice}
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="font-semibold text-slate-800 block mb-1">
                      Suggested Micro-Project:
                    </span>
                    <p className="text-slate-600">
                      {selectedSkillResource.suggestedProject}
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <span className="font-semibold text-slate-800 block mb-1">
                    Core Learning Topic:
                  </span>
                  <p className="text-slate-600">
                    {selectedSkillResource.suggestedLearningTopic}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedSkillResource(null)}
                  className="px-4 py-2 text-xs font-semibold rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
                >
                  Close Exploration
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal: Add Custom Action Item */}
      <AnimatePresence>
        {showAddActionModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200 space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-bold text-slate-900 text-base">
                  Add Action Item to Stage
                </h3>
                <button
                  type="button"
                  onClick={() => setShowAddActionModal(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleCreateCustomAction} className="space-y-3 text-xs">
                <div>
                  <label className="font-semibold text-slate-800 block mb-1">
                    Target Stage
                  </label>
                  <select
                    value={targetStageForNewAction}
                    onChange={(e) => setTargetStageForNewAction(e.target.value as RoadmapStageId)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  >
                    {ROADMAP_STAGES.map(s => (
                      <option key={s.id} value={s.id}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-800 block mb-1">
                    Action Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Conduct 15-minute client intake interview"
                    value={newActionTitle}
                    onChange={(e) => setNewActionTitle(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-800 block mb-1">
                    Specific Action Description *
                  </label>
                  <textarea
                    rows={2}
                    required
                    placeholder="Describe exactly what you will do..."
                    value={newActionDesc}
                    onChange={(e) => setNewActionDesc(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-slate-800 block mb-1">
                      Purpose
                    </label>
                    <input
                      type="text"
                      placeholder="Why is this necessary?"
                      value={newActionPurpose}
                      onChange={(e) => setNewActionPurpose(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-800 block mb-1">
                      Deliverable Output
                    </label>
                    <input
                      type="text"
                      placeholder="What is the tangible result?"
                      value={newActionOutput}
                      onChange={(e) => setNewActionOutput(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddActionModal(false)}
                    className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-semibold rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
                  >
                    Add Action
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal: Summary & Export View */}
      <AnimatePresence>
        {showSummaryModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">
                    Roadmap Summary & Export
                  </h3>
                  <p className="text-xs text-slate-500">
                    Printable synthesis for mentorship reviews or portfolio dossiers
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowSummaryModal(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Printable Content Block */}
              <div id="printable-roadmap-summary" className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-4 text-xs">
                <div className="border-b border-slate-200 pb-3">
                  <div className="text-indigo-700 font-bold text-sm tracking-tight">
                    KAUSHAL SETU • ACTION ROADMAP
                  </div>
                  <div className="text-base font-bold text-slate-900 mt-1">
                    {targetOpportunity?.title}
                  </div>
                  <div className="text-slate-500 mt-0.5">
                    Pathway: {pathwayType.toUpperCase()} • Goal: {practicalGoal.replace(/_/g, ' ').toUpperCase()}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="font-bold text-slate-800 block mb-1">
                      Current Verified Skills:
                    </span>
                    <div className="text-slate-600 space-y-0.5">
                      {userSkills.map(s => (
                        <div key={s.skillId}>• {s.skillId} ({s.proficiency})</div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="font-bold text-slate-800 block mb-1">
                      Key Skill Gaps to Develop:
                    </span>
                    <div className="text-slate-600 space-y-0.5">
                      {skillGaps.filter(g => g.status === 'needed').map(g => (
                        <div key={g.skillId}>• {g.skillName}</div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-200 pt-3">
                  <span className="font-bold text-slate-800 block mb-2">
                    Action Plan Progress ({progressMetrics.completedActions}/{progressMetrics.totalActions} Actions Completed):
                  </span>
                  <div className="space-y-1.5">
                    {actions.map(a => (
                      <div key={a.id} className="flex items-center justify-between text-slate-700">
                        <span>{a.status === 'completed' ? '✓' : '○'} {a.title}</span>
                        <span className="text-[10px] uppercase font-semibold text-slate-500">
                          {a.status.replace('_', ' ')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-slate-200 pt-3">
                  <span className="font-bold text-slate-800 block mb-1">
                    G-ONE Guidance:
                  </span>
                  <p className="text-slate-600">
                    {gOneRoadmapAdvice.summary}
                  </p>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleCopySummary}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  {copiedSummary ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedSummary ? 'Copied to Clipboard!' : 'Copy Summary'}</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrintSummary}
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition-colors"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print Summary</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowSummaryModal(false)}
                    className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200"
                  >
                    Done
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
