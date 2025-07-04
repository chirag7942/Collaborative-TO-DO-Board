import express from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  smartAssignTask,
} from "../controllers/taskController.js";

const router = express.Router();

// Protect all task routes
router.use(authenticate);

// Get all tasks
router.get("/", getTasks);

// Create a new task
router.post("/", createTask);

// Update a task with conflict detection
router.put("/:id", updateTask);

// Delete a task
router.delete("/:id", deleteTask);

// Smart assign the task to user with the fewest active tasks
router.post("/:id/smart-assign", smartAssignTask);

export default router;
