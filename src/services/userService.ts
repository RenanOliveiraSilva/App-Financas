import { PrismaClient, User } from '@prisma/client';
import bcrypt from 'bcrypt';
import { get } from 'http';

const prisma = new PrismaClient();

const SALT_ROUNDS = 10;

const userServices = {
    getUser: async (): Promise<User[]> => {
        return await prisma.user.findMany();
    },
    getExistingEmailUser: async (email: string): Promise<User | null> => {
        return await prisma.user.findUnique({
            where: {
                email
            }
        })
    },
    getCycleUserByUserId: async (userId: number): Promise<{ cycleStartDay: number | null } | null> => {
        return await prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                cycleStartDay: true
            }
        });
    },
    createUser: async(email: string, password: string, name: string): Promise<User> => {
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        return await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name
            }
        })
    },
    validateUser: async (email: string, password: string): Promise<User | null> => {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if(!user) {
            return null;
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if(!isValidPassword) {
            return null;
        }

        return user;
    }


}

export default userServices;
