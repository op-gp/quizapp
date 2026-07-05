import express from 'express';
import { fetchUsers, deleteUser } from "../controllers/adminController.ts"

const router = express.Router();

// GET request to retrieve all users. api/admin/users
router.get("/users", fetchUsers)

// POST request for creating a category. api/admin/categories/create
router.post("/categories/create")

// POST request for creating a quiz. api/admin/quizzes/create
router.post("/quizzes/create")

// POST request for adding a question to a specific quiz. api/admin/quizzes/<quizId>/questions
router.post("/quizzes/:quizId/questions")

// PUT request for updating a question of a quiz. api/admin/questions/<questionId>
router.put("/questions/:questionId")

// DELETE request for deleting a question of said question id. api/admin/questions/<questionId>
router.delete("/questions/:questionId")

// DELETE request for deleting user of said id. api/admin/users/<id>
router.delete("/users/:id", deleteUser);

export default router;