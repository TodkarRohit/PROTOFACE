// ExamCraft AI - Standalone React App with Login, RBAC, and College Binding
const { useState, useEffect } = React;

// ----------------------------------------------------------------------
// 1. MOCK USER DATABASE (TEACHERS, HODs, PRINCIPALS)
// ----------------------------------------------------------------------
const MOCK_USERS = [
  {
    id: 'usr-1',
    name: 'Dr. Rahul Sharma',
    username: 'rahul_physics',
    password: 'password123',
    email: 'rahul.sharma@nmiet.edu.in',
    role: 'teacher', // 'teacher' | 'hod' | 'principal'
    roleTitle: 'Subject Teacher',
    collegeName: 'NMIET (Nutan Maharashtra Institute of Engineering & Technology)',
    branch: 'Basic Sciences & Physics',
    subject: 'Physics (Science Paper I)',
    allowedSubjects: ['Physics (Science Paper I)']
  },
  {
    id: 'usr-2',
    name: 'Prof. Anjali Verma',
    username: 'anjali_hod',
    password: 'password123',
    email: 'anjali.verma@nmiet.edu.in',
    role: 'hod',
    roleTitle: 'Head of Department (HOD)',
    collegeName: 'NMIET (Nutan Maharashtra Institute of Engineering & Technology)',
    branch: 'Computer Engineering & Science',
    subject: 'Computer Dept (Data Structures, OS, AI, Networks)',
    allowedSubjects: ['Physics (Science Paper I)', 'Chemistry (Paper II)', 'Data Structures & Algorithms', 'Operating Systems']
  },
  {
    id: 'usr-3',
    name: 'Dr. S. K. Kulkarni',
    username: 'principal_nmiet',
    password: 'password123',
    email: 'principal@nmiet.edu.in',
    role: 'principal',
    roleTitle: 'Principal / Dean',
    collegeName: 'NMIET (Nutan Maharashtra Institute of Engineering & Technology)',
    branch: 'All Academic Branches',
    subject: 'All College Subjects',
    allowedSubjects: ['Physics (Science Paper I)', 'Chemistry (Paper II)', 'Data Structures & Algorithms', 'Operating Systems', 'Mathematics - Calculus']
  }
];

