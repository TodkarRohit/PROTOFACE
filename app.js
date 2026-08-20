import React, { useState } from 'react';
import { Navbar } from './components/Navbar.js';
import { ControlsPanel } from './components/ControlsPanel.js';
import { A4PreviewPanel } from './components/A4PreviewPanel.js';
import { ExportModal } from './components/ExportModal.js';
import { PRESET_EXAMS, QUESTION_POOL } from './data/mockData.js';

export default function App() {
  const initialPreset = PRESET_EXAMS[0];

  // Core Application State
  const [activePresetId, setActivePresetId] = useState(initialPreset.id);
  const [header, setHeader] = useState(initialPreset.header);
  const [difficulty, setDifficulty] = useState(initialPreset.difficulty);
  const [sources, setSources] = useState(initialPreset.sources);
  const [sections, setSections] = useState(initialPreset.sections);
  const [viewMode, setViewMode] = useState('student'); // 'student' | 'teacher'

  // UI Interactive States
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState('');
  const [swappingQuestionId, setSwappingQuestionId] = useState(null);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Show temporary toast message
  const showToast = (msg, type = 'success') => {
    setToastMessage({ msg, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Switch Preset Template
  const handleSelectPreset = (presetId) => {
    const selected = PRESET_EXAMS.find(p => p.id === presetId);
    if (selected) {
      setActivePresetId(selected.id);
      setHeader(selected.header);
      setDifficulty(selected.difficulty);
      setSources(selected.sources);
      setSections(selected.sections);
      showToast(`Loaded preset template: ${selected.name}`);
    }
  };

  // Update Header Fields
  const handleUpdateHeader = (key, value) => {
    setHeader(prev => ({ ...prev, [key]: value }));
  };

  // Update Difficulty Balance
  const handleUpdateDifficulty = (newDiff) => {
    setDifficulty(newDiff);
  };

  // Source Management
  const handleAddSource = (sourceObj) => {
    setSources(prev => [...prev, sourceObj]);
    showToast(`Source added: ${sourceObj.name}`);
  };

  const handleRemoveSource = (id) => {
    setSources(prev => prev.filter(s => s.id !== id));
    showToast('Source removed', 'info');
  };

  // AI Full Exam Generation via Live Backend API
  const handleGeneratePaper = async () => {
    setIsGenerating(true);
    setGenerationProgress('1/3 Connecting to AI backend server...');

    try {
      const totalQuestions = 8; // Number of questions to generate
      const totalMarks = Number(header.totalMarks) || 30;

      // Calculate difficulty counts from slider percentages
      const easyPct = Number(difficulty.easy) || 30;
      const medPct = Number(difficulty.medium) || 50;

      let easy = Math.max(1, Math.round((easyPct / 100) * totalQuestions));
      let medium = Math.max(1, Math.round((medPct / 100) * totalQuestions));
      let difficult = totalQuestions - (easy + medium);

      if (difficult < 1) {
        difficult = 1;
        if (medium > 1) medium -= 1;
        else if (easy > 1) easy -= 1;
      }

      setGenerationProgress('2/3 Generating cognitive questions with Gemini AI...');

      // Include reference sources if any
      const sourcesText = sources && sources.length > 0
        ? ` (Syllabus reference: ${sources.map(s => s.name).join(', ')})`
        : '';
      const topicText = `${header.subHeader || 'Unit Syllabus'}${sourcesText}`;

      const response = await fetch('http://localhost:5000/api/generate-paper', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subject: header.subject || 'Physics',
          topic: topicText,
          className: `${header.standard || 'Grade 10'} (${header.division || 'All'})`,
          totalQuestions,
          totalMarks,
          difficulty: { easy, medium, difficult },
          questionTypes: ['MCQ', 'Short Answer', 'Numerical']
        })
      });

      const data = await response.json();

      if (!response.ok || !data.success || !data.paper) {
        throw new Error(data.message || 'Failed to generate question paper from backend.');
      }

      setGenerationProgress('3/3 Formatting A4 document layout...');

      const rawQuestions = data.paper.questions || [];

      // Categorize into sections
      const mcqQuestions = rawQuestions.filter(q => q.type === 'MCQ' || (q.options && q.options.length > 0));
      const nonMcqQuestions = rawQuestions.filter(q => q.type !== 'MCQ' && (!q.options || q.options.length === 0));
      const shortQuestions = nonMcqQuestions.filter(q => q.difficulty === 'easy' || q.difficulty === 'medium');
      const hardQuestions = nonMcqQuestions.filter(q => q.difficulty === 'difficult' || q.difficulty === 'hard');

      const formattedSections = [];
      let qCounter = 1;

      // Section A: MCQs
      if (mcqQuestions.length > 0) {
        formattedSections.push({
          id: 'sec-a',
          title: 'SECTION A: MULTIPLE CHOICE QUESTIONS',
          subtitle: 'Select the correct alternative for each of the following questions.',
          marksPerQuestion: mcqQuestions[0]?.marks || 1,
          questions: mcqQuestions.map(q => ({
            id: `ai-q-${qCounter}`,
            number: String(qCounter++),
            text: q.question,
            type: 'mcq',
            difficulty: q.difficulty === 'difficult' ? 'hard' : q.difficulty,
            marks: q.marks || 1,
            options: q.options && q.options.length > 0 ? q.options : ['A', 'B', 'C', 'D'],
            answerKey: {
              correctOption: q.correctAnswer || 'See explanation',
              solution: q.explanation || 'Step-by-step solution provided by AI.',
              rubric: `${q.marks || 1} Mark for the correct option selection.`
            }
          }))
        });
      }

      // Section B: Short Answer
      if (shortQuestions.length > 0) {
        formattedSections.push({
          id: 'sec-b',
          title: 'SECTION B: SHORT ANSWER QUESTIONS',
          subtitle: 'Answer the following questions briefly with scientific principles.',
          marksPerQuestion: shortQuestions[0]?.marks || 2,
          questions: shortQuestions.map(q => ({
            id: `ai-q-${qCounter}`,
            number: String(qCounter++),
            text: q.question,
            type: 'short',
            difficulty: q.difficulty === 'difficult' ? 'hard' : q.difficulty,
            marks: q.marks || 2,
            options: [],
            answerKey: {
              correctOption: q.correctAnswer || 'Complete written answer',
              solution: q.explanation || 'Detailed scientific explanation.',
              rubric: `${q.marks || 2} Marks: Key concepts and reasoning.`
            }
          }))
        });
      }

      // Section C: Long Answer / Numerical
      if (hardQuestions.length > 0) {
        formattedSections.push({
          id: 'sec-c',
          title: 'SECTION C: NUMERICAL & ANALYTICAL PROBLEMS',
          subtitle: 'Solve with detailed step-by-step calculations and derivations.',
          marksPerQuestion: hardQuestions[0]?.marks || 4,
          questions: hardQuestions.map(q => ({
            id: `ai-q-${qCounter}`,
            number: String(qCounter++),
            text: q.question,
            type: 'long',
            difficulty: 'hard',
            marks: q.marks || 4,
            options: [],
            answerKey: {
              correctOption: q.correctAnswer || 'Final calculated answer',
              solution: q.explanation || 'Full derivation and calculations.',
              rubric: `${q.marks || 4} Marks: Formula (1M) + Steps (2M) + Final Answer (1M).`
            }
          }))
        });
      }

      // Fallback if not split
      if (formattedSections.length === 0 && rawQuestions.length > 0) {
        formattedSections.push({
          id: 'sec-a',
          title: 'SECTION A: COMPREHENSIVE QUESTIONS',
          subtitle: 'Answer the following questions.',
          marksPerQuestion: 2,
          questions: rawQuestions.map(q => ({
            id: `ai-q-${qCounter}`,
            number: String(qCounter++),
            text: q.question,
            type: q.type === 'MCQ' ? 'mcq' : 'short',
            difficulty: q.difficulty === 'difficult' ? 'hard' : q.difficulty,
            marks: q.marks || 2,
            options: q.options || [],
            answerKey: {
              correctOption: q.correctAnswer || 'Answer key',
              solution: q.explanation || 'Explanation',
              rubric: `${q.marks || 2} Marks.`
            }
          }))
        });
      }

      setSections(formattedSections);
      showToast('✨ AI Exam Paper generated successfully from live Gemini backend!');
    } catch (err) {
      console.error('Error generating paper:', err);
      showToast(`⚠️ ${err.message}`, 'info');
    } finally {
      setIsGenerating(false);
      setGenerationProgress('');
    }
  };

  // Inline Question Refresh / Swap Simulation
  const handleSwapQuestion = (qId, qDifficulty) => {
    setSwappingQuestionId(qId);
    
    setTimeout(() => {
      const pool = QUESTION_POOL[qDifficulty] || QUESTION_POOL.easy;
      const randomQ = pool[Math.floor(Math.random() * pool.length)];

      setSections(prevSections =>
        prevSections.map(sec => ({
          ...sec,
          questions: sec.questions.map(q => {
            if (q.id === qId) {
              return {
                ...q,
                text: randomQ.text,
                options: randomQ.options ? [...randomQ.options] : q.options,
                answerKey: randomQ.answerKey ? { ...randomQ.answerKey } : q.answerKey
              };
            }
            return q;
          })
        }))
      );

      setSwappingQuestionId(null);
      showToast('🔄 Question swapped with alternative variant from item bank!');
    }, 600);
  };

  // Inline Edit Question Text
  const handleEditQuestion = (qId, newText) => {
    setSections(prevSections =>
      prevSections.map(sec => ({
        ...sec,
        questions: sec.questions.map(q => (q.id === qId ? { ...q, text: newText } : q))
      }))
    );
    showToast('Question updated successfully!');
  };

  // Quick Print Action
  const handleQuickPrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      
      {/* Top Navbar */}
      <Navbar
        viewMode={viewMode}
        setViewMode={setViewMode}
        presetExams={PRESET_EXAMS}
        activePresetId={activePresetId}
        onSelectPreset={handleSelectPreset}
        onOpenExportModal={() => setExportModalOpen(true)}
        onQuickPrint={handleQuickPrint}
      />

      {/* Main Split-Screen Workspace */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        
        {/* Left Controls Panel */}
        <ControlsPanel
          header={header}
          onUpdateHeader={handleUpdateHeader}
          difficulty={difficulty}
          onUpdateDifficulty={handleUpdateDifficulty}
          sources={sources}
          onAddSource={handleAddSource}
          onRemoveSource={handleRemoveSource}
          onGeneratePaper={handleGeneratePaper}
          isGenerating={isGenerating}
          generationProgress={generationProgress}
        />

        {/* Right Live A4 Document Preview */}
        <A4PreviewPanel
          header={header}
          sections={sections}
          viewMode={viewMode}
          onSwapQuestion={handleSwapQuestion}
          onEditQuestion={handleEditQuestion}
          swappingQuestionId={swappingQuestionId}
        />

      </div>

      {/* Export Options Modal */}
      <ExportModal
        isOpen={exportModalOpen}
        onClose={() => setExportModalOpen(false)}
        header={header}
        sections={sections}
        viewMode={viewMode}
      />

      {/* Toast Notification Popup */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce-in">
          <div className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl border text-xs font-semibold backdrop-blur-md ${
            toastMessage.type === 'info'
              ? 'bg-slate-800/95 border-slate-700 text-slate-200'
              : 'bg-emerald-900/95 border-emerald-500/50 text-emerald-100 shadow-emerald-950/40'
          }`}>
            <svg className="w-5 h-5 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{toastMessage.msg}</span>
          </div>
        </div>
      )}

    </div>
  );
}
