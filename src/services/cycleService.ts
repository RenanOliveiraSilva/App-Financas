import { PrismaClient } from '@prisma/client';
import { calculateCycleDates } from '../utils/cycleUtils';

const prisma = new PrismaClient();

const cycleService = {
    getCurrentCycle: async (userId: number) => {
        // Obtenha o dia de início do ciclo configurado pelo usuário
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { cycleStartDay: true },
        });

        if (!user?.cycleStartDay) {
            throw new Error('Ciclo não configurado para o usuário');
        }

        // Calcula o ciclo atual com base na data atual
        const { startDate, endDate } = calculateCycleDates(user.cycleStartDay);

        return { startDate, endDate };
    },
    postInitialCycle: async (userId: number, cycleStartDay: number) => {
        return await prisma.user.update({
            where: { id: userId },
            data: { cycleStartDay },
        });
    }
};

export default cycleService;