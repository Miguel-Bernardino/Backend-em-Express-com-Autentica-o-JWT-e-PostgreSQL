import { Router } from 'express';
import * as taskController from '../controllers/taskController.js';
import {protectedMiddleware} from '../middleware/protectedMiddleware.js';

const router = Router();

router.use(protectedMiddleware);

/**
 * @openapi
 * components:
 *   schemas:
 *     TaskInput:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         completed:
 *           type: boolean
 */

/**
 * @openapi
 * /tasks:
 *   post:
 *     tags:
 *       - Tasks
 *     summary: Cria uma nova tarefa para o usuário autenticado
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskInput'
 *     responses:
 *       '201':
 *         description: Tarefa criada
 *       '400':
 *         description: Dados inválidos
 */
router.post('/tasks', taskController.CreateTask);

/**
 * @openapi
 * /tasks:
 *   get:
 *     tags:
 *       - Tasks
 *     summary: Retorna as tarefas do usuário autenticado
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: filter
 *         name: completed
 *         schema:
 *           type: boolean
 *         required: false
 *       - in: filter
 *         name: title
 *         schema:
 *           type: string
 *         required: false
 *       - in: filter
 *         name: description
 *         schema:
 *           type: string
 *         required: false
 *     responses:
 *       '200':
 *         description: Lista de tarefas
 */
router.get('/tasks', taskController.GetTasksByUserId);

/**
 * @openapi
 * /tasks/{id}:
 *   get:
 *     tags:
 *       - Tasks
 *     summary: Retorna uma tarefa pelo id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Tarefa encontrada
 *       '404':
 *         description: Tarefa não encontrada
 */
router.get('/tasks/:id', taskController.GetTaskById);

/**
 * @openapi
 * /tasks/{id}:
 *   put:
 *     tags:
 *       - Tasks
 *     summary: Atualização completa da tarefa
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskInput'
 *     responses:
 *       '200':
 *         description: Tarefa atualizada
 */
router.put('/tasks/:id', taskController.FullUpdateTask);

/**
 * @openapi
 * /tasks/{id}:
 *   patch:
 *     tags:
 *       - Tasks
 *     summary: Atualização parcial da tarefa
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskInput'
 *     responses:
 *       '200':
 *         description: Tarefa atualizada parcialmente
 */
router.patch('/tasks/:id', taskController.PartialUpdateTask);

/**
 * @openapi
 * /tasks/{id}:
 *   delete:
 *     tags:
 *       - Tasks
 *     summary: Deleta uma tarefa
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Tarefa deletada
 */
router.delete('/tasks/:id', taskController.DeleteTask);

/**
 * @openapi
 * /tasks/{id}/restore:
 *   patch:
 *     tags:
 *       - Tasks
 *     summary: Restaura uma tarefa deletada
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Tarefa restaurada
 */
router.patch('/tasks/:id/restore', taskController.restoreTask);

export default router;