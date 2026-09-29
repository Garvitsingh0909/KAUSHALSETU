/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * KAUSHAL SETU — PHASE 6 USER MANAGEMENT & STUDENT PROFILE VIEW
 * Admin search, filtering, status controls, and detailed student profile inspector
 * with skills, assessment attempts, business models, roadmaps, and G-ONE metrics.
 */

import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { AdminUserRecord } from '../../data/adminTypes';
import { 
  Users, 
  Search, 
  Filter, 
  UserCheck, 
  UserX, 
  ShieldAlert, 
  Eye, 
  X, 
  Cpu, 
  ShieldCheck, 
  Briefcase, 
  Compass, 
  FolderKanban, 
  Sparkles, 
  Building2, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { cn } from '../../lib/utils';

export function AdminUsers() {
  const { adminUsers, toggleUserStatus, updateUser } = useAdmin();
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'student' | 'admin'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'disabled'>('all');
  const [selectedUser, setSelectedUser] = useState<AdminUserRecord | null>(null);

  const filteredUsers = adminUsers.filter(u => {
    const matchesSearch = 
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.schoolOrOrg.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRole = 
      roleFilter === 'all' || 
      (roleFilter === 'student' && u.systemRole === 'student') ||
      (roleFilter === 'admin' && (u.systemRole === 'admin' || u.systemRole === 'super_admin' || u.systemRole === 'content_admin'));
    
    const matchesStatus = statusFilter === 'all' || u.accountStatus === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-400" />
            <h1 className="text-xl font-black tracking-tight text-white">USER MANAGEMENT</h1>
            <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-slate-800 text-slate-300">
              {filteredUsers.length} of {adminUsers.length} Accounts
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Review student and administrator profiles, verify active states, and audit learning progress safely.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by student name, school, email..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-2.5 w-full md:w-auto overflow-x-auto">
          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
            <span className="text-[11px] font-bold text-slate-400 px-2">Role:</span>
            <button
              onClick={() => setRoleFilter('all')}
              className={cn("px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer", roleFilter === 'all' ? "bg-blue-600 text-white font-bold" : "text-slate-400 hover:text-slate-200")}
            >
              All
            </button>
            <button
              onClick={() => setRoleFilter('student')}
              className={cn("px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer", roleFilter === 'student' ? "bg-blue-600 text-white font-bold" : "text-slate-400 hover:text-slate-200")}
            >
              Students
            </button>
            <button
              onClick={() => setRoleFilter('admin')}
              className={cn("px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer", roleFilter === 'admin' ? "bg-blue-600 text-white font-bold" : "text-slate-400 hover:text-slate-200")}
            >
              Admins
            </button>
          </div>

          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
            <span className="text-[11px] font-bold text-slate-400 px-2">Status:</span>
            <button
              onClick={() => setStatusFilter('all')}
              className={cn("px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer", statusFilter === 'all' ? "bg-slate-800 text-white font-bold" : "text-slate-400 hover:text-slate-200")}
            >
              All
            </button>
            <button
              onClick={() => setStatusFilter('active')}
              className={cn("px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer", statusFilter === 'active' ? "bg-emerald-600 text-white font-bold" : "text-slate-400 hover:text-slate-200")}
            >
              Active
            </button>
            <button
              onClick={() => setStatusFilter('disabled')}
              className={cn("px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer", statusFilter === 'disabled' ? "bg-rose-600 text-white font-bold" : "text-slate-400 hover:text-slate-200")}
            >
              Disabled
            </button>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/80 text-slate-400 uppercase font-mono text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="px-4 py-3">User & Organization</th>
                <th className="px-4 py-3">Role & Permissions</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-center">Skills</th>
                <th className="px-4 py-3 text-center">Assessments</th>
                <th className="px-4 py-3 text-center">Roadmap</th>
                <th className="px-4 py-3">Last Active</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredUsers.map(user => (
                <tr key={user.id} className="hover:bg-slate-900/50 transition-colors">
                  <td className="px-4 py-3.5">
                    <div className="font-bold text-slate-100">{user.name}</div>
                    <div className="text-[11px] text-slate-400">{user.email}</div>
                    <div className="text-[10px] text-slate-500 font-mono mt-0.5">{user.schoolOrOrg}</div>
                  </td>

                  <td className="px-4 py-3.5">
                    <span className={cn(
                      "px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase",
                      user.systemRole === 'admin' ? "bg-blue-500/20 text-blue-300 border border-blue-500/30" :
                      user.systemRole === 'content_admin' ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30" :
                      "bg-slate-800 text-slate-300"
                    )}>
                      {user.systemRole}
                    </span>
                    <div className="text-[10px] text-slate-400 mt-1 max-w-[160px] truncate">{user.displayRole}</div>
                  </td>

                  <td className="px-4 py-3.5">
                    <span className={cn(
                      "px-2 py-0.5 rounded-full text-[10px] font-bold inline-flex items-center gap-1",
                      user.accountStatus === 'active' ? "bg-emerald-500/20 text-emerald-300" : "bg-rose-500/20 text-rose-300"
                    )}>
                      <span className={cn("w-1.5 h-1.5 rounded-full", user.accountStatus === 'active' ? "bg-emerald-400" : "bg-rose-400")} />
                      {user.accountStatus.toUpperCase()}
                    </span>
                  </td>

                  <td className="px-4 py-3.5 text-center font-bold text-slate-200">
                    {user.skillsCount}
                  </td>

                  <td className="px-4 py-3.5 text-center font-bold text-indigo-400">
                    {user.assessmentsCount}
                  </td>

                  <td className="px-4 py-3.5 text-center">
                    <div className="inline-flex items-center gap-1.5">
                      <div className="w-12 bg-slate-800 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: `${user.roadmapProgressPct}%` }} />
                      </div>
                      <span className="font-mono text-[10px] text-slate-400">{user.roadmapProgressPct}%</span>
                    </div>
                  </td>

                  <td className="px-4 py-3.5 font-mono text-[11px] text-slate-400 whitespace-nowrap">
                    {user.lastLogin}
                  </td>

                  <td className="px-4 py-3.5 text-right space-x-1.5 whitespace-nowrap">
                    <button
                      onClick={() => setSelectedUser(user)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-blue-600 hover:text-white text-slate-300 transition-colors cursor-pointer"
                      title="Inspect Student Profile"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => toggleUserStatus(user.id)}
                      className={cn(
                        "p-1.5 rounded-lg transition-colors cursor-pointer",
                        user.accountStatus === 'active' 
                          ? "bg-slate-800 text-slate-400 hover:bg-rose-600 hover:text-white" 
                          : "bg-emerald-950 text-emerald-400 hover:bg-emerald-600 hover:text-white"
                      )}
                      title={user.accountStatus === 'active' ? 'Disable Account' : 'Enable Account'}
                    >
                      {user.accountStatus === 'active' ? <UserX className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Student Profile Inspector Drawer / Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-500/40 text-blue-400 flex items-center justify-center font-bold text-base">
                  {selectedUser.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-base font-bold text-white flex items-center gap-2">
                    {selectedUser.name}
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 uppercase">
                      {selectedUser.systemRole}
                    </span>
                  </h2>
                  <p className="text-xs text-slate-400">{selectedUser.schoolOrOrg} • {selectedUser.email}</p>
                </div>
              </div>

              <button
                onClick={() => setSelectedUser(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-300">
              {/* Profile Overview Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase font-mono">Selected Skills</div>
                  <div className="text-lg font-black text-white mt-0.5">{selectedUser.skillsCount}</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase font-mono">Assessments Completed</div>
                  <div className="text-lg font-black text-indigo-400 mt-0.5">{selectedUser.assessmentsCount}</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase font-mono">Opportunities Explored</div>
                  <div className="text-lg font-black text-teal-400 mt-0.5">{selectedUser.opportunitiesCount}</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase font-mono">Roadmap Progress</div>
                  <div className="text-lg font-black text-amber-400 mt-0.5">{selectedUser.roadmapProgressPct}%</div>
                </div>
              </div>

              {/* Skills */}
              <div className="space-y-2">
                <div className="font-bold text-slate-200 flex items-center gap-1.5 text-xs uppercase font-mono">
                  <Cpu className="w-3.5 h-3.5 text-blue-400" />
                  Active Skill Portfolio
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex flex-wrap gap-2">
                  {selectedUser.skillsList && selectedUser.skillsList.length > 0 ? (
                    selectedUser.skillsList.map((skill, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-lg bg-blue-950/60 border border-blue-800/60 text-blue-300 font-medium text-xs">
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-slate-500">Graphic Design, Photography & Media, Communication</span>
                  )}
                </div>
              </div>

              {/* Learning Roadmap & Business Simulation */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="font-bold text-slate-200 flex items-center gap-1.5 uppercase font-mono text-[11px]">
                    <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
                    Saved Business Simulations
                  </div>
                  <div className="text-slate-300">
                    <div className="font-semibold text-white">Artisan Product Photography & Storefront</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Target: ₹1,500/unit • Break-Even: 2 units • Monthly Target: ₹12,000</div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="font-bold text-slate-200 flex items-center gap-1.5 uppercase font-mono text-[11px]">
                    <Compass className="w-3.5 h-3.5 text-amber-400" />
                    Current Roadmap Stage
                  </div>
                  <div className="text-slate-300">
                    <div className="font-semibold text-white">Stage 3: Portfolio & Live Deliverable</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Next milestone: Local shopkeeper demonstration shoot</div>
                  </div>
                </div>
              </div>

              {/* G-ONE Interaction Privacy Safe Guard */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-200 text-xs">G-ONE Platform Telemetry (Privacy Enforced)</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Logged <strong>{selectedUser.gOneInteractionsCount}</strong> structured reasoning queries. Student conversational transcript is strictly protected per CBSE privacy rules.
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
              <div className="text-[11px] text-slate-500 font-mono">
                Account created: {selectedUser.createdDate}
              </div>
              <button
                onClick={() => setSelectedUser(null)}
                className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
