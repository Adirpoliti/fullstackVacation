import joi from "joi";
import { ValidationError } from "./ErrorModel";

export const CsvValidationSchema = joi.object({
    tableName: joi.string().required().min(3).max(100),
});

export const validateCsv = (tableName: string) => {
    const dataToValidate = { tableName }; 
    const result = CsvValidationSchema.validate(dataToValidate);
    if (result.error) ValidationError(result.error.message);
};