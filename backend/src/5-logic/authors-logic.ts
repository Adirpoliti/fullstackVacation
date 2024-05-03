import { reqBodyValidationError, resourceNotFoundError } from '../4-models/error-models';
import { executeSqlCommand } from '../2-utils/dal';
import { AuthorType, validateAuthor } from '../4-models/AuthorModel';
import { OkPacket } from 'mysql';

export const getAllAuthorsLogic = async (): Promise<AuthorType[]> => {
    const sql = `
    SELECT * FROM authors;
    `;

    const authors = await executeSqlCommand(sql) as AuthorType[];
    return authors;
}

export const getOneAuthorLogic = async (id: number): Promise<AuthorType> => {
    const sql = `
    SELECT * FROM authors WHERE authorId = ${id};
    `;

    const authors = await executeSqlCommand(sql) as AuthorType[];
    const author = authors[0];
    if(!author) resourceNotFoundError(id);
    return author;
}

export const addAuthorLogic = async (newAuthor:AuthorType): Promise<AuthorType> => {
    validateAuthor(newAuthor);
   
    const sql = `
    INSERT INTO authors (authorId, firstname, lastname, biography, birthDate) 
    VALUES (NULL, '${newAuthor.firstname}', '${newAuthor.lastname}', '${newAuthor.biography}', '${newAuthor.birthDate}');
    `
    const info: OkPacket = await executeSqlCommand(sql);

    if (!info.insertId) reqBodyValidationError(info.message);

    newAuthor.authorId = +info.insertId

    return newAuthor;
}

export const updateAuthorLogic = async (updateAuthor: AuthorType): Promise<AuthorType> => {
    validateAuthor(updateAuthor);

    
    const updateAuthorSQL = `
    UPDATE authors SET firstname = '${updateAuthor.firstname}', lastname = '${updateAuthor.lastname}',
    biography = '${updateAuthor.biography}', birthDate = '${updateAuthor.birthDate}'
    WHERE authorId = ${updateAuthor.authorId}
    `

    const info: OkPacket = await executeSqlCommand(updateAuthorSQL);
    
    if(!info.affectedRows) reqBodyValidationError(info.message);

    return updateAuthor;
}

export const deleteAuthorLogic = async (id: number): Promise<void> => {
    const sql = `
    DELETE FROM authors WHERE authorId = ${id}`;

    const info: OkPacket = await executeSqlCommand(sql);

    if (!info.affectedRows) resourceNotFoundError(id);
}