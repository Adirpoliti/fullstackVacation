import express, { NextFunction, Request, Response } from 'express'
import { UserCredentialsType, UserType } from '../4-models/User-Model';
import { loginUserLogic, registerUserLogic } from '../5-logic/usersLogic';

const router = express.Router()

router.post('/auth/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const credentials: UserCredentialsType = req.body;
        const response = await loginUserLogic(credentials);
        res.json(response);
    } catch (err) {
        next(err);
    }
});

router.post('/auth/register', async (req: Request, res: Response, nextfunc: NextFunction) => {
    try {
        const newUser = req.body as UserType;
        const response = await registerUserLogic(newUser);
        response === "Email already exist" ? res.status(409).json(response) : res.status(201).json(response);
    } catch (err) {
        nextfunc(err);
    }
});

export default router