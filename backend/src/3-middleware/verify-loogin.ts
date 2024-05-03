import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../2-utils/cyber';
import { unauthorizedError } from '../4-models/error-models';


export const verifyLoggedIn = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const isValid = await verifyToken(req);
        if(!isValid) unauthorizedError("Invalid token");
        next();
    }catch(err:any){
        next(err);
    }
}