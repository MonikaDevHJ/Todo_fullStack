import { Router } from 'express';  // 1️⃣ Import Router (The ordering system)
import { createTask, getTasks, updateTask, deleteTask } from './taskController';  // 2️⃣ Import task controller functions (Task manager's instructions)

// 3️⃣ Create a new Router (Set up the tables)
const router = Router();

// 4️⃣ Define API routes (Where the customers place their orders)
router.get('/', getTasks);  // 5️⃣ GET: Fetch all tasks (Customer asks to view the menu)
router.post('/', createTask);  // 6️⃣ POST: Create a new task (Customer places a new order)
router.put('/:id', updateTask);  // 7️⃣ PUT: Update an existing task (Customer changes their order)
router.delete('/:id', deleteTask);  // 8️⃣ DELETE: Delete a task (Customer removes an order)

// 9️⃣ Export the router so it can be used in the server
export default router;
