import { randomUUID } from 'crypto';
import { BookType, validateBook } from '../4-models/BookModel';
import { resourceNotFoundError } from '../4-models/error-models';
import fs from 'fs'
import { executeSqlCommand } from '../2-utils/dal';
import { UserType } from '../4-models/userModel';
// Get all books
export const getAllUsersLogic = async (): Promise<UserType[]> => {
    const sql = `
    SELECT * FROM users;
    `;

    const users = await executeSqlCommand(sql) as UserType[];
    return users;

}

// // Get one book
// export const getOneBookLogic = async (id: number): Promise<BookType> => {
//     // Get all books
//     const books = await getAllBooks(); // ---> DAL
//     // Find the desired book
//     const book = books.find(b => b.id === id);
//     if (!book) resourceNotFoundError(id);

//     // return found book
//     return book; // <---- BLL
// }

// // Add book
// export const addBookLogic = async (newBook: BookType): Promise<BookType> => {
//     validateBook(newBook);
//     // here we upload our file
//     if (newBook.imageFile) {
//         const extension = newBook.imageFile.name.substring(newBook.imageFile.name.lastIndexOf("."));
//         newBook.imageName = randomUUID() + extension;
//         await newBook.imageFile.mv("./src/1-Assets/images/" + newBook.imageName);
//         delete newBook.imageFile
//     }

//     // Get all books
//     const books = await getAllBooks();
//     // Generate new id
//     newBook.id = books.length === 0 ? 1 : books[books.length - 1].id + 1;
//     // Add book to array
//     books.push(newBook);
//     // Save all books to JSON file (db)
//     await saveAllBooks(books);
//     // return the added book
//     return newBook;
// }

// export const updateBookLogic = async (updateBook: BookType): Promise<BookType> => {
//     validateBook(updateBook);

//     const books = await getAllBooks();
//     const index = books.findIndex(b => b.id === updateBook.id);
//     if (index === -1) resourceNotFoundError(updateBook.id);

//     // if we have a previous image file
//     if (fs.existsSync("./src/1-assets/images/" + books[index].imageName)) {
//         // so delete it
//         fs.unlinkSync("./src/1-assets/images/" + books[index].imageName);
//     }

//     // update the file / reuplaod it
//     if (updateBook.imageFile) {
//         const extension = updateBook.imageFile.name.substring(updateBook.imageFile.name.lastIndexOf("."));
//         updateBook.imageName = randomUUID() + extension;
//         await updateBook.imageFile.mv("./src/1-Assets/images/" + updateBook.imageName);
//         delete updateBook.imageFile
//     }

//     books[index] = updateBook;
//     await saveAllBooks(books);
//     return updateBook;
// }

// export const deleteBookLogic = async (id: number): Promise<void> => {
//     const books = await getAllBooks();
//     const index = books.findIndex(b => b.id === id); // -1
//     if (index === -1) resourceNotFoundError(id);
//     books.splice(index, 1);
//     await saveAllBooks(books);
// }

