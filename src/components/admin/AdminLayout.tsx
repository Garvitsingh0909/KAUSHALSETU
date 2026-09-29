/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * KAUSHAL SETU — PHASE 6 ADMIN CENTER LAYOUT
 * Structured, information-dense operational workspace for administrative control,
 * knowledge graph curation, G-ONE intelligence, assessments, research, and CBSE exhibition.
 */

import React, { useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import { useProfile } from '../../context/ProfileContext';
import { ModeToggle } from '../ModeToggle';
import { AdminUniversalSearchModal } from './AdminUniversalSearchModal';
import { 
  ShieldCheck, 
  LayoutDashboard, 
  Users, 
  Cpu, 
  Combine, 
  Layers, 
  AlertCircle, 
  Target, 
  Briefcase, 
  Sparkles, 
  FileQuestion, 
  Calculator, 
  Compass, 
  FolderKanban, 
  BarChart3, 
  GraduationCap, 
  Settings, 
  Search, 
  LogOut, 
  ExternalLink, 
  Menu, 
  X, 
  PlusCircle, 
  Eye, 
  BookOpen, 
  Activity,
  Presentation,
  CheckCircle2,
  Database
} from 'lucide-react';
import { cn } from '../../lib/utils';

export function AdminLayout() {
  const { currentAdminUser, logoutAdmin, knowledgeGaps, questionReviews } = useAdmin();
  const { setSystemRole } = useProfile();
  const location = useLocation();
  const navigate = useNavigate();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Unresolved counts for badges
  const pendingGapsCount = knowledgeGaps.filter(g => g.status === 'Needs Review' || g.status === 'Candidate Generated').length;
  const pendingQuestionsCount = questionReviews.filter(q => q.status === 'Pending Review').length;

  const adminNavSections = [
    {
      label: 'Core Overview',
      items: [
        { name: 'System Overview', href: '/admin/overview', icon: LayoutDashboard }
      ]
    },
    {
      label: 'Identity & Access',
      items: [
        { name: 'User Management', href: '/admin/users', icon: Users }
      ]
    },
    {
      label: 'Knowledge Graph',
      items: [
        { name: 'Skill Database', href: '/admin/skills', icon: Cpu },
        { name: 'Skill Combinations', href: '/admin/combinations', icon: Combine },
        { name: 'Applications & Solutions', href: '/admin/applications', icon: Layers },
        { name: 'Problem Database', href: '/admin/problems', icon: AlertCircle },
        { name: 'Customer / User Types', href: '/admin/customers', icon: Target },
        { name: 'Opportunity Database', href: '/admin/opportunities', icon: Briefcase }
      ]
    },
    {
      label: 'Intelligence & Assessment',
      items: [
        { 
          name: 'G-ONE Control Center', 
          href: '/admin/g-one', 
          icon: Sparkles, 
          badge: pendingGapsCount > 0 ? String(pendingGapsCount) : undefined,
          badgeColor: 'bg-amber-500 text-white'
        },
        { 
          name: 'Assessments & Reviews', 
          href: '/admin/assessments', 
          icon: FileQuestion,
          badge: pendingQuestionsCount > 0 ? String(pendingQuestionsCount) : undefined,
          badgeColor: 'bg-indigo-500 text-white'
        }
      ]
    },
    {
      label: 'Venture & Pathways',
      items: [
        { name: 'Business Models', href: '/admin/business-models', icon: Briefcase },
        { name: 'Financial Models', href: '/admin/financial-models', icon: Calculator },
        { name: 'Roadmap Templates', href: '/admin/roadmaps', icon: Compass },
        { name: 'Project Library', href: '/admin/projects', icon: FolderKanban }
      ]
    },
    {
      label: 'Evidence & Exhibition',
      items: [
        { name: 'Research Center', href: '/admin/research', icon: BookOpen },
        { name: 'CBSE Exhibition Demo', href: '/admin/exhibition', icon: Presentation },
        { name: 'Activity Logs & Settings', href: '/admin/settings', icon: Settings }
      ]
    }
  ];

  const handleLogout = () => {
    logoutAdmin();
    setSystemRole('student');
    navigate('/');
  };

  const handleSwitchToStudent = () => {
    setSystemRole('student');
    navigate('/');
  };

  return (
    <div className="min-h-screen font-sans flex flex-col md:flex-row bg-slate-900 text-slate-100 antialiased selection:bg-blue-600 selection:text-white">
      {/* Universal Search Modal */}
      <AdminUniversalSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Mobile Sticky Header */}
      <div className="md:hidden bg-slate-950 border-b border-slate-800 px-4 py-3 flex items-center justify-between z-30 sticky top-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
            <ShieldCheck className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-xs tracking-tight text-white flex items-center gap-1.5">
              KAUSHAL SETU <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-blue-500/20 text-blue-300">ADMIN</span>
            </h1>
            <p className="text-[10px] text-slate-400">System Management</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            title="Search"
          >
            <Search className="w-4 h-4" />
          </button>
          <ModeToggle />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Admin Sidebar Navigation */}
      <aside 
        className={cn(
          "w-full md:w-68 bg-slate-950 border-r border-slate-800/80 flex-shrink-0 flex flex-col z-20 transition-all",
          isMobileMenuOpen ? "block border-b md:border-b-0" : "hidden md:flex"
        )}
      >
        {/* Brand Header */}
        <div className="p-4 border-b border-slate-800/80">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <h1 className="font-black text-sm text-white tracking-tight">KAUSHAL SETU</h1>
                <span className="text-[9px] font-black font-mono px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  ADMIN
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-400 truncate">CBSE Operational Center</p>
            </div>
          </div>
        </div>

        {/* Universal Search Trigger */}
        <div className="px-3 pt-3">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 text-xs flex items-center justify-between transition-colors group cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-400" />
              Universal Search...
            </span>
            <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">⌘K</kbd>
          </button>
        </div>

        {/* Navigation Sections */}
        <div className="px-3 py-3 flex-1 overflow-y-auto space-y-4">
          {adminNavSections.map((section) => (
            <div key={section.label} className="space-y-1">
              <div className="px-2.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                {section.label}
              </div>
              {section.items.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) => cn(
                    "flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all group",
                    isActive 
                      ? "bg-blue-600 text-white font-semibold shadow-xs shadow-blue-600/30" 
                      : "text-slate-400 hover:text-slate-100 hover:bg-slate-900"
                  )}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <item.icon className="w-4 h-4 shrink-0 text-slate-400 group-hover:text-slate-200 group-[.active]:text-white" />
                    <span className="truncate">{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className={cn("text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-full", item.badgeColor)}>
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              ))}
            </div>
          ))}
        </div>

        {/* Current Admin User Footnote */}
        <div className="p-3 border-t border-slate-800/80 bg-slate-950/60 space-y-2">
          <div className="flex items-center gap-2.5 px-1">
            <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 text-blue-400 flex items-center justify-center font-bold text-xs">
              {currentAdminUser?.name ? currentAdminUser.name.charAt(0) : 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-slate-200 truncate">
                {currentAdminUser?.name || 'Administrator'}
              </div>
              <div className="text-[10px] text-slate-500 truncate">
                {currentAdminUser?.systemRole?.toUpperCase() || 'ADMIN'}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-1.5 pt-1">
            <button
              onClick={handleSwitchToStudent}
              className="py-1.5 px-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[11px] font-medium text-slate-300 flex items-center justify-center gap-1 transition-colors"
              title="Return to Student Portal"
            >
              <ExternalLink className="w-3 h-3" />
              Student Portal
            </button>
            <button
              onClick={handleLogout}
              className="py-1.5 px-2 rounded-lg bg-slate-900 hover:bg-rose-950/40 hover:text-rose-400 hover:border-rose-900/50 border border-slate-800 text-[11px] font-medium text-slate-400 flex items-center justify-center gap-1 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-3 h-3" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Operational Workspace */}
      <main className="flex-1 flex flex-col min-w-0 bg-slate-900 overflow-y-auto">
        {/* Top Operational Action Bar */}
        <header className="sticky top-0 z-10 bg-slate-900/90 backdrop-blur-md border-b border-slate-800/80 px-4 md:px-6 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-x-auto py-0.5 scrollbar-none">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider shrink-0 hidden lg:inline">
              Quick Actions:
            </span>
            <button
              onClick={() => navigate('/admin/skills')}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-blue-600/30 hover:text-blue-300 border border-slate-700 text-xs font-semibold text-slate-300 transition-colors whitespace-nowrap cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5 text-blue-400" />
              Add Skill
            </button>
            <button
              onClick={() => navigate('/admin/opportunities')}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-teal-600/30 hover:text-teal-300 border border-slate-700 text-xs font-semibold text-slate-300 transition-colors whitespace-nowrap cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5 text-teal-400" />
              Add Opportunity
            </button>
            <button
              onClick={() => navigate('/admin/g-one')}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-amber-600/30 hover:text-amber-300 border border-slate-700 text-xs font-semibold text-slate-300 transition-colors whitespace-nowrap cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Review G-ONE
            </button>
            <button
              onClick={() => navigate('/admin/assessments')}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-indigo-600/30 hover:text-indigo-300 border border-slate-700 text-xs font-semibold text-slate-300 transition-colors whitespace-nowrap cursor-pointer"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
              Review Assessment
            </button>
            <button
              onClick={() => navigate('/admin/research')}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-emerald-600/30 hover:text-emerald-300 border border-slate-700 text-xs font-semibold text-slate-300 transition-colors whitespace-nowrap cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
              View Research
            </button>
            <button
              onClick={() => navigate('/admin/exhibition')}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors whitespace-nowrap cursor-pointer shadow-xs"
            >
              <Presentation className="w-3.5 h-3.5" />
              Open Exhibition
            </button>
          </div>

          <div className="flex items-center gap-3 shrink-0 ml-3">
            <ModeToggle />
          </div>
        </header>

        {/* View Outlet */}
        <div className="p-4 md:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
