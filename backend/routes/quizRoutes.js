const express = require('express');
const { getQuizzes, getQuizById, submitQuiz,createQuiz} = require('../controllers/quizeController');
const router = express.Router();

router.get('/', getQuizzes);
router.get('/:id', getQuizById);
router.post('/:id/submit', submitQuiz);
router.post('/', createQuiz);

module.exports = router;
