import { verifyAdminMiddlewere } from './../3-middleware/verifyAdmin';
import express, { NextFunction, Request, Response } from 'express'
import { convertTableToCSV } from '../5-logic/convertTableToCsv';

const router = express.Router();

router.post('/csv', verifyAdminMiddlewere, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const table = req.body.table;
        const tableName = req.body.tableName.toLowerCase();
        const path = `csv/${tableName}`;
        await convertTableToCSV(req, table, tableName, path);
        res.sendStatus(201)
    } catch (err) {
        next(err);
    };
});

export default router;