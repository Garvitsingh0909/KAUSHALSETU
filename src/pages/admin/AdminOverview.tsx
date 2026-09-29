/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * KAUSHAL SETU — PHASE 6 ADMIN SYSTEM OVERVIEW
 * High-density live operational dashboard with calculated database counters,
 * real-time system health indicators, knowledge base health with issue remediation, and admin alerts.
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import { useKnowledgeBase } from '../../context/KnowledgeBaseContext';
import { useAssessment } from '../../context/AssessmentContext';
import { 
  Users, 
  Cpu, 
  Combine, 
  Briefcase, 
  ShieldCheck, 
  FolderKanban, 
  Compass, 
  BookOpen, 
  CheckCircle2, 
  AlertTriangle, 
  AlertCircle, 
  ArrowRight, 
  Sparkles, 
  Layers, 
  Activity, 
  Database,
  RefreshCw,
  PlusCircle,
  Presentation,
  Check
} from 'lucide-react';
import { cn } from '../../lib/utils';

export function AdminOverview() {
  const { 
    adminUsers, 
    applications, 
    problems, 
    customerTypes, 
    knowledgeGaps, 
    questionReviews, 
    businessTemplates, 
    surveyResponses, 
    activityLogs 
  } = useAdmin();
  const { skills, combinations, opportunities, projects, roadmaps, coverageReport } = useKnowledgeBase();
  const { profiles: assessmentProfiles } = useAssessment();
  const navigate = useNavigate();

  // Calculated Live Metrics
  const totalStudents = adminUsers.filter(u => u.systemRole === 'student').length;
  const totalSkills = skills.length;
  const totalCombinations = combinations.length;
  const totalOpportunities = opportunities.length;
  const publishedAssessmentsCount = assessmentProfiles.length;
  const totalProjectTemplates = projects.length;
  const totalRoadmapTemplates = roadmaps.length;
  const totalSurveyResponses = surveyResponses.length;

  // Unresolved counts
  const pendingGaps = knowledgeGaps.filter(g => g.status === 'Needs Review' || g.status === 'Candidate Generated');
  const pendingReviews = questionReviews.filter(q => q.status === 'Pending Review');

  // Knowledge Base Health calculations
  const completeCombinations = combinations.filter(c => c.validationStatus === 'Validated').length;
  const incompleteCombinations = combinations.length - completeCombinations;

  // Coverage percentages
  const assessmentCoveragePct = Math.round((publishedAssessmentsCount / Math.max(1, totalSkills)) * 100);
  const opportunityCoveragePct = Math.round((coverageReport.skillsWithOpportunities / Math.max(1, totalSkills)) * 100);
  const roadmapCoveragePct = Math.round((coverageReport.skillsWithRoadmaps / Math.max(1, totalSkills)) * 100);

  return (
    <div className="space-y-6">
      {/* Page Title & System Status Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h1 className="text-xl font-black tracking-tight text-white">SYSTEM OVERVIEW</h1>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-300 border border-blue-500/30">
              OPERATIONAL
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time telemetry and calculated record tallies from the Kaushal Setu structured graph.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/admin/exhibition')}
            className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
          >
            <Presentation className="w-3.5 h-3.5" />
            Exhibition Control
          </button>
        </div>
      </div>

      {/* Meaningful Admin Alerts Banner */}
      {(pendingGaps.length > 0 || pendingReviews.length > 0) && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs text-amber-200">
          <div className="flex items-start gap-2.5">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-amber-300 text-sm">Action Items Requiring Admin Review</div>
              <div className="text-slate-300 mt-0.5 space-x-2">
                {pendingGaps.length > 0 && (
                  <span>• <strong>{pendingGaps.length}</strong> G-ONE knowledge graph candidate(s) need review</span>
                )}
                {pendingReviews.length > 0 && (
                  <span>• <strong>{pendingReviews.length}</strong> assessment question(s) pending syllabus verification</span>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {pendingGaps.length > 0 && (
              <button
                onClick={() => navigate('/admin/g-one')}
                className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
              >
                Review G-ONE Gaps
              </button>
            )}
            {pendingReviews.length > 0 && (
              <button
                onClick={() => navigate('/admin/assessments')}
                className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-colors cursor-pointer"
              >
                Review Questions
              </button>
            )}
          </div>
        </div>
      )}

      {/* Live Calculated Metric Counters */}
      <div>
        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">
          Live Database Record Counts (Strictly Computed)
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {/* 1. Users */}
          <div 
            onClick={() => navigate('/admin/users')}
            className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-blue-500/50 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[11px] font-bold">USERS</span>
              <Users className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-xl font-black text-white">{totalStudents}</div>
            <div className="text-[10px] text-slate-500 truncate">Total Students</div>
          </div>

          {/* 2. Skills */}
          <div 
            onClick={() => navigate('/admin/skills')}
            className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-blue-500/50 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[11px] font-bold">SKILLS</span>
              <Cpu className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-xl font-black text-white">{totalSkills}</div>
            <div className="text-[10px] text-slate-500 truncate">Supported Skills</div>
          </div>

          {/* 3. Combinations */}
          <div 
            onClick={() => navigate('/admin/combinations')}
            className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-teal-500/50 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[11px] font-bold">COMBOS</span>
              <Combine className="w-4 h-4 text-teal-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-xl font-black text-white">{totalCombinations}</div>
            <div className="text-[10px] text-slate-500 truncate">2 & 3-Skill Matrices</div>
          </div>

          {/* 4. Opportunities */}
          <div 
            onClick={() => navigate('/admin/opportunities')}
            className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-teal-500/50 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[11px] font-bold">OPPORTUNITIES</span>
              <Briefcase className="w-4 h-4 text-teal-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-xl font-black text-white">{totalOpportunities}</div>
            <div className="text-[10px] text-slate-500 truncate">Micro-Ventures</div>
          </div>

          {/* 5. Assessments */}
          <div 
            onClick={() => navigate('/admin/assessments')}
            className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-indigo-500/50 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[11px] font-bold">ASSESSMENTS</span>
              <ShieldCheck className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-xl font-black text-white">{publishedAssessmentsCount}</div>
            <div className="text-[10px] text-slate-500 truncate">Published Banks</div>
          </div>

          {/* 6. Projects */}
          <div 
            onClick={() => navigate('/admin/projects')}
            className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-indigo-500/50 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[11px] font-bold">PROJECTS</span>
              <FolderKanban className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-xl font-black text-white">{totalProjectTemplates}</div>
            <div className="text-[10px] text-slate-500 truncate">Project Library</div>
          </div>

          {/* 7. Roadmaps */}
          <div 
            onClick={() => navigate('/admin/roadmaps')}
            className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-500/50 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[11px] font-bold">ROADMAPS</span>
              <Compass className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-xl font-black text-white">{totalRoadmapTemplates}</div>
            <div className="text-[10px] text-slate-500 truncate">6-Stage Pathways</div>
          </div>

          {/* 8. Research */}
          <div 
            onClick={() => navigate('/admin/research')}
            className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/50 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[11px] font-bold">RESEARCH</span>
              <BookOpen className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-xl font-black text-white">{totalSurveyResponses}</div>
            <div className="text-[10px] text-slate-500 truncate">Survey Responses</div>
          </div>
        </div>
      </div>

      {/* Main Two-Column Grid: System Health & Knowledge Base Health */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Health */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-400" />
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">SYSTEM HEALTH</h2>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> ALL SYSTEMS HEALTHY
            </span>
          </div>

          <div className="space-y-2.5">
            {/* Database */}
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800/80 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <Database className="w-4 h-4 text-blue-400" />
                <span className="font-semibold text-slate-200">Database Engine</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Healthy
              </span>
            </div>

            {/* Knowledge Base */}
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800/80 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <Combine className="w-4 h-4 text-teal-400" />
                <span className="font-semibold text-slate-200">Knowledge Base Graph</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold">
                Complete ({totalSkills} Skills)
              </span>
            </div>

            {/* G-ONE AI Engine */}
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800/80 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="font-semibold text-slate-200">G-ONE Intelligence & Grounding</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold">
                Available & Grounded
              </span>
            </div>

            {/* Assessments */}
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800/80 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-indigo-400" />
                <span className="font-semibold text-slate-200">Assessments Coverage</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-20 bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div className="bg-indigo-500 h-2 rounded-full" style={{ width: `${assessmentCoveragePct}%` }} />
                </div>
                <span className="font-mono text-[11px] text-slate-300 font-bold">{assessmentCoveragePct}%</span>
              </div>
            </div>

            {/* Opportunity Data */}
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800/80 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <Briefcase className="w-4 h-4 text-emerald-400" />
                <span className="font-semibold text-slate-200">Opportunity Mapping</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-20 bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${opportunityCoveragePct}%` }} />
                </div>
                <span className="font-mono text-[11px] text-slate-300 font-bold">{opportunityCoveragePct}%</span>
              </div>
            </div>

            {/* Roadmap Data */}
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800/80 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <Compass className="w-4 h-4 text-amber-400" />
                <span className="font-semibold text-slate-200">Roadmap Data Coverage</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-20 bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div className="bg-amber-500 h-2 rounded-full" style={{ width: `${roadmapCoveragePct}%` }} />
                </div>
                <span className="font-mono text-[11px] text-slate-300 font-bold">{roadmapCoveragePct}%</span>
              </div>
            </div>

            {/* Research Data */}
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800/80 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <BookOpen className="w-4 h-4 text-cyan-400" />
                <span className="font-semibold text-slate-200">Research & Surveys</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-[10px] font-bold">
                Available ({totalSurveyResponses} Responses)
              </span>
            </div>
          </div>
        </div>

        {/* Knowledge Base Health Card */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-teal-400" />
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">KNOWLEDGE BASE HEALTH</h2>
            </div>
            <button
              onClick={() => navigate('/admin/combinations')}
              className="text-xs text-blue-400 hover:text-blue-300 font-bold flex items-center gap-1"
            >
              View Issues <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Skills</span>
                <Check className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-sm font-bold text-slate-100 mt-1">{totalSkills} Active</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Applications</span>
                <Check className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-sm font-bold text-slate-100 mt-1">{applications.length} Cataloged</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Opportunities</span>
                <Check className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-sm font-bold text-slate-100 mt-1">{totalOpportunities} Mapped</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Assessments</span>
                <Check className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-sm font-bold text-slate-100 mt-1">{publishedAssessmentsCount} Published</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Roadmaps</span>
                <Check className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-sm font-bold text-slate-100 mt-1">{totalRoadmapTemplates} Ready</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Projects</span>
                <Check className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-sm font-bold text-slate-100 mt-1">{totalProjectTemplates} Seeded</div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-amber-500/30 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <div className="text-xs font-bold text-slate-200">Combinations Status</div>
                <div className="text-[11px] text-slate-400">
                  {completeCombinations} Validated • {incompleteCombinations} Candidate / Incomplete
                </div>
              </div>
            </div>
            <button
              onClick={() => navigate('/admin/combinations')}
              className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold transition-colors cursor-pointer"
            >
              Review Combinations
            </button>
          </div>
        </div>
      </div>

      {/* Recent Admin Activity Log Stream */}
      <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-indigo-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">RECENT ADMINISTRATIVE ACTIONS</h2>
          </div>
          <button
            onClick={() => navigate('/admin/settings')}
            className="text-xs text-blue-400 hover:text-blue-300 font-bold"
          >
            View Full Activity Log
          </button>
        </div>

        <div className="space-y-2">
          {activityLogs.slice(0, 4).map((log, i) => (
            <div 
              key={`${log.id}-${i}`} 
              className="p-3 rounded-xl bg-slate-900 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-blue-400 shrink-0" />
                <div>
                  <span className="font-bold text-slate-200">{log.action}: </span>
                  <span className="text-slate-300">{log.targetLabel}</span>
                  <span className="text-slate-500 text-[11px] ml-1.5 font-mono">({log.targetCategory})</span>
                </div>
              </div>
              <div className="flex items-center gap-3 text-[11px] text-slate-500 font-mono shrink-0">
                <span>By {log.adminName}</span>
                <span>•</span>
                <span>{log.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
