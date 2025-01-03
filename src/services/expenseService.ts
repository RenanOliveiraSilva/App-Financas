import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const expenseService = {
    createExpense: async (
        userId: number,
        description: string,
        amount: number,
        date: Date,
        expenseType: 'unique' | 'installment' | 'recurring',
        installments?: number
    ) => {
        if (expenseType === 'installment' && installments !== undefined) {
            const expenses = [];
            for(let i = 0; i < installments; i++) {
                const installmentDate = new Date(date);
                installmentDate.setMonth(installmentDate.getMonth() + i);
                expenses.push(
                    prisma.expense.create({
                        data: {
                            description: `${description} - Parcela ${i + 1}/${installments}`,
                            amount: amount / installments,
                            date: installmentDate,
                            expenseType: 'installment',
                            installments,
                            currentInstallment: i + 1,
                            userId,
                        },
                    })
                );
            }

            return await Promise.all(expenses);
        }

        return await prisma.expense.create({
            data: {
                userId,
                description,
                amount,
                date,
                expenseType,
                recurring: expenseType === 'recurring',
            }
        })
    },
    getExpenseById: async (expenseId: number) => {
        return await prisma.expense.findUnique({
            where: {
                id: expenseId
            }
        });
    },
    getExpenseByDescription: async (description: string) => {
        return await prisma.expense.findMany({
            where: {
                description
            }
        });
    },
    getAllExpenses: async (userId: number) => {
        return await prisma.expense.findMany({
            where: {
                userId
            }
        });
    },
    getUniqueExpenses: async (userId: number) => {
        return prisma.expense.findMany({
            where: {
                userId,
                expenseType: 'unique',
            }
        })
    },
    getInstallmentExpenses: async (userId: number) => {
        return prisma.expense.findMany({
            where: {
                userId,
                expenseType: 'installment',
            }
        });
    },
    getRecurringExpenses: async (userId: number) => {
        return await prisma.expense.findMany({
            where: {
                userId,
                expenseType: 'recurring',
            }
        });
    },
    getRecurringExpensesByDescription: async (description: string) => {
        return await prisma.expense.findMany({
            where: {
                description,
                expenseType: 'recurring',
            }
        });
    },
    deleteExpense: async (expenseId: number) => {
        return await prisma.expense.delete({
            where: {
                id: expenseId
            }
        });
    },
    deleteAllInstallments: async (userId: number, description: string) => {
        return await prisma.expense.deleteMany({
            where: {
                userId: userId,
                description: {
                    startsWith: description  // Remove todas as parcelas de uma despesa específica
                },
                expenseType: 'installment'
            }
        });
    }
}

export default expenseService;