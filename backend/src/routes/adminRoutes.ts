import express from 'express';
import { createCategory, createQuiz, addQuestion, createAdmin, getCategories, getQuizzes, getUsers, deleteUser, deleteCategory, deleteQuiz, deleteQuestion, editQuestion, getQuestionsForQuiz } from '../controllers/adminController.ts';
import { verifyRole, verifyToken } from "../middleware/authMiddleware.ts";

const router = express.Router();

router.use(verifyToken);
router.use(verifyRole(['admin']));

router.post('/categories', createCategory);
router.get('/categories', adminController.getCategories);

router.post('/quizzes', adminController.createQuiz);
router.get('/quizzes', adminController.getQuizzes);

router.post('/quizzes/:quizId/questions', adminController.addQuestion);

router.post('/create-admin', adminController.createAdmin);

router.get('/users', adminController.getUsers);
router.delete('/users/:userId', adminController.deleteUser);

router.delete('/categories/:categoryId', adminController.deleteCategory);
router.delete('/quizzes/:quizId', adminController.deleteQuiz);
router.get('/quizzes/:quizId/questions', adminController.getQuestionsForQuiz);
router.delete('/questions/:questionId', adminController.deleteQuestion);
router.put('/questions/:questionId', adminController.editQuestion);

export default router;