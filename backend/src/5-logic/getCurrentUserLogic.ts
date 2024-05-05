import { Request } from "express";
import jwt from "jsonwebtoken";
import { verifyTokenUser } from "../3-middleware/verifyToken";
import { UnauthorizedError } from "../4-models/ErrorModel";
import { UserContainer, UserType } from "../4-models/User-Model";

export const getCurrentUser = async (request: Request): Promise<UserType> => {
    try {
        const isLoggedIn = await verifyTokenUser(request);
        if (!isLoggedIn) {
            UnauthorizedError("Not logged in");
        };
        const header = request.header("authorization");
        const token = header.substring(7);
        const container = jwt.decode(token) as UserContainer;
        return container.user;
    } catch (error) {
        throw error;
    }
}