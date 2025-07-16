import express, { Request, Response , Application } from 'express';
import userRoutes from '../routes/userRoutes';
import authRoutes from '../routes/authRoutes';
import cors from 'cors';
import cookieparser from 'cookie-parser';

const app:Application = express();
const port = 3000;


app.use(cors());

// app.use(cors({
//   origin: 'http://localhost:3000', // Adjust this to your frontend URL
//   credentials: true, // Allow cookies to be sent
// }));

app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
app.use(express.static('public')); // Serve static files from the 'public' directory
app.use(cookieparser());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, Express + TypeScript!');
});

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

// Error handling middleware
import { errorHandler } from '../middleware/errorHandler';
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