// ----------------------------------------------------------------------
// 2. PRESET EXAMS BANK
// ----------------------------------------------------------------------
const PRESET_EXAMS = [
  {
    id: 'physics-10',
    name: 'Physics: Gravitation & Motion (Std X)',
    header: {
      schoolName: 'NMIET (Nutan Maharashtra Institute of Engineering & Technology)',
      subHeader: 'FIRST TERM EXAMINATION - 2026-27',
      standard: 'STD X (Grade 10)',
      division: 'Div A & B',
      subject: 'Physics (Science Paper I)',
      date: '2026-08-28',
      totalMarks: 50,
      timeAllowed: '2 Hours',
      instructions: [
        'All questions are compulsory. Internal choices are provided in Section C.',
        'Draw neat, labelled diagrams wherever necessary.',
        'Use of scientific calculators is not permitted.',
        'Figures to the right indicate full marks for that question.'
      ]
    },
    difficulty: { easy: 30, medium: 50, hard: 20 },
    sources: [
      { id: '1', name: 'NCERT_Physics_Ch3_Gravitation.pdf', type: 'pdf', size: '2.4 MB', status: 'Parsed (18 Topics)' },
      { id: '2', name: 'Board_Exam_QuestionBank_2025.pdf', type: 'pdf', size: '4.1 MB', status: 'Parsed (42 Qs)' },
      { id: '3', name: 'https://khanacademy.org/physics/motion-laws', type: 'link', size: 'Web Page', status: 'Indexed' }
    ],
    sections: [
      {
        id: 'sec-a',
        title: 'SECTION A: MULTIPLE CHOICE QUESTIONS',
        subtitle: 'Select the correct alternative for each of the following questions.',
        marksPerQuestion: 1,
        questions: [
          {
            id: 'q1',
            number: '1',
            text: 'The gravitational force between two bodies is inversely proportional to:',
            type: 'mcq',
            difficulty: 'easy',
            marks: 1,
            options: [
              'A) Sum of their masses',
              'B) Product of their masses',
              'C) Square of the distance between them',
              'D) Distance between them'
            ],
            answerKey: {
              correctOption: 'C) Square of the distance between them',
              solution: 'According to Newton\'s Law of Universal Gravitation, F = G*(m1*m2)/r^2. Thus, force is inversely proportional to the square of the distance (r^2).',
              rubric: '1 Mark for selecting option C.'
            }
          },
          {
            id: 'q2',
            number: '2',
            text: 'What is the acceleration due to gravity (g) at the center of the Earth?',
            type: 'mcq',
            difficulty: 'easy',
            marks: 1,
            options: [
              'A) 9.8 m/s²',
              'B) Zero',
              'C) 4.9 m/s²',
              'D) Infinite'
            ],
            answerKey: {
              correctOption: 'B) Zero',
              solution: 'At the Earth\'s center, mass surrounds the point uniformly from all directions, cancelling net gravitational pull. Hence g = 0 m/s².',
              rubric: '1 Mark for selecting option B.'
            }
          },
          {
            id: 'q3',
            number: '3',
            text: 'Which of the following physical quantities remains constant during uniform circular motion?',
            type: 'mcq',
            difficulty: 'medium',
            marks: 1,
            options: [
              'A) Velocity',
              'B) Speed',
              'C) Acceleration',
              'D) Displacement'
            ],
            answerKey: {
              correctOption: 'B) Speed',
              solution: 'In uniform circular motion, magnitude of velocity (speed) remains constant while direction changes continuously, causing changing velocity and acceleration.',
              rubric: '1 Mark for selecting option B.'
            }
          },
          {
            id: 'q4',
            number: '4',
            text: 'If the distance between two objects is doubled, the gravitational force between them becomes:',
            type: 'mcq',
            difficulty: 'medium',
            marks: 1,
            options: [
              'A) Double',
              'B) Half',
              'C) One-fourth',
              'D) Four times'
            ],
            answerKey: {
              correctOption: 'C) One-fourth',
              solution: 'F ∝ 1/r^2. When r becomes 2r, F\' ∝ 1/(2r)^2 = 1/(4r^2) = F/4.',
              rubric: '1 Mark for selecting option C.'
            }
          }
        ]
      },
      {
        id: 'sec-b',
        title: 'SECTION B: SHORT ANSWER QUESTIONS',
        subtitle: 'Answer the following questions in brief. (3 Marks Each)',
        marksPerQuestion: 3,
        questions: [
          {
            id: 'q5',
            number: '5',
            text: 'State Kepler\'s Three Laws of Planetary Motion. Draw a schematic diagram showing an elliptical orbit with the Sun at one of the foci.',
            type: 'descriptive',
            difficulty: 'medium',
            marks: 3,
            hasDiagramPrompt: true,
            diagramText: '[ Space reserved for Elliptical Orbit Diagram with perihelion and aphelion ]',
            answerKey: {
              solution: '1. Law of Orbits: All planets move in elliptical orbits with the Sun at one focus.\n2. Law of Areas: A line joining a planet and the Sun sweeps out equal areas during equal intervals of time.\n3. Law of Periods: The square of the orbital period (T^2) is directly proportional to the cube of the semi-major axis (r^3).',
              rubric: '• 1.5 Marks for stating all 3 laws accurately.\n• 1.5 Marks for neat labelled diagram of ellipse & foci.'
            }
          },
          {
            id: 'q6',
            number: '6',
            text: 'Distinguish between Mass and Weight of an object. Give at least three point-by-point differences.',
            type: 'descriptive',
            difficulty: 'easy',
            marks: 3,
            answerKey: {
              solution: '1. Mass is the quantity of matter contained in a body, whereas Weight is the force of gravitational attraction acting on it.\n2. Mass is a scalar quantity; Weight is a vector quantity.\n3. Mass remains constant everywhere; Weight varies from place to place (W = mg).\n4. SI Unit of mass is kg; SI Unit of weight is Newton (N).',
              rubric: '1 Mark per valid difference point (Max 3 Marks).'
            }
          },
          {
            id: 'q7',
            number: '7',
            text: 'Explain why the value of acceleration due to gravity (g) decreases as we move higher above the Earth\'s surface.',
            type: 'descriptive',
            difficulty: 'medium',
            marks: 3,
            answerKey: {
              solution: 'g = GM / (R + h)^2. As altitude h increases, the distance from Earth\'s center (R + h) increases. Since g is inversely proportional to the square of total distance from center, g decreases with height.',
              rubric: '• 1 Mark for formula g = GM/(R+h)^2.\n• 2 Marks for explanation of inverse square relation.'
            }
          }
        ]
      },
      {
        id: 'sec-c',
        title: 'SECTION C: LONG ANSWER & NUMERICAL PROBLEMS',
        subtitle: 'Solve the following analytical and numerical problems. (5 Marks Each)',
        marksPerQuestion: 5,
        questions: [
          {
            id: 'q8',
            number: '8',
            text: 'An iron ball of mass 5 kg is dropped from a height of 490 meters above the ground. Calculate:\n(a) The time taken by the ball to reach the ground.\n(b) Its final velocity just before striking the ground. (Take g = 9.8 m/s²)',
            type: 'numerical',
            difficulty: 'hard',
            marks: 5,
            answerKey: {
              solution: 'Given: Initial velocity u = 0, Height s = 490 m, g = 9.8 m/s².\n\n(a) Using second kinematic equation: s = ut + 0.5*g*t²\n490 = 0 + 0.5 * 9.8 * t²\n490 = 4.9 * t² ⇒ t² = 100 ⇒ t = 10 seconds.\n\n(b) Using first kinematic equation: v = u + gt\nv = 0 + 9.8 * 10 = 98 m/s.',
              rubric: '• 1 Mark for writing given values and formulas.\n• 2 Marks for correct step-by-step solution of part (a) [t = 10 s].\n• 2 Marks for correct solution of part (b) with proper SI units [v = 98 m/s].'
            }
          },
          {
            id: 'q9',
            number: '9',
            text: 'Define Escape Velocity. Derive an expression for the escape velocity from the surface of Earth in terms of acceleration due to gravity (g) and radius of Earth (R). Calculate its approximate numerical value for Earth (R = 6.4 × 10⁶ m).',
            type: 'descriptive',
            difficulty: 'hard',
            marks: 5,
            answerKey: {
              solution: 'Definition: Minimum velocity required by a body to escape Earth\'s gravitational field permanently.\n\nDerivation:\nInitial Total Energy on Surface E1 = Kinetic Energy + Potential Energy = 0.5*m*Vesc² - G*M*m/R\nFinal Energy at infinity E2 = 0\nBy Conservation of Energy: E1 = E2 ⇒ 0.5*m*Vesc² = G*M*m/R\nVesc = √(2GM/R). Since g = GM/R², GM = gR².\nSubstituting GM: Vesc = √(2gR).\n\nNumerical Calculation:\nVesc = √(2 * 9.8 * 6.4 × 10⁶) = √(1.2544 × 10⁸) = 11.2 × 10³ m/s = 11.2 km/s.',
              rubric: '• 1 Mark for definition.\n• 2.5 Marks for step-by-step mathematical derivation.\n• 1.5 Marks for accurate numerical calculation (11.2 km/s).'
            }
          }
        ]
      }
    ]
  },
  {
    id: 'chemistry-12',
    name: 'Chemistry: Organic Compounds & Kinetics (Std XII)',
    header: {
      schoolName: 'NMIET (Nutan Maharashtra Institute of Engineering & Technology)',
      subHeader: 'PRE-BOARD EXAMINATION - 2026-27',
      standard: 'STD XII (Grade 12)',
      division: 'Batch A',
      subject: 'Chemistry (Paper II)',
      date: '2026-09-05',
      totalMarks: 40,
      timeAllowed: '1.5 Hours',
      instructions: [
        'Section A contains 4 MCQs of 1 mark each.',
        'Section B contains 3 short numerical questions of 3 marks each.',
        'Section C contains 3 long mechanisms/derivations of 5 marks each.'
      ]
    },
    difficulty: { easy: 20, medium: 50, hard: 30 },
    sources: [
      { id: '1', name: 'Organic_Chemistry_Vol2.pdf', type: 'pdf', size: '5.8 MB', status: 'Parsed' }
    ],
    sections: [
      {
        id: 'sec-a',
        title: 'SECTION A: OBJECTIVE QUESTIONS',
        subtitle: 'Choose the most appropriate option.',
        marksPerQuestion: 1,
        questions: [
          {
            id: 'cq1',
            number: '1',
            text: 'The rate constant of a zero-order reaction has the unit:',
            type: 'mcq',
            difficulty: 'easy',
            marks: 1,
            options: ['A) s⁻¹', 'B) mol L⁻¹ s⁻¹', 'C) L mol⁻¹ s⁻¹', 'D) L² mol⁻² s⁻¹'],
            answerKey: {
              correctOption: 'B) mol L⁻¹ s⁻¹',
              solution: 'For nth order reaction, unit of k = (mol L⁻¹)^(1-n) s⁻¹. For n=0, unit is mol L⁻¹ s⁻¹.',
              rubric: '1 Mark for option B.'
            }
          }
        ]
      },
      {
        id: 'sec-b',
        title: 'SECTION B: REACTION MECHANISMS',
        subtitle: 'Explain the mechanism with electron push arrows.',
        marksPerQuestion: 3,
        questions: [
          {
            id: 'cq2',
            number: '2',
            text: 'Explain SN1 reaction mechanism for hydrolysis of tert-butyl bromide with energy profile diagram.',
            type: 'descriptive',
            difficulty: 'medium',
            marks: 3,
            answerKey: {
              solution: 'Two step mechanism involving carbocation intermediate formation (rate determining step) followed by nucleophilic attack.',
              rubric: '1.5 marks for steps, 1.5 marks for energy profile curve.'
            }
          }
        ]
      }
    ]
  }
];

