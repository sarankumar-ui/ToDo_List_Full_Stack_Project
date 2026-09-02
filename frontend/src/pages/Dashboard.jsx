
import { useEffect, useState } from "react";

import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import LogoutButton from "../components/Logout";

import "./Dashboard.css";

import {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../services/taskApi";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  
  // GET ALL TASKS
  

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getAllTasks();

      console.log("Get all tasks:", data);

      setTasks(data.tasks || []);
    } catch (error) {
      console.error(error);

      setError(
        error.message || "Unable to load tasks"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  
  // SUCCESS MESSAGE
  

  const showSuccess = (message) => {
    setSuccess(message);

    setTimeout(() => {
      setSuccess("");
    }, 3000);
  };

  
  // CREATE TASK
  

  const handleCreateTask = async (taskData) => {
    try {
      setError("");

      const data = await createTask(taskData);

      console.log("Create task:", data);

      setTasks((previousTasks) => [
        data.task,
        ...previousTasks,
      ]);

      showSuccess("Task created successfully");
    } catch (error) {
      console.error(error);

      setError(
        error.message || "Failed to create task"
      );

      throw error;
    }
  };

  
  // UPDATE TASK
  

  const handleUpdateTask = async (id, taskData) => {
    try {
      setError("");

      const data = await updateTask(id, taskData);

      console.log("Update task:", data);

      setTasks((previousTasks) =>
        previousTasks.map((task) =>
          task._id === id ? data.task : task
        )
      );

      setEditingTask(null);

      showSuccess("Task updated successfully");
    } catch (error) {
      console.error(error);

      setError(
        error.message || "Failed to update task"
      );

      throw error;
    }
  };

 
  // UPDATE STATUS
 

  const handleStatusChange = async (
    id,
    newStatus
  ) => {
    try {
      setError("");

      const data = await updateTask(id, {
        status: newStatus,
      });

      setTasks((previousTasks) =>
        previousTasks.map((task) =>
          task._id === id ? data.task : task
        )
      );

      showSuccess("Status updated successfully");
    } catch (error) {
      console.error(error);

      setError(
        error.message ||
          "Failed to update status"
      );

      fetchTasks();
    }
  };

 
  // DELETE TASK
  

  const handleDeleteTask = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      setError("");

      await deleteTask(id);

      setTasks((previousTasks) =>
        previousTasks.filter(
          (task) => task._id !== id
        )
      );

      showSuccess("Task deleted successfully");
    } catch (error) {
      console.error(error);

      setError(
        error.message ||
          "Failed to delete task"
      );
    }
  };

  
  // SEARCH + FILTER


  const filteredTasks = tasks.filter((task) => {
    const searchText = search
      .toLowerCase()
      .trim();

    const title =
      task.title?.toLowerCase() || "";

    const description =
      task.description?.toLowerCase() || "";

    const matchesSearch =
      title.includes(searchText) ||
      description.includes(searchText);

    const matchesStatus =
      statusFilter === "All" ||
      task.status === statusFilter;

    const matchesPriority =
      priorityFilter === "All" ||
      task.priority === priorityFilter;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesPriority
    );
  });

 
  // STATISTICS
  

  const totalTasks = tasks.length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  const activeTasks = tasks.filter(
    (task) =>
      task.status === "Active" ||
      task.status === "Doing"
  ).length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  
  // DASHBOARD UI
  

  return (
    <div className="dashboard">

      {/* HEADER */}

      <header className="dashboard-header">

        <div className="dashboard-title">
          <h1>To-Do Dashboard</h1>

          <p>
            Manage your tasks easily
          </p>
        </div>

        {/* IMPORTANT:
            Logout button must actually be rendered */}
        <LogoutButton />

      </header>

      {/* ERROR */}

      {error && (
        <div className="error-message">
          <span>{error}</span>

          <button
            type="button"
            onClick={() => setError("")}
          >
            x
          </button>
        </div>
      )}

      {/* SUCCESS */}

      {success && (
        <div className="success-message">
          {success}
        </div>
      )}

      {/* STATISTICS */}

      <div className="stats">

        <div className="stat-card">
          <h2>{totalTasks}</h2>
          <p>Total Tasks</p>
        </div>

        <div className="stat-card pending-card">
          <h2>{pendingTasks}</h2>
          <p>Pending</p>
        </div>

        <div className="stat-card active-card">
          <h2>{activeTasks}</h2>
          <p>Active</p>
        </div>

        <div className="stat-card completed-card">
          <h2>{completedTasks}</h2>
          <p>Completed</p>
        </div>

      </div>

      {/* CREATE / UPDATE */}

      <TaskForm
        onCreateTask={handleCreateTask}
        onUpdateTask={handleUpdateTask}
        editingTask={editingTask}
        onCancelEdit={() =>
          setEditingTask(null)
        }
      />

      {/* SEARCH + FILTER */}

      <div className="task-controls">

        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
        />

        <select
          value={statusFilter}
          onChange={(event) =>
            setStatusFilter(event.target.value)
          }
        >
          <option value="All">
            All Status
          </option>

          <option value="Pending">
            Pending
          </option>

          <option value="Active">
            Active
          </option>

          <option value="Doing">
            Doing
          </option>

          <option value="Completed">
            Completed
          </option>

          <option value="Onhold">
            Onhold
          </option>
        </select>

        <select
          value={priorityFilter}
          onChange={(event) =>
            setPriorityFilter(event.target.value)
          }
        >
          <option value="All">
            All Priority
          </option>

          <option value="Low">
            Low
          </option>

          <option value="Medium">
            Medium
          </option>

          <option value="High">
            High
          </option>

          <option value="Urgent">
            Urgent
          </option>
        </select>

      </div>

      {/* TASK LIST */}

      <section className="tasks-section">

        <div className="tasks-heading">
          <h2>Your Tasks</h2>

          <span>
            {filteredTasks.length} task(s)
          </span>
        </div>

        {loading ? (
          <div className="loading">
            Loading tasks...
          </div>
        ) : (
          <TaskList
            tasks={filteredTasks}
            onEdit={(task) =>
              setEditingTask(task)
            }
            onDelete={handleDeleteTask}
            onStatusChange={
              handleStatusChange
            }
          />
        )}

      </section>

    </div>
  );
}

export default Dashboard;
