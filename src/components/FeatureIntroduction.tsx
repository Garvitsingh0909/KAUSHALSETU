import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { 
  Target, Combine, Briefcase, Compass, Sparkles, 
  ArrowRight, ArrowLeft, X, Check, Globe, Calculator,
  ExternalLink, Layers, Award, ShieldCheck
} from 'lucide-react';
import { cn } from '../lib/utils';

interface FeatureIntroductionProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FeatureSlide {
  id: string;
  badge: string;
  title: string;
  tagline: string;
  description: string;
  highlights: { title: string; desc: string }[];
  route: string;
  routeLabel: string;
  icon: React.ElementType;
  accentColor: string;
  previewMetrics: { label: string; value: string }[];
}

export function FeatureIntroduction({ isOpen, onClose }: FeatureIntroductionProps) {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [dontShowAgain, setDontShowAgain] = useState(true);

  const features: FeatureSlide[] = [
    {
      id: 'skills',
      badge: 'Step 1 • Foundation',
      title: 'Skill Profiling & Skill DNA',
      tagline: 'Map your capabilities across CBSE\'s 5 vocational domains',
      description: 'Audit your strengths in Technical, Creative, Communication, Practical, and Entrepreneurial disciplines. Calibrate proficiency levels to generate a dynamic Skill DNA radar.',
      highlights: [
        { title: '5 CBSE Domains', desc: 'Pre-seeded with 24+ standard vocational competencies and AI custom skill synthesis.' },
        { title: 'Proficiency Engine', desc: 'Calibrate from Beginner to Advanced with practical validation criteria.' },
        { title: 'Multidimensional DNA', desc: 'Visual radar charts showcasing balanced vocational maturity.' }
      ],
      route: '/skills',
      routeLabel: 'Explore My Skills',
      icon: Target,
      accentColor: 'blue',
      previewMetrics: [
        { label: 'Core Domains', value: '5 Curricular Areas' },
        { label: 'Evaluation Depth', value: '5 Proficiency Tiers' }
      ]
    },
    {
      id: 'opportunities',
      badge: 'Step 2 • Synthesis',
      title: 'Opportunity Combiner & Market Research',
      tagline: 'Translate skill intersections into verified Indian micro-services',
      description: 'Combine two or more skills to unlock turnkey commercial pathways. Every opportunity is grounded with live Indian market benchmarks, realistic INR pricing, and verified MSME & NPCI citations.',
      highlights: [
        { title: 'Interdisciplinary Synthesis', desc: 'See how Graphic Design + Financial Literacy creates high-demand menu consulting.' },
        { title: 'Live Market Intelligence', desc: 'Real INR fee benchmarks (₹2,500 - ₹8,000) and competitor price comparisons.' },
        { title: 'Zero-Cost Tool Stack', desc: 'Leverage Canva Free, WhatsApp Business, Google My Business, and Open Source software.' }
      ],
      route: '/opportunities',
      routeLabel: 'Launch Opportunity Explorer',
      icon: Combine,
      accentColor: 'indigo',
      previewMetrics: [
        { label: 'Market Demand', value: '90%+ Viability Index' },
        { label: 'Benchmark Range', value: '₹2,500 – ₹12,000' }
      ]
    },
    {
      id: 'business',
      badge: 'Step 3 • Validation',
      title: 'CBSE Business Builder & Financial Feasibility',
      tagline: 'Test unit economics & break-even before investing time or capital',
      description: 'Model fixed and variable costs, establish transparent unit pricing, and calculate break-even volumes. Craft customer personas with hyper-localized pain points and outreach strategies.',
      highlights: [
        { title: 'Unit Economics Engine', desc: 'Real-time calculation of contribution margins and net monthly surplus.' },
        { title: 'Target Customer Personas', desc: 'Detailed profiles of local shops, tutors, clinics, and residential associations.' },
        { title: 'Financial Feasibility Badge', desc: 'Pre-flight health checks ensuring low-risk student project execution.' }
      ],
      route: '/business-builder',
      routeLabel: 'Open Business Lab',
      icon: Briefcase,
      accentColor: 'emerald',
      previewMetrics: [
        { label: 'Calculated Margins', value: '75% – 90% Net' },
        { label: 'Initial Investment', value: '₹0 Upfront Risk' }
      ]
    },
    {
      id: 'roadmap',
      badge: 'Step 4 • Execution',
      title: '4-Phase Action Roadmaps & Project Portfolio',
      tagline: 'Bridge the gap between conceptual plans and day-one delivery',
      description: 'Receive concrete Day-1 immediate action steps, a 4-week execution roadmap, and risk mitigation tactics. Document real deliverables in your live projects portfolio.',
      highlights: [
        { title: 'Day-1 Action Plan', desc: 'No analysis paralysis — start with a concrete 15-minute free prototype.' },
        { title: 'Weekly Milestones', desc: 'Phase-by-phase timeline: Prototype → Peer Review → Pilot → Commercial Launch.' },
        { title: 'Portfolio Showcase', desc: 'Curate project proof, client testimonials, and measurable community impact.' }
      ],
      route: '/roadmap',
      routeLabel: 'View Action Roadmap',
      icon: Compass,
      accentColor: 'amber',
      previewMetrics: [
        { label: 'Execution Speed', value: 'Day-1 Starter' },
        { label: 'Structured Timeline', value: '4 Milestones' }
      ]
    },
    {
      id: 'insights',
      badge: 'Step 5 • Intelligence',
      title: 'G-ONE AI Copilot & Voice Guidance',
      tagline: 'Your personal strategic mentor for vocational and entrepreneurial excellence',
      description: 'Consult G-ONE for personalized next steps, cross-skill recommendations, and oral presentation tips. Listen to realistic audio walkthroughs for any generated opportunity.',
      highlights: [
        { title: 'Strategic Recommendations', desc: 'Grounded insights tailored to your specific profile and local market context.' },
        { title: 'Voice Narration', desc: 'Hands-free audio summaries explaining complex business concepts in plain English.' },
        { title: 'Exhibition Readiness', desc: 'Curated pitch points and financial defense sheets for expo evaluators.' }
      ],
      route: '/insights',
      routeLabel: 'Consult G-ONE Mentor',
      icon: Sparkles,
      accentColor: 'purple',
      previewMetrics: [
        { label: 'Mentorship Mode', value: 'Curricular Aligned' },
        { label: 'Audio Narration', value: 'Available On-Demand' }
      ]
    }
  ];

  const currentFeature = features[currentStep];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'ArrowRight') {
        setCurrentStep((prev) => (prev < features.length - 1 ? prev + 1 : prev));
      } else if (e.key === 'ArrowLeft') {
        setCurrentStep((prev) => (prev > 0 ? prev - 1 : prev));
      } else if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleClose = () => {
    if (dontShowAgain) {
      localStorage.setItem('ks_has_seen_intro', 'true');
    }
    onClose();
  };

  const handleNavigateToFeature = (path: string) => {
    handleClose();
    navigate(path);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-3xl overflow-hidden flex flex-col max-h-[92vh] relative"
        role="dialog"
        aria-modal="true"
        aria-label="Kaushal Setu Features Introduction"
      >
        {/* Header with Navigation Pills */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white shadow-xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white uppercase tracking-wider font-display">
                Kaushal Setu • Feature Guide
              </h2>
              <p className="text-[11px] text-slate-400">
                Platform Orientation & Feature Tour
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-slate-400 bg-slate-800 px-2 py-1 rounded-md">
              {currentStep + 1} of {features.length}
            </span>
            <button
              onClick={handleClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-2"
              aria-label="Close feature tour"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Feature Tab Selector */}
        <div className="bg-slate-50 border-b border-slate-200 px-4 py-2.5 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          {features.map((f, index) => {
            const Icon = f.icon;
            const isActive = index === currentStep;
            return (
              <button
                key={f.id}
                onClick={() => setCurrentStep(index)}
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all btn-press",
                  isActive 
                    ? "bg-blue-600 text-white shadow-xs" 
                    : "text-slate-600 hover:bg-slate-200/70 hover:text-slate-900"
                )}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{f.title.split('&')[0].trim()}</span>
              </button>
            );
          })}
        </div>

        {/* Slide Content Area */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentFeature.id}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {/* Badge & Title */}
              <div>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200/80 px-2.5 py-0.5 rounded-full mb-2">
                  <currentFeature.icon className="w-3 h-3" />
                  {currentFeature.badge}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-display">
                  {currentFeature.title}
                </h3>
                <p className="text-sm font-semibold text-slate-500 mt-1">
                  {currentFeature.tagline}
                </p>
                <p className="text-sm text-slate-700 mt-3 leading-relaxed">
                  {currentFeature.description}
                </p>
              </div>

              {/* Three Core Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {currentFeature.highlights.map((h, i) => (
                  <div key={i} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <div className="flex items-center gap-1.5 text-blue-700 font-bold text-xs mb-1">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{h.title}</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-normal">
                      {h.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Metrics preview banner */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-6">
                  {currentFeature.previewMetrics.map((m, i) => (
                    <div key={i}>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                        {m.label}
                      </span>
                      <span className="text-sm font-black text-slate-900">
                        {m.value}
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => handleNavigateToFeature(currentFeature.route)}
                  className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-xs btn-press"
                >
                  <span>{currentFeature.routeLabel}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer with Controls */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer select-none">
            <input 
              type="checkbox"
              checked={dontShowAgain}
              onChange={(e) => setDontShowAgain(e.target.checked)}
              className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
            />
            <span>Don't show automatically on launch</span>
          </label>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            {currentStep > 0 && (
              <button
                onClick={() => setCurrentStep((prev) => prev - 1)}
                className="flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:bg-slate-200/80 px-3.5 py-2 rounded-xl transition-colors btn-press"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            )}

            {currentStep < features.length - 1 ? (
              <button
                onClick={() => setCurrentStep((prev) => prev + 1)}
                className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs btn-press"
              >
                <span>Next Feature</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={handleClose}
                className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs btn-press"
              >
                <span>Get Started</span>
                <Check className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
