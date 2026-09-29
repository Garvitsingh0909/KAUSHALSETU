import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { 
  Settings, 
  Activity, 
  Filter, 
  Search, 
  ShieldCheck, 
  Monitor,
  Moon,
  Sun,
  Database
} from 'lucide-react';
import { cn } from '../../lib/utils';

export function AdminSettings() {
  const { activityLogs } = useAdmin();
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('dark');
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<'all' | 'System' | 'User' | 'Skill' | 'Opportunity' | 'G-ONE' | 'Assessment' | 'Research' | 'Exhibition'>('all');

  const filteredLogs = activityLogs.filter(log => {
    const matchesSearch = 
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.targetLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.adminName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = filterCategory === 'all' || log.targetCategory === filterCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-slate-400" />
            <h1 className="text-xl font-black tracking-tight text-white">PLATFORM SETTINGS & LOGS</h1>
            <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
              AUDIT TRAIL
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Global system preferences and comprehensive administrative action history.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Settings */}
        <div className="lg:col-span-1 space-y-6">
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <Monitor className="w-4 h-4 text-blue-400" />
                Admin Interface Theme
              </h2>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={() => setTheme('light')}
                className={cn(
                  "w-full flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer",
                  theme === 'light' ? "bg-slate-100 border-slate-300 text-slate-900" : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700"
                )}
              >
                <div className="flex items-center gap-2">
                  <Sun className="w-4 h-4" />
                  <span className="text-xs font-bold">Light Mode</span>
                </div>
                {theme === 'light' && <div className="w-2 h-2 rounded-full bg-blue-600" />}
              </button>

              <button
                onClick={() => setTheme('dark')}
                className={cn(
                  "w-full flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer",
                  theme === 'dark' ? "bg-blue-900/20 border-blue-500/50 text-blue-400" : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700"
                )}
              >
                <div className="flex items-center gap-2">
                  <Moon className="w-4 h-4" />
                  <span className="text-xs font-bold">Dark Mode</span>
                </div>
                {theme === 'dark' && <div className="w-2 h-2 rounded-full bg-blue-400" />}
              </button>

              <button
                onClick={() => setTheme('system')}
                className={cn(
                  "w-full flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer",
                  theme === 'system' ? "bg-slate-800 border-slate-600 text-white" : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700"
                )}
              >
                <div className="flex items-center gap-2">
                  <Monitor className="w-4 h-4" />
                  <span className="text-xs font-bold">System Sync</span>
                </div>
                {theme === 'system' && <div className="w-2 h-2 rounded-full bg-slate-300" />}
              </button>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <Database className="w-4 h-4 text-emerald-400" />
                Data Retention
              </h2>
            </div>
            <div className="text-xs text-slate-400 space-y-2">
              <p>Activity logs are currently stored in local persistence. Historical records exceeding 100 entries are automatically archived to maintain dashboard performance.</p>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 font-mono text-[10px]">
                Total Local Logs: {activityLogs.length} / 100
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Activity Log Stream */}
        <div className="lg:col-span-2 space-y-4">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search logs..."
                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
              <select
                value={filterCategory}
                onChange={(e: any) => setFilterCategory(e.target.value)}
                className="px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="all">All Categories</option>
                <option value="System">System</option>
                <option value="User">User Accounts</option>
                <option value="Skill">Skills & Graph</option>
                <option value="Opportunity">Opportunities</option>
                <option value="G-ONE">G-ONE Actions</option>
                <option value="Assessment">Assessments</option>
                <option value="Research">Research</option>
                <option value="Exhibition">Exhibition</option>
              </select>
            </div>
          </div>

          <div className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-900/80 text-slate-400 uppercase font-mono text-[10px] tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="px-4 py-3">Timestamp</th>
                    <th className="px-4 py-3">Administrator</th>
                    <th className="px-4 py-3">Action Type</th>
                    <th className="px-4 py-3">Target Entity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredLogs.length > 0 ? (
                    filteredLogs.map((log, i) => (
                      <tr key={`${log.id}-${i}`} className="hover:bg-slate-900/50 transition-colors">
                        <td className="px-4 py-3.5 font-mono text-[10px] text-slate-500 whitespace-nowrap">
                          {log.timestamp}
                        </td>
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-md bg-slate-800 text-slate-400 flex items-center justify-center font-bold text-[10px]">
                              {log.adminName.charAt(0)}
                            </div>
                            <span className="font-medium text-slate-200">{log.adminName}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3.5">
                          <span className={cn(
                            "px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase",
                            log.targetCategory === 'System' ? "bg-slate-800 text-slate-300 border border-slate-700" :
                            log.targetCategory === 'User' ? "bg-blue-500/20 text-blue-300 border border-blue-500/30" :
                            log.targetCategory === 'G-ONE' ? "bg-amber-500/20 text-amber-300 border border-amber-500/30" :
                            log.targetCategory === 'Exhibition' ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" :
                            log.targetCategory === 'Assessment' ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30" :
                            "bg-teal-500/20 text-teal-300 border border-teal-500/30"
                          )}>
                            {log.targetCategory}
                          </span>
                          <div className="mt-1 font-semibold text-slate-100">{log.action}</div>
                        </td>
                        <td className="px-4 py-3.5 text-slate-400 font-mono text-[11px]">
                          {log.targetLabel}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="px-4 py-8 text-center text-slate-500 font-mono text-xs">
                        No administrative logs match your current filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
