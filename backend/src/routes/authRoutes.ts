import express from 'express';
import { register, login, getProfile, forgotPassword, resetPassword, verifyAccount, verifyLogin, completeRegistration } from '../controllers/authController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', register);

router.post('/login', login);

router.get('/profile', verifyToken, getProfile);

router.post('/forgot-password', forgotPassword);

router.post('/reset-password', resetPassword);

router.post('/verify-account', verifyAccount);

router.post('/verify-login', verifyLogin);
router.post('/complete-registration', completeRegistration);


export default router;