import { Router } from 'express';
import * as protectedController from '../controllers/protectedController.js';
import {protectedMiddleware} from '../middleware/protectedMiddleware.js';

const router = Router();

router.get('/protected', protectedMiddleware, protectedController.protectedAccess);

export default router;