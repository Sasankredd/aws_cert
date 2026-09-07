import React from 'react';
import { storage } from '../utils/storage';
import { AlertTriangle, CheckSquare, ListTodo, LogOut, Send } from 'lucide-react';

export default function ExamPage({ examState, onAnswerSelect, onSubmitExam, onCancelExam }) {
  if (!examState || !examState.questions || examState.questions.length === 0) {
    return (
      <div className="max-w-xl mx-auto py-12 px-4 text-center">
        <div className="bg-amber-950/20 border border-amber-900/50 text-amber-500 p-4 rounded-xl flex items-center gap-2 justify-center mb-6">
          <AlertTriangle />
          <span>No active exam was found.</span>
        </div>
        <button onClick={onCancelExam} className="btn-primary">
          Return to Home
        </button>
      </div>
    );
  }

  const { questions, selectedAnswers, certification, difficulty, concept } = examState;

  // Calculate stats
  const totalQuestions = questions.length;
  const answeredCount = Object.keys(selectedAnswers || {}).filter(id => selectedAnswers[id] !== undefined && selectedAnswers[id] !== null).length;
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100) || 0;

  // Handle Option Click
  const handleSelectOption = (questionId, option) => {
    onAnswerSelect(questionId, option);
  };

  // Handle Submit Form
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if any question is left unanswered
    const unansweredCount = totalQuestions - answeredCount;
    if (unansweredCount > 0) {
      const confirmSubmit = window.confirm(
        `You have left ${unansweredCount} question(s) unanswered. Are you sure you want to submit the exam?`
      );
      if (!confirmSubmit) return;
    } else {
      const confirmSubmit = window.confirm("Are you sure you want to submit your exam now?");
      if (!confirmSubmit) return;
    }
    
    onSubmitExam();
  };

  // Get difficulty styling
  const getDifficultyBadgeColor = (diff) => {
    switch (diff?.toLowerCase()) {
      case 'easy':
        return 'bg-emerald-950/30 text-emerald-400 border-emerald-900/50';
      case 'medium':
        return 'bg-amber-950/30 text-amber-400 border-amber-900/50';
      case 'hard':
        return 'bg-rose-950/30 text-rose-400 border-rose-900/50';
      default:
        return 'bg-slate-800 text-slate-400 border-slate-700';
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Exam Header Header */}
      <header className="sticky top-0 bg-slate-950/90 backdrop-blur-md z-10 border-b border-slate-800 pb-4 mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-0.5">
            Practice Sandbox
          </span>
          <h1 className="text-xl md:text-2xl font-black text-slate-100 leading-tight">
            {certification}
          </h1>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="text-xs font-medium bg-slate-900 border border-slate-800 px-2.5 py-0.5 rounded text-slate-400">
              Difficulty: {difficulty}
            </span>
            <span className="text-xs font-medium bg-slate-900 border border-slate-800 px-2.5 py-0.5 rounded text-slate-400">
              Concept: {concept === 'All' ? 'All Concepts' : concept}
            </span>
          </div>
        </div>

        {/* Exit & Progress Summary */}
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <div className="text-xs text-slate-400 font-semibold mb-1">
              Progress: {answeredCount} / {totalQuestions}
            </div>
            <div className="w-32 bg-slate-800 rounded-full h-1.5 overflow-hidden shadow-inner">
              <div 
                className="bg-amber-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>
          <button
            onClick={onCancelExam}
            className="btn-secondary text-xs px-3 py-2 flex items-center gap-1 hover:text-rose-500 hover:border-rose-900"
            title="Exit Exam (State will be saved in localStorage)"
          >
            <LogOut size={14} />
            <span>Exit Exam</span>
          </button>
        </div>
      </header>

      {/* Progress for Mobile */}
      <div className="sm:hidden mb-6 bg-slate-900 p-3 rounded-xl border border-slate-800 shadow-sm flex items-center justify-between">
        <span className="text-xs font-bold text-slate-500">Progress</span>
        <span className="text-xs font-black text-amber-500 bg-amber-500/10 px-2.5 py-1 rounded">
          {answeredCount} of {totalQuestions} ({progressPercent}%)
        </span>
      </div>

      {/* Exam Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {questions.map((questionObj, index) => {
          const selectedAnswer = selectedAnswers[questionObj.id];
          
          return (
            <div 
              key={questionObj.id} 
              className="bg-slate-900 rounded-xl shadow-xl border border-slate-800 p-6 transition hover:border-slate-700"
            >
              {/* Question Header */}
              <div className="flex items-start justify-between gap-4 mb-4 pb-3 border-b border-slate-800">
                <span className="h-7 w-7 rounded-full bg-slate-100 text-slate-950 font-extrabold flex items-center justify-center text-xs flex-shrink-0">
                  {index + 1}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider ${getDifficultyBadgeColor(questionObj.difficulty)}`}>
                  {questionObj.difficulty}
                </span>
              </div>

              {/* Question Text */}
              <h3 className="text-base md:text-lg font-bold text-slate-100 mb-6 leading-snug">
                {questionObj.question}
              </h3>

              {/* Options */}
              <div className="space-y-3">
                {questionObj.options.map((option, optIdx) => {
                  const isSelected = selectedAnswer === option;
                  const letter = String.fromCharCode(65 + optIdx); // A, B, C, D
                  
                  return (
                    <button
                      type="button"
                      key={optIdx}
                      onClick={() => handleSelectOption(questionObj.id, option)}
                      className={`w-full text-left px-4 py-3.5 rounded-lg border-2 flex items-center gap-3 transition font-medium text-sm md:text-base ${
                        isSelected 
                          ? 'border-amber-500 bg-amber-500/5 text-amber-500 shadow-lg shadow-amber-500/5' 
                          : 'border-slate-800 hover:border-slate-700 bg-slate-950 hover:bg-slate-900 text-slate-400'
                      }`}
                    >
                      {/* Selection dot / checkbox design */}
                      <span className={`h-6 w-6 rounded-md font-bold text-xs flex items-center justify-center border flex-shrink-0 ${
                        isSelected 
                          ? 'bg-amber-500 border-amber-600 text-slate-950 shadow-inner' 
                          : 'bg-slate-800 border-slate-700 text-slate-500'
                      }`}>
                        {letter}
                      </span>
                      <span className="leading-tight">{option}</span>
                    </button>
                  );
                })}
              </div>

              {/* Footer Meta */}
              <div className="mt-4 flex justify-between items-center text-[10px] text-slate-600 font-bold uppercase tracking-widest">
                <span>Concept: {questionObj.concept}</span>
                {selectedAnswer ? (
                  <span className="text-indigo-400 flex items-center gap-0.5">
                    <CheckSquare size={12} /> Stored
                  </span>
                ) : (
                  <span className="text-slate-700">Waiting...</span>
                )}
              </div>
            </div>
          );
        })}

        {/* Submit Container */}
        <div className="bg-slate-900 text-white rounded-xl shadow-2xl border border-slate-700 p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="text-lg font-extrabold flex items-center gap-2">
              <ListTodo size={20} className="text-amber-500" /> Finished with all questions?
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Double check your selections. Once you submit, your score and explanation key will be generated instantly.
            </p>
          </div>
          <button
            type="submit"
            className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-black px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 text-base self-stretch md:self-auto flex-shrink-0"
          >
            <Send size={18} />
            Submit Final Exam
          </button>
        </div>
      </form>
    </div>
  );
}
