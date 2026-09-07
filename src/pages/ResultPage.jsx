import React from 'react';
import { CheckCircle2, XCircle, BookOpen, RotateCcw, Award, BarChart3, Info } from 'lucide-react';

export default function ResultPage({ examState, onReadConcept, onFinish }) {
  if (!examState || !examState.questions) {
    return (
      <div className="max-w-xl mx-auto py-12 px-4 text-center">
        <h2 className="text-2xl font-bold text-slate-100">No results found</h2>
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
    if (percent >= 80) return 'text-emerald-400';
    if (percent >= 60) return 'text-amber-400';
    return 'text-rose-400';
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 pb-20">
      {/* Summary Scoreboard */}
      <section className="bg-slate-900 rounded-2xl shadow-2xl border border-slate-800 overflow-hidden mb-10">
        <div className="bg-slate-950 px-6 py-10 text-center text-white border-b border-slate-800">
          <div className="inline-flex p-3 bg-amber-500/10 rounded-full text-amber-500 mb-4 border border-amber-500/20 shadow-inner">
            <Award size={40} />
          </div>
          <h1 className="text-3xl md:text-4xl font-black mb-2 tracking-tight">Exam Results</h1>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em]">{certification}</p>
        </div>
        
        <div className="p-6 md:p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="text-center p-4 bg-slate-950 rounded-xl border border-slate-800">
              <span className="block text-[10px] font-black text-slate-600 uppercase mb-1 tracking-widest">Questions</span>
              <span className="text-2xl font-black text-slate-100">{questionCount}</span>
            </div>
            <div className="text-center p-4 bg-emerald-950/20 rounded-xl border border-emerald-900/30">
              <span className="block text-[10px] font-black text-emerald-600 uppercase mb-1 tracking-widest">Correct</span>
              <span className="text-2xl font-black text-emerald-500">{correctCount}</span>
            </div>
            <div className="text-center p-4 bg-rose-950/20 rounded-xl border border-rose-900/30">
              <span className="block text-[10px] font-black text-rose-600 uppercase mb-1 tracking-widest">Wrong</span>
              <span className="text-2xl font-black text-rose-500">{wrongCount}</span>
            </div>
            <div className="text-center p-4 bg-indigo-950/20 rounded-xl border border-indigo-900/30">
              <span className="block text-[10px] font-black text-indigo-600 uppercase mb-1 tracking-widest">Score</span>
              <span className={`text-2xl font-black ${getScoreColor(scorePercent)}`}>{scorePercent}%</span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-5 bg-slate-950 rounded-xl border border-slate-800 shadow-inner">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-800 rounded-lg text-slate-400">
                <BarChart3 size={20} />
              </div>
              <div className="text-xs">
                <span className="font-bold text-slate-500 uppercase mr-1">Difficulty:</span> <span className="text-slate-300 font-medium mr-4">{difficulty}</span>
                <span className="font-bold text-slate-500 uppercase mr-1">Concept:</span> <span className="text-slate-300 font-medium">{concept === 'All' ? 'Mixed Concepts' : concept}</span>
              </div>
            </div>
            <button onClick={onFinish} className="btn-primary w-full md:w-auto shadow-amber-500/20">
              <RotateCcw size={16} /> Finish Exam
            </button>
          </div>
        </div>
      </section>

      {/* Detailed Review Header */}
      <div className="flex items-center gap-3 mb-8">
        <h2 className="text-xl font-black text-slate-100 tracking-tight">Detailed Question Review</h2>
        <div className="h-px bg-slate-800 flex-grow"></div>
      </div>

      {/* Detailed Review List */}
      <div className="space-y-8">
        {questions.map((q, index) => {
          const userAnswer = selectedAnswers[q.id];
          const isCorrect = userAnswer === q.correctOption;

          return (
            <div key={q.id} className="bg-slate-900 rounded-xl shadow-xl border border-slate-800 overflow-hidden transition hover:border-slate-700">
              {/* Question Header */}
              <div className={`px-6 py-4 flex items-center justify-between border-b ${isCorrect ? 'bg-emerald-950/10 border-emerald-900/30' : 'bg-rose-950/10 border-rose-900/30'}`}>
                <div className="flex items-center gap-3">
                  <span className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-black ${isCorrect ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'}`}>
                    {index + 1}
                  </span>
                  <span className={`text-xs font-black uppercase tracking-widest ${isCorrect ? 'text-emerald-500' : 'text-rose-500'} flex items-center gap-1.5`}>
                    {isCorrect ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                    {isCorrect ? 'Correct' : 'Incorrect'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-500 bg-slate-950 px-2 py-1 rounded border border-slate-800">
                    {q.difficulty}
                  </span>
                  <button 
                    onClick={() => onReadConcept(q.certification, q.concept)}
                    className="text-[9px] font-black uppercase tracking-[0.15em] text-indigo-400 bg-indigo-950 hover:bg-indigo-900 px-2 py-1 rounded border border-indigo-900 transition flex items-center gap-1"
                  >
                    <BookOpen size={10} /> {q.concept}
                  </button>
                </div>
              </div>

              {/* Question Content */}
              <div className="p-6 md:p-8">
                <h3 className="text-base md:text-lg font-bold text-slate-100 mb-8 leading-relaxed">
                  {q.question}
                </h3>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  {/* User Answer */}
                  <div className={`p-5 rounded-xl border-2 ${isCorrect ? 'bg-emerald-950/10 border-emerald-900/20' : 'bg-rose-950/10 border-rose-900/20'}`}>
                    <span className="block text-[10px] font-black uppercase text-slate-600 mb-3 tracking-widest">Your Answer</span>
                    <p className={`text-sm md:text-base font-bold ${userAnswer ? (isCorrect ? 'text-emerald-400' : 'text-rose-400') : 'text-slate-600 italic'}`}>
                      {userAnswer || 'Not answered'}
                    </p>
                  </div>
                  
                  {/* Correct Answer */}
                  <div className="p-5 rounded-xl border-2 bg-slate-950/50 border-slate-800">
                    <span className="block text-[10px] font-black uppercase text-slate-600 mb-3 tracking-widest">Correct Answer</span>
                    <p className="text-sm md:text-base font-bold text-slate-300">
                      {q.correctOption}
                    </p>
                  </div>
                </div>

                {/* Explanation / Reason */}
                <div className="bg-slate-950 rounded-xl p-6 border border-slate-800 shadow-inner">
                  <div className="flex items-center gap-2 mb-4 text-amber-500/80">
                    <Info size={16} />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Explanation</span>
                  </div>
                  <p className="text-sm md:text-base text-slate-400 leading-relaxed italic">
                    {q.reason}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Navigation */}
      <div className="mt-16 flex justify-center">
        <button 
          onClick={onFinish}
          className="bg-slate-100 hover:bg-white text-slate-950 font-black px-12 py-5 rounded-2xl shadow-2xl transition-all transform hover:-translate-y-1 active:translate-y-0 flex items-center gap-3 text-base"
        >
          <RotateCcw size={22} className="text-amber-600" />
          Finish & Return to Dashboard
        </button>
      </div>
    </div>
  );
}
