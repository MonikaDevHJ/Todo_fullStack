import { useState, useEffect } from "react";
import { fetchTasks, createTask, deleteTask } from "../taskApi";

export default function Home() {
  const [input, setInput] = useState<string>(""); 
  const [tasks, setTasks] = useState<{ id: number; title: string }[]>([]); 

  // Fetch tasks when the component loads
  useEffect(() => {
    const loadTasks = async () => {  // ✅ Rename function to avoid naming conflict
      try {
        const data = await fetchTasks();  // ✅ Calls correct function
        setTasks(data);
      } catch (error) {
        alert("Error fetching tasks. Please try again.");
        console.error("Error fetching tasks:", error);
      }
    };

    loadTasks();  // ✅ Calls `loadTasks()`, not `fetchTasks()`
  }, []);

  // Handle adding a new task
  const handleTask = async (): Promise<void> => {
    if (input.trim() === "") return;

    try {
      const newTask = await createTask({ title: input, description: "" });
      setTasks((prevTasks) => [...prevTasks, newTask]); 
      setInput(""); 
    } catch (error) {
      alert("Error creating task. Please try again.");
      console.error("Error creating task:", error);
    }
  };

  // Handle deleting a task
  const handleDelete = async (id: number): Promise<void> => {
    try {
      await deleteTask(id);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (error) {
      alert("Error deleting task. Please try again.");
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">To-Do List</h1>

      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        {/* Add Task Section */}
        <div className="mb-4 flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleTask()}
            placeholder="Enter a new task"
            className="flex-1 p-3 border border-gray-300 rounded-md"
          />
          <button
            className="p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            onClick={handleTask}
          >
            Add
          </button>
        </div>

        {/* Task List Section */}
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-3">Tasks:</h2>
          <ul className="space-y-2">
            {tasks.length === 0 ? (
              <p className="text-gray-500">No tasks found.</p>
            ) : (
              tasks.map((task) => (
                <li
                  key={task.id}
                  className="flex items-center justify-between bg-gray-100 p-2 rounded-md"
                >
                  <span className="text-gray-700">{task.title}</span>
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
