/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * KAUSHAL SETU — PHASE 6 SKILL COMBINATION MANAGEMENT & COVERAGE
 * Matrix curation (2-skill & 3-skill), validation, approvals, and coverage analytics
 * showing applications, problems, customers, solutions, opportunities, projects, and roadmaps.
 */

import React, { useState } from 'react';
import { useKnowledgeBase } from '../../context/KnowledgeBaseContext';
import { useAdmin } from '../../context/AdminContext';
import { CombinationRecord } from '../../data/knowledgeBaseTypes';
import { 
  Combine, 
  Search, 
  CheckCircle2, 
  AlertTriangle, 
  AlertCircle, 
  PlusCircle, 
  Eye, 
  Edit3, 
  Check, 
  X, 
  ArrowRight, 
  Sparkles, 
  Layers, 
  Briefcase, 
  Target, 
  FolderKanban, 
  Compass,
  CheckCircle
} from 'lucide-react';
import { cn } from '../../lib/utils';

export function AdminCombinations() {
  const { combinations, skills, updateCombinationRecord, addCombinationRecord } = useKnowledgeBase();
  const { logAdminAction } = useAdmin();

  const [searchQuery, setSearchQuery] = useState('');
  const [tierFilter, setTierFilter] = useState<'all' | 'Tier 1' | 'Tier 2' | 'Tier 3'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'Validated' | 'Candidate' | 'Incomplete'>('all');
  const [selectedCombo, setSelectedCombo] = useState<CombinationRecord | null>(null);

  // Coverage Analytics (Strictly Computed)
  const totalSupportedSkills = skills.length;
  const twoSkillCombos = combinations.filter(c => c.skillIds.length === 2).length;
  const threeSkillCombos = combinations.filter(c => c.skillIds.length >= 3).length;
  const completeCombos = combinations.filter(c => c.validationStatus === 'Validated').length;
  const incompleteCombos = combinations.filter(c => c.validationStatus === 'Incomplete').length;
  const needsReviewCombos = combinations.filter(c => c.validationStatus === 'Candidate').length;

  const filteredCombos = combinations.filter(c => {
    const matchesSearch = 
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.skillNames.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      c.applications.some(a => a.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesTier = tierFilter === 'all' || c.tier === tierFilter;
    const matchesStatus = statusFilter === 'all' || c.validationStatus === statusFilter;

    return matchesSearch && matchesTier && matchesStatus;
  });

  const handleApprove = (combo: CombinationRecord) => {
    const updated: CombinationRecord = {
      ...combo,
      validationStatus: 'Validated',
      updatedAt: new Date().toISOString().substring(0, 10)
    };
    updateCombinationRecord(updated);
    logAdminAction('Approved Skill Combination', 'Combination', combo.id, combo.title);
    if (selectedCombo?.id === combo.id) setSelectedCombo(updated);
  };

  const handleReject = (combo: CombinationRecord) => {
    const updated: CombinationRecord = {
      ...combo,
      validationStatus: 'Rejected',
      updatedAt: new Date().toISOString().substring(0, 10)
    };
    updateCombinationRecord(updated);
    logAdminAction('Rejected Skill Combination', 'Combination', combo.id, combo.title);
    if (selectedCombo?.id === combo.id) setSelectedCombo(updated);
  };

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Combine className="w-5 h-5 text-teal-400" />
            <h1 className="text-xl font-black tracking-tight text-white">SKILL COMBINATIONS</h1>
            <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-slate-800 text-slate-300">
              {filteredCombos.length} Records
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Validate high-impact complementary pairings, manage applications, problems, and customer mappings.
          </p>
        </div>
      </div>

      {/* Combination Coverage Stats Banner */}
      <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
          <span>COMBINATION COVERAGE METRICS (COMPUTED LIVE)</span>
          <span className="font-mono text-emerald-400">Total Skills: {totalSupportedSkills}</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
            <div className="text-[10px] text-slate-500 uppercase font-mono">Supported Skills</div>
            <div className="text-base font-black text-white mt-0.5">{totalSupportedSkills}</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
            <div className="text-[10px] text-slate-500 uppercase font-mono">2-Skill Combos</div>
            <div className="text-base font-black text-blue-400 mt-0.5">{twoSkillCombos}</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
            <div className="text-[10px] text-slate-500 uppercase font-mono">3-Skill Combos</div>
            <div className="text-base font-black text-teal-400 mt-0.5">{threeSkillCombos}</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
            <div className="text-[10px] text-slate-500 uppercase font-mono">Complete (Validated)</div>
            <div className="text-base font-black text-emerald-400 mt-0.5">{completeCombos}</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
            <div className="text-[10px] text-slate-500 uppercase font-mono">Incomplete</div>
            <div className="text-base font-black text-slate-400 mt-0.5">{incompleteCombos}</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
            <div className="text-[10px] text-slate-500 uppercase font-mono">Needs Review</div>
            <div className="text-base font-black text-amber-400 mt-0.5">{needsReviewCombos}</div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search combination titles, skills, applications..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
            <span className="text-[11px] font-bold text-slate-400 px-2">Status:</span>
            <button
              onClick={() => setStatusFilter('all')}
              className={cn("px-2 py-0.5 rounded-lg font-medium", statusFilter === 'all' ? "bg-slate-800 text-white font-bold" : "text-slate-400 hover:text-slate-200")}
            >
              All
            </button>
            <button
              onClick={() => setStatusFilter('Validated')}
              className={cn("px-2 py-0.5 rounded-lg font-medium", statusFilter === 'Validated' ? "bg-emerald-600 text-white font-bold" : "text-slate-400 hover:text-slate-200")}
            >
              Validated
            </button>
            <button
              onClick={() => setStatusFilter('Candidate')}
              className={cn("px-2 py-0.5 rounded-lg font-medium", statusFilter === 'Candidate' ? "bg-amber-600 text-white font-bold" : "text-slate-400 hover:text-slate-200")}
            >
              Candidate
            </button>
          </div>
        </div>
      </div>

      {/* Combinations List */}
      <div className="space-y-3">
        {filteredCombos.map(combo => (
          <div 
            key={combo.id}
            className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30">
                  {combo.tier}
                </span>
                <span className={cn(
                  "text-[10px] font-mono font-bold px-2 py-0.5 rounded",
                  combo.validationStatus === 'Validated' ? "bg-emerald-500/20 text-emerald-300" :
                  combo.validationStatus === 'Candidate' ? "bg-amber-500/20 text-amber-300" :
                  "bg-slate-800 text-slate-400"
                )}>
                  {combo.validationStatus}
                </span>
              </div>

              {/* Skills Formula */}
              <div className="text-sm font-black text-white flex items-center gap-1.5 flex-wrap">
                {(combo.skillNames || []).map((name, i) => (
                  <React.Fragment key={i}>
                    <span className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-blue-300 font-bold">
                      {name}
                    </span>
                    {i < (combo.skillNames || []).length - 1 && <span className="text-slate-500 font-black">+</span>}
                  </React.Fragment>
                ))}
              </div>

              <div className="text-xs text-slate-300 font-semibold">{combo.title}</div>

              {/* Mapped stats */}
              <div className="flex items-center gap-4 text-[11px] text-slate-400 pt-1">
                <span>Applications: <strong className="text-slate-200">{(combo.applications || []).length}</strong></span>
                <span>•</span>
                <span>Problems: <strong className="text-slate-200">{(combo.problems || []).length}</strong></span>
                <span>•</span>
                <span>Opportunities: <strong className="text-emerald-400">{combo.opportunityTitles?.length || 0}</strong></span>
                <span>•</span>
                <span>Projects: <strong className="text-indigo-400">{combo.suggestedProjects?.length || 0}</strong></span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 self-end md:self-center shrink-0">
              {combo.validationStatus !== 'Validated' && (
                <button
                  onClick={() => handleApprove(combo)}
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5" />
                  Approve
                </button>
              )}
              {combo.validationStatus !== 'Rejected' && combo.validationStatus !== 'Validated' && (
                <button
                  onClick={() => handleReject(combo)}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-rose-950/50 hover:text-rose-400 text-slate-400 text-xs font-bold transition-colors cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                  Reject
                </button>
              )}
              <button
                onClick={() => setSelectedCombo(combo)}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                Inspect Matrix
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Combination Inspector Modal */}
      {selectedCombo && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-white">{selectedCombo.title}</h2>
                <div className="text-[11px] text-slate-400 font-mono">
                  {selectedCombo.skillNames.join(' + ')} • {selectedCombo.tier}
                </div>
              </div>
              <button
                onClick={() => setSelectedCombo(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-4 text-xs text-slate-300">
              <div>
                <div className="text-[10px] uppercase font-mono text-slate-400 font-bold mb-1">Practical Applications</div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  {(selectedCombo.applications || []).map((app, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Layers className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                      <span>{app}</span>
                    </div>
                  ))}
                  {(!selectedCombo.applications || selectedCombo.applications.length === 0) && (
                    <div className="text-slate-500 italic">None mapped</div>
                  )}
                </div>
              </div>

              <div>
                <div className="text-[10px] uppercase font-mono text-slate-400 font-bold mb-1">Problems Solved</div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  {(selectedCombo.problems || []).map((p, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>{p}</span>
                    </div>
                  ))}
                  {(!selectedCombo.problems || selectedCombo.problems.length === 0) && (
                    <div className="text-slate-500 italic">None mapped</div>
                  )}
                </div>
              </div>

              <div>
                <div className="text-[10px] uppercase font-mono text-slate-400 font-bold mb-1">Target Customers</div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex flex-wrap gap-1.5">
                  {(selectedCombo.targetCustomers || []).map((c, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-md bg-blue-950/60 border border-blue-800 text-blue-300">
                      {c}
                    </span>
                  ))}
                  {(!selectedCombo.targetCustomers || selectedCombo.targetCustomers.length === 0) && (
                    <span className="text-slate-500 italic">None mapped</span>
                  )}
                </div>
              </div>

              <div>
                <div className="text-[10px] uppercase font-mono text-slate-400 font-bold mb-1">Connected Opportunities</div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  {selectedCombo.opportunityTitles && selectedCombo.opportunityTitles.length > 0 ? (
                    selectedCombo.opportunityTitles.map((opp, i) => (
                      <div key={i} className="flex items-center gap-2 text-emerald-300">
                        <Briefcase className="w-3.5 h-3.5 shrink-0" />
                        <span>{opp}</span>
                      </div>
                    ))
                  ) : (
                    <span className="text-slate-500">None mapped</span>
                  )}
                </div>
              </div>
            </div>

            <div className="p-3 bg-slate-950 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedCombo(null)}
                className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold"
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
