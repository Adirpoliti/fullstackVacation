import jwt from "jsonwebtoken";
import { Request } from 'express';
import { userSecret } from "../utils/cyber";

export const verifyTokenUser = (request: Request): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
        try {
            const header = request.header("authorization");
            if (!header) {
                resolve(false);
                return;
            }
            const token = header.substring(7);
            if (!token) {
                resolve(false);
                return;
            } jwt.verify(token, userSecret, (err) => {
                if (err) {
                    resolve(false);
                    return;
                }
                resolve(true);
            });
        }
        catch (err) {
            reject(err);
        }
    });
}