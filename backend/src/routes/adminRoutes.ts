import express from 'express';
import { fetchUsers, deleteUser, createCategory } from "../controllers/adminController.ts"
import { verifyRole, verifyToken } from "../middleware/authMiddleware.ts";

const router = express.Router();

// GET request to retrieve all users. api/admin/users
router.get("/users", verifyToken, verifyRole(["admin"]), fetchUsers)

// POST request for creating a category. api/admin/categories/create
router.post("/categories/create", verifyToken, verifyRole(["admin"]), createCategory)

// POST request for creating a quiz. api/admin/quizzes/create
// router.post("/quizzes/create")

// POST request for adding a question to a specific quiz. api/admin/quizzes/<quizId>/questions
// router.post("/quizzes/:quizId/questions")

// PUT request for updating a question of a quiz. api/admin/questions/<questionId>
// router.put("/questions/:questionId")

// DELETE request for deleting a category of said category id.
// router.delete("/categories/:categoryId")

// DELETE request for deleting a question of said question id. api/admin/questions/<questionId>
// router.delete("/questions/:questionId")

// DELETE request for deleting user of said id. api/admin/users/<id>
router.delete("/users/:id", verifyToken, verifyRole(["admin"]), deleteUser);

export default router;