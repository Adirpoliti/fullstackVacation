import express, { NextFunction, Request, Response } from 'express'
import { addVacationLogic, getAllVacationsLogic } from '../5-logic/vacationLogic';
import { VacationType } from '../4-models/Vacation-Model';
import { verifyAdminMiddlewere } from '../3-middleware/verifyAdmin';

const router = express.Router()

router.get('/vacations', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await getAllVacationsLogic();
        res.json(response);
    } catch (err) {
        next(err);
    }
});

router.post('/vacations/new', verifyAdminMiddlewere, async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.body.imageFile = req.files?.imageFile;
        const newVacation: VacationType = req.body;
        const addedVacation = await addVacationLogic(req, newVacation);
        res.status(201).json(addedVacation);
    } catch (err) {
        next(err)
    }
});

export default router