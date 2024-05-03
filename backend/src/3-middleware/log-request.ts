import { Request, Response, NextFunction } from 'express';


export const logRequest = (req: Request, res: Response, nextFunc: NextFunction) => {
    console.log(`Request Method: ${req.method}, Request Route: ${req.originalUrl}`);

    nextFunc() // --> go to the next func (middleware)
}