const express = require("express");

const {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require("../controllers/taskControllers");

const router = express.Router();


router.post("/createnewtask", createTask);


router.get("/alltasks", getAllTasks);


router.get("/:id", getTaskById);


router.put("/updatetask/:id", updateTask);


router.delete("/deletetask/:id", deleteTask);

module.exports = router;
