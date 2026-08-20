import React, { useState } from 'react';

export function A4PreviewPanel({
  header,
  sections,
  viewMode,
  onSwapQuestion,
  onEditQuestion,
  swappingQuestionId
}) {
  const [zoomLevel, setZoomLevel] = useState(100); // 75, 100, 125
  const [showWatermark, setShowWatermark] = useState(true);
  const [editingQId, setEditingQId] = useState(null);
  const [editingText, setEditingText] = useState('');

  // Zoom handlers
  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 15, 135));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 15, 65));
  const handleResetZoom = () => setZoomLevel(100);

  // Edit question inline
  const startEditing = (q) => {
    setEditingQId(q.id);
    setEditingText(q.text);
  };

  const saveEditing = (qId) => {
    if (editingText.trim()) {
      onEditQuestion(qId, editingText.trim());
    }
    setEditingQId(null);
  };

  return (
    <main className="flex-1 bg-slate-200/90 dark:bg-slate-950 p-4 lg:p-8 overflow-y-auto flex flex-col items-center min-h-screen">
      
      {/* Top Document Toolbar */}
      <div className="w-full max-w-4xl bg-white dark:bg-slate-900 rounded-xl shadow-md border border-slate-200 dark:border-slate-800 p-2.5 mb-6 flex flex-wrap items-center justify-between gap-3 text-xs no-print">
        
        {/* Left: View Mode Indicator */}
        <div className="flex items-center gap-2">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md font-bold text-[11px] ${
            viewMode === 'teacher' 
              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300' 
              : 'bg-blue-100 text-blue-800 border border-blue-300 dark:bg-blue-950 dark:text-blue-300'
          }`}>
            <span className={`w-2 h-2 rounded-full ${viewMode === 'teacher' ? 'bg-emerald-500 animate-ping' : 'bg-blue-500'}`}></span>
            {viewMode === 'teacher' ? 'TEACHER ANSWER KEY & MARKING SCHEME' : 'STUDENT EXAMINATION PAPER'}
          </span>
          <span className="text-slate-400 font-mono text-[11px]">A4 Format (210 × 297 mm)</span>
        </div>

        {/* Right: Zoom Controls & Options */}
        <div className="flex items-center gap-3">
          
          {/* Watermark Toggle */}
          <label className="flex items-center gap-1.5 cursor-pointer text-slate-600 dark:text-slate-400 hover:text-slate-900 font-medium">
            <input
              type="checkbox"
              checked={showWatermark}
              onChange={(e) => setShowWatermark(e.target.checked)}
              className="rounded text-blue-600 focus:ring-blue-500"
            />
            <span>Watermark</span>
          </label>

          <div className="h-4 w-px bg-slate-300 dark:bg-slate-700"></div>

          {/* Zoom Buttons */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-0.5 border border-slate-200 dark:border-slate-700">
            <button
              onClick={handleZoomOut}
              className="p-1 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white"
              title="Zoom Out"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
              </svg>
            </button>
            <span className="px-2 font-mono font-bold text-slate-700 dark:text-slate-200 text-[11px]">
              {zoomLevel}%
            </span>
            <button
              onClick={handleZoomIn}
              className="p-1 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white"
              title="Zoom In"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
            </button>
            <button
              onClick={handleResetZoom}
              className="px-2 py-0.5 text-[10px] font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-white border-l border-slate-200 dark:border-slate-700"
            >
              Reset
            </button>
          </div>

        </div>

      </div>

      {/* A4 PHYSICAL PAPER CANVAS */}
      <div
        style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
        className="w-full max-w-[210mm] min-h-[297mm] bg-white text-slate-900 shadow-2xl rounded-sm border border-slate-300 dark:border-slate-700 p-8 sm:p-12 transition-transform duration-200 relative font-serif select-text"
      >
        
        {/* Optional Watermark Overlay */}
        {showWatermark && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden opacity-[0.04]">
            <span className="text-8xl font-black uppercase tracking-widest text-slate-900 -rotate-45 select-none">
              {viewMode === 'teacher' ? 'ANSWER KEY' : 'OFFICIAL EXAM'}
            </span>
          </div>
        )}

        {/* 1. EXAM HEADER */}
        <header className="text-center space-y-2 mb-6 pb-2 border-b-2 border-slate-900">
          
          {/* Institution / School Name */}
          <h1 className="text-xl sm:text-2xl font-black tracking-wide uppercase text-slate-900 leading-tight">
            {header.schoolName || "SCHOOL NAME HERE"}
          </h1>

          {/* Subheader / Exam Title */}
          <h2 className="text-xs sm:text-sm font-bold tracking-widest uppercase text-slate-700">
            {header.subHeader || "EXAMINATION TITLE"}
          </h2>

          {/* Clean Info Grid */}
          <div className="grid grid-cols-2 text-xs font-sans font-semibold text-slate-800 pt-3 border-t border-slate-300 mt-3">
            <div className="text-left space-y-1">
              <p><span className="font-bold text-slate-900">SUBJECT:</span> {header.subject || 'N/A'}</p>
              <p><span className="font-bold text-slate-900">STANDARD / CLASS:</span> {header.standard} ({header.division})</p>
            </div>
            <div className="text-right space-y-1">
              <p><span className="font-bold text-slate-900">DATE:</span> {header.date || 'N/A'}</p>
              <p><span className="font-bold text-slate-900">TIME ALLOWED:</span> {header.timeAllowed} | <span className="font-bold text-slate-900">MAX MARKS:</span> {header.totalMarks}</p>
            </div>
          </div>

          {/* Horizontal Line HR */}
          <hr className="border-t-2 border-slate-900 my-2" />

          {/* General Instructions */}
          {header.instructions && header.instructions.length > 0 && (
            <div className="text-left font-sans text-[11px] text-slate-700 bg-slate-50 p-2.5 rounded border border-slate-200 my-2">
              <p className="font-bold text-slate-900 uppercase tracking-wider text-[10px] mb-1">General Instructions:</p>
              <ol className="list-decimal list-inside space-y-0.5">
                {header.instructions.map((inst, i) => (
                  <li key={i}>{inst}</li>
                ))}
              </ol>
            </div>
          )}

        </header>

        {/* 2. QUESTION SECTIONS & RENDERING */}
        <div className="space-y-8 font-serif">
          
          {sections.map((section) => (
            <section key={section.id} className="space-y-4">
              
              {/* Section Header */}
              <div className="border-b border-slate-400 pb-1 flex justify-between items-baseline font-sans">
                <div>
                  <h3 className="font-bold text-xs sm:text-sm tracking-wider uppercase text-slate-900">
                    {section.title}
                  </h3>
                  {section.subtitle && (
                    <p className="text-[11px] text-slate-600 italic font-serif">{section.subtitle}</p>
                  )}
                </div>
                <span className="text-xs font-bold text-slate-800 font-mono">
                  [{section.questions.length * section.marksPerQuestion} Marks]
                </span>
              </div>

              {/* Questions List */}
              <div className="space-y-6">
                {section.questions.map((q) => {
                  const isSwapping = swappingQuestionId === q.id;

                  return (
                    <div
                      key={q.id}
                      className={`group relative p-3 rounded-lg border transition-all duration-300 ${
                        isSwapping
                          ? 'bg-blue-50/80 border-blue-400 ring-2 ring-blue-400/50 animate-pulse'
                          : 'bg-white hover:bg-slate-50/80 border-transparent hover:border-slate-300'
                      }`}
                    >
                      
                      {/* Floating Inline Question Actions (Top Right) */}
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 bg-slate-900 text-white p-1 rounded-md shadow-lg z-10 font-sans">
                        
                        {/* Inline Difficulty Badge */}
                        <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ${
                          q.difficulty === 'easy' ? 'bg-emerald-500 text-white' :
                          q.difficulty === 'medium' ? 'bg-amber-500 text-white' : 'bg-rose-500 text-white'
                        }`}>
                          {q.difficulty}
                        </span>

                        {/* Inline Edit Button */}
                        <button
                          onClick={() => startEditing(q)}
                          className="p-1 hover:text-blue-300 transition-colors"
                          title="Edit Question Text"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>

                        {/* SUBTLE REFRESH / SWAP ICON BUTTON */}
                        <button
                          onClick={() => onSwapQuestion(q.id, q.difficulty)}
                          disabled={isSwapping}
                          className="p-1 text-indigo-300 hover:text-indigo-100 transition-all transform hover:rotate-180 duration-500"
                          title="AI Swap / Regenerate Question"
                        >
                          <svg className={`w-3.5 h-3.5 ${isSwapping ? 'animate-spin text-amber-400' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                        </button>

                      </div>

                      {/* Question Header & Body */}
                      <div className="flex items-start justify-between gap-4">
                        
                        <div className="flex-1">
                          
                          {/* Question Number & Text */}
                          {editingQId === q.id ? (
                            <div className="space-y-2 font-sans my-1">
                              <textarea
                                value={editingText}
                                onChange={(e) => setEditingText(e.target.value)}
                                className="w-full bg-slate-50 border border-blue-500 rounded p-2 text-xs font-serif text-slate-900 focus:outline-none"
                                rows={3}
                              />
                              <div className="flex justify-end gap-2 text-xs">
                                <button
                                  onClick={() => setEditingQId(null)}
                                  className="px-2 py-1 bg-slate-200 text-slate-700 rounded font-semibold"
                                >
                                  Cancel
                                </button>
                                <button
                                  onClick={() => saveEditing(q.id)}
                                  className="px-2.5 py-1 bg-blue-600 text-white rounded font-semibold"
                                >
                                  Save Edit
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="text-xs sm:text-sm text-slate-900 leading-relaxed font-serif">
                              <span className="font-bold text-slate-900 mr-2 font-sans">Q{q.number}.</span>
                              <span className="whitespace-pre-line">{q.text}</span>
                            </div>
                          )}

                          {/* MCQ Options (If MCQ type) */}
                          {q.options && q.options.length > 0 && (
                            <div className="grid grid-cols-2 gap-2 mt-2.5 ml-5 text-xs font-sans text-slate-800">
                              {q.options.map((opt, idx) => (
                                <div key={idx} className="flex items-center gap-1.5 p-1 rounded hover:bg-slate-100">
                                  <span className="font-semibold">{opt}</span>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Diagram Prompt Space (If applicable) */}
                          {q.hasDiagramPrompt && (
                            <div className="mt-3 ml-5 p-3 border-2 border-dashed border-slate-300 rounded-lg text-center bg-slate-50 font-sans text-xs text-slate-500">
                              {q.diagramText}
                            </div>
                          )}

                        </div>

                        {/* Marks Indicator Right Aligned */}
                        <div className="font-sans text-xs font-bold text-slate-900 whitespace-nowrap pt-0.5">
                          [{q.marks} {q.marks === 1 ? 'Mark' : 'Marks'}]
                        </div>

                      </div>

                      {/* TEACHER ANSWER KEY BLOCK (Visible when viewMode === 'teacher') */}
                      {viewMode === 'teacher' && q.answerKey && (
                        <div className="mt-3 ml-4 p-3 bg-emerald-50/90 dark:bg-emerald-950/40 border-l-4 border-emerald-500 rounded-r-lg text-xs font-sans space-y-1.5 shadow-sm">
                          
                          <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-[11px] uppercase tracking-wider">
                            <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Teacher Solution & Marking Scheme
                          </div>

                          {/* Correct Option if MCQ */}
                          {q.answerKey.correctOption && (
                            <div className="text-emerald-900 dark:text-emerald-200 font-semibold">
                              <span className="text-slate-600">Correct Option: </span>
                              <span className="bg-emerald-200 dark:bg-emerald-800 text-emerald-900 dark:text-emerald-100 px-1.5 py-0.5 rounded font-bold">{q.answerKey.correctOption}</span>
                            </div>
                          )}

                          {/* Step-by-step Solution */}
                          {q.answerKey.solution && (
                            <div className="text-slate-700 dark:text-slate-300 whitespace-pre-line font-mono text-[11px] bg-white/70 dark:bg-slate-900/60 p-2 rounded border border-emerald-200 dark:border-emerald-900">
                              <span className="font-bold text-slate-900 dark:text-slate-100">Solution Steps:</span>
                              <p className="mt-0.5">{q.answerKey.solution}</p>
                            </div>
                          )}

                          {/* Rubric Breakdown */}
                          {q.answerKey.rubric && (
                            <div className="text-emerald-700 dark:text-emerald-300 text-[11px]">
                              <span className="font-bold">Marking Rubric: </span>{q.answerKey.rubric}
                            </div>
                          )}

                        </div>
                      )}

                    </div>
                  );
                })}
              </div>

            </section>
          ))}

        </div>

        {/* 3. EXAM FOOTER */}
        <footer className="mt-16 pt-4 border-t border-slate-300 text-center font-sans text-[11px] text-slate-500 flex justify-between items-center">
          <span>*** END OF EXAMINATION PAPER ***</span>
          <span>Page 1 of 1</span>
        </footer>

      </div>

    </main>
  );
}
