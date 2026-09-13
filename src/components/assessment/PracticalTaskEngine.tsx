/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * KAUSHAL SETU — PRACTICAL TASK & RUBRIC ENGINE (PHASE 5B)
 * "Show What You Can Do": Hands-on task execution, multi-format demonstration evidence,
 * skill-specific rubrics, and self-reflection inputs.
 */

import React, { useState } from 'react';
import { PracticalTask, TaskRubricCriterion } from '../../data/assessmentTypes';
import { 
  FileCode, 
  Link as LinkIcon, 
  Image as ImageIcon, 
  Upload, 
  CheckCircle, 
  Star, 
  AlertCircle, 
  ArrowRight, 
  Clock, 
  Sparkles,
  Info,
  Layers,
  FileText
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface PracticalTaskEngineProps {
  task: PracticalTask;
  skillName: string;
  onComplete: (data: {
    taskCompleted: boolean;
    response: {
      text?: string;
      link?: string;
      fileName?: string;
      fileUrl?: string;
      selfReflectionNotes?: string;
    };
    rubricScores: { [criterionId: string]: number };
    totalRubricScore: number;
    maxRubricScore: number;
    selfReportedConfidenceScore: number;
    selfReportedExperienceYears: string;
  }) => void;
  onSkip: () => void;
}

export function PracticalTaskEngine({
  task,
  skillName,
  onComplete,
  onSkip
}: PracticalTaskEngineProps) {
  // Demonstration tabs
  const [activeTab, setActiveTab] = useState<'text' | 'link' | 'image' | 'file'>('text');
  
  // Work inputs
  const [textSubmission, setTextSubmission] = useState(task.starterTemplate || '');
  const [linkSubmission, setLinkSubmission] = useState('');
  const [imageFileName, setImageFileName] = useState('');
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  const [selfReflectionNotes, setSelfReflectionNotes] = useState('');
  const [confidenceRating, setConfidenceRating] = useState<number>(3);
  const [experienceLevel, setExperienceLevel] = useState<string>('1-6 months of practice');

  // Rubric scores (initial defaults to 4/5 on each criterion)
  const [rubricScores, setRubricScores] = useState<{ [criterionId: string]: number }>(() => {
    const initial: { [criterionId: string]: number } = {};
    task.rubric.forEach(crit => {
      initial[crit.id] = 4; // Default to proficient benchmark
    });
    return initial;
  });

  const totalPointsScored: number = (Object.values(rubricScores || {}) as number[]).reduce((sum: number, v: number) => sum + (Number(v) || 0), 0);
  const maxPointsPossible: number = task.rubric.reduce((sum: number, c: TaskRubricCriterion) => sum + c.maxPoints, 0);

  const handleScoreChange = (criterionId: string, score: number) => {
    setRubricScores(prev => ({
      ...prev,
      [criterionId]: score
    }));
  };

  const handleImageSimulatedUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFileName(file.name);
      const url = URL.createObjectURL(file);
      setImagePreviewUrl(url);
    }
  };

  const handleSubmit = () => {
    const hasProvidedEvidence = 
      textSubmission.trim().length > 20 || 
      linkSubmission.trim().length > 5 || 
      Boolean(imageFileName);

    onComplete({
      taskCompleted: true,
      response: {
        text: textSubmission,
        link: linkSubmission,
        fileName: imageFileName,
        fileUrl: imagePreviewUrl,
        selfReflectionNotes
      },
      rubricScores,
      totalRubricScore: totalPointsScored,
      maxRubricScore: maxPointsPossible,
      selfReportedConfidenceScore: confidenceRating,
      selfReportedExperienceYears: experienceLevel
    });
  };

  return (
    <div className="space-y-4">
      {/* Assessment Stage Tracker */}
      <div className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-600 text-white flex items-center justify-center font-black text-xs shadow-xs">
              T2
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-extrabold text-slate-900 font-display">
                  {skillName}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-300">
                  Practical Task
                </span>
              </div>
              <div className="text-xs text-slate-500 font-medium">
                Step 2 of 3 • Hands-on Demonstration
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono font-medium text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>~{task.timeEstimateMinutes} min allocated</span>
          </div>
        </div>

        {/* Stage Progress Bar (Quiz Done, Task in Progress, Synthesis next) */}
        <div className="space-y-2">
          <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-amber-500 h-2.5 rounded-full w-[66%]" />
          </div>
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span className="text-emerald-700 font-bold flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> 1. Knowledge Quiz (Done)
            </span>
            <span className="text-amber-700 font-extrabold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" /> 2. Practical Task (Active)
            </span>
            <span className="text-slate-400">
              3. G-ONE Synthesis
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden space-y-8 p-6 md:p-8">
      {/* Header Banner */}
      <div className="border-b border-slate-100 pb-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-200">
              Module 2 — Practical Task
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs font-semibold text-slate-600">
              Show What You Can Do
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium bg-slate-100 px-2.5 py-1 rounded-md">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>Estimated ~{task.timeEstimateMinutes} mins</span>
          </div>
        </div>

        <h2 className="text-xl md:text-2xl font-bold text-slate-900">
          {task.title}
        </h2>
        <p className="text-sm text-slate-600 mt-2 leading-relaxed">
          {task.instructions}
        </p>
      </div>

      {/* Expected Deliverable Box */}
      <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 text-blue-950 text-sm leading-relaxed">
        <div className="font-semibold mb-1 flex items-center gap-1.5 text-xs text-blue-800 uppercase tracking-wider">
          <Info className="w-4 h-4 text-blue-700" /> Expected Output Standard
        </div>
        <p className="text-slate-700 font-medium text-xs md:text-sm">
          {task.expectedOutput}
        </p>
      </div>

      {/* Interactive Demonstration Workspace */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <FileCode className="w-4 h-4 text-blue-600" /> Demonstration Evidence
          </h3>
          <span className="text-xs text-slate-400">Choose submission mode</span>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-slate-200">
          <button
            onClick={() => setActiveTab('text')}
            className={cn(
              "px-4 py-2 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5",
              activeTab === 'text' 
                ? "border-blue-600 text-blue-600" 
                : "border-transparent text-slate-500 hover:text-slate-800"
            )}
          >
            <FileText className="w-3.5 h-3.5" /> Text / Code Template
          </button>
          <button
            onClick={() => setActiveTab('link')}
            className={cn(
              "px-4 py-2 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5",
              activeTab === 'link' 
                ? "border-blue-600 text-blue-600" 
                : "border-transparent text-slate-500 hover:text-slate-800"
            )}
          >
            <LinkIcon className="w-3.5 h-3.5" /> Project URL / Link
          </button>
          <button
            onClick={() => setActiveTab('image')}
            className={cn(
              "px-4 py-2 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5",
              activeTab === 'image' 
                ? "border-blue-600 text-blue-600" 
                : "border-transparent text-slate-500 hover:text-slate-800"
            )}
          >
            <ImageIcon className="w-3.5 h-3.5" /> Image / Artifact Upload
          </button>
        </div>

        {/* Tab 1: Text / Code */}
        {activeTab === 'text' && (
          <div className="space-y-2">
            <textarea
              rows={10}
              value={textSubmission}
              onChange={(e) => setTextSubmission(e.target.value)}
              placeholder="Provide your solution, code, recipe, or structured project notes here..."
              className="w-full p-4 rounded-xl border border-slate-300 font-mono text-xs md:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-slate-50/50"
            />
            <p className="text-[11px] text-slate-400">
              Tip: You can edit the starter template above with your specific technical solution or project specification.
            </p>
          </div>
        )}

        {/* Tab 2: Project Link */}
        {activeTab === 'link' && (
          <div className="space-y-3 p-4 rounded-xl border border-slate-200 bg-slate-50">
            <label className="text-xs font-bold text-slate-700">Project / Portfolio URL:</label>
            <div className="flex items-center gap-2">
              <LinkIcon className="w-4 h-4 text-slate-400" />
              <input
                type="url"
                value={linkSubmission}
                onChange={(e) => setLinkSubmission(e.target.value)}
                placeholder="https://github.com/your-project, Figma link, Google Drive, or Live demo..."
                className="flex-1 px-4 py-2.5 rounded-lg border border-slate-200 text-xs md:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
              />
            </div>
            <p className="text-[11px] text-slate-500">
              Provide a public link to your repository, interactive demo, or design board.
            </p>
          </div>
        )}

        {/* Tab 3: Image / Artifact */}
        {activeTab === 'image' && (
          <div className="p-6 rounded-xl border-2 border-dashed border-slate-300 hover:border-blue-400 text-center space-y-3 transition-colors bg-slate-50/50">
            {imagePreviewUrl ? (
              <div className="space-y-3">
                <img 
                  src={imagePreviewUrl} 
                  alt="Demonstration Preview" 
                  className="max-h-56 mx-auto rounded-lg shadow-sm border border-slate-200 object-contain"
                />
                <p className="text-xs font-bold text-emerald-700 flex items-center justify-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> Uploaded: {imageFileName}
                </p>
                <label className="inline-block text-xs font-semibold text-blue-600 hover:underline cursor-pointer">
                  Change Image
                  <input type="file" accept="image/*" onChange={handleImageSimulatedUpload} className="hidden" />
                </label>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto">
                  <Upload className="w-5 h-5" />
                </div>
                <h4 className="text-xs md:text-sm font-bold text-slate-800">Upload Task Photograph or Screenshot</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  PNG, JPG, or PDF file showcasing your prototype, design, or workshop setup.
                </p>
                <label className="inline-block px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 cursor-pointer shadow-xs">
                  Browse Files
                  <input type="file" accept="image/*,.pdf" onChange={handleImageSimulatedUpload} className="hidden" />
                </label>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Skill-Specific Task Rubric */}
      <div className="space-y-4 pt-4 border-t border-slate-100">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-purple-600" /> Skill-Specific Evaluation Rubric
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Evaluate your solution across 4 objective criteria (1–5 scale per criterion)
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold text-slate-500">Total Rubric Score</span>
            <div className="text-base font-bold text-slate-900">
              {totalPointsScored} / {maxPointsPossible} pts
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {task.rubric.map((criterion) => {
            const currentVal = rubricScores[criterion.id] || 3;

            return (
              <div 
                key={criterion.id}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-bold text-xs md:text-sm text-slate-800">{criterion.name}</h4>
                    <p className="text-[11px] text-slate-500 leading-tight mt-0.5">{criterion.description}</p>
                  </div>
                  <span className="px-2 py-0.5 rounded text-xs font-bold bg-purple-100 text-purple-900 shrink-0">
                    {currentVal}/5
                  </span>
                </div>

                {/* Score Pills */}
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((pt) => (
                    <button
                      key={pt}
                      type="button"
                      onClick={() => handleScoreChange(criterion.id, pt)}
                      className={cn(
                        "flex-1 py-1.5 rounded-md text-xs font-bold border transition-all",
                        currentVal === pt 
                          ? "bg-purple-600 border-purple-600 text-white shadow-xs" 
                          : "bg-white border-slate-200 text-slate-600 hover:bg-slate-100"
                      )}
                    >
                      {pt}
                    </button>
                  ))}
                </div>

                {/* Level Descriptor */}
                <p className="text-[11px] text-slate-600 italic bg-white p-2 rounded border border-slate-200/80">
                  {currentVal >= 5 && (criterion.levelDescriptors[5] || 'Exemplary benchmark execution.')}
                  {currentVal === 4 && 'Strong application meeting standard requirements.'}
                  {currentVal === 3 && (criterion.levelDescriptors[3] || 'Proficient foundational execution.')}
                  {currentVal === 2 && 'Developing execution with minor flaws.'}
                  {currentVal <= 1 && (criterion.levelDescriptors[1] || 'Incomplete or foundational attempt.')}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Self-Reflection & Confidence Inputs */}
      <div className="space-y-4 pt-4 border-t border-slate-100">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-500" /> Self-Reflection & Experience
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2 p-4 rounded-xl border border-slate-200 bg-slate-50/50">
            <label className="text-xs font-bold text-slate-700">Self-Assessed Confidence in {skillName}:</label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setConfidenceRating(star)}
                  className="p-1 text-slate-300 hover:text-amber-400 transition-colors"
                >
                  <Star 
                    className={cn(
                      "w-6 h-6",
                      star <= confidenceRating ? "text-amber-400 fill-amber-400" : "text-slate-300"
                    )} 
                  />
                </button>
              ))}
              <span className="text-xs font-semibold text-slate-600 ml-2">
                {confidenceRating === 5 && 'Highly Confident'}
                {confidenceRating === 4 && 'Confident'}
                {confidenceRating === 3 && 'Moderate'}
                {confidenceRating === 2 && 'Developing'}
                {confidenceRating === 1 && 'Just Starting'}
              </span>
            </div>
          </div>

          <div className="space-y-2 p-4 rounded-xl border border-slate-200 bg-slate-50/50">
            <label className="text-xs font-bold text-slate-700">Hands-on Experience Duration:</label>
            <select
              value={experienceLevel}
              onChange={(e) => setExperienceLevel(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs md:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
            >
              <option value="Just exploring (0-1 month)">Just exploring (0-1 month)</option>
              <option value="1-6 months of practice">1-6 months of practice</option>
              <option value="6-12 months with projects">6-12 months with projects</option>
              <option value="1-2+ years continuous practice">1-2+ years continuous practice</option>
            </select>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700">Reflection Notes (What went well / What was challenging?):</label>
          <textarea
            rows={2}
            value={selfReflectionNotes}
            onChange={(e) => setSelfReflectionNotes(e.target.value)}
            placeholder="Briefly reflect on your process, what was easy, and what you would like to improve next..."
            className="w-full p-3 rounded-xl border border-slate-200 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-6 border-t border-slate-100 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={onSkip}
          className="text-xs font-semibold text-slate-500 hover:text-slate-800 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
        >
          Skip Practical Task for Now
        </button>

        <button
          type="button"
          onClick={handleSubmit}
          className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition-all flex items-center gap-2 shadow-sm"
        >
          <span>Submit Task & Synthesize G-ONE Profile</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
  );
}
