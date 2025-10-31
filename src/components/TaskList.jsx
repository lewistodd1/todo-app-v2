function TaskList({ tasks, toggleTask, deleteTask }) {
  if (tasks.length === 0) {
    return <p>No tasks yet. You’re either efficient or lazy.</p>;
  }

  // Sort by priority first, then by due date
  const priorityOrder = { high: 1, medium: 2, low: 3 };
  const sortedTasks = [...tasks].sort((a, b) => {
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    if (a.dueDate && b.dueDate) {
      return new Date(a.dueDate) - new Date(b.dueDate);
    }
    return 0;
  });

  return (
    <ul className="task-list">
      {sortedTasks.map((task) => (
        <li key={task.id} className={task.done ? "done" : ""}>
          <div onClick={() => toggleTask(task.id)} className="task-main">
            <span className="task-text">{task.text}</span>
            <small className="task-meta">
              {task.dueDate && <span>Due: {task.dueDate}</span>}
              <span className={`priority ${task.priority}`}>
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
              </span>
            </small>
          </div>
          <button onClick={() => deleteTask(task.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
