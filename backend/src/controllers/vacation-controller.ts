import express, { NextFunction, Request, Response } from 'express'
import { addVacationLogic, deleteVacationLogic, editVacationLogic, followVacationLogic, getAllActiveVacationsLogic, getAllFollowedVacationsLogic, getAllInactiveVacationsLogic, getAllVacationsLogic, getOneVacationLogic } from '../logic/vacationLogic';
import { VacationType } from '../models/Vacation-Model';
import { verifyAdminMiddlewere } from '../middleware/verifyAdmin';

const router = express.Router()

router.get('/vacations', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await getAllVacationsLogic(req);
        res.json(response);
    } catch (err) {
        next(err);
    }
});

router.get('/vacations/active', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await getAllActiveVacationsLogic(req);
        res.json(response);
    } catch (err) {
        next(err);
    }
});

router.get('/vacations/inactive', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await getAllInactiveVacationsLogic(req);
        res.json(response);
    } catch (err) {
        next(err);
    }
});

router.get('/vacations/followed', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await getAllFollowedVacationsLogic(req);
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

router.delete('/vacations/remove/:id', verifyAdminMiddlewere, async (req: Request, res: Response, nextfunc: NextFunction) => {
    try {
        const id = req.params.id
        await deleteVacationLogic(id, req);
        res.sendStatus(204)
    } catch (err) {
        nextfunc(err);
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
        res.json(response);
    } catch (err) {
        nextfunc(err);
    }
});

export default router