const QUESTION_POOL = {
  easy: [
    {
      text: 'Which law states that energy can neither be created nor destroyed?',
      options: ['A) Newton\'s First Law', 'B) Law of Conservation of Energy', 'C) Ohm\'s Law', 'D) Hooke\'s Law'],
      answerKey: {
        correctOption: 'B) Law of Conservation of Energy',
        solution: 'First law of thermodynamics / Law of Conservation of Energy.',
        rubric: '1 Mark.'
      }
    },
    {
      text: 'What is the SI unit of electric current?',
      options: ['A) Volt', 'B) Watt', 'C) Ampere', 'D) Joule'],
      answerKey: {
        correctOption: 'C) Ampere',
        solution: 'Ampere (A) measures rate of flow of electric charge.',
        rubric: '1 Mark.'
      }
    }
  ],
  medium: [
    {
      text: 'Derive the relationship between momentum (p) and kinetic energy (E) of a particle of mass m.',
      options: [],
      answerKey: {
        solution: 'E = 0.5 * m * v². Multiply numerator and denominator by m: E = (m²v²) / 2m = p² / 2m. Therefore p = √(2mE).',
        rubric: '1 Mark formula, 2 Marks derivation.'
      }
    }
  ],
  hard: [
    {
      text: 'A satellite of mass m revolves around Earth in a circular orbit of radius r. Find its Total Energy, Kinetic Energy, and Potential Energy in terms of G, M, m, and r.',
      options: [],
      answerKey: {
        solution: 'Orbital velocity v = √(GM/r).\nKinetic Energy KE = 0.5 * m * v² = GMm / 2r.\nPotential Energy PE = -GMm / r.\nTotal Energy E = KE + PE = -GMm / 2r.',
        rubric: '1.5 Marks KE, 1.5 Marks PE, 2 Marks Total Energy.'
      }
    }
  ]
};

