/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * KAUSHAL SETU — PHASE 6 G-ONE CONTROL CENTER & GAP RESOLUTION
 * Model configuration telemetry, retrieval graph grounding, and automated
 * knowledge-gap candidate generation & editorial approval pipeline.
 */

import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { useKnowledgeBase } from '../../context/KnowledgeBaseContext';
import { KnowledgeGapQueueItem } from '../../data/adminTypes';
import { 
  Sparkles, 
  Cpu, 
  Search, 
  CheckCircle2, 
  AlertTriangle, 
  Play, 
  Check, 
  X, 
  RefreshCw, 
  Eye, 
  Layers, 
  ShieldCheck, 
  Settings, 
  Zap,
  ArrowRight
} from 'lucide-react';
import { cn } from '../../lib/utils';

export function AdminGOneCenter() {
  const { knowledgeGaps, generateGapCandidate, approveGapCandidate, rejectGapCandidate, logAdminAction } = useAdmin();
  const { combinations, skills } = useKnowledgeBase();

  const [statusFilter, setStatusFilter] = useState<'all' | 'Needs Review' | 'Candidate Generated' | 'Resolved'>('all');
  const [selectedGap, setSelectedGap] = useState<KnowledgeGapQueueItem | null>(null);
  const [isGenerating, setIsGenerating] = useState<string | null>(null);

  const filteredGaps = knowledgeGaps.filter(g => statusFilter === 'all' || g.status === statusFilter);

  const handleGenerateCandidate = (gapId: string) => {
    setIsGenerating(gapId);
    setTimeout(() => {
      generateGapCandidate(gapId);
      setIsGenerating(null);
      const updated = knowledgeGaps.find(g => g.id === gapId);
      if (updated) setSelectedGap(updated);
    }, 400);
  };

  const handleApprove = (gap: KnowledgeGapQueueItem) => {
    approveGapCandidate(gap.id);
    if (selectedGap?.id === gap.id) {
      setSelectedGap({ ...gap, status: 'Resolved' });
    }
  };

  const handleReject = (gapId: string) => {
    rejectGapCandidate(gapId);
    if (selectedGap?.id === gapId) {
      setSelectedGap(prev => prev ? { ...prev, status: 'Rejected' } : null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h1 className="text-xl font-black tracking-tight text-white">G-ONE INTELLIGENCE CONTROL CENTER</h1>
            <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30">
              GROUNDED AI
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Deterministic Knowledge-Graph retrieval configuration, pedagogical reasoning verification, and gap candidate curation.
          </p>
        </div>
      </div>

      {/* Model & Architecture Telemetry Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Grounding Engine */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-mono text-slate-400 font-bold">Retrieval Grounding</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <div className="text-base font-black text-white">Structured Graph Retrieval</div>
          <p className="text-xs text-slate-400">
            G-ONE cross-references the {combinations.length} validated combination matrices and 3-tier synthesis rules prior to LLM reasoning.
          </p>
        </div>

        {/* Model Spec */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-mono text-slate-400 font-bold">Model Engine</span>
            <span className="text-[10px] font-mono font-bold text-blue-400 bg-blue-500/20 px-2 py-0.5 rounded">v2.5 FLASH</span>
          </div>
          <div className="text-base font-black text-white">Gemini 2.5 Flash Grounded</div>
          <p className="text-xs text-slate-400">
            Temperature: 0.2 (Pedagogical stability) • Response latency: &lt; 280ms • Anti-hallucination guardrails active.
          </p>
        </div>

        {/* Knowledge Gap Queue */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-mono text-slate-400 font-bold">Gap Resolution Queue</span>
            <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded">
              {knowledgeGaps.filter(g => g.status !== 'Resolved').length} Unresolved
            </span>
          </div>
          <div className="text-base font-black text-white">Curated Gap Ingestion</div>
          <p className="text-xs text-slate-400">
            Identifies missing combinations from student exploration and generates candidate applications for reviewer approval.
          </p>
        </div>
      </div>

      {/* Gap Queue Filter */}
      <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-bold text-slate-200">Knowledge-Gap Review Queue</span>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setStatusFilter('all')}
            className={cn("px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer", statusFilter === 'all' ? "bg-slate-800 text-white font-bold" : "text-slate-400 hover:text-slate-200")}
          >
            All Gaps ({knowledgeGaps.length})
          </button>
          <button
            onClick={() => setStatusFilter('Needs Review')}
            className={cn("px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer", statusFilter === 'Needs Review' ? "bg-amber-600 text-white font-bold" : "text-slate-400 hover:text-slate-200")}
          >
            Needs Review
          </button>
          <button
            onClick={() => setStatusFilter('Candidate Generated')}
            className={cn("px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer", statusFilter === 'Candidate Generated' ? "bg-blue-600 text-white font-bold" : "text-slate-400 hover:text-slate-200")}
          >
            Candidate Ready
          </button>
          <button
            onClick={() => setStatusFilter('Resolved')}
            className={cn("px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer", statusFilter === 'Resolved' ? "bg-emerald-600 text-white font-bold" : "text-slate-400 hover:text-slate-200")}
          >
            Resolved
          </button>
        </div>
      </div>

      {/* Gap Cards */}
      <div className="space-y-3">
        {filteredGaps.map(gap => (
          <div 
            key={gap.id} 
            className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={cn(
                  "text-[10px] font-mono font-bold px-2 py-0.5 rounded",
                  gap.status === 'Resolved' ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" :
                  gap.status === 'Candidate Generated' ? "bg-blue-500/20 text-blue-300 border border-blue-500/30" :
                  "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                )}>
                  {gap.status}
                </span>
                <span className="text-[11px] text-slate-500 font-mono">Logged: {gap.loggedDate}</span>
              </div>

              {/* Skills Combination */}
              <div className="text-sm font-black text-white flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-lg bg-slate-900 border border-slate-800 text-blue-300">
                  {gap.skillAName}
                </span>
                <span className="text-slate-500">+</span>
                <span className="px-2.5 py-0.5 rounded-lg bg-slate-900 border border-slate-800 text-teal-300">
                  {gap.skillBName}
                </span>
              </div>

              <div className="text-xs text-slate-300">
                <span className="text-slate-500 font-medium">Missing Element: </span>
                <strong className="text-slate-200">{gap.missingElement}</strong>
              </div>

              {gap.proposedCandidate && (
                <div className="p-3 rounded-xl bg-blue-950/30 border border-blue-800/40 text-xs text-blue-200 space-y-1">
                  <div className="font-bold text-blue-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Generated Candidate: {gap.proposedCandidate.title}
                  </div>
                  <div className="text-slate-300 text-[11px]">{gap.proposedCandidate.description}</div>
                </div>
              )}
            </div>

            {/* Gap Action Buttons */}
            <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
              {gap.status === 'Needs Review' && (
                <button
                  onClick={() => handleGenerateCandidate(gap.id)}
                  disabled={isGenerating === gap.id}
                  className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
                >
                  <Zap className="w-3.5 h-3.5" />
                  {isGenerating === gap.id ? 'Synthesizing...' : 'Generate Candidate'}
                </button>
              )}

              {gap.status === 'Candidate Generated' && (
                <>
                  <button
                    onClick={() => handleApprove(gap)}
                    className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <Check className="w-3.5 h-3.5" />
                    Approve Candidate
                  </button>
                  <button
                    onClick={() => handleReject(gap.id)}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-rose-950/50 hover:text-rose-400 text-slate-400 text-xs font-bold transition-colors cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                    Reject
                  </button>
                </>
              )}

              {gap.status === 'Resolved' && (
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 px-3 py-1 bg-emerald-950/50 rounded-xl border border-emerald-900">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Ingested to Graph
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
