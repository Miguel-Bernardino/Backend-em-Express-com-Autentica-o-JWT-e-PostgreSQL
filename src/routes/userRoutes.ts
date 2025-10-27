import {        Router         } from 'express';
import { LogUser, RegisterUser } from '../controllers/userController.js';

const userRoutes = Router();

/**
 * @openapi
 * /login:
 *   post:
 *     tags:
 *       - User
 *     summary: Faz login e retorna um token JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Login realizado
 */
userRoutes.post('/login', LogUser);

/**
 * @openapi
 * /register:
 *   post:
 *     tags:
 *       - User
 *     summary: Registra um novo usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Usuário criado
 */
userRoutes.post('/register', RegisterUser);

export default userRoutes;