// const Task = require("../models/Task");



// const createTask = async (req, res) => {
//     try {
//         const { title, description, status, priority } = req.body;

//         const task = await Task.create({
//             title,
//             description,
//             status,
//             priority,
//         });

//         res.status(201).json ({
//             success: true,
//             message: "Task created successfully",
//             task,
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message,
//         });
//     }
// };




// const getAllTasks = async (req, res) => {
//     try {
//         const tasks = await Task.find()
//         .sort({ createdAt: -1 });

//         res.status(200).json({
//             success: true,
//             count: tasks.length,
//             tasks,
//         });
//     } catch (error) {

//         console.error("Get all tasks error:", error);

//         res.status(500).json({
//             success: false,
//             message: error.message,
//         });
//     }
// }



// const getTaskById = async (req, res) => {
//     try {
//         const task = await Task.findById(req.params.id);

//         if(!task) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Task notfound",
//             });
//         }

//         res.status(200).json({
//             success: true,
//             task,
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message,
//         });
//     }
// };







// const updateTask = async (req, res) => {
//     try {
//         const task = await Task.findByIdAndUpdate(
//             req.params.id,
//             req.body,
//             {
//                 new: true,
//             }
//         );

//         if(!task) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Task not found",
//             });
//         }

//         res.status(200).json({
//             success: true,
//             message: "Task updated successfully",
//             task,
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message,
//         });
//     }
// };




// const deleteTask = async (req, res) => {
//   try {
//     const task = await Task.findByIdAndDelete(req.params.id);

//     if (!task) {
//       return res.status(404).json({
//         success: false,
//         message: "Task not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Task deleted successfully",
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };


// const searchTasks = async (req, res) => {
//   try {
//     const { q = "", status = "All", priority = "All" } = req.query;

//     const query = {};

    
//     if (req.user && req.user._id) {
//       query.userId = req.user._id;
//     }

//     if (q) {
//       query.title = { $regex: q, $options: "i" };
//     }

//     if (status !== "All") {
//       query.status = status;
//     }

//     if (priority !== "All") {
//       query.priority = priority;
//     }

//     const tasks = await Task.find(query);
//     res.status(200).json({ tasks });
//   } catch (error) {
//     console.error("Error in searchTasks:", error);
//     res.status(500).json({ message: "Internal server error fetching tasks" });
//   }
// };

// module.exports = {
//   createTask,
//   getAllTasks,
//   getTaskById,
//   updateTask,
//   deleteTask,
//   searchTasks,
// };


const Task = require("../models/Task");
const mongoose = require("mongoose");


const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

const createTask = async (req, res) => {
  try {
    const { title, description, status, priority } = req.body;

    
    const taskData = {
      title,
      description,
      status,
      priority,
    };

    if (req.user && req.user._id) {
      taskData.userId = req.user._id;
    }

    const task = await Task.create(taskData);

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to create task",
    });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const query = {};

    
    if (req.user && req.user._id) {
      query.userId = req.user._id;
    }

    const tasks = await Task.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    console.error("Get all tasks error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch tasks",
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

    const query = { _id: id };
    if (req.user && req.user._id) {
      query.userId = req.user._id;
    }

    const task = await Task.findOne(query);

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
    console.error("Error fetching task by ID:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch task",
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

    const query = { _id: id };
    if (req.user && req.user._id) {
      query.userId = req.user._id;
    }

    const task = await Task.findOneAndUpdate(query, req.body, {
      new: true,
      runValidators: true,
    });

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
    console.error("Error updating task:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to update task",
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

    const query = { _id: id };
    if (req.user && req.user._id) {
      query.userId = req.user._id;
    }

    const task = await Task.findOneAndDelete(query);

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
    console.error("Error deleting task:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to delete task",
    });
  }
};

const searchTasks = async (req, res) => {
  try {
    const { q = "", status = "All", priority = "All" } = req.query;

    const query = {};

    if (req.user && req.user._id) {
      query.userId = req.user._id;
    }

    if (q) {
      query.title = { $regex: q, $options: "i" };
    }

    if (status !== "All") {
      query.status = status;
    }

    if (priority !== "All") {
      query.priority = priority;
    }

    const tasks = await Task.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    console.error("Error in searchTasks:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error fetching tasks",
    });
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
  searchTasks,
};
