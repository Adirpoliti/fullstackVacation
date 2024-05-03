import { Request, Response, NextFunction } from 'express';
import { routeNotFoundError } from '../4-models/error-models';


export const routeNotFound = (req: Request, res: Response, nextFunc: NextFunction) => {
   
    const err = routeNotFoundError(req.originalUrl);

    nextFunc(err) // --> go to catch-all Middleware
}