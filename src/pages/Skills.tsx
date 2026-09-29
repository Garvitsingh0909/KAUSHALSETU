import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProfile } from '../context/ProfileContext';
import { SKILLS_DB, Proficiency, SkillCategory, Skill } from '../data/skills';
import { Plus, X, Search, CheckCircle2, Sparkles, Loader2, AlertCircle, ShieldCheck, Award, ArrowRight, Zap, TrendingUp, IndianRupee, Layers } from 'lucide-react';
import { cn } from '../lib/utils';
import { enhanceSkillProfile } from '../utils/skillEnhancer';

const PROFICIENCY_LEVELS: Proficiency[] = ['Beginner', 'Developing', 'Intermediate', 'Strong', 'Advanced'];
const CATEGORIES: SkillCategory[] = ['Technical', 'Creative', 'Communication', 'Practical', 'Entrepreneurial'];

export default function Skills() {
  const { userSkills, addSkill, removeSkill, updateProficiency, customSkills, addCustomSkill, getSkillDetails, triggerDemoMode } = useProfile();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<SkillCategory | 'All'>('All');
  const [customSkillName, setCustomSkillName] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [generationSuccess, setGenerationSuccess] = useState<string | null>(null);

  const allAvailableSkills = [...SKILLS_DB, ...customSkills];
  const availableSkills = allAvailableSkills.filter(skill => 
    skill && skill.name &&
    !userSkills.find(us => us && us.skillId === skill.id) &&
    (activeCategory === 'All' || skill.category === activeCategory) &&
    (skill.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     skill.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     skill.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleGenerateSkill = async () => {
    if (!customSkillName.trim()) return;
    setIsGenerating(true);
    setGenerationError(null);
    setGenerationSuccess(null);
    try {
      // First try AI endpoint
      let enhancedSkill: Skill;
      try {
        const res = await fetch('/api/generate-skill', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ skillName: customSkillName.trim() })
        });
        if (res.ok) {
          const rawData = await res.json();
          enhancedSkill = enhanceSkillProfile(rawData);
        } else {
          enhancedSkill = enhanceSkillProfile({ name: customSkillName.trim() });
        }
      } catch {
        enhancedSkill = enhanceSkillProfile({ name: customSkillName.trim() });
      }

      addCustomSkill(enhancedSkill);
      setGenerationSuccess(`Generated and enhanced profile for "${enhancedSkill.name}"!`);
      setCustomSkillName('');
      setTimeout(() => setGenerationSuccess(null), 4000);
    } catch (error) {
      console.error(error);
      setGenerationError('Could not generate skill right now. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const renderProficiencyBar = (currentLevel: Proficiency) => {
    const index = PROFICIENCY_LEVELS.indexOf(currentLevel);
    return (
      <div className="flex gap-1 mt-2">
        {PROFICIENCY_LEVELS.map((level, i) => (
          <div 
            key={level} 
            className={cn(
              "h-2 w-full rounded-full transition-colors",
              i <= index ? "bg-blue-600" : "bg-slate-200"
            )}
            title={level}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Selected Skills Section */}
      <section className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">My Selected Skills ({userSkills.length})</h2>
            <p className="text-xs text-slate-500 mt-0.5">Skills verified in your portfolio for pathway matching</p>
          </div>
          {userSkills.length > 0 && (
            <span className="text-xs font-semibold px-3 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-100 self-start sm:self-auto">
              Ready for Opportunity Matching
            </span>
          )}
        </div>
        
        {userSkills.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 p-6">
            <p className="text-slate-600 font-semibold">You haven't added any skills yet.</p>
            <p className="text-sm text-slate-400 mt-1 max-w-md mx-auto mb-4">Select from the database below to build your profile or load sample curriculum skills.</p>
            <button
              onClick={triggerDemoMode}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Load Demo Skills
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {userSkills.map(us => {
              const skill = getSkillDetails(us.skillId);
              if (!skill) return null;
              return (
                <div key={us.skillId} className="border border-slate-200 rounded-2xl p-5 hover:border-blue-300 transition-all bg-white space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-slate-900 text-base">{skill.name}</h3>
                        {us.indicativeProficiency && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3 text-emerald-600" /> Assessed
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-1.5 mt-1">
                        <span className="text-xs font-semibold text-slate-500 px-2 py-0.5 bg-slate-100 rounded-full inline-block">
                          {skill.category}
                        </span>
                        {skill.estimatedRevenue && (
                          <span className="text-[11px] font-bold text-emerald-700 px-2 py-0.5 bg-emerald-50 border border-emerald-200 rounded-full inline-flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" />
                            {skill.estimatedRevenue.perProject} • {skill.estimatedRevenue.monthlyPotential}/mo
                          </span>
                        )}
                      </div>
                    </div>
                    <button 
                      onClick={() => removeSkill(skill.id)}
                      className="text-slate-400 hover:text-red-500 p-1"
                      title="Remove skill"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {skill.description && (
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {skill.description}
                    </p>
                  )}

                  {/* Dual Proficiency: Self-Reported vs Assessment-Supported */}
                  <div className="space-y-3 pt-2 border-t border-slate-100">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-medium text-slate-600">Self-Reported Level:</span>
                      <select 
                        value={us.proficiency}
                        onChange={(e) => updateProficiency(skill.id, e.target.value as Proficiency)}
                        className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-slate-700 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                      >
                        {PROFICIENCY_LEVELS.map(level => (
                          <option key={level} value={level}>{level}</option>
                        ))}
                      </select>
                    </div>

                    {renderProficiencyBar(us.proficiency)}

                    {/* Assessed Indicative Level (Evidence-Based) */}
                    {us.indicativeProficiency ? (
                      <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200 flex items-center justify-between text-xs">
                        <div className="space-y-0.5">
                          <span className="text-[10px] font-bold text-blue-800 uppercase tracking-wider block">
                            Indicative Level (Assessed):
                          </span>
                          <span className="font-extrabold text-blue-950 text-xs md:text-sm">
                            {us.indicativeProficiency}
                          </span>
                          <span className="text-[10px] text-slate-500 block">
                            {us.evidenceLevel || 'Evidence Supported'}
                          </span>
                        </div>
                        <Link
                          to={`/assessment/${skill.id}`}
                          className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] flex items-center gap-1 shadow-xs transition-colors"
                        >
                          <Zap className="w-3 h-3" />
                          Retake
                        </Link>
                      </div>
                    ) : (
                      <div className="pt-2 flex items-center justify-between">
                        <span className="text-[11px] text-slate-400">No assessment taken yet</span>
                        <Link
                          to={`/assessment/${skill.id}`}
                          className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-[11px] flex items-center gap-1 transition-colors shadow-xs"
                        >
                          <ShieldCheck className="w-3 h-3 text-emerald-400" />
                          Take Assessment
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Skill Database Section */}
      <section className="bg-slate-900 rounded-3xl shadow-xl border border-slate-800 p-6 md:p-8 text-white">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold">Skill Database</h2>
            <p className="text-sm text-slate-400 mt-1">Select skills to add to your profile</p>
          </div>
          
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text"
              placeholder="Search skills..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full bg-slate-850 border border-slate-700 text-white rounded-xl pl-9 pr-8 py-2 text-sm focus:outline-none focus:border-blue-400"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-0.5"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Custom Skill Generator */}
        <div className="mb-6 p-4 bg-slate-850 border border-blue-500/30 rounded-2xl flex flex-col md:flex-row gap-4 items-center justify-between">
          <div>
            <h3 className="font-semibold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-400" />
              Can't find your skill?
            </h3>
            <p className="text-sm text-slate-400">Let G-ONE generate a complete skill profile for you.</p>
          </div>
          <div className="flex w-full md:w-auto gap-2">
            <input 
              type="text"
              placeholder="e.g. 3D Animation"
              value={customSkillName}
              onChange={e => setCustomSkillName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleGenerateSkill()}
              className="w-full md:w-48 bg-slate-800 border border-slate-600 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
            />
            <button
              disabled={!customSkillName || isGenerating}
              onClick={handleGenerateSkill}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2 whitespace-nowrap"
            >
              {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Generate'}
            </button>
          </div>
        </div>

        {generationError && (
          <div className="mb-6 p-3.5 bg-red-900/30 border border-red-500/40 rounded-xl text-red-200 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{generationError}</span>
            </div>
            <button onClick={() => setGenerationError(null)} className="text-red-300 hover:text-white">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {generationSuccess && (
          <div className="mb-6 p-3.5 bg-emerald-900/30 border border-emerald-500/40 rounded-xl text-emerald-200 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{generationSuccess}</span>
            </div>
            <button onClick={() => setGenerationSuccess(null)} className="text-emerald-300 hover:text-white">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        <div className="flex overflow-x-auto pb-2 -mx-2 px-2 gap-2 mb-6 hide-scrollbar">
          <button
            onClick={() => setActiveCategory('All')}
            className={cn(
              "px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors border",
              activeCategory === 'All' 
                ? "bg-blue-600 border-blue-500 text-white" 
                : "bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-700"
            )}
          >
            All Categories
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors border",
                activeCategory === cat 
                  ? "bg-blue-600 border-blue-500 text-white" 
                  : "bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-700"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {availableSkills.length === 0 ? (
            <div className="col-span-full text-center py-12 text-slate-400 bg-slate-950/50 rounded-2xl border border-slate-800 p-6">
              <p className="font-semibold text-slate-200 mb-1">No skills match your search in this view.</p>
              <p className="text-xs text-slate-400 mb-4 max-w-sm mx-auto">
                {searchTerm ? `No skills matching "${searchTerm}". You can generate a custom profile for it above.` : "You have already added all skills from this curriculum category."}
              </p>
              <div className="flex justify-center gap-2">
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-750 text-white text-xs font-semibold rounded-xl transition-colors"
                  >
                    Clear Search
                  </button>
                )}
                {activeCategory !== 'All' && (
                  <button
                    onClick={() => setActiveCategory('All')}
                    className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-750 text-white text-xs font-semibold rounded-xl transition-colors"
                  >
                    View All Categories
                  </button>
                )}
              </div>
            </div>
          ) : (
            availableSkills.map(skill => (
              <button
                key={skill.id}
                onClick={() => addSkill(skill.id)}
                className="text-left bg-slate-850 border border-slate-750 hover:border-blue-400 hover:bg-slate-800 rounded-2xl p-4 transition-all group flex flex-col h-full shadow-sm"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-white group-hover:text-blue-300 transition-colors">{skill.name}</h3>
                  <div className="bg-slate-800 group-hover:bg-blue-600 text-slate-400 group-hover:text-white rounded-full p-1 transition-colors">
                    <Plus className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
                  <span className="text-xs font-medium text-slate-400 px-2 py-0.5 bg-slate-800 rounded-full inline-block w-fit">
                    {skill.category}
                  </span>
                  {skill.estimatedRevenue && (
                    <span className="text-[10px] font-semibold text-emerald-400 px-2 py-0.5 bg-emerald-950/60 border border-emerald-800/60 rounded-full inline-flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {skill.estimatedRevenue.perProject}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400 line-clamp-2 mt-auto leading-relaxed">
                  {skill.description}
                </p>
              </button>
            ))
          )}
        </div>
      </section>

    </div>
  );
}
