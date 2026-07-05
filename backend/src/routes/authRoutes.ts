import express from 'express';

import { register, login, fetchUsers, deleteUser } from "../controllers/authController.ts";

const router = express.Router();

router.get("/users", fetchUsers)

// Register POST request. api/auth/register
router.post("/register", register)

// Login POST request. api/auth/login
router.post("/login", login)

// DELETE request for user of said id.
router.delete("/user/:id", deleteUser);

export default router;