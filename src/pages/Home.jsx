import React, { useState, useEffect } from 'react';
import { questions } from '../data/questions';
import { concepts } from '../data/concepts';
import { 
  getUniqueCertifications, 
  getUniqueConceptsFromQuestions, 
  filterQuestions, 
  getRandomQuestions,
  getConceptsForCertification
} from '../utils/examUtils';
import { storage } from '../utils/storage';
import { BookOpen, Play, RotateCcw, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function Home({ onStartExam, onReadConcept }) {
  // Extract unique certifications from questions + concepts
  const certifications = getUniqueCertifications(questions, concepts);
  
  // States for Exam Configuration
  const [selectedCert, setSelectedCert] = useState(certifications[0] || '');
  const [selectedDifficulty, setSelectedDifficulty] = useState('Mixed');
  const [selectedConcept, setSelectedConcept] = useState('All');
  const [questionCount, setQuestionCount] = useState(5);
  
  // States for "Read Concepts" Section
  const [readCert, setReadCert] = useState(certifications[0] || '');
  const [readConcept, setReadConcept] = useState('');

  // Confirmation state for reset
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  // Recalculate dynamic values based on Exam configuration
  const filteredQuestionsPool = filterQuestions(
    questions,
    selectedCert,
    selectedDifficulty,
    selectedConcept
  );

  const availableCount = filteredQuestionsPool.length;

  // Filtered concepts available for the "Read Concepts" section
  const availableConceptsForReading = getConceptsForCertification(concepts, readCert);

  // Handle Certification Change in Exam Configuration
  const handleCertChange = (e) => {
    const cert = e.target.value;
    setSelectedCert(cert);
    setSelectedConcept('All'); // Reset to All concepts
    setQuestionCount(5); // Default to a safe low count
  };

  // Handle Certification Change in Reading Configuration
  const handleReadCertChange = (e) => {
    const cert = e.target.value;
    setReadCert(cert);
  };

  // Effect to automatically select the first concept when read certification changes
  useEffect(() => {
    const matched = getConceptsForCertification(concepts, readCert);
    if (matched.length > 0) {
      setReadConcept(matched[0].conceptName);
    } else {
      setReadConcept('');
    }
  }, [readCert]);

  // Clamp Question Count if it exceeds available count
  useEffect(() => {
    if (questionCount > availableCount && availableCount > 0) {
      setQuestionCount(availableCount);
    } else if (availableCount === 0) {
      setQuestionCount(0);
    } else if (questionCount <= 0 && availableCount > 0) {
      setQuestionCount(Math.min(5, availableCount));
    }
  }, [availableCount, questionCount]);

  // Unique concepts from questions belonging to current certification (for dropdown)
  const availableConceptsForDropdown = getUniqueConceptsFromQuestions(questions, selectedCert);

  // Handle Start Exam
  const handleStartExamSubmit = (e) => {
    e.preventDefault();
    if (availableCount === 0) {
      alert("No questions found matching your selected filters.");
      return;
    }
    
    // Select questions randomly
    const selectedQuestions = getRandomQuestions(filteredQuestionsPool, questionCount);
    
    // Pass config and questions to App
    onStartExam({
      questions: selectedQuestions,
      selectedAnswers: {},
      certification: selectedCert,
      difficulty: selectedDifficulty,
      concept: selectedConcept,
      questionCount: questionCount
    });
  };

  // Handle Reset All Data
  const handleResetAllData = () => {
    storage.clearAllStorage();
    setShowConfirmReset(false);
    alert("All exam progress and application data have been cleared.");
    window.location.reload();
  };

  // Pre-configured options for question counts
  const countOptions = [5, 10, 20, 30, 50].filter(c => c <= availableCount);
  // Ensure that if availableCount is between standard options, we also offer the exact max count
  if (availableCount > 0 && !countOptions.includes(availableCount)) {
    countOptions.push(availableCount);
    countOptions.sort((a, b) => a - b);
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header / Hero */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-8 mb-8 text-white shadow-lg border border-slate-800 text-center md:text-left md:flex items-center justify-between">
        <div className="mb-6 md:mb-0 md:max-w-xl">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
            <span className="bg-amber-500 text-slate-950 text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1">
              <ShieldCheck size={13} /> Official Prep
            </span>
            <span className="text-slate-400 text-xs font-medium">No Backend / Local Sandbox</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-100 tracking-tight leading-tight">
            AWS Certification Exam Prep
          </h1>
          <p className="mt-3 text-slate-300 text-sm md:text-base leading-relaxed">
            Practice dynamically configured exams or review critical core concepts. Add questions and explanation files daily to extend your database seamlessly.
          </p>
        </div>
        <div className="flex justify-center">
          <div className="h-28 w-28 rounded-full bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center shadow-inner animate-pulse">
            <span className="text-5xl">☁️</span>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Practice Exam Setup */}
        <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-3">
              <div className="p-2.5 bg-amber-500/10 rounded-lg text-amber-600">
                <Play size={20} />
              </div>
              <h2 className="text-xl font-bold text-slate-800">Configure Practice Exam</h2>
            </div>

            <form onSubmit={handleStartExamSubmit} className="space-y-4">
              {/* Certification Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                  1. AWS Certification
                </label>
                <select
                  value={selectedCert}
                  onChange={handleCertChange}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium transition"
                >
                  {certifications.map(cert => (
                    <option key={cert} value={cert}>{cert}</option>
                  ))}
                </select>
              </div>

              {/* Difficulty Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                  2. Difficulty Level
                </label>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium transition"
                >
                  <option value="Mixed">Mixed (All Difficulties)</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>

              {/* Concept Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                  3. Target AWS Concept
                </label>
                <select
                  value={selectedConcept}
                  onChange={(e) => setSelectedConcept(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium transition"
                >
                  <option value="All">All Concepts</option>
                  {availableConceptsForDropdown.map(concept => (
                    <option key={concept} value={concept}>{concept}</option>
                  ))}
                </select>
              </div>

              {/* Question Count Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1 flex justify-between">
                  <span>4. Question Count</span>
                  <span className="text-slate-500 font-normal normal-case">
                    ({availableCount} questions match)
                  </span>
                </label>
                {availableCount > 0 ? (
                  <select
                    value={questionCount}
                    onChange={(e) => setQuestionCount(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium transition"
                  >
                    {countOptions.map(count => (
                      <option key={count} value={count}>
                        {count} {count === availableCount ? '(Maximum Available)' : 'Questions'}
                      </option>
                    ))}
                  </select>
                ) : (
                  <div className="bg-rose-50 border border-rose-200 text-rose-700 text-sm p-3 rounded-lg flex items-start gap-2">
                    <AlertTriangle size={18} className="flex-shrink-0 mt-0.5" />
                    <span>No questions available for the selected filters. Please adjust difficulty or concept.</span>
                  </div>
                )}
              </div>

              {/* Start Button */}
              <button
                type="submit"
                disabled={availableCount === 0}
                className="w-full mt-6 btn-primary disabled:opacity-50 disabled:cursor-not-allowed text-base py-3"
              >
                <Play size={18} />
                Start Exam
              </button>
            </form>
          </div>
        </div>

        {/* Concept Reading Section */}
        <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-3">
              <div className="p-2.5 bg-indigo-500/10 rounded-lg text-indigo-600">
                <BookOpen size={20} />
              </div>
              <h2 className="text-xl font-bold text-slate-800">Read Concepts</h2>
            </div>

            <div className="space-y-4">
              {/* Reading Certification Filter */}
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                  AWS Certification
                </label>
                <select
                  value={readCert}
                  onChange={handleReadCertChange}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium transition"
                >
                  {certifications.map(cert => (
                    <option key={cert} value={cert}>{cert}</option>
                  ))}
                </select>
              </div>

              {/* Reading Concept Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                  Select Concept to Study
                </label>
                {availableConceptsForReading.length > 0 ? (
                  <select
                    value={readConcept}
                    onChange={(e) => setReadConcept(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium transition"
                  >
                    {availableConceptsForReading.map(c => (
                      <option key={c.id} value={c.conceptName}>
                        {c.conceptName}
                      </option>
                    ))}
                  </select>
                ) : (
                  <div className="bg-amber-50 border border-amber-200 text-amber-800 text-xs p-3 rounded-lg">
                    No concept explanation cards found in Data File 2 for this certification.
                  </div>
                )}
              </div>

              {/* Read Button */}
              <button
                type="button"
                disabled={!readConcept}
                onClick={() => onReadConcept(readCert, readConcept)}
                className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg transition duration-200 shadow-md flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <BookOpen size={18} />
                Read Concept explanation
              </button>
            </div>
          </div>

          <div className="mt-8 border-t border-slate-100 pt-6">
            <h3 className="text-sm font-semibold text-slate-700 mb-2">Adding Daily Questions?</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Open <code>src/data/questions.js</code> or <code>src/data/concepts.js</code> and append your new JS objects. The Home page dropdowns and matching questions count will refresh dynamically.
            </p>
          </div>
        </div>
      </div>

      {/* Global State Reset Button */}
      <div className="mt-12 flex justify-center border-t border-slate-200 pt-8">
        {!showConfirmReset ? (
          <button
            type="button"
            onClick={() => setShowConfirmReset(true)}
            className="text-xs font-semibold text-slate-500 hover:text-rose-600 flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-slate-100 transition"
          >
            <RotateCcw size={14} />
            Reset All Saved App Data
          </button>
        ) : (
          <div className="bg-rose-50 border border-rose-200 p-4 rounded-xl max-w-md text-center shadow-sm">
            <div className="flex justify-center mb-2">
              <AlertTriangle className="text-rose-600" size={24} />
            </div>
            <p className="text-xs font-semibold text-rose-800 mb-4 leading-relaxed">
              Are you sure you want to clear all saved exam data? This includes all mid-exam progress, answers, results, and study histories.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={handleResetAllData}
                className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold px-4 py-2 rounded-lg shadow-sm transition"
              >
                Yes, Clear Everything
              </button>
              <button
                onClick={() => setShowConfirmReset(false)}
                className="bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold px-4 py-2 rounded-lg transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
