import path from 'path';
import { verifyAdminMiddlewere } from '../middleware/verifyAdmin';
import express, { NextFunction, Request, Response } from 'express'
import { convertTableToCSV } from '../logic/convertTableToCsv';

const router = express.Router();

router.post('/csv', verifyAdminMiddlewere, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const table = req.body.table;
        const tableName = req.body.tableName.toLowerCase();
        const filePath = await convertTableToCSV(req, table, tableName);
        res.status(201).json({ filePath: filePath.replace(path.join(__dirname, '../assets'), '') });
    } catch (err) {
        next(err);
    };
});

router.get('/csv/:filename', verifyAdminMiddlewere, (req: Request, res: Response, next: NextFunction) => {
    try {
        const filename = req.params.filename;
        const filePath = path.join(__dirname, '../assets/csv', filename);
        res.download(filePath)
    } catch (err) {
        next(err);
    };
});

export default router;