/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * KAUSHAL SETU — PHASE 6 APPLICATIONS & SOLUTIONS DATABASE
 * Knowledge graph registry for real-world vocational applications,
 * linked skills, target user segments, and problem solutions.
 */

import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { ApplicationItem } from '../../data/adminTypes';
import { 
  Layers, 
  Search, 
  PlusCircle, 
  Edit3, 
  Trash2, 
  Eye, 
  X, 
  Cpu, 
  AlertCircle, 
  Target, 
  Briefcase, 
  Save 
} from 'lucide-react';
import { cn } from '../../lib/utils';

export function AdminApplications() {
  const { applications, addApplication, updateApplication, deleteApplication, logAdminAction } = useAdmin();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedApp, setSelectedApp] = useState<ApplicationItem | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  // Form states
  const [formId, setFormId] = useState('');
  const [formName, setFormName] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formSkills, setFormSkills] = useState('');
  const [formProblems, setFormProblems] = useState('');
  const [formUsers, setFormUsers] = useState('');
  const [formOpps, setFormOpps] = useState('');

  const filtered = applications.filter(a => 
    a.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (a.skillNames || []).some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleOpenAdd = () => {
    setFormId(`app-${Date.now()}`);
    setFormName('');
    setFormDesc('');
    setFormSkills('');
    setFormProblems('');
    setFormUsers('Local Businesses, Community');
    setFormOpps('');
    setIsAdding(true);
    setIsEditing(false);
  };

  const handleOpenEdit = (app: ApplicationItem) => {
    setFormId(app.id);
    setFormName(app.name);
    setFormDesc(app.description);
    setFormSkills((app.skillNames || []).join(', '));
    setFormProblems((app.relatedProblemIds || []).join(', '));
    setFormUsers((app.targetUserTypes || []).join(', '));
    setFormOpps((app.relatedOpportunityIds || []).join(', '));
    setIsEditing(true);
    setIsAdding(false);
    setSelectedApp(app);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    const payload: ApplicationItem = {
      id: formId,
      name: formName.trim(),
      description: formDesc.trim(),
      skillNames: formSkills.split(',').map(s => s.trim()).filter(Boolean),
      skillIds: [],
      relatedProblemIds: formProblems.split(',').map(s => s.trim()).filter(Boolean),
      targetUserTypes: formUsers.split(',').map(s => s.trim()).filter(Boolean),
      relatedOpportunityIds: formOpps.split(',').map(s => s.trim()).filter(Boolean),
      validationStatus: 'Validated',
      category: 'General',
      updatedAt: new Date().toISOString()
    };

    if (isAdding) {
      addApplication(payload);
    } else {
      updateApplication(payload);
    }

    setIsAdding(false);
    setIsEditing(false);
    setSelectedApp(payload);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-teal-400" />
            <h1 className="text-xl font-black tracking-tight text-white">APPLICATIONS & SOLUTIONS DATABASE</h1>
            <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-slate-800 text-slate-300">
              {filtered.length} Applications
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Standardized real-world deployment cases connecting vocational skills with tangible economic deliverables.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          Add Application
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
            placeholder="Search applications, skills, problems..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(app => (
          <div 
            key={app.id} 
            className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-3"
          >
            <div className="space-y-2">
              <div className="flex items-start justify-between">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30">
                  APPLICATION
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setSelectedApp(app)}
                    className="p-1 rounded-lg text-slate-400 hover:text-white"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleOpenEdit(app)}
                    className="p-1 rounded-lg text-slate-400 hover:text-blue-400"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white">{app.name}</h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">{app.description}</p>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-1 pt-1">
                {(app.skillNames || []).map((sk, idx) => (
                  <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-blue-300 font-medium">
                    {sk}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-900 text-[11px] text-slate-500 flex items-center justify-between">
              <span>{(app.targetUserTypes || []).length} Target Users</span>
              <span>{(app.relatedProblemIds || []).length} Problems Solved</span>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {(isAdding || isEditing) && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-teal-400" />
                {isAdding ? 'Add Application Node' : `Edit: ${formName}`}
              </h2>
              <button onClick={() => { setIsAdding(false); setIsEditing(false); }} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Application Name:</label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g., Local Business WhatsApp Catalog & Menu System"
                  className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Description:</label>
                <textarea
                  rows={2}
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
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
                  placeholder="Digital Marketing, Graphic Design"
                  className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Problems Solved (Comma separated):</label>
                <input
                  type="text"
                  value={formProblems}
                  onChange={(e) => setFormProblems(e.target.value)}
                  placeholder="High cost of e-commerce websites for small vendors"
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

      {/* Inspector Modal */}
      {selectedApp && !isAdding && !isEditing && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h2 className="text-sm font-bold text-white">{selectedApp.name}</h2>
              <button onClick={() => setSelectedApp(null)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <p className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200">
                {selectedApp.description}
              </p>

              <div>
                <div className="text-[10px] uppercase font-mono text-slate-400 font-bold mb-1">Related Skills</div>
                <div className="flex flex-wrap gap-1">
                  {(selectedApp.skillNames || []).map((s, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-blue-950/60 border border-blue-800 text-blue-300 text-xs">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-[10px] uppercase font-mono text-slate-400 font-bold mb-1">Target Customer Segments</div>
                <div className="flex flex-wrap gap-1">
                  {(selectedApp.targetUserTypes || []).map((u, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-teal-950/60 border border-teal-800 text-teal-300 text-xs">
                      {u}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedApp(null)}
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
