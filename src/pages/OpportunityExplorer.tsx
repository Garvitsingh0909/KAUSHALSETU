import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../context/ProfileContext';
import { SKILLS_DB } from '../data/skills';
import { OPPORTUNITIES_DB, OpportunityCategory, calculateMatch } from '../data/opportunities';
import { 
  Search, Combine, Filter, ArrowRight, BrainCircuit, Sparkles, 
  Loader2, ArrowUpRight, X, Check, Lightbulb, RefreshCw, AlertCircle,
  RotateCcw, Compass, HelpCircle, Tag
} from 'lucide-react';
import { cn } from '../lib/utils';

const CATEGORIES: OpportunityCategory[] = ['Service', 'Product', 'Entrepreneurship', 'Community', 'Technology', 'Career Pathway'];

const QUICK_SEARCH_TAGS = ['Design', 'Social Media', 'Community', 'Electronics', 'Writing', 'Business'];

const PRESET_COMBOS = [
  { name: "Coding + Design", skillNames: ["Coding", "Graphic Design"], ids: ["coding", "design"] },
  { name: "Electronics + Entrepreneurship", skillNames: ["Electronics", "Financial Literacy"], ids: ["electronics", "financial_literacy"] },
  { name: "Photography + Marketing", skillNames: ["Photography", "Social Media Marketing"], ids: ["photography", "social_media_marketing"] },
  { name: "Writing + Teaching", skillNames: ["Content Writing", "Public Speaking"], ids: ["writing", "public_speaking"] }
];

