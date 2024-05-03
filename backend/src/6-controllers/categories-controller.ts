import express, { NextFunction, Response, Request } from 'express'
import { getAllCategoriesLogic, getOneCategoryLogic, addCategoryLogic, updateCategoryLogic, deleteCategoryLogic, } from '../5-logic/categories-logic';

const router = express.Router();

router.get('/categories', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categories = await getAllCategoriesLogic();
        res.json(categories);
    } catch (err) {
        next(err)
    }
});

router.get('/categories/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = +req.params.id;
        const categories = await getOneCategoryLogic(id);
        res.json(categories);
    } catch (err) {
        next(err)
    }
});

router.post('/categories', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categories = await addCategoryLogic(req.body);
        res.status(201).json(categories);
    } catch (err) {
        next(err)
    }
});

router.put('/categories/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.body.categoryId = +req.params.id
        const categories = await updateCategoryLogic(req.body);
        res.status(200).json(categories);
    } catch (err) {
        next(err)
    }
});

router.delete('/categories/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = +req.params.id
        await deleteCategoryLogic(id);
        res.sendStatus(204);
    } catch (err) {
        next(err)
    }
});

export default router;