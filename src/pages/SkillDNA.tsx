import React, { useMemo, useState } from 'react';
import { useProfile } from '../context/ProfileContext';
import { Proficiency, SkillCategory, SKILLS_DB, Skill } from '../data/skills';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { 
  BrainCircuit, 
  Sparkles, 
  Compass, 
  Layers, 
  Award, 
  ArrowRight, 
  Plus, 
  CheckCircle2, 
  Zap, 
  TrendingUp,
  Cpu,
  Palette,
  MessageSquare,
  Wrench,
  Briefcase,
  Sliders,
  ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { KaushalPathwayBanner } from '../components/common/KaushalPathwayBanner';
import { cn } from '../lib/utils';

const CATEGORIES: SkillCategory[] = [
  'Technical', 
  'Creative', 
  'Communication', 
  'Practical', 
  'Entrepreneurial'
];

const CATEGORY_META: Record<SkillCategory, {
  icon: React.ElementType;
  color: string;
  badgeBg: string;
  textColor: string;
  borderColor: string;
  barColor: string;
  description: string;
}> = {
  Technical: {
    icon: Cpu,
    color: 'from-blue-500 to-indigo-600',
    badgeBg: 'bg-blue-50 dark:bg-blue-950/60',
    textColor: 'text-blue-700 dark:text-blue-400',
    borderColor: 'border-blue-200 dark:border-blue-800',
    barColor: 'bg-blue-600',
    description: 'Computational thinking, programming, data logic, and digital systems.'
  },
  Creative: {
    icon: Palette,
    color: 'from-purple-500 to-pink-600',
    badgeBg: 'bg-purple-50 dark:bg-purple-950/60',
    textColor: 'text-purple-700 dark:text-purple-400',
    borderColor: 'border-purple-200 dark:border-purple-800',
    barColor: 'bg-purple-600',
    description: 'Visual arts, interface layout, content aesthetics, and creative direction.'
  },
  Communication: {
    icon: MessageSquare,
    color: 'from-emerald-500 to-teal-600',
    badgeBg: 'bg-emerald-50 dark:bg-emerald-950/60',
    textColor: 'text-emerald-700 dark:text-emerald-400',
    borderColor: 'border-emerald-200 dark:border-emerald-800',
    barColor: 'bg-emerald-600',
    description: 'Stakeholder storytelling, client discussions, active listening, and teamwork.'
  },
  Practical: {
    icon: Wrench,
    color: 'from-amber-500 to-orange-600',
    badgeBg: 'bg-amber-50 dark:bg-amber-950/60',
    textColor: 'text-amber-700 dark:text-amber-400',
    borderColor: 'border-amber-200 dark:border-amber-800',
    barColor: 'bg-amber-600',
    description: 'Hands-on hardware, assembly, electronics, prototyping, and troubleshooting.'
  },
  Entrepreneurial: {
    icon: Briefcase,
    color: 'from-rose-500 to-red-600',
    badgeBg: 'bg-rose-50 dark:bg-rose-950/60',
    textColor: 'text-rose-700 dark:text-rose-400',
    borderColor: 'border-rose-200 dark:border-rose-800',
    barColor: 'bg-rose-600',
    description: 'Market research, customer needs discovery, pricing models, and execution.'
  }
};

const PROFICIENCY_WEIGHTS: Record<Proficiency, number> = {
  Beginner: 1,
  Developing: 2,
  Intermediate: 3,
  Strong: 4,
  Advanced: 5
};

const PROFICIENCY_LEVELS: Proficiency[] = [
  'Beginner', 
  'Developing', 
  'Intermediate', 
  'Strong', 
  'Advanced'
];

interface ArchetypeProfile {
  title: string;
  tagline: string;
  summary: string;
  dominantDomains: string[];
  superpower: string;
}

function determineArchetype(rankedCategories: { category: SkillCategory; score: number }[]): ArchetypeProfile {
  const top1 = rankedCategories[0];
  const top2 = rankedCategories[1];

  if (!top1 || top1.score === 0) {
    return {
      title: 'Emerging Explorer',
      tagline: 'Building foundational competencies across core disciplines',
      summary: 'You are at the beginning of mapping your multidisciplinary skillset. Add your skills and calibrate proficiency levels to uncover your dominant archetype.',
      dominantDomains: ['General Exploration'],
      superpower: 'Curiosity & broad foundational readiness'
    };
  }

  const c1 = top1.category;
  const c2 = top2?.category || top1.category;

  if (c1 === 'Technical' && c2 === 'Creative') {
    return {
      title: 'Creative Technologist',
      tagline: 'Bridging technical logic with high-impact visual delivery',
      summary: 'You synthesize code and interactive digital experiences with aesthetic sensitivity. You excel at building intuitive apps, digital assets, and user-facing tools.',
      dominantDomains: ['Technical', 'Creative'],
      superpower: 'Rapid prototyping with immediate visual polish'
    };
  }

  if (c1 === 'Technical' && c2 === 'Entrepreneurial') {
    return {
      title: 'Tech Venture Builder',
      tagline: 'Transforming code and automation into sustainable business models',
      summary: 'You pair technical execution with market awareness. You spot inefficiencies and build scalable software or automated service pipelines.',
      dominantDomains: ['Technical', 'Entrepreneurial'],
      superpower: 'Autonomous end-to-end product deployment'
    };
  }

  if (c1 === 'Creative' && c2 === 'Communication') {
    return {
      title: 'Brand & Story Strategist',
      tagline: 'Crafting compelling narratives and memorable visual identities',
      summary: 'You connect audiences with ideas through visual design and clear messaging. You excel in brand development, campaign direction, and client presentations.',
      dominantDomains: ['Creative', 'Communication'],
      superpower: 'Transforming complex concepts into resonant messages'
    };
  }

  if (c1 === 'Practical' && c2 === 'Technical') {
    return {
      title: 'Systems & Hardware Innovator',
      tagline: 'Connecting digital intelligence to physical devices and electronics',
      summary: 'You build and troubleshoot physical-digital systems, robotics, and IoT hardware. You understand circuits, sensor data, and hands-on assembly.',
      dominantDomains: ['Practical', 'Technical'],
      superpower: 'Tangible physical problem solving'
    };
  }

  return {
    title: `${c1} & ${c2} Multi-Disciplinary Catalyst`,
    tagline: `Dual-strength synergy across ${c1} and ${c2}`,
    summary: `Your combined strengths across ${c1} and ${c2} give you a distinct advantage in tackling complex real-world challenges from multiple perspectives.`,
    dominantDomains: [c1, c2],
    superpower: `Versatile multidisciplinary problem solving`
  };
}

export default function SkillDNA() {
  const { userSkills, allSkills, getSkillDetails, updateProficiency, triggerDemoMode } = useProfile();
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory | 'All'>('All');

  // Compute DNA statistics per category
  const categoryStats = useMemo(() => {
    const stats: Record<SkillCategory, {
      category: SkillCategory;
      skills: Array<{ skill: Skill; proficiency: Proficiency }>;
      totalPoints: number;
      maxPossiblePoints: number;
      avgScorePercent: number;
      skillCount: number;
      strengthLevel: 'Foundational' | 'Developing' | 'Proficient' | 'Advanced' | 'Mastery';
    }> = {
      Technical: { category: 'Technical', skills: [], totalPoints: 0, maxPossiblePoints: 0, avgScorePercent: 0, skillCount: 0, strengthLevel: 'Foundational' },
      Creative: { category: 'Creative', skills: [], totalPoints: 0, maxPossiblePoints: 0, avgScorePercent: 0, skillCount: 0, strengthLevel: 'Foundational' },
      Communication: { category: 'Communication', skills: [], totalPoints: 0, maxPossiblePoints: 0, avgScorePercent: 0, skillCount: 0, strengthLevel: 'Foundational' },
      Practical: { category: 'Practical', skills: [], totalPoints: 0, maxPossiblePoints: 0, avgScorePercent: 0, skillCount: 0, strengthLevel: 'Foundational' },
      Entrepreneurial: { category: 'Entrepreneurial', skills: [], totalPoints: 0, maxPossiblePoints: 0, avgScorePercent: 0, skillCount: 0, strengthLevel: 'Foundational' },
    };

    userSkills.forEach(us => {
      const skill = getSkillDetails(us.skillId);
      if (skill && stats[skill.category]) {
        const weight = PROFICIENCY_WEIGHTS[us.proficiency] || 1;
        stats[skill.category].skills.push({ skill, proficiency: us.proficiency });
        stats[skill.category].totalPoints += weight;
        stats[skill.category].maxPossiblePoints += 5;
        stats[skill.category].skillCount += 1;
      }
    });

    CATEGORIES.forEach(cat => {
      const catObj = stats[cat];
      if (catObj.skillCount > 0) {
        catObj.avgScorePercent = Math.round((catObj.totalPoints / catObj.maxPossiblePoints) * 100);
      } else {
        catObj.avgScorePercent = 0;
      }

      if (catObj.avgScorePercent >= 80) catObj.strengthLevel = 'Mastery';
      else if (catObj.avgScorePercent >= 65) catObj.strengthLevel = 'Advanced';
      else if (catObj.avgScorePercent >= 50) catObj.strengthLevel = 'Proficient';
      else if (catObj.avgScorePercent >= 25) catObj.strengthLevel = 'Developing';
      else catObj.strengthLevel = 'Foundational';
    });

    return stats;
  }, [userSkills, getSkillDetails]);

  // Radar chart data
  const radarData = useMemo(() => {
    const dimensionLabels: Record<SkillCategory, string> = {
      Technical: 'Technical',
      Creative: 'Creative',
      Communication: 'Communication',
      Practical: 'Practical',
      Entrepreneurial: 'Venture'
    };

    return CATEGORIES.map(cat => ({
      subject: dimensionLabels[cat],
      score: categoryStats[cat].avgScorePercent,
      skillCount: categoryStats[cat].skillCount,
      totalPoints: categoryStats[cat].totalPoints,
      fullMark: 100
    }));
  }, [categoryStats]);

  // Overall DNA Balance Index
  const overallDnaScore = useMemo(() => {
    const scores = CATEGORIES.map(c => categoryStats[c].avgScorePercent);
    const activeCategories = scores.filter(s => s > 0);
    if (activeCategories.length === 0) return 0;
    return Math.round(scores.reduce((a, b) => a + b, 0) / CATEGORIES.length);
  }, [categoryStats]);

  // Ranked categories to derive Archetype
  const rankedCategories = useMemo(() => {
    return [...CATEGORIES]
      .map(cat => ({ category: cat, score: categoryStats[cat].avgScorePercent }))
      .sort((a, b) => b.score - a.score);
  }, [categoryStats]);

  const archetype = useMemo(() => {
    return determineArchetype(rankedCategories);
  }, [rankedCategories]);

  // Complementary recommendations
  const suggestedComplementarySkills = useMemo(() => {
    const userSkillIdSet = new Set(userSkills.map(s => s.skillId));
    const lowestActive = [...CATEGORIES]
      .sort((a, b) => categoryStats[a].avgScorePercent - categoryStats[b].avgScorePercent);

    const targetCategories = lowestActive.slice(0, 2);
    const suggestions: Skill[] = [];

    targetCategories.forEach(cat => {
      const candidates = allSkills.filter(s => s.category === cat && !userSkillIdSet.has(s.id));
      if (candidates.length > 0) {
        suggestions.push(candidates[0]);
      }
    });

    return suggestions;
  }, [userSkills, categoryStats, allSkills]);

  if (userSkills.length === 0) {
    return (
      <div className="space-y-6 max-w-2xl mx-auto my-8 pb-16">
        <KaushalPathwayBanner currentStep="CAPABILITY" />
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 md:p-12 border border-slate-200/90 dark:border-slate-800 shadow-xs text-center">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 flex items-center justify-center mx-auto mb-4">
            <BrainCircuit className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-heading font-bold text-slate-900 dark:text-white mb-2">Build Your Skill DNA Profile</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-6 text-xs max-w-md mx-auto leading-relaxed">
            Add skills to your profile to visualize your multidimensional competency signature across Technical, Creative, Communication, Practical, and Entrepreneurial domains.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link 
              to="/skills" 
              className="bg-slate-950 dark:bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold text-xs hover:bg-slate-800 dark:hover:bg-blue-700 transition-colors shadow-xs inline-flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Skills from Database</span>
            </Link>
            <button
              onClick={triggerDemoMode}
              className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 px-5 py-2.5 rounded-xl font-semibold text-xs hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors inline-flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Load Sample Profile</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-7 animate-in fade-in duration-300 max-w-6xl mx-auto pb-16">
      
      {/* 1. Signature Pathway */}
      <KaushalPathwayBanner 
        currentStep="CAPABILITY"
        subtitle="Your Skill DNA visualizes your multi-domain capability and unique vocational combinations."
      />

      {/* 2. Header & DNA Archetype Banner */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl shadow-xs border border-slate-200/90 dark:border-slate-800 p-6 md:p-8 space-y-6 transition-colors">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-950 dark:bg-blue-600 text-white rounded-xl flex items-center justify-center shadow-xs">
              <BrainCircuit className="w-5 h-5 text-blue-400 dark:text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl md:text-2xl font-heading font-bold text-slate-900 dark:text-white">Your Skill DNA</h1>
                <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                  {userSkills.length} SKILLS
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Multi-dimensional capability footprint</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link 
              to="/skills" 
              className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 font-semibold text-xs flex items-center gap-1.5 transition-colors"
            >
              <Sliders className="w-3.5 h-3.5 text-slate-500" />
              <span>Adjust Proficiencies</span>
            </Link>
            <Link 
              to="/opportunities" 
              className="px-3.5 py-2 rounded-xl bg-slate-950 dark:bg-blue-600 text-white hover:bg-slate-800 dark:hover:bg-blue-700 font-semibold text-xs flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <Compass className="w-3.5 h-3.5 text-blue-400 dark:text-white" />
              <span>Explore Pathways</span>
            </Link>
          </div>
        </div>

        {/* Archetype Hero Card */}
        <div className="p-6 rounded-xl bg-slate-900 dark:bg-slate-950 text-white border border-slate-800 space-y-4 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-1.5 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-blue-400 bg-blue-950/70 px-2 py-0.5 rounded border border-blue-800/40">
                  PRIMARY DNA ARCHETYPE
                </span>
                <span className="text-xs font-mono text-slate-400">
                  Index: <strong className="text-white">{overallDnaScore}/100</strong>
                </span>
              </div>
              <h2 className="text-xl md:text-2xl font-heading font-bold text-white">
                {archetype.title}
              </h2>
              <p className="text-xs text-blue-200/90 font-medium">
                {archetype.tagline}
              </p>
              <p className="text-xs text-slate-400 leading-relaxed pt-0.5">
                {archetype.summary}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/70 border border-slate-700/60 shrink-0 lg:max-w-xs space-y-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-400 block">
                CORE STRENGTH
              </span>
              <p className="text-xs font-semibold text-white leading-snug">
                {archetype.superpower}
              </p>
              <div className="pt-2 border-t border-slate-700 flex flex-wrap gap-1">
                {archetype.dominantDomains.map(d => (
                  <span key={d} className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-slate-700 text-slate-200">
                    {d}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main 2-Column: Radar Chart + Domain Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2">
          
          {/* Radar Chart (Left) */}
          <div className="lg:col-span-6 bg-slate-50/80 dark:bg-slate-800/40 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 md:p-6 flex flex-col items-center justify-center">
            <div className="w-full flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <BrainCircuit className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>COMPETENCY RADAR</span>
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                5 DIMENSIONS
              </span>
            </div>

            <div className="h-[300px] md:h-[340px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="72%" data={radarData}>
                  <PolarGrid stroke="#94a3b8" strokeOpacity={0.3} />
                  <PolarAngleAxis 
                    dataKey="subject" 
                    tick={{ fill: '#64748b', fontSize: 11, fontWeight: 600 }} 
                  />
                  <PolarRadiusAxis 
                    angle={90} 
                    domain={[0, 100]} 
                    tick={{ fill: '#94a3b8', fontSize: 9 }}
                    stroke="#cbd5e1"
                    strokeOpacity={0.4}
                  />
                  <Radar
                    name="Proficiency Score"
                    dataKey="score"
                    stroke="#2563eb"
                    strokeWidth={2}
                    fill="#3b82f6"
                    fillOpacity={0.4}
                  />
                  <Tooltip 
                    formatter={(value: any, name: any, item: any) => [
                      `${value}% (${item.payload.skillCount} skills, ${item.payload.totalPoints} pts)`, 
                      'Domain Score'
                    ]}
                    contentStyle={{ borderRadius: '8px', border: '1px solid #334155', background: '#0f172a', color: '#f8fafc', fontSize: '11px' }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <div className="w-full pt-3 border-t border-slate-200/80 dark:border-slate-700/60 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-mono">
              <span>Center: 0%</span>
              <span className="font-semibold text-slate-700 dark:text-slate-300">Outer Ring: 100%</span>
              <span>Normalized by Proficiency</span>
            </div>
          </div>

          {/* Quick Domain Matrix Breakdown (Right) */}
          <div className="lg:col-span-6 space-y-3">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-mono font-bold text-slate-400 dark:text-slate-500 text-xs uppercase tracking-wider">
                DOMAIN COMPETENCY BREAKDOWN
              </h3>
              <span className="text-[11px] text-slate-400">
                Click to filter
              </span>
            </div>

            <div className="space-y-2.5">
              {CATEGORIES.map(cat => {
                const stat = categoryStats[cat];
                const meta = CATEGORY_META[cat];
                const Icon = meta.icon;
                const isSelected = selectedCategory === cat;

                return (
                  <div 
                    key={cat}
                    onClick={() => setSelectedCategory(prev => prev === cat ? 'All' : cat)}
                    className={cn(
                      "p-3 rounded-xl border transition-all cursor-pointer",
                      isSelected 
                        ? "border-blue-500 bg-blue-50/40 dark:bg-blue-950/40 ring-2 ring-blue-500/20 shadow-2xs" 
                        : "border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700"
                    )}
                  >
                    <div className="flex items-center justify-between gap-3 mb-1.5">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-7 h-7 rounded-lg ${meta.badgeBg} ${meta.textColor} flex items-center justify-center`}>
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-heading font-bold text-xs text-slate-900 dark:text-white">{cat}</h4>
                            <span className={`px-2 py-0.2 rounded-md text-[9px] font-mono font-bold ${meta.badgeBg} ${meta.textColor}`}>
                              {stat.strengthLevel}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="font-mono font-bold text-xs text-slate-900 dark:text-white">
                          {stat.avgScorePercent}%
                        </span>
                      </div>
                    </div>

                    <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${meta.barColor} transition-all duration-500 rounded-full`}
                        style={{ width: `${Math.max(4, stat.avgScorePercent)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Categorized Skill Inventory */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-heading font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Skill Inventory by Domain</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Interactive proficiency levels contributing to your real-time Skill DNA
            </p>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            <button
              onClick={() => setSelectedCategory('All')}
              className={cn(
                "px-3 py-1 rounded-lg text-xs font-semibold transition-colors",
                selectedCategory === 'All' 
                  ? "bg-slate-900 dark:bg-blue-600 text-white" 
                  : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
              )}
            >
              All Domains
            </button>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "px-3 py-1 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap",
                  selectedCategory === cat 
                    ? "bg-slate-900 dark:bg-blue-600 text-white" 
                    : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                )}
              >
                {cat} ({categoryStats[cat].skillCount})
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CATEGORIES
            .filter(cat => selectedCategory === 'All' || selectedCategory === cat)
            .map(cat => {
              const stat = categoryStats[cat];
              const meta = CATEGORY_META[cat];
              const Icon = meta.icon;

              return (
                <div 
                  key={cat}
                  className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-5 shadow-xs flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-8 h-8 rounded-xl ${meta.badgeBg} ${meta.textColor} flex items-center justify-center`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="font-heading font-bold text-xs sm:text-sm text-slate-900 dark:text-white">{cat}</h4>
                          <span className="text-[10px] text-slate-500 dark:text-slate-400">
                            {stat.skillCount} active {stat.skillCount === 1 ? 'skill' : 'skills'}
                          </span>
                        </div>
                      </div>

                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                        {stat.avgScorePercent}%
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      {meta.description}
                    </p>

                    <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                      {stat.skills.length === 0 ? (
                        <div className="py-3 px-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 text-center border border-dashed border-slate-200 dark:border-slate-700">
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-1.5">No skills in this domain yet.</p>
                          <Link
                            to="/skills"
                            className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                          >
                            <Plus className="w-3 h-3" />
                            <span>Add {cat} Skill</span>
                          </Link>
                        </div>
                      ) : (
                        stat.skills.map(({ skill, proficiency }) => (
                          <div 
                            key={skill.id}
                            className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-700/60 space-y-1.5"
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-heading font-bold text-xs text-slate-900 dark:text-white truncate">
                                {skill.name}
                              </span>
                              <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded ${meta.badgeBg} ${meta.textColor}`}>
                                {proficiency}
                              </span>
                            </div>

                            <div className="grid grid-cols-5 gap-1">
                              {PROFICIENCY_LEVELS.map(lvl => {
                                const isActive = lvl === proficiency;
                                return (
                                  <button
                                    key={lvl}
                                    onClick={() => updateProficiency(skill.id, lvl)}
                                    title={`Set to ${lvl}`}
                                    className={cn(
                                      "py-0.5 text-[9px] font-mono font-semibold rounded transition-all text-center cursor-pointer",
                                      isActive
                                        ? "bg-slate-900 dark:bg-blue-600 text-white shadow-2xs"
                                        : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                                    )}
                                  >
                                    {lvl.slice(0, 3)}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <Link
                      to="/skills"
                      className="text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white inline-flex items-center gap-1"
                    >
                      <span>Manage Skills</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
        </div>
      </section>

      {/* 4. Complementary Recommendations */}
      {suggestedComplementarySkills.length > 0 && (
        <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 shadow-xs space-y-4 transition-colors">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <h3 className="font-heading font-bold text-slate-900 dark:text-white text-base flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-500" />
                <span>Recommended Complementary Additions</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Adding skills in your lighter domains builds well-rounded multidisciplinary leverage
              </p>
            </div>

            <Link
              to="/opportunities"
              className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors inline-flex items-center gap-1"
            >
              <span>Explore Applications</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {suggestedComplementarySkills.map(skill => {
              const meta = CATEGORY_META[skill.category];
              const Icon = meta.icon;

              return (
                <div 
                  key={skill.id}
                  className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors flex flex-col justify-between gap-3"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-7 h-7 rounded-lg ${meta.badgeBg} ${meta.textColor} flex items-center justify-center`}>
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <h4 className="font-heading font-bold text-xs sm:text-sm text-slate-900 dark:text-white">{skill.name}</h4>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold ${meta.badgeBg} ${meta.textColor}`}>
                        {skill.category}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                      {skill.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                      Unlocks: {(skill.applications || []).slice(0, 1).join('') || 'Practical projects'}
                    </span>
                    <Link
                      to="/skills"
                      className="px-3 py-1 rounded-lg bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-700 text-white font-semibold text-xs transition-colors inline-flex items-center gap-1 shadow-2xs"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add to Profile</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

    </div>
  );
}
