import { Router } from 'express';
import expenseController from '../controllers/expenseController';
import { authenticateToken } from '../middlewares/token';

const expenseRouter = Router();

expenseRouter
    .get('/getAllExpenses', authenticateToken, expenseController.getAllExpenses)
    .get('/getUniqueExpenses', authenticateToken, expenseController.getUniqueExpenses)
    .get('/getRecurringExpenses', authenticateToken, expenseController.getRecurringExpenses)
    .get('/getInstallmentExpenses', authenticateToken, expenseController.getInstallmentExpenses)
    .post('/createExpense', authenticateToken, expenseController.createExpense)
    .delete('/deleteExpense', authenticateToken, expenseController.deleteExpense);

export default expenseRouter;