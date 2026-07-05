import express from 'express';

import { register, login } from "../controllers/authController.ts";

const router = express.Router();

// Register POST request. api/auth/register
router.post("/register", register)

// Login POST request. api/auth/login
router.post("/login", login)



export default router;