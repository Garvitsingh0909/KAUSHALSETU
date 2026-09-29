/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * KAUSHAL SETU — PHASE 6 ROADMAP TEMPLATE MANAGEMENT
 * Curated 6-phase student action roadmaps:
 * (Foundation -> Practice -> Portfolio -> Communication -> Test -> Reflect)
 * with time horizons, actions, and tangible outputs.
 */

import React, { useState } from 'react';
import { useKnowledgeBase } from '../../context/KnowledgeBaseContext';
import { useAdmin } from '../../context/AdminContext';
import { RoadmapTemplate, RoadmapStepTemplate } from '../../data/knowledgeBaseTypes';
import { 
  Compass, 
  Search, 
  PlusCircle, 
  Edit3, 
  Eye, 
  X, 
  CheckCircle2, 
  Layers, 
  Clock, 
  Calendar, 
  Save, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { cn } from '../../lib/utils';

export function AdminRoadmaps() {
  const { roadmaps, addRoadmapTemplate, updateRoadmapTemplate } = useKnowledgeBase();
  const { logAdminAction } = useAdmin();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoadmap, setSelectedRoadmap] = useState<RoadmapTemplate | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  // Form states
  const [formId, setFormId] = useState('');
  const [formTitle, setFormTitle] = useState('');
  const [formPathway, setFormPathway] = useState<'freelance' | 'service' | 'product' | 'community' | 'tech_venture'>('freelance');
  const [formSkills, setFormSkills] = useState('');
  const [formSteps, setFormSteps] = useState<RoadmapStepTemplate[]>([]);

  const pathways: ('freelance' | 'service' | 'product' | 'community' | 'tech_venture')[] = [
    'freelance', 'service', 'product', 'community', 'tech_venture'
  ];

  const filtered = roadmaps.filter(r => 
    r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.pathwayType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const defaultPhases: RoadmapStepTemplate[] = [
    { phaseId: 'foundation', title: 'Core Skill Mastery', action: 'Complete 3 guided tutorials', purpose: 'Establish basics', expectedOutput: 'Working prototype sample', suggestedDurationDays: 7 },
    { phaseId: 'practice', title: 'Hands-on Practice', action: 'Build 2 mock deliverables', purpose: 'Build confidence', expectedOutput: 'Clean sample assets', suggestedDurationDays: 10 },
    { phaseId: 'portfolio', title: 'Portfolio Packaging', action: 'Create a 1-page PDF or showcase link', purpose: 'Demonstrate competency', expectedOutput: 'Shareable portfolio', suggestedDurationDays: 5 },
    { phaseId: 'communication', title: 'Client / User Outreach', action: 'Pitch to 3 local prospects', purpose: 'Initiate dialogue', expectedOutput: 'Initial client feedback', suggestedDurationDays: 7 },
    { phaseId: 'test', title: 'First Execution & Delivery', action: 'Execute first pilot project', purpose: 'Validation', expectedOutput: 'Completed project deliverable', suggestedDurationDays: 7 },
    { phaseId: 'reflect', title: 'Review & Monetize', action: 'Evaluate unit economics and pricing', purpose: 'Iterate model', expectedOutput: 'Refined service package', suggestedDurationDays: 4 }
  ];

  const handleOpenAdd = () => {
    setFormId(`roadmap-${Date.now()}`);
    setFormTitle('');
    setFormPathway('freelance');
    setFormSkills('');
    setFormSteps([...defaultPhases]);
    setIsAdding(true);
    setIsEditing(false);
  };

  const handleOpenEdit = (rm: RoadmapTemplate) => {
    setFormId(rm.id);
    setFormTitle(rm.title);
    setFormPathway(rm.pathwayType);
    setFormSkills(rm.targetSkillIds.join(', '));
    setFormSteps(rm.steps && rm.steps.length > 0 ? [...rm.steps] : [...defaultPhases]);
    setIsEditing(true);
    setIsAdding(false);
    setSelectedRoadmap(rm);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    const payload: RoadmapTemplate = {
      id: formId,
      title: formTitle.trim(),
      pathwayType: formPathway,
      targetSkillIds: formSkills.split(',').map(s => s.trim()).filter(Boolean),
      steps: formSteps,
      origin: 'Curated'
    };

    if (isAdding) {
      addRoadmapTemplate(payload);
      logAdminAction('Added Roadmap Template', 'Opportunity', payload.id, payload.title);
    } else {
      updateRoadmapTemplate(payload);
      logAdminAction('Updated Roadmap Template', 'Opportunity', payload.id, payload.title);
    }

    setIsAdding(false);
    setIsEditing(false);
    setSelectedRoadmap(payload);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-teal-400" />
            <h1 className="text-xl font-black tracking-tight text-white">ROADMAP TEMPLATES</h1>
            <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-teal-500/20 text-teal-300 border border-teal-500/30">
              {filtered.length} Structured Pathways
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Curated 6-phase pedagogical action pathways guiding secondary students from classroom learning to first income.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          Add Roadmap Template
        </button>
      </div>

      {/* Search */}
      <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search roadmaps by title or pathway..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(rm => {
          const totalDays = rm.steps?.reduce((acc, s) => acc + (s.suggestedDurationDays || 7), 0) || 40;

          return (
            <div 
              key={rm.id}
              className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-3"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30 uppercase">
                    {rm.pathwayType.replace('_', ' ')}
                  </span>
                  <div className="flex items-center gap-1">
                    <button onClick={() => setSelectedRoadmap(rm)} className="p-1 rounded-lg text-slate-400 hover:text-white">
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => handleOpenEdit(rm)} className="p-1 rounded-lg text-slate-400 hover:text-teal-400">
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-white">{rm.title}</h3>
                  <div className="flex items-center gap-3 text-xs text-slate-400 mt-2 font-mono">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-400" />
                      {totalDays} days total
                    </span>
                    <span>•</span>
                    <span>{rm.steps?.length || 6} milestones</span>
                  </div>
                </div>

                {/* Milestone preview pills */}
                <div className="space-y-1.5 pt-1">
                  {rm.steps?.slice(0, 3).map((st, i) => (
                    <div key={i} className="p-2 rounded-lg bg-slate-900 border border-slate-800/80 text-[11px] flex items-center justify-between">
                      <span className="text-slate-300 truncate font-medium">{st.title}</span>
                      <span className="text-teal-400 font-mono text-[10px] shrink-0">{st.suggestedDurationDays}d</span>
                    </div>
                  ))}
                  {rm.steps && rm.steps.length > 3 && (
                    <div className="text-[10px] text-slate-500 font-mono text-center">
                      +{rm.steps.length - 3} more phases
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-900 text-[11px] text-slate-500 flex items-center justify-between">
                <span>Skills: {rm.targetSkillIds.length} Linked</span>
                <span className="text-slate-400 font-mono">{rm.origin}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail Inspector Modal */}
      {selectedRoadmap && !isEditing && !isAdding && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-5 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-mono uppercase text-teal-400 font-bold">{selectedRoadmap.pathwayType}</span>
                <h2 className="text-base font-bold text-white">{selectedRoadmap.title}</h2>
              </div>
              <button onClick={() => setSelectedRoadmap(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <h3 className="text-xs font-mono uppercase text-slate-400 font-bold">Sequential Milestone Phases</h3>
              <div className="space-y-2">
                {selectedRoadmap.steps?.map((step, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-teal-500/20 text-teal-300 text-[10px] font-mono flex items-center justify-center">
                          {idx + 1}
                        </span>
                        {step.title}
                      </span>
                      <span className="text-[10px] font-mono text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/20">
                        {step.suggestedDurationDays} days
                      </span>
                    </div>
                    <div className="text-slate-300 text-[11px] pl-7"><strong>Action: </strong>{step.action}</div>
                    <div className="text-slate-400 text-[11px] pl-7"><strong>Expected Output: </strong>{step.expectedOutput}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedRoadmap(null)}
                className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit / Add Modal */}
      {(isAdding || isEditing) && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-5 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <Compass className="w-4 h-4 text-teal-400" />
                {isAdding ? 'Add Roadmap Template' : `Edit: ${formTitle}`}
              </h2>
              <button onClick={() => { setIsAdding(false); setIsEditing(false); }} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Roadmap Title:</label>
                <input
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g., Commercial Drone Imagery Service Pathway"
                  className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Pathway Type:</label>
                  <select
                    value={formPathway}
                    onChange={(e: any) => setFormPathway(e.target.value)}
                    className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs"
                  >
                    {pathways.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Target Skill IDs (comma separated):</label>
                  <input
                    type="text"
                    value={formSkills}
                    onChange={(e) => setFormSkills(e.target.value)}
                    placeholder="drone_tech, photography"
                    className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs"
                  />
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-800">
                <span className="font-bold text-slate-300 block">Milestone Steps:</span>
                {formSteps.map((step, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-teal-400 capitalize">{step.phaseId} Phase</span>
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          value={step.suggestedDurationDays}
                          onChange={(e) => {
                            const val = Number(e.target.value) || 1;
                            setFormSteps(prev => prev.map((s, i) => i === idx ? { ...s, suggestedDurationDays: val } : s));
                          }}
                          className="w-14 p-1 rounded bg-slate-900 border border-slate-800 text-[10px] text-right text-slate-200"
                        />
                        <span className="text-[10px] text-slate-500 font-mono">days</span>
                      </div>
                    </div>
                    <input
                      type="text"
                      value={step.title}
                      onChange={(e) => {
                        const val = e.target.value;
                        setFormSteps(prev => prev.map((s, i) => i === idx ? { ...s, title: val } : s));
                      }}
                      className="w-full p-1.5 rounded bg-slate-900 border border-slate-800 text-slate-200 text-xs"
                      placeholder="Step Title"
                    />
                    <input
                      type="text"
                      value={step.action}
                      onChange={(e) => {
                        const val = e.target.value;
                        setFormSteps(prev => prev.map((s, i) => i === idx ? { ...s, action: val } : s));
                      }}
                      className="w-full p-1.5 rounded bg-slate-900 border border-slate-800 text-slate-200 text-[11px]"
                      placeholder="Action Required"
                    />
                  </div>
                ))}
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
                  className="px-4 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  Save Roadmap
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
