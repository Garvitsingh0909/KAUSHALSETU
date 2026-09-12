import React, { useMemo } from 'react';
import { useProfile } from '../context/ProfileContext';
import { SKILLS_DB, SkillCategory } from '../data/skills';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { BrainCircuit, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

const CATEGORIES: SkillCategory[] = ['Technical', 'Creative', 'Communication', 'Practical', 'Entrepreneurial'];

export default function SkillDNA() {
  const { userSkills, getSkillDetails, triggerDemoMode } = useProfile();

  const dnaData = useMemo(() => {
    // Initialize scores
    const scores = CATEGORIES.reduce((acc, cat) => {
      acc[cat] = 0;
      return acc;
    }, {} as Record<string, number>);

    // Calculate score based on proficiency
    const weight = { Advanced: 5, Strong: 4, Intermediate: 3, Developing: 2, Beginner: 1 };
    let totalScore = 0;

    userSkills.forEach(us => {
      const skill = getSkillDetails(us.skillId);
      if (skill) {
        scores[skill.category] += weight[us.proficiency];
        totalScore += weight[us.proficiency];
      }
    });

    return CATEGORIES.map(cat => ({
      subject: cat,
      A: scores[cat] * 10,
      fullMark: 100,
      rawScore: scores[cat]
    }));
  }, [userSkills, getSkillDetails]);

  if (userSkills.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-sm text-center max-w-2xl mx-auto">
        <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center mx-auto mb-4">
          <BrainCircuit className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">No DNA Profile Available Yet</h2>
        <p className="text-slate-600 mb-6 text-sm max-w-md mx-auto">
          Add skills to your portfolio or calibrate your proficiency levels to visualize your multidimensional Skill DNA.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link to="/skills" className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-semibold text-xs hover:bg-slate-800 transition-colors shadow-sm">
            Add Skills from Database
          </Link>
          <button
            onClick={triggerDemoMode}
            className="bg-blue-50 border border-blue-200 text-blue-700 px-5 py-2.5 rounded-xl font-semibold text-xs hover:bg-blue-100 transition-colors"
          >
            Load Demo Skills (CBSE)
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-7xl mx-auto">
      
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center">
            <BrainCircuit className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Your Skill DNA</h1>
            <p className="text-sm text-slate-500">A visual representation of your unique cross-disciplinary strengths</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Radar Chart */}
          <div className="h-[400px] w-full bg-slate-50/80 rounded-3xl border border-slate-200 p-4">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={dnaData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#475569', fontSize: 12, fontWeight: 600 }} />
                <PolarRadiusAxis angle={30} domain={[0, 'auto']} tick={false} axisLine={false} />
                <Radar
                  name="Proficiency"
                  dataKey="A"
                  stroke="#2563eb"
                  fill="#3b82f6"
                  fillOpacity={0.4}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* DNA Breakdown */}
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex gap-3">
              <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <p className="text-xs text-blue-900 leading-relaxed">
                Your highest-value opportunities emerge not from a single isolated skill, but from the synthesis of multiple disciplines. Use this profile to guide venture ideation.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-slate-900 text-sm uppercase tracking-wider">Category Breakdown</h3>
              {dnaData.map(data => (
                <div key={data.subject}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-semibold text-slate-700">{data.subject}</span>
                    <span className="text-slate-500 font-medium">Calibrated Score: {data.rawScore}</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-600 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${Math.min(100, data.A)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-100">
              <Link 
                to="/opportunities" 
                className="w-full inline-flex justify-center items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-semibold text-xs hover:bg-slate-800 transition-colors shadow-sm"
              >
                Explore Viable Opportunity Combinations
              </Link>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}
