import express, { NextFunction, Response, Request } from 'express'
import { LoginCredentials, UserType } from '../4-models/userModel';
import { loginUserLogic, signupUserLogic } from '../5-logic/auth-logic';

const router = express.Router();

router.post('/auth/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const credentials = req.body as LoginCredentials
        const token = await loginUserLogic(credentials)
        res.json(token);
    } catch (err) {
        next(err)
    }
});

router.post('/auth/signup', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.body as UserType;
        const token = await signupUserLogic(user);
        res.json(token);
    } catch (err) {
        next(err)
    }
});

export default router;