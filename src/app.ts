import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

//Rotas
import userRoutes from './routes/userRoutes';
import incomeRoutes from './routes/incomeRoutes';
import cycleRoutes from './routes/cycleRoutes';

const app: Application = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rotas
app.use('/api/users', userRoutes); //Login, criação de usuário e listagem de usuários
app.use('/api/incomes', incomeRoutes); //CRUD de receitas
app.use('/api/cycle', cycleRoutes); //Configuração do ciclo 

export default app;