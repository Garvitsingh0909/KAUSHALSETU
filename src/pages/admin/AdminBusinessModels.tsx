/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * KAUSHAL SETU — PHASE 6 BUSINESS MODEL LIBRARY
 * Micro-enterprise templates (Freelance, Product, Digital, Community, Local)
 * with problems, customers, solutions, revenue models, and pricing structures.
 */

import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { BusinessTemplateItem } from '../../data/adminTypes';
import { 
  Briefcase, 
  Search, 
  PlusCircle, 
  Edit3, 
  Eye, 
  X, 
  DollarSign, 
  Target, 
  Layers, 
  Save 
} from 'lucide-react';
import { cn } from '../../lib/utils';

export function AdminBusinessModels() {
  const { businessTemplates, addBusinessTemplate, updateBusinessTemplate, logAdminAction } = useAdmin();
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedTemplate, setSelectedTemplate] = useState<BusinessTemplateItem | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  // Form states
  const [formId, setFormId] = useState('');
  const [formTitle, setFormTitle] = useState('');
  const [formType, setFormType] = useState<any>('Freelance');
  const [formProb, setFormProb] = useState('');
  const [formCustomer, setFormCustomer] = useState('');
  const [formSol, setFormSol] = useState('');
  const [formRev, setFormRev] = useState('');
  const [formPricing, setFormPricing] = useState('');

  const types = ['Freelance', 'Product', 'Digital', 'Local', 'Community', 'Micro-enterprise'];

  const filtered = businessTemplates.filter(b => {
    const matchesSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase()) || b.problemStatement.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || b.businessType === typeFilter;
    return matchesSearch && matchesType;
  });

  const handleOpenAdd = () => {
    setFormId(`bm-${Date.now()}`);
    setFormTitle('');
    setFormType('Freelance');
    setFormProb('');
    setFormCustomer('Local Shopkeepers');
    setFormSol('');
    setFormRev('Per Deliverable Fee');
    setFormPricing('1500');
    setIsAdding(true);
    setIsEditing(false);
  };

  const handleOpenEdit = (item: BusinessTemplateItem) => {
    setFormId(item.id);
    setFormTitle(item.title);
    setFormType(item.businessType);
    setFormProb('');
    setFormCustomer(item.targetCustomerType);
    setFormSol(item.description);
    setFormRev(item.revenueModel);
    setFormPricing(item.typicalPriceRange?.recommended?.toString() || '0');
    setIsEditing(true);
    setIsAdding(false);
    setSelectedTemplate(item);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    const payload: BusinessTemplateItem = {
      id: formId,
      title: formTitle.trim(),
      businessType: formType,
      description: formSol.trim(),
      targetCustomerType: formCustomer.trim(),
      revenueModel: formRev.trim(),
      typicalPriceRange: { min: parseInt(formPricing) * 0.8, recommended: parseInt(formPricing) || 0, max: parseInt(formPricing) * 1.5 },
      sampleFixedCosts: [],
      sampleVariableCosts: [],
      breakEvenGuidance: formProb.trim(),
      validationStatus: 'Validated',
      updatedAt: new Date().toISOString()
    };

    if (isAdding) {
      addBusinessTemplate(payload);
      logAdminAction('Added Business Template', 'BusinessModel', payload.id, payload.title);
    } else {
      updateBusinessTemplate(payload);
      logAdminAction('Updated Business Template', 'BusinessModel', payload.id, payload.title);
    }

    setIsAdding(false);
    setIsEditing(false);
    setSelectedTemplate(payload);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-emerald-400" />
            <h1 className="text-xl font-black tracking-tight text-white">BUSINESS MODEL LIBRARY</h1>
            <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-slate-800 text-slate-300">
              {filtered.length} Archetypes
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Curated student enterprise structures with realistic monetization models and unit economics.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          Add Business Archetype
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(b => (
          <div 
            key={b.id} 
            className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-3"
          >
            <div className="space-y-2">
              <div className="flex items-start justify-between">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {b.businessType.toUpperCase()}
                </span>
                <div className="flex items-center gap-1">
                  <button onClick={() => setSelectedTemplate(b)} className="p-1 rounded-lg text-slate-400 hover:text-white">
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => handleOpenEdit(b)} className="p-1 rounded-lg text-slate-400 hover:text-blue-400">
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white">{b.title}</h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">{b.solution}</p>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800/80 space-y-1 text-xs">
                <div className="text-slate-300 flex items-center justify-between">
                  <span className="text-slate-500 text-[10px]">Target:</span>
                  <span className="font-semibold text-slate-200">{b.targetCustomerType}</span>
                </div>
                <div className="text-emerald-400 font-bold text-[11px]">{b.pricingAssumptions}</div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-900 text-[11px] text-slate-500">
              Revenue Model: <strong className="text-slate-300">{b.revenueModel}</strong>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {(isAdding || isEditing) && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-5 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h2 className="text-sm font-bold text-white">
                {isAdding ? 'Add Business Archetype' : `Edit: ${formTitle}`}
              </h2>
              <button onClick={() => { setIsAdding(false); setIsEditing(false); }} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Archetype Title:</label>
                <input
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g., Client Retainer Marketing Support"
                  className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Business Type:</label>
                <select
                  value={formType}
                  onChange={(e) => setFormType(e.target.value)}
                  className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs"
                >
                  {types.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
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
                <label className="block text-slate-300 font-bold mb-1">Proposed Solution:</label>
                <textarea
                  rows={2}
                  value={formSol}
                  onChange={(e) => setFormSol(e.target.value)}
                  className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Target Customer:</label>
                  <input
                    type="text"
                    value={formCustomer}
                    onChange={(e) => setFormCustomer(e.target.value)}
                    className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Revenue Model:</label>
                  <input
                    type="text"
                    value={formRev}
                    onChange={(e) => setFormRev(e.target.value)}
                    className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Pricing Assumptions:</label>
                <input
                  type="text"
                  value={formPricing}
                  onChange={(e) => setFormPricing(e.target.value)}
                  placeholder="e.g., ₹2,500/month flat retainer per merchant"
                  className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs"
                  required
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
      {selectedTemplate && !isAdding && !isEditing && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h2 className="text-sm font-bold text-white">{selectedTemplate.title}</h2>
              <button onClick={() => setSelectedTemplate(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <p className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200">
                {selectedTemplate.description}
              </p>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 grid grid-cols-2 gap-2">
                <div>
                  <span className="text-[10px] text-slate-500 font-mono uppercase">Pricing</span>
                  <div className="font-bold text-emerald-400">₹{selectedTemplate.typicalPriceRange?.recommended || 0}</div>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 font-mono uppercase">Target Customer</span>
                  <div className="font-bold text-slate-200">{selectedTemplate.targetCustomerType}</div>
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedTemplate(null)}
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
