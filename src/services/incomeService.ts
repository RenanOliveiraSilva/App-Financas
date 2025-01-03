import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const incomeServices = {
    getAllIncomes: async (userId: number) => {
        return await prisma.income.findMany(
            { where: {userId} }
        );
    },
    getFixedIncomes: async (userId: number) => {
        return await prisma.income.findMany(
            { where: {userId, type: "Fixed"}  }
        );
    },
    getVariableIncomes: async (userId: number) => {
        return await prisma.income.findMany(
            { where: {userId, type: "Variable"}  }
        );
    },
    getIncomeById: async (id: number) => {
        return await prisma.income.findUnique(
            { where: {id} }
        );
    },
    postIncome: async (userId: number, amount: number, description: string, type: 'Fixed' | 'Variable', date?: Date) => {
        return await prisma.income.create({
            data: {
                userId,
                description,
                amount,
                type,
                date: type === 'Variable' ? date : undefined,
            },
        });
    },
    editIncome: async (id: number, amount: number, description: string, type: 'fixed' | 'variable', date?: Date) => {
        return await prisma.income.update({
            where: {
                id: id,
            },
            data: {
                description,
                amount,
                type,
                date: type === 'variable' ? date : undefined,
            }
        })
    },
    deleteIncome: async (id: number) => {
        return await prisma.income.delete({
            where: {
                id,
            },
        });
    },
    
}

export default incomeServices;