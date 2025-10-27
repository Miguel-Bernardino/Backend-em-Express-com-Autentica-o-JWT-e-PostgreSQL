import { Router } from 'express';
import * as protectedController from '../controllers/protectedController.js';
import {protectedMiddleware} from '../middleware/protectedMiddleware.js';

const router = Router();

/**
 * @openapi
 * /protected:
 *   get:
 *     tags:
 *       - Protected
 *     summary: Rota protegida que exige JWT
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Acesso permitido
 *       '401':
 *         description: Não autorizado
 */
router.get('/protected', protectedMiddleware, protectedController.protectedAccess);

export default router;