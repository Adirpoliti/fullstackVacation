import Joi from 'joi';
import { reqBodyValidationError } from './error-models';
import { UploadedFile } from 'express-fileupload';

export type BookType = {
    bookId: number;
    bookName: string;
    description: string;
    price: number;
    authorId: number;
    categoryId: number;
    imageFile: UploadedFile;
    imageName: string;
}


// Schema for validate book details
export const bookValidationSchema = Joi.object({
    bookId: Joi.number().optional().positive().integer(),
    authorId: Joi.number().positive().integer(),
    categoryId: Joi.number().positive().integer(),
    bookName: Joi.string().required().min(2).max(40),
    description: Joi.string().required().min(2).max(200),
    price: Joi.number().required().positive().min(0).max(1200),
    imageFile: Joi.object().optional(),
    imageName: Joi.string().optional()
})

// Validate the given book
export const validateBook = (book: BookType) => {
    const result = bookValidationSchema.validate(book);
    if (result.error) reqBodyValidationError(result.error.message)
}
