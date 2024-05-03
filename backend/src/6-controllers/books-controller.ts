import express, { NextFunction, Response, Request } from 'express'
import { addBookLogic, deleteBookLogic, getAllBooksLogic, getOneBookLogic, updateBookLogic } from '../5-logic/books-logic';

const router = express.Router();

router.get('/books', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const books = await getAllBooksLogic();
        res.json(books);
    } catch (err) {
        next(err)
    }
});

router.get('/books/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = +req.params.id;
        const books = await getOneBookLogic(id);
        res.json(books);
    } catch (err) {
        next(err)
    }
});

router.post('/books', async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.body.imageFile = req.files?.imageFile
        const book = await addBookLogic(req.body);
        res.status(201).json(book);
    } catch (err) {
        next(err)
    }
});

router.put('/books/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.body.imageFile = req.files?.imageFile
        req.body.bookId = +req.params.id
        const book = await updateBookLogic(req.body);
        res.status(200).json(book);
    } catch (err) {
        next(err)
    }
});
router.delete('/books/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = +req.params.id
         await deleteBookLogic(id);
        res.sendStatus(204);
    } catch (err) {
        next(err)
    }
});

export default router;