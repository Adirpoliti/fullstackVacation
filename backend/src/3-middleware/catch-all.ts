import { Request, Response, NextFunction } from 'express';
import { logger } from '../2-utils/logger';
import { ErrorType } from '../4-models/error-models';


export const catchAll = (err: ErrorType, req: Request, res: Response, nextFunc: NextFunction) => {

    // Log the error on the console
    console.log(err);
    
    // Log the error on the console
    logger(err.message);

    // Send back the error to the front
    res.status(err.status).send(err.message);
}