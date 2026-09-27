

import { useEffect, useState, useCallback } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import LogoutButton from "../components/Logout";
import "./Dashboard.css";

import {
  createTask,
  updateTask,
  updateTaskStatus,
  deleteTask,
  searchTasks,
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

  
  const loadTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const data = await searchTasks(search, statusFilter, priorityFilter);
      setTasks(data.tasks || []);
    } catch (err) {
      console.error(err);
      setError(err.message || "Unable to load tasks");
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter, priorityFilter]);

  
  useEffect(() => {
    const timer = setTimeout(() => {
      loadTasks();
    }, 300);

    return () => clearTimeout(timer);
  }, [loadTasks]);


  const showSuccess = (message) => {
    setSuccess(message);
    setTimeout(() => setSuccess(""), 3000);
  };


  const handleCreateTask = async (taskData) => {
    try {
      setError("");
      await createTask(taskData);
      showSuccess("Task created successfully");
      loadTasks();
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to create task");
      throw err;
    }
  };


  const handleUpdateTask = async (id, taskData) => {
    try {
      setError("");
      await updateTask(id, taskData);
      setEditingTask(null);
      showSuccess("Task updated successfully");
      loadTasks();
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to update task");
      throw err;
    }
  };


  const handleStatusChange = async (id, newStatus) => {
    try {
      setError("");
      await updateTaskStatus(id, newStatus);
      showSuccess("Status updated successfully");
      loadTasks();
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to update status");
    }
  };


  const handleDeleteTask = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) return;

    try {
      setError("");
      await deleteTask(id);
      showSuccess("Task deleted successfully");
      loadTasks();
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to delete task");
    }
  };


  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter((task) => task.status === "Pending").length;
  const activeTasks = tasks.filter(
    (task) => task.status === "Active" || task.status === "Doing"
  ).length;
  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  return (
    <div className="dashboard">
     
      <header className="dashboard-header">
        <div className="dashboard-title">
          <h1>To-Do Dashboard</h1>
          <p>Manage your tasks easily</p>
        </div>
        <LogoutButton />
      </header>

      
      {error && (
        <div className="error-message">
          <span>{error}</span>
          <button type="button" onClick={() => setError("")}>
            x
          </button>
        </div>
      )}

      
      {success && <div className="success-message">{success}</div>}

      
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

      
      <TaskForm
        onCreateTask={handleCreateTask}
        onUpdateTask={handleUpdateTask}
        editingTask={editingTask}
        onCancelEdit={() => setEditingTask(null)}
      />

      
      <div className="task-controls">
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Active">Active</option>
          <option value="Doing">Doing</option>
          <option value="Completed">Completed</option>
          <option value="Onhold">Onhold</option>
        </select>

        <select
          value={priorityFilter}
          onChange={(event) => setPriorityFilter(event.target.value)}
        >
          <option value="All">All Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
          <option value="Urgent">Urgent</option>
        </select>
      </div>

      
      <section className="tasks-section">
        <div className="tasks-heading">
          <h2>Your Tasks</h2>
          <span>{tasks.length} task(s)</span>
        </div>

        {loading ? (
          <div className="loading">Loading tasks...</div>
        ) : (
          <TaskList
            tasks={tasks}
            onEdit={(task) => setEditingTask(task)}
            onDelete={handleDeleteTask}
            onStatusChange={handleStatusChange}
          />
        )}
      </section>
    </div>
  );
}

export default Dashboard;

