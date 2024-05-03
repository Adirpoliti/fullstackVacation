import express, { NextFunction, Response, Request } from 'express'
import { addAuthorLogic, deleteAuthorLogic, getAllAuthorsLogic, getOneAuthorLogic, updateAuthorLogic } from '../5-logic/authors-logic';

const router = express.Router();

router.get('/authors', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authors = await getAllAuthorsLogic();
        res.json(authors);
    } catch (err) {
        next(err)
    }
});

router.get('/authors/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = +req.params.id;
        const authors = await getOneAuthorLogic(id);
        res.json(authors);
    } catch (err) {
        next(err)
    }
});

router.post('/authors', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const author = await addAuthorLogic(req.body);
        res.status(201).json(author);
    } catch (err) {
        next(err)
    }
});

router.put('/authors/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.body.authorId = +req.params.id
        const author = await updateAuthorLogic(req.body);
        res.status(200).json(author);
    } catch (err) {
        next(err)
    }
});

router.delete('/authors/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = +req.params.id
         await deleteAuthorLogic(id);
        res.sendStatus(204);
    } catch (err) {
        next(err)
    }
});

export default router;