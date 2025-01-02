import { Request, Response } from 'express';
import incomeServices from '../services/incomeService';

const incomeController = {
    getAllIncomes: async (req: Request, res: Response): Promise<void> => {
        try {
            const user = req.user as { id: number }; // Assume que o payload do token contém o ID do usuário
            const incomes = await incomeServices.getAllIncomes(user.id);

            res.status(200).json(incomes);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar rendas' });
        }
    },
    getFixedIncomes: async (req: Request, res: Response): Promise <void> => {
        try {
            const user = req.user as { id: number };
            const fixedIncomes = await incomeServices.getFixedIncomes(user.id);

            res.status(200).json(fixedIncomes);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar rendas fixas' });
        }

    },
    getVariableIncomes: async (req: Request, res: Response): Promise<void> => {
        try {
            const user = req.user as { id: number };
            const variableIncomes = await incomeServices.getVariableIncomes(user.id);

            res.status(200).json(variableIncomes);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar rendas variáveis' });
        }
    },
    postCreateIncome: async (req: Request, res: Response): Promise<void> => {
        try {
            const user = req.user as { id: number };
            const { amount, description, type, date } = req.body;

            if (!amount || !description || !type) {
                res.status(400).json({ error: 'Campos obrigatórios não preenchidos' });
                return;
            }

            const newIncome = await incomeServices.postIncome(user.id, amount, description, type, date);

            res.status(201).json(newIncome);
            
        } catch (error) {
            res.status(500).json({ error: 'Erro ao criar renda' });

        }
    },
    editIncome: async (req: Request, res: Response): Promise<void> => {
        try { 
            const { id, amount, description, type, date } = req.body;
            const idExists = await incomeServices.getIncomeById(id);

            if(!idExists) {
                res.status(404).json({ error: 'Renda não encontrado' });
                return;
            }

            if (!id || !amount || !description || !type) {
                res.status(400).json({ error: 'Campos obrigatórios não preenchidos' });
                return;
            }

            const editedIncome = await incomeServices.editIncome(id, amount, description, type, date);

            res.status(200).json(editedIncome);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao editar renda' });

        }
    },    
    deleteIncome: async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.body;
            if (!id) {
                res.status(400).json({ error: 'ID da renda não informado' });
                return;
            }

            await incomeServices.deleteIncome(id);

            res.status(200).json({ message: 'Renda deletada com sucesso' });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao deletar renda' });
        }
    }
}

export default incomeController;