import express from 'express';
import { getQuizzes, startQuizAttempt, submitQuizAttempt, getAttemptsHistory, getLeaderboard } from '../controllers/studentController.ts';}
import { verifyRole, verifyToken } from '../middleware/authMiddleware.ts';

const router = express.Router();

router.use(verifyToken);
router.use(verifyRole(['Student']));

router.get('/quizzes', getQuizzes);

router.get('/quizzes/:quizId/play', startQuizAttempt);

router.post('/quizzes/:quizId/submit', submitQuizAttempt);

router.get('/attempts/history', getAttemptsHistory);

router.get('/quizzes/:quizId/leaderboard', getLeaderboard);
