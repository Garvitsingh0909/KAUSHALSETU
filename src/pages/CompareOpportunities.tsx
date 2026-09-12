import React, { useState } from 'react';
import { useProfile } from '../context/ProfileContext';
import { OPPORTUNITIES_DB, calculateMatch } from '../data/opportunities';
import { SKILLS_DB } from '../data/skills';
import { Link } from 'react-router-dom';
import { GitCompare, Plus, X, BrainCircuit, Zap } from 'lucide-react';
import { cn } from '../lib/utils';

export default function CompareOpportunities() {
  const { userSkills, customSkills, customOpportunities } = useProfile();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  
  const allSkills = [...SKILLS_DB, ...customSkills];
  const allOpps = [...OPPORTUNITIES_DB, ...customOpportunities].map(opp => ({
    ...opp,
    match: calculateMatch(userSkills, opp, allSkills)
  }));

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
    <div className="space-y-8 animate-in fade-in duration-500">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2 flex items-center gap-3">
            <GitCompare className="w-8 h-8 text-blue-600" />
            Compare Opportunities
          </h1>
          <p className="text-slate-600 max-w-2xl">
            Select up to 3 opportunities to compare requirements, match scores, and outcomes side-by-side.
          </p>
        </div>
      </div>

      {/* Selector */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-8">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Select to compare (Max 3)</h3>
        <div className="flex flex-wrap gap-2">
          {allOpps.map(opp => {
            const isSelected = selectedIds.includes(opp.id);
            return (
              <button
                key={opp.id}
                onClick={() => toggleSelect(opp.id)}
                className={cn(
                  "px-4 py-2 rounded-xl text-sm font-medium transition-colors border flex items-center gap-2",
                  isSelected 
                    ? "bg-slate-900 border-slate-900 text-white" 
                    : "bg-white border-slate-300 text-slate-700 hover:bg-slate-50"
                )}
              >
                {opp.title}
                {isSelected ? <X className="w-3 h-3" /> : <Plus className="w-3 h-3 text-slate-400" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Comparison Table */}
      {selectedOpps.length > 0 ? (
        <div className="overflow-x-auto bg-white rounded-2xl border border-slate-200 shadow-sm hide-scrollbar">
          <table className="w-full min-w-[800px] text-left border-collapse">
            <thead>
              <tr>
                <th className="p-6 bg-slate-50 border-b border-r border-slate-200 w-48 shrink-0">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Features</span>
                </th>
                {selectedOpps.map((opp, i) => (
                  <th key={opp.id} className="p-6 bg-white border-b border-r border-slate-200 last:border-r-0 min-w-[300px] align-top">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">{opp.category}</span>
                      <button onClick={() => toggleSelect(opp.id)} className="text-slate-400 hover:text-red-500"><X className="w-4 h-4"/></button>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">{opp.title}</h3>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-sm text-slate-700">
              
              {/* Skill Match Row */}
              <tr>
                <td className="p-6 bg-slate-50 border-b border-r border-slate-200 font-semibold text-slate-900 flex items-center gap-2">
                  <BrainCircuit className="w-4 h-4" /> Skill Match
                </td>
                {selectedOpps.map(opp => (
                  <td key={opp.id} className="p-6 border-b border-r border-slate-200 last:border-r-0 align-top">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-slate-900">{opp.match.score}%</span>
                      <span className={cn(
                        "px-2.5 py-1 rounded-md text-xs font-bold",
                        opp.match.score >= 80 ? "bg-emerald-100 text-emerald-800" : 
                        opp.match.score >= 50 ? "bg-blue-100 text-blue-800" : "bg-amber-100 text-amber-800"
                      )}>
                        {opp.match.label}
                      </span>
                    </div>
                  </td>
                ))}
              </tr>

              {/* Type Row */}
              <tr>
                <td className="p-6 bg-slate-50 border-b border-r border-slate-200 font-semibold text-slate-900">
                  Opportunity Type
                </td>
                {selectedOpps.map(opp => (
                  <td key={opp.id} className="p-6 border-b border-r border-slate-200 last:border-r-0 align-top font-medium">
                    {opp.opportunityType}
                  </td>
                ))}
              </tr>

              {/* Required Skills Row */}
              <tr>
                <td className="p-6 bg-slate-50 border-b border-r border-slate-200 font-semibold text-slate-900">
                  Missing Core Skills
                </td>
                {selectedOpps.map(opp => (
                  <td key={opp.id} className="p-6 border-b border-r border-slate-200 last:border-r-0 align-top">
                    {opp.match.missingRequired.length === 0 ? (
                      <span className="text-emerald-600 font-medium">None! Ready to start.</span>
                    ) : (
                      <ul className="list-disc pl-4 space-y-1 text-slate-600">
                        {opp.match.missingRequired.map(id => (
                          <li key={id}>{allSkills.find(s => s.id === id)?.name || id}</li>
                        ))}
                      </ul>
                    )}
                  </td>
                ))}
              </tr>

              {/* Next Skills Row */}
              <tr>
                <td className="p-6 bg-slate-50 border-b border-r border-slate-200 font-semibold text-slate-900">
                  Skills to Develop
                </td>
                {selectedOpps.map(opp => (
                  <td key={opp.id} className="p-6 border-b border-r border-slate-200 last:border-r-0 align-top">
                    <ul className="list-disc pl-4 space-y-1 text-slate-600">
                      {opp.nextSkills.slice(0,3).map((skill, idx) => <li key={idx}>{skill}</li>)}
                    </ul>
                  </td>
                ))}
              </tr>

              {/* First Step Row */}
              <tr>
                <td className="p-6 bg-slate-50 border-r border-slate-200 font-semibold text-slate-900 flex items-center gap-2">
                  <Zap className="w-4 h-4" /> First Step
                </td>
                {selectedOpps.map(opp => (
                  <td key={opp.id} className="p-6 border-r border-slate-200 last:border-r-0 align-top bg-amber-50/50">
                    {opp.firstStep}
                    <div className="mt-4 pt-4 border-t border-amber-100">
                      <Link to={`/opportunities/${opp.id}`} className="text-blue-600 hover:underline font-semibold text-sm">
                        View Full Details →
                      </Link>
                    </div>
                  </td>
                ))}
              </tr>

            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 border-dashed p-8 shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center mx-auto mb-4">
            <GitCompare className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">No Opportunities Selected For Comparison</h2>
          <p className="text-slate-500 max-w-md mx-auto mb-6 text-sm">
            Select up to 3 pathways above to evaluate required skills, difficulty, match scores, and first action steps side-by-side.
          </p>
          <button
            onClick={compareTopTwo}
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl font-semibold text-xs transition-colors shadow-sm"
          >
            <Zap className="w-3.5 h-3.5 text-amber-400" /> Compare Top 2 Recommendations
          </button>
        </div>
      )}

    </div>
  );
}
