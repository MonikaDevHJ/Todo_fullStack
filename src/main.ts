import { prisma } from '../prisma/client'; // Import the Prisma Client instance

async function main() {
  try { 
    // Create a new task
    const newTask = await prisma.task.create({
      data: {
        title: 'First Task',
        description: 'This is my first task',
      },
    });
    console.log('Task Created:', newTask);

    // Delete the task
    const deletedTask = await prisma.task.delete({
      where: {
        id: newTask.id, // Use the ID of the newly created task
      },
    });
    console.log('Task Deleted:', deletedTask);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect(); // Disconnect the client to avoid memory leaks
  }
}

main();
