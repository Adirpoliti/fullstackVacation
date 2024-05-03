import Joi from 'joi';
import { reqBodyValidationError } from './error-models';

export type AuthorType
    = {
        authorId: number;
        firstname: string;
        lastname: string;
        biography: string;
        birthDate: Date;
    }


// Schema for validate book details
export const authorValidationSchema = Joi.object({
    authorId: Joi.number().optional().positive().integer(),
    firstname: Joi.string().required().min(2).max(20),
    lastname: Joi.string().required().min(2).max(20),
    biography: Joi.string().required().min(2).max(200),
    birthDate: Joi.date().required(),
})

// Validate the given book
export const validateAuthor = (author: AuthorType
) => {
    const result = authorValidationSchema.validate(author);
    if (result.error) reqBodyValidationError(result.error.message)
}
