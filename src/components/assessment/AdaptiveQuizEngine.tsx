/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * KAUSHAL SETU — ADAPTIVE QUIZ ENGINE (PHASE 5B)
 * Dynamically adapts question difficulty based on student responses, supports 6 question types,
 * tracks time spent, and provides pedagogical explanations.
 */

import React, { useState, useEffect, useMemo } from 'react';
import { 
  QuestionItem, 
  QuestionDifficulty, 
  AssessmentLengthMode 
} from '../../data/assessmentTypes';
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  AlertCircle, 
  ChevronRight, 
  ArrowRight, 
  RotateCcw,
  Sparkles,
  HelpCircle,
  Code,
  Layers,
  Check
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useViewMode } from '../../context/ViewModeContext';
import { AssessmentProgressBar } from './AssessmentProgressBar';
import { GOneQuestionHint } from './GOneQuestionHint';

interface AdaptiveQuizEngineProps {
  questions: QuestionItem[];
  skillName: string;
  category?: string;
  lengthMode: AssessmentLengthMode;
  onComplete: (answers: {
    [questionId: string]: {
      selectedAnswer: any;
      isCorrect: boolean;
      timeSpentSeconds: number;
      questionRef: QuestionItem;
    };
  }) => void;
  onCancel?: () => void;
}