export default function OpportunityExplorer() {
  const { userSkills, customSkills, customOpportunities, addCustomOpportunity } = useProfile();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<OpportunityCategory | 'All'>('All');
  const [selectedForCombine, setSelectedForCombine] = useState<string[]>([]);
  const [combinerSourceTab, setCombinerSourceTab] = useState<'profile' | 'all'>('profile');
  const [skillSearchQuery, setSkillSearchQuery] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);

  const allSkills = useMemo(() => [...SKILLS_DB, ...customSkills], [customSkills]);
  const allOpps = useMemo(() => [...OPPORTUNITIES_DB, ...customOpportunities], [customOpportunities]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: allOpps.length };
    CATEGORIES.forEach(cat => {
      counts[cat] = allOpps.filter(o => o.category === cat).length;
    });
    return counts;
  }, [allOpps]);

  const matchedOpps = useMemo(() => {
    return allOpps.map(opp => {
      const match = calculateMatch(userSkills, opp, allSkills);
      return { ...opp, match };
    }).filter(opp => {
      const term = searchTerm.trim().toLowerCase();
      let matchesSearch = true;
      if (term) {
        const words = term.split(/\s+/).filter(Boolean);
        const skillNames = [
          ...opp.requiredSkills,
          ...(opp.preferredSkills || [])
        ].map(sId => {
          const s = allSkills.find(sk => sk && sk.id === sId);
          return (s?.name || sId).toLowerCase();
        });

        const searchableCorpus = [
          opp.title,
          opp.category,
          opp.opportunityType,
          opp.difficulty,
          opp.solution,
          opp.firstStep,
          opp.problemProfile?.overview,
          opp.solutionProfile?.summary,
          opp.usersProfile?.primaryAudience,
          ...(opp.problems || []),
          ...(opp.targetUsers || []),
          ...(opp.applications || []),
          ...(opp.nextSkills || []),
          ...skillNames
        ].filter(Boolean).join(' ').toLowerCase();

        matchesSearch = words.every(word => searchableCorpus.includes(word));
      }
      const matchesCategory = activeCategory === 'All' || opp.category === activeCategory;
      return matchesSearch && matchesCategory;
    }).sort((a, b) => b.match.score - a.match.score);
  }, [allOpps, userSkills, allSkills, searchTerm, activeCategory]);

  const fallbackRecommendations = useMemo(() => {
    if (matchedOpps.length > 0) return [];
    return allOpps.map(opp => ({
      ...opp,
      match: calculateMatch(userSkills, opp, allSkills)
    })).sort((a, b) => b.match.score - a.match.score).slice(0, 3);
  }, [allOpps, userSkills, allSkills, matchedOpps.length]);

  const toggleCombineSkill = (id: string) => {
    setGenerationError(null);
    if (selectedForCombine.includes(id)) {
      setSelectedForCombine(prev => prev.filter(s => s !== id));
    } else {
      if (selectedForCombine.length >= 4) {
        setGenerationError('You can combine up to 4 skills at a time.');
        return;
      }
      setSelectedForCombine(prev => [...prev, id]);
    }
  };

  const applyPresetCombo = (ids: string[]) => {
    setGenerationError(null);
    setSelectedForCombine(ids);
  };

  const clearSelection = () => {
    setSelectedForCombine([]);
    setGenerationError(null);
  };

  // Check if an existing opportunity matches all selected skills
  const existingExactMatch = useMemo(() => {
    if (selectedForCombine.length < 2) return null;
    return allOpps.find(opp => {
      return selectedForCombine.every(sId => 
        opp.requiredSkills.includes(sId) || opp.preferredSkills.includes(sId)
      );
    });
  }, [selectedForCombine, allOpps]);

  const handleGenerateCustomOpp = async () => {
    if (selectedForCombine.length < 2) {
      setGenerationError('Please select at least 2 skills to combine.');
      return;
    }
    setIsGenerating(true);
    setGenerationError(null);

    try {
      const skillNames = selectedForCombine.map(id => {
        const found = allSkills.find(s => s && s.id === id);
        return found?.name || id;
      });

      const res = await fetch('/api/generate-opportunity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ skillIds: selectedForCombine, skillNames })
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'Failed to synthesize opportunity');
      }

      const data = await res.json();
      addCustomOpportunity(data);
      setSelectedForCombine([]);
      navigate(`/opportunities/${data.id}`);
    } catch (error: any) {
      console.error("Combiner error:", error);
      setGenerationError('G-ONE could not complete synthesis right now. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Available skills to display in Combiner
  const candidateSkills = useMemo(() => {
    let list = combinerSourceTab === 'profile' && userSkills.length > 0
      ? userSkills.map(us => allSkills.find(s => s && s.id === us.skillId)).filter(Boolean) as typeof allSkills
      : allSkills;
    
    list = list.filter(s => s && s.name);

    if (skillSearchQuery.trim()) {
      const q = skillSearchQuery.toLowerCase();
      list = list.filter(s => (s.name?.toLowerCase().includes(q) || s.category?.toLowerCase().includes(q)));
    }
    return list;
  }, [combinerSourceTab, userSkills, allSkills, skillSearchQuery]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto">
      
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" /> CBSE Skill Expo Navigation Engine
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">Opportunity Explorer</h1>
          <p className="text-slate-600 max-w-2xl text-sm leading-relaxed">
            Discover real-world applications for your skills. The G-ONE engine analyzes your profile to rank opportunities based on your strengths, problems you can solve, and interdisciplinary intersections.
          </p>
        </div>
        
        <div className="w-full md:w-80 flex flex-col gap-2">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search problems, solutions, skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-xl pl-11 pr-10 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-colors"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <div className="flex items-center gap-1.5 flex-wrap text-xs text-slate-500">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Try:</span>
            {QUICK_SEARCH_TAGS.map(tag => (
              <button
                key={tag}
                onClick={() => setSearchTerm(tag)}
                className="hover:text-blue-600 hover:underline transition-colors text-slate-600 font-medium"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Dynamic Skill Combiner Section */}
      <div id="skill-combiner-section" className="bg-slate-900 rounded-3xl p-6 md:p-8 text-white relative overflow-hidden shadow-xl border border-slate-800 scroll-mt-6">
        <div className="absolute -right-10 -top-10 text-slate-800 opacity-20 pointer-events-none">
          <Combine className="w-80 h-80" />
        </div>
        
        <div className="relative z-10 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <h2 className="text-xl font-bold">Combine My Skills</h2>
                <span className="bg-amber-400/20 text-amber-300 text-xs px-2 py-0.5 rounded-full font-semibold border border-amber-400/30">
                  G-ONE Synthesis Engine
                </span>
              </div>
              <p className="text-slate-300 text-xs md:text-sm max-w-2xl">
                Select 2 to 4 skills to discover how they intersect into high-value micro-enterprises, community projects, or freelance services.
              </p>
            </div>

            {/* Selection Status & Clear */}
            {selectedForCombine.length > 0 && (
              <div className="flex items-center gap-2 bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-700">
                <span className="text-xs font-semibold text-blue-300">
                  {selectedForCombine.length} of 4 selected
                </span>
                <button
                  onClick={clearSelection}
                  className="text-slate-400 hover:text-white text-xs flex items-center gap-1 ml-2 transition-colors"
                >
                  <X className="w-3.5 h-3.5" /> Clear
                </button>
              </div>
            )}
          </div>

          {/* Quick-Try Preset Combinations */}
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              <Lightbulb className="w-3.5 h-3.5 text-amber-400" /> Try a Popular Cross-Disciplinary Pair:
            </div>
            <div className="flex flex-wrap gap-2">
              {PRESET_COMBOS.map((combo, i) => (
                <button
                  key={i}
                  onClick={() => applyPresetCombo(combo.ids)}
                  className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 transition-colors flex items-center gap-1.5"
                >
                  <span>{combo.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Source Toggle & Search Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-xl border border-slate-700 w-fit">
              <button
                onClick={() => setCombinerSourceTab('profile')}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors",
                  combinerSourceTab === 'profile' ? "bg-blue-600 text-white shadow-sm" : "text-slate-400 hover:text-white"
                )}
              >
                My Profile Skills ({userSkills.length})
              </button>
              <button
                onClick={() => setCombinerSourceTab('all')}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors",
                  combinerSourceTab === 'all' ? "bg-blue-600 text-white shadow-sm" : "text-slate-400 hover:text-white"
                )}
              >
                All Skills Library ({allSkills.length})
              </button>
            </div>

            <div className="relative sm:w-64">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Filter available skills..."
                value={skillSearchQuery}
                onChange={(e) => setSkillSearchQuery(e.target.value)}
                className="w-full bg-slate-800/80 border border-slate-700 rounded-xl pl-9 pr-8 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              {skillSearchQuery && (
                <button
                  onClick={() => setSkillSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white p-0.5"
                  title="Clear filter"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
          
          {/* Skill Selection Badges */}
          <div className="max-h-48 overflow-y-auto pr-2 space-y-2">
            {candidateSkills.length === 0 ? (
              <div className="py-6 text-center text-xs text-slate-400 bg-slate-800/40 rounded-xl border border-slate-800">
                {combinerSourceTab === 'profile' && userSkills.length === 0 ? (
                  <div>
                    <p className="mb-2">You haven't added skills to your profile yet.</p>
                    <button
                      onClick={() => setCombinerSourceTab('all')}
                      className="text-blue-400 hover:underline font-semibold"
                    >
                      Browse All Skills Library →
                    </button>
                  </div>
                ) : (
                  "No skills matching search."
                )}
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {candidateSkills.map(skill => {
                  const isSelected = selectedForCombine.includes(skill.id);
                  return (
                    <button
                      key={skill.id}
                      onClick={() => toggleCombineSkill(skill.id)}
                      className={cn(
                        "px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 border",
                        isSelected 
                          ? "bg-blue-600 border-blue-400 text-white shadow-md transform scale-105" 
                          : "bg-slate-800/90 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white"
                      )}
                    >
                      {isSelected ? <Check className="w-3.5 h-3.5 text-white" /> : null}
                      <span>{skill.name}</span>
                      <span className="text-[10px] opacity-60">({skill.category})</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Notification / Error alert if any */}
          {generationError && (
            <div className="flex items-center gap-2 p-3 bg-red-950/60 border border-red-800/80 rounded-xl text-red-200 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{generationError}</span>
            </div>
          )}

          {/* Curated Pathway Found Notice */}
          {existingExactMatch && (
            <div className="bg-blue-950/60 border border-blue-700/60 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block mb-0.5">
                  Curated Match Found
                </span>
                <h4 className="font-bold text-white text-sm">
                  {existingExactMatch.title}
                </h4>
                <p className="text-xs text-slate-300 line-clamp-1">
                  {existingExactMatch.solution}
                </p>
              </div>
              <button
                onClick={() => navigate(`/opportunities/${existingExactMatch.id}`)}
                className="shrink-0 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 transition-colors"
              >
                View Curated Pathway <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Action Footer */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-slate-800 pt-5 gap-4">
            <div className="text-xs text-slate-400">
              {selectedForCombine.length < 2 ? (
                <span>Pick at least 2 skills to trigger G-ONE cross-disciplinary synthesis</span>
              ) : (
                <span className="text-blue-300 font-medium">
                  {selectedForCombine.map(id => allSkills.find(s => s.id === id)?.name || id).join(' + ')}
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              <button
                disabled={selectedForCombine.length < 2 || isGenerating}
                onClick={handleGenerateCustomOpp}
                className="w-full sm:w-auto bg-white text-slate-900 px-6 py-2.5 rounded-xl text-xs md:text-sm font-bold hover:bg-slate-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm"
              >
                {isGenerating ? (
                  <><Loader2 className="w-4 h-4 animate-spin text-blue-600" /> Synthesizing with G-ONE...</>
                ) : (
                  <><BrainCircuit className="w-4 h-4 text-blue-600" /> Synthesize New Pathway</>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 hide-scrollbar">
          <div className="flex items-center gap-2 text-slate-500 mr-2 shrink-0">
            <Filter className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">Categories:</span>
          </div>
          <button
            onClick={() => setActiveCategory('All')}
            className={cn(
              "px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors border",
              activeCategory === 'All' ? "bg-slate-900 text-white border-slate-900 shadow-sm" : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
            )}
          >
            All Pathways ({allOpps.length})
          </button>
          {CATEGORIES.map(cat => {
            const count = categoryCounts[cat] || 0;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors border flex items-center gap-1.5",
                  activeCategory === cat ? "bg-slate-900 text-white border-slate-900 shadow-sm" : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                )}
              >
                <span>{cat}</span>
                <span className={cn(
                  "text-[10px] px-1.5 py-0.5 rounded-full",
                  activeCategory === cat ? "bg-slate-800 text-slate-200" : "bg-slate-100 text-slate-500"
                )}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Filter Chips & Feedback Bar */}
        {(searchTerm || activeCategory !== 'All') && (
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-slate-500 font-medium">
                Showing <strong className="text-slate-900">{matchedOpps.length}</strong> of <strong className="text-slate-900">{allOpps.length}</strong> pathways
              </span>

              {searchTerm && (
                <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-800 border border-blue-200 px-2.5 py-1 rounded-lg font-semibold">
                  Search: "{searchTerm}"
                  <button onClick={() => setSearchTerm('')} className="hover:text-blue-950 p-0.5" title="Remove search filter">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {activeCategory !== 'All' && (
                <span className="inline-flex items-center gap-1.5 bg-purple-50 text-purple-800 border border-purple-200 px-2.5 py-1 rounded-lg font-semibold">
                  Category: {activeCategory}
                  <button onClick={() => setActiveCategory('All')} className="hover:text-purple-950 p-0.5" title="Remove category filter">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>

            <button
              onClick={() => { setSearchTerm(''); setActiveCategory('All'); }}
              className="text-slate-500 hover:text-slate-900 font-semibold flex items-center gap-1 hover:underline"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* Opportunities Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {matchedOpps.length === 0 ? (
          <div className="col-span-full space-y-8">
            {/* Graceful Empty Feedback Card */}
            <div className="bg-white rounded-3xl border border-slate-200 p-8 md:p-12 shadow-sm text-center">
              <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center mx-auto mb-4">
                <Compass className="w-8 h-8" />
              </div>
              
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">
                {searchTerm && activeCategory !== 'All' ? (
                  <>No pathways match "{searchTerm}" in the {activeCategory} category</>
                ) : searchTerm ? (
                  <>No opportunities match "{searchTerm}"</>
                ) : (
                  <>No pathways found in {activeCategory}</>
                )}
              </h3>
              
              <p className="text-slate-600 max-w-xl mx-auto mb-8 text-sm leading-relaxed">
                We couldn't find an existing curriculum pathway matching all your current filter criteria. You can easily broaden your scope or build a custom cross-disciplinary project.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-xl text-xs transition-colors flex items-center gap-2"
                  >
                    <X className="w-3.5 h-3.5 text-slate-500" /> Clear Search Term
                  </button>
                )}
                {activeCategory !== 'All' && (
                  <button
                    onClick={() => setActiveCategory('All')}
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-xl text-xs transition-colors"
                  >
                    View All Categories ({allOpps.length})
                  </button>
                )}
                <button
                  onClick={() => { setSearchTerm(''); setActiveCategory('All'); }}
                  className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl text-xs transition-colors flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Reset All Filters
                </button>
                <button
                  onClick={() => {
                    const el = document.getElementById('skill-combiner-section');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-4 py-2.5 bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 font-semibold rounded-xl text-xs transition-colors flex items-center gap-1.5"
                >
                  <BrainCircuit className="w-3.5 h-3.5 text-blue-600" /> Synthesize with G-ONE
                </button>
              </div>

              {/* Suggestions / Guidance */}
              <div className="max-w-2xl mx-auto text-left bg-slate-50 rounded-2xl p-6 border border-slate-200">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                  <HelpCircle className="w-4 h-4 text-blue-600" /> Search Tips & Guidance:
                </div>
                <ul className="space-y-2 text-xs text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span><strong>Generalize keywords:</strong> Try broader terms such as <em>design</em>, <em>electronics</em>, <em>content</em>, <em>marketing</em>, or <em>workshop</em>.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span><strong>Cross-disciplinary pathways:</strong> Many initiatives combine technical skills with service or community orientation. Switch the category filter to <em>All Pathways</em>.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span><strong>Generate custom combinations:</strong> Use the <em>Combine My Skills</em> panel above to have the G-ONE engine synthesize a fresh venture from your personal skills.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Fallback Recommendations so user is never stranded */}
            {fallbackRecommendations.length > 0 && (
              <div className="space-y-4 pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-500" /> Recommended Alternative Pathways
                    </h4>
                    <p className="text-xs text-slate-500">Popular pathways from the curriculum ranked by your current skill profile</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {fallbackRecommendations.map(opp => (
                    <div key={opp.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-all">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-50 text-blue-700">
                            {opp.category}
                          </span>
                          <span className="text-xs font-bold text-slate-600">
                            {opp.match.score}% Match
                          </span>
                        </div>
                        <h5 className="font-bold text-slate-900 text-sm mb-1">{opp.title}</h5>
                        <p className="text-xs text-slate-500 line-clamp-2 mb-4">{opp.solution}</p>
                      </div>
                      <button
                        onClick={() => navigate(`/opportunities/${opp.id}`)}
                        className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 pt-2 border-t border-slate-100"
                      >
                        Explore Pathway <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          matchedOpps.map(opp => (
            <div 
              key={opp.id} 
              className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col group hover:shadow-md hover:border-slate-300 transition-all duration-200"
            >
              <div className="p-6 md:p-8 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4 gap-2">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold bg-blue-50 text-blue-700 border border-blue-100 uppercase tracking-wider">
                      {opp.category}
                    </span>
                    <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-600">
                      {opp.difficulty}
                    </span>
                  </div>
                  
                  <div className={cn(
                    "px-3 py-1 rounded-xl text-xs font-bold flex items-center gap-1.5 border",
                    opp.match.score >= 80 ? "bg-emerald-50 text-emerald-800 border-emerald-200" : 
                    opp.match.score >= 50 ? "bg-blue-50 text-blue-800 border-blue-200" : 
                    "bg-slate-100 text-slate-600 border-slate-200"
                  )}>
                    <BrainCircuit className="w-3.5 h-3.5" />
                    {opp.match.score}% Match
                  </div>
                </div>
                
                <h3 className="text-xl font-extrabold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {opp.title}
                </h3>
                
                <p className="text-sm text-slate-600 line-clamp-2 mb-6 leading-relaxed">
                  {opp.solution}
                </p>

                {/* Key Problems Preview */}
                <div className="mb-6 space-y-1.5">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Solves:</span>
                  <p className="text-xs text-slate-700 line-clamp-1 font-medium">
                    • {opp.problems[0]}
                  </p>
                </div>

                {/* Required Skills Badges */}
                <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-slate-100">
                  {opp.requiredSkills.map(sId => {
                    const s = allSkills.find(sk => sk.id === sId);
                    const hasSkill = userSkills.some(us => us.skillId === sId);
                    return (
                      <span 
                        key={sId} 
                        className={cn(
                          "text-xs px-2.5 py-1 rounded-lg border font-medium flex items-center gap-1",
                          hasSkill 
                            ? "border-emerald-200 bg-emerald-50 text-emerald-700" 
                            : "border-slate-200 bg-slate-50 text-slate-600"
                        )}
                      >
                        {hasSkill && <Check className="w-3 h-3 text-emerald-600" />}
                        {s?.name || sId}
                      </span>
                    );
                  })}
                </div>
              </div>
              
              <div className="bg-slate-50 px-6 py-4 flex justify-between items-center border-t border-slate-100">
                <div className="text-xs font-semibold text-slate-500">
                  {opp.opportunityType}
                </div>
                <button 
                  onClick={() => navigate(`/opportunities/${opp.id}`)}
                  className="flex items-center gap-1 text-xs md:text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Full Profile Pathway <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}

