import express from 'express';

import { register, login, refreshToken, logout } from "../controllers/authController.ts";

const router = express.Router();

// Register POST request. api/auth/register
router.post("/register", register)

// Login POST request. api/auth/login
router.post("/login", login)

// Register GET request for Refresh Token
router.get(`/refresh`, refreshToken);

// Register POST request for Logout
router.post(`/logout`, logout)


export default router;