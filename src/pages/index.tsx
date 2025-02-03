import { useState, useEffect } from "react";
import { getTasks, createTask, deleteTask } from "../taskApi";

export default function Home() {
  const [input, setInput] = useState<string>(""); // Input field state
  const [tasks, setTasks] = useState<{ id: number; title: string }[]>([]); // List of tasks

  // Fetch tasks when the component loads
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks();
        setTasks(data); // Update state with backend tasks
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  // Handle adding a new task
  const handleTask = async (): Promise<void> => {
    if (input.trim() === "") return;

    try {
      const newTask = await createTask(input); // Add task to database
      setTasks((prevTasks) => [...prevTasks, newTask]); // Update state
      setInput(""); // Clear input field
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  // Handle deleting a task
  const handleDelete = async (id: number): Promise<void> => {
    try {
      await deleteTask(id); // Remove from database
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id)); // Update state
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        To-Do List
      </h1>
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        {/* Add Task Section */}
        <div className="mb-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleTask()}
            placeholder="Enter a new task"
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>
        <button
          className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={handleTask}
        >
          Add Task
        </button>

        {/* Task List Section */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-3">Tasks:</h2>
          <ul className="list-disc pl-5">
            {tasks.length === 0 ? (
              <p>No tasks found.</p>
            ) : (
              tasks.map((task) => (
                <li
                  key={task.id}
                  className="flex items-center justify-between text-gray-700 mb-2"
                >
                  <span>{task.title}</span>
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
