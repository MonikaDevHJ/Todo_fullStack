import { Request, Response } from 'express';   // 1️⃣ Importing necessary tools (Waiter and Response system)
import { PrismaClient } from '@prisma/client';  // 2️⃣ Prisma Client (Our restaurant's internal order system)

const prisma = new PrismaClient();  // 3️⃣ Initialize the Prisma Client (Our order-taking system)

// Fetch all tasks (GET request: Customer asks to view the menu)
export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await prisma.task.findMany();  // 4️⃣ Fetch all tasks from the kitchen (Database)
    res.status(200).json(tasks);  // 5️⃣ Send the list of tasks to the customer (Response)
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks" });  // 6️⃣ If an error happens, tell the customer something went wrong
  }
};

// Create a new task (POST request: Customer places a new order)
export const createTask = async (req: Request, res: Response) => {
  try {
    const { title } = req.body;  // 7️⃣ Get the task details from the customer (Order form)
    const newTask = await prisma.task.create({  // 8️⃣ Create a new task (New order in the system)
      data: {
        title: req.body.title,  // 9️⃣ Task title (The name of the order)
        description: req.body.description,  // 10️⃣ Task description (Additional details about the order)
      }
    });
    res.status(201).json(newTask);  // 11️⃣ Send the confirmation of the new order (Response)
  } catch (error) {
    res.status(500).json({ message: "Error creating task" });  // 12️⃣ If something goes wrong, inform the customer
  }
};

// Update an existing task (PUT request: Customer changes their order)
export const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params;  // 13️⃣ Get the task ID (Order number) to be updated
  const { title } = req.body;  // 14️⃣ Get the new details (Updated order)
  try {
    const updatedTask = await prisma.task.update({  // 15️⃣ Update the task in the system (Update the order)
      where: { id: Number(id) },  // 16️⃣ Find the task by ID (Look for the existing order)
      data: { title },  // 17️⃣ Update the title (Modify the order)
    });
    res.status(200).json(updatedTask);  // 18️⃣ Send the updated task back to the customer (Confirmation)
  } catch (error) {
    res.status(500).json({ message: "Error updating task" });  // 19️⃣ If the update fails, inform the customer
  }
};

// Delete a task (DELETE request: Customer removes their order)
export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;  // 20️⃣ Get the task ID (Order number) to be deleted
  try {
    await prisma.task.delete({  // 21️⃣ Delete the task from the system (Cancel the order)
      where: { id: Number(id) },  // 22️⃣ Find the task by ID (Look for the order)
    });
    res.status(200).json({ message: "Task deleted successfully" });  // 23️⃣ Inform the customer that the order was removed
  } catch (error) {
    res.status(500).json({ message: "Error deleting task" });  // 24️⃣ If deletion fails, inform the customer
  }
};
