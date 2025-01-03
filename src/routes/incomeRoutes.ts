import { Router } from 'express';
import incomeController from '../controllers/incomeController';
import { authenticateToken } from '../middlewares/token';

const incomeRouter = Router();

incomeRouter
    .get('/getAllIncomes', authenticateToken, incomeController.getAllIncomes)
    .get('/getFixedIncomes', authenticateToken, incomeController.getFixedIncomes)
    .get('/getVariableIncomes', authenticateToken, incomeController.getVariableIncomes)
    .post('/createIncome', authenticateToken, incomeController.postCreateIncome)
    .put('/editIncome', authenticateToken, incomeController.editIncome)
    .delete('/deleteIncome', authenticateToken, incomeController.deleteIncome);

export default incomeRouter;