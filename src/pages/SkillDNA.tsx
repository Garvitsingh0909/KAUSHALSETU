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
    badgeBg: 'bg-blue-50',
    textColor: 'text-blue-700',
    borderColor: 'border-blue-200',
    barColor: 'bg-blue-600',
    description: 'Computational thinking, programming, analytics, and digital architectures.'
  },
  Creative: {
    icon: Palette,
    color: 'from-purple-500 to-pink-600',
    badgeBg: 'bg-purple-50',
    textColor: 'text-purple-700',
    borderColor: 'border-purple-200',
    barColor: 'bg-purple-600',
    description: 'Visual arts, UI/UX, content production, aesthetic direction, and design.'
  },
  Communication: {
    icon: MessageSquare,
    color: 'from-emerald-500 to-teal-600',
    badgeBg: 'bg-emerald-50',
    textColor: 'text-emerald-700',
    borderColor: 'border-emerald-200',
    barColor: 'bg-emerald-600',
    description: 'Storytelling, public speaking, negotiation, client relations, and leadership.'
  },
  Practical: {
    icon: Wrench,
    color: 'from-amber-500 to-orange-600',
    badgeBg: 'bg-amber-50',
    textColor: 'text-amber-700',
    borderColor: 'border-amber-200',
    barColor: 'bg-amber-600',
    description: 'Hands-on hardware, assembly, electronics, physical logistics, and maintenance.'
  },
  Entrepreneurial: {
    icon: Briefcase,
    color: 'from-rose-500 to-red-600',
    badgeBg: 'bg-rose-50',
    textColor: 'text-rose-700',
    borderColor: 'border-rose-200',
    barColor: 'bg-rose-600',
    description: 'Market research, unit economics, sales validation, and venture modeling.'
  }
};

const PROFICIENCY_WEIGHTS: Record<Proficiency, number> = {
  Beginner: 1,
  Developing: 2,
  Intermediate: 3,
  Strong: 4,
  Advanced: 5
};

