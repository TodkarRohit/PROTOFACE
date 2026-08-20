// Mock Data for AI Exam Paper Generator

export const PRESET_EXAMS = [
  {
    id: 'physics-10',
    name: 'Physics: Gravitation & Motion (Std X)',
    header: {
      schoolName: "ST. XAVIER'S HIGH SCHOOL & JR. COLLEGE",
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
      schoolName: 'ROYAL ACADEMY OF SCIENCE & TECHNOLOGY',
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

export const QUESTION_POOL = {
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
    },
    {
      text: 'Define Inertia of Rest with a daily life example.',
      options: [],
      answerKey: {
        solution: 'The inherent property of a body to resist any change in its state of rest. Example: Passengers jerk backwards when a bus starts suddenly.',
        rubric: '1 Mark definition, 1 Mark example.'
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
    },
    {
      text: 'A car accelerates uniformly from 18 km/h to 36 km/h in 5 seconds. Calculate the acceleration and distance covered.',
      options: [],
      answerKey: {
        solution: 'u = 5 m/s, v = 10 m/s, t = 5 s. a = (v-u)/t = 1 m/s². s = ut + 0.5at² = 25 + 12.5 = 37.5 meters.',
        rubric: '1.5 Marks for acceleration, 1.5 Marks for distance.'
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
    },
    {
      text: 'Two bodies of masses 10 kg and 20 kg are connected by a light inextensible string passing over a frictionless pulley. Calculate acceleration of the system and tension in the string.',
      options: [],
      answerKey: {
        solution: 'a = (m2 - m1)g / (m1 + m2) = (20-10)*9.8 / 30 = 3.27 m/s².\nT = 2*m1*m2*g / (m1+m2) = 2*10*20*9.8 / 30 = 130.67 N.',
        rubric: '2.5 Marks acceleration, 2.5 Marks tension.'
      }
    }
  ]
};
