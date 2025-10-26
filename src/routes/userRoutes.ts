import {        Router         } from 'express';
import { LogUser, RegisterUser } from '../controllers/userController.js';

const userRoutes = Router();

userRoutes.post('/login', LogUser);
userRoutes.post('/register', RegisterUser);

export default userRoutes;