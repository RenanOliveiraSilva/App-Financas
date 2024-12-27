import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

//Rotas
import userRoutes from './routes/userRoutes';

const app: Application = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rotas
app.use('/api/users', userRoutes);

export default app;