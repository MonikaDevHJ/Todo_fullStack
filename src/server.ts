
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import taskRoutes from './taskRoutes';

dotenv.config(); // Load environment variables

const app = express();
const port = process.env.PORT || 5000;

app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON request bodies

// Task Routes
app.use('/api/tasks', taskRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
