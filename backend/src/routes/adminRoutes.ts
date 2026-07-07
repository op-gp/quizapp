import express from 'express';
import {
  createCategory,
  getCategories,
  createQuiz,
  getQuizzes,
  addQuestion,
  createAdmin,
  getUsers,
  deleteUser,
  deleteCategory,
  deleteQuiz,
  getQuestionsForQuiz,
  deleteQuestion,
  editQuestion,
} from '../controllers/adminController.ts';
import { verifyRole, verifyToken } from '../middleware/authMiddleware.ts';

const router = express.Router();

router.use(verifyToken);
router.use(verifyRole(['Admin']));

router.post('/categories', createCategory);
router.get('/categories', getCategories);

router.post('/quizzes', createQuiz);
router.get('/quizzes', getQuizzes);

router.post('/quizzes/:quizId/questions', addQuestion);

router.post('/create-admin', createAdmin);

router.get('/users', getUsers);
router.delete('/users/:userId', deleteUser);

router.delete('/categories/:categoryId', deleteCategory);
router.delete('/quizzes/:quizId', deleteQuiz);
router.get('/quizzes/:quizId/questions', getQuestionsForQuiz);
router.delete('/questions/:questionId', deleteQuestion);
router.put('/questions/:questionId', editQuestion);

export default router;
