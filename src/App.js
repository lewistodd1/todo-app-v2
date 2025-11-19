import { useState, useEffect } from "react";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import CalendarView from "./components/CalendarView";
import DailyTaskList from "./components/DailyTaskList";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [darkMode, setDarkMode] = useState(false);
  const [view, setView] = useState("list"); // "list" or "calendar"
  const [selectedDayTasks, setSelectedDayTasks] = useState([]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
}, [darkMode]);

  const addTask = (task) => setTasks([...tasks, task]);
  const toggleTask = (id) =>
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  const deleteTask = (id) => setTasks(tasks.filter((t) => t.id !== id));

  return (
    
    <div className={`app ${darkMode ? "dark" : ""}`}>
      
      <header>
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </header>

      <div className="view-switch">
        <button onClick={() => setView("list")}>List View</button>
        <button onClick={() => setView("calendar")}>Calendar View</button>
      </div>

      <h1>My To-Do List</h1>
      
      {view === "list" && (
        <>
          <TaskInput addTask={addTask} />
          <TaskList tasks={tasks} toggleTask={toggleTask} deleteTask={deleteTask} />
        </>
      )}

      {view === "calendar" && (
        <CalendarView tasks={tasks} setSelectedDayTasks={setSelectedDayTasks} />
      )}

      {selectedDayTasks.length > 0 && (
        <DailyTaskList
          tasks={selectedDayTasks}
          clear={() => setSelectedDayTasks([])}
        />
      )}

    </div>
  );
}

export default App;

