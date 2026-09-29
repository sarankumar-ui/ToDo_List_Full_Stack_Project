const Task = require("../models/Task");
const mongoose = require("mongoose");

const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};




const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      status,
      priority,
    } = req.body;

    if (!title || !description || !status || !priority) {
      return res.status(400).json({
        success: false,
        message:
          "Title, description, status and priority are required",
      });
    }

    const task = await Task.create({
      title,
      description,
      status,
      priority,
    });

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    console.error("Error creating task:", error);

    res.status(500).json({
      success: false,
      message:
        error.message || "Failed to create task",
    });
  }
};



const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    console.error("Get all tasks error:", error);

    res.status(500).json({
      success: false,
      message:
        error.message || "Failed to fetch tasks",
    });
  }
};



const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Task ID format",
      });
    }

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    console.error(
      "Error fetching task by ID:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        error.message || "Failed to fetch task",
    });
  }
};



const updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Task ID format",
      });
    }

    const {
      title,
      description,
      status,
      priority,
    } = req.body;

    const task = await Task.findByIdAndUpdate(
      id,
      {
        title,
        description,
        status,
        priority,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
    console.error(
      "Error updating task:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        error.message || "Failed to update task",
    });
  }
};


const updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Task ID format",
      });
    }

    const allowedStatuses = [
      "Pending",
      "Active",
      "Doing",
      "Completed",
      "Onhold",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const task = await Task.findByIdAndUpdate(
      id,
      { status },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task status updated successfully",
      task,
    });
  } catch (error) {
    console.error(
      "Update task status error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to update task status",
    });
  }
};


const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Task ID format",
      });
    }

    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error(
      "Error deleting task:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        error.message || "Failed to delete task",
    });
  }
};


const searchTasks = async (req, res) => {
  try {
    const {
      q = "",
      status = "All",
      priority = "All",
    } = req.query;

    const query = {};

    if (q.trim()) {
      query.title = {
        $regex: q.trim(),
        $options: "i",
      };
    }

    if (status !== "All") {
      query.status = status;
    }

    if (priority !== "All") {
      query.priority = priority;
    }

    const tasks = await Task.find(query).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    console.error(
      "Error in searchTasks:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        error.message ||
        "Internal server error fetching tasks",
    });
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  updateTaskStatus,
  deleteTask,
  searchTasks,
};
