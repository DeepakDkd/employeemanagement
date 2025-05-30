// server.ts
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import pool from '../db/index.ts';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Example route using PostgreSQL
app.get('/users', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error('Error querying database:', err);
    res.status(500).send('Internal Server Error');
  }
});

// Start server after confirming DB connection
async function startServer() {
  try {
    await pool.query('SELECT 1'); // Test DB connection
    console.log('✅ Database connected successfully.');

    app.listen(port, () => {
      console.log(`🚀 Server is running at http://localhost:${port}`);
    });
  } catch (err) {
    console.error('❌ Failed to connect to the database:', err);
    process.exit(1); // Exit the app if DB connection fails
  }
}

startServer();

export default app;