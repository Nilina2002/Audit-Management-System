import React, { useState } from "react";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [tasks, setTasks] = useState({});
  const [selectedDay, setSelectedDay] = useState(null);
  const [newTask, setNewTask] = useState("");

  // Function to change the month
  const changeMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  // Function to generate the days for the current month
  const generateCalendarDays = () => {
    const firstDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const lastDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );

    const days = [];
    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      days.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i));
    }
    return days;
  };

  // Function to handle adding tasks
  const handleAddTask = () => {
    if (!newTask) return;
    const newTasks = { ...tasks };
    if (newTasks[selectedDay]) {
      newTasks[selectedDay].push(newTask);
    } else {
      newTasks[selectedDay] = [newTask];
    }
    setTasks(newTasks);
    setNewTask("");
  };

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const daysInMonth = generateCalendarDays();

  return (
    <div className="w-80 mx-auto bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div className="flex justify-between items-center bg-gray-700 text-white p-4">
        <button
          className="hover:bg-gray-600 p-2 rounded"
          onClick={() => changeMonth(-1)}
        >
          &lt;
        </button>
        <h2 className="text-lg font-semibold">
          {currentDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h2>
        <button
          className="hover:bg-gray-600 p-2 rounded"
          onClick={() => changeMonth(1)}
        >
          &gt;
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2 p-4 text-center text-white">
        {daysOfWeek.map((day, index) => (
          <div className="font-bold" key={index}>
            {day}
          </div>
        ))}

        {daysInMonth.map((date, index) => (
          <div
            key={index}
            className="relative p-2 bg-gray-600 hover:bg-blue-500 rounded-lg cursor-pointer transition duration-300"
            onClick={() => {
              setSelectedDay(date.getDate());
            }}
          >
            {date.getDate()}
          </div>
        ))}
      </div>

      {/* Task Section Below Calendar */}
      <div className="bg-gray-700 p-4 text-white">
        <h3 className="text-lg font-semibold mb-2">
          Tasks for{" "}
          {currentDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h3>

        {/* Show tasks for each day */}
        <div className="space-y-4">
          {Object.keys(tasks).map((day) => (
            <div key={day} className="bg-gray-600 p-4 rounded-lg">
              <h4 className="text-lg font-semibold text-blue-400">Day {day}</h4>
              <ul className="text-sm">
                {tasks[day].map((task, index) => (
                  <li key={index} className="text-gray-300">
                    {task}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for adding tasks to the selected day */}
      {selectedDay && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4">
              Tasks for Day {selectedDay}
            </h3>

            {/* Add task input */}
            <div className="flex mb-4">
              <input
                type="text"
                className="p-2 border border-gray-300 rounded-lg w-full"
                placeholder="Add a new task"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
              />
              <button
                className="ml-2 bg-blue-500 text-white p-2 rounded-lg"
                onClick={handleAddTask}
              >
                Add Task
              </button>
            </div>

            <div className="flex justify-end">
              <button
                className="text-blue-500"
                onClick={() => setSelectedDay(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
