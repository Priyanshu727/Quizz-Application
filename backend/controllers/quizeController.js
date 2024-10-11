const mongoose = require('mongoose');
const Quiz = require('../models/quizeModel');


// Create a new quiz
const createQuiz = async (req, res) => {
    const { title, description, questions } = req.body;

    try {
        const quiz = new Quiz({
            title,
            description,
            questions
        });

        const savedQuiz = await quiz.save();
        res.status(201).json(savedQuiz);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Fetch all quizzes
const getQuizzes = async (req, res) => {
    try {
        const quizzes = await Quiz.find();
        res.status(200).json(quizzes);
    } catch (error) {
        res.status(500).json({ message: "Error fetching quizzes" });
    }
};

// Fetch a quiz by ID
const getQuizById = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id);
        if (!quiz) return res.status(404).json({ message: "Quiz not found" });
        res.status(200).json(quiz);
    } catch (error) {
        res.status(500).json({ message: "Error fetching quiz" });
    }
};

// Submit a quiz and calculate score
const submitQuiz = async (req, res) => {
    const quizId = req.params.id; // Extract quiz ID from URL params
    const { answers } = req.body; // Extract user's answers from request body

    // Validate the answers input
    if (!Array.isArray(answers)) {
        return res.status(400).json({ message: "Answers must be provided as an array." });
    }

    try {
        const quiz = await Quiz.findById(quizId);
        if (!quiz) return res.status(404).json({ message: "Quiz not found" });

        let score = 0;
        quiz.questions.forEach((question, index) => {
            if (question.correctAnswer === answers[index]) {
                score += 1;
            }
        });

        // Return the quiz, score, and user's answers in the response
        res.status(200).json({
            score,
            totalQuestions: quiz.questions.length,
            quiz, // Full quiz object
            userAnswers: answers, // User's answers array
        });
    } catch (error) {
        console.error("Error submitting quiz:", error);
        res.status(500).json({ message: "Error submitting quiz", error: error.message });
    }
};




module.exports = { getQuizzes, getQuizById, submitQuiz, createQuiz };
