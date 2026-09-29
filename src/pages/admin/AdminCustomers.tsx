/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * KAUSHAL SETU — PHASE 6 CUSTOMER / USER TYPES DATABASE
 * Economic buyer archetypes (Local Business, Farmer, School, Creator, etc.)
 * with willingness to pay, typical problem areas, and opportunity alignment.
 */

import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { CustomerTypeItem } from '../../data/adminTypes';
import { 
  Target, 
  Search, 
  PlusCircle, 
  Edit3, 
  Eye, 
  X, 
  Building2, 
  GraduationCap, 
  Sparkles, 
  Briefcase, 
  DollarSign, 
  Save 
} from 'lucide-react';
import { cn } from '../../lib/utils';

export function AdminCustomers() {
  const { customerTypes, addCustomerType, updateCustomerType, logAdminAction } = useAdmin();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCust, setSelectedCust] = useState<CustomerTypeItem | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  // Form
  const [formId, setFormId] = useState('');
  const [formName, setFormName] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formNeeds, setFormNeeds] = useState('');
  const [formPay, setFormPay] = useState<'low' | 'medium' | 'high'>('medium');
  const [formProblems, setFormProblems] = useState('');
  const [formSkills, setFormSkills] = useState('');

  const filtered = customerTypes.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.typicalNeeds.some(n => n.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleOpenAdd = () => {
    setFormId(`cust-${Date.now()}`);
    setFormName('');
    setFormDesc('');
    setFormNeeds('');
    setFormPay('medium');
    setFormProblems('');
    setFormSkills('');
    setIsAdding(true);
    setIsEditing(false);
  };

  const handleOpenEdit = (cust: CustomerTypeItem) => {
    setFormId(cust.id);
    setFormName(cust.title);
    setFormDesc(cust.description);
    setFormNeeds((cust.typicalPainPoints || []).join(', '));
    setFormPay(cust.purchasingPower);
    setFormProblems('');
    setFormSkills('');
    setIsEditing(true);
    setIsAdding(false);
    setSelectedCust(cust);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    const payload: CustomerTypeItem = {
      id: formId,
      title: formName.trim(),
      category: 'Local Retail',
      description: formDesc.trim(),
      typicalPainPoints: formNeeds.split(',').map(s => s.trim()).filter(Boolean),
      purchasingPower: 'Medium (₹5k-₹25k)',
      matchedOpportunitiesCount: 0,
      linkedOpportunityIds: []
    };

    if (isAdding) {
      addCustomerType(payload);
    } else {
      updateCustomerType(payload);
    }

    setIsAdding(false);
    setIsEditing(false);
    setSelectedCust(payload);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-400" />
            <h1 className="text-xl font-black tracking-tight text-white">CUSTOMER & USER TYPES DATABASE</h1>
            <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-slate-800 text-slate-300">
              {filtered.length} Segments
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Standard customer personas for micro-enterprises, commercial willingness-to-pay, and localized demand patterns.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          Add Customer Segment
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(cust => (
          <div 
            key={cust.id} 
            className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-3"
          >
            <div className="space-y-2">
              <div className="flex items-start justify-between">
                <span className={cn(
                  "text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase",
                  cust.willingnessToPay === 'high' ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" :
                  cust.willingnessToPay === 'medium' ? "bg-blue-500/20 text-blue-300 border border-blue-500/30" :
                  "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                )}>
                  PAY CAPACITY: {cust.purchasingPower}
                </span>
                <div className="flex items-center gap-1">
                  <button onClick={() => setSelectedCust(cust)} className="p-1 rounded-lg text-slate-400 hover:text-white">
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => handleOpenEdit(cust)} className="p-1 rounded-lg text-slate-400 hover:text-blue-400">
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white">{cust.title}</h3>
                <p className="text-xs text-slate-400 mt-1">{cust.description}</p>
              </div>

              {/* Needs list */}
              <div className="space-y-1 pt-1">
                <div className="text-[10px] uppercase font-mono text-slate-500 font-bold">Key Needs:</div>
                <div className="flex flex-wrap gap-1">
                  {(cust.typicalPainPoints || []).map((need, idx) => (
                    <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                      {need}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-900 text-[11px] text-slate-500 flex items-center justify-between">
              <span>{(cust.typicalPainPoints || []).length} Problem Patterns</span>
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
                <Target className="w-4 h-4 text-blue-400" />
                {isAdding ? 'Add Customer Segment' : 'Edit Segment'}
              </h2>
              <button onClick={() => { setIsAdding(false); setIsEditing(false); }} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Customer Archetype Name:</label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g., Local Neighborhood Business"
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
                <label className="block text-slate-300 font-bold mb-1">Willingness to Pay:</label>
                <select
                  value={formPay}
                  onChange={(e) => setFormPay(e.target.value as 'low' | 'medium' | 'high')}
                  className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs"
                >
                  <option value="low">Low (₹200 - ₹800 budget)</option>
                  <option value="medium">Medium (₹1,000 - ₹5,000 budget)</option>
                  <option value="high">High (₹5,000 - ₹25,000+ budget)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Typical Needs (Comma separated):</label>
                <input
                  type="text"
                  value={formNeeds}
                  onChange={(e) => setFormNeeds(e.target.value)}
                  placeholder="Digital presence, Local footfall, Flyer design"
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
      {selectedCust && !isAdding && !isEditing && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h2 className="text-sm font-bold text-white">{selectedCust.title}</h2>
              <button onClick={() => setSelectedCust(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <p className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200">
                {selectedCust.description}
              </p>

              <div>
                <div className="text-[10px] uppercase font-mono text-slate-400 font-bold mb-1">Typical Problems</div>
                <div className="space-y-1">
                  {(selectedCust.typicalPainPoints || []).map((p, i) => (
                    <div key={i} className="p-2 rounded bg-slate-950 border border-slate-800 text-slate-300">
                      {p}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedCust(null)}
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