const PROFICIENCY_PERCENTAGES: Record<Proficiency, number> = {
  Beginner: 20,
  Developing: 40,
  Intermediate: 60,
  Strong: 80,
  Advanced: 100
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

  // If balanced across all top categories
  const minScore = rankedCategories[rankedCategories.length - 1].score;
  const maxScore = top1.score;
  if (minScore > 0 && (maxScore - minScore) <= 20) {
    return {
      title: 'Multidisciplinary Polymath',
      tagline: 'Harmoniously balanced across technological, creative, and commercial fields',
      summary: 'You possess a rare, well-rounded balance across all disciplines. This enables you to bridge disparate teams, translate ideas across departments, and orchestrate complex end-to-end projects.',
      dominantDomains: ['Technical', 'Creative', 'Communication', 'Practical', 'Entrepreneurial'],
      superpower: 'Cross-functional synthesis and systemic versatility'
    };
  }

  const c1 = top1.category;
  const c2 = top2 && top2.score > 0 ? top2.category : null;

  // Domain Pairings
  if ((c1 === 'Technical' && c2 === 'Creative') || (c1 === 'Creative' && c2 === 'Technical')) {
    return {
      title: 'Creative Technologist',
      tagline: 'Bridging algorithmic logic with high-impact visual & interactive design',
      summary: 'You combine computational precision with aesthetic intuition. You can both design experiences that engage humans and build the technical architecture that powers them.',
      dominantDomains: ['Technical', 'Creative'],
      superpower: 'Rapid prototyping of engaging digital products & user experiences'
    };
  }

  if ((c1 === 'Technical' && c2 === 'Entrepreneurial') || (c1 === 'Entrepreneurial' && c2 === 'Technical')) {
    return {
      title: 'Venture Architect',
      tagline: 'Engineering scalable systems with acute commercial viability',
      summary: 'You build digital solutions with a sharp instinct for unit economics and market demand. You don\'t just write code; you create sustainable software products and automated ventures.',
      dominantDomains: ['Technical', 'Entrepreneurial'],
      superpower: 'Translating technical capabilities into revenue-generating business models'
    };
  }

  if ((c1 === 'Technical' && c2 === 'Communication') || (c1 === 'Communication' && c2 === 'Technical')) {
    return {
      title: 'Technical Evangelist & Strategist',
      tagline: 'Translating complex engineering architectures into accessible client value',
      summary: 'You possess the rare ability to grasp deep technical complexity and articulate it persuasively to non-technical stakeholders, clients, and partners.',
      dominantDomains: ['Technical', 'Communication'],
      superpower: 'Solution consulting, stakeholder alignment, and consultative sales'
    };
  }

  if ((c1 === 'Technical' && c2 === 'Practical') || (c1 === 'Practical' && c2 === 'Technical')) {
    return {
      title: 'Systems & Hardware Engineer',
      tagline: 'Integrating computational software with physical hardware execution',
      summary: 'You excel at the intersection of digital bits and physical atoms, connecting software logic, sensor inputs, electronic circuits, and mechanical prototypes.',
      dominantDomains: ['Technical', 'Practical'],
      superpower: 'IoT, robotics, hardware debugging, and real-world system automation'
    };
  }

  if ((c1 === 'Creative' && c2 === 'Communication') || (c1 === 'Communication' && c2 === 'Creative')) {
    return {
      title: 'Brand Strategist & Storyteller',
      tagline: 'Crafting compelling narratives, viral aesthetics, and memorable identities',
      summary: 'You shape public perception by weaving visual design, persuasive language, and audience empathy into cohesive campaigns and brand identities.',
      dominantDomains: ['Creative', 'Communication'],
      superpower: 'High-conversion storytelling, audience engagement, and community building'
    };
  }

  if ((c1 === 'Creative' && c2 === 'Entrepreneurial') || (c1 === 'Entrepreneurial' && c2 === 'Creative')) {
    return {
      title: 'Design-Led Founder',
      tagline: 'Transforming original creative assets into differentiated consumer ventures',
      summary: 'You leverage design differentiation to build high-margin products and brands. You spot cultural trends early and convert artistic assets into commercial value.',
      dominantDomains: ['Creative', 'Entrepreneurial'],
      superpower: 'Product aesthetics, high-margin brand positioning, and consumer appeal'
    };
  }

  if ((c1 === 'Creative' && c2 === 'Practical') || (c1 === 'Practical' && c2 === 'Creative')) {
    return {
      title: 'Product Artisan & Maker',
      tagline: 'Crafting tangible, beautiful physical goods and bespoke deliverables',
      summary: 'You bridge conceptual design with hands-on physical production. You take pride in material mastery, ergonomics, and aesthetic finish.',
      dominantDomains: ['Creative', 'Practical'],
      superpower: 'Custom physical fabrication, bespoke craftsmanship, and sensory design'
    };
  }

  if ((c1 === 'Communication' && c2 === 'Entrepreneurial') || (c1 === 'Entrepreneurial' && c2 === 'Communication')) {
    return {
      title: 'Growth Catalyst & Dealmaker',
      tagline: 'Driving customer acquisition, high-trust partnerships, and business development',
      summary: 'You thrive in customer conversations, pitch meetings, and negotiation tables. You identify market opportunities and close deals with confidence and emotional intelligence.',
      dominantDomains: ['Communication', 'Entrepreneurial'],
      superpower: 'High-ticket deal closing, strategic networking, and venture scaling'
    };
  }

  if ((c1 === 'Practical' && c2 === 'Entrepreneurial') || (c1 === 'Entrepreneurial' && c2 === 'Practical')) {
    return {
      title: 'Operations & Field Operator',
      tagline: 'Executing real-world services with lean operational efficiency',
      summary: 'You combine hands-on mechanical execution with business discipline, delivering dependable real-world services with low overhead and reliable customer turnaround.',
      dominantDomains: ['Practical', 'Entrepreneurial'],
      superpower: 'High-reliability service delivery, lean logistics, and field management'
    };
  }

  if ((c1 === 'Practical' && c2 === 'Communication') || (c1 === 'Communication' && c2 === 'Practical')) {
    return {
      title: 'Project Coordinator & Specialist',
      tagline: 'Orchestrating on-the-ground execution with clear team collaboration',
      summary: 'You ensure physical projects stay on schedule while maintaining excellent communication with clients, suppliers, and team members.',
      dominantDomains: ['Practical', 'Communication'],
      superpower: 'On-site execution, safety compliance, and direct customer relations'
    };
  }

  // Single Domain Dominance
  const singleTitleMap: Record<SkillCategory, { title: string; tagline: string; summary: string; superpower: string }> = {
    Technical: {
      title: 'Technical Specialist',
      tagline: 'Deep technical proficiency in computation, engineering, and data',
      summary: 'Your profile reflects deep technical rigor. Adding communication or entrepreneurial skills will help you monetize your code directly.',
      superpower: 'Complex problem-solving and algorithmic architecture'
    },
    Creative: {
      title: 'Creative Visionary',
      tagline: 'Expressive mastery of visual design, media arts, and creative direction',
      summary: 'Your profile reflects rich creative talent. Pairing your creative output with technical tools or business skills unlocks high-value ventures.',
      superpower: 'Original visual conception and aesthetic intuition'
    },
    Communication: {
      title: 'Master Communicator',
      tagline: 'Persuasive influence, public speaking, and strategic relationship building',
      summary: 'You connect effortlessly with people and rally teams around ideas. Leveraging your voice in client-facing opportunities will produce immediate traction.',
      superpower: 'High-trust influence and relationship building'
    },
    Practical: {
      title: 'Master Practitioner & Builder',
      tagline: 'Dependable hands-on execution and physical technical mastery',
      summary: 'You excel at tangible, real-world tasks and physical systems. Combining practical skills with entrepreneurial pricing turns tradecraft into micro-enterprises.',
      superpower: 'Real-world execution, troubleshooting, and craftsmanship'
    },
    Entrepreneurial: {
      title: 'Enterprising Strategist',
      tagline: 'Market analysis, business opportunity validation, and commercial modeling',
      summary: 'You have a keen eye for unmet customer needs and financial viability. Teaming up with technical or creative builders allows you to bring ventures to market quickly.',
      superpower: 'Opportunity detection and commercial monetization'
    }
  };

  const single = singleTitleMap[c1];
  return {
    title: single.title,
    tagline: single.tagline,
    summary: single.summary,
    dominantDomains: [c1],
    superpower: single.superpower
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
        // Average score (0 to 100)
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

  // Radar chart data for visualization (Score from 0 to 100)
  const radarData = useMemo(() => {
    return CATEGORIES.map(cat => ({
      subject: cat,
      score: categoryStats[cat].avgScorePercent,
      skillCount: categoryStats[cat].skillCount,
      totalPoints: categoryStats[cat].totalPoints,
      fullMark: 100
    }));
  }, [categoryStats]);

  // Overall DNA Balance Index & Total Proficiency
  const overallDnaScore = useMemo(() => {
    const scores = CATEGORIES.map(c => categoryStats[c].avgScorePercent);
    const activeCategories = scores.filter(s => s > 0);
    if (activeCategories.length === 0) return 0;
    const avg = Math.round(scores.reduce((a, b) => a + b, 0) / CATEGORIES.length);
    return avg;
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

  // Complementary recommendations based on lowest categories
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
      <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-sm text-center max-w-2xl mx-auto my-8">
        <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center mx-auto mb-4">
          <BrainCircuit className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Build Your Skill DNA Profile</h2>
        <p className="text-slate-600 mb-6 text-sm max-w-md mx-auto leading-relaxed">
          Add skills to your portfolio and calibrate your proficiency levels to visualize your multidimensional competency signature across Technical, Creative, Communication, Practical, and Entrepreneurial domains.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link 
            to="/skills" 
            className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-semibold text-xs hover:bg-slate-800 transition-colors shadow-sm inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Skills from Database
          </Link>
          <button
            onClick={triggerDemoMode}
            className="bg-blue-50 border border-blue-200 text-blue-700 px-5 py-2.5 rounded-xl font-semibold text-xs hover:bg-blue-100 transition-colors inline-flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-blue-600" />
            Load Sample Profile
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto pb-12">
      
      {/* Header & DNA Archetype Banner */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-md shadow-blue-500/20">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-slate-900">Your Skill DNA</h1>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                  {userSkills.length} Total Skills
                </span>
              </div>
              <p className="text-sm text-slate-500">Multidimensional competency matrix across 5 core disciplines</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link 
              to="/skills" 
              className="px-4 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 font-bold text-xs flex items-center gap-1.5 transition-colors"
            >
              <Sliders className="w-3.5 h-3.5 text-slate-500" />
              Adjust Proficiencies
            </Link>
            <Link 
              to="/opportunities" 
              className="px-4 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Compass className="w-3.5 h-3.5 text-blue-400" />
              Explore Pathways
            </Link>
          </div>
        </div>

        {/* Archetype Hero Card */}
        <div className="p-5 md:p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 text-white relative overflow-hidden shadow-md">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                  Primary DNA Archetype
                </span>
                <span className="text-xs text-slate-400">
                  Overall Index: <strong className="text-white">{overallDnaScore}/100</strong>
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
                {archetype.title}
              </h2>
              <p className="text-sm text-blue-200/90 font-medium">
                {archetype.tagline}
              </p>
              <p className="text-xs text-slate-300 leading-relaxed pt-1">
                {archetype.summary}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 shrink-0 lg:max-w-xs space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-300 block">
                Signature Superpower
              </span>
              <p className="text-xs font-semibold text-white leading-snug">
                {archetype.superpower}
              </p>
              <div className="pt-2 border-t border-white/10 flex flex-wrap gap-1.5">
                {archetype.dominantDomains.map(d => (
                  <span key={d} className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-white/20 text-white">
                    {d}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main 2-Column Section: Radar Chart + Domain Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-8">
          
          {/* Radar Chart (Left) */}
          <div className="lg:col-span-6 bg-slate-50/80 rounded-3xl border border-slate-200 p-4 md:p-6 flex flex-col items-center justify-center">
            <div className="w-full flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                <BrainCircuit className="w-4 h-4 text-blue-600" />
                Competency Radar
              </span>
              <span className="text-xs font-semibold text-slate-500">
                5 Domain Dimensions
              </span>
            </div>

            <div className="h-[340px] md:h-[380px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="72%" data={radarData}>
                  <PolarGrid stroke="#cbd5e1" strokeDasharray="3 3" />
                  <PolarAngleAxis 
                    dataKey="subject" 
                    tick={{ fill: '#1e293b', fontSize: 12, fontWeight: 700 }} 
                  />
                  <PolarRadiusAxis 
                    angle={90} 
                    domain={[0, 100]} 
                    tick={{ fill: '#64748b', fontSize: 10 }}
                    stroke="#e2e8f0"
                  />
                  <Radar
                    name="Proficiency Score"
                    dataKey="score"
                    stroke="#2563eb"
                    strokeWidth={2.5}
                    fill="#3b82f6"
                    fillOpacity={0.45}
                  />
                  <Tooltip 
                    formatter={(value: any, name: any, item: any) => [
                      `${value}% (${item.payload.skillCount} skills, ${item.payload.totalPoints} pts)`, 
                      'Domain Score'
                    ]}
                    contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px' }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <div className="w-full pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500">
              <span>Center: 0%</span>
              <span className="font-semibold text-slate-700">Outer Ring: 100% Mastery</span>
              <span>Normalized by Proficiency</span>
            </div>
          </div>

          {/* Quick Domain Matrix Breakdown (Right) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider flex items-center gap-2">
                <Layers className="w-4 h-4 text-slate-700" />
                Domain Competency Breakdown
              </h3>
              <span className="text-xs text-slate-500 font-medium">
                Click a category to filter
              </span>
            </div>

            <div className="space-y-3">
              {CATEGORIES.map(cat => {
                const stat = categoryStats[cat];
                const meta = CATEGORY_META[cat];
                const Icon = meta.icon;
                const isSelected = selectedCategory === cat;

                return (
                  <div 
                    key={cat}
                    onClick={() => setSelectedCategory(prev => prev === cat ? 'All' : cat)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                      isSelected 
                        ? 'border-blue-500 bg-blue-50/40 ring-2 ring-blue-500/20 shadow-xs' 
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-8 h-8 rounded-xl ${meta.badgeBg} ${meta.textColor} flex items-center justify-center`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-xs md:text-sm text-slate-900">{cat}</h4>
                            <span className={`px-2 py-0.2 rounded-full text-[10px] font-bold ${meta.badgeBg} ${meta.textColor}`}>
                              {stat.strengthLevel}
                            </span>
                          </div>
                          <span className="text-[11px] text-slate-500">
                            {stat.skillCount} {stat.skillCount === 1 ? 'skill' : 'skills'} &bull; {stat.totalPoints} total points
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="font-extrabold text-sm md:text-base text-slate-900">
                          {stat.avgScorePercent}%
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
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
      </div>

      {/* Deep-Dive Category Skill Cards */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-blue-600" />
              Categorized Skill Inventory & Calibrations
            </h3>
            <p className="text-xs text-slate-500">
              Interactive proficiency levels contributing to your real-time Skill DNA polygon
            </p>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                selectedCategory === 'All' 
                  ? 'bg-slate-900 text-white' 
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              All Domains
            </button>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${
                  selectedCategory === cat 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
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
                  className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-colors"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-9 h-9 rounded-2xl ${meta.badgeBg} ${meta.textColor} flex items-center justify-center`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-slate-900">{cat}</h4>
                          <span className="text-[11px] text-slate-500">
                            {stat.skillCount} active {stat.skillCount === 1 ? 'skill' : 'skills'}
                          </span>
                        </div>
                      </div>

                      <span className="text-xs font-extrabold px-2.5 py-1 rounded-xl bg-slate-100 text-slate-800">
                        {stat.avgScorePercent}%
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {meta.description}
                    </p>

                    {/* Skill List with interactive proficiency selector */}
                    <div className="space-y-2.5 pt-2 border-t border-slate-100">
                      {stat.skills.length === 0 ? (
                        <div className="py-4 px-3 rounded-2xl bg-slate-50 text-center border border-dashed border-slate-200">
                          <p className="text-xs text-slate-500 mb-2">No skills in this domain yet.</p>
                          <Link
                            to="/skills"
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            Add {cat} Skill
                          </Link>
                        </div>
                      ) : (
                        stat.skills.map(({ skill, proficiency }) => (
                          <div 
                            key={skill.id}
                            className="p-3 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-2"
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-bold text-xs text-slate-900 truncate">
                                {skill.name}
                              </span>
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${meta.badgeBg} ${meta.textColor}`}>
                                {proficiency}
                              </span>
                            </div>

                            {/* Level selector buttons */}
                            <div className="grid grid-cols-5 gap-1">
                              {PROFICIENCY_LEVELS.map(lvl => {
                                const isActive = lvl === proficiency;
                                return (
                                  <button
                                    key={lvl}
                                    onClick={() => updateProficiency(skill.id, lvl)}
                                    title={`Set ${skill.name} to ${lvl}`}
                                    className={`py-1 text-[9px] font-bold rounded-lg transition-all text-center ${
                                      isActive
                                        ? 'bg-slate-900 text-white shadow-xs'
                                        : 'bg-white border border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-800'
                                    }`}
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

                  <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between">
                    <Link
                      to="/skills"
                      className="text-xs font-bold text-slate-700 hover:text-slate-900 inline-flex items-center gap-1"
                    >
                      <span>Manage in Skills</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Interdisciplinary Synergies & Growth Opportunities */}
      {suggestedComplementarySkills.length > 0 && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-500" />
                <h3 className="text-lg font-bold text-slate-900">
                  Recommended Skill DNA Expansions
                </h3>
              </div>
              <p className="text-xs text-slate-500">
                Adding competencies in your lighter domains creates valuable interdisciplinary synthesis
              </p>
            </div>

            <Link
              to="/opportunities"
              className="px-4 py-2 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 font-bold text-xs hover:bg-blue-100 transition-colors inline-flex items-center gap-1.5"
            >
              <span>See Market Applications</span>
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
                  className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors flex flex-col justify-between gap-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-7 h-7 rounded-lg ${meta.badgeBg} ${meta.textColor} flex items-center justify-center`}>
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <h4 className="font-bold text-sm text-slate-900">{skill.name}</h4>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${meta.badgeBg} ${meta.textColor}`}>
                        {skill.category}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2">
                      {skill.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500">
                      Unlocks: {(skill.applications || []).slice(0, 1).join('') || 'New projects'}
                    </span>
                    <Link
                      to="/skills"
                      className="px-3 py-1 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors inline-flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" />
                      Add to DNA
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Action Navigation Footer */}
      <div className="p-6 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="font-bold text-base">Ready to put your Skill DNA into action?</h3>
          <p className="text-xs text-slate-400">Discover viable micro-enterprises and projects calibrated to your unique signature.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/map"
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors border border-slate-700"
          >
            View Skill-to-Income Map
          </Link>
          <Link
            to="/opportunities"
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors shadow-sm inline-flex items-center gap-2"
          >
            <span>Explore Matching Opportunities</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

    </div>
  );
}
