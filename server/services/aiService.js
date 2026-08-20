const { GoogleGenAI, Type } = require('@google/genai');

/**
 * Question Paper Schema definition for Gemini structured output
 */
const questionPaperResponseSchema = {
  type: Type.OBJECT,
  properties: {
    subject: { type: Type.STRING, description: "The academic subject of the paper" },
    topic: { type: Type.STRING, description: "The specific topic or syllabus unit" },
    className: { type: Type.STRING, description: "Target grade / class / standard" },
    totalQuestions: { type: Type.INTEGER, description: "Total number of questions generated" },
    totalMarks: { type: Type.NUMBER, description: "Total marks allocated across all questions" },
    questions: {
      type: Type.ARRAY,
      description: "List of generated questions matching the exact requested distribution",
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.INTEGER, description: "Sequential question number starting from 1" },
          question: { type: Type.STRING, description: "The full question text or problem statement" },
          difficulty: { 
            type: Type.STRING, 
            description: "Difficulty level: 'easy', 'medium', or 'difficult'" 
          },
          type: { 
            type: Type.STRING, 
            description: "Question type (e.g., MCQ, Short Answer, Numerical, Long Answer)" 
          },
          marks: { type: Type.NUMBER, description: "Marks allocated for this specific question" },
          options: {
            type: Type.ARRAY,
            description: "Options array for MCQ (4 options). For non-MCQ, this must be empty []",
            items: { type: Type.STRING }
          },
          correctAnswer: { 
            type: Type.STRING, 
            description: "The correct option key or answer text" 
          },
          explanation: { 
            type: Type.STRING, 
            description: "Step-by-step solution, rationale, or marking criteria" 
          }
        },
        required: [
          'id',
          'question',
          'difficulty',
          'type',
          'marks',
          'options',
          'correctAnswer',
          'explanation'
        ]
      }
    }
  },
  required: ['subject', 'topic', 'className', 'totalQuestions', 'totalMarks', 'questions']
};

/**
 * Service to generate structured question papers using Gemini AI
 */
class AIService {
  /**
   * Generates a question paper using Gemini API structured output
   * @param {Object} params 
   * @param {string} params.subject
   * @param {string} params.topic
   * @param {string} params.className
   * @param {number} params.totalQuestions
   * @param {number} params.totalMarks
   * @param {Object} params.difficulty - { easy: number, medium: number, difficult: number }
   * @param {string[]} params.questionTypes - Array of requested question types
   * @returns {Promise<Object>} The generated question paper
   */
  static async generateQuestionPaper({
    subject,
    topic,
    className,
    totalQuestions,
    totalMarks,
    difficulty,
    questionTypes
  }) {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey === 'YOUR_API_KEY' || apiKey === 'YOUR_API_KEY_HERE') {
      const error = new Error('Gemini API key is not configured. Please set a valid GEMINI_API_KEY in server/.env');
      error.statusCode = 500;
      throw error;
    }

    const ai = new GoogleGenAI({ apiKey });
    const modelName = process.env.GEMINI_MODEL || 'gemini-flash-latest';

    const prompt = `
You are an expert academic examiner and curriculum specialist.
Generate a high-quality, comprehensive examination question paper based on the following specifications:

SPECIFICATIONS:
- Subject: "${subject}"
- Topic/Chapter: "${topic}"
- Target Class/Grade: "${className}"
- Total Questions: ${totalQuestions}
- Total Marks: ${totalMarks}
- Question Types Allowed: ${questionTypes.join(', ')}

DIFFICULTY DISTRIBUTION (STRICT REQUIREMENT):
- Easy Questions: Exactly ${difficulty.easy}
- Medium Questions: Exactly ${difficulty.medium}
- Difficult Questions: Exactly ${difficulty.difficult}
The total count (${difficulty.easy} + ${difficulty.medium} + ${difficulty.difficult}) equals ${totalQuestions}.

PEDAGOGICAL & DIFFICULTY RULES:
1. EASY (${difficulty.easy} questions):
   - Focus on basic concepts, definitions, direct formulas, simple calculations.
   - Cognitive level: Remember / Understand (Bloom's Taxonomy).
   - One-step reasoning or direct recall.

2. MEDIUM (${difficulty.medium} questions):
   - Focus on conceptual understanding, application-based scenarios, moderate calculations.
   - Cognitive level: Apply / Analyze (Bloom's Taxonomy).
   - Requires 2-3 logical steps to solve.

3. DIFFICULT (${difficulty.difficult} questions):
   - Focus on deep conceptual synthesis, complex problem solving, multi-step calculations, real-world case scenarios.
   - Cognitive level: Evaluate / Create / Deep Analysis (Bloom's Taxonomy).
   - High-order thinking and rigorous formulation.

MARKS DISTRIBUTION:
- The sum of marks across all ${totalQuestions} questions MUST add up to EXACTLY ${totalMarks}.
- Distribute marks proportionally and logically according to question types and difficulty.

FORMATTING REQUIREMENTS:
- For MCQ questions: Provide 4 distinct options in the "options" array (e.g. ["A) ...", "B) ...", "C) ...", "D) ..."] or standard option texts) and set "correctAnswer" to the correct option.
- For Non-MCQ questions (Short Answer, Numerical, Long Answer, etc.): Set "options" to an empty array [].
- "correctAnswer": Provide the concise correct answer / key.
- "explanation": Provide a clear, step-by-step solution, formula derivation, or marking guide.
- Sequential numbering: Assign 'id' from 1 to ${totalQuestions}.

Generate the full question paper now adhering strictly to the JSON schema.
`.trim();

    const candidateModels = [
      process.env.GEMINI_MODEL || 'gemini-flash-latest',
      'gemini-3.6-flash',
      'gemini-3.5-flash'
    ];

    let lastError = null;

    for (const modelName of candidateModels) {
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            responseSchema: questionPaperResponseSchema,
            temperature: 0.7,
          }
        });

        let rawContent = response.text;
        if (typeof rawContent === 'function') {
          rawContent = rawContent();
        }

        if (!rawContent) {
          throw new Error('Received empty response from Gemini AI');
        }

        let parsedPaper;
        try {
          parsedPaper = JSON.parse(rawContent);
        } catch (parseErr) {
          throw new Error(`Failed to parse AI response as JSON: ${parseErr.message}`);
        }

        // Ensure properties and clean up question format
        const cleanedPaper = {
          subject: parsedPaper.subject || subject,
          topic: parsedPaper.topic || topic,
          className: parsedPaper.className || className,
          totalQuestions: parsedPaper.totalQuestions || totalQuestions,
          totalMarks: parsedPaper.totalMarks || totalMarks,
          questions: (parsedPaper.questions || []).map((q, idx) => ({
            id: q.id || idx + 1,
            question: q.question,
            difficulty: (q.difficulty || 'medium').toLowerCase(),
            type: q.type || questionTypes[0] || 'MCQ',
            marks: typeof q.marks === 'number' ? q.marks : 1,
            options: Array.isArray(q.options) ? q.options : [],
            correctAnswer: q.correctAnswer || '',
            explanation: q.explanation || ''
          }))
        };

        return cleanedPaper;
      } catch (err) {
        lastError = err;
        console.warn(`Model ${modelName} encountered error: ${err.message}. Trying next candidate if available...`);
        // If it's a client/auth error, don't retry other models
        if (err.statusCode === 400 || err.statusCode === 401 || err.statusCode === 403) {
          throw err;
        }
      }
    }

    if (lastError) {
      if (!lastError.statusCode) {
        lastError.statusCode = lastError.status || 500;
      }
      throw lastError;
    }
  }
}

module.exports = AIService;
