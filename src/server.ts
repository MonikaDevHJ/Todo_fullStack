import express from 'express';  // 1️⃣ Import Express (Hire the waiter)
import cors from 'cors';        // 2️⃣ Import CORS (Allow frontend to talk to backend)
import dotenv from 'dotenv';     // 3️⃣ Load environment variables
import taskRoutes from './taskRoutes';  // 4️⃣ Import routes (Where orders go)

dotenv.config(); // 5️⃣ Load environment variables from .env file

const app = express();  // 6️⃣ Create an Express app (Waiter is ready!)
const port = process.env.PORT || 5000;  // 7️⃣ Set the server port (Where the restaurant is located)

app.use(cors()); // 8️⃣ Allow frontend to talk to backend
app.use(express.json()); // 9️⃣ Allow Express to read JSON requests

// 🔟 Define a default route (Check if the restaurant is open)
app.get('/', (req, res) => {
  res.send('Server is running! 🚀');  // 1️⃣1️⃣ Send a simple response when visiting '/'
});

// 1️⃣2️⃣ Define API routes for tasks
app.use('/api/tasks', taskRoutes);  // (When someone orders, send them to the kitchen)

// 1️⃣3️⃣ Start the server and listen for requests
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);  
});
