import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Briefcase, 
  FolderKanban, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Plus, 
  Calendar, 
  Tag, 
  Award, 
  MessageSquare, 
  Check, 
  ChevronRight, 
  ArrowRight,
  X, 
  Layers, 
  BookOpen, 
  ExternalLink,
  Target,
  Trash2,
  Edit3,
  HelpCircle
} from 'lucide-react';
import { useProfile } from '../context/ProfileContext';
import { useRoadmap } from '../context/RoadmapContext';
import { OPPORTUNITIES } from '../data/opportunities';
import { 
  StudentProject, 
  StudentExperience, 
  StudentReflection 
} from '../data/roadmap';
import { Link } from 'react-router-dom';

export const MyProjects: React.FC = () => {
  const { userSkills, allSkills } = useProfile();
  const { 
    projects, 
    addProject, 
    updateProject, 
    deleteProject, 
    saveProjectReflection,
    toggleDeliverable,
    experiences,
    addExperience,
    deleteExperience,
    targetOpportunity,
    progressMetrics,
    loadDemoRoadmap
  } = useRoadmap();

  // Active sub-tab: 'projects' | 'portfolio' | 'experiences'
  const [activeTab, setActiveTab] = useState<'projects' | 'portfolio' | 'experiences'>('projects');

  // Modals
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [showNewExperienceModal, setShowNewExperienceModal] = useState(false);
  const [reflectionProjectId, setReflectionProjectId] = useState<string | null>(null);
  const [viewProjectModal, setViewProjectModal] = useState<StudentProject | null>(null);

  // New Project Form State
  const [projName, setProjName] = useState('');
  const [projTargetId, setProjTargetId] = useState(targetOpportunity?.id || 'product_photography_service');
  const [projProblem, setProjProblem] = useState('');
  const [projCreated, setProjCreated] = useState('');
  const [projSkills, setProjSkills] = useState<string[]>(['photography', 'photo_editing']);
  const [projDeliverablesText, setProjDeliverablesText] = useState(
    '5 High-Resolution Product Photos\n3 Instagram Promo Graphics\n1-Page Usage Guide'
  );

  // New Experience Form State
  const [expType, setExpType] = useState<StudentExperience['type']>('School Project');
  const [expTitle, setExpTitle] = useState('');
  const [expDesc, setExpDesc] = useState('');
  const [expSkills, setExpSkills] = useState<string[]>(['photography', 'communication']);
  const [expOutcome, setExpOutcome] = useState('');

  // Reflection Form State
  const [reflLearn, setReflLearn] = useState('');
  const [reflDifficult, setReflDifficult] = useState('');
  const [reflImprove, setReflImprove] = useState('');
  const [reflSkillUsed, setReflSkillUsed] = useState('');
  const [reflNext, setReflNext] = useState('');

  const handleOpenReflection = (project: StudentProject) => {
    setReflectionProjectId(project.id);
    if (project.reflection) {
      setReflLearn(project.reflection.whatDidYouLearn);
      setReflDifficult(project.reflection.whatWasDifficult);
      setReflImprove(project.reflection.whatWouldYouImprove);
      setReflSkillUsed(project.reflection.skillUsedMost);
      setReflNext(project.reflection.whatToLearnNext);
    } else {
      setReflLearn('');
      setReflDifficult('');
      setReflImprove('');
      setReflSkillUsed(project.skillsUsed[0] || 'Photography');
      setReflNext('Client Handling & Pricing');
    }
  };

  const handleSaveReflection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reflectionProjectId) return;

    saveProjectReflection(reflectionProjectId, {
      whatDidYouLearn: reflLearn.trim(),
      whatWasDifficult: reflDifficult.trim(),
      whatWouldYouImprove: reflImprove.trim(),
      skillUsedMost: reflSkillUsed.trim(),
      whatToLearnNext: reflNext.trim(),
      submittedAt: new Date().toISOString().split('T')[0]
    });

    setReflectionProjectId(null);
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projName.trim()) return;

    const opp = OPPORTUNITIES.find(o => o.id === projTargetId);
    const deliverables = projDeliverablesText
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean)
      .map((title, idx) => ({
        id: `del-${Date.now()}-${idx}`,
        title,
        completed: false
      }));

    addProject({
      name: projName.trim(),
      targetOpportunityId: projTargetId,
      targetOpportunityTitle: opp ? opp.title : 'Practical Application',
      skillsUsed: projSkills,
      problemSolved: projProblem.trim() || 'Assisting neighborhood micro-entrepreneurs with quality deliverables.',
      whatICreated: projCreated.trim() || 'Custom work deliverables package.',
      deliverables,
      date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      status: 'in_progress'
    });

    setProjName('');
    setProjProblem('');
    setProjCreated('');
    setShowNewProjectModal(false);
  };

  const handleCreateExperience = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expTitle.trim() || !expDesc.trim()) return;

    addExperience({
      type: expType,
      title: expTitle.trim(),
      description: expDesc.trim(),
      skillsUsed: expSkills,
      date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      outcome: expOutcome.trim() || 'Practical skill application completed.'
    });

    setExpTitle('');
    setExpDesc('');
    setExpOutcome('');
    setShowNewExperienceModal(false);
  };

  return (
    <div className="space-y-8 pb-16 max-w-7xl mx-auto animate-in fade-in duration-300">
      {/* Top Banner & Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
              Practical Evidence & Portfolio
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Project Portfolio</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight font-heading">
            My Projects & Portfolio
          </h1>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
            Document real deliverables, record practical learning experiences, and reflect on your problem-solving journey.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            id="btn-expo-demo-projects"
            onClick={loadDemoRoadmap}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs md:text-sm font-medium rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-800 hover:bg-amber-100 dark:hover:bg-amber-900/50 transition-colors shadow-sm cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>Load Demo Projects</span>
          </button>

          {activeTab === 'experiences' ? (
            <button
              id="btn-new-experience"
              onClick={() => setShowNewExperienceModal(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs md:text-sm font-semibold rounded-xl bg-indigo-600 dark:bg-blue-600 text-white hover:bg-indigo-700 dark:hover:bg-blue-700 transition-colors shadow-sm cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Log Experience</span>
            </button>
          ) : (
            <button
              id="btn-new-project"
              onClick={() => setShowNewProjectModal(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs md:text-sm font-semibold rounded-xl bg-indigo-600 dark:bg-blue-600 text-white hover:bg-indigo-700 dark:hover:bg-blue-700 transition-colors shadow-sm cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>New Project</span>
            </button>
          )}
        </div>
      </div>

      {/* Progress & Verification Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-xs text-slate-500 font-medium block">Target Skills Covered</span>
            <span className="text-lg font-bold text-slate-900">
              {progressMetrics.targetSkillsCovered} / {progressMetrics.totalTargetSkills}
            </span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-xs text-slate-500 font-medium block">Active Projects</span>
            <span className="text-lg font-bold text-slate-900">
              {progressMetrics.totalProjects}
            </span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-xs text-slate-500 font-medium block">Completed Projects</span>
            <span className="text-lg font-bold text-emerald-700">
              {progressMetrics.completedProjects}
            </span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-xs text-slate-500 font-medium block">Roadmap Milestone Actions</span>
            <span className="text-lg font-bold text-indigo-700">
              {progressMetrics.completedActions} / {progressMetrics.totalActions} ({progressMetrics.percentComplete}%)
            </span>
          </div>
        </div>
        <p className="text-[11px] text-slate-400 mt-2.5 italic">
          *Metrics represent student learning activity within Kaushal Setu, not an automated career guarantee.
        </p>
      </div>

      {/* Sub-Tab Navigation Bar */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          type="button"
          onClick={() => setActiveTab('projects')}
          className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all ${
            activeTab === 'projects'
              ? 'bg-indigo-50 text-indigo-800 border border-indigo-200'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          Active Projects ({projects.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('portfolio')}
          className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all ${
            activeTab === 'portfolio'
              ? 'bg-indigo-50 text-indigo-800 border border-indigo-200'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          Public Portfolio Showcase ({projects.filter(p => p.status === 'completed').length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('experiences')}
          className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all ${
            activeTab === 'experiences'
              ? 'bg-indigo-50 text-indigo-800 border border-indigo-200'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          Experience Tracker ({experiences.length})
        </button>
      </div>

      {/* View 1: Active Projects */}
      {activeTab === 'projects' && (
        <div className="space-y-4">
          {projects.length === 0 ? (
            <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center space-y-3">
              <FolderKanban className="w-10 h-10 text-slate-400 mx-auto" />
              <h3 className="text-base font-bold text-slate-800">No Projects Created Yet</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Turn your action roadmap into a tangible deliverable project or log a new practical trial.
              </p>
              <button
                type="button"
                onClick={() => setShowNewProjectModal(true)}
                className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 inline-block"
              >
                + Create Your First Project
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map(proj => {
                const completedDeliverables = proj.deliverables.filter(d => d.completed).length;
                const isComplete = proj.status === 'completed';

                return (
                  <div
                    key={proj.id}
                    className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs flex flex-col justify-between space-y-4 hover:border-slate-300 transition-all"
                  >
                    <div className="space-y-4">
                      {/* Top Row: Status + Date + Delete */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-md uppercase tracking-wider ${
                            isComplete ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-blue-50 text-blue-800 border border-blue-200'
                          }`}>
                            {proj.status.replace('_', ' ')}
                          </span>
                          <span className="text-xs text-slate-400 font-mono">
                            {proj.date}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => deleteProject(proj.id)}
                          className="text-slate-400 hover:text-rose-600 p-1 rounded hover:bg-slate-100 transition-colors"
                          title="Delete project"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* 1. PROJECT TITLE */}
                      <div>
                        <h3 className="text-lg font-bold text-navy-950 font-space tracking-tight">
                          {proj.name}
                        </h3>
                        <span className="text-xs text-slate-500 font-medium block mt-0.5">
                          Opportunity: {proj.targetOpportunityTitle}
                        </span>
                      </div>

                      {/* 2. VALUE CREATED */}
                      <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 text-xs space-y-1">
                        <span className="text-[10px] font-mono uppercase font-bold text-blue-700 tracking-wider block">
                          VALUE CREATED
                        </span>
                        <p className="text-slate-800 leading-relaxed font-medium">
                          {proj.whatICreated || proj.problemSolved}
                        </p>
                      </div>

                      {/* 3. SKILLS USED */}
                      <div>
                        <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider block mb-1.5">
                          SKILLS USED
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {proj.skillsUsed.map(sid => {
                            const skill = allSkills.find(s => s.id === sid);
                            return (
                              <span
                                key={sid}
                                className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-slate-100 text-navy-950 border border-slate-200/80"
                              >
                                {skill ? skill.name : sid}
                              </span>
                            );
                          })}
                        </div>
                      </div>

                      {/* Deliverables Checklist Progress */}
                      <div className="pt-2 border-t border-slate-100">
                        <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-2">
                          <span className="text-[11px] font-mono text-slate-500 uppercase">Deliverables</span>
                          <span className="text-xs font-mono font-bold text-navy-950">
                            {completedDeliverables}/{proj.deliverables.length} Completed
                          </span>
                        </div>
                        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                          <div 
                            className="bg-navy-950 h-full rounded-full transition-all duration-300"
                            style={{ width: `${proj.deliverables.length > 0 ? (completedDeliverables / proj.deliverables.length) * 100 : 0}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action Row: View Project -> and Reflection indicator */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                      <div className="text-xs">
                        {proj.reflection ? (
                          <span className="text-emerald-700 font-semibold text-[11px] flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Reflection Done
                          </span>
                        ) : (
                          <span className="text-slate-400 text-[11px]">
                            No reflection yet
                          </span>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => setViewProjectModal(proj)}
                        className="px-4 py-2 rounded-xl bg-navy-950 hover:bg-navy-900 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors"
                      >
                        <span>View Project</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* View 2: Portfolio Showcase */}
      {activeTab === 'portfolio' && (
        <div className="space-y-6">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
            <div>
              <span className="font-bold text-slate-800">Public Portfolio Format:</span> Showcase completed projects to mentors, teachers, or potential clients as tangible evidence of skill.
            </div>
            <Link
              to="/roadmap"
              className="text-indigo-600 font-semibold hover:underline inline-flex items-center gap-1"
            >
              <span>Back to Roadmap</span>
              <ChevronRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.filter(p => p.status === 'completed').length === 0 ? (
              <div className="col-span-2 py-12 text-center text-xs text-slate-400">
                No completed projects in portfolio yet. Mark deliverables complete in an active project to showcase it here!
              </div>
            ) : (
              projects.filter(p => p.status === 'completed').map(proj => (
                <div
                  key={proj.id}
                  className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider">
                      {proj.targetOpportunityTitle}
                    </span>
                    <span className="text-xs text-slate-400">
                      {proj.date}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900">
                    {proj.name}
                  </h3>

                  <div className="space-y-2 text-xs">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="font-bold text-slate-800 block mb-1">Problem Solved:</span>
                      <p className="text-slate-600">{proj.problemSolved}</p>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="font-bold text-slate-800 block mb-1">Tangible Output Created:</span>
                      <p className="text-slate-600">{proj.whatICreated}</p>
                    </div>
                  </div>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {proj.skillsUsed.map(sid => {
                      const skill = allSkills.find(s => s.id === sid);
                      return (
                        <span
                          key={sid}
                          className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-100"
                        >
                          ✓ {skill ? skill.name : sid}
                        </span>
                      );
                    })}
                  </div>

                  {/* Reflection Box */}
                  {proj.reflection && (
                    <div className="p-3.5 bg-indigo-50/60 rounded-xl border border-indigo-100 text-xs space-y-2">
                      <span className="font-bold text-indigo-950 block">
                        Student Reflection & Growth:
                      </span>
                      <div className="text-slate-700 space-y-1">
                        <p><strong>Learned:</strong> {proj.reflection.whatDidYouLearn}</p>
                        <p><strong>Difficult Point:</strong> {proj.reflection.whatWasDifficult}</p>
                        <p><strong>Future Improvement:</strong> {proj.reflection.whatWouldYouImprove}</p>
                        <p><strong>Next Skill to Acquire:</strong> {proj.reflection.whatToLearnNext}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* View 3: Experience Tracker */}
      {activeTab === 'experiences' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">
                Practical Experience Log
              </h3>
              <p className="text-xs text-slate-500">
                Log diverse practical initiatives (competitions, school expos, volunteering, micro-ventures)
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowNewExperienceModal(true)}
              className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-indigo-600 text-white hover:bg-indigo-700"
            >
              + Add Experience
            </button>
          </div>

          <div className="space-y-3">
            {experiences.length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-400">
                No experiences logged yet. Add your school or community activities to demonstrate continuous skill growth.
              </div>
            ) : (
              experiences.map(exp => (
                <div
                  key={exp.id}
                  className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-col sm:flex-row sm:items-start justify-between gap-3 text-xs"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                        {exp.type}
                      </span>
                      <span className="text-slate-400 font-medium">
                        {exp.date}
                      </span>
                    </div>

                    <h4 className="font-bold text-slate-900 text-sm">
                      {exp.title}
                    </h4>

                    <p className="text-slate-600">
                      {exp.description}
                    </p>

                    <p className="text-slate-700">
                      <strong>Outcome / Proof:</strong> {exp.outcome}
                    </p>

                    <div className="flex flex-wrap gap-1 pt-1">
                      {exp.skillsUsed.map(s => (
                        <span key={s} className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px]">
                          #{s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => deleteExperience(exp.id)}
                    className="text-slate-400 hover:text-rose-600 p-1 rounded hover:bg-slate-50 transition-colors self-end sm:self-start"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Modal: New Project */}
      <AnimatePresence>
        {showNewProjectModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-bold text-slate-900 text-base">
                  Create Practical Project
                </h3>
                <button
                  type="button"
                  onClick={() => setShowNewProjectModal(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleCreateProject} className="space-y-3 text-xs">
                <div>
                  <label className="font-semibold text-slate-800 block mb-1">
                    Project Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Local Cafe Visual Menu Refresh"
                    value={projName}
                    onChange={(e) => setProjName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-800 block mb-1">
                    Target Opportunity
                  </label>
                  <select
                    value={projTargetId}
                    onChange={(e) => setProjTargetId(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  >
                    {OPPORTUNITIES.map(o => (
                      <option key={o.id} value={o.id}>
                        {o.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-800 block mb-1">
                    Problem Solved
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Blurry mobile photos reducing bakery customer trust"
                    value={projProblem}
                    onChange={(e) => setProjProblem(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-800 block mb-1">
                    What Deliverable Will You Create?
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 5 retouched product hero shots and 3 Instagram promo tiles"
                    value={projCreated}
                    onChange={(e) => setProjCreated(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-800 block mb-1">
                    Deliverables Checklist (1 per line)
                  </label>
                  <textarea
                    rows={3}
                    value={projDeliverablesText}
                    onChange={(e) => setProjDeliverablesText(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowNewProjectModal(false)}
                    className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-semibold rounded-xl bg-indigo-600 text-white hover:bg-indigo-700"
                  >
                    Save Project
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal: Structured Reflection */}
      <AnimatePresence>
        {reflectionProjectId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">
                    Structured Project Reflection
                  </h3>
                  <p className="text-xs text-slate-500">
                    Synthesize what you learned to feed insights back to G-ONE
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setReflectionProjectId(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveReflection} className="space-y-3 text-xs">
                <div>
                  <label className="font-semibold text-slate-800 block mb-1">
                    1. What did you learn? *
                  </label>
                  <textarea
                    rows={2}
                    required
                    placeholder="e.g. Using directional morning light diffused with a sheer curtain softens highlights..."
                    value={reflLearn}
                    onChange={(e) => setReflLearn(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-800 block mb-1">
                    2. What was difficult? *
                  </label>
                  <textarea
                    rows={2}
                    required
                    placeholder="e.g. Directing the client on which pastries to bake fresh and managing reflection on glossy labels..."
                    value={reflDifficult}
                    onChange={(e) => setReflDifficult(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-800 block mb-1">
                    3. What would you improve next time?
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Bring a portable neutral backdrop board to save 30 minutes of setup..."
                    value={reflImprove}
                    onChange={(e) => setReflImprove(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-slate-800 block mb-1">
                      4. Which skill did you use most?
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Photography & Composition"
                      value={reflSkillUsed}
                      onChange={(e) => setReflSkillUsed(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-800 block mb-1">
                      5. What should you learn next?
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Client Briefing & Scope Demarcation"
                      value={reflNext}
                      onChange={(e) => setReflNext(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setReflectionProjectId(null)}
                    className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-semibold rounded-xl bg-indigo-600 text-white hover:bg-indigo-700"
                  >
                    Save Reflection
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal: New Experience */}
      <AnimatePresence>
        {showNewExperienceModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200 space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-bold text-slate-900 text-base">
                  Log Practical Experience
                </h3>
                <button
                  type="button"
                  onClick={() => setShowNewExperienceModal(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleCreateExperience} className="space-y-3 text-xs">
                <div>
                  <label className="font-semibold text-slate-800 block mb-1">
                    Experience Type
                  </label>
                  <select
                    value={expType}
                    onChange={(e) => setExpType(e.target.value as StudentExperience['type'])}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  >
                    <option value="School Project">School Project</option>
                    <option value="Personal Project">Personal Project</option>
                    <option value="Community Project">Community Project</option>
                    <option value="Competition">Competition</option>
                    <option value="Volunteering">Volunteering</option>
                    <option value="Entrepreneurship Experiment">Entrepreneurship Experiment</option>
                    <option value="Skill Demonstration">Skill Demonstration</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-800 block mb-1">
                    Activity Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. CBSE Science Fair Photography Lead"
                    value={expTitle}
                    onChange={(e) => setExpTitle(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-800 block mb-1">
                    Description *
                  </label>
                  <textarea
                    rows={2}
                    required
                    placeholder="What did you do and who did you collaborate with?"
                    value={expDesc}
                    onChange={(e) => setExpDesc(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-800 block mb-1">
                    Outcome or Evidence
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 24 photo series published in school newsletter"
                    value={expOutcome}
                    onChange={(e) => setExpOutcome(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowNewExperienceModal(false)}
                    className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-semibold rounded-xl bg-indigo-600 text-white hover:bg-indigo-700"
                  >
                    Log Experience
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {/* View Project Dossier Modal */}
        {viewProjectModal && (
          <div className="fixed inset-0 z-50 bg-navy-950/60 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl border border-slate-200 max-w-xl w-full p-6 space-y-5 shadow-xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${
                      viewProjectModal.status === 'completed'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-blue-50 text-blue-800 border border-blue-200'
                    }`}>
                      {viewProjectModal.status.replace('_', ' ')}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      {viewProjectModal.date}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-navy-950 font-space">
                    {viewProjectModal.name}
                  </h3>
                  <span className="text-xs text-slate-500 font-medium">
                    Opportunity: {viewProjectModal.targetOpportunityTitle}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setViewProjectModal(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Value Created Section */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/90 text-xs space-y-1.5">
                <span className="text-[10px] font-mono uppercase font-bold text-blue-700 tracking-wider block">
                  VALUE CREATED & PROBLEM ADDRESSED
                </span>
                <p className="text-slate-900 font-medium">
                  {viewProjectModal.whatICreated}
                </p>
                <p className="text-slate-600 text-[11px] pt-1 border-t border-slate-200">
                  <span className="font-semibold text-slate-700">Problem Solved:</span> {viewProjectModal.problemSolved}
                </p>
              </div>

              {/* Skills Used */}
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider block mb-1.5">
                  SKILLS DEMONSTRATED
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {viewProjectModal.skillsUsed.map(sid => {
                    const skill = allSkills.find(s => s.id === sid);
                    return (
                      <span
                        key={sid}
                        className="text-xs font-medium px-2.5 py-1 rounded-lg bg-slate-100 text-navy-950 border border-slate-200/80"
                      >
                        {skill ? skill.name : sid}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Deliverables Checklist */}
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider block mb-1.5">
                  DELIVERABLES CHECKLIST
                </span>
                <div className="space-y-1.5">
                  {viewProjectModal.deliverables.map(d => (
                    <div
                      key={d.id}
                      className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-navy-950"
                    >
                      {d.completed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-slate-300 shrink-0" />
                      )}
                      <span className={d.completed ? 'line-through text-slate-400' : 'font-medium'}>
                        {d.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reflection */}
              {viewProjectModal.reflection && (
                <div className="p-4 bg-blue-50/40 rounded-xl border border-blue-100 text-xs space-y-1.5">
                  <span className="text-[10px] font-mono uppercase font-bold text-blue-900 tracking-wider block">
                    STUDENT REFLECTION & LEARNING
                  </span>
                  <p className="text-slate-800 leading-relaxed italic">
                    "{viewProjectModal.reflection.whatDidYouLearn}"
                  </p>
                </div>
              )}

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    const proj = viewProjectModal;
                    setViewProjectModal(null);
                    handleOpenReflection(proj);
                  }}
                  className="px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
                >
                  {viewProjectModal.reflection ? 'Edit Reflection' : 'Add Reflection'}
                </button>

                <button
                  type="button"
                  onClick={() => setViewProjectModal(null)}
                  className="px-4 py-2 text-xs font-semibold rounded-xl bg-navy-950 text-white hover:bg-navy-900 transition-colors"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
