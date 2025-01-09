import { Request, Response } from 'express';
import userServices from '../services/userService';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET  || 'minha-chave-secreta';

const userController = {
    getUsers: async (req: Request, res: Response): Promise<void> => {
        try {
            const users = await userServices.getUser();
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar usuários' });
        }   

    },
    createUser: async (req: Request, res: Response): Promise<void> => {
        try {
            const { email, password, name } = req.body;
            
            const existingUserEmail = await userServices.getExistingEmailUser(email);

            if(existingUserEmail) {
                res.status(400).json({ error: 'Email já cadastrado' })
                return
            }

            if(!email || !password || !name) {
                res.status(400).json({ error: 'Campos obrigatórios não preenchidos' });
                return;
            }



            const newUser = await userServices.createUser(email, password, name);
            res.status(201).json(newUser);

        } catch (error) {
            res.status(500).json({ error: 'Erro ao criar usuário' });
            
        }
    },
    loginUser: async (req: Request, res: Response): Promise<void> => {
        try {
            const { email, password } = req.body;

            if(!email || !password) {
                res.status(400).json({ error: 'Campos obrigatórios não preenchidos' });
                return;
            }

            const user = await userServices.getExistingEmailUser(email);

            if(!user) {
                res.status(401).json({ error: 'Usuário ou Senha inválida' });
                return;
            }

            const isValidPassword = await userServices.validateUser(email, password);

            if(!isValidPassword) {
                res.status(401).json({ error: 'Usuário ou Senha inválida' });
                return;
            }
            
            // Gerar o token
            const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
                expiresIn: '1h', // Token válido por 1 hora
            });

            res.status(200).json({ token, user });
            
        } catch (error) {
            res.status(500).json({ error: 'Erro ao logar usuário' });
        }
    }

}

export default userController;