// ----------------------------------------------------------------------
// 3. LOGIN & REGISTRATION COMPONENT
// ----------------------------------------------------------------------
function LoginScreen({ onLoginSuccess }) {
  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'register'
  
  // Login Form State
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Register Form State
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regRole, setRegRole] = useState('teacher');
  const [regCollege, setRegCollege] = useState('NMIET (Nutan Maharashtra Institute of Engineering & Technology)');
  const [regBranch, setRegBranch] = useState('Computer Engineering');
  const [regSubject, setRegSubject] = useState('Physics (Science Paper I)');

  // Handle Login Submit
  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMessage('');
    const user = MOCK_USERS.find(
      u => (u.username.toLowerCase() === usernameInput.trim().toLowerCase() || 
            u.email.toLowerCase() === usernameInput.trim().toLowerCase()) &&
           u.password === passwordInput
    );

    if (user) {
      onLoginSuccess(user);
    } else {
      setErrorMessage('Invalid username/email or password. Try quick demo login buttons below!');
    }
  };

  // Quick Demo Login Handler
  const handleQuickDemoLogin = (userId) => {
    const user = MOCK_USERS.find(u => u.id === userId);
    if (user) {
      onLoginSuccess(user);
    }
  };

  // Handle Registration Submit
  const handleRegister = (e) => {
    e.preventDefault();
    if (!regName || !regEmail || !regUsername || !regPassword) {
      setErrorMessage('Please fill in all required registration fields.');
      return;
    }

    const newUser = {
      id: `usr-${Date.now()}`,
      name: regName,
      username: regUsername,
      email: regEmail,
      password: regPassword,
      role: regRole,
      roleTitle: regRole === 'teacher' ? 'Subject Teacher' : regRole === 'hod' ? 'Head of Department (HOD)' : 'Principal / Dean',
      collegeName: regCollege,
      branch: regBranch,
      subject: regSubject,
      allowedSubjects: [regSubject]
    };

    MOCK_USERS.push(newUser);
    onLoginSuccess(newUser);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-4 font-sans selection:bg-blue-600 selection:text-white">
      
      {/* Background Glow Overlay */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
        <div className="w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] -translate-y-20"></div>
        <div className="w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px] translate-x-40"></div>
      </div>

      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-10 p-6 sm:p-8 space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-600 mx-auto flex items-center justify-center shadow-lg shadow-blue-600/30">
            <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">ExamCraft AI</h1>
          <p className="text-xs text-slate-400 font-medium">Faculty Portal & Assessment Management System</p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
          <button
            onClick={() => { setActiveTab('login'); setErrorMessage(''); }}
            className={`flex-1 py-2 rounded-lg transition-colors ${
              activeTab === 'login' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => { setActiveTab('register'); setErrorMessage(''); }}
            className={`flex-1 py-2 rounded-lg transition-colors ${
              activeTab === 'register' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Register Faculty
          </button>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-3 rounded-lg bg-rose-950/80 border border-rose-800 text-rose-200 text-xs font-medium flex items-center gap-2">
            <svg className="w-4 h-4 text-rose-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{errorMessage}</span>
          </div>
        )}

        {/* SIGN IN FORM */}
        {activeTab === 'login' ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Username or Email</label>
              <input
                type="text"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                placeholder="e.g. rahul_physics or rahul@nmiet.edu.in"
                className="w-full bg-slate-950 border border-slate-750 rounded-lg px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-950 border border-slate-750 rounded-lg px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all"
            >
              Sign In to Portal
            </button>
          </form>
        ) : (
          /* REGISTRATION FORM */
          <form onSubmit={handleRegister} className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">Full Name</label>
                <input
                  type="text"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="Prof. Jane Doe"
                  className="w-full bg-slate-950 border border-slate-750 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">Email</label>
                <input
                  type="email"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="jane@nmiet.edu.in"
                  className="w-full bg-slate-950 border border-slate-750 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">Username</label>
                <input
                  type="text"
                  value={regUsername}
                  onChange={(e) => setRegUsername(e.target.value)}
                  placeholder="jane_comp"
                  className="w-full bg-slate-950 border border-slate-750 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">Password</label>
                <input
                  type="password"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950 border border-slate-750 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            {/* Position / Role Selector */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">Faculty Position / Role</label>
              <select
                value={regRole}
                onChange={(e) => setRegRole(e.target.value)}
                className="w-full bg-slate-950 border border-slate-750 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="teacher">Subject Teacher (Restricted to assigned subject)</option>
                <option value="hod">HOD (Head of Dept - Access to all CS/Dept subjects)</option>
                <option value="principal">Principal / Dean (Access to all college branches)</option>
              </select>
            </div>

            {/* College Name Select */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">Institution / College Name</label>
              <input
                type="text"
                value={regCollege}
                onChange={(e) => setRegCollege(e.target.value)}
                className="w-full bg-slate-950 border border-slate-750 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. NMIET"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">Branch / Dept</label>
                <input
                  type="text"
                  value={regBranch}
                  onChange={(e) => setRegBranch(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-750 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">Primary Subject</label>
                <input
                  type="text"
                  value={regSubject}
                  onChange={(e) => setRegSubject(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-750 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all mt-2"
            >
              Complete Registration & Sign In
            </button>
          </form>
        )}

        {/* QUICK DEMO LOGIN SHORTCUTS */}
        <div className="border-t border-slate-800 pt-4 space-y-2">
          <p className="text-[11px] font-semibold text-slate-400 text-center uppercase tracking-wider">
            Quick Demo Login Accounts (NMIET):
          </p>
          <div className="space-y-1.5">
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('usr-1')}
              className="w-full p-2 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-left flex items-center justify-between text-xs transition-colors"
            >
              <div>
                <p className="font-bold text-blue-400">Dr. Rahul Sharma (NMIET Physics Teacher)</p>
                <p className="text-[10px] text-slate-400">Role: Subject Teacher • Subject Restricted</p>
              </div>
              <span className="text-[10px] bg-blue-900/60 text-blue-300 font-mono px-2 py-0.5 rounded">Login →</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemoLogin('usr-2')}
              className="w-full p-2 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-left flex items-center justify-between text-xs transition-colors"
            >
              <div>
                <p className="font-bold text-purple-400">Prof. Anjali Verma (NMIET HOD - Computer)</p>
                <p className="text-[10px] text-slate-400">Role: HOD • Access to all Dept Subjects & Classes</p>
              </div>
              <span className="text-[10px] bg-purple-900/60 text-purple-300 font-mono px-2 py-0.5 rounded">Login →</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemoLogin('usr-3')}
              className="w-full p-2 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-left flex items-center justify-between text-xs transition-colors"
            >
              <div>
                <p className="font-bold text-emerald-400">Dr. S. K. Kulkarni (NMIET Principal)</p>
                <p className="text-[10px] text-slate-400">Role: Principal • Institution-wide Administrative Access</p>
              </div>
              <span className="text-[10px] bg-emerald-900/60 text-emerald-300 font-mono px-2 py-0.5 rounded">Login →</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// 4. NAVBAR COMPONENT WITH PROFILE & COLLEGE HEADER
// ----------------------------------------------------------------------
function Navbar({ 
  currentUser,
  onLogout,
  viewMode, 
  setViewMode, 
  presetExams, 
  activePresetId, 
  onSelectPreset,
  onOpenExportModal,
  onQuickPrint 
}) {
  return (
    <header className="sticky top-0 z-30 bg-slate-900 border-b border-slate-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Logo & Logged-In College Context */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-600 flex items-center justify-center shadow-md shadow-blue-500/20">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-base sm:text-lg leading-tight tracking-tight text-white">ExamCraft AI</h1>
              {/* Logged in College Tag */}
              <span className="px-2 py-0.5 text-[10px] font-bold bg-blue-900/80 text-blue-300 border border-blue-600/50 rounded-full uppercase tracking-wider truncate max-w-[200px] sm:max-w-[280px]">
                🏫 {currentUser.collegeName || 'NMIET'}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">
              Faculty Portal • {currentUser.branch} ({currentUser.roleTitle})
            </p>
          </div>
        </div>

        {/* Preset Selector */}
        <div className="hidden lg:flex items-center gap-2 bg-slate-800/80 p-1.5 rounded-lg border border-slate-700/60">
          <svg className="w-4 h-4 text-indigo-400 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <span className="text-xs font-semibold text-slate-300">Exam Template:</span>
          <select 
            value={activePresetId}
            onChange={(e) => onSelectPreset(e.target.value)}
            className="bg-slate-900 text-xs text-white border border-slate-700 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium cursor-pointer"
          >
            {presetExams.map((preset) => (
              <option key={preset.id} value={preset.id}>
                {preset.name}
              </option>
            ))}
          </select>
        </div>

        {/* Action Controls & Profile Badge */}
        <div className="flex items-center gap-3">
          
          {/* Student Paper vs Teacher Answer Key Toggle */}
          <div className="flex items-center bg-slate-800 p-1 rounded-xl border border-slate-700">
            <button
              onClick={() => setViewMode('student')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                viewMode === 'student'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              </svg>
              Student Paper
            </button>
            <button
              onClick={() => setViewMode('teacher')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                viewMode === 'teacher'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Teacher Answer Key
            </button>
          </div>

          {/* Export Options Button */}
          <button
            onClick={onOpenExportModal}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-500 hover:to-indigo-500 shadow-md shadow-blue-600/20 border border-blue-500/40 transition-all transform active:scale-95"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export
          </button>

          {/* User Profile & Logout Button */}
          <div className="flex items-center gap-2 bg-slate-800 p-1 pl-2.5 rounded-xl border border-slate-700">
            <div className="text-right text-[11px] hidden sm:block">
              <p className="font-bold text-white leading-tight">{currentUser.name}</p>
              <p className="text-[10px] text-indigo-300 font-semibold">{currentUser.roleTitle}</p>
            </div>
            <button
              onClick={onLogout}
              className="p-1.5 bg-slate-700 hover:bg-rose-600 text-slate-300 hover:text-white rounded-lg transition-colors"
              title="Sign Out"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>

        </div>

      </div>
    </header>
  );
}

// ----------------------------------------------------------------------
// 5. CONTROLS PANEL COMPONENT
// ----------------------------------------------------------------------
function ControlsPanel({
  currentUser,
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
  const [activeTab, setActiveTab] = useState('upload');
  const [urlInput, setUrlInput] = useState('');
  const [newInstruction, setNewInstruction] = useState('');
  const [dragActive, setDragActive] = useState(false);

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

  const handleAddInstruction = (e) => {
    e.preventDefault();
    if (!newInstruction.trim()) return;
    onUpdateHeader('instructions', [...header.instructions, newInstruction.trim()]);
    setNewInstruction('');
  };

  const handleRemoveInstruction = (index) => {
    const updated = header.instructions.filter((_, i) => i !== index);
    onUpdateHeader('instructions', updated);
  };

  const handleSliderChange = (key, val) => {
    const newValue = parseInt(val, 10);
    const diff = newValue - difficulty[key];
    const otherKeys = ['easy', 'medium', 'hard'].filter(k => k !== key);
    
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
            {currentUser.roleTitle}
          </span>
        </div>
        <p className="text-xs text-slate-400 mt-1">Configure exam parameters, syllabus context, and cognitive difficulty weighting.</p>
      </div>

      {/* 1. Header Information Form */}
      <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-800/80 space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 uppercase tracking-wider">
          <svg className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          Exam Header & Institution
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-[11px] font-medium text-slate-400 mb-1">School / Institution Name</label>
            <input
              type="text"
              value={header.schoolName}
              onChange={(e) => onUpdateHeader('schoolName', e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold"
              placeholder="e.g. NMIET"
            />
          </div>

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

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-[11px] font-medium text-slate-400 mb-1">Standard (STD)</label>
              <input
                type="text"
                value={header.standard}
                onChange={(e) => onUpdateHeader('standard', e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="STD X"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-slate-400 mb-1">Division</label>
              <input
                type="text"
                value={header.division}
                onChange={(e) => onUpdateHeader('division', e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Div A & B"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-slate-400 mb-1">Subject</label>
              <input
                type="text"
                value={header.subject}
                onChange={(e) => onUpdateHeader('subject', e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
                placeholder="Physics"
              />
            </div>
          </div>

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

          <div>
            <label className="block text-[11px] font-medium text-slate-400 mb-1">General Instructions for Students</label>
            <div className="space-y-1.5 mb-2">
              {header.instructions.map((inst, idx) => (
                <div key={idx} className="flex items-center justify-between bg-slate-900/80 px-2.5 py-1 rounded text-xs text-slate-300 border border-slate-700">
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
              <div className="p-2 rounded-lg bg-slate-800 text-red-400 border border-slate-700" title="PDF Document">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="p-2 rounded-lg bg-slate-800 text-emerald-400 border border-slate-700" title="Textbook Photo">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
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

        <div className="space-y-1.5">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Active Reference Sources ({sources.length}):</div>
          {sources.map((src) => (
            <div key={src.id} className="flex items-center justify-between bg-slate-900/90 px-3 py-2 rounded-lg border border-slate-700 text-xs">
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

      {/* 3. Difficulty Controls */}
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

        <div className="space-y-1">
          <div className="h-3 w-full bg-slate-900 rounded-full overflow-hidden flex p-0.5 border border-slate-700">
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

        <div className="space-y-3 pt-1">
          <div>
            <div className="flex justify-between text-xs mb-1 font-medium">
              <span className="text-emerald-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                Section A: Easy Questions (MCQs)
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

          <div>
            <div className="flex justify-between text-xs mb-1 font-medium">
              <span className="text-amber-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                Section B: Medium (Short Answers)
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
              <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>{generationProgress || 'Synthesizing Exam Paper...'}</span>
            </>
          ) : (
            <>
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

// ----------------------------------------------------------------------
// 6. A4 PREVIEW PANEL COMPONENT
// ----------------------------------------------------------------------
function A4PreviewPanel({
  header,
  sections,
  viewMode,
  onSwapQuestion,
  onEditQuestion,
  swappingQuestionId
}) {
  const [zoomLevel, setZoomLevel] = useState(100);
  const [showWatermark, setShowWatermark] = useState(true);
  const [editingQId, setEditingQId] = useState(null);
  const [editingText, setEditingText] = useState('');

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 15, 135));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 15, 65));
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

  return (
    <main className="flex-1 bg-slate-200/90 dark:bg-slate-950 p-4 lg:p-8 overflow-y-auto flex flex-col items-center min-h-screen">
      
      {/* Top Document Toolbar */}
      <div className="w-full max-w-4xl bg-white dark:bg-slate-900 rounded-xl shadow-md border border-slate-200 dark:border-slate-800 p-2.5 mb-6 flex flex-wrap items-center justify-between gap-3 text-xs">
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

        <div className="flex items-center gap-3">
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
        {showWatermark && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden opacity-[0.04]">
            <span className="text-8xl font-black uppercase tracking-widest text-slate-900 -rotate-45 select-none">
              {viewMode === 'teacher' ? 'ANSWER KEY' : 'OFFICIAL EXAM'}
            </span>
          </div>
        )}

        {/* 1. EXAM HEADER */}
        <header className="text-center space-y-2 mb-6 pb-2 border-b-2 border-slate-900">
          <h1 className="text-xl sm:text-2xl font-black tracking-wide uppercase text-slate-900 leading-tight">
            {header.schoolName || "SCHOOL NAME HERE"}
          </h1>
          <h2 className="text-xs sm:text-sm font-bold tracking-widest uppercase text-slate-700">
            {header.subHeader || "EXAMINATION TITLE"}
          </h2>

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

          <hr className="border-t-2 border-slate-900 my-2" />

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
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 bg-slate-900 text-white p-1 rounded-md shadow-lg z-10 font-sans">
                        <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ${
                          q.difficulty === 'easy' ? 'bg-emerald-500 text-white' :
                          q.difficulty === 'medium' ? 'bg-amber-500 text-white' : 'bg-rose-500 text-white'
                        }`}>
                          {q.difficulty}
                        </span>

                        <button
                          onClick={() => startEditing(q)}
                          className="p-1 hover:text-blue-300 transition-colors"
                          title="Edit Question Text"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>

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

                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
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

                          {q.options && q.options.length > 0 && (
                            <div className="grid grid-cols-2 gap-2 mt-2.5 ml-5 text-xs font-sans text-slate-800">
                              {q.options.map((opt, idx) => (
                                <div key={idx} className="flex items-center gap-1.5 p-1 rounded hover:bg-slate-100">
                                  <span className="font-semibold">{opt}</span>
                                </div>
                              ))}
                            </div>
                          )}

                          {q.hasDiagramPrompt && (
                            <div className="mt-3 ml-5 p-3 border-2 border-dashed border-slate-300 rounded-lg text-center bg-slate-50 font-sans text-xs text-slate-500">
                              {q.diagramText}
                            </div>
                          )}
                        </div>

                        <div className="font-sans text-xs font-bold text-slate-900 whitespace-nowrap pt-0.5">
                          [{q.marks} {q.marks === 1 ? 'Mark' : 'Marks'}]
                        </div>
                      </div>

                      {viewMode === 'teacher' && q.answerKey && (
                        <div className="mt-3 ml-4 p-3 bg-emerald-50/90 dark:bg-emerald-950/40 border-l-4 border-emerald-500 rounded-r-lg text-xs font-sans space-y-1.5 shadow-sm">
                          <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-[11px] uppercase tracking-wider">
                            <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Teacher Solution & Marking Scheme
                          </div>

                          {q.answerKey.correctOption && (
                            <div className="text-emerald-900 dark:text-emerald-200 font-semibold">
                              <span className="text-slate-600">Correct Option: </span>
                              <span className="bg-emerald-200 dark:bg-emerald-800 text-emerald-900 dark:text-emerald-100 px-1.5 py-0.5 rounded font-bold">{q.answerKey.correctOption}</span>
                            </div>
                          )}

                          {q.answerKey.solution && (
                            <div className="text-slate-700 dark:text-slate-300 whitespace-pre-line font-mono text-[11px] bg-white/70 dark:bg-slate-900/60 p-2 rounded border border-emerald-200 dark:border-emerald-900">
                              <span className="font-bold text-slate-900 dark:text-slate-100">Solution Steps:</span>
                              <p className="mt-0.5">{q.answerKey.solution}</p>
                            </div>
                          )}

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

        <footer className="mt-16 pt-4 border-t border-slate-300 text-center font-sans text-[11px] text-slate-500 flex justify-between items-center">
          <span>*** END OF EXAMINATION PAPER ***</span>
          <span>Page 1 of 1</span>
        </footer>

      </div>

    </main>
  );
}

// ----------------------------------------------------------------------
// 7. EXPORT MODAL COMPONENT
// ----------------------------------------------------------------------
function ExportModal({ isOpen, onClose, header, sections, viewMode }) {
  const [selectedFormat, setSelectedFormat] = useState('pdf');
  const [includeAnswerKey, setIncludeAnswerKey] = useState(viewMode === 'teacher');
  const [isExporting, setIsExporting] = useState(false);

  if (!isOpen) return null;

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

        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Select Export Format</label>
          <div className="grid grid-cols-3 gap-2.5">
            <button
              onClick={() => setSelectedFormat('pdf')}
              className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                selectedFormat === 'pdf'
                  ? 'bg-blue-600/20 border-blue-500 text-white shadow-md shadow-blue-600/20'
                  : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:bg-slate-800'
              }`}
            >
              <svg className="w-6 h-6 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <span className="text-xs font-bold">PDF Document</span>
            </button>

            <button
              onClick={() => setSelectedFormat('word')}
              className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                selectedFormat === 'word'
                  ? 'bg-blue-600/20 border-blue-500 text-white shadow-md shadow-blue-600/20'
                  : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:bg-slate-800'
              }`}
            >
              <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 01-2-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="text-xs font-bold">MS Word (.docx)</span>
            </button>

            <button
              onClick={() => setSelectedFormat('text')}
              className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                selectedFormat === 'text'
                  ? 'bg-blue-600/20 border-blue-500 text-white shadow-md shadow-blue-600/20'
                  : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:bg-slate-800'
              }`}
            >
              <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 01-2-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="text-xs font-bold">Plain Text (.txt)</span>
            </button>
          </div>
        </div>

        <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700 flex items-center justify-between">
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

        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-colors"
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

// ----------------------------------------------------------------------
// 8. MASTER APPLICATION CONTAINER (MANAGES AUTH & WORKSPACE)
// ----------------------------------------------------------------------
function MainAppContainer() {
  const [currentUser, setCurrentUser] = useState(null); // null = Not logged in

  const initialPreset = PRESET_EXAMS[0];

  const [activePresetId, setActivePresetId] = useState(initialPreset.id);
  const [header, setHeader] = useState(initialPreset.header);
  const [difficulty, setDifficulty] = useState(initialPreset.difficulty);
  const [sources, setSources] = useState(initialPreset.sources);
  const [sections, setSections] = useState(initialPreset.sections);
  const [viewMode, setViewMode] = useState('student');

  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState('');
  const [swappingQuestionId, setSwappingQuestionId] = useState(null);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Handle Successful Login
  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    // Bind Logged-in College Name to Header
    setHeader(prev => ({
      ...prev,
      schoolName: user.collegeName || 'NMIET (Nutan Maharashtra Institute of Engineering & Technology)',
      subject: user.subject || prev.subject
    }));
    showToast(`Welcome back, ${user.name}! Bound to ${user.collegeName}`);
  };

  // Handle Logout
  const handleLogout = () => {
    setCurrentUser(null);
  };

  const showToast = (msg, type = 'success') => {
    setToastMessage({ msg, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleSelectPreset = (presetId) => {
    const selected = PRESET_EXAMS.find(p => p.id === presetId);
    if (selected) {
      setActivePresetId(selected.id);
      setHeader({
        ...selected.header,
        schoolName: currentUser ? currentUser.collegeName : selected.header.schoolName
      });
      setDifficulty(selected.difficulty);
      setSources(selected.sources);
      setSections(selected.sections);
      showToast(`Loaded exam template: ${selected.name}`);
    }
  };

  const handleUpdateHeader = (key, value) => {
    setHeader(prev => ({ ...prev, [key]: value }));
  };

  const handleUpdateDifficulty = (newDiff) => {
    setDifficulty(newDiff);
  };

  const handleAddSource = (sourceObj) => {
    setSources(prev => [...prev, sourceObj]);
    showToast(`Source added: ${sourceObj.name}`);
  };

  const handleRemoveSource = (id) => {
    setSources(prev => prev.filter(s => s.id !== id));
    showToast('Source removed', 'info');
  };

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

  const handleEditQuestion = (qId, newText) => {
    setSections(prevSections =>
      prevSections.map(sec => ({
        ...sec,
        questions: sec.questions.map(q => (q.id === qId ? { ...q, text: newText } : q))
      }))
    );
    showToast('Question updated successfully!');
  };

  const handleQuickPrint = () => {
    window.print();
  };

  // If user is not logged in, show Login Screen
  if (!currentUser) {
    return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
  }

  // Filter accessible preset exams according to user role & permission
  const accessiblePresets = PRESET_EXAMS.filter(preset => {
    if (currentUser.role === 'principal') return true; // Principal sees all
    if (currentUser.role === 'hod') return true; // HOD sees all branch subjects
    // Subject teacher sees only their allowed subject
    return currentUser.allowedSubjects.includes(preset.header.subject);
  });

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      
      {/* Top Navbar with Profile */}
      <Navbar
        currentUser={currentUser}
        onLogout={handleLogout}
        viewMode={viewMode}
        setViewMode={setViewMode}
        presetExams={accessiblePresets.length > 0 ? accessiblePresets : PRESET_EXAMS}
        activePresetId={activePresetId}
        onSelectPreset={handleSelectPreset}
        onOpenExportModal={() => setExportModalOpen(true)}
        onQuickPrint={handleQuickPrint}
      />

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        <ControlsPanel
          currentUser={currentUser}
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

      {/* Toast Notification */}
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

// Render to DOM
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(<MainAppContainer />);
