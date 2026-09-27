


function TaskCard({
  task,
  onEdit,
  onDelete,
  onStatusChange,
}) {
  return (
    <div className="task-card">

      

      <div className="task-card-header">

        <h3>{task.title}</h3>

        <span
          className={`priority ${task.priority.toLowerCase()}`}
        >
          {task.priority}
        </span>

      </div>

      

      <p className="description">
        {task.description}
      </p>

      

      <div className="status-row">

        <label>Status:</label>

        <select
          value={task.status}
          onChange={(event) =>
            onStatusChange(
              task._id,
              event.target.value
            )
          }
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

      

      {task.createdAt && (
        <p className="task-date">
          Created:{" "}
          {new Date(
            task.createdAt
          ).toLocaleString()}
        </p>
      )}

     

      <div className="task-actions">

        <button
          className="edit-btn"
          onClick={() => onEdit(task)}
        >
          Edit
        </button>

        <button
          className="delete-btn"
          onClick={() =>
            onDelete(task._id)
          }
        >
          Delete
        </button>

      </div>

    </div>
  );
}

export default TaskCard;
