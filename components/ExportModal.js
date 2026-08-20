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

  const generateWordHtml = () => {
    let html = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
    <head><meta charset="utf-8"><title>${header.subject || 'Examination Paper'}</title>
    <style>
      body { font-family: 'Calibri', 'Arial', sans-serif; font-size: 11pt; color: #111; margin: 20px; }
      h1 { font-size: 16pt; font-weight: bold; text-align: center; text-transform: uppercase; margin-bottom: 2px; }
      h2 { font-size: 12pt; font-weight: bold; text-align: center; text-transform: uppercase; color: #444; margin-top: 0; }
      .header-table { width: 100%; border-bottom: 2px solid #111; margin-bottom: 15px; padding-bottom: 5px; }
      .header-table td { font-size: 10pt; font-weight: bold; }
      .instructions { background: #f8f9fa; padding: 10px; border: 1px solid #ddd; font-size: 10pt; margin-bottom: 20px; }
      .section-title { font-size: 12pt; font-weight: bold; text-transform: uppercase; border-bottom: 1px solid #666; margin-top: 20px; padding-bottom: 3px; }
      .question { margin-bottom: 15px; page-break-inside: avoid; }
      .question-title { font-weight: bold; font-size: 11pt; }
      .options { margin-left: 20px; margin-top: 5px; list-style-type: none; }
      .answer-key { background: #e6f4ea; border-left: 4px solid #34a853; padding: 8px; font-size: 10pt; margin-top: 8px; }
    </style></head><body>`;

    html += `<h1>${header.schoolName || ''}</h1>`;
    html += `<h2>${header.subHeader || ''}</h2>`;
    html += `<table class="header-table"><tr>`;
    html += `<td>SUBJECT: ${header.subject || ''}<br>CLASS: ${header.standard || ''} (${header.division || ''})</td>`;
    html += `<td style="text-align:right;">DATE: ${header.date || ''}<br>TIME: ${header.timeAllowed || ''} | MARKS: ${header.totalMarks || ''}</td>`;
    html += `</tr></table>`;

    if (header.instructions?.length) {
      html += `<div class="instructions"><b>GENERAL INSTRUCTIONS:</b><ol>`;
      header.instructions.forEach(inst => html += `<li>${inst}</li>`);
      html += `</ol></div>`;
    }

    sections.forEach(sec => {
      html += `<div class="section-title">${sec.title} (${sec.questions.length * sec.marksPerQuestion} Marks)</div>`;
      if (sec.subtitle) html += `<p style="font-style:italic; font-size:10pt; color:#555;">${sec.subtitle}</p>`;
      sec.questions.forEach(q => {
        html += `<div class="question"><p class="question-title">Q${q.number}. ${q.text} <span style="float:right;">[${q.marks} Mark${q.marks > 1 ? 's' : ''}]</span></p>`;
        if (q.options?.length) {
          html += `<ul class="options">`;
          q.options.forEach(opt => html += `<li>${opt}</li>`);
          html += `</ul>`;
        }
        if (includeAnswerKey && q.answerKey) {
          html += `<div class="answer-key"><b>Correct Option:</b> ${q.answerKey.correctOption || 'N/A'}<br><b>Solution:</b> ${q.answerKey.solution || ''}</div>`;
        }
        html += `</div>`;
      });
    });

    html += `</body></html>`;
    return html;
  };

  const handleDownload = () => {
    setIsExporting(true);

    if (selectedFormat === 'pdf') {
      setIsExporting(false);
      onClose();
      setTimeout(() => {
        window.print();
      }, 250);
      return;
    }

    setTimeout(() => {
      let content = '';
      let mimeType = 'text/plain';
      let extension = 'txt';

      if (selectedFormat === 'word') {
        content = generateWordHtml();
        mimeType = 'application/msword';
        extension = 'doc';
      } else {
        content = generatePlainText();
        mimeType = 'text/plain';
        extension = 'txt';
      }

      const blob = new Blob([content], { type: `${mimeType};charset=utf-8` });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const cleanSubject = (header.subject || 'Exam').replace(/[^a-zA-Z0-9_-]/g, '_');
      link.download = `${cleanSubject}_Paper.${extension}`;
      document.body.appendChild(link);
      link.click();
      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, 100);

      setIsExporting(false);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in font-sans no-print" role="dialog">
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
