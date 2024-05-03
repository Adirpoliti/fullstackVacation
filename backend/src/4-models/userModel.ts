import Joi from 'joi';
import { reqBodyValidationError } from './error-models';

// export type RoleType = "user" | "admin";

export type LoginCredentials = {
    username: string;
    password: string;
}

export type UserType = {
    id: number;
    firstname: string;
    lastname: string;
    username: string;
    password: string;
    role: number;
}

export const userValidationSchema = Joi.object({
    id: Joi.number().optional().positive().integer(),
    firstname: Joi.string().required().min(2).max(30),
    lastname: Joi.string().required().min(2).max(30),
    username: Joi.string().required().min(4).max(12),
    password: Joi.string().required().min(6).max(50),
    role: Joi.forbidden()
})

export const validateUser = (user: UserType) => {
    const result = userValidationSchema.validate(user);
    if (result.error) reqBodyValidationError(result.error.message)
}

export const loginCredentialsValidationSchema = Joi.object({
    username: Joi.string().required().min(4).max(12),
    password: Joi.string().required().min(6).max(50),
})

export const validateLoginCredentials = (credentials: LoginCredentials) => {
    const result = loginCredentialsValidationSchema.validate(credentials);
    if (result.error) reqBodyValidationError(result.error.message)
}
