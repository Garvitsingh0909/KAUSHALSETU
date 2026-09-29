import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Cpu, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

interface FirstTimeLoaderProps {
  onComplete: () => void;
}

export function FirstTimeLoader({ onComplete }: FirstTimeLoaderProps) {
  const [progress, setProgress] = useState(12);
  const [stageIndex, setStageIndex] = useState(0);

  const stages = [
    { title: "Initializing Kaushal Setu Engine", detail: "Calibrating CBSE competency standards..." },
    { title: "Hydrating Skill Matrix", detail: "Structuring Technical, Creative & Entrepreneurial domains..." },
    { title: "Grounding Market Intelligence", detail: "Fetching real-world Indian freelance rates & benchmarks..." },
    { title: "Ready to Explore", detail: "Preparing your customized learning environment..." }
  ];

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setProgress(38);
      setStageIndex(1);
    }, 450);

    const timer2 = setTimeout(() => {
      setProgress(74);
      setStageIndex(2);
    }, 950);

    const timer3 = setTimeout(() => {
      setProgress(100);
      setStageIndex(3);
    }, 1450);

    const timer4 = setTimeout(() => {
      onComplete();
    }, 1900);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.35 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 text-white px-6"
    >
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-600/15 rounded-full blur-2xl pointer-events-none" />

      {/* Skip Button */}
      <button
        onClick={onComplete}
        className="absolute top-6 right-6 text-xs font-semibold text-slate-400 hover:text-white px-3 py-1.5 rounded-lg border border-slate-800 hover:border-slate-700 bg-slate-900/60 transition-colors flex items-center gap-1.5"
      >
        <span>Skip</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>

      {/* Center Branding & Loader Card */}
      <div className="relative max-w-md w-full flex flex-col items-center text-center">
        {/* Emblem */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative mb-6"
        >
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-blue-500 p-0.5 shadow-2xl shadow-blue-500/20 flex items-center justify-center">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-blue-500/10 animate-pulse" />
              <Cpu className="w-10 h-10 text-blue-400" />
            </div>
          </div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center border-2 border-slate-950">
            <Sparkles className="w-3 h-3 text-white" />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-2xl sm:text-3xl font-black tracking-tight text-white font-display"
        >
          KAUSHAL SETU
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="text-xs sm:text-sm font-semibold text-blue-400 mt-1 uppercase tracking-wider"
        >
          Skill to Opportunity • Entrepreneurship & Financial Literacy
        </motion.p>

        {/* Progress Bar Container */}
        <div className="w-full mt-8 bg-slate-900/90 border border-slate-800/80 rounded-2xl p-5 shadow-xl backdrop-blur-sm">
          {/* Progress Track */}
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden relative">
            <motion.div 
              className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-400 rounded-full"
              initial={{ width: '10%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            />
          </div>

          {/* Status Text */}
          <div className="flex items-center justify-between mt-3 text-xs">
            <div className="flex items-center gap-2 text-slate-300 font-medium text-left">
              {progress === 100 ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              ) : (
                <div className="w-2 h-2 rounded-full bg-blue-400 animate-ping flex-shrink-0" />
              )}
              <span className="truncate">{stages[stageIndex].title}</span>
            </div>
            <span className="font-mono font-bold text-blue-400 pl-2">{progress}%</span>
          </div>

          <p className="text-[11px] text-slate-500 text-left mt-1.5 truncate">
            {stages[stageIndex].detail}
          </p>
        </div>

        {/* Footer Subtext */}
        <p className="text-[11px] text-slate-500 mt-6 font-medium">
          Translating Vocational Skills into Viable Student Micro-Ventures
        </p>
      </div>
    </motion.div>
  );
}
