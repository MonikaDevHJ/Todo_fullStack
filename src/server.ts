import express from 'express';  // 1️⃣ Import Express (Hire the waiter)
import cors from 'cors';        // 2️⃣ Import CORS (Allow frontend to talk to backend)
import dotenv from 'dotenv';     // 3️⃣ Load environment variables
import taskRoutes from './taskRoutes';  // 4️⃣ Import routes (Where orders go)

dotenv.config(); // Load environment variables from .env file

const app = express();  // 5️⃣ Create an Express app (Waiter is ready!)
const port = process.env.PORT || 5000;  // 6️⃣ Set the server port (Where the restaurant is located)

app.use(cors()); // 7️⃣ Allow frontend to talk to backend
app.use(express.json()); // 8️⃣ Allow Express to read JSON requests

// 9️⃣ Define API routes for tasks
app.use('/api/tasks', taskRoutes);  // (When someone orders, send them to the kitchen)

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);  // 1️⃣0️⃣ Start the server
});
