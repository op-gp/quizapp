import type { Request, Response, NextFunction } from 'express';
import User from '../models/User.ts';
import { AuthRequest } from '../middleware/authMiddleware.ts';
import { sendSuccess } from '../utils/response';
import * as adminService from '../services/adminService.ts';

export const fetchUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching all users', error);
    res.status(500).json({ message: 'Error retrieving users', error });
  }
};

export const getUsers = fetchUsers;

export const deleteUser = async (req: AuthRequest, res: Response) => {
  try {
    const targetUserId = req.params.userId;
    const callerUser = await User.findById(req.user?.userId);
    const callerUserId = callerUser?.id;
    const callerUserRole = callerUser?.role;

    if (callerUserId === targetUserId) {
      return res.status(400).json({ message: 'You cannot delete your own account.' });
    }

    const targetUser = await User.findById(targetUserId);

    if (!targetUser) {
      console.error('adminController.ts: User to be deleted does not exist.');
      return res.status(404).json({ message: 'User does not exist' });
    }

    const isTargetAdmin = targetUser?.role === 'admin' || targetUser?.role === 'superadmin';
    if (isTargetAdmin && callerUserRole !== 'superadmin') {
      console.error('adminController.ts: Only super admins can delete admins.');
      return res.status(403).json({ message: 'Only Super Admins can delete Admins.' });
    }

    const userToDelete = await User.findByIdAndDelete(targetUserId);

    if (!userToDelete) {
      console.error('User could not be found.');
      return res.status(404).json({ message: 'User does not exist.' });
    }

    console.log('User (', userToDelete.username, ') has been successfully deleted.');
    res.status(200).json({ message: 'User below has been deleted', username: userToDelete.username });
  } catch (error) {
    console.error('Error in deleteUser controller', error);
    res.status(500).json({ message: 'Error in deleting user.' });
  }
};

export const createCategory = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { name, description } = req.body as { name: string; description: string };
    const result = await adminService.createCategory(name, description);
    sendSuccess(res, 'Category created successfully', result, 201);
  } catch (error) {
    next(error);
  }
};

export const getCategories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await adminService.getCategories();
    sendSuccess(res, 'Categories retrieved successfully', categories);
  } catch (error) {
    next(error);
  }
};

export const createQuiz = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { categoryId, title, description, timeLimit } = req.body as {
      categoryId: string;
      title: string;
      description: string;
      timeLimit: number;
    };

    const result = await adminService.createQuiz(
      categoryId,
      title,
      description,
      Number(timeLimit),
      req.user?.userId,
    );
    sendSuccess(res, 'Quiz created successfully', result, 201);
  } catch (error) {
    next(error);
  }
};

export const getQuizzes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const quizzes = await adminService.getQuizzes();
    sendSuccess(res, 'Quizzes retrieved successfully', quizzes);
  } catch (error) {
    next(error);
  }
};

export const addQuestion = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { questionText, points, options } = req.body as {
      questionText: string;
      points: number;
      options: { optionText: string; isCorrect: boolean }[];
    };
    const { quizId } = req.params;
    const result = await adminService.addQuestion(quizId, questionText, Number(points), options);
    sendSuccess(res, 'Question added successfully', result, 201);
  } catch (error) {
    next(error);
  }
};

export const createAdmin = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    res.status(501).json({ message: 'createAdmin route not implemented yet' });
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { categoryId } = req.params;
    const result = await adminService.deleteCategory(categoryId);
    sendSuccess(res, 'Category deleted successfully', result);
  } catch (error) {
    next(error);
  }
};

export const deleteQuiz = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { quizId } = req.params;
    const result = await adminService.deleteQuiz(quizId);
    sendSuccess(res, 'Quiz deleted successfully', result);
  } catch (error) {
    next(error);
  }
};

export const getQuestionsForQuiz = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { quizId } = req.params;
    const questions = await adminService.getQuestionsForQuiz(quizId);
    sendSuccess(res, 'Questions retrieved successfully', questions);
  } catch (error) {
    next(error);
  }
};

export const deleteQuestion = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { questionId } = req.params;
    const result = await adminService.deleteQuestion(questionId);
    sendSuccess(res, 'Question deleted successfully', result);
  } catch (error) {
    next(error);
  }
};

export const editQuestion = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { questionId } = req.params;
    const { questionText, points, options } = req.body as {
      questionText: string;
      points: number;
      options: { optionText: string; isCorrect: boolean }[];
    };
    const result = await adminService.editQuestion(questionId, questionText, Number(points), options);
    sendSuccess(res, 'Question updated successfully', result);
  } catch (error) {
    next(error);
  }
};
