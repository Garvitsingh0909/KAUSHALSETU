/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * KAUSHAL SETU — PHASE 6 PROBLEM DATABASE MANAGEMENT
 * Real-world market friction, community pain points, and vocational solution mappings.
 */

import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { ProblemItem } from '../../data/adminTypes';
import { 
  AlertCircle, 
  Search, 
  PlusCircle, 
  Edit3, 
  Eye, 
  X, 
  Cpu, 
  Layers, 
  Target, 
  Briefcase, 
  CheckCircle2, 
  Save 
} from 'lucide-react';
import { cn } from '../../lib/utils';

export function AdminProblems() {
  const { problems, addProblem, updateProblem, deleteProblem, logAdminAction } = useAdmin();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProb, setSelectedProb] = useState<ProblemItem | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  // Form states
  const [formId, setFormId] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formSkills, setFormSkills] = useState('');
  const [formApps, setFormApps] = useState('');
  const [formUsers, setFormUsers] = useState('');
  const [formSolutions, setFormSolutions] = useState('');
  const [formOpps, setFormOpps] = useState('');

  const filtered = problems.filter(p => 
    p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.possibleSolutions.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
    p.relatedSkillIds.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleOpenAdd = () => {
    setFormId(`prob-${Date.now()}`);
    setFormDesc('');
    setFormSkills('');
    setFormApps('');
    setFormUsers('Local Business, Consumer');
    setFormSolutions('');
    setFormOpps('');
    setIsAdding(true);
    setIsEditing(false);
  };

  const handleOpenEdit = (prob: ProblemItem) => {
    setFormId(prob.id);
    setFormDesc(prob.description);
    setFormSkills(prob.relatedSkillIds.join(', '));
    setFormApps(prob.relatedApplicationIds.join(', '));
    setFormUsers(prob.targetUserTypes.join(', '));
    setFormSolutions(prob.possibleSolutions.join(', '));
    setFormOpps(prob.opportunityIds.join(', '));
    setIsEditing(true);
    setIsAdding(false);
    setSelectedProb(prob);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formDesc.trim()) return;

    const payload: ProblemItem = {
      id: formId,
      title: formDesc.trim().substring(0, 30),
      domain: 'General',
      description: formDesc.trim(),
      relatedSkillIds: formSkills.split(',').map(s => s.trim()).filter(Boolean),
      relatedApplicationIds: formApps.split(',').map(s => s.trim()).filter(Boolean),
      targetUserTypes: formUsers.split(',').map(s => s.trim()).filter(Boolean),
      possibleSolutions: formSolutions.split(',').map(s => s.trim()).filter(Boolean),
      opportunityIds: formOpps.split(',').map(s => s.trim()).filter(Boolean),
      validationStatus: 'Validated',
      updatedAt: new Date().toISOString()
    };

    if (isAdding) {
      addProblem(payload);
    } else {
      updateProblem(payload);
    }

    setIsAdding(false);
    setIsEditing(false);
    setSelectedProb(payload);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-amber-400" />
            <h1 className="text-xl font-black tracking-tight text-white">PROBLEM DATABASE</h1>
            <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-slate-800 text-slate-300">
              {filtered.length} Problems
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-world challenges that students can solve by combining practical skills and entrepreneurial models.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          Add Problem Record
        </button>
      </div>

      {/* Search */}
      <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search problems, solutions, skills..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Problems Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(prob => (
          <div 
            key={prob.id} 
            className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-3"
          >
            <div className="space-y-2">
              <div className="flex items-start justify-between">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  PROBLEM ID: {prob.id}
                </span>
                <div className="flex items-center gap-1">
                  <button onClick={() => setSelectedProb(prob)} className="p-1 rounded-lg text-slate-400 hover:text-white">
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => handleOpenEdit(prob)} className="p-1 rounded-lg text-slate-400 hover:text-blue-400">
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <p className="text-xs font-bold text-slate-100">{prob.description}</p>

              {/* Possible Solutions */}
              <div className="space-y-1 pt-1">
                <div className="text-[10px] uppercase font-mono text-slate-400 font-bold">Solutions Mapped:</div>
                {(prob.possibleSolutions || []).map((sol, i) => (
                  <div key={i} className="text-xs text-emerald-300 flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    <span>{sol}</span>
                  </div>
                ))}
                {(!prob.possibleSolutions || prob.possibleSolutions.length === 0) && (
                  <span className="text-xs text-slate-500 italic">No solutions registered.</span>
                )}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-900 text-[11px] text-slate-500 flex items-center justify-between">
              <span>Skills: {prob.relatedSkillIds.join(', ') || 'General'}</span>
              <span>{prob.targetUserTypes.length} Users affected</span>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {(isAdding || isEditing) && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-400" />
                {isAdding ? 'Add New Problem' : 'Edit Problem'}
              </h2>
              <button onClick={() => { setIsAdding(false); setIsEditing(false); }} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Problem Statement:</label>
                <textarea
                  rows={2}
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  placeholder="e.g., Small repair workshops lack digitized inventory and job card tracking."
                  className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Possible Solutions (Comma separated):</label>
                <input
                  type="text"
                  value={formSolutions}
                  onChange={(e) => setFormSolutions(e.target.value)}
                  placeholder="Cloud spreadsheet job tracker, QR code asset tagging"
                  className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Related Skills (Comma separated):</label>
                <input
                  type="text"
                  value={formSkills}
                  onChange={(e) => setFormSkills(e.target.value)}
                  placeholder="Spreadsheet Analysis, Automation"
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
                  className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Inspector */}
      {selectedProb && !isAdding && !isEditing && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h2 className="text-sm font-bold text-white">Problem Record</h2>
              <button onClick={() => setSelectedProb(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <p className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 font-bold">
                {selectedProb.description}
              </p>

              <div>
                <div className="text-[10px] uppercase font-mono text-slate-400 font-bold mb-1">Possible Solutions</div>
                <div className="space-y-1">
                  {(selectedProb.possibleSolutions || []).map((s, i) => (
                    <div key={i} className="p-2 rounded bg-emerald-950/50 border border-emerald-800 text-emerald-300 text-xs">
                      {s}
                    </div>
                  ))}
                  {(!selectedProb.possibleSolutions || selectedProb.possibleSolutions.length === 0) && (
                    <div className="text-slate-500 italic p-2">No solutions registered.</div>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedProb(null)}
                className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
