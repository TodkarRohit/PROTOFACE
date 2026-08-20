var AppBundle = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // app.js
  var app_exports = {};
  __export(app_exports, {
    default: () => App
  });
  var import_react5 = __toESM(__require("react"));

  // components/Navbar.js
  var import_react = __toESM(__require("react"));
  function Navbar({
    viewMode,
    setViewMode,
    presetExams,
    activePresetId,
    onSelectPreset,
    onOpenExportModal,
    onQuickPrint
  }) {
    return /* @__PURE__ */ import_react.default.createElement("header", { className: "sticky top-0 z-30 bg-slate-900 border-b border-slate-800 text-white shadow-lg" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-600 flex items-center justify-center shadow-md shadow-blue-500/20" }, /* @__PURE__ */ import_react.default.createElement("svg", { className: "w-6 h-6 text-white", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /* @__PURE__ */ import_react.default.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" }))), /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ import_react.default.createElement("h1", { className: "font-bold text-lg leading-tight tracking-tight text-white" }, "ExamCraft AI"), /* @__PURE__ */ import_react.default.createElement("span", { className: "px-2 py-0.5 text-[10px] font-semibold bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full uppercase tracking-wider" }, "Pro v2.4")), /* @__PURE__ */ import_react.default.createElement("p", { className: "text-xs text-slate-400 font-medium" }, "Smart Assessment & Paper Generator for Educators"))), /* @__PURE__ */ import_react.default.createElement("div", { className: "hidden md:flex items-center gap-2 bg-slate-800/80 p-1.5 rounded-lg border border-slate-700/60" }, /* @__PURE__ */ import_react.default.createElement("svg", { className: "w-4 h-4 text-indigo-400 ml-2", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /* @__PURE__ */ import_react.default.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" })), /* @__PURE__ */ import_react.default.createElement("span", { className: "text-xs font-semibold text-slate-300" }, "Preset Template:"), /* @__PURE__ */ import_react.default.createElement(
      "select",
      {
        value: activePresetId,
        onChange: (e) => onSelectPreset(e.target.value),
        className: "bg-slate-900 text-xs text-white border border-slate-700 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium cursor-pointer"
      },
      presetExams.map((preset) => /* @__PURE__ */ import_react.default.createElement("option", { key: preset.id, value: preset.id }, preset.name))
    )), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center bg-slate-800 p-1 rounded-xl border border-slate-700" }, /* @__PURE__ */ import_react.default.createElement(
      "button",
      {
        onClick: () => setViewMode("student"),
        className: `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${viewMode === "student" ? "bg-blue-600 text-white shadow-md shadow-blue-600/30" : "text-slate-400 hover:text-white"}`
      },
      /* @__PURE__ */ import_react.default.createElement("svg", { className: "w-3.5 h-3.5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /* @__PURE__ */ import_react.default.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 14l9-5-9-5-9 5 9 5z" }), /* @__PURE__ */ import_react.default.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" })),
      "Student Paper"
    ), /* @__PURE__ */ import_react.default.createElement(
      "button",
      {
        onClick: () => setViewMode("teacher"),
        className: `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${viewMode === "teacher" ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30" : "text-slate-400 hover:text-white"}`
      },
      /* @__PURE__ */ import_react.default.createElement("svg", { className: "w-3.5 h-3.5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /* @__PURE__ */ import_react.default.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" })),
      "Teacher Answer Key"
    )), /* @__PURE__ */ import_react.default.createElement(
      "button",
      {
        onClick: onQuickPrint,
        title: "Print A4 Paper",
        className: "hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700 transition-colors"
      },
      /* @__PURE__ */ import_react.default.createElement("svg", { className: "w-4 h-4 text-slate-300", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /* @__PURE__ */ import_react.default.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" })),
      "Print"
    ), /* @__PURE__ */ import_react.default.createElement(
      "button",
      {
        onClick: onOpenExportModal,
        className: "flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-500 hover:to-indigo-500 shadow-md shadow-blue-600/20 border border-blue-500/40 transition-all transform active:scale-95"
      },
      /* @__PURE__ */ import_react.default.createElement("svg", { className: "w-4 h-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /* @__PURE__ */ import_react.default.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" })),
      "Export Document"
    ))));
  }

  // components/ControlsPanel.js
  var import_react2 = __toESM(__require("react"));
  function ControlsPanel({
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
    const [activeTab, setActiveTab] = (0, import_react2.useState)("upload");
    const [urlInput, setUrlInput] = (0, import_react2.useState)("");
    const [newInstruction, setNewInstruction] = (0, import_react2.useState)("");
    const [dragActive, setDragActive] = (0, import_react2.useState)(false);
    const handleDrag = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.type === "dragenter" || e.type === "dragover") {
        setDragActive(true);
      } else if (e.type === "dragleave") {
        setDragActive(false);
      }
    };
    const handleDrop = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        const file = e.dataTransfer.files[0];
        const isPdf = file.type.includes("pdf");
        onAddSource({
          id: Date.now().toString(),
          name: file.name,
          type: isPdf ? "pdf" : "image",
          size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
          status: "Uploaded & Indexed"
        });
      }
    };
    const handleAddUrl = (e) => {
      e.preventDefault();
      if (!urlInput.trim()) return;
      onAddSource({
        id: Date.now().toString(),
        name: urlInput.trim(),
        type: "link",
        size: "Web Source",
        status: "Indexed"
      });
      setUrlInput("");
    };
    const handleAddInstruction = (e) => {
      e.preventDefault();
      if (!newInstruction.trim()) return;
      onUpdateHeader("instructions", [...header.instructions, newInstruction.trim()]);
      setNewInstruction("");
    };
    const handleRemoveInstruction = (index) => {
      const updated = header.instructions.filter((_, i) => i !== index);
      onUpdateHeader("instructions", updated);
    };
    const handleSliderChange = (key, val) => {
      const newValue = parseInt(val, 10);
      const diff = newValue - difficulty[key];
      const otherKeys = ["easy", "medium", "hard"].filter((k) => k !== key);
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
    return /* @__PURE__ */ import_react2.default.createElement("aside", { className: "w-full lg:w-[480px] xl:w-[520px] bg-slate-900 text-slate-100 p-5 overflow-y-auto border-r border-slate-800 flex flex-col gap-6 shadow-xl" }, /* @__PURE__ */ import_react2.default.createElement("div", { className: "border-b border-slate-800 pb-4" }, /* @__PURE__ */ import_react2.default.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ import_react2.default.createElement("h2", { className: "text-base font-bold text-white flex items-center gap-2" }, /* @__PURE__ */ import_react2.default.createElement("svg", { className: "w-5 h-5 text-blue-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /* @__PURE__ */ import_react2.default.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" })), "Paper Setup & AI Controls"), /* @__PURE__ */ import_react2.default.createElement("span", { className: "text-[11px] bg-blue-900/60 text-blue-300 font-semibold px-2 py-0.5 rounded border border-blue-700/50" }, "Step 1 of 2")), /* @__PURE__ */ import_react2.default.createElement("p", { className: "text-xs text-slate-400 mt-1" }, "Configure exam parameters, syllabus context, and cognitive difficulty weighting.")), /* @__PURE__ */ import_react2.default.createElement("div", { className: "bg-slate-850 bg-slate-800/50 p-4 rounded-xl border border-slate-800/80 space-y-4" }, /* @__PURE__ */ import_react2.default.createElement("div", { className: "flex items-center gap-2 text-xs font-semibold text-slate-300 uppercase tracking-wider" }, /* @__PURE__ */ import_react2.default.createElement("svg", { className: "w-4 h-4 text-indigo-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /* @__PURE__ */ import_react2.default.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" })), "Exam Header & Metadata"), /* @__PURE__ */ import_react2.default.createElement("div", { className: "space-y-3" }, /* @__PURE__ */ import_react2.default.createElement("div", null, /* @__PURE__ */ import_react2.default.createElement("label", { className: "block text-[11px] font-medium text-slate-400 mb-1" }, "School / Institution Name"), /* @__PURE__ */ import_react2.default.createElement(
      "input",
      {
        type: "text",
        value: header.schoolName,
        onChange: (e) => onUpdateHeader("schoolName", e.target.value),
        className: "w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500",
        placeholder: "e.g. St. Xavier's High School"
      }
    )), /* @__PURE__ */ import_react2.default.createElement("div", null, /* @__PURE__ */ import_react2.default.createElement("label", { className: "block text-[11px] font-medium text-slate-400 mb-1" }, "Exam Subtitle / Term"), /* @__PURE__ */ import_react2.default.createElement(
      "input",
      {
        type: "text",
        value: header.subHeader,
        onChange: (e) => onUpdateHeader("subHeader", e.target.value),
        className: "w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500",
        placeholder: "e.g. FIRST TERM EXAMINATION - 2026-27"
      }
    )), /* @__PURE__ */ import_react2.default.createElement("div", { className: "grid grid-cols-3 gap-2" }, /* @__PURE__ */ import_react2.default.createElement("div", null, /* @__PURE__ */ import_react2.default.createElement("label", { className: "block text-[11px] font-medium text-slate-400 mb-1" }, "Standard (STD)"), /* @__PURE__ */ import_react2.default.createElement(
      "input",
      {
        type: "text",
        value: header.standard,
        onChange: (e) => onUpdateHeader("standard", e.target.value),
        className: "w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500",
        placeholder: "STD X"
      }
    )), /* @__PURE__ */ import_react2.default.createElement("div", null, /* @__PURE__ */ import_react2.default.createElement("label", { className: "block text-[11px] font-medium text-slate-400 mb-1" }, "Division"), /* @__PURE__ */ import_react2.default.createElement(
      "input",
      {
        type: "text",
        value: header.division,
        onChange: (e) => onUpdateHeader("division", e.target.value),
        className: "w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500",
        placeholder: "Div A & B"
      }
    )), /* @__PURE__ */ import_react2.default.createElement("div", null, /* @__PURE__ */ import_react2.default.createElement("label", { className: "block text-[11px] font-medium text-slate-400 mb-1" }, "Subject"), /* @__PURE__ */ import_react2.default.createElement(
      "input",
      {
        type: "text",
        value: header.subject,
        onChange: (e) => onUpdateHeader("subject", e.target.value),
        className: "w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500",
        placeholder: "Physics"
      }
    ))), /* @__PURE__ */ import_react2.default.createElement("div", { className: "grid grid-cols-3 gap-2" }, /* @__PURE__ */ import_react2.default.createElement("div", null, /* @__PURE__ */ import_react2.default.createElement("label", { className: "block text-[11px] font-medium text-slate-400 mb-1" }, "Date"), /* @__PURE__ */ import_react2.default.createElement(
      "input",
      {
        type: "date",
        value: header.date,
        onChange: (e) => onUpdateHeader("date", e.target.value),
        className: "w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      }
    )), /* @__PURE__ */ import_react2.default.createElement("div", null, /* @__PURE__ */ import_react2.default.createElement("label", { className: "block text-[11px] font-medium text-slate-400 mb-1" }, "Total Marks"), /* @__PURE__ */ import_react2.default.createElement(
      "input",
      {
        type: "number",
        value: header.totalMarks,
        onChange: (e) => onUpdateHeader("totalMarks", parseInt(e.target.value) || 0),
        className: "w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      }
    )), /* @__PURE__ */ import_react2.default.createElement("div", null, /* @__PURE__ */ import_react2.default.createElement("label", { className: "block text-[11px] font-medium text-slate-400 mb-1" }, "Time Allowed"), /* @__PURE__ */ import_react2.default.createElement(
      "input",
      {
        type: "text",
        value: header.timeAllowed,
        onChange: (e) => onUpdateHeader("timeAllowed", e.target.value),
        className: "w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500",
        placeholder: "2 Hours"
      }
    ))), /* @__PURE__ */ import_react2.default.createElement("div", null, /* @__PURE__ */ import_react2.default.createElement("label", { className: "block text-[11px] font-medium text-slate-400 mb-1" }, "General Instructions for Students"), /* @__PURE__ */ import_react2.default.createElement("div", { className: "space-y-1.5 mb-2" }, header.instructions.map((inst, idx) => /* @__PURE__ */ import_react2.default.createElement("div", { key: idx, className: "flex items-center justify-between bg-slate-900/80 px-2.5 py-1 rounded text-xs text-slate-300 border border-slate-750" }, /* @__PURE__ */ import_react2.default.createElement("span", { className: "truncate flex-1 font-mono text-[11px]" }, idx + 1, ". ", inst), /* @__PURE__ */ import_react2.default.createElement(
      "button",
      {
        onClick: () => handleRemoveInstruction(idx),
        className: "text-slate-500 hover:text-rose-400 ml-2 p-0.5",
        title: "Delete instruction"
      },
      /* @__PURE__ */ import_react2.default.createElement("svg", { className: "w-3.5 h-3.5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /* @__PURE__ */ import_react2.default.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M6 18L18 6M6 6l12 12" }))
    )))), /* @__PURE__ */ import_react2.default.createElement("form", { onSubmit: handleAddInstruction, className: "flex gap-1.5" }, /* @__PURE__ */ import_react2.default.createElement(
      "input",
      {
        type: "text",
        value: newInstruction,
        onChange: (e) => setNewInstruction(e.target.value),
        placeholder: "Add custom instruction...",
        className: "flex-1 bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      }
    ), /* @__PURE__ */ import_react2.default.createElement(
      "button",
      {
        type: "submit",
        className: "bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs px-2.5 py-1 rounded-lg font-medium transition-colors"
      },
      "+ Add"
    ))))), /* @__PURE__ */ import_react2.default.createElement("div", { className: "bg-slate-800/50 p-4 rounded-xl border border-slate-800/80 space-y-4" }, /* @__PURE__ */ import_react2.default.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ import_react2.default.createElement("div", { className: "flex items-center gap-2 text-xs font-semibold text-slate-300 uppercase tracking-wider" }, /* @__PURE__ */ import_react2.default.createElement("svg", { className: "w-4 h-4 text-blue-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /* @__PURE__ */ import_react2.default.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" })), "Syllabus & Reference Context"), /* @__PURE__ */ import_react2.default.createElement("div", { className: "flex text-[11px] font-medium bg-slate-900 p-0.5 rounded-lg border border-slate-700" }, /* @__PURE__ */ import_react2.default.createElement(
      "button",
      {
        onClick: () => setActiveTab("upload"),
        className: `px-2 py-0.5 rounded ${activeTab === "upload" ? "bg-blue-600 text-white" : "text-slate-400"}`
      },
      "Upload Files"
    ), /* @__PURE__ */ import_react2.default.createElement(
      "button",
      {
        onClick: () => setActiveTab("link"),
        className: `px-2 py-0.5 rounded ${activeTab === "link" ? "bg-blue-600 text-white" : "text-slate-400"}`
      },
      "Paste Link"
    ))), activeTab === "upload" ? (
      /* Drag and Drop Zone */
      /* @__PURE__ */ import_react2.default.createElement(
        "div",
        {
          onDragEnter: handleDrag,
          onDragLeave: handleDrag,
          onDragOver: handleDrag,
          onDrop: handleDrop,
          className: `border-2 border-dashed rounded-xl p-4 text-center transition-all cursor-pointer ${dragActive ? "border-blue-400 bg-blue-950/40 shadow-inner" : "border-slate-700 hover:border-slate-500 bg-slate-900/60"}`
        },
        /* @__PURE__ */ import_react2.default.createElement("div", { className: "flex justify-center gap-3 text-slate-400 mb-2" }, /* @__PURE__ */ import_react2.default.createElement("div", { className: "p-2 rounded-lg bg-slate-800 text-red-400 border border-slate-700", title: "PDF Document" }, /* @__PURE__ */ import_react2.default.createElement("svg", { className: "w-5 h-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /* @__PURE__ */ import_react2.default.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" }))), /* @__PURE__ */ import_react2.default.createElement("div", { className: "p-2 rounded-lg bg-slate-800 text-emerald-400 border border-slate-700", title: "Textbook Photo" }, /* @__PURE__ */ import_react2.default.createElement("svg", { className: "w-5 h-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /* @__PURE__ */ import_react2.default.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" }))), /* @__PURE__ */ import_react2.default.createElement("div", { className: "p-2 rounded-lg bg-slate-800 text-blue-400 border border-slate-700", title: "Web Link" }, /* @__PURE__ */ import_react2.default.createElement("svg", { className: "w-5 h-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /* @__PURE__ */ import_react2.default.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" })))),
        /* @__PURE__ */ import_react2.default.createElement("p", { className: "text-xs font-semibold text-slate-200" }, "Drag & Drop Syllabus PDF, Textbook Photo, or Question Bank"),
        /* @__PURE__ */ import_react2.default.createElement("p", { className: "text-[11px] text-slate-400 mt-1" }, "Supports .pdf, .jpg, .png (Max 25MB per file)"),
        /* @__PURE__ */ import_react2.default.createElement("label", { className: "mt-3 inline-block bg-blue-600/30 hover:bg-blue-600/50 text-blue-300 text-xs font-semibold px-3 py-1.5 rounded-lg border border-blue-500/40 cursor-pointer transition-colors" }, "Browse Files", /* @__PURE__ */ import_react2.default.createElement(
          "input",
          {
            type: "file",
            className: "hidden",
            accept: ".pdf,image/*",
            onChange: (e) => {
              if (e.target.files && e.target.files[0]) {
                const f = e.target.files[0];
                onAddSource({
                  id: Date.now().toString(),
                  name: f.name,
                  type: f.type.includes("pdf") ? "pdf" : "image",
                  size: `${(f.size / (1024 * 1024)).toFixed(1)} MB`,
                  status: "Uploaded & Parsed"
                });
              }
            }
          }
        ))
      )
    ) : (
      /* Web Link Input Form */
      /* @__PURE__ */ import_react2.default.createElement("form", { onSubmit: handleAddUrl, className: "space-y-2" }, /* @__PURE__ */ import_react2.default.createElement("label", { className: "block text-[11px] text-slate-400" }, "Paste Educational Web Link / Online Syllabus"), /* @__PURE__ */ import_react2.default.createElement("div", { className: "flex gap-2" }, /* @__PURE__ */ import_react2.default.createElement(
        "input",
        {
          type: "url",
          value: urlInput,
          onChange: (e) => setUrlInput(e.target.value),
          placeholder: "https://khanacademy.org/physics/ch3...",
          className: "flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        }
      ), /* @__PURE__ */ import_react2.default.createElement(
        "button",
        {
          type: "submit",
          className: "bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
        },
        "Index Link"
      )))
    ), /* @__PURE__ */ import_react2.default.createElement("div", { className: "space-y-1.5" }, /* @__PURE__ */ import_react2.default.createElement("div", { className: "text-[11px] font-semibold text-slate-400 uppercase tracking-wider" }, "Active Reference Sources (", sources.length, "):"), sources.map((src) => /* @__PURE__ */ import_react2.default.createElement("div", { key: src.id, className: "flex items-center justify-between bg-slate-900/90 px-3 py-2 rounded-lg border border-slate-750 text-xs" }, /* @__PURE__ */ import_react2.default.createElement("div", { className: "flex items-center gap-2 overflow-hidden" }, src.type === "pdf" && /* @__PURE__ */ import_react2.default.createElement("svg", { className: "w-4 h-4 text-red-400 shrink-0", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /* @__PURE__ */ import_react2.default.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" })), src.type === "image" && /* @__PURE__ */ import_react2.default.createElement("svg", { className: "w-4 h-4 text-emerald-400 shrink-0", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /* @__PURE__ */ import_react2.default.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" })), src.type === "link" && /* @__PURE__ */ import_react2.default.createElement("svg", { className: "w-4 h-4 text-blue-400 shrink-0", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /* @__PURE__ */ import_react2.default.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" })), /* @__PURE__ */ import_react2.default.createElement("div", { className: "truncate" }, /* @__PURE__ */ import_react2.default.createElement("p", { className: "font-medium text-slate-200 truncate" }, src.name), /* @__PURE__ */ import_react2.default.createElement("p", { className: "text-[10px] text-slate-500" }, src.size, " \u2022 ", /* @__PURE__ */ import_react2.default.createElement("span", { className: "text-emerald-400 font-medium" }, src.status)))), /* @__PURE__ */ import_react2.default.createElement(
      "button",
      {
        onClick: () => onRemoveSource(src.id),
        className: "text-slate-500 hover:text-rose-400 p-1 transition-colors",
        title: "Remove source"
      },
      /* @__PURE__ */ import_react2.default.createElement("svg", { className: "w-4 h-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /* @__PURE__ */ import_react2.default.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" }))
    ))))), /* @__PURE__ */ import_react2.default.createElement("div", { className: "bg-slate-800/50 p-4 rounded-xl border border-slate-800/80 space-y-4" }, /* @__PURE__ */ import_react2.default.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ import_react2.default.createElement("div", { className: "flex items-center gap-2 text-xs font-semibold text-slate-300 uppercase tracking-wider" }, /* @__PURE__ */ import_react2.default.createElement("svg", { className: "w-4 h-4 text-purple-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /* @__PURE__ */ import_react2.default.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z" })), "Cognitive Difficulty Weighting"), /* @__PURE__ */ import_react2.default.createElement("span", { className: "text-xs font-mono font-bold text-indigo-300 bg-indigo-950/80 border border-indigo-700/50 px-2 py-0.5 rounded" }, "Total: 100%")), /* @__PURE__ */ import_react2.default.createElement("div", { className: "space-y-1" }, /* @__PURE__ */ import_react2.default.createElement("div", { className: "h-3 w-full bg-slate-900 rounded-full overflow-hidden flex p-0.5 border border-slate-750" }, /* @__PURE__ */ import_react2.default.createElement(
      "div",
      {
        style: { width: `${difficulty.easy}%` },
        className: "bg-emerald-500 h-full rounded-l transition-all duration-300",
        title: `Easy: ${difficulty.easy}%`
      }
    ), /* @__PURE__ */ import_react2.default.createElement(
      "div",
      {
        style: { width: `${difficulty.medium}%` },
        className: "bg-amber-500 h-full transition-all duration-300",
        title: `Medium: ${difficulty.medium}%`
      }
    ), /* @__PURE__ */ import_react2.default.createElement(
      "div",
      {
        style: { width: `${difficulty.hard}%` },
        className: "bg-rose-500 h-full rounded-r transition-all duration-300",
        title: `Hard: ${difficulty.hard}%`
      }
    )), /* @__PURE__ */ import_react2.default.createElement("div", { className: "flex justify-between text-[10px] text-slate-400 font-medium px-1" }, /* @__PURE__ */ import_react2.default.createElement("span", { className: "text-emerald-400" }, "Easy (", difficulty.easy, "%)"), /* @__PURE__ */ import_react2.default.createElement("span", { className: "text-amber-400" }, "Medium (", difficulty.medium, "%)"), /* @__PURE__ */ import_react2.default.createElement("span", { className: "text-rose-400" }, "Hard (", difficulty.hard, "%)"))), /* @__PURE__ */ import_react2.default.createElement("div", { className: "space-y-3 pt-1" }, /* @__PURE__ */ import_react2.default.createElement("div", null, /* @__PURE__ */ import_react2.default.createElement("div", { className: "flex justify-between text-xs mb-1 font-medium" }, /* @__PURE__ */ import_react2.default.createElement("span", { className: "text-emerald-300 flex items-center gap-1.5" }, /* @__PURE__ */ import_react2.default.createElement("span", { className: "w-2 h-2 rounded-full bg-emerald-500" }), "Section A: Easy Questions (MCQs / Basic)"), /* @__PURE__ */ import_react2.default.createElement("span", { className: "font-bold text-emerald-400 font-mono" }, difficulty.easy, "%")), /* @__PURE__ */ import_react2.default.createElement(
      "input",
      {
        type: "range",
        min: "0",
        max: "100",
        value: difficulty.easy,
        onChange: (e) => handleSliderChange("easy", e.target.value),
        className: "w-full h-1.5 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-emerald-500"
      }
    )), /* @__PURE__ */ import_react2.default.createElement("div", null, /* @__PURE__ */ import_react2.default.createElement("div", { className: "flex justify-between text-xs mb-1 font-medium" }, /* @__PURE__ */ import_react2.default.createElement("span", { className: "text-amber-300 flex items-center gap-1.5" }, /* @__PURE__ */ import_react2.default.createElement("span", { className: "w-2 h-2 rounded-full bg-amber-500" }), "Section B: Medium (Short Answers / Conceptual)"), /* @__PURE__ */ import_react2.default.createElement("span", { className: "font-bold text-amber-400 font-mono" }, difficulty.medium, "%")), /* @__PURE__ */ import_react2.default.createElement(
      "input",
      {
        type: "range",
        min: "0",
        max: "100",
        value: difficulty.medium,
        onChange: (e) => handleSliderChange("medium", e.target.value),
        className: "w-full h-1.5 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-amber-500"
      }
    )), /* @__PURE__ */ import_react2.default.createElement("div", null, /* @__PURE__ */ import_react2.default.createElement("div", { className: "flex justify-between text-xs mb-1 font-medium" }, /* @__PURE__ */ import_react2.default.createElement("span", { className: "text-rose-300 flex items-center gap-1.5" }, /* @__PURE__ */ import_react2.default.createElement("span", { className: "w-2 h-2 rounded-full bg-rose-500" }), "Section C: Hard (Numericals & Derivations)"), /* @__PURE__ */ import_react2.default.createElement("span", { className: "font-bold text-rose-400 font-mono" }, difficulty.hard, "%")), /* @__PURE__ */ import_react2.default.createElement(
      "input",
      {
        type: "range",
        min: "0",
        max: "100",
        value: difficulty.hard,
        onChange: (e) => handleSliderChange("hard", e.target.value),
        className: "w-full h-1.5 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-rose-500"
      }
    )))), /* @__PURE__ */ import_react2.default.createElement("div", { className: "mt-auto pt-2 space-y-2" }, /* @__PURE__ */ import_react2.default.createElement(
      "button",
      {
        onClick: onGeneratePaper,
        disabled: isGenerating,
        className: `w-full py-3.5 px-4 rounded-xl font-bold text-sm text-white shadow-xl transition-all duration-300 flex items-center justify-center gap-2 transform active:scale-98 ${isGenerating ? "bg-slate-800 cursor-not-allowed border border-slate-700 text-slate-400" : "bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 shadow-blue-600/30 border border-blue-400/30 hover:shadow-indigo-500/40"}`
      },
      isGenerating ? /* @__PURE__ */ import_react2.default.createElement(import_react2.default.Fragment, null, /* @__PURE__ */ import_react2.default.createElement("svg", { className: "animate-spin -ml-1 mr-2 h-5 w-5 text-indigo-400", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24" }, /* @__PURE__ */ import_react2.default.createElement("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }), /* @__PURE__ */ import_react2.default.createElement("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })), /* @__PURE__ */ import_react2.default.createElement("span", null, generationProgress || "Synthesizing Exam Paper...")) : /* @__PURE__ */ import_react2.default.createElement(import_react2.default.Fragment, null, /* @__PURE__ */ import_react2.default.createElement("svg", { className: "w-5 h-5 text-amber-300 animate-pulse", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /* @__PURE__ */ import_react2.default.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M13 10V3L4 14h7v7l9-11h-7z" })), /* @__PURE__ */ import_react2.default.createElement("span", null, "Generate AI Exam Paper"))
    ), /* @__PURE__ */ import_react2.default.createElement("p", { className: "text-[10px] text-center text-slate-500 font-medium" }, "Powered by Gemini 3.6 AI \u2022 Aligned with Bloom's Taxonomy Guidelines")));
  }

  // components/A4PreviewPanel.js
  var import_react3 = __toESM(__require("react"));
  function A4PreviewPanel({
    header,
    sections,
    viewMode,
    onSwapQuestion,
    onEditQuestion,
    swappingQuestionId
  }) {
    const [zoomLevel, setZoomLevel] = (0, import_react3.useState)(100);
    const [showWatermark, setShowWatermark] = (0, import_react3.useState)(true);
    const [editingQId, setEditingQId] = (0, import_react3.useState)(null);
    const [editingText, setEditingText] = (0, import_react3.useState)("");
    const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 15, 135));
    const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 15, 65));
    const handleResetZoom = () => setZoomLevel(100);
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
    return /* @__PURE__ */ import_react3.default.createElement("main", { className: "flex-1 bg-slate-200/90 dark:bg-slate-950 p-4 lg:p-8 overflow-y-auto flex flex-col items-center min-h-screen" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "w-full max-w-4xl bg-white dark:bg-slate-900 rounded-xl shadow-md border border-slate-200 dark:border-slate-800 p-2.5 mb-6 flex flex-wrap items-center justify-between gap-3 text-xs" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ import_react3.default.createElement("span", { className: `inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md font-bold text-[11px] ${viewMode === "teacher" ? "bg-emerald-100 text-emerald-800 border border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300" : "bg-blue-100 text-blue-800 border border-blue-300 dark:bg-blue-950 dark:text-blue-300"}` }, /* @__PURE__ */ import_react3.default.createElement("span", { className: `w-2 h-2 rounded-full ${viewMode === "teacher" ? "bg-emerald-500 animate-ping" : "bg-blue-500"}` }), viewMode === "teacher" ? "TEACHER ANSWER KEY & MARKING SCHEME" : "STUDENT EXAMINATION PAPER"), /* @__PURE__ */ import_react3.default.createElement("span", { className: "text-slate-400 font-mono text-[11px]" }, "A4 Format (210 \xD7 297 mm)")), /* @__PURE__ */ import_react3.default.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ import_react3.default.createElement("label", { className: "flex items-center gap-1.5 cursor-pointer text-slate-600 dark:text-slate-400 hover:text-slate-900 font-medium" }, /* @__PURE__ */ import_react3.default.createElement(
      "input",
      {
        type: "checkbox",
        checked: showWatermark,
        onChange: (e) => setShowWatermark(e.target.checked),
        className: "rounded text-blue-600 focus:ring-blue-500"
      }
    ), /* @__PURE__ */ import_react3.default.createElement("span", null, "Watermark")), /* @__PURE__ */ import_react3.default.createElement("div", { className: "h-4 w-px bg-slate-300 dark:bg-slate-700" }), /* @__PURE__ */ import_react3.default.createElement("div", { className: "flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-0.5 border border-slate-200 dark:border-slate-700" }, /* @__PURE__ */ import_react3.default.createElement(
      "button",
      {
        onClick: handleZoomOut,
        className: "p-1 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white",
        title: "Zoom Out"
      },
      /* @__PURE__ */ import_react3.default.createElement("svg", { className: "w-4 h-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /* @__PURE__ */ import_react3.default.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M20 12H4" }))
    ), /* @__PURE__ */ import_react3.default.createElement("span", { className: "px-2 font-mono font-bold text-slate-700 dark:text-slate-200 text-[11px]" }, zoomLevel, "%"), /* @__PURE__ */ import_react3.default.createElement(
      "button",
      {
        onClick: handleZoomIn,
        className: "p-1 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white",
        title: "Zoom In"
      },
      /* @__PURE__ */ import_react3.default.createElement("svg", { className: "w-4 h-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /* @__PURE__ */ import_react3.default.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 4v16m8-8H4" }))
    ), /* @__PURE__ */ import_react3.default.createElement(
      "button",
      {
        onClick: handleResetZoom,
        className: "px-2 py-0.5 text-[10px] font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-white border-l border-slate-200 dark:border-slate-700"
      },
      "Reset"
    )))), /* @__PURE__ */ import_react3.default.createElement(
      "div",
      {
        style: { transform: `scale(${zoomLevel / 100})`, transformOrigin: "top center" },
        className: "w-full max-w-[210mm] min-h-[297mm] bg-white text-slate-900 shadow-2xl rounded-sm border border-slate-300 dark:border-slate-700 p-8 sm:p-12 transition-transform duration-200 relative font-serif select-text"
      },
      showWatermark && /* @__PURE__ */ import_react3.default.createElement("div", { className: "absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden opacity-[0.04]" }, /* @__PURE__ */ import_react3.default.createElement("span", { className: "text-8xl font-black uppercase tracking-widest text-slate-900 -rotate-45 select-none" }, viewMode === "teacher" ? "ANSWER KEY" : "OFFICIAL EXAM")),
      /* @__PURE__ */ import_react3.default.createElement("header", { className: "text-center space-y-2 mb-6 pb-2 border-b-2 border-slate-900" }, /* @__PURE__ */ import_react3.default.createElement("h1", { className: "text-xl sm:text-2xl font-black tracking-wide uppercase text-slate-900 leading-tight" }, header.schoolName || "SCHOOL NAME HERE"), /* @__PURE__ */ import_react3.default.createElement("h2", { className: "text-xs sm:text-sm font-bold tracking-widest uppercase text-slate-700" }, header.subHeader || "EXAMINATION TITLE"), /* @__PURE__ */ import_react3.default.createElement("div", { className: "grid grid-cols-2 text-xs font-sans font-semibold text-slate-800 pt-3 border-t border-slate-300 mt-3" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "text-left space-y-1" }, /* @__PURE__ */ import_react3.default.createElement("p", null, /* @__PURE__ */ import_react3.default.createElement("span", { className: "font-bold text-slate-900" }, "SUBJECT:"), " ", header.subject || "N/A"), /* @__PURE__ */ import_react3.default.createElement("p", null, /* @__PURE__ */ import_react3.default.createElement("span", { className: "font-bold text-slate-900" }, "STANDARD / CLASS:"), " ", header.standard, " (", header.division, ")")), /* @__PURE__ */ import_react3.default.createElement("div", { className: "text-right space-y-1" }, /* @__PURE__ */ import_react3.default.createElement("p", null, /* @__PURE__ */ import_react3.default.createElement("span", { className: "font-bold text-slate-900" }, "DATE:"), " ", header.date || "N/A"), /* @__PURE__ */ import_react3.default.createElement("p", null, /* @__PURE__ */ import_react3.default.createElement("span", { className: "font-bold text-slate-900" }, "TIME ALLOWED:"), " ", header.timeAllowed, " | ", /* @__PURE__ */ import_react3.default.createElement("span", { className: "font-bold text-slate-900" }, "MAX MARKS:"), " ", header.totalMarks))), /* @__PURE__ */ import_react3.default.createElement("hr", { className: "border-t-2 border-slate-900 my-2" }), header.instructions && header.instructions.length > 0 && /* @__PURE__ */ import_react3.default.createElement("div", { className: "text-left font-sans text-[11px] text-slate-700 bg-slate-50 p-2.5 rounded border border-slate-200 my-2" }, /* @__PURE__ */ import_react3.default.createElement("p", { className: "font-bold text-slate-900 uppercase tracking-wider text-[10px] mb-1" }, "General Instructions:"), /* @__PURE__ */ import_react3.default.createElement("ol", { className: "list-decimal list-inside space-y-0.5" }, header.instructions.map((inst, i) => /* @__PURE__ */ import_react3.default.createElement("li", { key: i }, inst))))),
      /* @__PURE__ */ import_react3.default.createElement("div", { className: "space-y-8 font-serif" }, sections.map((section) => /* @__PURE__ */ import_react3.default.createElement("section", { key: section.id, className: "space-y-4" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "border-b border-slate-400 pb-1 flex justify-between items-baseline font-sans" }, /* @__PURE__ */ import_react3.default.createElement("div", null, /* @__PURE__ */ import_react3.default.createElement("h3", { className: "font-bold text-xs sm:text-sm tracking-wider uppercase text-slate-900" }, section.title), section.subtitle && /* @__PURE__ */ import_react3.default.createElement("p", { className: "text-[11px] text-slate-600 italic font-serif" }, section.subtitle)), /* @__PURE__ */ import_react3.default.createElement("span", { className: "text-xs font-bold text-slate-800 font-mono" }, "[", section.questions.length * section.marksPerQuestion, " Marks]")), /* @__PURE__ */ import_react3.default.createElement("div", { className: "space-y-6" }, section.questions.map((q) => {
        const isSwapping = swappingQuestionId === q.id;
        return /* @__PURE__ */ import_react3.default.createElement(
          "div",
          {
            key: q.id,
            className: `group relative p-3 rounded-lg border transition-all duration-300 ${isSwapping ? "bg-blue-50/80 border-blue-400 ring-2 ring-blue-400/50 animate-pulse" : "bg-white hover:bg-slate-50/80 border-transparent hover:border-slate-300"}`
          },
          /* @__PURE__ */ import_react3.default.createElement("div", { className: "absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 bg-slate-900 text-white p-1 rounded-md shadow-lg z-10 font-sans" }, /* @__PURE__ */ import_react3.default.createElement("span", { className: `px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ${q.difficulty === "easy" ? "bg-emerald-500 text-white" : q.difficulty === "medium" ? "bg-amber-500 text-white" : "bg-rose-500 text-white"}` }, q.difficulty), /* @__PURE__ */ import_react3.default.createElement(
            "button",
            {
              onClick: () => startEditing(q),
              className: "p-1 hover:text-blue-300 transition-colors",
              title: "Edit Question Text"
            },
            /* @__PURE__ */ import_react3.default.createElement("svg", { className: "w-3.5 h-3.5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /* @__PURE__ */ import_react3.default.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" }))
          ), /* @__PURE__ */ import_react3.default.createElement(
            "button",
            {
              onClick: () => onSwapQuestion(q.id, q.difficulty),
              disabled: isSwapping,
              className: "p-1 text-indigo-300 hover:text-indigo-100 transition-all transform hover:rotate-180 duration-500",
              title: "AI Swap / Regenerate Question"
            },
            /* @__PURE__ */ import_react3.default.createElement("svg", { className: `w-3.5 h-3.5 ${isSwapping ? "animate-spin text-amber-400" : ""}`, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /* @__PURE__ */ import_react3.default.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" }))
          )),
          /* @__PURE__ */ import_react3.default.createElement("div", { className: "flex items-start justify-between gap-4" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "flex-1" }, editingQId === q.id ? /* @__PURE__ */ import_react3.default.createElement("div", { className: "space-y-2 font-sans my-1" }, /* @__PURE__ */ import_react3.default.createElement(
            "textarea",
            {
              value: editingText,
              onChange: (e) => setEditingText(e.target.value),
              className: "w-full bg-slate-50 border border-blue-500 rounded p-2 text-xs font-serif text-slate-900 focus:outline-none",
              rows: 3
            }
          ), /* @__PURE__ */ import_react3.default.createElement("div", { className: "flex justify-end gap-2 text-xs" }, /* @__PURE__ */ import_react3.default.createElement(
            "button",
            {
              onClick: () => setEditingQId(null),
              className: "px-2 py-1 bg-slate-200 text-slate-700 rounded font-semibold"
            },
            "Cancel"
          ), /* @__PURE__ */ import_react3.default.createElement(
            "button",
            {
              onClick: () => saveEditing(q.id),
              className: "px-2.5 py-1 bg-blue-600 text-white rounded font-semibold"
            },
            "Save Edit"
          ))) : /* @__PURE__ */ import_react3.default.createElement("div", { className: "text-xs sm:text-sm text-slate-900 leading-relaxed font-serif" }, /* @__PURE__ */ import_react3.default.createElement("span", { className: "font-bold text-slate-900 mr-2 font-sans" }, "Q", q.number, "."), /* @__PURE__ */ import_react3.default.createElement("span", { className: "whitespace-pre-line" }, q.text)), q.options && q.options.length > 0 && /* @__PURE__ */ import_react3.default.createElement("div", { className: "grid grid-cols-2 gap-2 mt-2.5 ml-5 text-xs font-sans text-slate-800" }, q.options.map((opt, idx) => /* @__PURE__ */ import_react3.default.createElement("div", { key: idx, className: "flex items-center gap-1.5 p-1 rounded hover:bg-slate-100" }, /* @__PURE__ */ import_react3.default.createElement("span", { className: "font-semibold" }, opt)))), q.hasDiagramPrompt && /* @__PURE__ */ import_react3.default.createElement("div", { className: "mt-3 ml-5 p-3 border-2 border-dashed border-slate-300 rounded-lg text-center bg-slate-50 font-sans text-xs text-slate-500" }, q.diagramText)), /* @__PURE__ */ import_react3.default.createElement("div", { className: "font-sans text-xs font-bold text-slate-900 whitespace-nowrap pt-0.5" }, "[", q.marks, " ", q.marks === 1 ? "Mark" : "Marks", "]")),
          viewMode === "teacher" && q.answerKey && /* @__PURE__ */ import_react3.default.createElement("div", { className: "mt-3 ml-4 p-3 bg-emerald-50/90 dark:bg-emerald-950/40 border-l-4 border-emerald-500 rounded-r-lg text-xs font-sans space-y-1.5 shadow-sm" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-[11px] uppercase tracking-wider" }, /* @__PURE__ */ import_react3.default.createElement("svg", { className: "w-4 h-4 text-emerald-600", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /* @__PURE__ */ import_react3.default.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" })), "Teacher Solution & Marking Scheme"), q.answerKey.correctOption && /* @__PURE__ */ import_react3.default.createElement("div", { className: "text-emerald-900 dark:text-emerald-200 font-semibold" }, /* @__PURE__ */ import_react3.default.createElement("span", { className: "text-slate-600" }, "Correct Option: "), /* @__PURE__ */ import_react3.default.createElement("span", { className: "bg-emerald-200 dark:bg-emerald-800 text-emerald-900 dark:text-emerald-100 px-1.5 py-0.5 rounded font-bold" }, q.answerKey.correctOption)), q.answerKey.solution && /* @__PURE__ */ import_react3.default.createElement("div", { className: "text-slate-700 dark:text-slate-300 whitespace-pre-line font-mono text-[11px] bg-white/70 dark:bg-slate-900/60 p-2 rounded border border-emerald-200 dark:border-emerald-900" }, /* @__PURE__ */ import_react3.default.createElement("span", { className: "font-bold text-slate-900 dark:text-slate-100" }, "Solution Steps:"), /* @__PURE__ */ import_react3.default.createElement("p", { className: "mt-0.5" }, q.answerKey.solution)), q.answerKey.rubric && /* @__PURE__ */ import_react3.default.createElement("div", { className: "text-emerald-700 dark:text-emerald-300 text-[11px]" }, /* @__PURE__ */ import_react3.default.createElement("span", { className: "font-bold" }, "Marking Rubric: "), q.answerKey.rubric))
        );
      }))))),
      /* @__PURE__ */ import_react3.default.createElement("footer", { className: "mt-16 pt-4 border-t border-slate-300 text-center font-sans text-[11px] text-slate-500 flex justify-between items-center" }, /* @__PURE__ */ import_react3.default.createElement("span", null, "*** END OF EXAMINATION PAPER ***"), /* @__PURE__ */ import_react3.default.createElement("span", null, "Page 1 of 1"))
    ));
  }

  // components/ExportModal.js
  var import_react4 = __toESM(__require("react"));
  function ExportModal({ isOpen, onClose, header, sections, viewMode }) {
    const [selectedFormat, setSelectedFormat] = (0, import_react4.useState)("pdf");
    const [includeAnswerKey, setIncludeAnswerKey] = (0, import_react4.useState)(viewMode === "teacher");
    const [isExporting, setIsExporting] = (0, import_react4.useState)(false);
    if (!isOpen) return null;
    const generatePlainText = () => {
      let text = `${header.schoolName}
${header.subHeader}
`;
      text += `Subject: ${header.subject} | STD: ${header.standard} (${header.division})
`;
      text += `Date: ${header.date} | Time: ${header.timeAllowed} | Max Marks: ${header.totalMarks}
`;
      text += `--------------------------------------------------

`;
      if (header.instructions?.length) {
        text += `General Instructions:
`;
        header.instructions.forEach((inst, i) => {
          text += `${i + 1}. ${inst}
`;
        });
        text += `
--------------------------------------------------

`;
      }
      sections.forEach((sec) => {
        text += `${sec.title}
`;
        if (sec.subtitle) text += `${sec.subtitle}
`;
        text += `
`;
        sec.questions.forEach((q) => {
          text += `Q${q.number}. ${q.text} [${q.marks} Marks]
`;
          if (q.options?.length) {
            q.options.forEach((opt) => {
              text += `   ${opt}
`;
            });
          }
          if (includeAnswerKey && q.answerKey) {
            text += `   [ANSWER KEY]: ${q.answerKey.correctOption || ""}
`;
            text += `   [SOLUTION]: ${q.answerKey.solution || ""}
`;
          }
          text += `
`;
        });
      });
      return text;
    };
    const handleDownload = () => {
      setIsExporting(true);
      setTimeout(() => {
        const text = generatePlainText();
        let mimeType = "text/plain";
        let extension = "txt";
        if (selectedFormat === "word") {
          mimeType = "application/msword";
          extension = "doc";
        }
        if (selectedFormat === "pdf") {
          window.print();
          setIsExporting(false);
          onClose();
          return;
        }
        const blob = new Blob([text], { type: `${mimeType};charset=utf-8` });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${header.subject || "Exam"}_Paper_${selectedFormat.toUpperCase()}.${extension}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        setIsExporting(false);
        onClose();
      }, 600);
    };
    return /* @__PURE__ */ import_react4.default.createElement("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in font-sans" }, /* @__PURE__ */ import_react4.default.createElement("div", { className: "bg-slate-900 text-white rounded-2xl max-w-md w-full border border-slate-800 shadow-2xl overflow-hidden p-6 space-y-5" }, /* @__PURE__ */ import_react4.default.createElement("div", { className: "flex items-center justify-between border-b border-slate-800 pb-3" }, /* @__PURE__ */ import_react4.default.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ import_react4.default.createElement("div", { className: "p-2 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30" }, /* @__PURE__ */ import_react4.default.createElement("svg", { className: "w-5 h-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /* @__PURE__ */ import_react4.default.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" }))), /* @__PURE__ */ import_react4.default.createElement("div", null, /* @__PURE__ */ import_react4.default.createElement("h3", { className: "font-bold text-base text-white" }, "Export Exam Paper"), /* @__PURE__ */ import_react4.default.createElement("p", { className: "text-xs text-slate-400" }, "Download formatted document for print or digital distribution"))), /* @__PURE__ */ import_react4.default.createElement(
      "button",
      {
        onClick: onClose,
        className: "text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
      },
      /* @__PURE__ */ import_react4.default.createElement("svg", { className: "w-5 h-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /* @__PURE__ */ import_react4.default.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M6 18L18 6M6 6l12 12" }))
    )), /* @__PURE__ */ import_react4.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react4.default.createElement("label", { className: "text-xs font-semibold text-slate-300 uppercase tracking-wider" }, "Select Export Format"), /* @__PURE__ */ import_react4.default.createElement("div", { className: "grid grid-cols-3 gap-2.5" }, /* @__PURE__ */ import_react4.default.createElement(
      "button",
      {
        onClick: () => setSelectedFormat("pdf"),
        className: `p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${selectedFormat === "pdf" ? "bg-blue-600/20 border-blue-500 text-white shadow-md shadow-blue-600/20" : "bg-slate-800/60 border-slate-750 text-slate-400 hover:bg-slate-800"}`
      },
      /* @__PURE__ */ import_react4.default.createElement("svg", { className: "w-6 h-6 text-rose-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /* @__PURE__ */ import_react4.default.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" })),
      /* @__PURE__ */ import_react4.default.createElement("span", { className: "text-xs font-bold" }, "PDF Document")
    ), /* @__PURE__ */ import_react4.default.createElement(
      "button",
      {
        onClick: () => setSelectedFormat("word"),
        className: `p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${selectedFormat === "word" ? "bg-blue-600/20 border-blue-500 text-white shadow-md shadow-blue-600/20" : "bg-slate-800/60 border-slate-750 text-slate-400 hover:bg-slate-800"}`
      },
      /* @__PURE__ */ import_react4.default.createElement("svg", { className: "w-6 h-6 text-blue-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /* @__PURE__ */ import_react4.default.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" })),
      /* @__PURE__ */ import_react4.default.createElement("span", { className: "text-xs font-bold" }, "MS Word (.docx)")
    ), /* @__PURE__ */ import_react4.default.createElement(
      "button",
      {
        onClick: () => setSelectedFormat("text"),
        className: `p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${selectedFormat === "text" ? "bg-blue-600/20 border-blue-500 text-white shadow-md shadow-blue-600/20" : "bg-slate-800/60 border-slate-750 text-slate-400 hover:bg-slate-800"}`
      },
      /* @__PURE__ */ import_react4.default.createElement("svg", { className: "w-6 h-6 text-emerald-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /* @__PURE__ */ import_react4.default.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" })),
      /* @__PURE__ */ import_react4.default.createElement("span", { className: "text-xs font-bold" }, "Plain Text (.txt)")
    ))), /* @__PURE__ */ import_react4.default.createElement("div", { className: "bg-slate-800/60 p-3 rounded-xl border border-slate-750 flex items-center justify-between" }, /* @__PURE__ */ import_react4.default.createElement("div", { className: "flex items-center gap-2 text-xs" }, /* @__PURE__ */ import_react4.default.createElement("svg", { className: "w-4 h-4 text-emerald-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /* @__PURE__ */ import_react4.default.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" })), /* @__PURE__ */ import_react4.default.createElement("div", null, /* @__PURE__ */ import_react4.default.createElement("p", { className: "font-semibold text-slate-200" }, "Include Teacher Answer Key"), /* @__PURE__ */ import_react4.default.createElement("p", { className: "text-[10px] text-slate-400" }, "Append solutions and marking schemes at the end"))), /* @__PURE__ */ import_react4.default.createElement(
      "input",
      {
        type: "checkbox",
        checked: includeAnswerKey,
        onChange: (e) => setIncludeAnswerKey(e.target.checked),
        className: "w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
      }
    )), /* @__PURE__ */ import_react4.default.createElement("div", { className: "flex items-center gap-3 pt-2" }, /* @__PURE__ */ import_react4.default.createElement(
      "button",
      {
        onClick: onClose,
        className: "flex-1 py-2.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-750 text-slate-300 font-semibold text-xs transition-colors"
      },
      "Cancel"
    ), /* @__PURE__ */ import_react4.default.createElement(
      "button",
      {
        onClick: handleDownload,
        disabled: isExporting,
        className: "flex-1 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 border border-blue-400/30 transition-all flex items-center justify-center gap-2"
      },
      isExporting ? /* @__PURE__ */ import_react4.default.createElement("span", null, "Preparing File...") : /* @__PURE__ */ import_react4.default.createElement(import_react4.default.Fragment, null, /* @__PURE__ */ import_react4.default.createElement("svg", { className: "w-4 h-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /* @__PURE__ */ import_react4.default.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" })), /* @__PURE__ */ import_react4.default.createElement("span", null, "Download ", selectedFormat.toUpperCase()))
    ))));
  }

  // data/mockData.js
  var PRESET_EXAMS = [
    {
      id: "physics-10",
      name: "Physics: Gravitation & Motion (Std X)",
      header: {
        schoolName: "ST. XAVIER'S HIGH SCHOOL & JR. COLLEGE",
        subHeader: "FIRST TERM EXAMINATION - 2026-27",
        standard: "STD X (Grade 10)",
        division: "Div A & B",
        subject: "Physics (Science Paper I)",
        date: "2026-08-28",
        totalMarks: 50,
        timeAllowed: "2 Hours",
        instructions: [
          "All questions are compulsory. Internal choices are provided in Section C.",
          "Draw neat, labelled diagrams wherever necessary.",
          "Use of scientific calculators is not permitted.",
          "Figures to the right indicate full marks for that question."
        ]
      },
      difficulty: { easy: 30, medium: 50, hard: 20 },
      sources: [
        { id: "1", name: "NCERT_Physics_Ch3_Gravitation.pdf", type: "pdf", size: "2.4 MB", status: "Parsed (18 Topics)" },
        { id: "2", name: "Board_Exam_QuestionBank_2025.pdf", type: "pdf", size: "4.1 MB", status: "Parsed (42 Qs)" },
        { id: "3", name: "https://khanacademy.org/physics/motion-laws", type: "link", size: "Web Page", status: "Indexed" }
      ],
      sections: [
        {
          id: "sec-a",
          title: "SECTION A: MULTIPLE CHOICE QUESTIONS",
          subtitle: "Select the correct alternative for each of the following questions.",
          marksPerQuestion: 1,
          questions: [
            {
              id: "q1",
              number: "1",
              text: "The gravitational force between two bodies is inversely proportional to:",
              type: "mcq",
              difficulty: "easy",
              marks: 1,
              options: [
                "A) Sum of their masses",
                "B) Product of their masses",
                "C) Square of the distance between them",
                "D) Distance between them"
              ],
              answerKey: {
                correctOption: "C) Square of the distance between them",
                solution: "According to Newton's Law of Universal Gravitation, F = G*(m1*m2)/r^2. Thus, force is inversely proportional to the square of the distance (r^2).",
                rubric: "1 Mark for selecting option C."
              }
            },
            {
              id: "q2",
              number: "2",
              text: "What is the acceleration due to gravity (g) at the center of the Earth?",
              type: "mcq",
              difficulty: "easy",
              marks: 1,
              options: [
                "A) 9.8 m/s\xB2",
                "B) Zero",
                "C) 4.9 m/s\xB2",
                "D) Infinite"
              ],
              answerKey: {
                correctOption: "B) Zero",
                solution: "At the Earth's center, mass surrounds the point uniformly from all directions, cancelling net gravitational pull. Hence g = 0 m/s\xB2.",
                rubric: "1 Mark for selecting option B."
              }
            },
            {
              id: "q3",
              number: "3",
              text: "Which of the following physical quantities remains constant during uniform circular motion?",
              type: "mcq",
              difficulty: "medium",
              marks: 1,
              options: [
                "A) Velocity",
                "B) Speed",
                "C) Acceleration",
                "D) Displacement"
              ],
              answerKey: {
                correctOption: "B) Speed",
                solution: "In uniform circular motion, magnitude of velocity (speed) remains constant while direction changes continuously, causing changing velocity and acceleration.",
                rubric: "1 Mark for selecting option B."
              }
            },
            {
              id: "q4",
              number: "4",
              text: "If the distance between two objects is doubled, the gravitational force between them becomes:",
              type: "mcq",
              difficulty: "medium",
              marks: 1,
              options: [
                "A) Double",
                "B) Half",
                "C) One-fourth",
                "D) Four times"
              ],
              answerKey: {
                correctOption: "C) One-fourth",
                solution: "F \u221D 1/r^2. When r becomes 2r, F' \u221D 1/(2r)^2 = 1/(4r^2) = F/4.",
                rubric: "1 Mark for selecting option C."
              }
            }
          ]
        },
        {
          id: "sec-b",
          title: "SECTION B: SHORT ANSWER QUESTIONS",
          subtitle: "Answer the following questions in brief. (3 Marks Each)",
          marksPerQuestion: 3,
          questions: [
            {
              id: "q5",
              number: "5",
              text: "State Kepler's Three Laws of Planetary Motion. Draw a schematic diagram showing an elliptical orbit with the Sun at one of the foci.",
              type: "descriptive",
              difficulty: "medium",
              marks: 3,
              hasDiagramPrompt: true,
              diagramText: "[ Space reserved for Elliptical Orbit Diagram with perihelion and aphelion ]",
              answerKey: {
                solution: "1. Law of Orbits: All planets move in elliptical orbits with the Sun at one focus.\n2. Law of Areas: A line joining a planet and the Sun sweeps out equal areas during equal intervals of time.\n3. Law of Periods: The square of the orbital period (T^2) is directly proportional to the cube of the semi-major axis (r^3).",
                rubric: "\u2022 1.5 Marks for stating all 3 laws accurately.\n\u2022 1.5 Marks for neat labelled diagram of ellipse & foci."
              }
            },
            {
              id: "q6",
              number: "6",
              text: "Distinguish between Mass and Weight of an object. Give at least three point-by-point differences.",
              type: "descriptive",
              difficulty: "easy",
              marks: 3,
              answerKey: {
                solution: "1. Mass is the quantity of matter contained in a body, whereas Weight is the force of gravitational attraction acting on it.\n2. Mass is a scalar quantity; Weight is a vector quantity.\n3. Mass remains constant everywhere; Weight varies from place to place (W = mg).\n4. SI Unit of mass is kg; SI Unit of weight is Newton (N).",
                rubric: "1 Mark per valid difference point (Max 3 Marks)."
              }
            },
            {
              id: "q7",
              number: "7",
              text: "Explain why the value of acceleration due to gravity (g) decreases as we move higher above the Earth's surface.",
              type: "descriptive",
              difficulty: "medium",
              marks: 3,
              answerKey: {
                solution: "g = GM / (R + h)^2. As altitude h increases, the distance from Earth's center (R + h) increases. Since g is inversely proportional to the square of total distance from center, g decreases with height.",
                rubric: "\u2022 1 Mark for formula g = GM/(R+h)^2.\n\u2022 2 Marks for explanation of inverse square relation."
              }
            }
          ]
        },
        {
          id: "sec-c",
          title: "SECTION C: LONG ANSWER & NUMERICAL PROBLEMS",
          subtitle: "Solve the following analytical and numerical problems. (5 Marks Each)",
          marksPerQuestion: 5,
          questions: [
            {
              id: "q8",
              number: "8",
              text: "An iron ball of mass 5 kg is dropped from a height of 490 meters above the ground. Calculate:\n(a) The time taken by the ball to reach the ground.\n(b) Its final velocity just before striking the ground. (Take g = 9.8 m/s\xB2)",
              type: "numerical",
              difficulty: "hard",
              marks: 5,
              answerKey: {
                solution: "Given: Initial velocity u = 0, Height s = 490 m, g = 9.8 m/s\xB2.\n\n(a) Using second kinematic equation: s = ut + 0.5*g*t\xB2\n490 = 0 + 0.5 * 9.8 * t\xB2\n490 = 4.9 * t\xB2 \u21D2 t\xB2 = 100 \u21D2 t = 10 seconds.\n\n(b) Using first kinematic equation: v = u + gt\nv = 0 + 9.8 * 10 = 98 m/s.",
                rubric: "\u2022 1 Mark for writing given values and formulas.\n\u2022 2 Marks for correct step-by-step solution of part (a) [t = 10 s].\n\u2022 2 Marks for correct solution of part (b) with proper SI units [v = 98 m/s]."
              }
            },
            {
              id: "q9",
              number: "9",
              text: "Define Escape Velocity. Derive an expression for the escape velocity from the surface of Earth in terms of acceleration due to gravity (g) and radius of Earth (R). Calculate its approximate numerical value for Earth (R = 6.4 \xD7 10\u2076 m).",
              type: "descriptive",
              difficulty: "hard",
              marks: 5,
              answerKey: {
                solution: "Definition: Minimum velocity required by a body to escape Earth's gravitational field permanently.\n\nDerivation:\nInitial Total Energy on Surface E1 = Kinetic Energy + Potential Energy = 0.5*m*Vesc\xB2 - G*M*m/R\nFinal Energy at infinity E2 = 0\nBy Conservation of Energy: E1 = E2 \u21D2 0.5*m*Vesc\xB2 = G*M*m/R\nVesc = \u221A(2GM/R). Since g = GM/R\xB2, GM = gR\xB2.\nSubstituting GM: Vesc = \u221A(2gR).\n\nNumerical Calculation:\nVesc = \u221A(2 * 9.8 * 6.4 \xD7 10\u2076) = \u221A(1.2544 \xD7 10\u2078) = 11.2 \xD7 10\xB3 m/s = 11.2 km/s.",
                rubric: "\u2022 1 Mark for definition.\n\u2022 2.5 Marks for step-by-step mathematical derivation.\n\u2022 1.5 Marks for accurate numerical calculation (11.2 km/s)."
              }
            }
          ]
        }
      ]
    },
    {
      id: "chemistry-12",
      name: "Chemistry: Organic Compounds & Kinetics (Std XII)",
      header: {
        schoolName: "ROYAL ACADEMY OF SCIENCE & TECHNOLOGY",
        subHeader: "PRE-BOARD EXAMINATION - 2026-27",
        standard: "STD XII (Grade 12)",
        division: "Batch A",
        subject: "Chemistry (Paper II)",
        date: "2026-09-05",
        totalMarks: 40,
        timeAllowed: "1.5 Hours",
        instructions: [
          "Section A contains 4 MCQs of 1 mark each.",
          "Section B contains 3 short numerical questions of 3 marks each.",
          "Section C contains 3 long mechanisms/derivations of 5 marks each."
        ]
      },
      difficulty: { easy: 20, medium: 50, hard: 30 },
      sources: [
        { id: "1", name: "Organic_Chemistry_Vol2.pdf", type: "pdf", size: "5.8 MB", status: "Parsed" }
      ],
      sections: [
        {
          id: "sec-a",
          title: "SECTION A: OBJECTIVE QUESTIONS",
          subtitle: "Choose the most appropriate option.",
          marksPerQuestion: 1,
          questions: [
            {
              id: "cq1",
              number: "1",
              text: "The rate constant of a zero-order reaction has the unit:",
              type: "mcq",
              difficulty: "easy",
              marks: 1,
              options: ["A) s\u207B\xB9", "B) mol L\u207B\xB9 s\u207B\xB9", "C) L mol\u207B\xB9 s\u207B\xB9", "D) L\xB2 mol\u207B\xB2 s\u207B\xB9"],
              answerKey: {
                correctOption: "B) mol L\u207B\xB9 s\u207B\xB9",
                solution: "For nth order reaction, unit of k = (mol L\u207B\xB9)^(1-n) s\u207B\xB9. For n=0, unit is mol L\u207B\xB9 s\u207B\xB9.",
                rubric: "1 Mark for option B."
              }
            }
          ]
        },
        {
          id: "sec-b",
          title: "SECTION B: REACTION MECHANISMS",
          subtitle: "Explain the mechanism with electron push arrows.",
          marksPerQuestion: 3,
          questions: [
            {
              id: "cq2",
              number: "2",
              text: "Explain SN1 reaction mechanism for hydrolysis of tert-butyl bromide with energy profile diagram.",
              type: "descriptive",
              difficulty: "medium",
              marks: 3,
              answerKey: {
                solution: "Two step mechanism involving carbocation intermediate formation (rate determining step) followed by nucleophilic attack.",
                rubric: "1.5 marks for steps, 1.5 marks for energy profile curve."
              }
            }
          ]
        }
      ]
    }
  ];
  var QUESTION_POOL = {
    easy: [
      {
        text: "Which law states that energy can neither be created nor destroyed?",
        options: ["A) Newton's First Law", "B) Law of Conservation of Energy", "C) Ohm's Law", "D) Hooke's Law"],
        answerKey: {
          correctOption: "B) Law of Conservation of Energy",
          solution: "First law of thermodynamics / Law of Conservation of Energy.",
          rubric: "1 Mark."
        }
      },
      {
        text: "What is the SI unit of electric current?",
        options: ["A) Volt", "B) Watt", "C) Ampere", "D) Joule"],
        answerKey: {
          correctOption: "C) Ampere",
          solution: "Ampere (A) measures rate of flow of electric charge.",
          rubric: "1 Mark."
        }
      },
      {
        text: "Define Inertia of Rest with a daily life example.",
        options: [],
        answerKey: {
          solution: "The inherent property of a body to resist any change in its state of rest. Example: Passengers jerk backwards when a bus starts suddenly.",
          rubric: "1 Mark definition, 1 Mark example."
        }
      }
    ],
    medium: [
      {
        text: "Derive the relationship between momentum (p) and kinetic energy (E) of a particle of mass m.",
        options: [],
        answerKey: {
          solution: "E = 0.5 * m * v\xB2. Multiply numerator and denominator by m: E = (m\xB2v\xB2) / 2m = p\xB2 / 2m. Therefore p = \u221A(2mE).",
          rubric: "1 Mark formula, 2 Marks derivation."
        }
      },
      {
        text: "A car accelerates uniformly from 18 km/h to 36 km/h in 5 seconds. Calculate the acceleration and distance covered.",
        options: [],
        answerKey: {
          solution: "u = 5 m/s, v = 10 m/s, t = 5 s. a = (v-u)/t = 1 m/s\xB2. s = ut + 0.5at\xB2 = 25 + 12.5 = 37.5 meters.",
          rubric: "1.5 Marks for acceleration, 1.5 Marks for distance."
        }
      }
    ],
    hard: [
      {
        text: "A satellite of mass m revolves around Earth in a circular orbit of radius r. Find its Total Energy, Kinetic Energy, and Potential Energy in terms of G, M, m, and r.",
        options: [],
        answerKey: {
          solution: "Orbital velocity v = \u221A(GM/r).\nKinetic Energy KE = 0.5 * m * v\xB2 = GMm / 2r.\nPotential Energy PE = -GMm / r.\nTotal Energy E = KE + PE = -GMm / 2r.",
          rubric: "1.5 Marks KE, 1.5 Marks PE, 2 Marks Total Energy."
        }
      },
      {
        text: "Two bodies of masses 10 kg and 20 kg are connected by a light inextensible string passing over a frictionless pulley. Calculate acceleration of the system and tension in the string.",
        options: [],
        answerKey: {
          solution: "a = (m2 - m1)g / (m1 + m2) = (20-10)*9.8 / 30 = 3.27 m/s\xB2.\nT = 2*m1*m2*g / (m1+m2) = 2*10*20*9.8 / 30 = 130.67 N.",
          rubric: "2.5 Marks acceleration, 2.5 Marks tension."
        }
      }
    ]
  };

  // app.js
  function App() {
    const initialPreset = PRESET_EXAMS[0];
    const [activePresetId, setActivePresetId] = (0, import_react5.useState)(initialPreset.id);
    const [header, setHeader] = (0, import_react5.useState)(initialPreset.header);
    const [difficulty, setDifficulty] = (0, import_react5.useState)(initialPreset.difficulty);
    const [sources, setSources] = (0, import_react5.useState)(initialPreset.sources);
    const [sections, setSections] = (0, import_react5.useState)(initialPreset.sections);
    const [viewMode, setViewMode] = (0, import_react5.useState)("student");
    const [isGenerating, setIsGenerating] = (0, import_react5.useState)(false);
    const [generationProgress, setGenerationProgress] = (0, import_react5.useState)("");
    const [swappingQuestionId, setSwappingQuestionId] = (0, import_react5.useState)(null);
    const [exportModalOpen, setExportModalOpen] = (0, import_react5.useState)(false);
    const [toastMessage, setToastMessage] = (0, import_react5.useState)(null);
    const showToast = (msg, type = "success") => {
      setToastMessage({ msg, type });
      setTimeout(() => {
        setToastMessage(null);
      }, 4e3);
    };
    const handleSelectPreset = (presetId) => {
      const selected = PRESET_EXAMS.find((p) => p.id === presetId);
      if (selected) {
        setActivePresetId(selected.id);
        setHeader(selected.header);
        setDifficulty(selected.difficulty);
        setSources(selected.sources);
        setSections(selected.sections);
        showToast(`Loaded preset template: ${selected.name}`);
      }
    };
    const handleUpdateHeader = (key, value) => {
      setHeader((prev) => ({ ...prev, [key]: value }));
    };
    const handleUpdateDifficulty = (newDiff) => {
      setDifficulty(newDiff);
    };
    const handleAddSource = (sourceObj) => {
      setSources((prev) => [...prev, sourceObj]);
      showToast(`Source added: ${sourceObj.name}`);
    };
    const handleRemoveSource = (id) => {
      setSources((prev) => prev.filter((s) => s.id !== id));
      showToast("Source removed", "info");
    };
    const handleGeneratePaper = async () => {
      setIsGenerating(true);
      setGenerationProgress("1/3 Connecting to AI backend server...");
      try {
        const totalQuestions = 8;
        const totalMarks = Number(header.totalMarks) || 30;
        const easyPct = Number(difficulty.easy) || 30;
        const medPct = Number(difficulty.medium) || 50;
        let easy = Math.max(1, Math.round(easyPct / 100 * totalQuestions));
        let medium = Math.max(1, Math.round(medPct / 100 * totalQuestions));
        let difficult = totalQuestions - (easy + medium);
        if (difficult < 1) {
          difficult = 1;
          if (medium > 1) medium -= 1;
          else if (easy > 1) easy -= 1;
        }
        setGenerationProgress("2/3 Generating cognitive questions with Gemini AI...");
        const sourcesText = sources && sources.length > 0 ? ` (Syllabus reference: ${sources.map((s) => s.name).join(", ")})` : "";
        const topicText = `${header.subHeader || "Unit Syllabus"}${sourcesText}`;
        const response = await fetch("http://localhost:5000/api/generate-paper", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            subject: header.subject || "Physics",
            topic: topicText,
            className: `${header.standard || "Grade 10"} (${header.division || "All"})`,
            totalQuestions,
            totalMarks,
            difficulty: { easy, medium, difficult },
            questionTypes: ["MCQ", "Short Answer", "Numerical"]
          })
        });
        const data = await response.json();
        if (!response.ok || !data.success || !data.paper) {
          throw new Error(data.message || "Failed to generate question paper from backend.");
        }
        setGenerationProgress("3/3 Formatting A4 document layout...");
        const rawQuestions = data.paper.questions || [];
        const mcqQuestions = rawQuestions.filter((q) => q.type === "MCQ" || q.options && q.options.length > 0);
        const nonMcqQuestions = rawQuestions.filter((q) => q.type !== "MCQ" && (!q.options || q.options.length === 0));
        const shortQuestions = nonMcqQuestions.filter((q) => q.difficulty === "easy" || q.difficulty === "medium");
        const hardQuestions = nonMcqQuestions.filter((q) => q.difficulty === "difficult" || q.difficulty === "hard");
        const formattedSections = [];
        let qCounter = 1;
        if (mcqQuestions.length > 0) {
          formattedSections.push({
            id: "sec-a",
            title: "SECTION A: MULTIPLE CHOICE QUESTIONS",
            subtitle: "Select the correct alternative for each of the following questions.",
            marksPerQuestion: mcqQuestions[0]?.marks || 1,
            questions: mcqQuestions.map((q) => ({
              id: `ai-q-${qCounter}`,
              number: String(qCounter++),
              text: q.question,
              type: "mcq",
              difficulty: q.difficulty === "difficult" ? "hard" : q.difficulty,
              marks: q.marks || 1,
              options: q.options && q.options.length > 0 ? q.options : ["A", "B", "C", "D"],
              answerKey: {
                correctOption: q.correctAnswer || "See explanation",
                solution: q.explanation || "Step-by-step solution provided by AI.",
                rubric: `${q.marks || 1} Mark for the correct option selection.`
              }
            }))
          });
        }
        if (shortQuestions.length > 0) {
          formattedSections.push({
            id: "sec-b",
            title: "SECTION B: SHORT ANSWER QUESTIONS",
            subtitle: "Answer the following questions briefly with scientific principles.",
            marksPerQuestion: shortQuestions[0]?.marks || 2,
            questions: shortQuestions.map((q) => ({
              id: `ai-q-${qCounter}`,
              number: String(qCounter++),
              text: q.question,
              type: "short",
              difficulty: q.difficulty === "difficult" ? "hard" : q.difficulty,
              marks: q.marks || 2,
              options: [],
              answerKey: {
                correctOption: q.correctAnswer || "Complete written answer",
                solution: q.explanation || "Detailed scientific explanation.",
                rubric: `${q.marks || 2} Marks: Key concepts and reasoning.`
              }
            }))
          });
        }
        if (hardQuestions.length > 0) {
          formattedSections.push({
            id: "sec-c",
            title: "SECTION C: NUMERICAL & ANALYTICAL PROBLEMS",
            subtitle: "Solve with detailed step-by-step calculations and derivations.",
            marksPerQuestion: hardQuestions[0]?.marks || 4,
            questions: hardQuestions.map((q) => ({
              id: `ai-q-${qCounter}`,
              number: String(qCounter++),
              text: q.question,
              type: "long",
              difficulty: "hard",
              marks: q.marks || 4,
              options: [],
              answerKey: {
                correctOption: q.correctAnswer || "Final calculated answer",
                solution: q.explanation || "Full derivation and calculations.",
                rubric: `${q.marks || 4} Marks: Formula (1M) + Steps (2M) + Final Answer (1M).`
              }
            }))
          });
        }
        if (formattedSections.length === 0 && rawQuestions.length > 0) {
          formattedSections.push({
            id: "sec-a",
            title: "SECTION A: COMPREHENSIVE QUESTIONS",
            subtitle: "Answer the following questions.",
            marksPerQuestion: 2,
            questions: rawQuestions.map((q) => ({
              id: `ai-q-${qCounter}`,
              number: String(qCounter++),
              text: q.question,
              type: q.type === "MCQ" ? "mcq" : "short",
              difficulty: q.difficulty === "difficult" ? "hard" : q.difficulty,
              marks: q.marks || 2,
              options: q.options || [],
              answerKey: {
                correctOption: q.correctAnswer || "Answer key",
                solution: q.explanation || "Explanation",
                rubric: `${q.marks || 2} Marks.`
              }
            }))
          });
        }
        setSections(formattedSections);
        showToast("\u2728 AI Exam Paper generated successfully from live Gemini backend!");
      } catch (err) {
        console.error("Error generating paper:", err);
        showToast(`\u26A0\uFE0F ${err.message}`, "info");
      } finally {
        setIsGenerating(false);
        setGenerationProgress("");
      }
    };
    const handleSwapQuestion = (qId, qDifficulty) => {
      setSwappingQuestionId(qId);
      setTimeout(() => {
        const pool = QUESTION_POOL[qDifficulty] || QUESTION_POOL.easy;
        const randomQ = pool[Math.floor(Math.random() * pool.length)];
        setSections(
          (prevSections) => prevSections.map((sec) => ({
            ...sec,
            questions: sec.questions.map((q) => {
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
        showToast("\u{1F504} Question swapped with alternative variant from item bank!");
      }, 600);
    };
    const handleEditQuestion = (qId, newText) => {
      setSections(
        (prevSections) => prevSections.map((sec) => ({
          ...sec,
          questions: sec.questions.map((q) => q.id === qId ? { ...q, text: newText } : q)
        }))
      );
      showToast("Question updated successfully!");
    };
    const handleQuickPrint = () => {
      window.print();
    };
    return /* @__PURE__ */ import_react5.default.createElement("div", { className: "min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white" }, /* @__PURE__ */ import_react5.default.createElement(
      Navbar,
      {
        viewMode,
        setViewMode,
        presetExams: PRESET_EXAMS,
        activePresetId,
        onSelectPreset: handleSelectPreset,
        onOpenExportModal: () => setExportModalOpen(true),
        onQuickPrint: handleQuickPrint
      }
    ), /* @__PURE__ */ import_react5.default.createElement("div", { className: "flex-1 flex flex-col lg:flex-row overflow-hidden" }, /* @__PURE__ */ import_react5.default.createElement(
      ControlsPanel,
      {
        header,
        onUpdateHeader: handleUpdateHeader,
        difficulty,
        onUpdateDifficulty: handleUpdateDifficulty,
        sources,
        onAddSource: handleAddSource,
        onRemoveSource: handleRemoveSource,
        onGeneratePaper: handleGeneratePaper,
        isGenerating,
        generationProgress
      }
    ), /* @__PURE__ */ import_react5.default.createElement(
      A4PreviewPanel,
      {
        header,
        sections,
        viewMode,
        onSwapQuestion: handleSwapQuestion,
        onEditQuestion: handleEditQuestion,
        swappingQuestionId
      }
    )), /* @__PURE__ */ import_react5.default.createElement(
      ExportModal,
      {
        isOpen: exportModalOpen,
        onClose: () => setExportModalOpen(false),
        header,
        sections,
        viewMode
      }
    ), toastMessage && /* @__PURE__ */ import_react5.default.createElement("div", { className: "fixed bottom-6 right-6 z-50 animate-bounce-in" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: `flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl border text-xs font-semibold backdrop-blur-md ${toastMessage.type === "info" ? "bg-slate-800/95 border-slate-700 text-slate-200" : "bg-emerald-900/95 border-emerald-500/50 text-emerald-100 shadow-emerald-950/40"}` }, /* @__PURE__ */ import_react5.default.createElement("svg", { className: "w-5 h-5 text-emerald-400 shrink-0", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, /* @__PURE__ */ import_react5.default.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" })), /* @__PURE__ */ import_react5.default.createElement("span", null, toastMessage.msg))));
  }
  return __toCommonJS(app_exports);
})();
