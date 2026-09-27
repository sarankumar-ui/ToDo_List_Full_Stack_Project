const express = require("express");

const {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
  searchTasks,
} = require("../controllers/taskControllers");

const router = express.Router();


router.post("/createnewtask", createTask);


router.get("/alltasks", getAllTasks);


router.get("/:id", getTaskById);


router.put("/updatetask/:id", updateTask);


router.delete("/deletetask/:id", deleteTask);

router.get("/search", searchTasks);

module.exports = router;
