import { Request, Response } from 'express';

export const protectedAccess = (req: Request, res: Response) => {
  
    res.status(200).json({ message: '✅ Acesso autorizado.' });

};