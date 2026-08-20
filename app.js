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

  // AI Full Exam Generation Simulation
  const handleGeneratePaper = () => {
    setIsGenerating(true);
    setGenerationProgress('1/3 Analyzing syllabus & weightings...');

    setTimeout(() => {
      setGenerationProgress('2/3 Generating cognitive questions...');
      setTimeout(() => {
        setGenerationProgress('3/3 Structuring A4 document layout...');
        setTimeout(() => {
          setIsGenerating(false);
          setGenerationProgress('');
          showToast('✨ AI Exam Paper generated successfully with optimal cognitive balance!');
        }, 800);
      }, 900);
    }, 900);
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
