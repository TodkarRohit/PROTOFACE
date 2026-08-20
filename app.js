// ExamCraft AI - Final Unified Standalone React App
const useState = (...args) => React.useState(...args);
const useEffect = (...args) => React.useEffect(...args);

// Supabase Client Initialization (Direct Browser SDK for Live Deployment)
const SUPABASE_URL = 'https://jbftwiovpwkkcpdkdifm.supabase.co';
const SUPABASE_KEY = 'sb_publishable_KP_qZBwdO2YfUZrFe0EXjw_9a7-emIt';
const supabaseClient = (window.supabase && typeof window.supabase.createClient === 'function')
  ? window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY)
  : null;

// ----------------------------------------------------------------------
// 0. PRECONFIGURED INSTITUTES & COLLEGES LIST
// ----------------------------------------------------------------------
const COLLEGE_OPTIONS = [
  'NMIET (Nutan Maharashtra Institute of Engineering & Technology, Pune)',
  'COEP Technological University (College of Engineering, Pune)',
  'VJTI (Veermata Jijabai Technological Institute, Mumbai)',
  'PICT (Pune Institute of Computer Technology, Pune)',
  'MIT World Peace University (MIT-WPU, Pune)',
  'VIT (Vishwakarma Institute of Technology, Pune)',
  'PCCOE (Pimpri Chinchwad College of Engineering, Pune)',
  'SPPU (Savitribai Phule Pune University, Pune)',
  'IIT Bombay (Indian Institute of Technology, Mumbai)',
  'Other / Custom Institute...'
];

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
    role: 'teacher',
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
    subject: 'Computer Engineering Dept',
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
// 2. DEPARTMENTAL FACULTY & PAPER STATUS DATA (FOR HOD/PRINCIPAL)
// ----------------------------------------------------------------------
const INITIAL_FACULTY_PAPERS = [
  {
    id: 'fp-1',
    subject: 'Physics (Science Paper I)',
    facultyName: 'Dr. Rahul Sharma',
    facultyEmail: 'rahul.sharma@nmiet.edu.in',
    branch: 'Basic Sciences',
    status: 'generated', // 'generated' | 'pending' | 'requested'
    generatedPaperTitle: 'First Term Physics Examination 2026-27',
    generatedDate: '2026-08-28',
    totalMarks: 50
  },
  {
    id: 'fp-2',
    subject: 'Chemistry (Paper II)',
    facultyName: 'Dr. Meena Iyer',
    facultyEmail: 'meena.iyer@nmiet.edu.in',
    branch: 'Chemistry Dept',
    status: 'generated',
    generatedPaperTitle: 'Pre-Board Chemistry Paper II',
    generatedDate: '2026-09-05',
    totalMarks: 40
  },
  {
    id: 'fp-3',
    subject: 'Data Structures & Algorithms',
    facultyName: 'Prof. Amit Kulkarni',
    facultyEmail: 'amit.k@nmiet.edu.in',
    branch: 'Computer Engineering',
    status: 'pending',
    generatedPaperTitle: null,
    generatedDate: null,
    totalMarks: 100
  },
  {
    id: 'fp-4',
    subject: 'Operating Systems & Linux Kernel',
    facultyName: 'Prof. Anjali Verma',
    facultyEmail: 'anjali.verma@nmiet.edu.in',
    branch: 'Computer Engineering',
    status: 'pending',
    generatedPaperTitle: null,
    generatedDate: null,
    totalMarks: 80
  }
];

// ----------------------------------------------------------------------
// 3. SUBJECT NOTES & STUDY MATERIALS MOCK DATA
// ----------------------------------------------------------------------
const SUBJECT_NOTES_DATA = [
  {
    id: 'n-1',
    title: 'Unit 1: Gravitation & Kepler\'s Laws Lecture Notes',
    subject: 'Physics (Science Paper I)',
    type: 'PDF Guide',
    size: '3.4 MB',
    downloads: 142,
    dateAdded: '2026-08-10',
    summary: 'Comprehensive formula derivations for Escape Velocity, Satellite Motion, and Kepler\'s Orbits.'
  },
  {
    id: 'n-2',
    title: 'Unit 2: Kinematics & Newton\'s Laws Question Bank',
    subject: 'Physics (Science Paper I)',
    type: 'Question Bank',
    size: '5.1 MB',
    downloads: 215,
    dateAdded: '2026-08-14',
    summary: 'Over 80 solved numericals and conceptual short answer questions with marking rubrics.'
  },
  {
    id: 'n-3',
    title: 'Data Structures: Trees, Graphs & Hash Tables Guide',
    subject: 'Data Structures & Algorithms',
    type: 'Lecture Slides',
    size: '8.2 MB',
    downloads: 389,
    dateAdded: '2026-08-01',
    summary: 'Binary Search Trees, AVL balance rotations, Dijkstra algorithm step-by-step diagrams.'
  }
];

