import { Request, Response } from 'express';
import expenseService from '../services/expenseService';
import userService from '../services/userService';

const expenseController = {
    createExpense: async (req: Request, res: Response): Promise<void> => {
        const userId = req.user?.id;
        const { description, amount, date, expenseType, installments } = req.body;
        const cycleStartDay = await userService.getCycleUserByUserId(userId);
        const descriptionExists = await expenseService.getExpenseByDescription(description);

        if (!cycleStartDay) {
            res.status(400).json({ error: 'Dia de início do ciclo não encontrado' });
            return;
        }

        if (!description || !amount || !date || !expenseType) {
            res.status(400).json({ error: 'Campos obrigatórios não preenchidos' });
            return;
        }

        if (expenseType === 'installment' && !installments) {
            res.status(400).json({ error: 'Parcelas devem ser especificadas para despesas parceladas' });
            return;
        }

        if (expenseType === 'installment' && installments < 2) {
            res.status(400).json({ error: 'Despesas parceladas devem ter duas ou mais parcelas' });
            return;
        }

        if (descriptionExists.length > 0) {
            res.status(400).json({ error: 'Despesa com essa descrição já está cadastrada' });
            return;
        }

        if (expenseType === 'recurring') {
            const existRecurringExpense = await expenseService.getRecurringExpensesByDescription(description);

            if (existRecurringExpense.length > 0) {
                res.status(400).json({ error: 'Despesa recorrente já cadastrada' });
                return;
            }
        }

        try {
            const createdExpense = await expenseService.createExpense(
                userId,
                description,
                amount,
                new Date(date),
                expenseType,
                installments
            ); 

            res.status(201).json(createdExpense);

        } catch (error) {
            console.error('Erro ao criar despesa:', error);
            res.status(500).json({ error: 'Erro ao criar despesa' });
        }
    },
    getAllExpenses: async (req: Request, res: Response): Promise<void> => {
        const userId = req.user?.id;

        try {
            const expenses = await expenseService.getAllExpenses(userId);
            res.status(200).json(expenses);

        } catch(error) {
            console.error('Erro ao obter despesas:', error);
            res.status(500).json({ error: 'Erro ao obter despesas' });
        }
    },
    getUniqueExpenses: async (req: Request, res: Response): Promise<void> => {
        const userId = req.user?.id;

        try {
            const uniqueExpenses = await expenseService.getUniqueExpenses(userId);
            res.status(200).json(uniqueExpenses);

        } catch(error) {
            console.error('Erro ao obter despesas únicas:', error);
            res.status(500).json({ error: 'Erro ao obter despesas únicas' });
        }
    },
    getRecurringExpenses: async (req: Request, res: Response): Promise<void> => {
        const userId = req.user?.id;

        try {
            const recurringExpenses = await expenseService.getRecurringExpenses(userId);
            res.status(200).json(recurringExpenses);

        } catch(error) {
            console.error('Erro ao obter despesas recorrentes:', error);
            res.status(500).json({ error: 'Erro ao obter despesas recorrentes' });
        }
    },
    getInstallmentExpenses: async (req: Request, res: Response): Promise<void> => {
        const userId = req.user?.id;

        try {
            const installmentExpenses = await expenseService.getInstallmentExpenses(userId);
            res.status(200).json(installmentExpenses);

        } catch(error) {
            console.error('Erro ao obter despesas parceladas:', error);
            res.status(500).json({ error: 'Erro ao obter despesas parceladas' });
        }
    },
    deleteExpense: async (req: Request, res: Response): Promise<void> => {
        const userId = req.user?.id;
        const { expenseId } = req.body;

        const expense = await expenseService.getExpenseById(expenseId);

        if (!expense) {
            res.status(404).json({ error: 'Despesa não encontrada' });
            return;
        }

        try {
            if (expense.expenseType === 'installment') {
                const deletedInstallmentsExpenses = await expenseService.deleteAllInstallments(userId, expense.description);
                res.status(200).json(deletedInstallmentsExpenses);
            }

            const deletedExpenses = await expenseService.deleteExpense(expenseId);
            res.status(200).json(deletedExpenses);

        } catch(error) {
            console.error('Erro ao deletar despesa:', error);
            res.status(500).json({ error: 'Erro ao deletar despesa' });
        }

    }

};

export default expenseController;