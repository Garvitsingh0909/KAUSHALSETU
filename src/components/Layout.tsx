import React, { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Cpu, LayoutDashboard, BrainCircuit, User, Target, Combine, 
  Blocks, GitCompare, Play, Sparkles, X, Briefcase, Menu,
  Compass, FolderKanban, Layers, ChevronDown, ChevronUp,
  Database, ShieldCheck
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useProfile } from '../context/ProfileContext';
import { useViewMode } from '../context/ViewModeContext';
import { ModeToggle } from './ModeToggle';
import { OnboardingManager, triggerFeatureTour } from './OnboardingManager';
import { LivePulseDot } from './common/MotionWrapper';

export default function Layout() {
  const { profile, triggerDemoMode } = useProfile();
  const { isMinimal } = useViewMode();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showAllNavInMinimal, setShowAllNavInMinimal] = useState(false);

  // Chronological student journey navigation
  const defaultNavigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'My Skills', href: '/skills', icon: Target },
    { name: 'Skill Assessment', href: '/assessment', icon: ShieldCheck },
    { name: 'Skill DNA', href: '/dna', icon: BrainCircuit },
    { name: 'Opportunities', href: '/opportunities', icon: Combine },
    { name: 'What Can I Build?', href: '/build', icon: Blocks },
    { name: 'Build My Business', href: '/business-builder', icon: Briefcase },
    { name: 'Skill-to-Income Map', href: '/skill-to-income', icon: Layers },
    { name: 'My Roadmap', href: '/roadmap', icon: Compass },
    { name: 'My Projects', href: '/projects', icon: FolderKanban },
    { name: 'G-ONE Insights', href: '/insights', icon: Sparkles },
    { name: 'Compare', href: '/compare', icon: GitCompare },
    { name: 'My Profile', href: '/profile', icon: User },
  ];

  // Essential chronological steps in Minimal Mode
  const minimalNavigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'My Skills', href: '/skills', icon: Target },
    { name: 'Skill Assessment', href: '/assessment', icon: ShieldCheck },
    { name: 'What Can I Build?', href: '/build', icon: Blocks },
    { name: 'Build My Business', href: '/business-builder', icon: Briefcase },
    { name: 'Skill-to-Income', href: '/skill-to-income', icon: Layers },
    { name: 'My Roadmap', href: '/roadmap', icon: Compass },
    { name: 'My Profile', href: '/profile', icon: User },
  ];

  const activeNavigation = isMinimal && !showAllNavInMinimal ? minimalNavigation : defaultNavigation;

  const getPageTitle = () => {
    if (location.pathname === '/') return 'Dashboard';
    if (location.pathname === '/skills') return 'My Skills';
    if (location.pathname.startsWith('/assessment')) return 'Skill Assessment & Proficiency Engine';
    if (location.pathname === '/dna') return 'Skill DNA Analysis';
    if (location.pathname.startsWith('/opportunities/')) return 'Opportunity Details';
    if (location.pathname === '/opportunities') return 'Opportunity Explorer';
    if (location.pathname === '/build') return 'What Can I Build?';
    if (location.pathname === '/business-builder' || location.pathname === '/business') return 'Build My Business';
    if (location.pathname === '/skill-to-income') return 'Skill-to-Income Map';
    if (location.pathname === '/roadmap') return 'My Action Roadmap';
    if (location.pathname === '/projects') return 'My Projects & Portfolio';
    if (location.pathname === '/insights') return 'G-ONE Insights Hub';
    if (location.pathname === '/compare') return 'Compare Opportunities';
    if (location.pathname === '/profile') return 'Profile & Settings';
    const matched = defaultNavigation.find((n) => n.href === location.pathname);
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
    <div className="min-h-screen font-sans flex flex-col md:flex-row relative bg-slate-50">
      {/* Mobile Top Header */}
      <div className="md:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between z-30 sticky top-0">
        <div className="flex items-center gap-2.5 text-blue-900">
          <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <h1 className="font-bold text-sm leading-none">KAUSHAL SETU</h1>
            <p className="text-[10px] font-medium text-slate-500">Skill to Opportunity</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ModeToggle />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
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
        <div className="p-5 hidden md:block border-b border-slate-100">
          <div className="flex items-center gap-2.5 text-blue-900">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-bold text-base leading-tight text-slate-900">KAUSHAL SETU</h1>
              <div className="flex items-center gap-1.5 mt-0.5">
                <LivePulseDot color="emerald" />
                <p className="text-[11px] font-medium text-slate-500">Live Skill Engine</p>
              </div>
            </div>
          </div>
        </div>

        {/* Chronological Navigation Links */}
        <div className="px-3 py-3 flex-1 flex flex-col gap-1 overflow-y-auto">
          <div className="px-3 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            {isMinimal ? 'Core Journey' : 'Learning Pathway'}
          </div>

          {activeNavigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              end={item.href === '/'}
              onClick={handleNavClick}
              className={({ isActive }) => {
                const active = isNavActive(item.href, isActive);
                return cn(
                  'relative flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-colors duration-150 group btn-press',
                  active
                    ? 'text-blue-700 font-bold'
                    : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
                );
              }}
            >
              {({ isActive }) => {
                const active = isNavActive(item.href, isActive);
                return (
                  <>
                    {active && (
                      <motion.div
                        layoutId="activeNavBackground"
                        className="absolute inset-0 bg-blue-50/90 border border-blue-200/60 rounded-xl shadow-xs -z-0"
                        transition={{ type: 'spring', damping: 26, stiffness: 350 }}
                      />
                    )}
                    <div className="flex items-center gap-2.5 relative z-10">
                      <item.icon className={cn(
                        "w-4 h-4 transition-colors",
                        active ? "text-blue-600" : "text-slate-400 group-hover:text-blue-600"
                      )} />
                      <span>{item.name}</span>
                    </div>
                  </>
                );
              }}
            </NavLink>
          ))}

          {isMinimal && (
            <button
              onClick={() => setShowAllNavInMinimal(!showAllNavInMinimal)}
              className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl mt-1 transition-colors btn-press"
            >
              <span>{showAllNavInMinimal ? 'Show less' : 'More tools (all views)'}</span>
              {showAllNavInMinimal ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          )}

          {/* Admin Section */}
          <div className="mt-4 px-3 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-t border-slate-100 pt-3">
            System Admin
          </div>
          <NavLink
            to="/admin"
            onClick={handleNavClick}
            className={({ isActive }) => {
              const active = location.pathname.startsWith('/admin');
              return cn(
                'relative flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-colors duration-150 group btn-press',
                active
                  ? 'text-indigo-700 font-bold'
                  : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
              );
            }}
          >
            {() => {
              const active = location.pathname.startsWith('/admin');
              return (
                <>
                  {active && (
                    <motion.div
                      layoutId="activeNavBackground"
                      className="absolute inset-0 bg-indigo-50/90 border border-indigo-200/60 rounded-xl shadow-xs -z-0"
                      transition={{ type: 'spring', damping: 26, stiffness: 350 }}
                    />
                  )}
                  <div className="flex items-center gap-2.5 relative z-10">
                    <Database className={cn(
                      "w-4 h-4 transition-colors",
                      active ? "text-indigo-600" : "text-slate-400 group-hover:text-indigo-600"
                    )} />
                    <span>Admin Panel</span>
                  </div>
                </>
              );
            }}
          </NavLink>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 mt-auto border-t border-slate-100 space-y-2">
          <button
            onClick={() => {
              triggerFeatureTour();
              setIsMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-center gap-2 bg-blue-50 text-blue-700 hover:bg-blue-100 px-3 py-2 rounded-xl text-xs font-bold transition-all border border-blue-200/80 btn-press"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Feature Tour</span>
          </button>

          <button
            onClick={() => {
              triggerDemoMode();
              setIsMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-center gap-2 bg-slate-100 text-slate-700 hover:bg-slate-200 px-3 py-2 rounded-xl text-xs font-bold transition-all border border-slate-200 btn-press hover:shadow-xs"
          >
            <Play className="w-3.5 h-3.5 text-blue-600" />
            <span>Load Demo Experience</span>
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden min-h-[calc(100vh-60px)] md:min-h-screen">
        <header className="bg-white border-b border-slate-200 px-6 md:px-8 py-3.5 flex items-center justify-between flex-shrink-0">
          <div>
            <h2 className="text-lg md:text-xl font-bold text-slate-800 font-display">
              {getPageTitle()}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {/* Feature Guide Tour trigger button */}
            <button
              onClick={triggerFeatureTour}
              className="flex items-center gap-1.5 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200/80 px-2.5 py-1.5 rounded-xl transition-all btn-press shadow-xs"
              title="Launch Interactive Feature Guide"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span className="hidden sm:inline">Feature Guide</span>
            </button>

            {/* Single cleanly positioned mode toggle */}
            <ModeToggle />

            {profile?.name ? (
              <NavLink
                to="/profile"
                className="flex items-center gap-2.5 pl-3 border-l border-slate-200 hover:opacity-85 transition-opacity btn-press"
              >
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-bold text-slate-900 leading-tight font-display">{profile.name}</p>
                  <p className="text-[11px] text-slate-500 leading-tight">{profile.role || 'Student'}</p>
                </div>
                <div className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700 font-black text-sm border border-blue-200 shadow-xs">
                  {profile.name.charAt(0).toUpperCase()}
                </div>
              </NavLink>
            ) : (
              <NavLink
                to="/profile"
                className="text-xs font-semibold text-blue-600 hover:underline bg-blue-50 px-3 py-1.5 rounded-lg btn-press"
              >
                Setup Profile
              </NavLink>
            )}
          </div>
        </header>
        
        <div className="flex-1 overflow-y-auto p-4 md:p-8 relative">
          <div className="max-w-7xl mx-auto min-h-full relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="w-full min-h-full"
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* First time loading screen & interactive feature tour */}
      <OnboardingManager />
    </div>
  );
}