// ----------------------------------------------------------------------
// 4. PRESET EXAMS BANK
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
// 5. LOGIN SCREEN COMPONENT
// ----------------------------------------------------------------------
function LoginScreen({ onLoginSuccess }) {
  const [activeTab, setActiveTab] = useState('login');
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regRole, setRegRole] = useState('teacher');
  const [regCollege, setRegCollege] = useState(COLLEGE_OPTIONS[0]);
  const [customCollege, setCustomCollege] = useState('');
  const [regBranch, setRegBranch] = useState('Computer Engineering');
  const [regSubject, setRegSubject] = useState('Physics (Science Paper I)');

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    const inputVal = usernameInput.trim();

    // 1. Try Direct Supabase Query (Works Live on Web / Antigravity / GitHub Pages)
    if (supabaseClient) {
      try {
        const { data, error } = await supabaseClient
          .from('users')
          .select('*')
          .or(`username.eq.${inputVal},email.eq.${inputVal}`)
          .eq('password', passwordInput);

        if (!error && data?.length) {
          const u = data[0];
          onLoginSuccess({
            id: u.id,
            name: u.name,
            username: u.username,
            email: u.email,
            role: u.role,
            roleTitle: u.role_title || 'Educator',
            collegeName: u.college_name || 'NMIET',
            branch: u.branch || 'General',
            subject: u.subject || 'General',
            allowedSubjects: [u.subject || 'General']
          });
          return;
        }
      } catch (err) {
        console.warn('Supabase browser login query notice:', err);
      }
    }

    // 2. Try Node Backend API
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usernameInput: inputVal, passwordInput })
      });

      const data = await response.json();
      if (data.success && data.user) {
        onLoginSuccess(data.user);
        return;
      }
    } catch (err) {
      console.warn('Backend login notice, checking local demo database:', err);
    }

    // 3. Local demo array check
    const user = MOCK_USERS.find(
      u => (u.username.toLowerCase() === inputVal.toLowerCase() || 
            u.email.toLowerCase() === inputVal.toLowerCase()) &&
           u.password === passwordInput
    );

    if (user) {
      onLoginSuccess(user);
    } else {
      setErrorMessage('Invalid username/email or password. Try registering a new account!');
    }
  };

  const handleQuickDemoLogin = (userId) => {
    const user = MOCK_USERS.find(u => u.id === userId);
    if (user) {
      onLoginSuccess(user);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!regName || !regEmail || !regUsername || !regPassword) {
      setErrorMessage('Please fill in all required registration fields.');
      return;
    }

    const resolvedCollege = regCollege === 'Other / Custom Institute...' && customCollege.trim()
      ? customCollege.trim()
      : regCollege;

    const roleTitle = regRole === 'teacher' ? 'Subject Teacher' : regRole === 'hod' ? 'Head of Department (HOD)' : 'Principal / Dean';
    
    const newUser = {
      id: `usr-${Date.now()}`,
      name: regName,
      username: regUsername,
      email: regEmail,
      password: regPassword,
      role: regRole,
      roleTitle: roleTitle,
      collegeName: resolvedCollege,
      branch: regBranch,
      subject: regSubject,
      allowedSubjects: [regSubject]
    };

    // 1. Write directly to Supabase Cloud from Browser
    if (supabaseClient) {
      try {
        const { data, error } = await supabaseClient
          .from('users')
          .insert([{
            name: regName,
            username: regUsername,
            email: regEmail,
            password: regPassword,
            role: regRole,
            role_title: roleTitle,
            college_name: resolvedCollege,
            branch: regBranch,
            subject: regSubject
          }])
          .select();

        if (!error && data?.length) {
          newUser.id = data[0].id;
          console.log('✅ Directly registered user into Supabase Cloud table!');
        } else if (error) {
          console.error('Supabase user insert error:', error.message);
        }
      } catch (err) {
        console.warn('Supabase browser registration notice:', err);
      }
    }

    // 2. Try Node Backend API
    try {
      await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
      });
    } catch (err) {
      console.warn('Backend registration notice:', err);
    }

    MOCK_USERS.push(newUser);
    onLoginSuccess(newUser);
  };
      allowedSubjects: [regSubject]
    };

    // 1. Write directly to Supabase Cloud from Browser
    if (supabaseClient) {
      try {
        const { data, error } = await supabaseClient
          .from('users')
          .insert([{
            name: regName,
            username: regUsername,
            email: regEmail,
            password: regPassword,
            role: regRole,
            role_title: roleTitle,
            college_name: regCollege,
            branch: regBranch,
            subject: regSubject
          }])
          .select();

        if (!error && data?.length) {
          newUser.id = data[0].id;
          console.log('✅ Directly registered user into Supabase Cloud table!');
        } else if (error) {
          console.error('Supabase user insert error:', error.message);
        }
      } catch (err) {
        console.warn('Supabase browser registration notice:', err);
      }
    }

    // 2. Try Node Backend API
    try {
      await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
      });
    } catch (err) {
      console.warn('Backend registration notice:', err);
    }

    MOCK_USERS.push(newUser);
    onLoginSuccess(newUser);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-4 font-sans selection:bg-blue-600 selection:text-white">
      <div className="fixed inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
        <div className="w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] -translate-y-20"></div>
        <div className="w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px] translate-x-40"></div>
      </div>

      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-10 p-6 sm:p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-600 mx-auto flex items-center justify-center shadow-lg shadow-blue-600/30">
            <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">ExamCraft AI</h1>
          <p className="text-xs text-slate-400 font-medium">Faculty Portal & Assessment Management System</p>
        </div>

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

        {errorMessage && (
          <div className="p-3 rounded-lg bg-rose-950/80 border border-rose-800 text-rose-200 text-xs font-medium flex items-center gap-2">
            <svg className="w-4 h-4 text-rose-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{errorMessage}</span>
          </div>
        )}

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

            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                Institution / College Name
              </label>
              <select
                value={regCollege}
                onChange={(e) => setRegCollege(e.target.value)}
                className="w-full bg-slate-950 border border-slate-750 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {COLLEGE_OPTIONS.map((college, idx) => (
                  <option key={idx} value={college}>
                    {college}
                  </option>
                ))}
              </select>
              {regCollege === 'Other / Custom Institute...' && (
                <input
                  type="text"
                  value={customCollege}
                  onChange={(e) => setCustomCollege(e.target.value)}
                  placeholder="Type your College / Institute name..."
                  className="w-full mt-1.5 bg-slate-950 border border-blue-500/70 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              )}
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
                <p className="text-[10px] text-slate-400">Role: Subject Teacher • Physics (Science Paper I)</p>
              </div>
              <span className="text-[10px] bg-blue-900/60 text-blue-300 font-mono px-2 py-0.5 rounded">Login →</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemoLogin('usr-2')}
              className="w-full p-2 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-left flex items-center justify-between text-xs transition-colors"
            >
              <div>
                <p className="font-bold text-purple-400">Prof. Anjali Verma (NMIET HOD - CS Dept)</p>
                <p className="text-[10px] text-slate-400">Role: HOD • Access to all Dept Subjects & Faculty Requests</p>
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
function FacultySettingsModal({ isOpen, onClose, currentUser, onSaveSettings }) {
  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [subject, setSubject] = useState(currentUser?.subject || '');
  const [branch, setBranch] = useState(currentUser?.branch || '');
  const [collegeName, setCollegeName] = useState(currentUser?.collegeName || COLLEGE_OPTIONS[0]);
  const [customCollege, setCustomCollege] = useState('');
  const [password, setPassword] = useState(currentUser?.password || '');

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setEmail(currentUser.email);
      setSubject(currentUser.subject);
      setBranch(currentUser.branch);
      setCollegeName(currentUser.collegeName || COLLEGE_OPTIONS[0]);
      setPassword(currentUser.password);
    }
  }, [currentUser]);

  if (!isOpen || !currentUser) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const resolvedCollege = collegeName === 'Other / Custom Institute...' && customCollege.trim()
      ? customCollege.trim()
      : collegeName;

    onSaveSettings({
      ...currentUser,
      name,
      email,
      subject,
      branch,
      collegeName: resolvedCollege,
      password,
      allowedSubjects: Array.from(new Set([...currentUser.allowedSubjects, subject]))
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in font-sans no-print" role="dialog">
      <div className="bg-slate-900 text-white rounded-2xl max-w-md w-full border border-slate-800 shadow-2xl overflow-hidden p-6 space-y-5">
        
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-base text-white">Faculty Profile Settings</h3>
              <p className="text-xs text-slate-400">Update your primary subject, branch & credentials</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-750 rounded-lg px-3 py-2 text-xs text-white"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Institution / College Name</label>
            <select
              value={collegeName}
              onChange={(e) => setCollegeName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-750 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {COLLEGE_OPTIONS.map((col, idx) => (
                <option key={idx} value={col}>
                  {col}
                </option>
              ))}
            </select>
            {collegeName === 'Other / Custom Institute...' && (
              <input
                type="text"
                value={customCollege}
                onChange={(e) => setCustomCollege(e.target.value)}
                placeholder="Type your College / Institute name..."
                className="w-full mt-1.5 bg-slate-950 border border-blue-500/70 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Assigned Subject (Auto-binds to Generator)</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full bg-slate-950 border border-blue-500/50 rounded-lg px-3 py-2 text-xs text-white font-semibold"
              required
            />
            <p className="text-[10px] text-blue-400 mt-1">Changing your subject will automatically update your left panel controls and exam paper header.</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Department / Branch</label>
              <input
                type="text"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="w-full bg-slate-950 border border-slate-750 rounded-lg px-3 py-2 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-750 rounded-lg px-3 py-2 text-xs text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-950 border border-slate-750 rounded-lg px-3 py-2 text-xs text-white"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-slate-700 bg-slate-800 text-slate-300 font-semibold text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30"
            >
              Save Profile Settings
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// 7. HOME SUB-PAGE / FACULTY DASHBOARD COMPONENT
// ----------------------------------------------------------------------
function HomePageSubPage({ currentUser, onNavigateCenter, onOpenSettings, showToast }) {
  return (
    <div className="flex-1 bg-slate-950 text-white p-6 lg:p-10 overflow-y-auto font-sans selection:bg-blue-600 selection:text-white">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Welcome Hero Banner */}
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-950 border border-blue-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl">
          <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-400/20 text-cyan-300 border border-blue-300/30 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-cyan-300 animate-ping"></span>
                FACULTY DASHBOARD • {currentUser.collegeName || 'NMIET'}
              </div>
              
              <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                Welcome back, {currentUser.name}! 👋
              </h1>
              
              <p className="text-xs sm:text-sm text-blue-100/90 max-w-2xl font-medium">
                Manage your academic paper generation, access subject question banks, and coordinate departmental requests seamlessly for <strong className="text-white">{currentUser.subject}</strong>.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => onNavigateCenter('generator')}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-blue-500/30 border border-blue-400/40 flex items-center gap-2 transform hover:-translate-y-0.5 transition-all"
              >
                <span>📝 Launch Paper Generator</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>

              <button
                onClick={onOpenSettings}
                className="px-4 py-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-blue-200 hover:text-white border border-slate-700 text-xs font-bold flex items-center gap-2 transition-all"
              >
                <span>⚙️ Subject Settings</span>
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex items-center gap-4">
            <div className="p-3.5 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Assigned Subject</p>
              <p className="text-sm font-black text-white truncate max-w-[170px]">{currentUser.subject}</p>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex items-center gap-4">
            <div className="p-3.5 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 01-2-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Generated Papers</p>
              <p className="text-xl font-black text-white">4 Exam Papers</p>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex items-center gap-4">
            <div className="p-3.5 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 01-2-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div>
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Study Notes Available</p>
              <p className="text-xl font-black text-white">12 Files</p>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex items-center gap-4">
            <div className="p-3.5 rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 01-6 0v-1m6 0H9" />
              </svg>
            </div>
            <div>
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">HOD Requests</p>
              <p className="text-xl font-black text-purple-300">1 Pending</p>
            </div>
          </div>
        </div>

        {/* Primary Sub-Page Action Options */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            Faculty Portal Quick Options & Features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Question Paper Generator */}
            <div className="bg-slate-900 border border-slate-800 hover:border-blue-500/60 rounded-3xl p-6 shadow-xl space-y-4 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-600/30">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 01-2-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white">AI Question Paper Generator</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Configure syllabus PDF inputs, adjust Bloom's difficulty sliders, and generate live A4 examination papers with step-by-step teacher answer keys.
                </p>
              </div>
              <button
                onClick={() => onNavigateCenter('generator')}
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-600/30 transition-all"
              >
                Launch Paper Generator →
              </button>
            </div>

            {/* Card 2: Subject Teacher Notes & Materials */}
            <div className="bg-slate-900 border border-slate-800 hover:border-indigo-500/60 rounded-3xl p-6 shadow-xl space-y-4 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-600/30">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white">Subject Notes & Question Banks</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Upload unit-wise lecture slides, formula cheat sheets, and past question bank PDFs for <strong className="text-indigo-300">{currentUser.subject}</strong>.
                </p>
              </div>
              <button
                onClick={() => onNavigateCenter('notes')}
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/30 transition-all"
              >
                Access Subject Notes →
              </button>
            </div>

            {/* Card 3: Department Oversight & Requests */}
            <div className="bg-slate-900 border border-slate-800 hover:border-purple-500/60 rounded-3xl p-6 shadow-xl space-y-4 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-600/30">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white">Dept Oversight & Requests</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  HOD & Dean portal to track departmental faculty examination statuses, review generated PDFs, and send formal paper requests.
                </p>
              </div>
              <button
                onClick={() => {
                  if (currentUser.role === 'hod' || currentUser.role === 'principal') {
                    onNavigateCenter('oversight');
                  } else if (showToast) {
                    showToast('🔒 Access Restricted: Only HODs and Principals can send faculty paper requests.', 'info');
                  } else {
                    alert('Only HODs and Principals can send faculty paper requests.');
                  }
                }}
                className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md shadow-purple-600/30 transition-all"
              >
                {currentUser.role === 'hod' || currentUser.role === 'principal' ? 'Open Dept Oversight →' : 'HOD / Principal Only 🔒'}
              </button>
            </div>
          </div>
        </div>

        {/* Recent Examination Papers Feed */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-white flex items-center gap-2">
              <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Recent Examination Papers ({currentUser.collegeName || 'NMIET'})
            </h3>
            <span className="text-xs text-slate-400 font-mono">4 Papers Saved</span>
          </div>

          <div className="space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-colors gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold text-xs border border-blue-500/30">
                  STD X
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">First Term Physics Examination 2026-27</h4>
                  <p className="text-xs text-slate-400">Subject: Physics (Science Paper I) • Date: 2026-08-28 • 50 Marks</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onNavigateCenter('generator')}
                  className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors"
                >
                  Open & Edit
                </button>
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs border border-slate-700"
                >
                  Print PDF 🖨️
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-colors gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center font-bold text-xs border border-emerald-500/30">
                  STD XII
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">Pre-Board Chemistry Paper II</h4>
                  <p className="text-xs text-slate-400">Subject: Chemistry (Paper II) • Date: 2026-09-05 • 40 Marks</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onNavigateCenter('generator')}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs border border-slate-700"
                >
                  View Paper
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// 8. NAVBAR COMPONENT WITH CENTER NAVIGATION & PROFILE
// ----------------------------------------------------------------------
function Navbar({ 
  currentUser,
  onLogout,
  onOpenSettings,
  activeCenterTab,
  setActiveCenterTab,
  viewMode, 
  setViewMode, 
  presetExams, 
  activePresetId, 
  onSelectPreset,
  onOpenExportModal,
  onQuickPrint 
}) {
  return (
    <header className="sticky top-0 z-30 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 border-b border-blue-500/40 text-white shadow-xl py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4">
        
        {/* Top-Left Header: Academic Portal Pill & Logged-In College Subtitle */}
        <div className="flex flex-col items-start cursor-pointer" onClick={() => setActiveCenterTab('home')}>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full border border-blue-300/40 bg-blue-400/20 text-blue-100 text-[10px] font-bold uppercase tracking-wider mb-1 backdrop-blur-md shadow-inner">
            <span className="w-2 h-2 rounded-full bg-cyan-300 animate-ping"></span>
            ACADEMIC PORTAL
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight">
            {currentUser.collegeName || 'NMIET (Nutan Maharashtra Institute of Engineering & Technology)'}
          </h1>
          <p className="text-xs font-semibold text-blue-100/90 tracking-wide mt-0.5">
            Academic Portal • Study Materials, Question Banks, and Exam Generator
          </p>
        </div>

        {/* Center Dashboard Navigation Tabs */}
        <div className="flex items-center bg-blue-950/80 p-1 rounded-xl border border-blue-400/30 font-semibold text-xs">
          <button
            onClick={() => setActiveCenterTab('home')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeCenterTab === 'home'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 font-bold'
                : 'text-blue-200 hover:text-white'
            }`}
          >
            🏠 Home
          </button>

          <button
            onClick={() => setActiveCenterTab('generator')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeCenterTab === 'generator'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 font-bold'
                : 'text-blue-200 hover:text-white'
            }`}
          >
            📝 Question Paper Generator
          </button>

          <button
            onClick={() => setActiveCenterTab('notes')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeCenterTab === 'notes'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 font-bold'
                : 'text-blue-200 hover:text-white'
            }`}
          >
            📚 Subject Notes & Materials
          </button>

          {(currentUser.role === 'hod' || currentUser.role === 'principal') && (
            <button
              onClick={() => setActiveCenterTab('oversight')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                activeCenterTab === 'oversight'
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30 font-bold'
                  : 'text-purple-200 hover:text-white'
              }`}
            >
              🏢 Dept Oversight & Requests
            </button>
          )}
        </div>

        {/* Action Controls & Profile Badge */}
        <div className="flex items-center gap-3">
          
          {activeCenterTab === 'generator' && (
            <>
              {/* Student Paper vs Teacher Answer Key Toggle */}
              <div className="flex items-center bg-blue-950/80 p-1 rounded-xl border border-blue-400/30">
                <button
                  onClick={() => setViewMode('student')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    viewMode === 'student'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-blue-200 hover:text-white'
                  }`}
                >
                  Student Paper
                </button>
                <button
                  onClick={() => setViewMode('teacher')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    viewMode === 'teacher'
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'text-blue-200 hover:text-white'
                  }`}
                >
                  Teacher Answer Key
                </button>
              </div>

              {/* Export Button */}
              <button
                onClick={onOpenExportModal}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 shadow-md border border-slate-700"
              >
                <svg className="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Export
              </button>
            </>
          )}

          {/* User Profile, Settings & Logout */}
          <div className="flex items-center gap-2 bg-blue-950/80 p-1 pl-2.5 rounded-xl border border-blue-400/30">
            <div className="text-right text-[11px] hidden sm:block">
              <p className="font-bold text-white leading-tight">{currentUser.name}</p>
              <p className="text-[10px] text-cyan-200 font-semibold">{currentUser.roleTitle}</p>
            </div>
            
            {/* Settings Button */}
            <button
              onClick={onOpenSettings}
              className="p-1.5 bg-blue-900/60 hover:bg-blue-700 text-blue-200 hover:text-white rounded-lg transition-colors"
              title="Faculty Settings"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>

            {/* Logout Button */}
            <button
              onClick={onLogout}
              className="p-1.5 bg-blue-900/60 hover:bg-rose-600 text-blue-200 hover:text-white rounded-lg transition-colors"
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
// 9. CONTROLS PANEL COMPONENT (LEFT SIDEBAR)
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
          <span className="text-[11px] bg-blue-900/60 text-blue-300 font-semibold px-2.5 py-0.5 rounded border border-blue-700/50">
            {currentUser.roleTitle}
          </span>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          Assigned Faculty Subject: <strong className="text-blue-300">{currentUser.subject}</strong>
        </p>
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
              <label className="block text-[11px] font-medium text-slate-400 mb-1">Subject (Auto-Bound)</label>
              <input
                type="text"
                value={header.subject}
                onChange={(e) => onUpdateHeader('subject', e.target.value)}
                className="w-full bg-slate-900 border border-blue-500/60 rounded-lg px-2.5 py-1.5 text-xs text-blue-200 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
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
// 10. A4 PREVIEW PANEL COMPONENT
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
      <div className="w-full max-w-4xl bg-white dark:bg-slate-900 rounded-xl shadow-md border border-slate-200 dark:border-slate-800 p-2.5 mb-6 flex flex-wrap items-center justify-between gap-3 text-xs no-print">
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
// 11. SUBJECT TEACHER NOTES & STUDY MATERIALS VIEW
// ----------------------------------------------------------------------
function SubjectNotesView({ currentUser }) {
  return (
    <div className="flex-1 bg-slate-950 p-6 lg:p-10 overflow-y-auto font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blue-500/10 text-blue-300 border border-blue-400/30 text-xs font-bold uppercase mb-1">
              📚 Subject Learning Repository
            </div>
            <h2 className="text-2xl font-black text-white">{currentUser.subject}</h2>
            <p className="text-xs text-slate-400">Curated Lecture Notes, Question Banks, and Unit-wise Assignments for {currentUser.collegeName}</p>
          </div>

          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-600/30 flex items-center gap-2">
            + Upload New Notes / PDF
          </button>
        </div>

        {/* Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SUBJECT_NOTES_DATA.map((note) => (
            <div key={note.id} className="bg-slate-900 border border-slate-800 hover:border-blue-500/50 rounded-2xl p-5 space-y-3 shadow-xl transition-all">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-950 text-blue-300 border border-blue-800">
                  {note.type}
                </span>
                <span className="text-[10px] text-slate-500 font-mono">{note.size}</span>
              </div>

              <h3 className="font-bold text-sm text-white leading-snug">{note.title}</h3>
              <p className="text-xs text-slate-400 line-clamp-2">{note.summary}</p>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                <span>📥 {note.downloads} Downloads</span>
                <button className="text-blue-400 font-bold hover:underline">Download PDF ↓</button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// 12. HOD & PRINCIPAL DEPARTMENT OVERSIGHT VIEW
// ----------------------------------------------------------------------
function DepartmentOversightView({ currentUser, facultyPapers, onRequestPaper }) {
  return (
    <div className="flex-1 bg-slate-950 p-6 lg:p-10 overflow-y-auto font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-400/30 text-xs font-bold uppercase mb-1">
              🏢 Departmental Administrative Control
            </div>
            <h2 className="text-2xl font-black text-white">{currentUser.branch} - Faculty & Exam Tracker</h2>
            <p className="text-xs text-slate-400">Monitor generated question papers, track faculty status, and send paper requests across {currentUser.collegeName}</p>
          </div>
        </div>

        {/* Faculty Paper Status Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-4 border-b border-slate-800 bg-slate-900/60 flex items-center justify-between">
            <h3 className="font-bold text-sm text-white">Department Faculty & Examination Status</h3>
            <span className="text-xs text-slate-400 font-mono">Total Subjects: {facultyPapers.length}</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 font-semibold uppercase text-[10px] border-b border-slate-800">
                <tr>
                  <th className="p-3.5">Subject & Department</th>
                  <th className="p-3.5">Assigned Faculty Member</th>
                  <th className="p-3.5">Paper Generation Status</th>
                  <th className="p-3.5 text-right">Administrative Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {facultyPapers.map((fp) => (
                  <tr key={fp.id} className="hover:bg-slate-850/60 transition-colors">
                    <td className="p-3.5 font-bold text-white">
                      <p className="text-sm">{fp.subject}</p>
                      <p className="text-[10px] text-slate-500 font-medium">{fp.branch}</p>
                    </td>

                    <td className="p-3.5">
                      <p className="font-semibold text-slate-200">{fp.facultyName}</p>
                      <p className="text-[10px] text-slate-400 font-mono">{fp.facultyEmail}</p>
                    </td>

                    <td className="p-3.5">
                      {fp.status === 'generated' ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                          Generated ({fp.generatedPaperTitle})
                        </span>
                      ) : fp.status === 'requested' ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-950 text-blue-300 border border-blue-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
                          Request Sent to Faculty
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-950 text-amber-300 border border-amber-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                          Pending / Not Generated
                        </span>
                      )}
                    </td>

                    <td className="p-3.5 text-right">
                      {fp.status === 'generated' ? (
                        <button className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-lg text-xs">
                          View Paper PDF 👁️
                        </button>
                      ) : (currentUser.role === 'hod' || currentUser.role === 'principal') ? (
                        <button
                          onClick={() => onRequestPaper(fp.id, fp.facultyName, fp.subject)}
                          className="px-3 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-lg text-xs shadow-md shadow-blue-600/30"
                        >
                          📩 Request Faculty to Generate
                        </button>
                      ) : (
                        <span className="text-[11px] text-slate-500 font-medium">Pending Generation</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// 13. EXPORT MODAL COMPONENT
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

    if (selectedFormat === 'pdf') {
      setIsExporting(false);
      onClose();
      setTimeout(() => {
        window.print();
      }, 150);
      return;
    }

    setTimeout(() => {
      const text = generatePlainText();
      let mimeType = 'text/plain';
      let extension = 'txt';

      if (selectedFormat === 'word') {
        mimeType = 'application/msword';
        extension = 'doc';
      }

      const blob = new Blob([text], { type: `${mimeType};charset=utf-8` });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${(header.subject || 'Exam_Paper').replace(/[^a-zA-Z0-9]/g, '_')}_Paper_${selectedFormat.toUpperCase()}.${extension}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      setIsExporting(false);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in font-sans no-print" role="dialog">
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
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg">
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
            className="flex-1 py-2.5 rounded-xl border border-slate-700 bg-slate-800 text-slate-300 font-semibold text-xs"
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
// 14. MASTER APPLICATION CONTAINER (MANAGES AUTH & VIEWS)
// ----------------------------------------------------------------------
function MainAppContainer() {
  const [currentUser, setCurrentUser] = useState(null);
  const [activeCenterTab, setActiveCenterTab] = useState('home'); // Default landing sub-page: 'home' | 'generator' | 'notes' | 'oversight'
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [facultyPapers, setFacultyPapers] = useState(INITIAL_FACULTY_PAPERS);

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

  // Handle Login Success
  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    setActiveCenterTab('home');
    setHeader(prev => ({
      ...prev,
      schoolName: user.collegeName || 'NMIET (Nutan Maharashtra Institute of Engineering & Technology)',
      subject: user.subject || prev.subject
    }));
    showToast(`Welcome back, ${user.name}! Bound to ${user.collegeName}`);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveCenterTab('home');
  };

  // Save Settings Update
  const handleSaveSettings = (updatedUser) => {
    setCurrentUser(updatedUser);
    setHeader(prev => ({
      ...prev,
      subject: updatedUser.subject
    }));
    showToast('Faculty Profile & Assigned Subject updated successfully!');
  };

  // HOD Request Faculty to Generate Paper Action
  const handleRequestPaper = (paperId, facultyName, subject) => {
    setFacultyPapers(prev =>
      prev.map(fp => fp.id === paperId ? { ...fp, status: 'requested' } : fp)
    );
    showToast(`📩 Paper generation request sent to ${facultyName} for ${subject}!`);
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
        schoolName: currentUser ? currentUser.collegeName : selected.header.schoolName,
        subject: currentUser ? currentUser.subject : selected.header.subject
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

  const handleGeneratePaper = async () => {
    setIsGenerating(true);
    setGenerationProgress('1/3 Connecting to AI backend server...');

    try {
      // Try /api/generate-exam or /api/generate-paper
      let response = await fetch('http://localhost:5000/api/generate-exam', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          schoolName: header.schoolName,
          standard: header.standard,
          subject: header.subject,
          totalMarks: header.totalMarks,
          timeAllowed: header.timeAllowed,
          difficulty: difficulty,
          syllabusContext: sources.map(s => s.name).join(', ')
        })
      }).catch(() => null);

      if (!response || !response.ok) {
        // Fallback to /api/generate-paper
        const totalQuestions = 8;
        const totalMarks = Number(header.totalMarks) || 30;
        const easyPct = Number(difficulty.easy) || 30;
        const medPct = Number(difficulty.medium) || 50;
        let easy = Math.max(1, Math.round((easyPct / 100) * totalQuestions));
        let medium = Math.max(1, Math.round((medPct / 100) * totalQuestions));
        let difficult = Math.max(1, totalQuestions - (easy + medium));

        response = await fetch('http://localhost:5000/api/generate-paper', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            subject: header.subject || 'Physics',
            topic: header.subHeader || 'Unit Syllabus',
            className: `${header.standard || 'Grade 10'} (${header.division || 'All'})`,
            totalQuestions,
            totalMarks,
            difficulty: { easy, medium, difficult },
            questionTypes: ['MCQ', 'Short Answer', 'Numerical']
          })
        });
      }

      setGenerationProgress('2/3 Generating questions with Google Gemini API...');
      const data = await response.json();

      if (data.success && data.exam) {
        setGenerationProgress('3/3 Structuring A4 document layout...');
        if (data.exam.header) setHeader(data.exam.header);
        if (data.exam.sections) setSections(data.exam.sections);
        showToast('✨ AI Exam Paper generated successfully from live Gemini API!');
      } else if (data.success && data.paper) {
        setGenerationProgress('3/3 Structuring A4 document layout...');
        const rawQuestions = data.paper.questions || [];
        const mcqQuestions = rawQuestions.filter(q => q.type === 'MCQ' || (q.options && q.options.length > 0));
        const shortQuestions = rawQuestions.filter(q => q.type !== 'MCQ' && (q.difficulty === 'easy' || q.difficulty === 'medium'));
        const hardQuestions = rawQuestions.filter(q => q.type !== 'MCQ' && (q.difficulty === 'difficult' || q.difficulty === 'hard'));

        const formattedSections = [];
        let qCounter = 1;
        if (mcqQuestions.length > 0) {
          formattedSections.push({
            id: 'sec-a',
            title: 'SECTION A: MULTIPLE CHOICE QUESTIONS',
            subtitle: 'Select the correct alternative for each question.',
            marksPerQuestion: 1,
            questions: mcqQuestions.map(q => ({
              id: `ai-q-${qCounter}`,
              number: String(qCounter++),
              text: q.question,
              type: 'mcq',
              difficulty: q.difficulty === 'difficult' ? 'hard' : q.difficulty,
              marks: q.marks || 1,
              options: q.options || ['A', 'B', 'C', 'D'],
              answerKey: { correctOption: q.correctAnswer || '', solution: q.explanation || '', rubric: '1 Mark.' }
            }))
          });
        }
        if (shortQuestions.length > 0) {
          formattedSections.push({
            id: 'sec-b',
            title: 'SECTION B: SHORT ANSWER QUESTIONS',
            subtitle: 'Answer briefly with scientific principles.',
            marksPerQuestion: 2,
            questions: shortQuestions.map(q => ({
              id: `ai-q-${qCounter}`,
              number: String(qCounter++),
              text: q.question,
              type: 'short',
              difficulty: q.difficulty === 'difficult' ? 'hard' : q.difficulty,
              marks: q.marks || 2,
              options: [],
              answerKey: { correctOption: q.correctAnswer || '', solution: q.explanation || '', rubric: '2 Marks.' }
            }))
          });
        }
        if (hardQuestions.length > 0) {
          formattedSections.push({
            id: 'sec-c',
            title: 'SECTION C: NUMERICAL & ANALYTICAL PROBLEMS',
            subtitle: 'Solve with step-by-step calculations.',
            marksPerQuestion: 4,
            questions: hardQuestions.map(q => ({
              id: `ai-q-${qCounter}`,
              number: String(qCounter++),
              text: q.question,
              type: 'long',
              difficulty: 'hard',
              marks: q.marks || 4,
              options: [],
              answerKey: { correctOption: q.correctAnswer || '', solution: q.explanation || '', rubric: '4 Marks.' }
            }))
          });
        }
        if (formattedSections.length > 0) setSections(formattedSections);
        showToast('✨ AI Exam Paper generated successfully from live Gemini API!');
      } else {
        throw new Error(data.error || data.message || 'Failed to generate exam paper');
      }
    } catch (err) {
      console.warn('Backend API connection error:', err);
      showToast(`⚠️ Backend Notice: ${err.message}.`, 'warning');
    } finally {
      setIsGenerating(false);
      setGenerationProgress('');
    }
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

  if (!currentUser) {
    return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
  }

  const accessiblePresets = PRESET_EXAMS.filter(preset => {
    if (currentUser.role === 'principal' || currentUser.role === 'hod') return true;
    return currentUser.allowedSubjects.includes(preset.header.subject) || preset.header.subject === currentUser.subject;
  });

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      
      {/* Top Navbar */}
      <Navbar
        currentUser={currentUser}
        onLogout={handleLogout}
        onOpenSettings={() => setSettingsModalOpen(true)}
        activeCenterTab={activeCenterTab}
        setActiveCenterTab={setActiveCenterTab}
        viewMode={viewMode}
        setViewMode={setViewMode}
        presetExams={accessiblePresets.length > 0 ? accessiblePresets : PRESET_EXAMS}
        activePresetId={activePresetId}
        onSelectPreset={handleSelectPreset}
        onOpenExportModal={() => setExportModalOpen(true)}
        onQuickPrint={handleQuickPrint}
      />

      {/* Main Center Views Switcher */}
      {activeCenterTab === 'home' && (
        <HomePageSubPage
          currentUser={currentUser}
          onNavigateCenter={setActiveCenterTab}
          onOpenSettings={() => setSettingsModalOpen(true)}
          showToast={showToast}
        />
      )}

      {activeCenterTab === 'generator' && (
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
      )}

      {activeCenterTab === 'notes' && (
        <SubjectNotesView currentUser={currentUser} />
      )}

      {activeCenterTab === 'oversight' && (
        <DepartmentOversightView
          currentUser={currentUser}
          facultyPapers={facultyPapers}
          onRequestPaper={handleRequestPaper}
        />
      )}

      {/* Faculty Profile Settings Modal */}
      <FacultySettingsModal
        isOpen={settingsModalOpen}
        onClose={() => setSettingsModalOpen(false)}
        currentUser={currentUser}
        onSaveSettings={handleSaveSettings}
      />

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
        <div className="fixed bottom-6 right-6 z-50 animate-bounce-in no-print">
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
