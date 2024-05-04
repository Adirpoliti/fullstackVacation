import { UserContainer } from "../4-models/User-Model";
import { NextFunction, Request, Response } from 'express';
import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../4-models/ErrorModel";

export const verifyUserAdmin = async (req: Request): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
        try {
            const header = req.header("authorization");
            const token = header.substring(7);
            const container = jwt.decode(token) as UserContainer;
            const user = container.user;
            resolve(user.role === "admin" ? true : false);
        } catch (err) {
            reject(UnauthorizedError)
        }
    });
}

export const verifyAdminMiddlewere = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const isAdmin = await verifyUserAdmin(req);
        if (!isAdmin) UnauthorizedError('you are not admin')
        next();
    } catch (err: any) {
        next(err)
    }
}