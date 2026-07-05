import express from 'express';

const router = express.Router();

// Fetches all available quizzes
router.get("/quizzes");

// Student starts a quiz.
router.get("/quizzes/:id/play")

// Student submits the quiz.
router.post("quizzes/:id/submit")

router.get("/attempts/history")