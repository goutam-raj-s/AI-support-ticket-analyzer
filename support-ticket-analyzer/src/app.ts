import express, { Application } from 'express';
import analyzerRoutes from './routes/analyzer/analyzerRoutes';

const app: Application = express();

app.use(express.json());

app.use('/api', analyzerRoutes);

export default app;
