import { reqBodyValidationError, resourceNotFoundError } from '../4-models/error-models';
import { executeSqlCommand } from '../2-utils/dal';
import { CategoryType, validateCategory } from '../4-models/CategoryModel';
import { OkPacket } from 'mysql';

export const getAllCategoriesLogic = async (): Promise<CategoryType[]> => {
    const sql = `
    SELECT * FROM categories;
    `;

    const categories = await executeSqlCommand(sql) as CategoryType[];
    return categories;
}

export const getOneCategoryLogic = async (id: number): Promise<CategoryType> => {
    const sql = `
    SELECT * FROM categories WHERE categoryId = ${id};
    `;

    const categorys = await executeSqlCommand(sql) as CategoryType[];
    const category = categorys[0];
    if(!category) resourceNotFoundError(id);
    return category;
}

export const addCategoryLogic = async (newCategory:CategoryType): Promise<CategoryType> => {
    validateCategory(newCategory);
   
    const sql = `
    INSERT INTO categories (categoryId, categoryName) 
    VALUES (NULL, '${newCategory.categoryName}');
    `
    const info: OkPacket = await executeSqlCommand(sql);

    if (!info.insertId) reqBodyValidationError(info.message);

    newCategory.categoryId = +info.insertId

    return newCategory;
}

export const updateCategoryLogic = async (updateCategory: CategoryType): Promise<CategoryType> => {
    validateCategory(updateCategory);

    const updateCategorySQL = `
    UPDATE categories SET categoryName = '${updateCategory.categoryName}'
    WHERE categoryId = ${updateCategory.categoryId}
    `

    const info: OkPacket = await executeSqlCommand(updateCategorySQL);
    
    if(!info.affectedRows) reqBodyValidationError(info.message);

    return updateCategory;
}

export const deleteCategoryLogic = async (id: number): Promise<void> => {
    const sql = `
    DELETE FROM categories WHERE categoryId = ${id}`;

    const info: OkPacket = await executeSqlCommand(sql);

    if (!info.affectedRows) resourceNotFoundError(id);
}