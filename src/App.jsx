import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import ExamPage from './pages/ExamPage';
import ConceptPage from './pages/ConceptPage';
import ResultPage from './pages/ResultPage';
import { storage } from './utils/storage';

export default function App() {
  // Navigation State
  const [currentPage, setCurrentPage] = useState(storage.getCurrentPage());
  
  // Exam State (Questions, Answers, Config)
  const [examState, setExamState] = useState(storage.getExamState());

  // Concept Reading State (Which concept is being read and where to go back)
  const [conceptReading, setConceptReading] = useState(storage.getConceptReading());

  // Sync state to localStorage on changes
  useEffect(() => {
    storage.saveCurrentPage(currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (examState) {
      storage.saveExamState(examState);
    } else {
      storage.clearExamState();
    }
  }, [examState]);

  useEffect(() => {
    if (conceptReading) {
      storage.saveConceptReading(conceptReading);
    } else {
      storage.clearConceptReading();
    }
  }, [conceptReading]);

  // --- ACTIONS ---

  // Start a new Exam
  const startExam = (config) => {
    setExamState(config);
    setCurrentPage('EXAM');
  };

  // Select an Answer
  const handleAnswerSelect = (questionId, answer) => {
    setExamState(prev => ({
      ...prev,
      selectedAnswers: {
        ...prev.selectedAnswers,
        [questionId]: answer
      }
    }));
  };

  // Submit Exam
  const submitExam = () => {
    setCurrentPage('RESULT');
  };

  // Exit/Cancel Exam mid-way
  const cancelExam = () => {
    const confirmExit = window.confirm("Progress is saved. Are you sure you want to return to the Home page?");
    if (confirmExit) {
      setCurrentPage('HOME');
    }
  };

  // Navigate to Concept Reading
  const openConcept = (certification, conceptName) => {
    setConceptReading({
      certification,
      conceptName,
      backPage: currentPage // Save current page to return to later (HOME or RESULT)
    });
    setCurrentPage('CONCEPT');
  };

  // Back from Concept Page
  const backFromConcept = () => {
    if (conceptReading?.backPage) {
      setCurrentPage(conceptReading.backPage);
    } else {
      setCurrentPage('HOME');
    }
    setConceptReading(null);
  };

  // Finish Exam (Clear results and go home)
  const finishExam = () => {
    setExamState(null);
    setCurrentPage('HOME');
  };

  // Render correct page
  const renderPage = () => {
    switch (currentPage) {
      case 'HOME':
        return <Home onStartExam={startExam} onReadConcept={openConcept} />;
      case 'EXAM':
        return (
          <ExamPage 
            examState={examState} 
            onAnswerSelect={handleAnswerSelect}
            onSubmitExam={submitExam}
            onCancelExam={cancelExam}
          />
        );
      case 'RESULT':
        return (
          <ResultPage 
            examState={examState} 
            onReadConcept={openConcept}
            onFinish={finishExam}
          />
        );
      case 'CONCEPT':
        return (
          <ConceptPage 
            conceptReading={conceptReading}
            onBack={backFromConcept}
          />
        );
      default:
        return <Home onStartExam={startExam} onReadConcept={openConcept} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <main className="container mx-auto py-4">
        {renderPage()}
      </main>
      
      {/* Footer Branding */}
      <footer className="py-8 text-center text-slate-500 text-xs border-t border-slate-900 mt-12">
        <p>© 2026 AWS Certification Prep Sandbox • Offline First</p>
      </footer>
    </div>
  );
}
