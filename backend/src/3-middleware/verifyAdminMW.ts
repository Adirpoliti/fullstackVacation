import { Request, Response, NextFunction } from 'express';
import { verifyAdmin } from '../2-utils/cyber';
import { unauthorizedError } from '../4-models/error-models';


export const verifyAdminMW = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const isOkay = await verifyAdmin(req);
        if(!isOkay) unauthorizedError("Oh No! You're not admin - go away!")
        next();
    }catch(err:any){
        next(err);
    }
}