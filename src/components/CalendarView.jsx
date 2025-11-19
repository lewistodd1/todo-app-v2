import { useState } from "react";

function CalendarView({ tasks, setSelectedDayTasks }) {
  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  const [selectedDate, setSelectedDate] = useState(null);

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const getDaysInMonth = (year, month) => {
    const date = new Date(year, month, 1);
    const days = [];

    // Shift start day (0 = Sun, so adjust to Mon = 0)
    let startDay = (date.getDay() + 6) % 7;

    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }

    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }

    return days;
  };

  const days = getDaysInMonth(
    currentMonth.getFullYear(),
    currentMonth.getMonth()
  );

  const changeMonth = (direction) => {
    const newMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + direction,
      1
    );
    setCurrentMonth(newMonth);
  };

  const handleDayClick = (day) => {
    if (!day) return;

    const dateStr = day.toISOString().split("T")[0];

    const dayTasks = tasks.filter((task) => task.dueDate === dateStr);

    setSelectedDayTasks(dayTasks);
  };

  return (
    <div className="calendar-view">
      <div className="calendar-header">
        <button onClick={() => changeMonth(-1)}>←</button>
        <h2>
          {currentMonth.toLocaleString("default", { month: "long" })}{" "}
          {currentMonth.getFullYear()}
        </h2>
        <button onClick={() => changeMonth(1)}>→</button>
      </div>

      <div className="calendar-grid">
        {daysOfWeek.map((d) => (
          <div key={d} className="calendar-day-header">{d}</div>
        ))}

        {days.map((day, idx) => {
          let marker = false;

          if (day) {
            const dateStr = day.toISOString().split("T")[0];
            marker = tasks.some((t) => t.dueDate === dateStr);
          }

          return (
            <div
                key={idx}
                className={(() => {
                let classes = "calendar-day";

                if (day) {
                    const dayStr = day.toISOString().split("T")[0];

                    // Highlight today's date
                    const todayStr = new Date().toISOString().split("T")[0];
                    if (dayStr === todayStr) {
                    classes += " today";
                    }

                    // Highlight the selected date
                    if (selectedDate === dayStr) {
                    classes += " selected";
                    }
                }

                return classes;
                })()}
                onClick={() => {
                if (!day) return;
                const dateStr = day.toISOString().split("T")[0];
                setSelectedDate(dateStr);
                handleDayClick(day);
                }}
            >
                {day && (
                <>
                    <span>{day.getDate()}</span>
                    {tasks.some(t => t.dueDate === day.toISOString().split("T")[0]) && (
                    <div className="marker"></div>
                    )}
                </>
                )}
            </div>
            );
        })}
      </div>
    </div>
  );
}

export default CalendarView;
