/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * KAUSHAL SETU — PHASE 6 ASSESSMENT CENTER & QUESTION REVIEW QUEUE
 * Assessment bank oversight, rubric calibrations, question approval/rejection workflows,
 * and CBSE vocational competency standard validation.
 */

import React, { useState } from 'react';
import { useAssessment } from '../../context/AssessmentContext';
import { useAdmin } from '../../context/AdminContext';
import { QuestionReviewItem } from '../../data/adminTypes';
import { 
  FileQuestion, 
  Search, 
  Check, 
  X, 
  Edit3, 
  Eye, 
  ShieldCheck, 
  PlusCircle, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  BookOpen, 
  Layers,
  Save
} from 'lucide-react';
import { cn } from '../../lib/utils';

export function AdminAssessments() {
  const { profiles: assessmentProfiles, assessmentResults } = useAssessment();
  const { questionReviews, approveQuestionReview, rejectQuestionReview, updateQuestionReview, logAdminAction } = useAdmin();

  const [activeTab, setActiveTab] = useState<'review-queue' | 'assessment-banks'>('review-queue');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReview, setSelectedReview] = useState<QuestionReviewItem | null>(null);
  const [isEditingReview, setIsEditingReview] = useState(false);
  const [editedPrompt, setEditedPrompt] = useState('');

  const pendingReviews = questionReviews.filter(q => q.status === 'Pending Review');

  const filteredReviews = questionReviews.filter(q => 
    q.questionPrompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.skillName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.competency.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleApprove = (item: QuestionReviewItem) => {
    approveQuestionReview(item.id);
    if (selectedReview?.id === item.id) {
      setSelectedReview({ ...item, status: 'Approved' });
    }
  };

  const handleReject = (item: QuestionReviewItem) => {
    rejectQuestionReview(item.id);
    if (selectedReview?.id === item.id) {
      setSelectedReview({ ...item, status: 'Rejected' });
    }
  };

  const handleOpenEdit = (item: QuestionReviewItem) => {
    setSelectedReview(item);
    setEditedPrompt(item.questionPrompt);
    setIsEditingReview(true);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedReview || !editedPrompt.trim()) return;

    const updatedReview: QuestionReviewItem = {
      ...selectedReview,
      questionPrompt: editedPrompt.trim()
    };

    updateQuestionReview(updatedReview);
    logAdminAction('Updated Question Prompt', 'Assessment', updatedReview.id, updatedReview.competency);

    setIsEditingReview(false);
    setSelectedReview(updatedReview);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-indigo-400" />
            <h1 className="text-xl font-black tracking-tight text-white">ASSESSMENTS & QUESTION REVIEW</h1>
            <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              CBSE VOCATIONAL
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Question bank review queue, difficulty calibrations, rubric matrices, and published assessment monitoring.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('review-queue')}
            className={cn(
              "px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer flex items-center gap-1.5",
              activeTab === 'review-queue' ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-slate-200"
            )}
          >
            Review Queue
            {pendingReviews.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-amber-500 text-slate-950 text-[10px] font-mono">
                {pendingReviews.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('assessment-banks')}
            className={cn(
              "px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer flex items-center gap-1.5",
              activeTab === 'assessment-banks' ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-slate-200"
            )}
          >
            Published Banks ({assessmentProfiles.length})
          </button>
        </div>
      </div>

      {activeTab === 'review-queue' ? (
        <div className="space-y-4">
          {/* Search bar */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search question prompt, skill, competency..."
                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            <div className="text-xs text-slate-400 font-mono hidden md:block">
              {filteredReviews.length} Questions Cataloged
            </div>
          </div>

          {/* Reviews List */}
          <div className="space-y-3">
            {filteredReviews.map(item => (
              <div 
                key={item.id}
                className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                      {item.skillName}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                      {item.competency}
                    </span>
                    <span className={cn(
                      "text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase",
                      item.difficulty === 'advanced' ? "bg-rose-500/20 text-rose-300" :
                      item.difficulty === 'intermediate' ? "bg-amber-500/20 text-amber-300" :
                      "bg-emerald-500/20 text-emerald-300"
                    )}>
                      {item.difficulty}
                    </span>
                    <span className={cn(
                      "text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase",
                      item.status === 'Approved' ? "bg-emerald-500/20 text-emerald-300" :
                      item.status === 'Rejected' ? "bg-rose-500/20 text-rose-300" :
                      "bg-amber-500/20 text-amber-300"
                    )}>
                      {item.status}
                    </span>
                  </div>

                  <div className="text-xs font-bold text-slate-100">
                    {item.questionPrompt}
                  </div>

                  {item.hint && (
                    <div className="text-[11px] text-amber-300/90 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 shrink-0" />
                      <span><strong>G-ONE Hint: </strong>{item.hint}</span>
                    </div>
                  )}

                  <div className="text-[11px] text-slate-500 font-mono">
                    Type: {item.questionType} • Target: {item.targetProficiency} • Date: {item.submittedDate}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                  <button
                    onClick={() => handleOpenEdit(item)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors cursor-pointer"
                    title="Edit Question Prompt"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>

                  {item.status !== 'Approved' && (
                    <button
                      onClick={() => handleApprove(item)}
                      className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Check className="w-3.5 h-3.5" />
                      Approve
                    </button>
                  )}

                  {item.status !== 'Rejected' && (
                    <button
                      onClick={() => handleReject(item)}
                      className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-rose-950/50 hover:text-rose-400 text-slate-400 text-xs font-bold transition-colors cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                      Reject
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Assessment Banks Tab */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {assessmentProfiles.map(profile => (
            <div key={profile.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-start justify-between">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  PUBLISHED BANK
                </span>
                <span className="text-[10px] text-slate-400 font-mono">v{profile.version || '1.0'}</span>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white">{profile.skillName}</h3>
                <p className="text-xs text-slate-400 mt-1">{profile.description}</p>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800/80 grid grid-cols-3 gap-1 text-center text-xs">
                <div>
                  <div className="text-[9px] text-slate-500 font-mono">MCQs</div>
                  <div className="font-bold text-slate-200">{profile.mcqQuestions?.length || 5}</div>
                </div>
                <div>
                  <div className="text-[9px] text-slate-500 font-mono">Scenario</div>
                  <div className="font-bold text-teal-300">{profile.scenarioQuestions?.length || 2}</div>
                </div>
                <div>
                  <div className="text-[9px] text-slate-500 font-mono">Practical</div>
                  <div className="font-bold text-indigo-300">{profile.practicalTasks?.length || 1}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {isEditingReview && selectedReview && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h2 className="text-sm font-bold text-white">Edit Question Formulation</h2>
              <button onClick={() => setIsEditingReview(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Question Prompt:</label>
                <textarea
                  rows={4}
                  value={editedPrompt}
                  onChange={(e) => setEditedPrompt(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:ring-1 focus:ring-indigo-500"
                  required
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditingReview(false)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
