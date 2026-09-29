/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * KAUSHAL SETU — ADMIN ASSESSMENT & QUESTION BANK BUILDER (PHASE 5B)
 * Enables teachers, curriculum designers, and administrators to add, edit,
 * validate, version, and publish structured questions, practical tasks, and rubrics.
 */

import React, { useState, useEffect } from 'react';
import { useAssessment } from '../../context/AssessmentContext';
import { useProfile } from '../../context/ProfileContext';
import { SKILLS_DB } from '../../data/skills';
import { 
  QuestionItem, 
  QuestionDifficulty, 
  QuestionType, 
  PracticalTask, 
  TaskRubricCriterion 
} from '../../data/assessmentTypes';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  CheckCircle2, 
  AlertCircle, 
  Layers, 
  FileCode, 
  HelpCircle,
  Eye,
  Sliders,
  Sparkles,
  ShieldAlert
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface AdminAssessmentBuilderProps {
  initialSkillId?: string;
  onClose?: () => void;
}

export function AdminAssessmentBuilder({
  initialSkillId,
  onClose
}: AdminAssessmentBuilderProps) {
  const { profiles, getProfileForSkill, updateProfile, addQuestionToProfile, deleteQuestionFromProfile } = useAssessment();
  const { allSkills } = useProfile();

  const [selectedSkillId, setSelectedSkillId] = useState<string>(
    initialSkillId || SKILLS_DB[0].id
  );

  const selectedSkill = allSkills.find(s => s.id === selectedSkillId) || 
    SKILLS_DB.find(s => s.id === selectedSkillId) || 
    SKILLS_DB[0];
  const profile = getProfileForSkill(selectedSkillId, selectedSkill.name, selectedSkill.category);

  // Question editing / creation state
  const [isAddingQuestion, setIsAddingQuestion] = useState(false);
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);

  // New question form state
  const [qDifficulty, setQDifficulty] = useState<QuestionDifficulty>('Developing');
  const [qType, setQType] = useState<QuestionType>('multiple_choice');
  const [qCompetency, setQCompetency] = useState('');
  const [qPrompt, setQPrompt] = useState('');
  const [qOptions, setQOptions] = useState<string[]>(['Option A', 'Option B', 'Option C', 'Option D']);
  const [qCorrectAnswer, setQCorrectAnswer] = useState<string>('Option A');
  const [qExplanation, setQExplanation] = useState('');
  const [qHint, setQHint] = useState('');
  const [qScenario, setQScenario] = useState('');
  const [qCode, setQCode] = useState('');

  // Practical task editing state
  const [isEditingTask, setIsEditingTask] = useState(false);
  const [taskTitle, setTaskTitle] = useState(profile.practicalTask.title || '');
  const [taskInstructions, setTaskInstructions] = useState(profile.practicalTask.instructions || '');
  const [taskExpected, setTaskExpected] = useState(profile.practicalTask.expectedOutput || '');
  const [taskStarter, setTaskStarter] = useState(profile.practicalTask.starterTemplate || '');
  const [taskMinutes, setTaskMinutes] = useState(profile.practicalTask.timeEstimateMinutes || 15);

  useEffect(() => {
    if (initialSkillId) {
      setSelectedSkillId(initialSkillId);
    }
  }, [initialSkillId]);

  useEffect(() => {
    setTaskTitle(profile.practicalTask.title || '');
    setTaskInstructions(profile.practicalTask.instructions || '');
    setTaskExpected(profile.practicalTask.expectedOutput || '');
    setTaskStarter(profile.practicalTask.starterTemplate || '');
    setTaskMinutes(profile.practicalTask.timeEstimateMinutes || 15);
  }, [selectedSkillId, profile]);

  const handleOpenAddQuestion = () => {
    setIsAddingQuestion(true);
    setEditingQuestionId(null);
    setQDifficulty('Developing');
    setQType('multiple_choice');
    setQCompetency('');
    setQPrompt('');
    setQOptions(['', '', '', '']);
    setQCorrectAnswer('');
    setQExplanation('');
    setQHint('');
    setQScenario('');
    setQCode('');
  };

  const handleSaveQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!qPrompt.trim()) return;

    const newQuestion: QuestionItem = {
      id: editingQuestionId || `q_${selectedSkillId}_${Date.now()}`,
      skillId: selectedSkillId,
      difficulty: qDifficulty,
      type: qType,
      competency: qCompetency.trim() || 'General Proficiency',
      question: qPrompt.trim(),
      options: qType === 'true_false' ? ['True', 'False'] : qOptions.filter(o => o.trim() !== ''),
      correctAnswer: qType === 'true_false' ? qCorrectAnswer : qCorrectAnswer || qOptions[0],
      explanation: qExplanation.trim() || 'Verified pedagogical rule.',
      hint: qHint.trim() || undefined,
      scenarioContext: qScenario.trim() || undefined,
      codeSnippet: qCode.trim() || undefined,
      validationStatus: 'Validated',
      version: 1
    };

    if (editingQuestionId) {
      // Update existing
      const updatedQuestions = profile.questions.map(q => q.id === editingQuestionId ? newQuestion : q);
      updateProfile({
        ...profile,
        questions: updatedQuestions
      });
    } else {
      // Add new
      addQuestionToProfile(selectedSkillId, newQuestion);
    }

    setIsAddingQuestion(false);
    setEditingQuestionId(null);
  };

  const handleSaveTask = () => {
    const updatedTask: PracticalTask = {
      ...profile.practicalTask,
      title: taskTitle,
      instructions: taskInstructions,
      expectedOutput: taskExpected,
      starterTemplate: taskStarter,
      timeEstimateMinutes: Number(taskMinutes) || 15
    };

    updateProfile({
      ...profile,
      practicalTask: updatedTask
    });

    setIsEditingTask(false);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Admin Top Header */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-purple-50 text-purple-900 border border-purple-200 mb-2">
              <Sliders className="w-3.5 h-3.5 text-purple-600" /> Admin Assessment Builder
            </div>
            <h2 className="text-xl md:text-2xl font-black text-slate-900">
              Assessment Profile & Question Bank Editor
            </h2>
            <p className="text-xs md:text-sm text-slate-500 mt-1">
              Curate verified questions, configure adaptive difficulty thresholds, and establish skill-specific evaluation rubrics.
            </p>
          </div>

          {/* Skill Selector Dropdown */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-600">Select Skill:</span>
            <select
              value={selectedSkillId}
              onChange={(e) => {
                setSelectedSkillId(e.target.value);
                setIsAddingQuestion(false);
                setIsEditingTask(false);
              }}
              className="px-4 py-2.5 rounded-xl border border-slate-300 font-bold text-xs md:text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-purple-600"
            >
              {allSkills.map(s => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.category})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Selected Skill Version & Summary Status */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <span className="font-extrabold text-slate-900 text-sm">{selectedSkill.name}</span>
            <span className="px-2.5 py-0.5 rounded-md bg-purple-100 text-purple-800 font-semibold">
              Profile Version: v{profile.version}
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500">Last Modified: {profile.lastUpdated || '2026-03-01'}</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-bold text-slate-700">
              {profile.questions.length} Questions in Bank
            </span>
            <span className="text-slate-300">|</span>
            <span className="font-bold text-emerald-700">
              Practical Task: {profile.practicalTask.title ? 'Configured' : 'Missing'}
            </span>
          </div>
        </div>
      </div>

      {/* SECTION 1: QUESTION BANK MANAGEMENT */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-blue-600" /> Question Bank Registry ({profile.questions.length})
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Verified items stored in the adaptive test bank.
            </p>
          </div>

          <button
            onClick={handleOpenAddQuestion}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-2 shadow-xs transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            Add New Question
          </button>
        </div>

        {/* Add / Edit Question Form Modal/Box */}
        {isAddingQuestion && (
          <form onSubmit={handleSaveQuestion} className="p-6 rounded-2xl border-2 border-blue-200 bg-blue-50/40 space-y-4">
            <div className="flex items-center justify-between border-b border-blue-200 pb-3">
              <h4 className="font-bold text-sm text-blue-950 flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-blue-600" />
                {editingQuestionId ? 'Edit Bank Question' : 'Create New Assessment Question'}
              </h4>
              <button
                type="button"
                onClick={() => setIsAddingQuestion(false)}
                className="text-xs text-slate-500 hover:text-slate-800"
              >
                Cancel
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Difficulty Tier:</label>
                <select
                  value={qDifficulty}
                  onChange={(e) => setQDifficulty(e.target.value as QuestionDifficulty)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-medium bg-white"
                >
                  <option value="Foundation">Foundation</option>
                  <option value="Developing">Developing</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Strong">Strong</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Question Type:</label>
                <select
                  value={qType}
                  onChange={(e) => setQType(e.target.value as QuestionType)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-medium bg-white"
                >
                  <option value="multiple_choice">Multiple Choice (Single)</option>
                  <option value="multi_select">Multi-Select (Checkboxes)</option>
                  <option value="true_false">True / False</option>
                  <option value="scenario">Scenario-Based Problem</option>
                  <option value="ordering">Sequential Ordering</option>
                  <option value="short_answer">Short Text Explanation</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Target Competency:</label>
                <input
                  type="text"
                  value={qCompetency}
                  onChange={(e) => setQCompetency(e.target.value)}
                  placeholder="e.g., Color Theory, Syntax, Ohm's Law"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-medium bg-white"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Question Prompt:</label>
              <textarea
                rows={2}
                value={qPrompt}
                onChange={(e) => setQPrompt(e.target.value)}
                placeholder="Enter clear, unambiguous question text..."
                required
                className="w-full p-3 rounded-lg border border-slate-300 text-xs md:text-sm font-medium bg-white"
              />
            </div>

            {/* Scenario or Code Snippet */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Scenario Context (Optional):</label>
                <textarea
                  rows={2}
                  value={qScenario}
                  onChange={(e) => setQScenario(e.target.value)}
                  placeholder="Realistic workplace or exhibition scenario..."
                  className="w-full p-2.5 rounded-lg border border-slate-300 text-xs bg-white"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Code Snippet (Optional):</label>
                <textarea
                  rows={2}
                  value={qCode}
                  onChange={(e) => setQCode(e.target.value)}
                  placeholder="const x = 10; ..."
                  className="w-full p-2.5 rounded-lg border border-slate-300 font-mono text-xs bg-white"
                />
              </div>
            </div>

            {/* Options & Correct Answer for Multiple Choice */}
            {qType !== 'true_false' && qType !== 'short_answer' && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 block">Options & Correct Selection:</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {qOptions.map((opt, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="correctOptRadio"
                        checked={qCorrectAnswer === opt && opt !== ''}
                        onChange={() => setQCorrectAnswer(opt)}
                        title="Mark as correct answer"
                      />
                      <input
                        type="text"
                        value={opt}
                        onChange={(e) => {
                          const updated = [...qOptions];
                          updated[idx] = e.target.value;
                          setQOptions(updated);
                          if (qCorrectAnswer === opt) setQCorrectAnswer(e.target.value);
                        }}
                        placeholder={`Option ${String.fromCharCode(65 + idx)}`}
                        className="flex-1 px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* True/False selection */}
            {qType === 'true_false' && (
              <div className="flex items-center gap-4 text-xs font-bold">
                <span>Correct Answer:</span>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="tfCorrect"
                    checked={qCorrectAnswer === 'True'}
                    onChange={() => setQCorrectAnswer('True')}
                  />
                  True
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="tfCorrect"
                    checked={qCorrectAnswer === 'False'}
                    onChange={() => setQCorrectAnswer('False')}
                  />
                  False
                </label>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Explanation & Pedagogical Rule:</label>
                <textarea
                  rows={2}
                  value={qExplanation}
                  onChange={(e) => setQExplanation(e.target.value)}
                  placeholder="Explain why this answer is correct and what principle applies..."
                  className="w-full p-2.5 rounded-lg border border-slate-300 text-xs bg-white"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  Custom G-ONE Hint / Tip (Optional):
                </label>
                <textarea
                  rows={2}
                  value={qHint}
                  onChange={(e) => setQHint(e.target.value)}
                  placeholder="Custom clue or prompt to assist students without giving away the answer..."
                  className="w-full p-2.5 rounded-lg border border-slate-300 text-xs bg-white"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsAddingQuestion(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-2"
              >
                <Save className="w-3.5 h-3.5" />
                Save to Question Bank
              </button>
            </div>
          </form>
        )}

        {/* Existing Question Bank Items */}
        <div className="space-y-3">
          {profile.questions.map((q, idx) => (
            <div
              key={q.id}
              className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col md:flex-row md:items-start justify-between gap-4"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-200 text-slate-800">
                    Q{idx + 1}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800">
                    {q.difficulty}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-purple-100 text-purple-800">
                    {q.type.replace(/_/g, ' ')}
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium">
                    Competency: {q.competency}
                  </span>
                </div>

                <div className="text-xs md:text-sm font-bold text-slate-900 leading-snug">
                  {q.question}
                </div>

                <div className="text-[11px] text-slate-600 italic">
                  Correct Answer: {Array.isArray(q.correctAnswer) ? q.correctAnswer.join(', ') : String(q.correctAnswer)}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => {
                    setEditingQuestionId(q.id);
                    setQDifficulty(q.difficulty);
                    setQType(q.type);
                    setQCompetency(q.competency);
                    setQPrompt(q.question);
                    setQOptions(q.options || ['', '', '', '']);
                    setQCorrectAnswer(String(q.correctAnswer));
                    setQExplanation(q.explanation);
                    setQHint(q.hint || '');
                    setQScenario(q.scenarioContext || '');
                    setQCode(q.codeSnippet || '');
                    setIsAddingQuestion(true);
                  }}
                  className="p-2 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-slate-100"
                  title="Edit question"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteQuestionFromProfile(selectedSkillId, q.id)}
                  className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-slate-100"
                  title="Delete question"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: PRACTICAL TASK & RUBRICS CONFIGURATION */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <FileCode className="w-4 h-4 text-purple-600" /> Practical Task & Rubric Setup
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Hands-on task definition, starter template, and 4-part objective evaluation rubric.
            </p>
          </div>

          <button
            onClick={() => setIsEditingTask(!isEditingTask)}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-2"
          >
            <Edit3 className="w-3.5 h-3.5" />
            {isEditingTask ? 'Cancel Editing' : 'Edit Practical Task'}
          </button>
        </div>

        {isEditingTask ? (
          <div className="p-6 rounded-2xl border-2 border-purple-200 bg-purple-50/40 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Task Title:</label>
                <input
                  type="text"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-medium bg-white"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Time Estimate (Minutes):</label>
                <input
                  type="number"
                  value={taskMinutes}
                  onChange={(e) => setTaskMinutes(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-medium bg-white"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Task Instructions:</label>
              <textarea
                rows={3}
                value={taskInstructions}
                onChange={(e) => setTaskInstructions(e.target.value)}
                className="w-full p-3 rounded-lg border border-slate-300 text-xs bg-white"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Expected Deliverable Standard:</label>
              <textarea
                rows={2}
                value={taskExpected}
                onChange={(e) => setTaskExpected(e.target.value)}
                className="w-full p-3 rounded-lg border border-slate-300 text-xs bg-white"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Starter Template (Code / Blueprint):</label>
              <textarea
                rows={4}
                value={taskStarter}
                onChange={(e) => setTaskStarter(e.target.value)}
                className="w-full p-3 rounded-lg border border-slate-300 font-mono text-xs bg-white"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsEditingTask(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-200"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveTask}
                className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold flex items-center gap-2"
              >
                <Save className="w-3.5 h-3.5" />
                Save Practical Task
              </button>
            </div>
          </div>
        ) : (
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
            <div>
              <h4 className="font-bold text-sm text-slate-900">{profile.practicalTask.title}</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">{profile.practicalTask.instructions}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {profile.practicalTask.rubric.map(r => (
                <div key={r.id} className="p-3 rounded-xl bg-white border border-slate-200 text-xs space-y-1">
                  <div className="flex items-center justify-between font-bold text-slate-800">
                    <span>{r.name}</span>
                    <span className="text-purple-700">/{r.maxPoints} pts</span>
                  </div>
                  <p className="text-[11px] text-slate-500">{r.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
