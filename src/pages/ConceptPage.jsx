import React from 'react';
import { concepts } from '../data/concepts';
import { ArrowLeft, BookOpen, AlertCircle } from 'lucide-react';

export default function ConceptPage({ conceptReading, onBack }) {
  if (!conceptReading) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4 text-center">
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex items-center gap-2 justify-center mb-4">
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
          className="btn-secondary inline-flex items-center text-sm px-4 py-2"
        >
          <ArrowLeft size={16} />
          Back to {conceptReading.backPage === 'RESULT' ? 'Exam Results' : 'Home'}
        </button>
      </div>

      {matchingConcept ? (
        <article className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-900 to-slate-900 px-6 py-8 text-white">
            <span className="text-indigo-300 text-xs font-bold uppercase tracking-widest block mb-2">
              {matchingConcept.certification}
            </span>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-300">
                <BookOpen size={24} />
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-100 tracking-tight">
                {matchingConcept.conceptName}
              </h1>
            </div>
          </div>

          {/* Content Body */}
          <div className="p-6 md:p-8">
            <div className="prose prose-slate max-w-none">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 pb-2 border-b border-slate-100">
                Concept Overview & Core Architecture
              </h3>
              
              {/* Highlight Paragraphs */}
              <div className="text-slate-700 leading-relaxed space-y-6 text-base md:text-lg">
                {matchingConcept.concept.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="whitespace-pre-wrap">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Practical Tip Box */}
            <div className="mt-8 bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg">
              <h4 className="text-sm font-bold text-amber-950 uppercase tracking-wider mb-1">
                Exam Preparation Tip
              </h4>
              <p className="text-sm text-amber-900 leading-relaxed">
                When preparing for the <strong>{matchingConcept.certification}</strong>, pay special attention to use cases, pricing dimensions, and integration patterns associated with <strong>{matchingConcept.conceptName}</strong>. Standard questions often compare this service to other AWS options.
              </p>
            </div>
          </div>

          {/* Footer Back Button */}
          <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex justify-end">
            <button
              onClick={onBack}
              className="btn-primary"
            >
              <ArrowLeft size={16} />
              Done studying
            </button>
          </div>
        </article>
      ) : (
        <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-8 text-center">
          <div className="p-4 bg-amber-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-amber-500">
            <BookOpen size={32} />
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">Detailed Concept Not Found</h2>
          <p className="text-slate-600 text-sm max-w-md mx-auto mb-6">
            We couldn't find a direct match for <strong>"{conceptName}"</strong> in your <code>concepts.js</code> file. You can easily add an entry for it.
          </p>
          <div className="bg-slate-50 p-4 rounded-lg text-left text-xs text-slate-600 mb-6 font-mono max-w-lg mx-auto">
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
