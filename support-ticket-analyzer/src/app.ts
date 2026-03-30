import express, { Application } from 'express';
import analyzerRoutes from './routes/analyzerRoutes';

const app: Application = express();

app.use(express.json());

app.use('/api', analyzerRoutes);

export default app;
