import Joi from 'joi';
import { reqBodyValidationError } from './error-models';

export type CategoryType = {
    categoryId: number;
    categoryName: string;
}


// Schema for validate book details
export const categoryValidationSchema = Joi.object({
    categoryId: Joi.number().optional().positive().integer(),
    categoryName: Joi.string().required().min(2).max(20),
})

// Validate the given book
export const validateCategory = (category: CategoryType) => {
    const result = categoryValidationSchema.validate(category);
    if (result.error) reqBodyValidationError(result.error.message)
}
