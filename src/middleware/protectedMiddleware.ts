import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: jwt.JwtPayload;
    }
  }
}


export const protectedMiddleware = (req: Request, res: Response, next: NextFunction) => {

    const header = req.headers.authorization;
    
    if (!header || !header.startsWith('Bearer ')) {
        return res.status(401).json({ status: 401, message: '❌ Não autorizado: token ausente ou inválido.' });
    }
    
    const token = header.split(' ')[1];

    if(!token) {
        return res.status(401).json({ status: 401, message: '❌Não autorizado: token ausente.' });
    }

    // Verificar e decodificar o token JWT
    jwt.verify(token, process.env.JWT_SECRET as string, (err: any, decoded: string | jwt.JwtPayload | undefined) => {
        
        if (err) {
            return res.status(401).json({ 
                status: 401,
                message: '❌ Não autorizado: token inválido.' 
            });
        }

        // Opcional: anexar dados decodificados à requisição
        (req as any).user = decoded;
        next();
    });


}