import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend clients
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Supabase Client Initialization
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
let supabase = null;

if (supabaseUrl && supabaseKey && supabaseUrl !== 'https://your-project-id.supabase.co') {
  supabase = createClient(supabaseUrl, supabaseKey);
  console.log('⚡ Supabase Client initialized successfully!');
} else {
  console.log('ℹ️ Supabase not configured in .env (Add SUPABASE_URL & SUPABASE_KEY to enable cloud storage)');
}

// Helper function to query Google Gemini 2.0 Flash API
async function callGeminiAPI(promptText) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'your_gemini_api_key_here') {
    throw new Error('GEMINI_API_KEY is missing in backend environment variables (.env). Get one at https://aistudio.google.com/');
  }

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: promptText }] }],
      generationConfig: {
        responseMimeType: 'application/json'
      }
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini API Error (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  const rawJsonString = data.candidates?.[0]?.content?.parts?.[0]?.text;
  return JSON.parse(rawJsonString);
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'ExamCraft AI Backend Running!',
    supabaseConnected: Boolean(supabase)
  });
});

// Endpoint 1: Generate Full AI Exam Paper
app.post('/api/generate-exam', async (req, res) => {
  try {
    const {
      schoolName = "St. Xavier's High School",
      standard = "STD X",
      subject = "Science & Physics",
      totalMarks = 50,
      timeAllowed = "2 Hours",
      difficulty = { easy: 30, medium: 50, hard: 20 },
      syllabusContext = ""
    } = req.body;

    const prompt = `You are an expert educational assessment generator for schools and colleges.
Generate a complete, high-quality exam paper in JSON format based on the following specifications:

- School Name: ${schoolName}
- Grade/Standard: ${standard}
- Subject: ${subject}
- Total Marks: ${totalMarks}
- Duration: ${timeAllowed}
- Cognitive Difficulty Weighting: ${difficulty.easy}% Easy, ${difficulty.medium}% Medium, ${difficulty.hard}% Hard.
- Syllabus/Reference Context: ${syllabusContext || 'Standard curriculum concepts for this grade and subject.'}

Strictly return valid JSON adhering EXACTLY to this schema:
{
  "id": "exam-generated-${Date.now()}",
  "name": "${subject} - AI Generated Assessment",
  "header": {
    "schoolName": "${schoolName}",
    "subHeader": "ANNUAL ASSESSMENT / EXAM - 2026",
    "standard": "${standard}",
    "division": "Div A & B",
    "subject": "${subject}",
    "date": "${new Date().toISOString().split('T')[0]}",
    "totalMarks": ${totalMarks},
    "timeAllowed": "${timeAllowed}",
    "instructions": [
      "All questions are compulsory.",
      "Draw neat diagrams wherever relevant.",
      "Figures to the right indicate full marks."
    ]
  },
  "difficulty": { "easy": ${difficulty.easy}, "medium": ${difficulty.medium}, "hard": ${difficulty.hard} },
  "sections": [
    {
      "id": "sec-a",
      "title": "SECTION A: MULTIPLE CHOICE QUESTIONS",
      "subtitle": "Select the correct alternative.",
      "marksPerQuestion": 1,
      "questions": [
        {
          "id": "q1",
          "number": "1",
          "text": "Question prompt here?",
          "type": "mcq",
          "difficulty": "easy",
          "marks": 1,
          "options": ["A) Option 1", "B) Option 2", "C) Option 3", "D) Option 4"],
          "answerKey": {
            "correctOption": "A) Option 1",
            "solution": "Step-by-step solution text.",
            "rubric": "1 Mark for correct option."
          }
        }
      ]
    },
    {
      "id": "sec-b",
      "title": "SECTION B: SHORT ANSWER QUESTIONS",
      "subtitle": "Answer in brief.",
      "marksPerQuestion": 2,
      "questions": [
        {
          "id": "q2",
          "number": "2",
          "text": "Short answer question prompt?",
          "type": "short",
          "difficulty": "medium",
          "marks": 2,
          "answerKey": {
            "correctOption": null,
            "solution": "Step 1: ... Step 2: ...",
            "rubric": "1 mark for definition, 1 mark for example."
          }
        }
      ]
    }
  ]
}

Include 4-5 MCQs in Section A and 3-4 Short/Long Answer Questions in Section B/C totaling around ${totalMarks} marks.`;

    const examData = await callGeminiAPI(prompt);
    res.json({ success: true, exam: examData });
  } catch (error) {
    console.error('Error generating exam paper:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Endpoint 2: Swap / Regenerate Single Question
app.post('/api/swap-question', async (req, res) => {
  try {
    const { currentQuestion, subject = "General", difficulty = "medium", type = "short" } = req.body;

    const prompt = `Generate 1 alternative replacement question for an exam paper on the subject "${subject}".
The previous question was: "${currentQuestion?.text || ''}".
The new question must match:
- Type: ${type} (mcq, short, or long)
- Difficulty: ${difficulty}
- Marks: ${currentQuestion?.marks || 2}

Return ONLY valid JSON matching this question structure:
{
  "id": "q-swap-${Date.now()}",
  "number": "${currentQuestion?.number || '1'}",
  "text": "New replacement question text...",
  "type": "${type}",
  "difficulty": "${difficulty}",
  "marks": ${currentQuestion?.marks || 2},
  "options": ${type === 'mcq' ? '["A) ...", "B) ...", "C) ...", "D) ..."]' : 'null'},
  "answerKey": {
    "correctOption": ${type === 'mcq' ? '"A) ..."' : 'null'},
    "solution": "Clear step-by-step answer key solution.",
    "rubric": "Marking breakdown guidance."
  }
}`;

    const newQuestion = await callGeminiAPI(prompt);
    res.json({ success: true, question: newQuestion });
  } catch (error) {
    console.error('Error swapping question:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Endpoint 3: Save Exam to Supabase Database
app.post('/api/save-exam', async (req, res) => {
  try {
    if (!supabase) {
      return res.status(400).json({
        success: false,
        error: 'Supabase credentials not configured in backend .env file.'
      });
    }

    const { header, sections, difficulty, title = 'Untitled Exam' } = req.body;

    const { data, error } = await supabase
      .from('exams')
      .insert([
        {
          title: title || header?.subject || 'Exam Paper',
          subject: header?.subject || 'General',
          standard: header?.standard || 'STD X',
          total_marks: header?.totalMarks || 50,
          header_data: header,
          sections_data: sections,
          difficulty_data: difficulty
        }
      ])
      .select();

    if (error) throw error;

    res.json({ success: true, message: 'Exam saved to Supabase cloud successfully!', exam: data[0] });
  } catch (error) {
    console.error('Error saving to Supabase:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Endpoint 4: Get All Saved Exams from Supabase
app.get('/api/saved-exams', async (req, res) => {
  try {
    if (!supabase) {
      return res.status(400).json({
        success: false,
        error: 'Supabase credentials not configured in backend .env file.'
      });
    }

    const { data, error } = await supabase
      .from('exams')
      .select('id, title, subject, standard, total_marks, created_at')
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json({ success: true, exams: data });
  } catch (error) {
    console.error('Error fetching saved exams from Supabase:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Endpoint 5: User Registration Endpoint (Supabase / Local)
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, username, email, password, role = 'teacher', collegeName, branch, subject } = req.body;

    if (!name || !username || !email || !password) {
      return res.status(400).json({ success: false, error: 'Name, username, email, and password are required.' });
    }

    const roleTitle = role === 'teacher' ? 'Subject Teacher' : role === 'hod' ? 'Head of Department (HOD)' : 'Principal / Dean';

    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('users')
          .insert([{
            name, username, email, password, role,
            role_title: roleTitle,
            college_name: collegeName || 'NMIET',
            branch: branch || 'General',
            subject: subject || 'General'
          }])
          .select();

        if (!error && data?.length) {
          const u = data[0];
          return res.json({
            success: true,
            user: {
              id: u.id,
              name: u.name,
              username: u.username,
              email: u.email,
              role: u.role,
              roleTitle: u.role_title,
              collegeName: u.college_name,
              branch: u.branch,
              subject: u.subject,
              allowedSubjects: [u.subject]
            }
          });
        }
      } catch (err) {
        console.warn('Supabase users table insert notice:', err.message);
      }
    }

    // Fallback return registered user object
    const newUser = {
      id: `usr-${Date.now()}`,
      name, username, email, role, roleTitle,
      collegeName: collegeName || 'NMIET',
      branch: branch || 'General',
      subject: subject || 'General',
      allowedSubjects: [subject || 'General']
    };

    res.json({ success: true, user: newUser });
  } catch (error) {
    console.error('Registration error:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Endpoint 6: User Login Endpoint (Supabase / Local)
app.post('/api/auth/login', async (req, res) => {
  try {
    const { usernameInput, passwordInput } = req.body;

    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .or(`username.eq.${usernameInput},email.eq.${usernameInput}`)
          .eq('password', passwordInput)
          .single();

        if (data) {
          const user = {
            id: data.id,
            name: data.name,
            username: data.username,
            email: data.email,
            role: data.role,
            roleTitle: data.role_title,
            collegeName: data.college_name,
            branch: data.branch,
            subject: data.subject,
            allowedSubjects: [data.subject]
          };
          return res.json({ success: true, user });
        }
      } catch (err) {
        console.warn('Supabase login check fallback:', err.message);
      }
    }

    res.status(401).json({ success: false, error: 'Invalid username/email or password.' });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 ExamCraft AI Backend Server running at http://localhost:${PORT}`);
});
