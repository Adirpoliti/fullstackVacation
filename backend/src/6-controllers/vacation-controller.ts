import express, { NextFunction, Request, Response } from 'express'
import { addVacationLogic, editVacationLogic, followVacationLogic, getAllVacationsLogic, getOneVacationLogic } from '../5-logic/vacationLogic';
import { VacationType } from '../4-models/Vacation-Model';
import { verifyAdminMiddlewere } from '../3-middleware/verifyAdmin';

const router = express.Router()

router.get('/vacations', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await getAllVacationsLogic(req);
        res.json(response);
    } catch (err) {
        next(err);
    }
});

router.get('/vacations/one/:id', verifyAdminMiddlewere, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        const response = await getOneVacationLogic(id);
        res.json(response);
    } catch (err) {
        next(err);
    }
});

router.post('/vacations/new', verifyAdminMiddlewere, async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.body.imageFile = req.files?.imageFile;
        const newVacation = req.body as VacationType;
        const addedVacation = await addVacationLogic(req, newVacation);
        res.status(201).json(addedVacation);
    } catch (err) {
        next(err)
    }
});

router.patch('/vacations/edit', verifyAdminMiddlewere, async (req: Request, res: Response, nextfunc: NextFunction) => {
    try {
        req.body.imageFile = req.files?.imageFile;
        const updateVacation = req.body as VacationType;
        const response = await editVacationLogic(req, updateVacation);
        res.status(201).json(response);
    } catch (err) {
        nextfunc(err);
    }
});

router.post('/vacations/follow/:id', async (req: Request, res: Response, nextfunc: NextFunction) => {
    try {
        const vacationId = req.params.id
        const response = await followVacationLogic(req, vacationId);
        response === "user already follow this vacation" ? res.status(200).json(response) : res.status(201).json(response);
    } catch (err) {
        nextfunc(err);
    }
});

export default router