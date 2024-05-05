import joi from "joi";
import mongoose from 'mongoose'
import { ObjectId } from "mongodb";
import { ValidationError } from "./ErrorModel";
import { UploadedFile } from 'express-fileupload';

export type VacationType = {
    save(): unknown;
    _id: ObjectId;
    location: string;
    description: string;
    startDate: Date;
    endDate: Date;
    price: number;
    imageFile?: UploadedFile;
    imageName?: string;
}

export const vacationSchema = new mongoose.Schema({
    location: String,
    description: String,
    startDate: Date,
    endDate: Date,
    price: Number,
    // imageName: String,
})

export const VacationValidationSchema = joi.object({
    location: joi.string().min(2).required(),
    description: joi.string().min(2).required(),
    price: joi.number().positive().integer().required(),
    // startDate: joi.string().required(),
    // endDate: joi.string().required(),
    startDate: joi.date().greater("now").less(joi.ref('endDate')).required(),
    endDate: joi.date().greater("now").required(),
    // imageFile: joi.object().optional(),
    // imageName: joi.string().forbidden()
})

export const validateVacation = (vacation: VacationType) => {
    const result = VacationValidationSchema.validate(vacation);
    if (result.error) ValidationError(result.error.message);
}