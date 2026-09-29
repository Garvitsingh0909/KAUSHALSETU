import React, { useState, useMemo } from 'react';
import { useProfile } from '../../context/ProfileContext';
import { useBusiness } from '../../context/BusinessContext';
import { calculateUserFinancialCapacity } from '../../utils/revenueEstimates';
import { 
  Target, 
  TrendingUp, 
  DollarSign, 
  Plus, 
  Edit3, 
  Trash2, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  ChevronRight, 
  Zap, 
  PiggyBank, 
  Users, 
  Calculator,
  ArrowUpRight
} from 'lucide-react';
import { AnimatedNumber } from '../common/AnimatedNumber';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';

export const FinancialGoalTracker: React.FC<{ variant?: 'full' | 'compact' }> = ({ variant = 'full' }) => {
  const { userSkills, allSkills, financialGoal, updateFinancialGoal, addEarningMilestone, removeEarningMilestone } = useProfile();
  const { activeScenario } = useBusiness();

  const [isEditGoalOpen, setIsEditGoalOpen] = useState(false);
  const [isLogEarningOpen, setIsLogEarningOpen] = useState(false);

  // Form states for Goal Editing
  const [targetInput, setTargetInput] = useState<number>(financialGoal.monthlyTargetINR || 5000);
  const [savingsInput, setSavingsInput] = useState<number>(financialGoal.savingsTargetINR || 2000);
  const [monthInput, setMonthInput] = useState<string>(financialGoal.targetMonth || 'October 2026');

  // Form states for Logging Earning
  const [milestoneTitle, setMilestoneTitle] = useState('');
  const [milestoneAmount, setMilestoneAmount] = useState<number>(1000);
  const [milestoneCategory, setMilestoneCategory] = useState('Freelance Project');
  const [milestoneSkillId, setMilestoneSkillId] = useState<string>(userSkills[0]?.skillId || '');

  // Calculate Earning Capacity based on active user skills
  const capacity = useMemo(() => {
    return calculateUserFinancialCapacity(userSkills, allSkills);
  }, [userSkills, allSkills]);

  // Total earnings logged
  const totalLoggedEarnings = useMemo(() => {
    return financialGoal.milestones.reduce((acc, m) => acc + (m.amount || 0), 0);
  }, [financialGoal.milestones]);

  const targetINR = financialGoal.monthlyTargetINR || 5000;
  const progressPct = Math.min(100, Math.round((totalLoggedEarnings / Math.max(1, targetINR)) * 100));
  const remainingGap = Math.max(0, targetINR - totalLoggedEarnings);

  // Price & customer target calculations
  const pricePerUnit = activeScenario?.pricePerUnit || 600;
  const customersNeededForTarget = Math.ceil(targetINR / Math.max(1, pricePerUnit));
  const customersNeededForGap = Math.ceil(remainingGap / Math.max(1, pricePerUnit));

  const handleSaveGoal = (e: React.FormEvent) => {
    e.preventDefault();
    updateFinancialGoal({
      monthlyTargetINR: Number(targetInput) || 5000,
      savingsTargetINR: Number(savingsInput) || 0,
      targetMonth: monthInput || 'Current Month'
    });
    setIsEditGoalOpen(false);
  };

  const handleLogEarning = (e: React.FormEvent) => {
    e.preventDefault();
    if (!milestoneTitle.trim() || milestoneAmount <= 0) return;

    addEarningMilestone({
      title: milestoneTitle.trim(),
      amount: Number(milestoneAmount),
      date: new Date().toISOString().split('T')[0],
      category: milestoneCategory,
      skillId: milestoneSkillId || undefined
    });

    setMilestoneTitle('');
    setMilestoneAmount(1000);
    setIsLogEarningOpen(false);
  };

  if (variant === 'compact') {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider">
            <Target className="w-4 h-4 text-emerald-600" /> Monthly Financial Target
          </div>
          <span className="text-xs font-mono font-bold text-slate-500">{financialGoal.targetMonth}</span>
        </div>

        <div className="flex items-baseline justify-between">
          <div>
            <span className="text-2xl font-black text-slate-900 font-mono tabular-nums">
              <AnimatedNumber value={totalLoggedEarnings} prefix="₹" />
            </span>
            <span className="text-xs text-slate-500 font-medium ml-1">
              / ₹{targetINR.toLocaleString()}
            </span>
          </div>
          <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 font-mono">
            {progressPct}% Achieved
          </span>
        </div>

        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
          <div 
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-700" 
            style={{ width: `${progressPct}%` }}
          />
        </div>

        <div className="flex items-center justify-between pt-1 text-xs">
          <button 
            onClick={() => setIsLogEarningOpen(true)}
            className="text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Log Payout
          </button>
          <button 
            onClick={() => setIsEditGoalOpen(true)}
            className="text-slate-500 hover:text-slate-800 font-medium flex items-center gap-1"
          >
            <Edit3 className="w-3.5 h-3.5" /> Adjust Target
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 p-6 md:p-8 text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 p-8 opacity-10 pointer-events-none">
          <Target className="w-64 h-64 text-emerald-400" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/30 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider text-emerald-300">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              Student Financial Goal & Progress Tracker
            </div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
              Skill-Based Income Target: {financialGoal.targetMonth}
            </h2>
            <p className="text-xs md:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Set monthly earnings benchmarks based on your active skills, log real client payouts, and measure progress against unit economics models.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={() => setIsLogEarningOpen(true)}
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-1.5 btn-press"
            >
              <Plus className="w-4 h-4" />
              <span>Log Earned Revenue</span>
            </button>
            <button
              onClick={() => setIsEditGoalOpen(true)}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-4 py-2.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
            >
              <Edit3 className="w-4 h-4" />
              <span>Adjust Goal</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="p-6 md:p-8 space-y-8">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Stat 1: Target Goal */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Monthly Target</span>
              <Target className="w-4 h-4 text-slate-400" />
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-black text-slate-900 font-mono tabular-nums">
                ₹{targetINR.toLocaleString()}
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                Target Month: <strong>{financialGoal.targetMonth}</strong>
              </div>
            </div>
          </div>

          {/* Stat 2: Logged Earned Revenue */}
          <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Earned Revenue</span>
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-black text-emerald-800 font-mono tabular-nums">
                <AnimatedNumber value={totalLoggedEarnings} prefix="₹" />
              </div>
              <div className="text-[11px] text-emerald-700 font-semibold mt-1">
                {financialGoal.milestones.length} client tasks logged
              </div>
            </div>
          </div>

          {/* Stat 3: Estimated Skill Potential Capacity */}
          <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-200 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-blue-800 uppercase tracking-wider">Estimated Skill Capacity</span>
              <Zap className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-black text-blue-900 font-mono tabular-nums">
                ₹{capacity.totalMonthlyPotentialINR.toLocaleString()}
                <span className="text-xs text-blue-600 font-normal">/mo</span>
              </div>
              <div className="text-[11px] text-blue-700 font-medium mt-1">
                Calculated from {userSkills.length} active skills ({capacity.combinationMultiplier}x synergy multiplier)
              </div>
            </div>
          </div>

          {/* Stat 4: Remaining Gap or Surplus */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                {remainingGap > 0 ? 'Remaining Gap' : 'Target Exceeded!'}
              </span>
              {remainingGap > 0 ? (
                <AlertCircle className="w-4 h-4 text-amber-500" />
              ) : (
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              )}
            </div>
            <div>
              <div className={cn(
                "text-2xl md:text-3xl font-black font-mono tabular-nums",
                remainingGap > 0 ? "text-amber-700" : "text-emerald-700"
              )}>
                {remainingGap > 0 ? `₹${remainingGap.toLocaleString()}` : `+₹${Math.abs(totalLoggedEarnings - targetINR).toLocaleString()}`}
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                {remainingGap > 0 ? `Requires ~${customersNeededForGap} orders at ₹${pricePerUnit}/unit` : 'Goal achieved for this cycle!'}
              </div>
            </div>
          </div>

        </div>

        {/* Master Target Progress Bar */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Goal Progress</span>
              <span className="text-xs font-mono text-slate-500">
                (₹{totalLoggedEarnings.toLocaleString()} of ₹{targetINR.toLocaleString()})
              </span>
            </div>
            <span className="text-xs font-black px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 border border-emerald-200 font-mono">
              {progressPct}% Completed
            </span>
          </div>

          <div className="h-4 w-full bg-slate-200 rounded-full overflow-hidden p-0.5 border border-slate-300/60 relative">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 rounded-full shadow-xs"
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
            <span>₹0 (Start)</span>
            <span>₹{Math.round(targetINR / 2).toLocaleString()} (Midpoint)</span>
            <span className="font-bold text-slate-800">Target: ₹{targetINR.toLocaleString()}</span>
          </div>
        </div>

        {/* Two Column Section: Skill Earning Breakdown & Logged Milestones */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Column 1: Skill Contribution & Capacity Breakdown */}
          <div className="border border-slate-200 rounded-2xl p-6 space-y-4 bg-white">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Calculator className="w-4 h-4 text-blue-600" />
                Skill-Wise Monthly Earning Potential
              </h3>
              <span className="text-[11px] text-slate-400 font-medium">
                {userSkills.length} Skills Mapped
              </span>
            </div>

            {capacity.skillBreakdown.length === 0 ? (
              <div className="text-xs text-slate-400 italic p-4 bg-slate-50 rounded-xl text-center">
                Add skills in "My Skills" to calculate your customized earning breakdown.
              </div>
            ) : (
              <div className="space-y-2.5">
                {capacity.skillBreakdown.map((item) => (
                  <div key={item.skillId} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-slate-900 flex items-center gap-2">
                        <span>{item.skillName}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 font-semibold">
                          {item.proficiency}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        Avg Hourly: <strong className="text-slate-700 font-mono">₹{item.hourlyRateINR}/hr</strong> · Project Avg: <strong className="text-slate-700 font-mono">₹{item.projectRateAvgINR.toLocaleString()}</strong>
                      </div>
                    </div>
                    <div className="text-right shrink-0 ml-3">
                      <span className="font-black text-emerald-700 text-sm font-mono block">
                        ₹{item.monthlyPotentialINR.toLocaleString()}
                      </span>
                      <span className="text-[10px] text-slate-400">/mo est.</span>
                    </div>
                  </div>
                ))}

                {capacity.combinationBonusINR > 0 && (
                  <div className="p-3 bg-indigo-50/70 border border-indigo-200 rounded-xl flex items-center justify-between text-xs text-indigo-900">
                    <span className="font-semibold">
                      Interdisciplinary Synergy Bonus ({capacity.combinationMultiplier}x)
                    </span>
                    <span className="font-bold font-mono text-indigo-800">
                      +₹{capacity.combinationBonusINR.toLocaleString()}/mo
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Column 2: Logged Revenue Milestones & Tasks */}
          <div className="border border-slate-200 rounded-2xl p-6 space-y-4 bg-white flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-emerald-600" />
                  Logged Payouts & Micro-Earnings
                </h3>
                <button
                  onClick={() => setIsLogEarningOpen(true)}
                  className="text-xs text-emerald-700 font-bold hover:underline flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Log Task
                </button>
              </div>

              {financialGoal.milestones.length === 0 ? (
                <div className="text-xs text-slate-400 italic p-6 bg-slate-50 rounded-xl text-center border-2 border-dashed border-slate-200 space-y-2">
                  <p>No revenue payouts logged yet for this target cycle.</p>
                  <button
                    onClick={() => setIsLogEarningOpen(true)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-600 text-white rounded-lg font-bold text-xs shadow-xs"
                  >
                    + Log First Payout
                  </button>
                </div>
              ) : (
                <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                  {financialGoal.milestones.map((m) => (
                    <div key={m.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs group">
                      <div>
                        <div className="font-bold text-slate-900">{m.title}</div>
                        <div className="text-[10px] text-slate-500 mt-0.5">
                          {m.date} · {m.category || 'Freelance'}
                          {m.notes && ` · ${m.notes}`}
                        </div>
                      </div>
                      <div className="flex items-center gap-3 shrink-0 ml-2">
                        <span className="font-black text-emerald-700 text-sm font-mono">
                          +₹{m.amount.toLocaleString()}
                        </span>
                        <button
                          onClick={() => removeEarningMilestone(m.id)}
                          className="text-slate-300 hover:text-red-500 transition-colors p-1"
                          title="Delete payout log"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Total Footer */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Total Earned Balance:</span>
              <span className="font-black text-slate-900 text-base font-mono">
                ₹{totalLoggedEarnings.toLocaleString()}
              </span>
            </div>
          </div>

        </div>

      </div>

      {/* MODAL 1: EDIT FINANCIAL GOAL */}
      <AnimatePresence>
        {isEditGoalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full p-6 space-y-6"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-emerald-600" />
                  <h3 className="font-bold text-slate-900 text-lg">Adjust Monthly Financial Target</h3>
                </div>
                <button onClick={() => setIsEditGoalOpen(false)} className="text-slate-400 hover:text-slate-700">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveGoal} className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-slate-800 block mb-1">
                    Monthly Target Income (₹ INR)
                  </label>
                  <input
                    type="number"
                    min="500"
                    max="100000"
                    step="500"
                    value={targetInput}
                    onChange={(e) => setTargetInput(Number(e.target.value))}
                    className="w-full p-3 rounded-xl border border-slate-200 text-sm font-bold font-mono focus:outline-none focus:border-emerald-500"
                    required
                  />
                  <p className="text-[11px] text-slate-500 mt-1">
                    Recommended student range: ₹2,000 – ₹10,000/month based on spare-time capacity.
                  </p>
                </div>

                <div>
                  <label className="font-bold text-slate-800 block mb-1">
                    Target Savings / Reinvestment Reserve (₹ INR)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="50000"
                    step="250"
                    value={savingsInput}
                    onChange={(e) => setSavingsInput(Number(e.target.value))}
                    className="w-full p-3 rounded-xl border border-slate-200 text-sm font-bold font-mono focus:outline-none focus:border-emerald-500"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">
                    Funds allocated to buy materials, tools, or save for future education.
                  </p>
                </div>

                <div>
                  <label className="font-bold text-slate-800 block mb-1">
                    Target Cycle Month
                  </label>
                  <input
                    type="text"
                    value={monthInput}
                    onChange={(e) => setMonthInput(e.target.value)}
                    placeholder="e.g. October 2026"
                    className="w-full p-3 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>

                <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsEditGoalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 shadow-xs"
                  >
                    Save Target
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 2: LOG EARNING MILESTONE */}
      <AnimatePresence>
        {isLogEarningOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full p-6 space-y-6"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-emerald-600" />
                  <h3 className="font-bold text-slate-900 text-lg">Log Earned Revenue / Task Payout</h3>
                </div>
                <button onClick={() => setIsLogEarningOpen(false)} className="text-slate-400 hover:text-slate-700">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleLogEarning} className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-slate-800 block mb-1">
                    Project / Task Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Local Cafe Menu Design, Tutoring Session"
                    value={milestoneTitle}
                    onChange={(e) => setMilestoneTitle(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-800 block mb-1">
                      Amount Earned (₹ INR)
                    </label>
                    <input
                      type="number"
                      min="100"
                      max="100000"
                      step="50"
                      value={milestoneAmount}
                      onChange={(e) => setMilestoneAmount(Number(e.target.value))}
                      className="w-full p-3 rounded-xl border border-slate-200 text-sm font-bold font-mono focus:outline-none focus:border-emerald-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-800 block mb-1">
                      Category
                    </label>
                    <select
                      value={milestoneCategory}
                      onChange={(e) => setMilestoneCategory(e.target.value)}
                      className="w-full p-3 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-emerald-500"
                    >
                      <option value="Freelance Service">Freelance Service</option>
                      <option value="Product Sale">Product Sale</option>
                      <option value="Tutoring">Tutoring</option>
                      <option value="Hardware Assembly">Hardware Assembly</option>
                      <option value="Micro-Consulting">Micro-Consulting</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-800 block mb-1">
                    Primary Skill Used
                  </label>
                  <select
                    value={milestoneSkillId}
                    onChange={(e) => setMilestoneSkillId(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-emerald-500"
                  >
                    {userSkills.map((us) => {
                      const detail = allSkills.find((s) => s.id === us.skillId);
                      return (
                        <option key={us.skillId} value={us.skillId}>
                          {detail ? detail.name : us.skillId} ({us.proficiency})
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsLogEarningOpen(false)}
                    className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 shadow-xs"
                  >
                    + Add Payout
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};
