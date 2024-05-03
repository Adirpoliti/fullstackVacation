import { Request, Response, NextFunction } from 'express';


export const sabbathForbidden = (req: Request, res: Response, nextFunc: NextFunction) => {

    const now = new Date();
    const day = now.getDay() + 1;
    if(day === 7) {
        res.send("Can't get service on Sabbath.");
        return
    }

    nextFunc() // --> go to the next func (middleware)
}