import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

//Rotas
import userRoutes from './routes/userRoutes';
import movimentRoutes from './routes/movimentRoutes';

const app: Application = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rotas
app.use('/api/users', userRoutes); //Login, criação de usuário e listagem de usuários
app.use('/api/moviments', movimentRoutes); // CRUD das transações

export default app;