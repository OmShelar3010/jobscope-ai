import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import jobRoutes from './routes/jobRoutes';
import analyticsRoutes from './routes/analyticsRoutes';

import { createServer } from 'http';
import { initSocket } from './utils/socket';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/analytics', analyticsRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('JobScope AI Backend is running!');
});

// Start server via httpServer instead of app.listen
httpServer.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    initSocket(httpServer);
});