export function AdaptiveQuizEngine({
  questions,
  skillName,
  category,
  lengthMode,
  onComplete,
  onCancel
}: AdaptiveQuizEngineProps) {
  const { isMinimal } = useViewMode();

  // Determine target question count based on length mode
  const targetQuestionCount = useMemo(() => {
    if (lengthMode === 'quick') return Math.min(5, questions.length);
    if (lengthMode === 'deep') return Math.min(15, questions.length);
    return Math.min(8, questions.length);
  }, [lengthMode, questions.length]);

  // Group questions by difficulty
  const questionsByDifficulty = useMemo(() => {
    const groups: { [key in QuestionDifficulty]: QuestionItem[] } = {
      Foundation: [],
      Developing: [],
      Intermediate: [],
      Strong: [],
      Advanced: []
    };
    questions.forEach(q => {
      const diff = q.difficulty || 'Developing';
      if (groups[diff]) {
        groups[diff].push(q);
      } else {
        groups.Developing.push(q);
      }
    });
    return groups;
  }, [questions]);

  // Current session state
  const [currentDifficulty, setCurrentDifficulty] = useState<QuestionDifficulty>('Developing');
  const [answeredQuestionIds, setAnsweredQuestionIds] = useState<string[]>([]);
  const [answersState, setAnswersState] = useState<{
    [questionId: string]: {
      selectedAnswer: any;
      isCorrect: boolean;
      timeSpentSeconds: number;
      questionRef: QuestionItem;
    };
  }>({});

  const [currentQuestion, setCurrentQuestion] = useState<QuestionItem | null>(null);
  const [currentSelectedAnswer, setCurrentSelectedAnswer] = useState<any>(null);
  const [multiSelectAnswers, setMultiSelectAnswers] = useState<string[]>([]);
  const [orderingAnswers, setOrderingAnswers] = useState<number[]>([]);
  const [shortAnswerText, setShortAnswerText] = useState('');
  const [showImmediateExplanation, setShowImmediateExplanation] = useState(false);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [questionTimer, setQuestionTimer] = useState(0);
  const [showWhy, setShowWhy] = useState(false);

  // Difficulty progression ladder
  const difficultyLadder: QuestionDifficulty[] = ['Foundation', 'Developing', 'Intermediate', 'Strong', 'Advanced'];

  // Select next adaptive question
  const selectNextQuestion = (
    nextDifficulty: QuestionDifficulty, 
    usedIds: string[]
  ): QuestionItem | null => {
    // 1. Try target difficulty
    let candidates = (questionsByDifficulty[nextDifficulty] || []).filter(q => !usedIds.includes(q.id));
    if (candidates.length > 0) {
      return candidates[Math.floor(Math.random() * candidates.length)];
    }

    // 2. Try neighboring difficulties
    const currentIdx = difficultyLadder.indexOf(nextDifficulty);
    for (let offset = 1; offset < difficultyLadder.length; offset++) {
      const upIdx = currentIdx + offset;
      if (upIdx < difficultyLadder.length) {
        candidates = (questionsByDifficulty[difficultyLadder[upIdx]] || []).filter(q => !usedIds.includes(q.id));
        if (candidates.length > 0) return candidates[0];
      }
      const downIdx = currentIdx - offset;
      if (downIdx >= 0) {
        candidates = (questionsByDifficulty[difficultyLadder[downIdx]] || []).filter(q => !usedIds.includes(q.id));
        if (candidates.length > 0) return candidates[0];
      }
    }

    // 3. Fallback to any unselected question
    const remaining = questions.filter(q => !usedIds.includes(q.id));
    return remaining.length > 0 ? remaining[0] : null;
  };

  // Initialize first question when questions or lengthMode change
  useEffect(() => {
    const firstQ = selectNextQuestion('Developing', []);
    if (firstQ) {
      setCurrentQuestion(firstQ);
      setCurrentSelectedAnswer(null);
      setMultiSelectAnswers([]);
      setShortAnswerText('');
      setIsAnswerSubmitted(false);
      setShowImmediateExplanation(false);
      setQuestionTimer(0);
      setAnsweredQuestionIds([]);
      setAnswersState({});
      if (firstQ.type === 'ordering' && firstQ.options) {
        setOrderingAnswers(firstQ.options.map((_, i) => i));
      }
    }
  }, [questions, lengthMode]);

  // Timer interval for current question
  useEffect(() => {
    const interval = setInterval(() => {
      setQuestionTimer(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [currentQuestion?.id]);

  // Handle answer submission
  const handleCheckAnswer = () => {
    if (!currentQuestion) return;

    let isCorrect = false;
    let finalAnswer = currentSelectedAnswer;

    if (currentQuestion.type === 'multiple_choice' || currentQuestion.type === 'scenario') {
      isCorrect = currentSelectedAnswer === currentQuestion.correctAnswer;
    } else if (currentQuestion.type === 'true_false') {
      const strAnswer = String(currentSelectedAnswer).toLowerCase();
      const strCorrect = String(currentQuestion.correctAnswer).toLowerCase();
      isCorrect = strAnswer === strCorrect;
    } else if (currentQuestion.type === 'multi_select') {
      finalAnswer = multiSelectAnswers;
      const correctArr = (Array.isArray(currentQuestion.correctAnswer) ? currentQuestion.correctAnswer : [currentQuestion.correctAnswer]).map(String).map(s => s.trim());
      const userArr = multiSelectAnswers.map(String).map(s => s.trim());
      isCorrect = 
        correctArr.length === userArr.length &&
        correctArr.every(item => userArr.includes(item));
    } else if (currentQuestion.type === 'ordering') {
      finalAnswer = orderingAnswers;
      const correctOrder = Array.isArray(currentQuestion.correctAnswer) ? currentQuestion.correctAnswer : [];
      isCorrect = JSON.stringify(orderingAnswers) === JSON.stringify(correctOrder);
    } else if (currentQuestion.type === 'short_answer') {
      finalAnswer = shortAnswerText;
      const expected = String(currentQuestion.correctAnswer).toLowerCase().trim();
      const userText = shortAnswerText.toLowerCase().trim();
      isCorrect = userText.length > 3 && (userText.includes(expected) || expected.includes(userText));
    }

    const updatedAnswers = {
      ...answersState,
      [currentQuestion.id]: {
        selectedAnswer: finalAnswer,
        isCorrect,
        timeSpentSeconds: questionTimer,
        questionRef: currentQuestion
      }
    };

    setAnswersState(updatedAnswers);
    setIsAnswerSubmitted(true);
  };

  // Move to next adaptive question or complete quiz
  const handleNextQuestion = () => {
    if (!currentQuestion) return;

    const newUsedIds = [...answeredQuestionIds, currentQuestion.id];
    setAnsweredQuestionIds(newUsedIds);

    // Check if we reached target question count
    if (newUsedIds.length >= targetQuestionCount) {
      onComplete(answersState);
      return;
    }

    // Adaptive step: if last answer was correct, increase difficulty; if incorrect, stay or decrease
    const lastAnswerCorrect = answersState[currentQuestion.id]?.isCorrect;
    const currentDiffIdx = difficultyLadder.indexOf(currentDifficulty);
    let nextDiff = currentDifficulty;

    if (lastAnswerCorrect) {
      if (currentDiffIdx < difficultyLadder.length - 1) {
        nextDiff = difficultyLadder[currentDiffIdx + 1];
      }
    } else {
      if (currentDiffIdx > 0) {
        nextDiff = difficultyLadder[currentDiffIdx - 1];
      }
    }

    setCurrentDifficulty(nextDiff);
    const nextQ = selectNextQuestion(nextDiff, newUsedIds);

    if (!nextQ) {
      // No more questions available
      onComplete(answersState);
      return;
    }

    // Reset question state
    setCurrentQuestion(nextQ);
    setCurrentSelectedAnswer(null);
    setMultiSelectAnswers([]);
    setShortAnswerText('');
    setIsAnswerSubmitted(false);
    setShowImmediateExplanation(false);
    setQuestionTimer(0);

    if (nextQ.type === 'ordering' && nextQ.options) {
      // Shuffle ordering initially
      const indices = nextQ.options.map((_, i) => i);
      setOrderingAnswers(indices);
    }
  };

  // Reorder items helper for ordering question type
  const moveOrderingItem = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= orderingAnswers.length) return;
    const updated = [...orderingAnswers];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);
    setOrderingAnswers(updated);
  };

  if (!currentQuestion) {
    return (
      <div className="p-8 text-center bg-white rounded-xl border border-slate-200">
        <Sparkles className="w-8 h-8 text-blue-600 mx-auto mb-3 animate-pulse" />
        <h3 className="text-lg font-bold text-slate-800">Preparing Assessment Engine...</h3>
        <p className="text-sm text-slate-500 mt-1">Calibrating adaptive difficulty for {skillName}...</p>
      </div>
    );
  }

  const currentStep = answeredQuestionIds.length + 1;

  return (
    <div className="space-y-4">
      {/* Dynamic Progress Bar at the top of the assessment flow */}
      <AssessmentProgressBar
        currentStep={currentStep}
        totalSteps={targetQuestionCount}
        skillName={skillName}
        category={category}
        difficulty={currentQuestion.difficulty}
        timeSpentSeconds={questionTimer}
        lengthMode={lengthMode}
        stage="quiz"
        hasPracticalTask={true}
        onExit={onCancel}
      />

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Main Question Body */}
        <div className="p-6 md:p-8 space-y-6">
        {/* Top Header: Competency Tested Badge & G-ONE Get Hint Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {!isMinimal && currentQuestion.competency ? (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-medium self-start">
              <Layers className="w-3.5 h-3.5 text-slate-500" />
              <span>Competency: {currentQuestion.competency}</span>
            </div>
          ) : <div />}

          {/* G-ONE Dynamic Context-Aware Hint Control */}
          <div className="self-start sm:self-auto">
            <GOneQuestionHint
              question={currentQuestion}
              skillName={skillName}
              category={category}
              isAnswerSubmitted={isAnswerSubmitted}
            />
          </div>
        </div>

        {/* Scenario Context (if applicable) */}
        {currentQuestion.scenarioContext && (
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-amber-900 text-sm leading-relaxed">
            <div className="font-semibold mb-1 flex items-center gap-1.5 text-xs text-amber-800 uppercase tracking-wider">
              <AlertCircle className="w-3.5 h-3.5 text-amber-700" /> Realistic Scenario Context
            </div>
            {currentQuestion.scenarioContext}
          </div>
        )}

        {/* Code Snippet (if applicable) */}
        {currentQuestion.codeSnippet && (
          <div className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 pb-2 mb-2 border-b border-slate-800">
              <span className="flex items-center gap-1"><Code className="w-3.5 h-3.5" /> Code Reference</span>
            </div>
            <pre>{currentQuestion.codeSnippet}</pre>
          </div>
        )}

        {/* Question Prompt */}
        <div className="space-y-2">
          <h3 className="text-base md:text-lg font-heading font-bold text-slate-900 leading-snug">
            {currentQuestion.question}
          </h3>

          {/* Subtle "Why are we asking this?" Drawer */}
          <div className="pt-0.5">
            <button
              type="button"
              onClick={() => setShowWhy(!showWhy)}
              className="text-xs text-slate-400 hover:text-slate-700 inline-flex items-center gap-1.5 transition-colors"
            >
              <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
              <span>Why are we asking this?</span>
            </button>
            {showWhy && (
              <div className="mt-2 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600 leading-relaxed animate-in fade-in duration-200">
                This question evaluates practical comprehension in <strong>{currentQuestion.competency || skillName}</strong> to benchmark capability against industry vocational standards and verify genuine project readiness.
              </div>
            )}
          </div>
        </div>

        {/* ==================================================================== */}
        {/* QUESTION INPUT TYPES */}
        {/* ==================================================================== */}

        {/* 1. Multiple Choice & Scenario (Single Select) */}
        {(currentQuestion.type === 'multiple_choice' || currentQuestion.type === 'scenario') && currentQuestion.options && (
          <div className="space-y-3">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = currentSelectedAnswer === option;
              const isCorrectOpt = isAnswerSubmitted && option === currentQuestion.correctAnswer;
              const isWrongOpt = isAnswerSubmitted && isSelected && option !== currentQuestion.correctAnswer;

              return (
                <button
                  key={idx}
                  disabled={isAnswerSubmitted}
                  onClick={() => setCurrentSelectedAnswer(option)}
                  className={cn(
                    "w-full text-left p-4 rounded-xl border text-sm font-medium transition-all flex items-start justify-between gap-3",
                    isSelected && !isAnswerSubmitted && "border-blue-600 bg-blue-50/60 text-blue-900 shadow-xs ring-1 ring-blue-600",
                    !isSelected && !isAnswerSubmitted && "border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700",
                    isCorrectOpt && "border-emerald-500 bg-emerald-50 text-emerald-900 ring-1 ring-emerald-500",
                    isWrongOpt && "border-rose-500 bg-rose-50 text-rose-900 ring-1 ring-rose-500"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <span className={cn(
                      "w-6 h-6 rounded-full text-xs flex items-center justify-center font-bold shrink-0 mt-0.5",
                      isSelected ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600",
                      isCorrectOpt && "bg-emerald-600 text-white",
                      isWrongOpt && "bg-rose-600 text-white"
                    )}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="leading-relaxed">{option}</span>
                  </div>

                  {isAnswerSubmitted && isCorrectOpt && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                  {isAnswerSubmitted && isWrongOpt && (
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* 2. True / False */}
        {currentQuestion.type === 'true_false' && (
          <div className="grid grid-cols-2 gap-4">
            {['True', 'False'].map((val) => {
              const isSelected = currentSelectedAnswer === val;
              const isCorrectOpt = isAnswerSubmitted && String(currentQuestion.correctAnswer).toLowerCase() === val.toLowerCase();
              const isWrongOpt = isAnswerSubmitted && isSelected && !isCorrectOpt;

              return (
                <button
                  key={val}
                  disabled={isAnswerSubmitted}
                  onClick={() => setCurrentSelectedAnswer(val)}
                  className={cn(
                    "p-5 rounded-xl border text-center font-bold text-base transition-all",
                    isSelected && !isAnswerSubmitted && "border-blue-600 bg-blue-50 text-blue-900 ring-1 ring-blue-600",
                    !isSelected && !isAnswerSubmitted && "border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700",
                    isCorrectOpt && "border-emerald-500 bg-emerald-50 text-emerald-900 ring-1 ring-emerald-500",
                    isWrongOpt && "border-rose-500 bg-rose-50 text-rose-900 ring-1 ring-rose-500"
                  )}
                >
                  {val}
                </button>
              );
            })}
          </div>
        )}

        {/* 3. Multi-Select (Checkboxes) */}
        {currentQuestion.type === 'multi_select' && currentQuestion.options && (
          <div className="space-y-3">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Select all options that apply:
            </p>
            {currentQuestion.options.map((option, idx) => {
              const isChecked = multiSelectAnswers.includes(option);
              const isOptionCorrect = Array.isArray(currentQuestion.correctAnswer) && currentQuestion.correctAnswer.includes(option);

              return (
                <button
                  key={idx}
                  disabled={isAnswerSubmitted}
                  onClick={() => {
                    if (isChecked) {
                      setMultiSelectAnswers(multiSelectAnswers.filter(o => o !== option));
                    } else {
                      setMultiSelectAnswers([...multiSelectAnswers, option]);
                    }
                  }}
                  className={cn(
                    "w-full text-left p-4 rounded-xl border text-sm font-medium transition-all flex items-center justify-between gap-3",
                    isChecked && !isAnswerSubmitted && "border-blue-600 bg-blue-50/50 text-blue-900 ring-1 ring-blue-600",
                    !isChecked && !isAnswerSubmitted && "border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700",
                    isAnswerSubmitted && isOptionCorrect && "border-emerald-500 bg-emerald-50 text-emerald-900",
                    isAnswerSubmitted && isChecked && !isOptionCorrect && "border-rose-500 bg-rose-50 text-rose-900"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-5 h-5 rounded border flex items-center justify-center text-xs",
                      isChecked ? "bg-blue-600 border-blue-600 text-white" : "border-slate-300 bg-white",
                      isAnswerSubmitted && isOptionCorrect && "bg-emerald-600 border-emerald-600 text-white"
                    )}>
                      {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                    <span>{option}</span>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* 4. Ordering Sequence */}
        {currentQuestion.type === 'ordering' && currentQuestion.options && (
          <div className="space-y-3">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Arrange into the correct sequential order (use arrows to reorder):
            </p>
            {orderingAnswers.map((optIndex, position) => (
              <div
                key={optIndex}
                className={cn(
                  "p-3.5 rounded-xl border flex items-center justify-between gap-3 bg-white text-sm font-medium",
                  isAnswerSubmitted ? "border-slate-200 bg-slate-50" : "border-slate-200 shadow-xs"
                )}
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center">
                    {position + 1}
                  </span>
                  <span className="text-slate-800">{currentQuestion.options![optIndex]}</span>
                </div>

                {!isAnswerSubmitted && (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => moveOrderingItem(position, position - 1)}
                      disabled={position === 0}
                      className="p-1 rounded text-slate-500 hover:bg-slate-100 disabled:opacity-30"
                      title="Move Up"
                    >
                      ▲
                    </button>
                    <button
                      onClick={() => moveOrderingItem(position, position + 1)}
                      disabled={position === orderingAnswers.length - 1}
                      className="p-1 rounded text-slate-500 hover:bg-slate-100 disabled:opacity-30"
                      title="Move Down"
                    >
                      ▼
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* 5. Short Answer */}
        {currentQuestion.type === 'short_answer' && (
          <div className="space-y-3">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Enter your concise technical answer:
            </label>
            <input
              type="text"
              disabled={isAnswerSubmitted}
              value={shortAnswerText}
              onChange={(e) => setShortAnswerText(e.target.value)}
              placeholder="Type your explanation or keyword..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm font-medium"
            />
          </div>
        )}

        {/* Explanation Banner (Visible after submitting answer) */}
        {isAnswerSubmitted && (
          <div className={cn(
            "p-4 rounded-xl border text-sm leading-relaxed space-y-2 animate-fadeIn",
            answersState[currentQuestion.id]?.isCorrect 
              ? "bg-emerald-50/80 border-emerald-200 text-emerald-950" 
              : "bg-slate-100 border-slate-200 text-slate-900"
          )}>
            <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider">
              {answersState[currentQuestion.id]?.isCorrect ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-800">Correct Answer</span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  <span className="text-slate-800">Explanation & Concept Rule</span>
                </>
              )}
            </div>
            <p className="text-sm font-medium">{currentQuestion.explanation}</p>
          </div>
        )}

        {/* Action Button Controls */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
          {onCancel && (
            <button
              onClick={onCancel}
              className="text-xs font-semibold text-slate-500 hover:text-slate-700 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              Exit Assessment
            </button>
          )}

          <div className="ml-auto flex items-center gap-3">
            {!isAnswerSubmitted ? (
              <button
                disabled={
                  (currentQuestion.type === 'multiple_choice' || currentQuestion.type === 'scenario' || currentQuestion.type === 'true_false') && !currentSelectedAnswer ||
                  (currentQuestion.type === 'multi_select' && multiSelectAnswers.length === 0) ||
                  (currentQuestion.type === 'short_answer' && shortAnswerText.trim().length === 0)
                }
                onClick={handleCheckAnswer}
                className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm"
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-semibold text-sm hover:bg-slate-800 transition-all flex items-center gap-2 shadow-sm"
              >
                <span>{currentStep >= targetQuestionCount ? (lengthMode === 'quick' ? 'Complete Assessment' : 'Proceed to Practical Task') : 'Next Question'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}
