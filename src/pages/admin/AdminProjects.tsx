/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * KAUSHAL SETU — PHASE 6 PROJECT TEMPLATE LIBRARY
 * Curated student projects categorized by combination tier (Foundation, Multi-domain, Micro-venture)
 * with tangible deliverables, skills practiced, and opportunity connections.
 */

import React, { useState } from 'react';
import { useKnowledgeBase } from '../../context/KnowledgeBaseContext';
import { useAdmin } from '../../context/AdminContext';
import { ProjectTemplate, CombinationTier } from '../../data/knowledgeBaseTypes';
import { 
  FolderKanban, 
  Search, 
  PlusCircle, 
  Edit3, 
  Eye, 
  X, 
  CheckCircle2, 
  Clock, 
  Layers, 
  Cpu, 
  Save, 
  Tag 
} from 'lucide-react';
import { cn } from '../../lib/utils';

export function AdminProjects() {
  const { projects, addProjectTemplate, updateProjectTemplate } = useKnowledgeBase();
  const { logAdminAction } = useAdmin();

  const [searchQuery, setSearchQuery] = useState('');
  const [tierFilter, setTierFilter] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState<ProjectTemplate | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  // Form states
  const [formId, setFormId] = useState('');
  const [formName, setFormName] = useState('');
  const [formTier, setFormTier] = useState<CombinationTier>('Tier 2');
  const [formDiff, setFormDiff] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Intermediate');
  const [formProb, setFormProb] = useState('');
  const [formSol, setFormSol] = useState('');
  const [formSkills, setFormSkills] = useState('');
  const [formDeliverables, setFormDeliverables] = useState('');
  const [formDuration, setFormDuration] = useState('2-3 weeks');

  const tiers: CombinationTier[] = ['Tier 1', 'Tier 2', 'Tier 3', 'Tier 4'];
  const difficulties: ('Beginner' | 'Intermediate' | 'Advanced')[] = ['Beginner', 'Intermediate', 'Advanced'];

  const filtered = projects.filter(p => {
    const matchesSearch = 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.problemSolved.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.solutionSummary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTier = tierFilter === 'all' || p.tier === tierFilter;
    const matchesDiff = difficultyFilter === 'all' || p.difficulty === difficultyFilter;
    return matchesSearch && matchesTier && matchesDiff;
  });

  const handleOpenAdd = () => {
    setFormId(`proj-${Date.now()}`);
    setFormName('');
    setFormTier('Tier 2');
    setFormDiff('Intermediate');
    setFormProb('');
    setFormSol('');
    setFormSkills('');
    setFormDeliverables('Working prototype sample, Documentation report, Demo video');
    setFormDuration('2-3 weeks');
    setIsAdding(true);
    setIsEditing(false);
  };

  const handleOpenEdit = (proj: ProjectTemplate) => {
    setFormId(proj.id);
    setFormName(proj.name);
    setFormTier(proj.tier);
    setFormDiff(proj.difficulty);
    setFormProb(proj.problemSolved);
    setFormSol(proj.solutionSummary);
    setFormSkills(proj.targetSkillIds.join(', '));
    setFormDeliverables(proj.deliverables.join(', '));
    setFormDuration(proj.suggestedDuration || '2 weeks');
    setIsEditing(true);
    setIsAdding(false);
    setSelectedProject(proj);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    const payload: ProjectTemplate = {
      id: formId,
      name: formName.trim(),
      tier: formTier,
      difficulty: formDiff,
      problemSolved: formProb.trim(),
      solutionSummary: formSol.trim(),
      targetSkillIds: formSkills.split(',').map(s => s.trim()).filter(Boolean),
      skillsPractised: formSkills.split(',').map(s => s.trim()).filter(Boolean),
      deliverables: formDeliverables.split(',').map(s => s.trim()).filter(Boolean),
      suggestedDuration: formDuration.trim()
    };

    if (isAdding) {
      addProjectTemplate(payload);
      logAdminAction('Added Project Template', 'Opportunity', payload.id, payload.name);
    } else {
      updateProjectTemplate(payload);
      logAdminAction('Updated Project Template', 'Opportunity', payload.id, payload.name);
    }

    setIsAdding(false);
    setIsEditing(false);
    setSelectedProject(payload);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <FolderKanban className="w-5 h-5 text-indigo-400" />
            <h1 className="text-xl font-black tracking-tight text-white">PROJECT TEMPLATE LIBRARY</h1>
            <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              {filtered.length} Structured Projects
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Hands-on project blueprints aligned with vocational competencies and real-world student portfolios.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          Add Project Template
        </button>
      </div>

      {/* Filters & Search */}
      <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects by name, problem, solution..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={tierFilter}
            onChange={(e) => setTierFilter(e.target.value)}
            className="px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300"
          >
            <option value="all">All Tiers</option>
            {tiers.map(t => <option key={t} value={t}>{t}</option>)}
          </select>

          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            className="px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300"
          >
            <option value="all">All Difficulties</option>
            {difficulties.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(proj => (
          <div 
            key={proj.id}
            className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-3"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <span className={cn(
                  "text-[10px] font-mono font-bold px-2 py-0.5 rounded border",
                  proj.tier.includes('Tier 3') ? "bg-amber-500/20 text-amber-300 border-amber-500/30" :
                  proj.tier.includes('Tier 2') ? "bg-indigo-500/20 text-indigo-300 border-indigo-500/30" :
                  "bg-blue-500/20 text-blue-300 border-blue-500/30"
                )}>
                  {proj.tier.split(':')[0]}
                </span>
                <div className="flex items-center gap-1">
                  <span className={cn(
                    "text-[10px] font-mono px-2 py-0.5 rounded",
                    proj.difficulty === 'Advanced' ? "bg-rose-500/20 text-rose-300" :
                    proj.difficulty === 'Intermediate' ? "bg-amber-500/20 text-amber-300" :
                    "bg-emerald-500/20 text-emerald-300"
                  )}>
                    {proj.difficulty}
                  </span>
                  <button onClick={() => setSelectedProject(proj)} className="p-1 rounded-lg text-slate-400 hover:text-white">
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => handleOpenEdit(proj)} className="p-1 rounded-lg text-slate-400 hover:text-indigo-400">
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white">{proj.name}</h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">{proj.solutionSummary}</p>
              </div>

              {/* Problem Solved */}
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800/80 text-xs">
                <span className="text-[10px] font-mono text-slate-500 block uppercase">Problem Addressed:</span>
                <p className="text-slate-300 line-clamp-2 text-[11px] mt-0.5">{proj.problemSolved}</p>
              </div>

              {/* Deliverables snippet */}
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-slate-500 block uppercase">Deliverables ({(proj.deliverables || []).length}):</span>
                <div className="flex flex-wrap gap-1">
                  {(proj.deliverables || []).slice(0, 2).map((del, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">
                      {del}
                    </span>
                  ))}
                  {(proj.deliverables || []).length > 2 && (
                    <span className="text-[10px] text-slate-500 font-mono self-center">
                      +{(proj.deliverables || []).length - 2} more
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-900 text-[11px] text-slate-500 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-400" />
                {proj.suggestedDuration || '2 weeks'}
              </span>
              <span className="text-indigo-400 font-medium">{(proj.targetSkillIds || []).length} Skills</span>
            </div>
          </div>
        ))}
      </div>

      {/* Inspector Modal */}
      {selectedProject && !isEditing && !isAdding && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-5 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-mono uppercase text-indigo-400 font-bold">{selectedProject.tier}</span>
                <h2 className="text-base font-bold text-white">{selectedProject.name}</h2>
              </div>
              <button onClick={() => setSelectedProject(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] uppercase font-mono text-slate-500 font-bold">Solution Overview</span>
                <p className="text-slate-200">{selectedProject.solutionSummary}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] uppercase font-mono text-slate-500 font-bold">Problem Addressed</span>
                <p className="text-slate-200">{selectedProject.problemSolved}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-[10px] uppercase font-mono text-slate-500 font-bold">Tangible Deliverables</span>
                <ul className="list-disc list-inside space-y-1 text-slate-200">
                  {(selectedProject.deliverables || []).map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                  {(!selectedProject.deliverables || selectedProject.deliverables.length === 0) && (
                    <li className="text-slate-500 italic list-none">No deliverables mapped.</li>
                  )}
                </ul>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Modal */}
      {(isAdding || isEditing) && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-5 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <FolderKanban className="w-4 h-4 text-indigo-400" />
                {isAdding ? 'Add Project Template' : `Edit: ${formName}`}
              </h2>
              <button onClick={() => { setIsAdding(false); setIsEditing(false); }} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Project Name:</label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g., Solar Mobile Charging Kiosk for Local Market"
                  className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs"
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Tier:</label>
                  <select
                    value={formTier}
                    onChange={(e: any) => setFormTier(e.target.value)}
                    className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs"
                  >
                    {tiers.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Difficulty:</label>
                  <select
                    value={formDiff}
                    onChange={(e: any) => setFormDiff(e.target.value)}
                    className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs"
                  >
                    {difficulties.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Duration:</label>
                  <input
                    type="text"
                    value={formDuration}
                    onChange={(e) => setFormDuration(e.target.value)}
                    placeholder="2-3 weeks"
                    className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Problem Addressed:</label>
                <textarea
                  rows={2}
                  value={formProb}
                  onChange={(e) => setFormProb(e.target.value)}
                  className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Solution Summary:</label>
                <textarea
                  rows={2}
                  value={formSol}
                  onChange={(e) => setFormSol(e.target.value)}
                  className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Deliverables (comma separated):</label>
                <input
                  type="text"
                  value={formDeliverables}
                  onChange={(e) => setFormDeliverables(e.target.value)}
                  placeholder="Prototype sample, Documentation, Test report"
                  className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Target Skill IDs (comma separated):</label>
                <input
                  type="text"
                  value={formSkills}
                  onChange={(e) => setFormSkills(e.target.value)}
                  placeholder="solar_tech, electrical_wiring"
                  className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => { setIsAdding(false); setIsEditing(false); }}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
