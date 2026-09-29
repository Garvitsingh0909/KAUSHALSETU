/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * KAUSHAL SETU — PHASE 6 FINANCIAL MODEL ARCHETYPES & BREAK-EVEN ENGINE
 * Curated financial formulas, unit economics templates, fixed & variable cost
 * categorization, and educational break-even calculators for student ventures.
 */

import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { FinancialModelTemplateItem } from '../../data/adminTypes';
import { 
  Calculator, 
  Search, 
  Edit3, 
  Eye, 
  X, 
  DollarSign, 
  TrendingUp, 
  HelpCircle, 
  Save, 
  CheckCircle2, 
  AlertCircle,
  BarChart2
} from 'lucide-react';
import { cn } from '../../lib/utils';

export function AdminFinancialModels() {
  const { financialModels, updateFinancialModel, logAdminAction } = useAdmin();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModel, setSelectedModel] = useState<FinancialModelTemplateItem | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Form states
  const [formName, setFormName] = useState('');
  const [formPrice, setFormPrice] = useState(1500);
  const [formFixedCost, setFormFixedCost] = useState(650);
  const [formVarCost, setFormVarCost] = useState(150);
  const [formDisclaimer, setFormDisclaimer] = useState('');
  const [formFixedCats, setFormFixedCats] = useState('');
  const [formVarCats, setFormVarCats] = useState('');

  // Simulator state
  const [simUnits, setSimUnits] = useState(10);
  const [simModelId, setSimModelId] = useState<string>(financialModels[0]?.id || '');

  const filtered = financialModels.filter(m => 
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.formulaSummary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenEdit = (model: FinancialModelTemplateItem) => {
    setSelectedModel(model);
    setFormName(model.name);
    setFormPrice(model.defaultPricePerUnit);
    setFormFixedCost(model.defaultFixedCostTotal);
    setFormVarCost(model.defaultVariableCostPerUnit);
    setFormDisclaimer(model.guidanceDisclaimer);
    setFormFixedCats(model.fixedCostCategories.join(', '));
    setFormVarCats(model.variableCostCategories.join(', '));
    setIsEditing(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedModel || !formName.trim()) return;

    const updated: FinancialModelTemplateItem = {
      ...selectedModel,
      name: formName.trim(),
      defaultPricePerUnit: Number(formPrice) || 0,
      defaultFixedCostTotal: Number(formFixedCost) || 0,
      defaultVariableCostPerUnit: Number(formVarCost) || 0,
      guidanceDisclaimer: formDisclaimer.trim(),
      fixedCostCategories: formFixedCats.split(',').map(s => s.trim()).filter(Boolean),
      variableCostCategories: formVarCats.split(',').map(s => s.trim()).filter(Boolean),
      lastUpdated: new Date().toISOString().substring(0, 10)
    };

    updateFinancialModel(updated);
    logAdminAction('Updated Financial Model', 'System', updated.id, updated.name);
    setIsEditing(false);
    setSelectedModel(updated);
  };

  // Active simulated model
  const activeSimModel = financialModels.find(m => m.id === simModelId) || financialModels[0];
  const simPrice = activeSimModel?.defaultPricePerUnit || 1000;
  const simVarCost = activeSimModel?.defaultVariableCostPerUnit || 200;
  const simFixed = activeSimModel?.defaultFixedCostTotal || 500;
  const marginPerUnit = Math.max(0, simPrice - simVarCost);
  const breakEvenUnits = marginPerUnit > 0 ? Math.ceil(simFixed / marginPerUnit) : 0;
  const totalRevenue = simUnits * simPrice;
  const totalCost = simFixed + (simUnits * simVarCost);
  const netSurplus = totalRevenue - totalCost;

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-emerald-400" />
            <h1 className="text-xl font-black tracking-tight text-white">FINANCIAL MODEL ARCHETYPES</h1>
            <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              UNIT ECONOMICS & BREAK-EVEN
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Standardized pedagogical pricing formulas, variable cost breakdowns, and break-even calculation parameters.
          </p>
        </div>
      </div>

      {/* Interactive Simulation Sandbox */}
      <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-emerald-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">Live Model Verification Sandbox</h2>
          </div>
          <select 
            value={simModelId}
            onChange={(e) => setSimModelId(e.target.value)}
            className="px-3 py-1 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-200"
          >
            {financialModels.map(m => (
              <option key={m.id} value={m.id}>{m.name}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
            <div className="text-[10px] text-slate-400 uppercase font-mono">Unit Price</div>
            <div className="text-base font-bold text-emerald-400">₹{simPrice.toLocaleString()}</div>
            <div className="text-[10px] text-slate-500">Var Cost: ₹{simVarCost}</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
            <div className="text-[10px] text-slate-400 uppercase font-mono">Fixed Overheads</div>
            <div className="text-base font-bold text-blue-400">₹{simFixed.toLocaleString()}</div>
            <div className="text-[10px] text-slate-500">Monthly baseline</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
            <div className="text-[10px] text-slate-400 uppercase font-mono">Break-Even Units</div>
            <div className="text-base font-bold text-amber-400">{breakEvenUnits} units</div>
            <div className="text-[10px] text-slate-500">Contribution: ₹{marginPerUnit}/unit</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
            <div className="text-[10px] text-slate-400 uppercase font-mono">Net Surplus ({simUnits} units)</div>
            <div className={cn("text-base font-bold", netSurplus >= 0 ? "text-emerald-400" : "text-rose-400")}>
              {netSurplus >= 0 ? `+₹${netSurplus.toLocaleString()}` : `-₹${Math.abs(netSurplus).toLocaleString()}`}
            </div>
            <div className="text-[10px] text-slate-500">Rev: ₹{totalRevenue.toLocaleString()}</div>
          </div>
        </div>

        {/* Volume slider */}
        <div className="flex items-center gap-4 pt-1">
          <span className="text-xs text-slate-400 shrink-0">Simulate Volume: <strong className="text-white">{simUnits} projects/units</strong></span>
          <input 
            type="range" 
            min="1" 
            max="30" 
            value={simUnits} 
            onChange={(e) => setSimUnits(Number(e.target.value))}
            className="w-full accent-emerald-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
          />
        </div>
      </div>

      {/* Model Archetype Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(model => {
          const margin = model.defaultPricePerUnit - model.defaultVariableCostPerUnit;
          const bep = margin > 0 ? Math.ceil(model.defaultFixedCostTotal / margin) : 0;

          return (
            <div 
              key={model.id}
              className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all space-y-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    {model.modelType.toUpperCase()}
                  </span>
                  <h3 className="text-sm font-black text-white mt-1.5">{model.name}</h3>
                </div>
                <button
                  onClick={() => handleOpenEdit(model)}
                  className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white border border-slate-800 transition-colors"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Economic stats */}
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800/80 grid grid-cols-3 gap-2 text-center text-xs">
                <div>
                  <div className="text-[10px] text-slate-500 font-mono">Suggested Price</div>
                  <div className="font-bold text-emerald-400">₹{model.defaultPricePerUnit}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 font-mono">Variable Cost</div>
                  <div className="font-bold text-rose-400">₹{model.defaultVariableCostPerUnit}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 font-mono">Break-Even</div>
                  <div className="font-bold text-amber-400">{bep} units</div>
                </div>
              </div>

              {/* Formula & Cost categories */}
              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 font-mono text-[11px] text-slate-300">
                  <span className="text-slate-500 block text-[10px] font-sans">Formula Definition:</span>
                  {model.formulaSummary}
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="p-2 rounded-lg bg-slate-900/40 border border-slate-800/80">
                    <span className="font-bold text-slate-400 block mb-1">Fixed Categories:</span>
                    <ul className="list-disc list-inside text-slate-300 space-y-0.5">
                      {(model.fixedCostCategories || []).slice(0, 3).map((c, i) => (
                        <li key={i} className="truncate">{c}</li>
                      ))}
                      {(!model.fixedCostCategories || model.fixedCostCategories.length === 0) && (
                        <li className="text-slate-500 italic list-none">None</li>
                      )}
                    </ul>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-900/40 border border-slate-800/80">
                    <span className="font-bold text-slate-400 block mb-1">Variable Categories:</span>
                    <ul className="list-disc list-inside text-slate-300 space-y-0.5">
                      {(model.variableCostCategories || []).slice(0, 3).map((c, i) => (
                        <li key={i} className="truncate">{c}</li>
                      ))}
                      {(!model.variableCostCategories || model.variableCostCategories.length === 0) && (
                        <li className="text-slate-500 italic list-none">None</li>
                      )}
                    </ul>
                  </div>
                </div>

                <p className="text-[11px] text-slate-500 italic mt-2">
                  *{model.guidanceDisclaimer}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-900 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                <span>ID: {model.id}</span>
                <span>Updated: {model.lastUpdated}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit Modal */}
      {isEditing && selectedModel && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-5 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <Calculator className="w-4 h-4 text-emerald-400" />
                Edit Financial Model Archetype
              </h2>
              <button onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Model Name:</label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs"
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Unit Price (₹):</label>
                  <input
                    type="number"
                    value={formPrice}
                    onChange={(e) => setFormPrice(Number(e.target.value))}
                    className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Fixed Cost (₹):</label>
                  <input
                    type="number"
                    value={formFixedCost}
                    onChange={(e) => setFormFixedCost(Number(e.target.value))}
                    className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Var Cost / Unit (₹):</label>
                  <input
                    type="number"
                    value={formVarCost}
                    onChange={(e) => setFormVarCost(Number(e.target.value))}
                    className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Fixed Cost Categories (comma separated):</label>
                <input
                  type="text"
                  value={formFixedCats}
                  onChange={(e) => setFormFixedCats(e.target.value)}
                  className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Variable Cost Categories (comma separated):</label>
                <input
                  type="text"
                  value={formVarCats}
                  onChange={(e) => setFormVarCats(e.target.value)}
                  className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Pedagogical Guidance Disclaimer:</label>
                <textarea
                  rows={2}
                  value={formDisclaimer}
                  onChange={(e) => setFormDisclaimer(e.target.value)}
                  className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
