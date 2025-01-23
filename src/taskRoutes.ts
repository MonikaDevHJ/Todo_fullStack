import { Router } from 'express';
import { createTask, getTasks, updateTask, deleteTask } from './taskController';

const router = Router();

// Define API routes
router.get('/', getTasks); // Fetch all tasks
router.post('/', createTask); // Create a new task
router.put('/:id', updateTask); // Update an existing task
router.delete('/:id', deleteTask); // Delete a task

export default router;
