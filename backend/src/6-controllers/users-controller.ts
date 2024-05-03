import express, { NextFunction, Response, Request } from 'express'
import { getAllUsersLogic } from '../5-logic/users-logic';

const router = express.Router();

router.get('/users', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await getAllUsersLogic();
        res.json(users);
    } catch (err) {
        next(err)
    }
});

export default router;