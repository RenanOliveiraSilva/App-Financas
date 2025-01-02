import { Router } from 'express';
import userController from '../controllers/userController';
import { authenticateToken } from '../middlewares/token';

const userRouter = Router();

userRouter
    .get('/', userController.getUsers)
    .post('/login', userController.loginUser)
    .post('/create', userController.createUser);

export default userRouter;
