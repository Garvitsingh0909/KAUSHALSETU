import React, { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { 
  Cpu, LayoutDashboard, BrainCircuit, User, Target, Combine, 
  Blocks, GitCompare, Play, Sparkles, X, Briefcase, Menu,
  Compass, FolderKanban
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useProfile } from '../context/ProfileContext';

export default function Layout() {
  const { profile, triggerDemoMode } = useProfile();
  const location = useLocation();
  const [isInsightPanelOpen, setIsInsightPanelOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'My Skills', href: '/skills', icon: Target },
    { name: 'Skill DNA', href: '/dna', icon: BrainCircuit },
    { name: 'Opportunities', href: '/opportunities', icon: Combine },
    { name: 'What Can I Build?', href: '/build', icon: Blocks },
    { name: 'Build My Business', href: '/business-builder', icon: Briefcase, badge: 'Phase 3' },
    { name: 'My Roadmap', href: '/roadmap', icon: Compass, badge: 'Phase 4' },
    { name: 'My Projects', href: '/projects', icon: FolderKanban, badge: 'Phase 4' },
    { name: 'Compare', href: '/compare', icon: GitCompare },
    { name: 'My Profile', href: '/profile', icon: User },
  ];

  const getPageTitle = () => {
    if (location.pathname === '/') return 'Dashboard';
    if (location.pathname === '/roadmap') return 'My Action Roadmap';
    if (location.pathname === '/projects') return 'My Projects & Portfolio';
    if (location.pathname.startsWith('/opportunities/')) return 'Opportunity Profile Pathway';
    if (location.pathname === '/opportunities') return 'Opportunity Explorer';
    if (location.pathname === '/business-builder' || location.pathname === '/business') return 'Build My Business';
    if (location.pathname === '/build') return 'What Can I Build?';
    if (location.pathname === '/compare') return 'Compare Opportunities';
    if (location.pathname === '/dna') return 'Skill DNA Analysis';
    if (location.pathname === '/skills') return 'Skills Library';
    if (location.pathname === '/profile') return 'Student & Learner Profile';
    const matched = navigation.find((n) => n.href === location.pathname);
    return matched?.name || 'Kaushal Setu';
  };

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  const isNavActive = (href: string, routerIsActive: boolean) => {
    if (href === '/') return location.pathname === '/';
    if (href === '/opportunities') return location.pathname.startsWith('/opportunities');
    if (href === '/business-builder') return location.pathname.startsWith('/business-builder') || location.pathname.startsWith('/business');
    return routerIsActive;
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col md:flex-row relative">
      {/* Mobile Top Header */}
      <div className="md:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between z-30 sticky top-0">
        <div className="flex items-center gap-2.5 text-blue-900">
          <Cpu className="w-7 h-7 text-blue-600" />
          <div>
            <h1 className="font-bold text-base leading-none">KAUSHAL SETU</h1>
            <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Skill to Opportunity</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsInsightPanelOpen(true)}
            className="p-2 rounded-lg bg-amber-50 text-amber-600 border border-amber-200 hover:bg-amber-100 transition-colors"
            title="G-ONE Insights"
          >
            <Sparkles className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <nav 
        className={cn(
          "w-full md:w-64 bg-white border-r border-slate-200 flex-shrink-0 flex flex-col z-20 transition-all",
          isMobileMenuOpen ? "block border-b md:border-b-0" : "hidden md:flex"
        )}
      >
        <div className="p-6 hidden md:block">
          <div className="flex items-center gap-3 text-blue-900">
            <Cpu className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="font-bold text-xl leading-none">KAUSHAL SETU</h1>
              <p className="text-xs font-medium text-slate-500 mt-1 uppercase tracking-wider">Skill to Opportunity</p>
            </div>
          </div>
        </div>

        <div className="px-4 py-2 flex-1 flex flex-col gap-1 overflow-y-auto">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              end={item.href === '/'}
              onClick={handleNavClick}
              className={({ isActive }) => {
                const active = isNavActive(item.href, isActive);
                return cn(
                  'flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors',
                  active
                    ? 'bg-blue-50 text-blue-700 font-semibold'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                );
              }}
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </div>
              {item.badge && (
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-extrabold uppercase border ${
                  item.badge === 'Phase 4'
                    ? 'bg-indigo-100 text-indigo-700 border-indigo-300'
                    : 'bg-emerald-100 text-emerald-700 border-emerald-300'
                }`}>
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}
          
          <button
            onClick={() => {
              setIsInsightPanelOpen(true);
              setIsMobileMenuOpen(false);
            }}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors text-slate-600 hover:bg-slate-100 hover:text-slate-900 text-left mt-2"
          >
            <Sparkles className="w-5 h-5 text-amber-500" />
            <span>G-ONE Insights</span>
          </button>
        </div>

        <div className="p-4 mt-auto space-y-4">
          <button
            onClick={() => {
              triggerDemoMode();
              setIsMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-center gap-2 bg-slate-100 text-slate-700 hover:bg-slate-200 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors border border-slate-200"
          >
            <Play className="w-3.5 h-3.5 text-blue-600" />
            Demo Mode (CBSE)
          </button>
          <div className="bg-slate-900 text-slate-100 rounded-xl p-4 shadow-sm border border-slate-800">
            <div className="flex items-center gap-2 mb-1.5">
              <Cpu className="w-4 h-4 text-blue-400" />
              <span className="text-[11px] font-bold tracking-wide uppercase text-blue-400">Intelligence Node</span>
            </div>
            <p className="text-xs text-slate-300">Powered by <strong className="text-white">G-ONE</strong></p>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden min-h-[calc(100vh-60px)] md:min-h-screen">
        <header className="bg-white border-b border-slate-200 px-6 md:px-8 py-4 flex items-center justify-between flex-shrink-0">
          <div>
            <h2 className="text-lg md:text-xl font-bold text-slate-800">
              {getPageTitle()}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsInsightPanelOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>G-ONE Insights</span>
            </button>

            {profile?.name ? (
              <div className="flex items-center gap-3 pl-2 border-l border-slate-200">
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-bold text-slate-900">{profile.name}</p>
                  <p className="text-[11px] text-slate-500">{profile.role || 'Student'}</p>
                </div>
                <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700 font-black text-sm border border-blue-200 shadow-sm">
                  {profile.name.charAt(0).toUpperCase()}
                </div>
              </div>
            ) : (
              <NavLink
                to="/profile"
                className="text-xs font-semibold text-blue-600 hover:underline bg-blue-50 px-3 py-1.5 rounded-lg"
              >
                Setup Profile
              </NavLink>
            )}
          </div>
        </header>
        
        <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-slate-50 relative">
          <div className="max-w-7xl mx-auto h-full relative">
            <Outlet />
          </div>
        </div>
      </main>

      {/* G-ONE Insights Side Panel */}
      <div 
        className={cn(
          "fixed inset-y-0 right-0 w-80 max-w-[85vw] bg-slate-900 shadow-2xl border-l border-slate-800 p-6 transform transition-transform duration-300 ease-in-out z-50 flex flex-col",
          isInsightPanelOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex justify-between items-center mb-6 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white tracking-wide">G-ONE INSIGHTS</h3>
          </div>
          <button 
            onClick={() => setIsInsightPanelOpen(false)} 
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto pr-1 space-y-5">
          <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500 opacity-10 rounded-bl-full pointer-events-none"></div>
             <p className="text-slate-300 text-xs leading-relaxed relative z-10">
              <strong className="text-white block mb-1 text-sm">Context Analysis Active</strong>
              I am analyzing your skill graph across this session. Your combination of selected skills creates unique intersections. Look for the 'Skill Match' indicators on opportunity cards to see how your profile aligns with real-world problems.
             </p>
          </div>
          
          <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700">
             <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1.5">Phase 3: Financial Lab</h4>
             <p className="text-slate-300 text-xs leading-relaxed">
               Convert any mapped opportunity into a sustainable economic activity in <strong>Build My Business</strong>. Test pricing scenarios, variable costs, and break-even milestones.
             </p>
          </div>

          <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700">
             <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-1.5">Interdisciplinary Synthesis</h4>
             <p className="text-slate-300 text-xs leading-relaxed">
               In the <strong>What Can I Build?</strong> section, observe how individual skills map directly to tangible problems, specific end-users, and functional solutions.
             </p>
          </div>
        </div>
      </div>

      {/* Overlay for panel */}
      {isInsightPanelOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40"
          onClick={() => setIsInsightPanelOpen(false)}
        />
      )}
    </div>
  );
}
