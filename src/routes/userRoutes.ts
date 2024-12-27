import { Request, Response, Router } from 'express';
import userController from '../controllers/userController';
import { authenticateToken } from '../middlewares/token';

const userRouter = Router();

userRouter
    .get('/', userController.getUsers)
    .post('/login', userController.loginUser)
    .post('/create', userController.createUser);

userRouter.get('/protected', authenticateToken, (req: Request, res: Response) => {
    res.json({ message: 'Acesso permitido', user: req.user });
});

export default userRouter;
