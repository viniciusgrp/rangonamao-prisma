import { Router } from 'express';
import SessionController from '../controllers/session.controller';

const router = Router();

router.post('/login', SessionController.createSession);

export default router;


