import React from 'react';
import { useAdmin } from '../../context/AdminContext';
import { 
  Presentation, 
  RefreshCw, 
  MonitorPlay, 
  LayoutTemplate,
  Monitor,
  Smartphone,
  Eye,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { cn } from '../../lib/utils';

export function AdminExhibition() {
  const { 
    demoExhibition, 
    updateDemoExhibition, 
    resetDemoExhibition,
    setPresentationMode,
    setExhibitionMinimalMode,
    switchDemoProfile
  } = useAdmin();

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Presentation className="w-5 h-5 text-blue-400" />
            <h1 className="text-xl font-black tracking-tight text-white">CBSE EXHIBITION CONTROL</h1>
            <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
              DEMO DATA ONLY
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Configure the Kaushal Setu demo environment for live presentations. This data is strictly separated from real student accounts.
          </p>
        </div>

        <button
          onClick={resetDemoExhibition}
          className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Reset Demo State
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Demo Profiles */}
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <MonitorPlay className="w-4 h-4 text-blue-400" />
                Select Demo Profile
              </h2>
            </div>

            <div className="space-y-3 text-xs">
              {/* Aarav Sharma Profile */}
              <div 
                onClick={() => switchDemoProfile('demo-aarav')}
                className={cn(
                  "p-4 rounded-xl border cursor-pointer transition-all space-y-2",
                  demoExhibition.activeDemoProfileId === 'demo-aarav' 
                    ? "bg-blue-900/20 border-blue-500/50" 
                    : "bg-slate-900 border-slate-800 hover:border-slate-700"
                )}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white text-sm">Aarav Sharma</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Delhi Public School, R.K. Puram (CBSE)</div>
                  </div>
                  {demoExhibition.activeDemoProfileId === 'demo-aarav' && (
                    <CheckCircle2 className="w-5 h-5 text-blue-400" />
                  )}
                </div>
                <div className="pt-2 flex flex-wrap gap-1.5">
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px]">Graphic Design</span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px]">Photography</span>
                </div>
                <div className="text-[11px] text-slate-400 font-mono mt-1 pt-1 border-t border-slate-800/80">
                  Target: Local Retail Product Photography
                </div>
              </div>

              {/* Priya Patel Profile */}
              <div 
                onClick={() => switchDemoProfile('demo-priya')}
                className={cn(
                  "p-4 rounded-xl border cursor-pointer transition-all space-y-2",
                  demoExhibition.activeDemoProfileId === 'demo-priya' 
                    ? "bg-teal-900/20 border-teal-500/50" 
                    : "bg-slate-900 border-slate-800 hover:border-slate-700"
                )}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white text-sm">Priya Patel</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Kendriya Vidyalaya No. 1, Ahmedabad (CBSE)</div>
                  </div>
                  {demoExhibition.activeDemoProfileId === 'demo-priya' && (
                    <CheckCircle2 className="w-5 h-5 text-teal-400" />
                  )}
                </div>
                <div className="pt-2 flex flex-wrap gap-1.5">
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px]">Electronics</span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px]">IoT Systems</span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px]">Agriculture</span>
                </div>
                <div className="text-[11px] text-slate-400 font-mono mt-1 pt-1 border-t border-slate-800/80">
                  Target: Automated Solar Irrigation Systems
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
            <p>
              Switching profiles resets the active exhibition state for all screens simultaneously. Use this to demonstrate different pathways to the CBSE panel.
            </p>
          </div>
        </div>

        {/* Right Column: Display & UI Configurations */}
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <LayoutTemplate className="w-4 h-4 text-indigo-400" />
                Exhibition Display Mode
              </h2>
            </div>

            <div className="space-y-4 text-xs">
              {/* Presentation Mode Toggle */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
                <div>
                  <div className="font-bold text-slate-200">Presentation Mode</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Increases base font size and expands containers for projector displays.</div>
                </div>
                <button
                  onClick={() => setPresentationMode(!demoExhibition.presentationMode)}
                  className={cn(
                    "relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900",
                    demoExhibition.presentationMode ? "bg-blue-600" : "bg-slate-700"
                  )}
                >
                  <span className="sr-only">Use setting</span>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "pointer-events-none absolute left-0 inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                      demoExhibition.presentationMode ? "translate-x-5" : "translate-x-0.5"
                    )}
                  />
                </button>
              </div>

              {/* Minimal UI Toggle */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
                <div>
                  <div className="font-bold text-slate-200">Minimal Navigation Mode</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Hides secondary sidebar links to focus purely on the core G-ONE pathway.</div>
                </div>
                <button
                  onClick={() => setExhibitionMinimalMode(!demoExhibition.minimalMode)}
                  className={cn(
                    "relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900",
                    demoExhibition.minimalMode ? "bg-blue-600" : "bg-slate-700"
                  )}
                >
                  <span className="sr-only">Use setting</span>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "pointer-events-none absolute left-0 inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                      demoExhibition.minimalMode ? "translate-x-5" : "translate-x-0.5"
                    )}
                  />
                </button>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <Eye className="w-4 h-4 text-emerald-400" />
                Live Demo Data Inspector
              </h2>
            </div>
            
            <div className="space-y-2 text-xs">
              <div className="grid grid-cols-3 gap-2">
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-[10px] text-slate-500 uppercase font-mono">Unit Price</div>
                  <div className="font-bold text-white mt-1 font-mono">₹{demoExhibition.unitPrice}</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-[10px] text-slate-500 uppercase font-mono">Volume</div>
                  <div className="font-bold text-white mt-1 font-mono">{demoExhibition.customerVolume} / mo</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-[10px] text-slate-500 uppercase font-mono">Revenue</div>
                  <div className="font-bold text-emerald-400 mt-1 font-mono">₹{demoExhibition.monthlyRevenue}</div>
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-[10px] text-slate-500 uppercase font-mono">Current Roadmap Stage</div>
                <div className="font-bold text-white mt-1 truncate">{demoExhibition.roadmapStage}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
