# 📄 ExamCraft AI - Smart Assessment & Exam Paper Generator

ExamCraft AI is a modern, clean, and highly interactive web application designed for teachers and educators to create, customize, and preview AI-generated exam papers with live A4 document rendering and step-by-step teacher answer keys.

---

## ✨ Features

- 🛠️ **Split-Screen Workspace**: Left Panel for controls & inputs, Right Panel for live physical A4 document preview.
- 🏫 **Header Customization**: Live inputs for School Name, Subtitle/Term, Standard (STD), Division, Subject, Date, Total Marks, Time Allowed, and custom General Instructions.
- 📁 **Syllabus & Reference Context Upload**: Visually distinct drag-and-drop zone supporting Syllabus PDFs, Textbook Photos, and Web Links.
- 📊 **Cognitive Difficulty Weighting**: Interactive percentage sliders for Easy (Section A), Medium (Section B), and Hard (Section C) questions with auto-balancing logic and a visual stacked progress bar.
- ⚡ **AI Generator Button**: Primary action button with glowing gradient, spinner, and progress status indicator.
- 📄 **Physical A4 Document Canvas**: Realistic white paper rendering (`210mm x 297mm`) with drop shadow (`shadow-2xl`), page margins, draft watermark, and zoom toolbar (65% – 135%).
- 🔄 **Inline Question Regeneration**: Subtle **Refresh/Swap** icon button next to each question to swap variants from the item bank with rotation animations.
- ✍️ **Inline Question Editing**: Click the edit icon on any question to modify question text or marks inline on the paper.
- 🔑 **Student Paper vs. Teacher Answer Key Toggle**: Instantly reveal highlighted emerald/indigo containers under each question displaying correct options, step-by-step solutions, and marking rubrics!
- 📥 **Export Options**: Export to PDF (browser print view), MS Word (.docx), Plain Text (.txt), and direct Print (`window.print()`) with print styles (`@media print`).

---



## 📂 Project Structure

```
PROTOFACE/
├── index.html            # Main web entry point (Tailwind, React 18, Babel ESM)
├── styles.css            # Custom A4 paper styles, scrollbars, print layout
├── app.js                ![](image.png)# React App state manager & toast notifications
├── .nojekyll             # Prevents GitHub Pages Jekyll build filtering
├── components/
│   ├── Navbar.js         # Top Header with Student/Teacher Answer Key toggle & export
│   ├── ControlsPanel.js  # Left form controls, syllabus dropzone, difficulty sliders
│   ├── A4PreviewPanel.js # Right A4 document preview panel & inline question swap
│   └── ExportModal.js    # Modal for PDF, Word, Text, Print exports
└── data/
    └── mockData.js       # Presets, question bank, solutions & rubrics
```