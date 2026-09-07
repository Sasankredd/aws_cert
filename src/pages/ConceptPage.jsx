import React from 'react';
import { concepts } from '../data/concepts';
import { ArrowLeft, BookOpen, AlertCircle } from 'lucide-react';

export default function ConceptPage({ conceptReading, onBack }) {
  if (!conceptReading) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4 text-center">
        <div className="bg-rose-950/20 border border-rose-900/50 text-rose-500 p-4 rounded-xl flex items-center gap-2 justify-center mb-4">
          <AlertCircle />
          <span>No concept was selected for reading.</span>
        </div>
        <button onClick={onBack} className="btn-secondary">
          <ArrowLeft size={16} /> Go Back
        </button>
      </div>
    );
  }

  const { conceptName, certification } = conceptReading;

  // Find matching concept
  const matchingConcept = concepts.find(
    c => c.conceptName.toLowerCase() === conceptName.toLowerCase() && 
         c.certification.toLowerCase() === certification.toLowerCase()
  );

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Navigation and Actions */}
      <div className="mb-6">
        <button
          onClick={onBack}
          className="btn-secondary inline-flex items-center text-xs px-4 py-2"
        >
          <ArrowLeft size={16} />
          Back to {conceptReading.backPage === 'RESULT' ? 'Exam Results' : 'Home'}
        </button>
      </div>

      {matchingConcept ? (
        <article className="bg-slate-900 rounded-2xl shadow-2xl border border-slate-800 overflow-hidden transition hover:border-slate-700">
          {/* Header */}
          <div className="bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-900 px-6 py-10 text-white border-b border-indigo-500/10">
            <span className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.25em] block mb-3">
              {matchingConcept.certification}
            </span>
            <div className="flex items-center gap-4">
              <div className="p-2.5 bg-indigo-500/20 rounded-xl text-indigo-300 shadow-inner">
                <BookOpen size={28} />
              </div>
              <h1 className="text-2xl md:text-3xl font-black text-slate-100 tracking-tight leading-tight">
                {matchingConcept.conceptName}
              </h1>
            </div>
          </div>

          {/* Content Body */}
          <div className="p-6 md:p-10">
            <div className="prose prose-invert max-w-none">
              <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-6 pb-2 border-b border-slate-800">
                Detailed Concept Explanation
              </h3>
              
              {/* Highlight Paragraphs */}
              <div className="text-slate-300 leading-relaxed space-y-8 text-base md:text-lg font-medium">
                {matchingConcept.concept.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="whitespace-pre-wrap first-letter:text-2xl first-letter:font-black first-letter:text-indigo-400">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Practical Tip Box */}
            <div className="mt-12 bg-amber-950/20 border-l-4 border-amber-500 p-6 rounded-r-xl shadow-lg">
              <h4 className="text-[10px] font-black text-amber-500 uppercase tracking-[0.2em] mb-2">
                Exam Preparation Tip
              </h4>
              <p className="text-sm md:text-base text-amber-100/80 leading-relaxed italic">
                When preparing for the <strong>{matchingConcept.certification}</strong>, pay special attention to use cases, pricing dimensions, and integration patterns associated with <strong>{matchingConcept.conceptName}</strong>. Standard questions often compare this service to other AWS options.
              </p>
            </div>
          </div>

          {/* Footer Back Button */}
          <div className="bg-slate-950/50 px-6 py-6 border-t border-slate-800 flex justify-end">
            <button
              onClick={onBack}
              className="btn-primary shadow-amber-500/10"
            >
              <ArrowLeft size={16} />
              Done studying
            </button>
          </div>
        </article>
      ) : (
        <div className="bg-slate-900 rounded-2xl shadow-2xl border border-slate-800 p-10 text-center">
          <div className="p-5 bg-indigo-500/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 text-indigo-500 shadow-inner">
            <BookOpen size={40} />
          </div>
          <h2 className="text-xl md:text-2xl font-black text-slate-100 mb-3 tracking-tight">Detailed Concept Not Found</h2>
          <p className="text-slate-500 text-sm md:text-base max-w-md mx-auto mb-8">
            We couldn't find a direct match for <strong>"{conceptName}"</strong> in your <code>concepts.js</code> file.
          </p>
          <div className="bg-slate-950 p-6 rounded-xl text-left text-xs text-slate-400 mb-8 font-mono border border-slate-800 leading-loose">
            {`// Append this to src/data/concepts.js:
{
  id: ${Date.now()},
  conceptName: "${conceptName}",
  concept: "Add explanations for ${conceptName} here...",
  certification: "${certification}"
}`}
          </div>
          <button onClick={onBack} className="btn-secondary mx-auto">
            <ArrowLeft size={16} /> Return Back
          </button>
        </div>
      )}
    </div>
  );
}
