import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const SECRET_KEY = process.env.JWT_SECRET || 'minha-chave-secreta';

// Extensão da interface Request para incluir o campo `user`
declare module 'express-serve-static-core' {
    interface Request {
        user?: JwtPayload;
    }
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ error: 'Token não fornecido ou formato inválido' });
        return; // Interrompe a execução do middleware
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;
        req.user = decoded;
        next(); // Encaminha para o próximo middleware ou rota
    } catch (error) {
        res.status(403).json({ error: 'Token inválido' });
        return; // Interrompe o fluxo e não chama o next()
    }
};