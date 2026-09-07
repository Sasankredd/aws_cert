import React from 'react';
import { CheckCircle2, XCircle, BookOpen, RotateCcw, Award, BarChart3, Info } from 'lucide-react';

export default function ResultPage({ examState, onReadConcept, onFinish }) {
  if (!examState || !examState.questions) {
    return (
      <div className="max-w-xl mx-auto py-12 px-4 text-center">
        <h2 className="text-2xl font-bold text-slate-800">No results found</h2>
        <button onClick={onFinish} className="btn-primary mt-4">Return Home</button>
      </div>
    );
  }

  const { questions, selectedAnswers, certification, difficulty, concept, questionCount } = examState;

  // Calculate results
  let correctCount = 0;
  questions.forEach(q => {
    if (selectedAnswers[q.id] === q.correctOption) {
      correctCount++;
    }
  });

  const wrongCount = questions.length - correctCount;
  const scorePercent = Math.round((correctCount / questions.length) * 100);

  // Score styling
  const getScoreColor = (percent) => {
    if (percent >= 80) return 'text-emerald-600';
    if (percent >= 60) return 'text-amber-600';
    return 'text-rose-600';
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 pb-20">
      {/* Summary Scoreboard */}
      <section className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden mb-10">
        <div className="bg-slate-900 px-6 py-8 text-center text-white">
          <div className="inline-flex p-3 bg-amber-500/10 rounded-full text-amber-500 mb-4 border border-amber-500/20">
            <Award size={32} />
          </div>
          <h1 className="text-2xl md:text-3xl font-black mb-2">Exam Results</h1>
          <p className="text-slate-400 text-sm font-medium uppercase tracking-widest">{certification}</p>
        </div>
        
        <div className="p-6 md:p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="text-center p-4 bg-slate-50 rounded-xl border border-slate-100">
              <span className="block text-xs font-bold text-slate-500 uppercase mb-1">Questions</span>
              <span className="text-xl font-black text-slate-800">{questionCount}</span>
            </div>
            <div className="text-center p-4 bg-emerald-50 rounded-xl border border-emerald-100">
              <span className="block text-xs font-bold text-emerald-700 uppercase mb-1">Correct</span>
              <span className="text-xl font-black text-emerald-600">{correctCount}</span>
            </div>
            <div className="text-center p-4 bg-rose-50 rounded-xl border border-rose-100">
              <span className="block text-xs font-bold text-rose-700 uppercase mb-1">Wrong</span>
              <span className="text-xl font-black text-rose-600">{wrongCount}</span>
            </div>
            <div className="text-center p-4 bg-indigo-50 rounded-xl border border-indigo-100">
              <span className="block text-xs font-bold text-indigo-700 uppercase mb-1">Score</span>
              <span className={`text-xl font-black ${getScoreColor(scorePercent)}`}>{scorePercent}%</span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-200 rounded-lg text-slate-600">
                <BarChart3 size={20} />
              </div>
              <div className="text-sm">
                <span className="font-bold text-slate-700">Difficulty:</span> <span className="text-slate-600">{difficulty}</span>
                <span className="mx-2 text-slate-300">|</span>
                <span className="font-bold text-slate-700">Concept:</span> <span className="text-slate-600">{concept === 'All' ? 'Mixed Concepts' : concept}</span>
              </div>
            </div>
            <button onClick={onFinish} className="btn-primary w-full md:w-auto">
              <RotateCcw size={16} /> Finish Exam
            </button>
          </div>
        </div>
      </section>

      {/* Detailed Review Header */}
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-xl font-black text-slate-800">Detailed Question Review</h2>
        <div className="h-px bg-slate-200 flex-grow"></div>
      </div>

      {/* Detailed Review List */}
      <div className="space-y-6">
        {questions.map((q, index) => {
          const userAnswer = selectedAnswers[q.id];
          const isCorrect = userAnswer === q.correctOption;

          return (
            <div key={q.id} className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden transition hover:shadow-lg">
              {/* Question Header */}
              <div className={`px-6 py-3 flex items-center justify-between border-b ${isCorrect ? 'bg-emerald-50/50 border-emerald-100' : 'bg-rose-50/50 border-rose-100'}`}>
                <div className="flex items-center gap-3">
                  <span className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold ${isCorrect ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'}`}>
                    {index + 1}
                  </span>
                  <span className={`text-sm font-bold ${isCorrect ? 'text-emerald-700' : 'text-rose-700'} flex items-center gap-1.5`}>
                    {isCorrect ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                    {isCorrect ? 'Correct' : 'Incorrect'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-100">
                    {q.difficulty}
                  </span>
                  <button 
                    onClick={() => onReadConcept(q.certification, q.concept)}
                    className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-2 py-0.5 rounded border border-indigo-100 transition flex items-center gap-1"
                  >
                    <BookOpen size={10} /> {q.concept}
                  </button>
                </div>
              </div>

              {/* Question Content */}
              <div className="p-6">
                <h3 className="text-base font-bold text-slate-800 mb-6 leading-relaxed">
                  {q.question}
                </h3>

                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  {/* User Answer */}
                  <div className={`p-4 rounded-lg border-2 ${isCorrect ? 'bg-emerald-50/20 border-emerald-100' : 'bg-rose-50/20 border-rose-100'}`}>
                    <span className="block text-[10px] font-black uppercase text-slate-500 mb-2">Your Answer</span>
                    <p className={`text-sm font-bold ${userAnswer ? (isCorrect ? 'text-emerald-700' : 'text-rose-700') : 'text-slate-400 italic'}`}>
                      {userAnswer || 'Not answered'}
                    </p>
                  </div>
                  
                  {/* Correct Answer */}
                  <div className="p-4 rounded-lg border-2 bg-slate-50/50 border-slate-100">
                    <span className="block text-[10px] font-black uppercase text-slate-500 mb-2">Correct Answer</span>
                    <p className="text-sm font-bold text-slate-700">
                      {q.correctOption}
                    </p>
                  </div>
                </div>

                {/* Explanation / Reason */}
                <div className="bg-indigo-50/30 rounded-xl p-5 border border-indigo-100/50">
                  <div className="flex items-center gap-2 mb-3 text-indigo-700">
                    <Info size={16} />
                    <span className="text-xs font-black uppercase tracking-wider">Explanation</span>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed italic">
                    {q.reason}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Navigation */}
      <div className="mt-12 flex justify-center">
        <button 
          onClick={onFinish}
          className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-10 py-4 rounded-xl shadow-xl transition-all transform hover:-translate-y-1 flex items-center gap-3"
        >
          <RotateCcw size={20} className="text-amber-500" />
          Finish & Return to Dashboard
        </button>
      </div>
    </div>
  );
}
