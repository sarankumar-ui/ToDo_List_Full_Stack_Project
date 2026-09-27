

import { useEffect, useState } from "react";

const defaultForm = {
  title: "",
  description: "",
  status: "Pending",
  priority: "Medium",
};

function TaskForm({
  onCreateTask,
  onUpdateTask,
  editingTask,
  onCancelEdit,
}) {
  const [formData, setFormData] =
    useState(defaultForm);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  
  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title || "",
        description:
          editingTask.description || "",
        status:
          editingTask.status || "Pending",
        priority:
          editingTask.priority || "Medium",
      });
    } else {
      setFormData(defaultForm);
    }
  }, [editingTask]);


  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (!formData.title.trim()) {
      setError("Title is required");
      return;
    }

    if (!formData.description.trim()) {
      setError("Description is required");
      return;
    }

    try {
      setLoading(true);

      if (editingTask) {
        await onUpdateTask(
          editingTask._id,
          formData
        );
      } else {
        await onCreateTask(formData);
      }

      setFormData(defaultForm);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="task-form">

      <h2>
        {editingTask
          ? "Update Task"
          : "Create New Task"}
      </h2>

      {error && (
        <div className="form-error">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>

        

        <div className="form-group">
          <label>Task Title</label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter task title"
          />
        </div>

       

        <div className="form-group">
          <label>Description</label>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter task description"
            rows="4"
          />
        </div>

        <div className="form-row">

          

          <div className="form-group">
            <label>Status</label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
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
          </div>

          

          <div className="form-group">
            <label>Priority</label>

            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
            >
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

        </div>

        

        <div className="form-buttons">

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Saving..."
              : editingTask
              ? "Update Task"
              : "Add Task"}
          </button>

          {editingTask && (
            <button
              type="button"
              className="cancel-btn"
              onClick={onCancelEdit}
            >
              Cancel
            </button>
          )}

        </div>

      </form>
    </div>
  );
}

export default TaskForm;
