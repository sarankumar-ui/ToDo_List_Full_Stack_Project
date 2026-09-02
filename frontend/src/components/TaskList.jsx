import TaskCard from "./TaskCard";

function TaskList({
  tasks,
  onEdit,
  onDelete,
  onStatusChange,
}) {
  if (tasks.length === 0) {
    return (
      <div className="no-tasks">
        <h3>No tasks found</h3>

        <p>
          Create a new task to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="task-grid">

      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      ))}

    </div>
  );
}

export default TaskList;
