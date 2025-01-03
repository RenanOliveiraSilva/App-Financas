import { Request, Response } from 'express';
import cycleService from '../services/cycleService';

const cycleController = {
    postInitialCycle: async (req: Request, res: Response): Promise<void> => {
        const userId = req.user?.id; // Obtém o ID do usuário autenticado
        const { cycleStartDay } = req.body; // Obtém o dia de início do ciclo enviado pelo cliente

        if (!cycleStartDay || cycleStartDay < 1 || cycleStartDay > 31) {
            res.status(400).json({ error: 'O dia de início do ciclo deve estar entre 1 e 31' });
            return;
        }

        try {
            const updatedUser = await cycleService.postInitialCycle(userId, cycleStartDay);
            res.status(200).json({
                message: 'Ciclo inicial configurado com sucesso',
                cycleStartDay: updatedUser.cycleStartDay,
            });
            
        } catch (error) {
            console.error('Erro ao configurar o ciclo inicial:', error);
            res.status(500).json({ error: 'Erro ao configurar o ciclo inicial' });
        }
    },
    getCurrentCycle: async (req: Request, res: Response): Promise<void> => {
        const userId = req.user?.id; // Obtém o ID do usuário autenticado

        try {
            const cycle = await cycleService.getCurrentCycle(userId);
            res.status(200).json(cycle);
            
        } catch (error) {
            console.error('Erro ao obter o ciclo atual:', error);
            res.status(500).json({ error: 'Erro ao obter o ciclo atual' });
        }
    }
};

export default cycleController;
