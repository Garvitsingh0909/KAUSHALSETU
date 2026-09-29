import React, { useState } from 'react';
import { useProfile } from '../context/ProfileContext';
import { OPPORTUNITIES_DB, calculateMatch } from '../data/opportunities';
import { MatchScoreBadge } from '../components/opportunities/MatchScoreBadge';
import { SKILLS_DB } from '../data/skills';
import { Link, useNavigate } from 'react-router-dom';
import { 
  GitCompare, 
  Plus, 
  X, 
  BrainCircuit, 
  Zap, 
  Briefcase, 
  ArrowRight, 
  CheckCircle2, 
  Layers,
  Sparkles,
  TrendingUp,
  Target,
  ExternalLink
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function CompareOpportunities() {
  const { userSkills, customSkills, customOpportunities } = useProfile();
  const navigate = useNavigate();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');
  
  const allSkills = [...SKILLS_DB, ...customSkills];
  const allOpps = [...OPPORTUNITIES_DB, ...customOpportunities].map(opp => ({
    ...opp,
    match: calculateMatch(userSkills, opp, allSkills)
  }));

  const categories = ['all', 'Service', 'Product', 'Entrepreneurship', 'Community', 'Technology'];

  const filteredOpps = allOpps.filter(opp => {
    if (activeCategoryFilter === 'all') return true;
    return opp.category === activeCategoryFilter;
  });

  const toggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(prev => prev.filter(i => i !== id));
    } else if (selectedIds.length < 3) {
      setSelectedIds(prev => [...prev, id]);
    }
  };

  const selectedOpps = selectedIds
    .map(id => allOpps.find(o => o && o.id === id))
    .filter((o): o is NonNullable<typeof o> => Boolean(o));

  const compareTopTwo = () => {
    const top = [...allOpps].sort((a, b) => b.match.score - a.match.score).slice(0, 2);
    setSelectedIds(top.map(o => o.id));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-6xl mx-auto pb-16">
      
      {/* 1. Header Banner */}
      <section className="bg-white dark:bg-[#0E1524] rounded-2xl border border-slate-200/90 dark:border-slate-800/80 p-6 md:p-8 shadow-xs transition-colors">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800/70 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400 dark:text-slate-400 uppercase">
                COMPARATIVE DECISION MATRIX
              </span>
              <span className="font-hand text-slate-500 dark:text-slate-400 text-sm italic ml-1">
                “Evaluate before committing.”
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-heading font-bold text-slate-900 dark:text-white tracking-tight">
              Compare Opportunities
            </h1>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
              Select up to 3 pathways to evaluate feasibility, core skill coverage, customer segments, and validation milestones side-by-side.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={compareTopTwo}
              className="px-4 py-2 bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-400 dark:text-blue-200" />
              <span>Auto-Select Top 2 Matches</span>
            </button>
            {selectedIds.length > 0 && (
              <button
                onClick={() => setSelectedIds([])}
                className="px-3 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Pills & Selector Grid */}
        <div className="pt-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              <span className="text-[11px] font-mono font-bold text-slate-400 dark:text-slate-400 uppercase mr-2 shrink-0">Filter:</span>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategoryFilter(cat)}
                  className={cn(
                    "px-3 py-1 rounded-lg text-xs font-medium transition-colors shrink-0 cursor-pointer",
                    activeCategoryFilter === cat
                      ? "bg-slate-900 dark:bg-blue-600 text-white font-semibold"
                      : "bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                  )}
                >
                  {cat === 'all' ? 'All Domains' : cat}
                </button>
              ))}
            </div>

            <span className="text-xs font-mono text-slate-400 dark:text-slate-500 shrink-0 ml-3">
              {selectedIds.length}/3 selected
            </span>
          </div>

          {/* Quick Selection Chips */}
          <div className="flex flex-wrap gap-2 max-h-44 overflow-y-auto p-1 bg-slate-50/70 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-800">
            {filteredOpps.map(opp => {
              const isSelected = selectedIds.includes(opp.id);
              return (
                <button
                  key={opp.id}
                  onClick={() => toggleSelect(opp.id)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-medium transition-all border flex items-center gap-1.5 cursor-pointer text-left",
                    isSelected 
                      ? "bg-slate-900 dark:bg-blue-600 border-slate-900 dark:border-blue-600 text-white shadow-xs" 
                      : "bg-white dark:bg-slate-800/90 border-slate-200 dark:border-slate-700/80 text-slate-700 dark:text-slate-200 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800"
                  )}
                >
                  <span className="truncate max-w-[200px]">{opp.title}</span>
                  {isSelected ? (
                    <X className="w-3.5 h-3.5 shrink-0 text-slate-300 dark:text-slate-200 hover:text-white" />
                  ) : (
                    <Plus className="w-3.5 h-3.5 shrink-0 text-slate-400 dark:text-slate-500" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. Comparison Table or Empty State */}
      {selectedOpps.length > 0 ? (
        <section className="bg-white dark:bg-[#0E1524] rounded-2xl border border-slate-200/90 dark:border-slate-800/80 shadow-xs overflow-hidden transition-colors">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] text-left border-collapse">
              <thead>
                <tr>
                  <th className="p-5 bg-slate-50 dark:bg-slate-900/60 border-b border-r border-slate-200 dark:border-slate-800 w-52 shrink-0">
                    <span className="text-xs font-mono font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider">
                      DECISION CRITERIA
                    </span>
                  </th>
                  {selectedOpps.map(opp => (
                    <th key={opp.id} className="p-5 bg-white dark:bg-[#0E1524] border-b border-r border-slate-200 dark:border-slate-800 last:border-r-0 min-w-[280px] align-top">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[11px] font-mono font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider">
                          {opp.category}
                        </span>
                        <button 
                          onClick={() => toggleSelect(opp.id)} 
                          className="text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 p-1 rounded transition-colors cursor-pointer"
                          title="Remove from comparison"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <h3 className="text-base font-heading font-bold text-slate-900 dark:text-white leading-snug">
                        {opp.title}
                      </h3>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                        {opp.opportunityType}
                      </p>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-xs text-slate-700 dark:text-slate-300 divide-y divide-slate-100 dark:divide-slate-800">
                
                {/* 1. Skill Match Compatibility */}
                <tr>
                  <td className="p-5 bg-slate-50/70 dark:bg-slate-900/40 border-r border-slate-200 dark:border-slate-800 font-semibold text-slate-900 dark:text-white">
                    <div className="flex items-center gap-1.5">
                      <BrainCircuit className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                      <span>Skill Match Score</span>
                    </div>
                  </td>
                  {selectedOpps.map(opp => (
                    <td key={opp.id} className="p-5 border-r border-slate-200 dark:border-slate-800 last:border-r-0 align-top">
                      <MatchScoreBadge 
                        opportunity={opp} 
                        precomputedMatch={opp.match} 
                        variant="card" 
                      />
                    </td>
                  ))}
                </tr>

                {/* 2. Primary Problem Addressed */}
                <tr>
                  <td className="p-5 bg-slate-50/70 dark:bg-slate-900/40 border-r border-slate-200 dark:border-slate-800 font-semibold text-slate-900 dark:text-white">
                    <div className="flex items-center gap-1.5">
                      <Target className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                      <span>Problem Solved</span>
                    </div>
                  </td>
                  {selectedOpps.map(opp => (
                    <td key={opp.id} className="p-5 border-r border-slate-200 dark:border-slate-800 last:border-r-0 align-top">
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                        {opp.problemProfile?.overview || opp.problems?.[0] || 'Grassroots operational inefficiency'}
                      </p>
                    </td>
                  ))}
                </tr>

                {/* 3. Target User Segments */}
                <tr>
                  <td className="p-5 bg-slate-50/70 dark:bg-slate-900/40 border-r border-slate-200 dark:border-slate-800 font-semibold text-slate-900 dark:text-white">
                    <span>Target Customers</span>
                  </td>
                  {selectedOpps.map(opp => (
                    <td key={opp.id} className="p-5 border-r border-slate-200 dark:border-slate-800 last:border-r-0 align-top">
                      <div className="space-y-1">
                        {(opp.usersProfile?.audienceSegments?.map(s => s.segment) || opp.targetUsers || []).map((user, idx) => (
                          <span key={idx} className="inline-block bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 px-2 py-0.5 rounded text-[11px] font-medium mr-1 mb-1 border border-transparent dark:border-slate-700">
                            {user}
                          </span>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* 4. Core Required Skills Status */}
                <tr>
                  <td className="p-5 bg-slate-50/70 dark:bg-slate-900/40 border-r border-slate-200 dark:border-slate-800 font-semibold text-slate-900 dark:text-white">
                    <span>Skill Readiness</span>
                  </td>
                  {selectedOpps.map(opp => (
                    <td key={opp.id} className="p-5 border-r border-slate-200 dark:border-slate-800 last:border-r-0 align-top">
                      {opp.match.missingRequired.length === 0 ? (
                        <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-semibold">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          <span>100% Core Skills Held · Ready</span>
                        </div>
                      ) : (
                        <div className="space-y-1.5">
                          <span className="text-[11px] text-amber-700 dark:text-amber-400 font-semibold block">
                            Missing {opp.match.missingRequired.length} core skill(s):
                          </span>
                          <ul className="space-y-0.5 text-slate-600 dark:text-slate-300">
                            {opp.match.missingRequired.map(id => (
                              <li key={id} className="text-[11px] flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                                <span>{allSkills.find(s => s.id === id)?.name || id}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </td>
                  ))}
                </tr>

                {/* 5. Immediate First Action Step */}
                <tr>
                  <td className="p-5 bg-slate-50/70 dark:bg-slate-900/40 border-r border-slate-200 dark:border-slate-800 font-semibold text-slate-900 dark:text-white">
                    <div className="flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
                      <span>Immediate First Step</span>
                    </div>
                  </td>
                  {selectedOpps.map(opp => (
                    <td key={opp.id} className="p-5 border-r border-slate-200 dark:border-slate-800 last:border-r-0 align-top bg-amber-50/30 dark:bg-amber-950/20">
                      <p className="text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                        {opp.firstStepProfile?.immediateAction || opp.firstStep}
                      </p>
                    </td>
                  ))}
                </tr>

                {/* 6. Action Launchpads */}
                <tr>
                  <td className="p-5 bg-slate-50/70 dark:bg-slate-900/40 border-r border-slate-200 dark:border-slate-800 font-semibold text-slate-900 dark:text-white">
                    <span>Direct Launch</span>
                  </td>
                  {selectedOpps.map(opp => (
                    <td key={opp.id} className="p-5 border-r border-slate-200 dark:border-slate-800 last:border-r-0 align-top">
                      <div className="flex flex-col gap-2">
                        <Link
                          to={`/opportunities/${opp.id}`}
                          className="w-full text-center px-3 py-2 rounded-xl bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                        >
                          <span>Full Pathway</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => navigate(`/business-builder?opportunityId=${opp.id}`)}
                          className="w-full text-center px-3 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Briefcase className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                          <span>Simulate Venture</span>
                        </button>
                      </div>
                    </td>
                  ))}
                </tr>

              </tbody>
            </table>
          </div>
        </section>
      ) : (
        <section className="text-center py-16 bg-white dark:bg-[#0E1524] rounded-2xl border border-slate-200/90 dark:border-slate-800/80 border-dashed p-8 shadow-xs transition-colors">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/60 flex items-center justify-center mx-auto mb-4">
            <GitCompare className="w-6 h-6" />
          </div>
          <h2 className="text-base sm:text-lg font-heading font-bold text-slate-900 dark:text-white mb-1">
            No Opportunities Selected For Comparison
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-6 leading-relaxed">
            Select 2 to 3 pathways above to evaluate required skills, customer segments, difficulty, and financial validation steps.
          </p>
          <button
            onClick={compareTopTwo}
            className="inline-flex items-center gap-2 bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl font-semibold text-xs transition-colors shadow-xs cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-400 dark:text-blue-200" />
            <span>Compare Top 2 Recommendations</span>
          </button>
        </section>
      )}

    </div>
  );
}

