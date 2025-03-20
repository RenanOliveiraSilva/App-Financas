import { Router } from 'express';
import { movimentController } from '../controllers/movimentController';

const movimentRouter = Router();

movimentRouter
    .get('/', movimentController.getMoviments)
    .get('/:userId', movimentController.getMovimentByUserId);


export default movimentRouter;