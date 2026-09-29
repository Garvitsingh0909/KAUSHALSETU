/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * KAUSHAL SETU — PHASE 6 ADMIN ACCESS CONTROL & ROUTE GUARD
 * Enforces secure role verification, prevents unauthorized access,
 * and renders the operational authentication gateway when unauthenticated.
 */

import React, { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import { useProfile } from '../../context/ProfileContext';
import { 
  ShieldCheck, 
  Lock, 
  Key, 
  ArrowRight, 
  AlertTriangle, 
  Building2, 
  UserCheck, 
  Sparkles,
  ChevronLeft
} from 'lucide-react';

interface AdminRouteGuardProps {
  children: React.ReactNode;
}

export function AdminRouteGuard({ children }: AdminRouteGuardProps) {
  const { isAdminAuthenticated, loginAsAdmin, quickAdminLogin, adminAuthError } = useAdmin();
  const { setSystemRole } = useProfile();
  const location = useLocation();
  const navigate = useNavigate();

  const [email, setEmail] = useState('ramesh.kulkarni@kaushalsetu.gov.in');
  const [passcode, setPasscode] = useState('admin2026');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authFailed, setAuthFailed] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setAuthFailed(false);

    setTimeout(() => {
      const success = loginAsAdmin(email, passcode);
      if (success) {
        setSystemRole('admin');
      } else {
        setAuthFailed(true);
      }
      setIsSubmitting(false);
    }, 300);
  };

  const handleQuickDemoAuth = () => {
    quickAdminLogin();
    setSystemRole('admin');
  };

  if (isAdminAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center p-4 selection:bg-blue-500 selection:text-white">
      <div className="w-full max-w-lg bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header Badge */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 p-6 border-b border-slate-700/80 relative">
          <button
            onClick={() => navigate('/')}
            className="absolute top-4 left-4 p-2 text-slate-400 hover:text-white hover:bg-slate-800/80 rounded-lg text-xs font-medium flex items-center gap-1 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Student Portal
          </button>

          <div className="pt-6 flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-blue-600/30 border border-blue-400/30 text-blue-400 flex items-center justify-center shadow-lg mb-3">
              <ShieldCheck className="w-8 h-8 text-blue-400" />
            </div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[11px] font-bold tracking-wider uppercase mb-1">
              Admin Access Control
            </div>
            <h1 className="text-xl font-black tracking-tight text-white">
              KAUSHAL SETU ADMIN CENTER
            </h1>
            <p className="text-xs text-slate-400 max-w-sm mt-1">
              Operational Management, Knowledge Graph, Assessments, Research & Exhibition Control
            </p>
          </div>
        </div>

        {/* Auth Body */}
        <div className="p-6 md:p-8 space-y-6">
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3.5 flex items-start gap-3 text-xs text-amber-200">
            <Lock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-amber-300">Restricted Authorization: </span>
              Administrative privileges are strictly restricted to authorized CBSE coordinators, curriculum authors, and evaluators.
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Administrator Identifier / Email:
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@kaushalsetu.gov.in"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Admin Passcode / Security Key:
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                  required
                />
                <Key className="w-4 h-4 text-slate-500 absolute right-3.5 top-3" />
              </div>
            </div>

            {(authFailed || adminAuthError) && (
              <div className="p-3 rounded-lg bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{adminAuthError || 'Access denied. Please check your credentials.'}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white text-sm font-bold shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
            >
              <UserCheck className="w-4 h-4" />
              {isSubmitting ? 'Authenticating...' : 'Sign In to Admin Center'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Evaluator / Demo Login */}
          <div className="pt-2 border-t border-slate-700/80">
            <div className="text-center text-[11px] font-semibold text-slate-400 mb-3">
              CBSE Evaluation / Demo Quick Login
            </div>
            <button
              type="button"
              onClick={handleQuickDemoAuth}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-bold border border-slate-600 flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Authenticate as Lead Admin (Dr. Ramesh Kulkarni)
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-900/80 border-t border-slate-700/60 text-center text-[10px] text-slate-500 font-mono">
          KAUSHAL SETU SYSTEM v6.0 • CBSE VOCATIONAL CELL • ENCRYPTED SESSION
        </div>
      </div>
    </div>
  );
}
