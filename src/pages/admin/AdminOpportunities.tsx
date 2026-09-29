/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * KAUSHAL SETU — PHASE 6 OPPORTUNITY DATABASE & GRAPH MANAGEMENT
 * Micro-venture opportunities, skill requirements, financial model linkages,
 * and roadmap associations with full validation workflows.
 */

import React, { useState } from 'react';
import { useKnowledgeBase } from '../../context/KnowledgeBaseContext';
import { useAdmin } from '../../context/AdminContext';
import { Opportunity } from '../../data/opportunities';
import { 
  Briefcase, 
  Search, 
  PlusCircle, 
  Edit3, 
  Eye, 
  Check, 
  X, 
  DollarSign, 
  Cpu, 
  Compass, 
  FolderKanban, 
  CheckCircle2, 
  Save 
} from 'lucide-react';
import { cn } from '../../lib/utils';

export function AdminOpportunities() {
  const { opportunities, skills, addOpportunityRecord, updateOpportunityRecord } = useKnowledgeBase();
  const { logAdminAction } = useAdmin();

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedOpp, setSelectedOpp] = useState<Opportunity | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  // Form states
  const [formId, setFormId] = useState('');
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState('Freelance / Service');
  const [formDesc, setFormDesc] = useState('');
  const [formIncome, setFormIncome] = useState('₹1,000 - ₹3,000 per project');
  const [formTarget, setFormTarget] = useState('Local Businesses');
  const [formSkills, setFormSkills] = useState('');

  const categories = ['Freelance / Service', 'Product / Maker', 'Digital / Media', 'Local / Community', 'Hybrid / Scalable'];

  const filtered = opportunities.filter(o => {
    const matchesSearch = 
      o.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = categoryFilter === 'all' || o.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  const handleOpenAdd = () => {
    setFormId(`opp-${Date.now()}`);
    setFormTitle('');
    setFormCategory('Freelance / Service');
    setFormDesc('');
    setFormIncome('₹1,500 - ₹4,000 / project');
    setFormTarget('Local Retailers');
    setFormSkills('');
    setIsAdding(true);
    setIsEditing(false);
  };

  const handleOpenEdit = (opp: Opportunity) => {
    setFormId(opp.id);
    setFormTitle(opp.title);
    setFormCategory(opp.category);
    setFormDesc(opp.solution);
    setFormIncome(opp.opportunityType);
    setFormTarget((opp.targetUsers || []).join(', '));
    setFormSkills((opp.requiredSkills || []).join(', '));
    setIsEditing(true);
    setIsAdding(false);
    setSelectedOpp(opp);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    const payload: Opportunity = {
      id: formId,
      title: formTitle.trim(),
      category: formCategory as any,
      solution: formDesc.trim(),
      opportunityType: formIncome.trim(),
      targetUsers: formTarget.split(',').map(s => s.trim()).filter(Boolean),
      requiredSkills: formSkills.split(',').map(s => s.trim()).filter(Boolean),
      preferredSkills: [],
      applications: [],
      problems: [],
      nextSkills: [],
      firstStep: '',
      difficulty: 'Beginner'
    };

    if (isAdding) {
      addOpportunityRecord(payload);
      logAdminAction('Added Opportunity Record', 'Opportunity', payload.id, payload.title);
    } else {
      updateOpportunityRecord(payload);
      logAdminAction('Updated Opportunity Record', 'Opportunity', payload.id, payload.title);
    }

    setIsAdding(false);
    setIsEditing(false);
    setSelectedOpp(payload);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-emerald-400" />
            <h1 className="text-xl font-black tracking-tight text-white">OPPORTUNITY DATABASE</h1>
            <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-slate-800 text-slate-300">
              {filtered.length} Opportunities
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Curated student micro-enterprises with clear startup costs, realistic income models, and customer targets.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          Add Opportunity
        </button>
      </div>

      {/* Filter and Search */}
      <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search opportunities by title, income, audience..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto scrollbar-none">
          <button
            onClick={() => setCategoryFilter('all')}
            className={cn("px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer", categoryFilter === 'all' ? "bg-emerald-600 text-white font-bold" : "bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800")}
          >
            All Categories
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={cn("px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer", categoryFilter === cat ? "bg-emerald-600 text-white font-bold" : "bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800")}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(opp => (
          <div 
            key={opp.id} 
            className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-3"
          >
            <div className="space-y-2">
              <div className="flex items-start justify-between">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {opp.category}
                </span>
                <div className="flex items-center gap-1">
                  <button onClick={() => setSelectedOpp(opp)} className="p-1 rounded-lg text-slate-400 hover:text-white">
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => handleOpenEdit(opp)} className="p-1 rounded-lg text-slate-400 hover:text-blue-400">
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white">{opp.title}</h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">{opp.solution}</p>
              </div>

              {/* Economic stats */}
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800/80 flex items-center justify-between text-xs">
                <div className="text-emerald-400 font-bold">{opp.opportunityType}</div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-900 text-[11px] text-slate-500 flex items-center justify-between">
              <span>Target: {(opp.targetUsers || [])[0] || 'Any'}</span>
              <span className="text-blue-400 font-medium">{(opp.requiredSkills || []).length} Skills</span>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {(isAdding || isEditing) && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-5 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-emerald-400" />
                {isAdding ? 'Add Opportunity Node' : `Edit: ${formTitle}`}
              </h2>
              <button onClick={() => { setIsAdding(false); setIsEditing(false); }} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Opportunity Title:</label>
                <input
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g., Local Business WhatsApp Catalog Designer"
                  className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Category:</label>
                <select
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value)}
                  className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs"
                >
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
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

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Estimated Income:</label>
                  <input
                    type="text"
                    value={formIncome}
                    onChange={(e) => setFormIncome(e.target.value)}
                    className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Target Customer:</label>
                  <input
                    type="text"
                    value={formTarget}
                    onChange={(e) => setFormTarget(e.target.value)}
                    className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Required Skills (Comma separated):</label>
                <input
                  type="text"
                  value={formSkills}
                  onChange={(e) => setFormSkills(e.target.value)}
                  placeholder="graphic_design, digital_marketing"
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
      {selectedOpp && !isAdding && !isEditing && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h2 className="text-sm font-bold text-white">{selectedOpp.title}</h2>
              <button onClick={() => setSelectedOpp(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <p className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200">
                {selectedOpp.solution}
              </p>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 grid grid-cols-2 gap-2">
                <div>
                  <span className="text-[10px] text-slate-500 font-mono uppercase">Income Model</span>
                  <div className="font-bold text-emerald-400">{selectedOpp.opportunityType}</div>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 font-mono uppercase">Target Audience</span>
                  <div className="font-bold text-slate-200">{(selectedOpp.targetUsers || []).join(', ')}</div>
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedOpp(null)}
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
