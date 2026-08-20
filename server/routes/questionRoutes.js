const express = require('express');
const QuestionController = require('../controllers/questionController');

const router = express.Router();

// GET /api/health
router.get('/health', QuestionController.getHealth);

// POST /api/generate-paper
router.post('/generate-paper', QuestionController.generatePaper);

module.exports = router;
