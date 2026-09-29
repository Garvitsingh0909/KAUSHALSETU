/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * KAUSHAL SETU — UNIVERSAL ADMIN SEARCH MODAL (PHASE 6)
 * Instant indexing & search across students, skills, combinations, opportunities,
 * assessments, research logs, and system entities.
 */

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import { 
  Search, 
  X, 
  User, 
  Cpu, 
  Combine, 
  Briefcase, 
  ShieldCheck, 
  Sparkles, 
  FileText, 
  History, 
  ArrowRight,
  Database
} from 'lucide-react';

interface UniversalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AdminUniversalSearchModal({ isOpen, onClose }: UniversalSearchModalProps) {
  const { universalSearch } = useAdmin();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const results = universalSearch(query);
  const hasResults = 
    results.users.length > 0 || 
    results.applications.length > 0 || 
    results.problems.length > 0 || 
    results.customerTypes.length > 0 || 
    results.gaps.length > 0 || 
    results.reviews.length > 0 || 
    results.businessTemplates.length > 0 || 
    results.surveys.length > 0;

  const handleSelect = (route: string) => {
    navigate(route);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-start justify-center p-4 pt-16 sm:pt-24 animate-in fade-in duration-150">
      <div 
        className="w-full max-w-3xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3 bg-slate-50 dark:bg-slate-900/50">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Universal Search across users, skills, combinations, opportunities, assessments, research..."
            className="w-full bg-transparent text-sm font-medium text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none"
          />
          <div className="flex items-center gap-2">
            <kbd className="hidden sm:inline-flex px-2 py-0.5 text-[10px] font-mono font-bold bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded">ESC</kbd>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-4 space-y-4 divide-y divide-slate-100 dark:divide-slate-800">
          {!hasResults && (
            <div className="text-center py-12 text-slate-400 text-sm">
              No matching administrative records found for "{query}".
            </div>
          )}

          {/* Users */}
          {results.users.length > 0 && (
            <div className="pt-2 first:pt-0">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-blue-500" />
                Users & Students ({results.users.length})
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {results.users.slice(0, 4).map(u => (
                  <button
                    key={u.id}
                    onClick={() => handleSelect('/admin/users')}
                    className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 hover:bg-blue-50/50 dark:hover:bg-blue-950/30 text-left transition-all flex items-center justify-between group"
                  >
                    <div>
                      <div className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        {u.name}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">{u.schoolOrOrg}</div>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 capitalize">
                      {u.systemRole}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Applications */}
          {results.applications.length > 0 && (
            <div className="pt-3">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-teal-500" />
                Applications & Solutions ({results.applications.length})
              </div>
              <div className="space-y-1.5">
                {results.applications.slice(0, 3).map(app => (
                  <button
                    key={app.id}
                    onClick={() => handleSelect('/admin/applications')}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-teal-500/50 hover:bg-teal-50/40 dark:hover:bg-teal-950/20 text-left transition-all flex items-center justify-between"
                  >
                    <div>
                      <div className="text-xs font-bold text-slate-800 dark:text-slate-200">{app.name}</div>
                      <div className="text-[11px] text-slate-500 line-clamp-1">{app.description}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* G-ONE Gaps */}
          {results.gaps.length > 0 && (
            <div className="pt-3">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                G-ONE Knowledge Gaps ({results.gaps.length})
              </div>
              <div className="space-y-1.5">
                {results.gaps.slice(0, 3).map(gap => (
                  <button
                    key={gap.id}
                    onClick={() => handleSelect('/admin/g-one')}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-amber-500/50 hover:bg-amber-50/40 dark:hover:bg-amber-950/20 text-left transition-all flex items-center justify-between"
                  >
                    <div>
                      <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                        {gap.skillAName} + {gap.skillBName}
                      </div>
                      <div className="text-[11px] text-slate-500">Missing: {gap.missingElement} • Status: {gap.status}</div>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300">
                      Review
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Question Reviews */}
          {results.reviews.length > 0 && (
            <div className="pt-3">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-500" />
                Assessment Question Bank & Reviews ({results.reviews.length})
              </div>
              <div className="space-y-1.5">
                {results.reviews.slice(0, 3).map(rev => (
                  <button
                    key={rev.id}
                    onClick={() => handleSelect('/admin/assessments')}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 hover:bg-indigo-50/40 dark:hover:bg-indigo-950/20 text-left transition-all flex items-center justify-between"
                  >
                    <div className="pr-4">
                      <div className="text-xs font-bold text-slate-800 dark:text-slate-200 line-clamp-1">{rev.questionPrompt}</div>
                      <div className="text-[11px] text-slate-500">{rev.skillName} • {rev.competency} ({rev.difficulty})</div>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 shrink-0">
                      {rev.status}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Business Templates */}
          {results.businessTemplates.length > 0 && (
            <div className="pt-3">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-emerald-500" />
                Business Models ({results.businessTemplates.length})
              </div>
              <div className="space-y-1.5">
                {results.businessTemplates.slice(0, 2).map(b => (
                  <button
                    key={b.id}
                    onClick={() => handleSelect('/admin/business-models')}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 hover:bg-emerald-50/40 dark:hover:bg-emerald-950/20 text-left transition-all flex items-center justify-between"
                  >
                    <div>
                      <div className="text-xs font-bold text-slate-800 dark:text-slate-200">{b.title}</div>
                      <div className="text-[11px] text-slate-500">{b.businessType} • {b.targetCustomerType}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
          <span>Navigate using search results</span>
          <span>Press <kbd className="px-1.5 py-0.5 bg-slate-200 dark:bg-slate-800 rounded font-mono text-[10px]">ESC</kbd> to close</span>
        </div>
      </div>
    </div>
  );
}
