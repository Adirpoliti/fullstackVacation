import  jwt  from "jsonwebtoken";
import { UserContainer, UserType } from "../models/User-Model";

export const userSecret = "hash-token1";

export const getUserToken = (user: UserType): { token: string, registeredUser: {} } => {
    const container = {user};
    const options = { expiresIn: '24h' };
    const token = jwt.sign(container, userSecret, options);
    const containerUser = jwt.decode(token) as { user: UserContainer }
    const registeredUser = {
        firstName: containerUser.user.firstName,
        lastName: containerUser.user.lastName,
        email: containerUser.user.email,
        role: containerUser.user.role,
        vacationsFollowed: containerUser.user.vacationsFollowed,
        _id: containerUser.user._id
    }
    return { token, registeredUser };
}