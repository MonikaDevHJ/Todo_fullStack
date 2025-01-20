import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState<string>(""); // For the input field
  const [task, setTask] = useState<string[]>([]); // For the list of tasks
  const [edit, setEdit] = useState<string>("");   //for the edit of task


  const handleTask = (): void => {
    // Prevent empty or whitespace-only tasks
    if (input.trim() === "") return;

    // Add the new task to the list
    setTask((prevTasks) => [...prevTasks, input]);

    // Clear the input field
    setInput("");
  };

  const handleEdit = (taskToEdit :string): void => {
    
 
    // setEdit(setTask()) 
  }

  function handleDelete(t: string): void {
    // Filter out the task that matches the one you want to delete (t)
    const deleteTask = task.filter((taskItem) => taskItem !== t);
    setTask(deleteTask);  // Update state with the new task list
  }
  

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">To-Do List</h1>
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        {/* Add Task Section */}
        <div className="mb-4">
          <input
            type="text"
            value={input} // Bind input value to state
            onChange={(e) => setInput(e.target.value)} // Update input state on change
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleTask(); // Trigger handleTask when Enter is pressed
              }
            }}
            placeholder="Enter a new task"
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>
        <button
          className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={handleTask} // Call handleTask on button click
        >
          Add Task
        </button>
    
        {/* Task List Section */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-3">Tasks:</h2>
          <ul className="list-disc pl-5">
            {task.map((t, index) => (
              <li
                key={index}
                className="flex items-center justify-between text-gray-700 mb-2"
              >
                <span>{t}</span>
                <div className="flex space-x-2">
                
                 
                 
                  <button onClick={()=>handleEdit(t)}
                   className="text-blue-500 hover:text-blue-700">
                    Edit
                  </button>
                  
                  <button onClick={()=>handleDelete(t)}
                   className="text-red-500 hover:text-red-700">
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}








