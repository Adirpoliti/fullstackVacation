import joi from "joi";
import mongoose from 'mongoose'
import { ObjectId } from "mongodb";
import { ValidationError } from "./ErrorModel";
import { UploadedFile } from 'express-fileupload';

export type VacationType = {
    deleteOne(arg0: { vacationId: ObjectId; }): unknown;
    remove(): unknown;
    save(): unknown;
    _id: ObjectId;
    locationCountry: string;
    locationCity: string;
    description: string;
    startDate: Date;
    endDate: Date;
    price: number;
    imageFile: UploadedFile;
    imageName: string;
    usersFollowed: ObjectId[];
}

export const vacationSchema = new mongoose.Schema({
    locationCountry: String,
    locationCity: String,
    description: String,
    startDate: Date,
    endDate: Date,
    price: Number,
    imageName: String,
    usersFollowed: [ObjectId],
})

export const VacationValidationSchema = joi.object({
    locationCountry: joi.string().min(2).required(),
    locationCity: joi.string().min(2).required(),
    description: joi.string().min(2).required(),
    price: joi.number().positive().max(10000).integer().required(),
    startDate: joi.date().greater("now").less(joi.ref('endDate')).required(),
    endDate: joi.date().greater("now").required(),
    imageFile: joi.object().required(),
    imageName: joi.string().forbidden(),
    usersFollowed: joi.string().forbidden()
})

export const VacationUpdateValidationSchema = joi.object({
    _id: joi.string().optional().min(24).max(24),
    locationCountry: joi.string().min(2).required(),
    locationCity: joi.string().min(2).required(),
    description: joi.string().min(2).required(),
    price: joi.number().positive().max(10000).integer().required(),
    startDate: joi.date().greater("now").less(joi.ref('endDate')).required(),
    endDate: joi.date().greater("now").required(),
    imageFile: joi.object().optional(),
    imageName: joi.string().forbidden(),
    usersFollowed: joi.string().forbidden()
})

export const validateVacation = (vacation: VacationType) => {
    const result = VacationValidationSchema.validate(vacation);
    if (result.error) ValidationError(result.error.message);
}

export const validateVacationUpdate = (vacation: VacationType) => {
    const result = VacationUpdateValidationSchema.validate(vacation);
    if (result.error) ValidationError(result.error.message);
}