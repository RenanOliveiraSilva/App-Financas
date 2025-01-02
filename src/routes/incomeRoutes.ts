import { Router } from 'express';
import incomeController from '../controllers/incomeController';
import { authenticateToken } from '../middlewares/token';

const incomeRouter = Router();

incomeRouter
    .get('/getAllIncomes', incomeController.getAllIncomes)
    .get('/getFixedIncomes', incomeController.getFixedIncomes)
    .get('/getVariableIncomes', incomeController.getVariableIncomes)
    .post('/createIncome', authenticateToken, incomeController.postCreateIncome)
    .put('/editIncome', authenticateToken, incomeController.editIncome)
    .delete('/deleteIncome', authenticateToken, incomeController.deleteIncome);

export default incomeRouter;