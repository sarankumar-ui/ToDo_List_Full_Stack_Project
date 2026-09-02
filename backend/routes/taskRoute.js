const express = require("express");

const {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require("../controllers/taskControllers");

const router = express.Router();

// Create task
router.post("/createnewtask", createTask);

// Get all tasks
router.get("/alltasks", getAllTasks);

// Get task by ID
router.get("/:id", getTaskById);

// Update task
router.put("/updatetask/:id", updateTask);

// Delete task
router.delete("/deletetask/:id", deleteTask);

module.exports = router;
