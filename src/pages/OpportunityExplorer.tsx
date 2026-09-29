import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../context/ProfileContext';
import { SKILLS_DB } from '../data/skills';
import { 
  OPPORTUNITIES_DB, 
  OpportunityCategory, 
  calculateMatch,
  getOpportunityCompensation,
  getOpportunityDate
} from '../data/opportunities';
import { MatchScoreBadge } from '../components/opportunities/MatchScoreBadge';
import { 
  Search, Combine, Filter, ArrowRight, BrainCircuit, Sparkles, 
  Loader2, ArrowUpRight, X, Check, CheckCircle2, Info, Lightbulb, RefreshCw, AlertCircle,
  RotateCcw, Compass, HelpCircle, Tag, Globe, TrendingUp, SlidersHorizontal,
  ArrowUpDown, IndianRupee, Calendar, Clock, ChevronDown
} from 'lucide-react';
import { cn } from '../lib/utils';
import { KaushalPathwayBanner } from '../components/common/KaushalPathwayBanner';

export type OpportunitySortOption = 'match' | 'newest' | 'compensation';

const CATEGORIES: OpportunityCategory[] = ['Service', 'Product', 'Entrepreneurship', 'Community', 'Technology', 'Career Pathway'];

const QUICK_SEARCH_TAGS = ['Design', 'Social Media', 'Community', 'Electronics', 'Writing', 'Business'];

const PRESET_COMBOS = [
  { name: "Coding + Design", skillNames: ["Coding", "Graphic Design"], ids: ["coding", "design"] },
  { name: "Electronics + Entrepreneurship", skillNames: ["Electronics", "Financial Literacy"], ids: ["electronics", "financial_literacy"] },
  { name: "Photography + Marketing", skillNames: ["Photography", "Social Media Marketing"], ids: ["photography", "social_media_marketing"] },
  { name: "Writing + Teaching", skillNames: ["Content Writing", "Public Speaking"], ids: ["writing", "public_speaking"] }
];

const TRENDING_WEB_BENCHMARKS = [
  { label: "WhatsApp Kirana Direct-Order Catalog", query: "WhatsApp Business Direct-Order Catalog & UPI Payment Setup for local retail" },
  { label: "Rooftop Solar Diagnostic & Cleaning", query: "Residential Rooftop Solar Efficiency Diagnostic & Cleaning Service" },
  { label: "Short-Form Video & Reels for Cafes", query: "Hyperlocal Short-Form Video & Social Proof Package for Neighborhood Cafes" },
  { label: "Terrace Hydroponic Garden Setup", query: "Automated Urban Balcony & Terrace Hydroponic Herb Garden Micro-Installation" },
  { label: "Tuition Center Invoicing & Scheduling", query: "Automated Student Attendance, Invoicing & Progress Tracking System for Tutors" },
  { label: "Drone Aerial Photography for Events", query: "Affordable Drone Aerial Survey and Event Visual Package" }
];

