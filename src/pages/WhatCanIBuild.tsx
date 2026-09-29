import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../context/ProfileContext';
import { SKILLS_DB } from '../data/skills';
import { OPPORTUNITIES_DB } from '../data/opportunities';
import { MatchScoreBadge } from '../components/opportunities/MatchScoreBadge';
import { ArrowRight, Target, Users, Zap, LayoutDashboard } from 'lucide-react';
import { cn } from '../lib/utils';

type Step = 'SKILL' | 'PROBLEM' | 'USER' | 'SOLUTION';

export default function WhatCanIBuild() {
  const { userSkills, customSkills, customOpportunities } = useProfile();
  const navigate = useNavigate();
  
  const allSkills = [...SKILLS_DB, ...customSkills];
  const allOpps = [...OPPORTUNITIES_DB, ...customOpportunities];

  const [activeStep, setActiveStep] = useState<Step>('SKILL');
  const [selectedSkillId, setSelectedSkillId] = useState<string | null>(null);
  const [selectedProblem, setSelectedProblem] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  // Filter logic based on selections
  const matchingOpps = selectedSkillId 
    ? allOpps.filter(opp => opp.requiredSkills.includes(selectedSkillId) || opp.preferredSkills.includes(selectedSkillId))
    : [];

  const availableProblems = Array.from(new Set(matchingOpps.flatMap(opp => opp.problems)));
  
  const oppsForProblem = matchingOpps.filter(opp => selectedProblem && opp.problems.includes(selectedProblem));
  const availableUsers = Array.from(new Set(oppsForProblem.flatMap(opp => opp.targetUsers)));
  
  const finalOpps = oppsForProblem.filter(opp => selectedUser && opp.targetUsers.includes(selectedUser));

  const reset = () => {
    setActiveStep('SKILL');
    setSelectedSkillId(null);
    setSelectedProblem(null);
    setSelectedUser(null);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-5xl mx-auto">
      
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">What Can I Build?</h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Don't just ask "What job can I get?". Ask <strong>"What problem can my skills solve?"</strong>. Follow the chain to discover real-world applications.
        </p>
      </div>

      {/* Progress Track */}
      <div className="flex justify-between relative mb-12 max-w-3xl mx-auto">
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-200 -translate-y-1/2 z-0" />
        
        {(['SKILL', 'PROBLEM', 'USER', 'SOLUTION'] as Step[]).map((step, i) => {
          const isActive = activeStep === step;
          const isPast = ['SKILL', 'PROBLEM', 'USER', 'SOLUTION'].indexOf(activeStep) > i;
          return (
            <div key={step} className="relative z-10 flex flex-col items-center">
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors border-4 border-white",
                isActive ? "bg-blue-600 text-white" : 
                isPast ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-500"
              )}>
                {i + 1}
              </div>
              <span className={cn(
                "absolute top-12 text-xs font-bold uppercase tracking-wider",
                isActive || isPast ? "text-slate-900" : "text-slate-400"
              )}>
                {step}
              </span>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm min-h-[400px]">
        
        {/* STEP 1: SKILL */}
        {activeStep === 'SKILL' && (
          <div className="animate-in slide-in-from-right-4">
            <h2 className="text-xl font-bold text-center mb-2">Start with a skill you have or want to explore:</h2>
            <p className="text-sm text-slate-500 text-center mb-8">
              Select any skill to trace its real-world problem-solving chain.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {(userSkills.length > 0 
                ? userSkills.map(us => allSkills.find(s => s && s.id === us.skillId)).filter(Boolean)
                : allSkills
              ).map(skill => {
                if (!skill || !skill.name) return null;
                return (
                  <button
                    key={skill.id}
                    onClick={() => {
                      setSelectedSkillId(skill.id);
                      setActiveStep('PROBLEM');
                    }}
                    className="px-6 py-4 bg-slate-50 border border-slate-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700 font-semibold transition-all shadow-sm"
                  >
                    {skill.name}
                  </button>
                );
              })}
            </div>
            {userSkills.length === 0 && (
              <p className="text-xs text-slate-400 text-center mt-6">
                Showing all curriculum skills. Set up your profile to filter strictly by your personal skills.
              </p>
            )}
          </div>
        )}

        {/* STEP 2: PROBLEM */}
        {activeStep === 'PROBLEM' && (
          <div className="animate-in slide-in-from-right-4">
            <div className="flex justify-between items-center mb-8">
              <button onClick={() => setActiveStep('SKILL')} className="text-slate-400 hover:text-slate-900 text-sm font-medium">← Back</button>
              <h2 className="text-xl font-bold">What problem do you want to solve?</h2>
              <div className="w-12"></div>
            </div>
            
            {availableProblems.length === 0 ? (
              <div className="text-center text-slate-500 py-12">No mapped problems found for this specific skill yet. Try generating an opportunity in the Explorer.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {availableProblems.map((prob, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setSelectedProblem(prob);
                      setActiveStep('USER');
                    }}
                    className="p-6 text-left bg-white border border-slate-200 rounded-xl hover:border-blue-500 hover:shadow-md transition-all group"
                  >
                    <Target className="w-6 h-6 text-slate-400 group-hover:text-blue-500 mb-3" />
                    <p className="font-medium text-slate-700">{prob}</p>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* STEP 3: USER */}
        {activeStep === 'USER' && (
          <div className="animate-in slide-in-from-right-4">
            <div className="flex justify-between items-center mb-8">
              <button onClick={() => setActiveStep('PROBLEM')} className="text-slate-400 hover:text-slate-900 text-sm font-medium">← Back</button>
              <h2 className="text-xl font-bold">Who experiences this problem?</h2>
              <div className="w-12"></div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {availableUsers.map((user, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setSelectedUser(user);
                    setActiveStep('SOLUTION');
                  }}
                  className="p-6 text-center bg-white border border-slate-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all flex flex-col items-center justify-center gap-3"
                >
                  <Users className="w-8 h-8 text-slate-400" />
                  <span className="font-semibold text-slate-700">{user}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 4: SOLUTION */}
        {activeStep === 'SOLUTION' && (
          <div className="animate-in slide-in-from-right-4">
            <div className="flex justify-between items-center mb-8">
              <button onClick={() => setActiveStep('USER')} className="text-slate-400 hover:text-slate-900 text-sm font-medium">← Back</button>
              <h2 className="text-xl font-bold text-emerald-600 flex items-center gap-2">
                <Zap className="w-6 h-6" /> Your Potential Solutions
              </h2>
              <button onClick={reset} className="text-sm text-slate-400 hover:text-slate-900">Start Over</button>
            </div>
            
            {finalOpps.length === 0 ? (
              <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200 p-8">
                <Target className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-slate-800 mb-1">No direct solution mapped for this combination</h3>
                <p className="text-sm text-slate-500 max-w-md mx-auto mb-6">
                  Try going back to choose a different user group or problem, or explore the full catalog in Opportunity Explorer.
                </p>
                <div className="flex justify-center gap-3">
                  <button onClick={() => setActiveStep('USER')} className="px-4 py-2 bg-white border border-slate-300 text-slate-700 font-semibold rounded-xl text-xs hover:bg-slate-100 transition-colors">
                    ← Back to Users
                  </button>
                  <button onClick={reset} className="px-4 py-2 bg-slate-900 text-white font-semibold rounded-xl text-xs hover:bg-slate-800 transition-colors">
                    Start Over
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {finalOpps.map(opp => (
                  <div key={opp.id} className="bg-slate-900 text-white rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-6 justify-between border border-slate-800 shadow-xl">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <span className="text-blue-400 text-xs font-bold uppercase tracking-wider">
                          {opp.opportunityType}
                        </span>
                        <MatchScoreBadge opportunity={opp} variant="compact" />
                        {opp.compensationLabel && (
                          <span className="text-xs font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-800">
                            {opp.compensationLabel}
                          </span>
                        )}
                      </div>
                      <h3 className="text-2xl font-bold mb-2">{opp.title}</h3>
                      <p className="text-slate-300 mb-2 leading-relaxed">{opp.solution}</p>
                      {opp.solutionProfile?.economicValue && (
                        <p className="text-xs text-emerald-300/90 font-medium">
                          <strong>Economic Model:</strong> {opp.solutionProfile.economicValue}
                        </p>
                      )}
                    </div>
                    
                    <div className="shrink-0 flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                      <button 
                        onClick={() => navigate(`/opportunities/${opp.id}`)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors text-xs"
                      >
                        View Pathway <ArrowRight className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => navigate(`/business-builder?opportunityId=${opp.id}`)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors text-xs"
                      >
                        Simulate Venture <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
