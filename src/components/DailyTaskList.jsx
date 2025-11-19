function DailyTaskList({ tasks, clear }) {
  return (
    <div className="daily-task-list">
      <h3>Tasks for this day</h3>
      <button onClick={clear}>Close</button>

      {tasks.length === 0 && <p>No tasks.</p>}

      <ul>
        {tasks.map((t) => (
          <li key={t.id}>
            {t.text} ({t.priority})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DailyTaskList;
