import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const SECRET_KEY = process.env.JWT_SECRET || 'minha-chave-secreta';

// Estende a interface Request
declare module 'express-serve-static-core' {
    interface Request {
        user?: string | JwtPayload; // Adiciona a propriedade `user`
    }
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.status(401).json({ error: 'Token não fornecido' });
        return; // Garante que a execução do middleware seja interrompida
    }

    const token = authHeader.split(' ')[1];

    try {
        const user = jwt.verify(token, SECRET_KEY) as string | JwtPayload;
        req.user = user;
        next(); // Continua para o próximo middleware/rota
    } catch (error) {
        res.status(403).json({ error: 'Token inválido' });
        return; // Garante que a execução do middleware seja interrompida
    }
};
