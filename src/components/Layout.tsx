import React, { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Cpu, LayoutDashboard, BrainCircuit, User, Target, Combine, 
  Blocks, GitCompare, Play, Sparkles, X, Briefcase, Menu,
  Compass, FolderKanban, Layers, Database, ShieldCheck,
  Award
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useProfile } from '../context/ProfileContext';
import { triggerFeatureTour } from './OnboardingManager';
import { OnboardingManager } from './OnboardingManager';

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
}

interface NavGroup {
  group: string;
  items: NavItem[];
}

export default function Layout() {
  const { profile, triggerDemoMode } = useProfile();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Grouped Navigation per specification
  const navigationGroups: NavGroup[] = [
    {
      group: 'DISCOVER',
      items: [
        { name: 'My Skills', href: '/skills', icon: Target },
        { name: 'Skill Assessment', href: '/assessment', icon: ShieldCheck },
        { name: 'Skill DNA', href: '/dna', icon: BrainCircuit },
        { name: 'Opportunities', href: '/opportunities', icon: Combine },
      ]
    },
    {
      group: 'CREATE',
      items: [
        { name: 'What Can I Build?', href: '/build', icon: Blocks },
        { name: 'Build My Business', href: '/business-builder', icon: Briefcase },
        { name: 'My Projects', href: '/projects', icon: FolderKanban },
      ]
    },
    {
      group: 'PLAN',
      items: [
        { name: 'Skill-to-Income Map', href: '/skill-to-income', icon: Layers },
        { name: 'My Roadmap', href: '/roadmap', icon: Compass },
      ]
    },
    {
      group: 'G-ONE',
      items: [
        { name: 'G-ONE Insights', href: '/insights', icon: Sparkles },
        { name: 'Compare', href: '/compare', icon: GitCompare },
      ]
    },
    {
      group: 'ACCOUNT',
      items: [
        { name: 'My Profile', href: '/profile', icon: User },
      ]
    }
  ];

  const getPageTitle = () => {
    if (location.pathname === '/') return 'Student Journey Dashboard';
    if (location.pathname === '/skills') return 'My Skills & Vocations';
    if (location.pathname.startsWith('/assessment')) return 'Skill Assessment';
    if (location.pathname === '/dna') return 'Skill DNA Analysis';
    if (location.pathname.startsWith('/opportunities/')) return 'Opportunity Pathway';
    if (location.pathname === '/opportunities') return 'Opportunity Explorer';
    if (location.pathname === '/build') return 'What Can I Build?';
    if (location.pathname === '/business-builder' || location.pathname === '/business') return 'Build My Business';
    if (location.pathname === '/skill-to-income') return 'Skill-to-Income Map';
    if (location.pathname === '/roadmap') return 'My Growth Roadmap';
    if (location.pathname === '/projects') return 'My Projects & Portfolio';
    if (location.pathname === '/insights') return 'G-ONE Reasoning Insights';
    if (location.pathname === '/compare') return 'Compare Opportunities';
    if (location.pathname === '/profile') return 'Student Profile & Settings';
    if (location.pathname.startsWith('/admin')) return 'Admin Panel';
    return 'KaushalSetu';
  };

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  const isNavActive = (href: string, routerIsActive: boolean) => {
    if (href === '/') return location.pathname === '/';
    if (href === '/opportunities') return location.pathname.startsWith('/opportunities');
    if (href === '/business-builder') return location.pathname.startsWith('/business-builder') || location.pathname.startsWith('/business');
    if (href === '/assessment') return location.pathname.startsWith('/assessment');
    return routerIsActive;
  };

  return (
    <div className="min-h-screen font-sans flex flex-col md:flex-row relative bg-slate-50 dark:bg-[#0B0F17] text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* Mobile Top Header */}
      <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800 px-4 py-3 flex items-center justify-between z-30 sticky top-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-slate-950 dark:bg-blue-600 text-white flex items-center justify-center font-bold shadow-xs">
            <Cpu className="w-4 h-4 text-blue-400 dark:text-white" />
          </div>
          <div>
            <h1 className="font-brand font-bold text-sm tracking-tight text-slate-950 dark:text-white">KAUSHALSETU</h1>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Skill to Opportunity</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <nav 
        className={cn(
          "w-full md:w-64 bg-white dark:bg-[#0F172A] border-r border-slate-200/80 dark:border-slate-800 flex-shrink-0 flex flex-col z-20 transition-all",
          isMobileMenuOpen ? "block border-b md:border-b-0" : "hidden md:flex"
        )}
      >
        {/* Brand Lockup: Syne Bold */}
        <div className="p-5 hidden md:block border-b border-slate-100 dark:border-slate-800/80">
          <NavLink to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-slate-950 dark:bg-blue-600 text-white flex items-center justify-center shadow-xs group-hover:bg-blue-600 transition-colors">
              <Cpu className="w-4 h-4 text-blue-400 group-hover:text-white dark:text-white transition-colors" />
            </div>
            <div>
              <h1 className="font-brand font-bold text-base tracking-tight text-slate-950 dark:text-white leading-tight">
                KAUSHALSETU
              </h1>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                Skill to Opportunity Pathway
              </p>
            </div>
          </NavLink>
        </div>

        {/* Dashboard Lead Link */}
        <div className="px-3 pt-3">
          <NavLink
            to="/"
            end
            onClick={handleNavClick}
            className={({ isActive }) => cn(
              'relative flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors duration-150',
              isActive
                ? 'text-blue-700 dark:text-blue-400 bg-blue-50/90 dark:bg-blue-950/50 font-bold border border-blue-200/60 dark:border-blue-800/40'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100/70 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-200'
            )}
          >
            <LayoutDashboard className="w-4 h-4 text-slate-500 dark:text-slate-400" />
            <span>Dashboard</span>
          </NavLink>
        </div>

        {/* Organized Navigation Groups */}
        <div className="px-3 py-2 flex-1 flex flex-col gap-3.5 overflow-y-auto">
          {navigationGroups.map((grp) => (
            <div key={grp.group} className="space-y-1">
              <div className="px-3 py-0.5 text-[10px] font-mono font-bold text-slate-400 dark:text-slate-400 tracking-wider uppercase">
                {grp.group}
              </div>

              {grp.items.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  onClick={handleNavClick}
                  className={({ isActive }) => {
                    const active = isNavActive(item.href, isActive);
                    return cn(
                      'relative flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs transition-colors duration-150 group',
                      active
                        ? 'text-blue-700 dark:text-blue-400 font-bold bg-blue-50/90 dark:bg-blue-950/50 border border-blue-200/50 dark:border-blue-800/40'
                        : 'text-slate-600 dark:text-slate-300 font-medium hover:bg-slate-100/70 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-100'
                    );
                  }}
                >
                  <item.icon className="w-4 h-4 text-slate-400 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors shrink-0" />
                  <span className="truncate">{item.name}</span>
                </NavLink>
              ))}
            </div>
          ))}

          {/* Admin Panel - Distinctly Secondary at Bottom */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <div className="px-3 py-0.5 text-[10px] font-mono font-bold text-slate-400 dark:text-slate-400 tracking-wider uppercase">
              ADMINISTRATION
            </div>
            <NavLink
              to="/admin"
              onClick={handleNavClick}
              className={({ isActive }) => {
                const active = location.pathname.startsWith('/admin');
                return cn(
                  'flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs transition-colors',
                  active
                    ? 'text-slate-900 dark:text-slate-100 font-bold bg-slate-100 dark:bg-slate-800'
                    : 'text-slate-500 dark:text-slate-400 font-medium hover:bg-slate-100/70 dark:hover:bg-slate-800/60 hover:text-slate-800 dark:hover:text-slate-200'
                );
              }}
            >
              <Database className="w-3.5 h-3.5 text-slate-400 dark:text-slate-400" />
              <span>Admin Panel</span>
            </NavLink>
          </div>
        </div>

        {/* Sidebar Footer Controls */}
        <div className="p-3 border-t border-slate-100 dark:border-slate-800 space-y-1.5 bg-slate-50/50 dark:bg-slate-900/50">
          <button
            onClick={() => {
              triggerFeatureTour();
              setIsMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white py-1.5 px-3 rounded-lg hover:bg-white dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Interactive Guide</span>
          </button>

          <button
            onClick={() => {
              triggerDemoMode();
              setIsMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 py-1.5 px-3 rounded-lg border border-slate-200 dark:border-slate-700 shadow-2xs transition-colors"
          >
            <Play className="w-3 h-3 text-slate-500 dark:text-slate-400" />
            <span>Reset Demo State</span>
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden min-h-[calc(100vh-60px)] md:min-h-screen">
        <header className="bg-white dark:bg-[#0F172A] border-b border-slate-200/80 dark:border-slate-800 px-6 md:px-8 py-3.5 flex items-center justify-between flex-shrink-0 transition-colors">
          <div className="flex items-center gap-3">
            <h2 className="text-base sm:text-lg font-heading font-semibold text-slate-900 dark:text-slate-100 tracking-tight">
              {getPageTitle()}
            </h2>
            <span className="hidden lg:inline-flex items-center gap-1 text-[10px] font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200/70 dark:border-slate-700">
              CBSE SKILL EXPO DEMO
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={triggerFeatureTour}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 px-3 py-1.5 rounded-lg transition-colors shadow-2xs"
              title="Launch Guided Walkthrough"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span className="hidden sm:inline">Product Guide</span>
            </button>

            {profile?.name ? (
              <NavLink
                to="/profile"
                className="flex items-center gap-2.5 pl-3 border-l border-slate-200 dark:border-slate-800 hover:opacity-85 transition-opacity"
              >
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-bold text-slate-900 dark:text-slate-100 leading-tight font-heading">{profile.name}</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">{profile.academicGrade || 'Class 10 Vocational'}</p>
                </div>
                <div className="w-8 h-8 rounded-lg bg-slate-900 dark:bg-blue-600 flex items-center justify-center text-white font-bold text-xs shadow-2xs">
                  {profile.name.charAt(0).toUpperCase()}
                </div>
              </NavLink>
            ) : (
              <NavLink
                to="/profile"
                className="text-xs font-semibold text-white bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-700 px-3 py-1.5 rounded-lg transition-colors"
              >
                Setup Profile
              </NavLink>
            )}
          </div>
        </header>
        
        <div className="flex-1 overflow-y-auto p-4 md:p-8 relative">
          <div className="max-w-6xl mx-auto h-full relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                className="h-full"
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
