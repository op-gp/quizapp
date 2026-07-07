import type { Response, NextFunction } from 'express';
import type { AuthRequest } from '../middleware/authMiddleware.js';
import { sendSuccess } from '../utils/response.js';
import * as studentService from '../services/studentService.js';

export const getQuizzes = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const quizzes = await studentService.getQuizzes();
    sendSuccess(res, 'Quizzes list retrieved successfully', quizzes, 200);
  } catch (error) {
    next(error);
  }
};

export const startQuizAttempt = async (
  req: AuthRequest<{ quizId: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const quizId = req.params.quizId;
    const result = await studentService.startQuizAttempt(quizId);
    sendSuccess(res, 'Quiz loaded successfully', result, 200);
  } catch (error) {
    next(error);
  }
};

export const submitQuizAttempt = async (
  req: AuthRequest<{ quizId: string }, any, { answers: { questionId: string; selectedOptionId: string | null }[]; startedAt: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const quizId = req.params.quizId;
    const userId = req.user?.userId;
    const { answers, startedAt } = req.body;

    const result = await studentService.submitQuizAttempt(quizId, userId, answers, startedAt);
    sendSuccess(res, 'Submission evaluated and logged successfully', result, 200);
  } catch (error) {
    next(error);
  }
};

export const getAttemptsHistory = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const attempts = await studentService.getAttemptsHistory(req.user?.userId);
    sendSuccess(res, 'Attempts history retrieved successfully', attempts, 200);
  } catch (error) {
    next(error);
  }
};

export const getLeaderboard = async (
  req: AuthRequest<{ quizId: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const leaderboard = await studentService.getLeaderboard(req.params.quizId);
    sendSuccess(res, 'Leaderboard retrieved successfully', leaderboard, 200);
  } catch (error) {
    next(error);
  }
};

