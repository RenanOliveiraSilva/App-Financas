import { Request, Response } from "express";
import { movimentServices } from "../services/movimentService";


export const movimentController = {
    getMoviments: async (req: Request, res: Response): Promise<void> => {
        try {
            const moviments = await movimentServices.getMoviments();
            if(!moviments) {
                res.status(404).json({ error: 'Movimentos não encontrados' });
                return;
            }

            res.status(200).json(moviments);

        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar movimentos' });
        }
    },
    getMovimentByUserId: async(req: Request, res:Response): Promise<void> => {
        try {
            const { userId } = req.params;
            const moviments = await movimentServices.getMovimentsByUserId(Number(userId));

            if(!moviments) {
                res.sendStatus(404).json({ error: "Movimentação não encontrada" });
                return;
            }

            res.status(200).json(moviments);

        } catch (error) {}
    },
    createMoviment: async (req: Request, res: Response): Promise<void> => {
        try {
            const { userId, categoryId  } = req.params;
            const { description, ammount, type, incomeType, outcomeType, isParcelled } = req.body;
            
            if(!userId || !categoryId || !description || !ammount || !type || !isParcelled) {
                res.status(400).json({ error: 'Dados obrigatórios não foram preenchidos' });
                return;
            }

            if(type === 'income') {
                res.status(400).json({ error: 'Tipo de entrada obrigatório não foi preenchido' });
                return;
            }

            if(isParcelled) {
                const { installmentNumber, ammount, dueDate } = req.body;
                if(!installmentNumber || !ammount || !dueDate) {
                    res.status(400).json({ error: 'Dados da parcela obrigatórios não foram preenchidos' });
                    return;
                }
            }


            res.json({message: 'Moviment created'})
        } catch (error) {
            res.status(500).json({ error: 'Erro ao criar movimento' });
        }
    },
    updateMoviment: async (req: Request, res: Response): Promise<void> => {
        try {
            res.json({message: 'Moviment updated'})
        } catch (error) {
            res.status(500).json({ error: 'Erro ao atualizar movimento' });
        }
    },
    deleteMoviment: async (req: Request, res: Response): Promise<void> => {
        try {
            res.json({message: 'Moviment deleted'})
        } catch (error) {
            res.status(500).json({ error: 'Erro ao deletar movimento' });
        }
    }
}