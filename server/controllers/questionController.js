const AIService = require('../services/aiService');

/**
 * Question Controller for handling health check and paper generation
 */
class QuestionController {
  /**
   * Health check endpoint
   * GET /api/health
   */
  static getHealth(req, res) {
    return res.status(200).json({
      success: true,
      message: "AI Question Paper API is running"
    });
  }

  /**
   * Generates question paper using Gemini AI
   * POST /api/generate-paper
   */
  static async generatePaper(req, res) {
    try {
      const {
        subject,
        topic,
        className,
        totalQuestions,
        totalMarks,
        difficulty,
        questionTypes
      } = req.body;

      // 1. Validate subject
      if (!subject || typeof subject !== 'string' || subject.trim() === '') {
        return res.status(400).json({
          success: false,
          message: "Validation Error: 'subject' is required and must be a non-empty string"
        });
      }

      // 2. Validate topic
      if (!topic || typeof topic !== 'string' || topic.trim() === '') {
        return res.status(400).json({
          success: false,
          message: "Validation Error: 'topic' is required and must be a non-empty string"
        });
      }

      // 3. Validate className
      if (!className || typeof className !== 'string' || className.trim() === '') {
        return res.status(400).json({
          success: false,
          message: "Validation Error: 'className' is required and must be a non-empty string"
        });
      }

      // 4. Validate totalQuestions
      const numQuestions = Number(totalQuestions);
      if (!Number.isInteger(numQuestions) || numQuestions <= 0) {
        return res.status(400).json({
          success: false,
          message: "Validation Error: 'totalQuestions' must be an integer greater than 0"
        });
      }

      // 5. Validate totalMarks
      const numMarks = Number(totalMarks);
      if (isNaN(numMarks) || numMarks <= 0) {
        return res.status(400).json({
          success: false,
          message: "Validation Error: 'totalMarks' must be a number greater than 0"
        });
      }

      // 6. Validate questionTypes
      if (!Array.isArray(questionTypes) || questionTypes.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Validation Error: 'questionTypes' must be a non-empty array of question types"
        });
      }

      // 7. Validate difficulty distribution
      if (!difficulty || typeof difficulty !== 'object') {
        return res.status(400).json({
          success: false,
          message: "Validation Error: 'difficulty' object with easy, medium, and difficult counts is required"
        });
      }

      const easy = Number(difficulty.easy ?? 0);
      const medium = Number(difficulty.medium ?? 0);
      const difficult = Number(difficulty.difficult ?? 0);

      if (
        !Number.isInteger(easy) || easy < 0 ||
        !Number.isInteger(medium) || medium < 0 ||
        !Number.isInteger(difficult) || difficult < 0
      ) {
        return res.status(400).json({
          success: false,
          message: "Validation Error: Difficulty counts for easy, medium, and difficult must be non-negative integers"
        });
      }

      const difficultySum = easy + medium + difficult;
      if (difficultySum !== numQuestions) {
        return res.status(400).json({
          success: false,
          message: `Invalid difficulty distribution: easy (${easy}) + medium (${medium}) + difficult (${difficult}) = ${difficultySum}, but totalQuestions is ${numQuestions}`
        });
      }

      // Call AI Service
      const paper = await AIService.generateQuestionPaper({
        subject: subject.trim(),
        topic: topic.trim(),
        className: className.trim(),
        totalQuestions: numQuestions,
        totalMarks: numMarks,
        difficulty: { easy, medium, difficult },
        questionTypes
      });

      return res.status(200).json({
        success: true,
        paper
      });
    } catch (err) {
      console.error('Error generating question paper:', err);

      const statusCode = err.statusCode || 500;
      return res.status(statusCode).json({
        success: false,
        message: err.message || "An unexpected error occurred while generating the question paper"
      });
    }
  }
}

module.exports = QuestionController;
