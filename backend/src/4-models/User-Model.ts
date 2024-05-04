import joi from "joi";
import mongoose from 'mongoose'
import { ObjectId } from "mongodb";
import { ValidationError } from "./ErrorModel";

type RolesType = "user" | "admin"

const passwordRegexPattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,32}$/
const emailRegexPattern = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/

export interface UserContainer {
    user: any;
    firstName: any;
    lastName: any;
    email: any;
    role: any;
}

export type UserCredentialsType = {
    email: string;
    password: string;
}

export type UserType = {
    _id: ObjectId;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: RolesType;
}
export const userSchema = new mongoose.Schema({
    _id: ObjectId,
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    role: String,
});


export const UserCredentialsValidationSchema = joi.object({
    email: joi.string().required().min(12).max(254).regex(emailRegexPattern),
    password: joi.string().required(),
})

export const UserValidationSchema = joi.object({
    firstName: joi.string().required().min(2).max(12),
    lastName: joi.string().required().min(2).max(20),
    password: joi.string().required().min(8).max(32).regex(passwordRegexPattern),
    email: joi.string().required().min(12).max(254).regex(emailRegexPattern),
    role: joi.forbidden(),
})

export const validateUser = (user: UserType) => {
    const result = UserValidationSchema.validate(user);
    if (result.error) ValidationError (result.error.message);
}

export const validateUserCredentials = (userCredentials: UserCredentialsType) => {
    const result = UserCredentialsValidationSchema.validate(userCredentials);
    if (result.error) ValidationError (result.error.message);
}