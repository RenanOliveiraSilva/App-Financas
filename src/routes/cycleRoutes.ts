import { Router } from 'express';
import cycleController from '../controllers/cycleController';
import { authenticateToken } from '../middlewares/token';

const cycleRouter = Router();

cycleRouter
    .post('/initialCycle', authenticateToken, cycleController.postInitialCycle);

export default cycleRouter;