export default function OpportunityExplorer() {
  const { userSkills, customSkills, customOpportunities, addCustomOpportunity } = useProfile();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTrack, setActiveTrack] = useState<'ALL' | 'WORK' | 'BUILD' | 'LEARN'>('ALL');
  const [activeCategory, setActiveCategory] = useState<OpportunityCategory | 'All'>('All');
  const [matchFilter, setMatchFilter] = useState<'all' | 'high' | 'good'>('all');
  const [sortBy, setSortBy] = useState<OpportunitySortOption>('match');
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | 'Beginner' | 'Intermediate' | 'Advanced'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'freelance' | 'product' | 'service' | 'community'>('all');
  const [selectedForCombine, setSelectedForCombine] = useState<string[]>([]);
  const [combinerSourceTab, setCombinerSourceTab] = useState<'profile' | 'all'>('profile');
  const [combinerMode, setCombinerMode] = useState<'combine' | 'webSearch'>('combine');
  const [webMarketQuery, setWebMarketQuery] = useState('');
  const [skillSearchQuery, setSkillSearchQuery] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);

  // Helper to categorize opportunities into WORK, BUILD, LEARN
  const getOpportunityTrack = (opp: any): 'WORK' | 'BUILD' | 'LEARN' => {
    const cat = (opp.category || '').toLowerCase();
    const type = (opp.opportunityType || '').toLowerCase();
    const title = (opp.title || '').toLowerCase();
    if (cat.includes('career') || type.includes('freelance') || type.includes('intern') || type.includes('job') || type.includes('consult') || title.includes('freelance') || title.includes('internship') || cat.includes('service')) {
      return 'WORK';
    }
    if (cat.includes('learning') || cat.includes('course') || cat.includes('cert') || type.includes('course') || type.includes('study') || type.includes('workshop')) {
      return 'LEARN';
    }
    return 'BUILD';
  };

  const allSkills = useMemo(() => [...SKILLS_DB, ...customSkills], [customSkills]);
  const allOpps = useMemo(() => [...OPPORTUNITIES_DB, ...customOpportunities], [customOpportunities]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: allOpps.length };
    CATEGORIES.forEach(cat => {
      counts[cat] = allOpps.filter(o => o.category === cat).length;
    });
    return counts;
  }, [allOpps]);

  const isFilterOrSortActive = 
    searchTerm.trim() !== '' || 
    activeTrack !== 'ALL' ||
    activeCategory !== 'All' || 
    matchFilter !== 'all' || 
    difficultyFilter !== 'all' || 
    typeFilter !== 'all' || 
    sortBy !== 'match';

  const handleResetAllFilters = () => {
    setSearchTerm('');
    setActiveTrack('ALL');
    setActiveCategory('All');
    setMatchFilter('all');
    setDifficultyFilter('all');
    setTypeFilter('all');
    setSortBy('match');
  };

  const matchedOpps = useMemo(() => {
    return allOpps.map(opp => {
      const match = calculateMatch(userSkills, opp, allSkills);
      const compensation = getOpportunityCompensation(opp);
      const dateInfo = getOpportunityDate(opp);
      return { ...opp, match, compensation, dateInfo };
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
          opp.compensation.label,
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

      const track = getOpportunityTrack(opp);
      const matchesTrack = activeTrack === 'ALL' || track === activeTrack;
      const matchesCategory = activeCategory === 'All' || opp.category === activeCategory;
      const matchesMatch = matchFilter === 'all' 
        ? true 
        : matchFilter === 'high' 
          ? opp.match.score >= 75 
          : opp.match.score >= 50;

      const matchesDifficulty = difficultyFilter === 'all' || opp.difficulty === difficultyFilter;

      const matchesType = typeFilter === 'all' || (() => {
        const t = (opp.opportunityType || '').toLowerCase();
        if (typeFilter === 'freelance') return t.includes('freelance') || t.includes('agency') || t.includes('consult');
        if (typeFilter === 'product') return t.includes('product') || t.includes('hardware') || t.includes('prototyp');
        if (typeFilter === 'service') return t.includes('service') || t.includes('mentor') || t.includes('tutor');
        if (typeFilter === 'community') return t.includes('community') || t.includes('enterprise') || t.includes('venture');
        return true;
      })();

      return matchesSearch && matchesTrack && matchesCategory && matchesMatch && matchesDifficulty && matchesType;
    }).sort((a, b) => {
      if (sortBy === 'match') {
        // 1. Highest Match Score
        if (b.match.score !== a.match.score) {
          return b.match.score - a.match.score;
        }
        // Secondary sort: highest compensation
        return b.compensation.estimatedINR - a.compensation.estimatedINR;
      }
      if (sortBy === 'newest') {
        // 2. Newest by creation timestamp
        if (b.dateInfo.timestamp !== a.dateInfo.timestamp) {
          return b.dateInfo.timestamp - a.dateInfo.timestamp;
        }
        // Secondary sort: match score
        return b.match.score - a.match.score;
      }
      if (sortBy === 'compensation') {
        // 3. Highest Compensation
        if (b.compensation.estimatedINR !== a.compensation.estimatedINR) {
          return b.compensation.estimatedINR - a.compensation.estimatedINR;
        }
        // Secondary sort: match score
        return b.match.score - a.match.score;
      }
      return 0;
    });
  }, [allOpps, userSkills, allSkills, searchTerm, activeTrack, activeCategory, matchFilter, difficultyFilter, typeFilter, sortBy]);

  const fallbackRecommendations = useMemo(() => {
    if (matchedOpps.length > 0) return [];
    return allOpps.map(opp => ({
      ...opp,
      match: calculateMatch(userSkills, opp, allSkills),
      compensation: getOpportunityCompensation(opp),
      dateInfo: getOpportunityDate(opp)
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

  const handleGenerateWebSearch = async (queryToUse?: string) => {
    const q = (queryToUse || webMarketQuery).trim();
    if (!q) {
      setGenerationError('Please enter a market topic or select a benchmark to research.');
      return;
    }
    setIsGenerating(true);
    setGenerationError(null);

    try {
      const res = await fetch('/api/generate-opportunity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q, skillNames: [q] })
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'Failed to synthesize opportunity from web');
      }

      const data = await res.json();
      addCustomOpportunity(data);
      setWebMarketQuery('');
      navigate(`/opportunities/${data.id}`);
    } catch (error: any) {
      console.error("Web search opportunity error:", error);
      setGenerationError('G-ONE could not complete web market research right now. Please try again.');
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
    <div className="space-y-8 animate-in fade-in duration-300 max-w-7xl mx-auto pb-12">
      
      {/* Signature Pathway */}
      <KaushalPathwayBanner 
        currentStep="OPPORTUNITY"
        subtitle="Explore real-world market pathways, freelance gigs, project briefs, and career applications aligned with your skill DNA."
      />

      {/* 1. HEADER & SEARCH (CLEAN EDITORIAL PRESENCE) */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 md:p-8 shadow-xs transition-colors">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase">
                VOCATIONAL PATHWAYS
              </span>
              <span className="font-hand text-slate-500 dark:text-slate-400 text-sm italic ml-1">
                “Look beyond the classroom.”
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-slate-950 dark:text-white tracking-tight mt-1">
              OPPORTUNITIES
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              Where could your skills create value?
            </p>
          </div>
          
          <div className="w-full md:w-80 flex flex-col gap-2">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search pathways, problems, skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 rounded-xl pl-10 pr-9 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-blue-500 transition-colors"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5"
                  title="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            <div className="flex items-center gap-1.5 flex-wrap text-xs text-slate-500 dark:text-slate-400">
              <span className="text-[10px] font-mono text-slate-400 uppercase">Tags:</span>
              {QUICK_SEARCH_TAGS.map(tag => (
                <button
                  key={tag}
                  onClick={() => setSearchTerm(tag)}
                  className="text-[11px] text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 font-medium transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 2. STRUCTURED TRACK ORGANIZER: WORK • BUILD • LEARN */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-6">
          {[
            { id: 'ALL', label: 'ALL PATHWAYS', desc: 'Complete vocational library' },
            { id: 'WORK', label: 'WORK', desc: 'Jobs • Internships • Freelancing' },
            { id: 'BUILD', label: 'BUILD', desc: 'Projects • Services • Products' },
            { id: 'LEARN', label: 'LEARN', desc: 'Courses • Certifications • Further Study' }
          ].map(track => {
            const count = track.id === 'ALL' 
              ? allOpps.length 
              : allOpps.filter(o => getOpportunityTrack(o) === track.id).length;
            const isSelected = activeTrack === track.id;
            return (
              <button
                key={track.id}
                onClick={() => setActiveTrack(track.id as any)}
                className={cn(
                  "p-4 rounded-xl border text-left transition-all group flex flex-col justify-between",
                  isSelected
                    ? "bg-slate-900 dark:bg-blue-600 text-white border-slate-900 dark:border-blue-600 shadow-xs"
                    : "bg-slate-50/70 dark:bg-slate-900/60 border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-100/60 dark:hover:bg-slate-800/60"
                )}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className={cn(
                    "text-xs font-mono font-bold tracking-wider",
                    isSelected ? "text-blue-300 dark:text-white" : "text-slate-800 dark:text-slate-200"
                  )}>
                    {track.label}
                  </span>
                  <span className={cn(
                    "text-[10px] font-mono px-2 py-0.5 rounded-full font-bold",
                    isSelected ? "bg-slate-800 dark:bg-blue-700 text-slate-200 dark:text-white" : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"
                  )}>
                    {count}
                  </span>
                </div>
                <p className={cn(
                  "text-[11px] leading-snug",
                  isSelected ? "text-slate-300 dark:text-blue-100" : "text-slate-500 dark:text-slate-400"
                )}>
                  {track.desc}
                </p>
              </button>
            );
          })}
        </div>
      </section>

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
                <h2 className="text-xl font-bold">
                  {combinerMode === 'combine' ? 'Combine My Skills' : 'Live Web Market Opportunity Search'}
                </h2>
                <span className="bg-amber-400/20 text-amber-300 text-xs px-2 py-0.5 rounded-full font-semibold border border-amber-400/30">
                  {combinerMode === 'combine' ? 'G-ONE Synthesis Engine' : 'Web-Grounded Intelligence'}
                </span>
              </div>
              <p className="text-slate-300 text-xs md:text-sm max-w-2xl">
                {combinerMode === 'combine' 
                  ? 'Select 2 to 4 skills to discover how they intersect into high-value micro-enterprises grounded in live market demand.' 
                  : 'Search the live web for verified student micro-services, local retail digitization, and emerging commercial pathways with INR market rates.'}
              </p>
            </div>

            {/* Mode Switch Pills */}
            <div className="flex items-center gap-1.5 bg-slate-800 p-1 rounded-2xl border border-slate-700">
              <button
                onClick={() => { setCombinerMode('combine'); setGenerationError(null); }}
                className={cn(
                  "px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5",
                  combinerMode === 'combine' ? "bg-blue-600 text-white shadow-sm" : "text-slate-400 hover:text-white"
                )}
              >
                <Combine className="w-3.5 h-3.5" /> Combine Skills
              </button>
              <button
                onClick={() => { setCombinerMode('webSearch'); setGenerationError(null); }}
                className={cn(
                  "px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5",
                  combinerMode === 'webSearch' ? "bg-emerald-600 text-white shadow-sm" : "text-slate-400 hover:text-white"
                )}
              >
                <Globe className="w-3.5 h-3.5" /> Web Market Search
              </button>
            </div>
          </div>

          {combinerMode === 'webSearch' ? (
            /* LIVE WEB MARKET SEARCH PANEL */
            <div className="space-y-5 animate-in fade-in duration-300">
              <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-4 sm:p-5 space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="e.g. WhatsApp retail catalog, solar cleaning, drone real estate videography..."
                      value={webMarketQuery}
                      onChange={(e) => setWebMarketQuery(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter') handleGenerateWebSearch(); }}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <button
                    disabled={isGenerating || !webMarketQuery.trim()}
                    onClick={() => handleGenerateWebSearch()}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-xl text-xs md:text-sm font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-emerald-950/40 shrink-0"
                  >
                    {isGenerating ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Grounding on Web...</>
                    ) : (
                      <><Globe className="w-4 h-4" /> Search Web & Generate</>
                    )}
                  </button>
                </div>

                {/* Trending Web Benchmarks Pills */}
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
                    <TrendingUp className="w-3.5 h-3.5" /> Verified High-Demand Web Benchmarks (Click to Research):
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {TRENDING_WEB_BENCHMARKS.map((item, idx) => (
                      <button
                        key={idx}
                        disabled={isGenerating}
                        onClick={() => handleGenerateWebSearch(item.query)}
                        className="text-xs px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-700/80 border border-slate-700 text-slate-200 hover:border-emerald-500 hover:text-emerald-300 transition-all flex items-center gap-1.5 group text-left"
                      >
                        <Globe className="w-3 h-3 text-emerald-500 group-hover:scale-110 transition-transform shrink-0" />
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* COMBINE PERSONAL SKILLS PANEL */
            <div className="space-y-6">
              {/* Selection Status & Clear */}
              {selectedForCombine.length > 0 && (
                <div className="flex items-center justify-between bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-700">
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
      )}
      </div>
    </div>

      {/* Filtering and Sorting Control Panel */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 md:p-6 shadow-sm space-y-5" id="filter-sort-control-panel">
        
        {/* Panel Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-100 dark:border-blue-900/50 shrink-0">
              <SlidersHorizontal className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm md:text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                Pathway Filtering & Sorting Engine
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Calibrate opportunities by skill match, release date, and economic return
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              {matchedOpps.length} of {allOpps.length} Pathways
            </span>
            {isFilterOrSortActive && (
              <button
                id="reset-controls-top-btn"
                onClick={handleResetAllFilters}
                className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center gap-1 hover:underline px-2.5 py-1.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900/50 transition-colors"
                title="Reset all filters and sorting to default"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reset All
              </button>
            )}
          </div>
        </div>

        {/* PRIMARY SORTING CONTROL PANEL */}
        <div className="bg-slate-50/90 dark:bg-slate-800/60 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-700/60 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 shrink-0">
            <ArrowUpDown className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-xs font-bold uppercase tracking-wider">Sort Pathways:</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 w-full md:w-auto">
            <button
              id="sort-highest-match"
              type="button"
              onClick={() => setSortBy('match')}
              className={cn(
                "px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 border",
                sortBy === 'match'
                  ? "bg-blue-600 text-white border-blue-600 shadow-sm ring-2 ring-blue-600/20"
                  : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white"
              )}
            >
              <BrainCircuit className={cn("w-4 h-4", sortBy === 'match' ? "text-white" : "text-blue-600 dark:text-blue-400")} />
              <span>Highest Match Score</span>
            </button>

            <button
              id="sort-newest"
              type="button"
              onClick={() => setSortBy('newest')}
              className={cn(
                "px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 border",
                sortBy === 'newest'
                  ? "bg-amber-600 text-white border-amber-600 shadow-sm ring-2 ring-amber-600/20"
                  : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white"
              )}
            >
              <Sparkles className={cn("w-4 h-4", sortBy === 'newest' ? "text-white" : "text-amber-500 dark:text-amber-400")} />
              <span>Newest</span>
            </button>

            <button
              id="sort-highest-compensation"
              type="button"
              onClick={() => setSortBy('compensation')}
              className={cn(
                "px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 border",
                sortBy === 'compensation'
                  ? "bg-emerald-600 text-white border-emerald-600 shadow-sm ring-2 ring-emerald-600/20"
                  : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white"
              )}
            >
              <IndianRupee className={cn("w-4 h-4", sortBy === 'compensation' ? "text-white" : "text-emerald-600 dark:text-emerald-400")} />
              <span>Highest Compensation</span>
            </button>
          </div>
        </div>

        {/* SECONDARY FILTER CONTROLS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
          {/* Compatibility Threshold Filter */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <BrainCircuit className="w-3 h-3 text-blue-600 dark:text-blue-400" /> Compatibility Threshold
            </label>
            <select
              id="filter-match-score"
              value={matchFilter}
              onChange={(e) => setMatchFilter(e.target.value as any)}
              className="w-full bg-slate-50 dark:bg-slate-800 hover:bg-white dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 text-xs font-semibold px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              <option value="all">All Match Scores (0% – 100%)</option>
              <option value="high">High Compatibility (≥75% Score)</option>
              <option value="good">Good Match & Ready (≥50% Score)</option>
            </select>
          </div>

          {/* Difficulty Filter */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Compass className="w-3 h-3 text-purple-600 dark:text-purple-400" /> Complexity Level
            </label>
            <select
              id="filter-difficulty"
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value as any)}
              className="w-full bg-slate-50 dark:bg-slate-800 hover:bg-white dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 text-xs font-semibold px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              <option value="all">All Complexity Levels</option>
              <option value="Beginner">Beginner (Foundational)</option>
              <option value="Intermediate">Intermediate (Applied)</option>
              <option value="Advanced">Advanced (Multi-disciplinary)</option>
            </select>
          </div>

          {/* Opportunity Format Filter */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Tag className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> Opportunity Format
            </label>
            <select
              id="filter-type"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as any)}
              className="w-full bg-slate-50 dark:bg-slate-800 hover:bg-white dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 text-xs font-semibold px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              <option value="all">All Formats & Pathways</option>
              <option value="freelance">Freelance / Agency Work</option>
              <option value="product">Product / Hardware Enterprise</option>
              <option value="service">Direct Service / Tutoring</option>
              <option value="community">Community / Grassroots Venture</option>
            </select>
          </div>
        </div>

        {/* Category Pills Row */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 hide-scrollbar">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3 text-slate-400" /> Sector:
            </span>
            <button
              id="category-pill-all"
              onClick={() => setActiveCategory('All')}
              className={cn(
                "px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors border flex items-center gap-1.5",
                activeCategory === 'All' 
                  ? "bg-slate-900 dark:bg-blue-600 text-white border-slate-900 dark:border-blue-600 shadow-xs" 
                  : "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700"
              )}
            >
              <span>All Sectors</span>
              <span className={cn("text-[10px] px-1.5 py-0.2 rounded-full", activeCategory === 'All' ? "bg-slate-800 dark:bg-blue-700 text-slate-200 dark:text-white" : "bg-slate-200/80 dark:bg-slate-700 text-slate-600 dark:text-slate-300")}>
                {allOpps.length}
              </span>
            </button>
            {CATEGORIES.map(cat => {
              const count = categoryCounts[cat] || 0;
              return (
                <button
                  key={cat}
                  id={`category-pill-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors border flex items-center gap-1.5",
                    activeCategory === cat 
                      ? "bg-slate-900 dark:bg-blue-600 text-white border-slate-900 dark:border-blue-600 shadow-xs" 
                      : "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700"
                  )}
                >
                  <span>{cat}</span>
                  <span className={cn("text-[10px] px-1.5 py-0.2 rounded-full", activeCategory === cat ? "bg-slate-800 dark:bg-blue-700 text-slate-200 dark:text-white" : "bg-slate-200/80 dark:bg-slate-700 text-slate-600 dark:text-slate-300")}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Filter & Sort Status Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-slate-500 dark:text-slate-400 font-medium">
              Active View:
            </span>

            {/* Sort Mode Badge */}
            <span className={cn(
              "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-bold border",
              sortBy === 'match' && "bg-blue-50 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-900/50",
              sortBy === 'newest' && "bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-900/50",
              sortBy === 'compensation' && "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900/50"
            )}>
              {sortBy === 'match' && <BrainCircuit className="w-3 h-3 text-blue-600 dark:text-blue-400" />}
              {sortBy === 'newest' && <Sparkles className="w-3 h-3 text-amber-500 dark:text-amber-400" />}
              {sortBy === 'compensation' && <IndianRupee className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />}
              Sorted by: {sortBy === 'match' ? 'Highest Match Score' : sortBy === 'newest' ? 'Newest' : 'Highest Compensation'}
            </span>

            {searchTerm && (
              <span className="inline-flex items-center gap-1.5 bg-blue-50 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-900/50 px-2.5 py-1 rounded-lg font-semibold">
                Search: "{searchTerm}"
                <button onClick={() => setSearchTerm('')} className="hover:text-blue-950 dark:hover:text-white p-0.5" title="Remove search filter">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {activeCategory !== 'All' && (
              <span className="inline-flex items-center gap-1.5 bg-purple-50 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-900/50 px-2.5 py-1 rounded-lg font-semibold">
                Category: {activeCategory}
                <button onClick={() => setActiveCategory('All')} className="hover:text-purple-950 dark:hover:text-white p-0.5" title="Remove category filter">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {matchFilter !== 'all' && (
              <span className="inline-flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/50 px-2.5 py-1 rounded-lg font-semibold">
                Compatibility: {matchFilter === 'high' ? '≥75% Match' : '≥50% Match'}
                <button onClick={() => setMatchFilter('all')} className="hover:text-emerald-950 dark:hover:text-white p-0.5" title="Remove match filter">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {difficultyFilter !== 'all' && (
              <span className="inline-flex items-center gap-1.5 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-900/50 px-2.5 py-1 rounded-lg font-semibold">
                Level: {difficultyFilter}
                <button onClick={() => setDifficultyFilter('all')} className="hover:text-indigo-950 dark:hover:text-white p-0.5" title="Remove difficulty filter">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {typeFilter !== 'all' && (
              <span className="inline-flex items-center gap-1.5 bg-teal-50 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 border border-teal-200 dark:border-teal-900/50 px-2.5 py-1 rounded-lg font-semibold capitalize">
                Format: {typeFilter}
                <button onClick={() => setTypeFilter('all')} className="hover:text-teal-950 dark:hover:text-white p-0.5" title="Remove type filter">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>

          {isFilterOrSortActive && (
            <button
              onClick={handleResetAllFilters}
              className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-semibold flex items-center gap-1 hover:underline ml-auto"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Clear all filters & sort
            </button>
          )}
        </div>
      </div>

      {/* Opportunities Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {matchedOpps.length === 0 ? (
          <div className="col-span-full space-y-8">
            {/* Graceful Empty Feedback Card */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 md:p-12 shadow-sm text-center">
              <div className="w-16 h-16 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-900/50 flex items-center justify-center mx-auto mb-4">
                <Compass className="w-8 h-8" />
              </div>
              
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                {searchTerm && activeCategory !== 'All' ? (
                  <>No pathways match "{searchTerm}" in the {activeCategory} category</>
                ) : searchTerm ? (
                  <>No opportunities match "{searchTerm}"</>
                ) : (
                  <>No pathways found in {activeCategory}</>
                )}
              </h3>
              
              <p className="text-slate-600 dark:text-slate-300 max-w-xl mx-auto mb-8 text-sm leading-relaxed">
                We couldn't find an existing curriculum pathway matching all your current filter criteria. You can easily broaden your scope or build a custom cross-disciplinary project.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="px-4 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold rounded-xl text-xs transition-colors flex items-center gap-2"
                  >
                    <X className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" /> Clear Search Term
                  </button>
                )}
                {activeCategory !== 'All' && (
                  <button
                    onClick={() => setActiveCategory('All')}
                    className="px-4 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold rounded-xl text-xs transition-colors"
                  >
                    View All Categories ({allOpps.length})
                  </button>
                )}
                <button
                  id="reset-empty-filters-btn"
                  onClick={handleResetAllFilters}
                  className="px-4 py-2.5 bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-700 text-white font-semibold rounded-xl text-xs transition-colors flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Reset All Filters & Sorting
                </button>
                <button
                  onClick={() => {
                    const el = document.getElementById('skill-combiner-section');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-4 py-2.5 bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/60 border border-blue-200 dark:border-blue-900/50 font-semibold rounded-xl text-xs transition-colors flex items-center gap-1.5"
                >
                  <BrainCircuit className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" /> Synthesize with G-ONE
                </button>
              </div>

              {/* Suggestions / Guidance */}
              <div className="max-w-2xl mx-auto text-left bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-3">
                  <HelpCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" /> Search Tips & Guidance:
                </div>
                <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                    <span><strong>Generalize keywords:</strong> Try broader terms such as <em>design</em>, <em>electronics</em>, <em>content</em>, <em>marketing</em>, or <em>workshop</em>.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                    <span><strong>Cross-disciplinary pathways:</strong> Many initiatives combine technical skills with service or community orientation. Switch the category filter to <em>All Pathways</em>.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
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
                    <h4 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-500" /> Recommended Alternative Pathways
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Popular pathways from the curriculum ranked by your current skill profile</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {fallbackRecommendations.map(opp => (
                    <div key={opp.id} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-all">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300">
                            {opp.category}
                          </span>
                          <MatchScoreBadge 
                            opportunity={opp} 
                            precomputedMatch={opp.match} 
                            variant="compact" 
                          />
                        </div>
                        <h5 className="font-bold text-slate-900 dark:text-slate-100 text-sm mb-1">{opp.title}</h5>
                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-2">{opp.solution}</p>
                        <div className="text-[11px] text-emerald-800 dark:text-emerald-300 font-semibold mb-4 flex items-center gap-1">
                          <IndianRupee className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                          <span>{opp.compensation.label}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => navigate(`/opportunities/${opp.id}`)}
                        className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1 pt-2 border-t border-slate-100 dark:border-slate-800"
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
          matchedOpps.map(opp => {
            const track = getOpportunityTrack(opp);
            const additionalSkillId = (opp.nextSkills && opp.nextSkills.length > 0)
              ? opp.nextSkills[0]
              : (opp.preferredSkills && opp.preferredSkills.length > 0)
                ? opp.preferredSkills[0]
                : 'communication';
            const addSkillObj = allSkills.find(s => s.id === additionalSkillId);
            const addSkillName = addSkillObj?.name || additionalSkillId;

            return (
              <div 
                key={opp.id} 
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-sm transition-all duration-200 flex flex-col justify-between overflow-hidden"
              >
                <div className="p-6 space-y-4">
                  
                  {/* Top Metadata: Track, Category, Match Score */}
                  <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-900 dark:bg-slate-800 text-white uppercase tracking-wider">
                        {track}
                      </span>
                      <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                        {opp.category}
                      </span>
                      <span className="text-slate-300 dark:text-slate-600">·</span>
                      <span className="text-[11px] font-medium text-slate-400 dark:text-slate-400">
                        {opp.difficulty}
                      </span>
                    </div>

                    <MatchScoreBadge 
                      opportunity={opp} 
                      precomputedMatch={opp.match} 
                      variant="card" 
                    />
                  </div>

                  {/* Opportunity Title */}
                  <div>
                    <h3 className="text-lg sm:text-xl font-heading font-bold text-slate-950 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {opp.title}
                    </h3>
                  </div>

                  {/* Why it matches */}
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-1">
                    <span className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider block">
                      WHY IT MATCHES
                    </span>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {opp.match.explanation || opp.solution}
                    </p>
                  </div>

                  {/* Skills Required */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider block">
                      SKILLS REQUIRED
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {opp.requiredSkills.map(sId => {
                        const s = allSkills.find(sk => sk.id === sId);
                        const hasSkill = userSkills.some(us => us.skillId === sId);
                        return (
                          <span 
                            key={sId} 
                            className={cn(
                              "text-xs px-2.5 py-1 rounded-lg border font-medium flex items-center gap-1",
                              hasSkill 
                                ? "border-emerald-200 dark:border-emerald-900/60 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300" 
                                : "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                            )}
                          >
                            {hasSkill && <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400 stroke-[2.5]" />}
                            <span>{s?.name || sId}</span>
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  {/* Additional Skill */}
                  <div className="pt-2 flex items-center gap-2 text-xs">
                    <span className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider">
                      ADDITIONAL SKILL:
                    </span>
                    <span className="px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900/50 text-blue-900 dark:text-blue-300 font-semibold text-[11px]">
                      + {addSkillName}
                    </span>
                  </div>
                </div>
                
                {/* Clear Action: Explore → */}
                <div className="bg-slate-50/70 dark:bg-slate-800/50 px-6 py-3.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500 dark:text-slate-400">
                    <IndianRupee className="w-3.5 h-3.5 text-slate-400 dark:text-slate-400" />
                    <span className="tabular-nums font-semibold text-slate-700 dark:text-slate-300">{opp.compensation.label}</span>
                  </div>

                  <button 
                    onClick={() => navigate(`/opportunities/${opp.id}`)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-900 dark:text-slate-200 hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
                  >
                    <span>Explore</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
}

