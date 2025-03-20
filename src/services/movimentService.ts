import { PrismaClient, Moviment } from '@prisma/client';

const prisma = new PrismaClient();

export const movimentServices = {
    getMoviments: async (): Promise<Moviment[]> => {

        return await prisma.moviment.findMany();
    },
    getMovimentsByUserId: async( userId: number ): Promise<Moviment[] | null> => {
        return await prisma.moviment.findMany({
            where: {
                userId: userId
            }
        });
    }
}