import { randomUUID } from 'crypto';
import { BookType, validateBook } from '../4-models/BookModel';
import { executeSqlCommand } from '../2-utils/dal';
import { OkPacket } from 'mysql';
import { reqBodyValidationError, resourceNotFoundError } from '../4-models/error-models';
import fs from 'fs'

export const getAllBooksLogic = async (): Promise<BookType[]> => {
    const sql = `
    SELECT * FROM books;
    `;

    const books = await executeSqlCommand(sql) as BookType[];
    return books;
}

export const getOneBookLogic = async (id: number): Promise<BookType> => {
    const sql = `
    SELECT * FROM books WHERE bookId = ${id};
    `;

    const books = await executeSqlCommand(sql) as BookType[];
    const book = books[0];
    if(!book) resourceNotFoundError(id);
    return book;
}

export const addBookLogic = async (newBook: BookType): Promise<BookType> => {
    validateBook(newBook);
    if (newBook.imageFile) {
        const extension = newBook.imageFile.name.substring(newBook.imageFile.name.lastIndexOf("."));
        newBook.imageName = randomUUID() + extension;
        await newBook.imageFile.mv("./src/1-Assets/images/" + newBook.imageName);
        delete newBook.imageFile
    }

    const sql = `
    INSERT INTO books (bookId, bookName, description, price, imageName, authorId, categoryId) 
    VALUES (NULL, '${newBook.bookName}', '${newBook.description}', ${newBook.price}, '${newBook.imageName}', ${newBook.authorId}, ${newBook.categoryId});
    `
    const info: OkPacket = await executeSqlCommand(sql);

    if (!info.insertId) reqBodyValidationError(info.message);

    newBook.bookId = +info.insertId

    return newBook;
}

export const updateBookLogic = async (updateBook: BookType): Promise<BookType> => {
    validateBook(updateBook);

    if (fs.existsSync("./src/1-assets/images/" + updateBook.imageName)) {

        fs.unlinkSync("./src/1-assets/images/" + updateBook.imageName);
    }

    if (updateBook.imageFile) {
        const extension = updateBook.imageFile.name.substring(updateBook.imageFile.name.lastIndexOf("."));
        updateBook.imageName = randomUUID() + extension;
        await updateBook.imageFile.mv("./src/1-Assets/images/" + updateBook.imageName);
        delete updateBook.imageFile
    }
    const updateBookSQL = `
    UPDATE books SET bookName = '${updateBook.bookName}', description = '${updateBook.description}',
    price = ${updateBook.price}, imageName = '${updateBook.imageName}', authorId = ${updateBook.authorId},
    categoryId = ${updateBook.categoryId}
    WHERE bookId = ${updateBook.bookId}
    `

    const info: OkPacket = await executeSqlCommand(updateBookSQL);
    
    if(!info.affectedRows) reqBodyValidationError(info.message);

    return updateBook;
}

export const deleteBookLogic = async (id: number): Promise<void> => {
    const sql = `
    DELETE FROM books WHERE bookId = ${id}`;

    const info: OkPacket = await executeSqlCommand(sql);

    if (!info.affectedRows) resourceNotFoundError(id);
}

