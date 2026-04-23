import express, { Application, Request, Response } from 'express';
import loadRoutes from './routes/loadRoutes';

const app: Application = express();

app.use(express.json());

app.use('/api/loads', loadRoutes);

app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

export default app;
