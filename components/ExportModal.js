import React, { useState } from 'react';

export function ExportModal({ isOpen, onClose, header, sections, viewMode }) {
  const [selectedFormat, setSelectedFormat] = useState('pdf');
  const [includeAnswerKey, setIncludeAnswerKey] = useState(viewMode === 'teacher');
  const [isExporting, setIsExporting] = useState(false);

  if (!isOpen) return null;

  // Generate plain text content of the exam
  const generatePlainText = () => {
    let text = `${header.schoolName}\n${header.subHeader}\n`;
    text += `Subject: ${header.subject} | STD: ${header.standard} (${header.division})\n`;
    text += `Date: ${header.date} | Time: ${header.timeAllowed} | Max Marks: ${header.totalMarks}\n`;
    text += `--------------------------------------------------\n\n`;

    if (header.instructions?.length) {
      text += `General Instructions:\n`;
      header.instructions.forEach((inst, i) => {
        text += `${i + 1}. ${inst}\n`;
      });
      text += `\n--------------------------------------------------\n\n`;
    }

    sections.forEach((sec) => {
      text += `${sec.title}\n`;
      if (sec.subtitle) text += `${sec.subtitle}\n`;
      text += `\n`;
      sec.questions.forEach((q) => {
        text += `Q${q.number}. ${q.text} [${q.marks} Marks]\n`;
        if (q.options?.length) {
          q.options.forEach((opt) => {
            text += `   ${opt}\n`;
          });
        }
        if (includeAnswerKey && q.answerKey) {
          text += `   [ANSWER KEY]: ${q.answerKey.correctOption || ''}\n`;
          text += `   [SOLUTION]: ${q.answerKey.solution || ''}\n`;
        }
        text += `\n`;
      });
    });

    return text;
  };

  const handleDownload = () => {
    setIsExporting(true);
    setTimeout(() => {
      const text = generatePlainText();
      let mimeType = 'text/plain';
      let extension = 'txt';

      if (selectedFormat === 'word') {
        mimeType = 'application/msword';
        extension = 'doc';
      }

      if (selectedFormat === 'pdf') {
        window.print();
        setIsExporting(false);
        onClose();
        return;
      }

      const blob = new Blob([text], { type: `${mimeType};charset=utf-8` });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${header.subject || 'Exam'}_Paper_${selectedFormat.toUpperCase()}.${extension}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setIsExporting(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in font-sans">
      <div className="bg-slate-900 text-white rounded-2xl max-w-md w-full border border-slate-800 shadow-2xl overflow-hidden p-6 space-y-5">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-base text-white">Export Exam Paper</h3>
              <p className="text-xs text-slate-400">Download formatted document for print or digital distribution</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Format Selection Grid */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Select Export Format</label>
          <div className="grid grid-cols-3 gap-2.5">
            
            {/* PDF */}
            <button
              onClick={() => setSelectedFormat('pdf')}
              className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                selectedFormat === 'pdf'
                  ? 'bg-blue-600/20 border-blue-500 text-white shadow-md shadow-blue-600/20'
                  : 'bg-slate-800/60 border-slate-750 text-slate-400 hover:bg-slate-800'
              }`}
            >
              <svg className="w-6 h-6 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <span className="text-xs font-bold">PDF Document</span>
            </button>

            {/* Word .docx */}
            <button
              onClick={() => setSelectedFormat('word')}
              className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                selectedFormat === 'word'
                  ? 'bg-blue-600/20 border-blue-500 text-white shadow-md shadow-blue-600/20'
                  : 'bg-slate-800/60 border-slate-750 text-slate-400 hover:bg-slate-800'
              }`}
            >
              <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="text-xs font-bold">MS Word (.docx)</span>
            </button>

            {/* Text .txt */}
            <button
              onClick={() => setSelectedFormat('text')}
              className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                selectedFormat === 'text'
                  ? 'bg-blue-600/20 border-blue-500 text-white shadow-md shadow-blue-600/20'
                  : 'bg-slate-800/60 border-slate-750 text-slate-400 hover:bg-slate-800'
              }`}
            >
              <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="text-xs font-bold">Plain Text (.txt)</span>
            </button>

          </div>
        </div>

        {/* Include Answer Key Toggle */}
        <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-750 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs">
            <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="font-semibold text-slate-200">Include Teacher Answer Key</p>
              <p className="text-[10px] text-slate-400">Append solutions and marking schemes at the end</p>
            </div>
          </div>
          <input
            type="checkbox"
            checked={includeAnswerKey}
            onChange={(e) => setIncludeAnswerKey(e.target.checked)}
            className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-750 text-slate-300 font-semibold text-xs transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleDownload}
            disabled={isExporting}
            className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 border border-blue-400/30 transition-all flex items-center justify-center gap-2"
          >
            {isExporting ? (
              <span>Preparing File...</span>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>Download {selectedFormat.toUpperCase()}</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
