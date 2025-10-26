import { IUser, User } from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import db from '../models/index.js';

// --- Checagem de Chave Secreta JWT ---
const getJwtSecret = (): jwt.Secret => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        // Erro 500: Falha na configuração do servidor
        throw { status: 500 , message: 'Erro interno: Chave JWT não configurada.' }; 
    }
    return secret;
};

// --- Checagem das Credenciais ---
const checkCredentials = (userCredentials?: any): any => {
    const { email, password } = userCredentials || {};

    if (!userCredentials || typeof userCredentials !== 'object' || !email || !password) {
        return false;
    }

    return userCredentials;
};

// --- Criação do Token JWT ---
const createJwtToken = (userId: string, email: string): string => {
    const token = jwt.sign({ id: userId, email }, getJwtSecret(), { expiresIn: '1d' });
    return token;
} 

// --- Criação do Hash da Senha ---
const createPasswordHash = async (password: string): Promise<string> => {
    
    const salt = await bcrypt.genSalt(10);
    
    const hashedPassword = await bcrypt.hash(password, salt);
    
    return hashedPassword;

}

// --- Verificação da Senha ---
const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    return await bcrypt.compare(password, hashedPassword);
}

// --- Validação da Senha ---
const isValidPasasword = (password: string): boolean => {
    password.trim();
    return password.length >= 6;
} 

const findUserByEmail = async (email: string, includePassword: boolean = false): Promise<IUser | null> => {
    const user = await db.users.findOne(
        { where: { email: email }, 
        attributes: includePassword ? undefined : { exclude: ['password'] }
    });
    return user;
}

export async function attemptToLogUser(userCredentials: IUser) : Promise<any> {
    
    
    const checkedCredentials: any = checkCredentials(userCredentials);

    const uncheckedUser = await findUserByEmail(checkedCredentials.email, true);
    
    if (!uncheckedUser || !checkedCredentials) {
        return { status: 401, message: 'Email ou senha inválidos' };
    }
    
    const checkedUser = checkCredentials(uncheckedUser);

    const isMatch = isValidPasasword(checkedCredentials.password) && await verifyPassword(checkedCredentials.password, checkedUser.password);

    if (!isMatch) {
        return { status: 401, message: 'Email ou senha inválidos' };
    }

    const token = createJwtToken(checkedUser.id, checkedUser.email);
    return { 
        status: 200,
        token, 
        userData: {
            id: checkedUser.id,
            name: checkedUser.name,
            email: checkedUser.email,
        } 
    };
}

export async function attemptToRegisterUser(userData: IUser) : Promise<any> {
    
    const checkedCredentials: any = checkCredentials(userData);


    if (!checkedCredentials || !checkedCredentials.name || !checkedCredentials.email || !checkedCredentials.password) {
        return { status: 400, message: 'Email, senha e nome são obrigatórios.' };
    }

    const existingUser = await findUserByEmail(checkedCredentials.email, false);

    if (existingUser) {
        return { status: 409, message: existingUser.email + ' já está em uso.' };
    }

    
    if (checkedCredentials.password.length < 6) {
        return { status: 400, message: 'A senha deve ter pelo menos 6 caracteres.' };
    }

    const newUser = await db.users.create({
        name: checkedCredentials.name,
        email: checkedCredentials.email,
        password: await createPasswordHash(checkedCredentials.password),
    });

    console.log("newUser", newUser.id);

    const token = createJwtToken(newUser.id, newUser.email);

    return { 
        status: 200,
        token, 
        userData: newUser
    };
}
