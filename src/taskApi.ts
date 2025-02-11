import axios from 'axios';  // 1️⃣ Importing Axios (Waiters who take and deliver orders)

// Set the base URL for the API requests (The restaurant address)
const API_URL = 'http://localhost:5000/api/tasks';  // 2️⃣ The kitchen's location (backend server)

// Fetch all tasks (GET request: Customers ask to see the menu)
export const fetchTasks = async () => {
  try {
    const response = await axios.get(API_URL);  // 3️⃣ Waiter takes request to the kitchen
    return response.data;  // 4️⃣ The kitchen sends back the menu (list of tasks)
  } catch (error) {
    console.error("Error fetching tasks:", error);  // 5️⃣ If something goes wrong, inform the customer
    throw error;
  }
};

// Create a new task (POST request: Customers place an order)
export const createTask = async (taskData: { title: string, description: string }) => {
  try {
    const response = await axios.post(API_URL, taskData);  // 6️⃣ Waiter delivers the order to the kitchen
    return response.data;  // 7️⃣ Kitchen confirms and prepares the order (creates task)
  } catch (error) {
    console.error("Error creating task:", error);  // 8️⃣ If the order fails, inform the customer
    throw error;
  }
};

// Update a task (PUT request: Customers change their order)
export const updateTask = async (id: number, taskData: { title: string }) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, taskData);  // 9️⃣ Waiter asks kitchen to modify an order
    return response.data;  // 🔟 Kitchen updates the order and confirms the change
  } catch (error) {
    console.error("Error updating task:", error);  // 1️⃣1️⃣ If update fails, inform the customer
    throw error;
  }
};  

// Delete a task (DELETE request: Customers cancel an order)
export const deleteTask = async (id: number) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);  // 1️⃣2️⃣ Waiter asks kitchen to cancel an order
    return response.data;  // 1️⃣3️⃣ Kitchen confirms the cancellation
  } catch (error) {
    console.error("Error deleting task:", error);  // 1️⃣4️⃣ If cancellation fails, inform the customer
    throw error;
  }
};
