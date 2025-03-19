import { Router } from 'express';
import userController from '../controllers/userController';

const userRouter = Router();

userRouter
    .get('/', userController.getUsers)
    .post('/login', userController.loginUser)
    .post('/create', userController.createUser);

export default userRouter;
