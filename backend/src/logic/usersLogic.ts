import { UserCredentialsType, UserType, validateUser, validateUserCredentials } from "../models/User-Model";
import { User } from "../utils/dal";
import { getUserToken } from "../utils/cyber";
import { UnauthorizedError } from "../models/ErrorModel";

export const loginUserLogic = async (credentials: UserCredentialsType) => {
    validateUserCredentials(credentials)
    const users = await User.findOne({ email: credentials.email })
    return new Promise((resolve, reject) => {
        try {
            if (users && users.email === credentials.email && users.password === credentials.password) {
                const getToken = getUserToken(users)
                resolve(getToken)
            } else {
                UnauthorizedError("incorect email or password")
            }
        } catch (error) {
            reject(UnauthorizedError(error))
        }
    })
}

export const registerUserLogic = async (newUser: UserType) => {
    const findUser = await User.findOne({ email: newUser.email })
    if (findUser) return "Email already exist"
    validateUser(newUser)
    newUser.role = 'user';
    newUser.vacationsFollowed = [];
    return new Promise((resolve, reject) => {
        User.insertMany(newUser as UserType)
            .then(() => {
                console.log('User saved successfully');
                const getToken = getUserToken(newUser)
                resolve(getToken);
            })
            .catch((error) => {
                console.error('Error saving user:', error);
                reject(UnauthorizedError(error));
            });
    })
}