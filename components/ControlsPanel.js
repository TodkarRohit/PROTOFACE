import React, { useState } from 'react';

export function ControlsPanel({
  header,
  onUpdateHeader,
  difficulty,
  onUpdateDifficulty,
  sources,
  onAddSource,
  onRemoveSource,
  onGeneratePaper,
  isGenerating,
  generationProgress
}) {
  const [activeTab, setActiveTab] = useState('upload'); // 'upload' | 'link'
  const [urlInput, setUrlInput] = useState('');
  const [newInstruction, setNewInstruction] = useState('');
  const [dragActive, setDragActive] = useState(false);

  // Handle Drag & Drop
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const isPdf = file.type.includes('pdf');
      onAddSource({
        id: Date.now().toString(),
        name: file.name,
        type: isPdf ? 'pdf' : 'image',
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        status: 'Uploaded & Indexed'
      });
    }
  };

  // Handle URL Add
  const handleAddUrl = (e) => {
    e.preventDefault();
    if (!urlInput.trim()) return;
    onAddSource({
      id: Date.now().toString(),
      name: urlInput.trim(),
      type: 'link',
      size: 'Web Source',
      status: 'Indexed'
    });
    setUrlInput('');
  };

  // Add Instruction
  const handleAddInstruction = (e) => {
    e.preventDefault();
    if (!newInstruction.trim()) return;
    onUpdateHeader('instructions', [...header.instructions, newInstruction.trim()]);
    setNewInstruction('');
  };

  // Remove Instruction
  const handleRemoveInstruction = (index) => {
    const updated = header.instructions.filter((_, i) => i !== index);
    onUpdateHeader('instructions', updated);
  };

  // Handle Slider Change with Auto-Balancing
  const handleSliderChange = (key, val) => {
    const newValue = parseInt(val, 10);
    const diff = newValue - difficulty[key];
    const otherKeys = ['easy', 'medium', 'hard'].filter(k => k !== key);
    
    // Distribute change across other sliders
    const otherTotal = difficulty[otherKeys[0]] + difficulty[otherKeys[1]];
    let newDiff = { ...difficulty, [key]: newValue };
    
    if (otherTotal > 0) {
      const ratio0 = difficulty[otherKeys[0]] / otherTotal;
      const ratio1 = difficulty[otherKeys[1]] / otherTotal;
      newDiff[otherKeys[0]] = Math.max(0, Math.round(difficulty[otherKeys[0]] - diff * ratio0));
      newDiff[otherKeys[1]] = Math.max(0, 100 - newDiff[key] - newDiff[otherKeys[0]]);
    } else {
      newDiff[otherKeys[0]] = Math.max(0, Math.round((100 - newValue) / 2));
      newDiff[otherKeys[1]] = 100 - newValue - newDiff[otherKeys[0]];
    }

    onUpdateDifficulty(newDiff);
  };

  return (
    <aside className="w-full lg:w-[480px] xl:w-[520px] bg-slate-900 text-slate-100 p-5 overflow-y-auto border-r border-slate-800 flex flex-col gap-6 shadow-xl">
      
      {/* Panel Header */}
      <div className="border-b border-slate-800 pb-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
            Paper Setup & AI Controls
          </h2>
          <span className="text-[11px] bg-blue-900/60 text-blue-300 font-semibold px-2 py-0.5 rounded border border-blue-700/50">
            Step 1 of 2
          </span>
        </div>
        <p className="text-xs text-slate-400 mt-1">Configure exam parameters, syllabus context, and cognitive difficulty weighting.</p>
      </div>

      {/* 1. Header Information Form */}
      <div className="bg-slate-850 bg-slate-800/50 p-4 rounded-xl border border-slate-800/80 space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 uppercase tracking-wider">
          <svg className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          Exam Header & Metadata
        </div>

        <div className="space-y-3">
          {/* School Name */}
          <div>
            <label className="block text-[11px] font-medium text-slate-400 mb-1">School / Institution Name</label>
            <input
              type="text"
              value={header.schoolName}
              onChange={(e) => onUpdateHeader('schoolName', e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. St. Xavier's High School"
            />
          </div>

          {/* Exam Subtitle / Term */}
          <div>
            <label className="block text-[11px] font-medium text-slate-400 mb-1">Exam Subtitle / Term</label>
            <input
              type="text"
              value={header.subHeader}
              onChange={(e) => onUpdateHeader('subHeader', e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. FIRST TERM EXAMINATION - 2026-27"
            />
          </div>

          {/* Grid for STD, Division, Subject */}
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-[11px] font-medium text-slate-400 mb-1">Standard (STD)</label>
              <input
                type="text"
                value={header.standard}
                onChange={(e) => onUpdateHeader('standard', e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="STD X"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-slate-400 mb-1">Division</label>
              <input
                type="text"
                value={header.division}
                onChange={(e) => onUpdateHeader('division', e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Div A & B"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-slate-400 mb-1">Subject</label>
              <input
                type="text"
                value={header.subject}
                onChange={(e) => onUpdateHeader('subject', e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Physics"
              />
            </div>
          </div>

          {/* Grid for Date, Total Marks, Time Allowed */}
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-[11px] font-medium text-slate-400 mb-1">Date</label>
              <input
                type="date"
                value={header.date}
                onChange={(e) => onUpdateHeader('date', e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-slate-400 mb-1">Total Marks</label>
              <input
                type="number"
                value={header.totalMarks}
                onChange={(e) => onUpdateHeader('totalMarks', parseInt(e.target.value) || 0)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-slate-400 mb-1">Time Allowed</label>
              <input
                type="text"
                value={header.timeAllowed}
                onChange={(e) => onUpdateHeader('timeAllowed', e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="2 Hours"
              />
            </div>
          </div>

          {/* Editable General Instructions */}
          <div>
            <label className="block text-[11px] font-medium text-slate-400 mb-1">General Instructions for Students</label>
            <div className="space-y-1.5 mb-2">
              {header.instructions.map((inst, idx) => (
                <div key={idx} className="flex items-center justify-between bg-slate-900/80 px-2.5 py-1 rounded text-xs text-slate-300 border border-slate-750">
                  <span className="truncate flex-1 font-mono text-[11px]">{idx + 1}. {inst}</span>
                  <button
                    onClick={() => handleRemoveInstruction(idx)}
                    className="text-slate-500 hover:text-rose-400 ml-2 p-0.5"
                    title="Delete instruction"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
            <form onSubmit={handleAddInstruction} className="flex gap-1.5">
              <input
                type="text"
                value={newInstruction}
                onChange={(e) => setNewInstruction(e.target.value)}
                placeholder="Add custom instruction..."
                className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs px-2.5 py-1 rounded-lg font-medium transition-colors"
              >
                + Add
              </button>
            </form>
          </div>

        </div>
      </div>

      {/* 2. Upload Syllabus & Context Section */}
      <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-800/80 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 uppercase tracking-wider">
            <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            Syllabus & Reference Context
          </div>
          <div className="flex text-[11px] font-medium bg-slate-900 p-0.5 rounded-lg border border-slate-700">
            <button
              onClick={() => setActiveTab('upload')}
              className={`px-2 py-0.5 rounded ${activeTab === 'upload' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}
            >
              Upload Files
            </button>
            <button
              onClick={() => setActiveTab('link')}
              className={`px-2 py-0.5 rounded ${activeTab === 'link' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}
            >
              Paste Link
            </button>
          </div>
        </div>

        {activeTab === 'upload' ? (
          /* Drag and Drop Zone */
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-4 text-center transition-all cursor-pointer ${
              dragActive
                ? 'border-blue-400 bg-blue-950/40 shadow-inner'
                : 'border-slate-700 hover:border-slate-500 bg-slate-900/60'
            }`}
          >
            <div className="flex justify-center gap-3 text-slate-400 mb-2">
              {/* Document PDF Icon */}
              <div className="p-2 rounded-lg bg-slate-800 text-red-400 border border-slate-700" title="PDF Document">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              {/* Image Icon */}
              <div className="p-2 rounded-lg bg-slate-800 text-emerald-400 border border-slate-700" title="Textbook Photo">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              {/* Link Icon */}
              <div className="p-2 rounded-lg bg-slate-800 text-blue-400 border border-slate-700" title="Web Link">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
            </div>
            <p className="text-xs font-semibold text-slate-200">
              Drag & Drop Syllabus PDF, Textbook Photo, or Question Bank
            </p>
            <p className="text-[11px] text-slate-400 mt-1">
              Supports .pdf, .jpg, .png (Max 25MB per file)
            </p>
            <label className="mt-3 inline-block bg-blue-600/30 hover:bg-blue-600/50 text-blue-300 text-xs font-semibold px-3 py-1.5 rounded-lg border border-blue-500/40 cursor-pointer transition-colors">
              Browse Files
              <input
                type="file"
                className="hidden"
                accept=".pdf,image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    const f = e.target.files[0];
                    onAddSource({
                      id: Date.now().toString(),
                      name: f.name,
                      type: f.type.includes('pdf') ? 'pdf' : 'image',
                      size: `${(f.size / (1024 * 1024)).toFixed(1)} MB`,
                      status: 'Uploaded & Parsed'
                    });
                  }
                }}
              />
            </label>
          </div>
        ) : (
          /* Web Link Input Form */
          <form onSubmit={handleAddUrl} className="space-y-2">
            <label className="block text-[11px] text-slate-400">Paste Educational Web Link / Online Syllabus</label>
            <div className="flex gap-2">
              <input
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://khanacademy.org/physics/ch3..."
                className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
              >
                Index Link
              </button>
            </div>
          </form>
        )}

        {/* Uploaded Context Pill List */}
        <div className="space-y-1.5">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Active Reference Sources ({sources.length}):</div>
          {sources.map((src) => (
            <div key={src.id} className="flex items-center justify-between bg-slate-900/90 px-3 py-2 rounded-lg border border-slate-750 text-xs">
              <div className="flex items-center gap-2 overflow-hidden">
                {src.type === 'pdf' && (
                  <svg className="w-4 h-4 text-red-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                )}
                {src.type === 'image' && (
                  <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                )}
                {src.type === 'link' && (
                  <svg className="w-4 h-4 text-blue-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                )}
                <div className="truncate">
                  <p className="font-medium text-slate-200 truncate">{src.name}</p>
                  <p className="text-[10px] text-slate-500">{src.size} • <span className="text-emerald-400 font-medium">{src.status}</span></p>
                </div>
              </div>
              <button
                onClick={() => onRemoveSource(src.id)}
                className="text-slate-500 hover:text-rose-400 p-1 transition-colors"
                title="Remove source"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          ))}
        </div>

      </div>

      {/* 3. Difficulty Controls & Cognitive Weighting */}
      <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-800/80 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 uppercase tracking-wider">
            <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z" />
            </svg>
            Cognitive Difficulty Weighting
          </div>
          <span className="text-xs font-mono font-bold text-indigo-300 bg-indigo-950/80 border border-indigo-700/50 px-2 py-0.5 rounded">
            Total: 100%
          </span>
        </div>

        {/* Stacked Proportional Progress Bar */}
        <div className="space-y-1">
          <div className="h-3 w-full bg-slate-900 rounded-full overflow-hidden flex p-0.5 border border-slate-750">
            <div
              style={{ width: `${difficulty.easy}%` }}
              className="bg-emerald-500 h-full rounded-l transition-all duration-300"
              title={`Easy: ${difficulty.easy}%`}
            />
            <div
              style={{ width: `${difficulty.medium}%` }}
              className="bg-amber-500 h-full transition-all duration-300"
              title={`Medium: ${difficulty.medium}%`}
            />
            <div
              style={{ width: `${difficulty.hard}%` }}
              className="bg-rose-500 h-full rounded-r transition-all duration-300"
              title={`Hard: ${difficulty.hard}%`}
            />
          </div>
          <div className="flex justify-between text-[10px] text-slate-400 font-medium px-1">
            <span className="text-emerald-400">Easy ({difficulty.easy}%)</span>
            <span className="text-amber-400">Medium ({difficulty.medium}%)</span>
            <span className="text-rose-400">Hard ({difficulty.hard}%)</span>
          </div>
        </div>

        {/* Sliders */}
        <div className="space-y-3 pt-1">
          
          {/* Easy Slider */}
          <div>
            <div className="flex justify-between text-xs mb-1 font-medium">
              <span className="text-emerald-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                Section A: Easy Questions (MCQs / Basic)
              </span>
              <span className="font-bold text-emerald-400 font-mono">{difficulty.easy}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={difficulty.easy}
              onChange={(e) => handleSliderChange('easy', e.target.value)}
              className="w-full h-1.5 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>

          {/* Medium Slider */}
          <div>
            <div className="flex justify-between text-xs mb-1 font-medium">
              <span className="text-amber-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                Section B: Medium (Short Answers / Conceptual)
              </span>
              <span className="font-bold text-amber-400 font-mono">{difficulty.medium}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={difficulty.medium}
              onChange={(e) => handleSliderChange('medium', e.target.value)}
              className="w-full h-1.5 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
          </div>

          {/* Hard Slider */}
          <div>
            <div className="flex justify-between text-xs mb-1 font-medium">
              <span className="text-rose-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                Section C: Hard (Numericals & Derivations)
              </span>
              <span className="font-bold text-rose-400 font-mono">{difficulty.hard}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={difficulty.hard}
              onChange={(e) => handleSliderChange('hard', e.target.value)}
              className="w-full h-1.5 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-rose-500"
            />
          </div>

        </div>
      </div>

      {/* 4. Primary Action Button */}
      <div className="mt-auto pt-2 space-y-2">
        <button
          onClick={onGeneratePaper}
          disabled={isGenerating}
          className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm text-white shadow-xl transition-all duration-300 flex items-center justify-center gap-2 transform active:scale-98 ${
            isGenerating
              ? 'bg-slate-800 cursor-not-allowed border border-slate-700 text-slate-400'
              : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 shadow-blue-600/30 border border-blue-400/30 hover:shadow-indigo-500/40'
          }`}
        >
          {isGenerating ? (
            <>
              {/* Spinner */}
              <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>{generationProgress || 'Synthesizing Exam Paper...'}</span>
            </>
          ) : (
            <>
              {/* AI Sparkles Icon */}
              <svg className="w-5 h-5 text-amber-300 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Generate AI Exam Paper</span>
            </>
          )}
        </button>
        <p className="text-[10px] text-center text-slate-500 font-medium">
          Powered by Gemini 3.6 AI • Aligned with Bloom's Taxonomy Guidelines
        </p>
      </div>

    </aside>
  );
}
