import { Request } from "express"
import { User, Vacation } from "../utils/dal";
import { ResourceNotFoundError, UnauthorizedError } from "../models/ErrorModel";
import { VacationType, validateVacation, validateVacationUpdate } from "../models/Vacation-Model";
import { v4 as uuid } from "uuid";
import { getCurrentUser } from "./getCurrentUserLogic";
import { UserType } from "../models/User-Model";

export const getAllVacationsLogic = async (req: Request) => {
    try {
        await getCurrentUser(req)
        const vacations = await Vacation.find() as VacationType[];
        return vacations;
    } catch (error) {
        UnauthorizedError('Failed to fetch the vacations !');
    }
}

export const getOneVacationLogic = async (id: string) => {
    try {
        const vacations = await Vacation.findOne({ _id: id }) as VacationType[];
        return vacations;
    } catch (error) {
        ResourceNotFoundError(`Failed to find the vacation with id: ${id}!`);
    }
}

export const deleteVacationLogic = async (_id: string, req: Request) => {
    try {
        await getCurrentUser(req);
        const findVacation = await Vacation.findOne({ _id: _id }) as VacationType
        if (!findVacation) ResourceNotFoundError(`Failed to find the vacation with id: ${_id}!`)
        const vacationId = findVacation._id;
        await findVacation.deleteOne({ vacationId })
    } catch (error) {
        ResourceNotFoundError(`Failed to find the vacation with id: ${_id}!`);
    }
}

export const addVacationLogic = async (req: Request, newVacation: VacationType): Promise<VacationType | string> => {
    try {
        await getCurrentUser(req)
        validateVacation(newVacation)
        if (newVacation.imageFile) {
            const extension = newVacation.imageFile.name.substring(newVacation.imageFile.name.lastIndexOf("."));
            newVacation.imageName = uuid() + extension
            await newVacation.imageFile.mv("./src/1-Assets/images/" + newVacation.imageName);
            delete newVacation.imageFile
        }
        const addedVacation = await new Vacation({
            locationCountry: newVacation.locationCountry,
            locationCity: newVacation.locationCity,
            description: newVacation.description,
            startDate: newVacation.startDate,
            endDate: newVacation.endDate,
            price: newVacation.price,
            imageName: newVacation.imageName
        }) as VacationType
        await addedVacation.save()
        console.log("Vacation saved succesfuly !");
        return addedVacation
    } catch (error) {
        throw error;
    }
}

export const editVacationLogic = async (req: Request, updatedVacation: VacationType): Promise<VacationType | string> => {
    await getCurrentUser(req)
    validateVacationUpdate(updatedVacation);
    const findVacation = await Vacation.findOne({ _id: updatedVacation._id }) as VacationType
    if (!findVacation) ResourceNotFoundError("Resource not found, try something else");
    if (updatedVacation.imageFile) {
        const extension = updatedVacation.imageFile.name.substring(updatedVacation.imageFile.name.lastIndexOf("."));
        updatedVacation.imageName = uuid() + extension
        await updatedVacation.imageFile.mv("./src/1-Assets/images/" + updatedVacation.imageName);
        delete updatedVacation.imageFile
    }
    return new Promise(async (resolve, reject) => {
        try {
            const filter = { _id: findVacation._id }
            const vacationUpdate = {
                "locationCountry": updatedVacation.locationCountry,
                "locationCity": updatedVacation.locationCity,
                "description": updatedVacation.description,
                "price": updatedVacation.price,
                "startDate": updatedVacation.startDate,
                "endDate": updatedVacation.endDate,
                "imageName": updatedVacation.imageName,
            };
            await Vacation.findOneAndUpdate(filter, vacationUpdate, { new: false })
            resolve('Your details has been successfully updated')
            return vacationUpdate;
        } catch (error) {
            reject(UnauthorizedError('Failed to updating profile user'))
        }
    })
}

export const getAllActiveVacationsLogic = async (req: Request) => {
    try {
        await getCurrentUser(req)
        const today = new Date()
        const allVacations = await Vacation.find() as VacationType[];
        const activeVacations = allVacations.filter((allVacations) => allVacations.startDate >= today);
        return activeVacations
    } catch (error) {
        UnauthorizedError('Failed to fetch the vacations !');
    }
}

export const getAllInactiveVacationsLogic = async (req: Request) => {
    try {
        await getCurrentUser(req)
        const today = new Date()
        const allVacations = await Vacation.find() as VacationType[];
        const activeVacations = allVacations.filter((allVacations) => allVacations.startDate <= today);
        return activeVacations
    } catch (error) {
        UnauthorizedError('Failed to fetch the vacations !');
    }
}

export const getAllFollowedVacationsLogic = async (req: Request) => {
    try {
        const user = await getCurrentUser(req)
        const currentUser = await User.findOne({ _id: user._id }) as UserType;
        const allVacations = await Vacation.find() as VacationType[];
        const followedVacations = allVacations.filter((allVacations) => allVacations.usersFollowed.includes(currentUser._id));
        return followedVacations
    } catch (error) {
        UnauthorizedError('Failed to fetch the vacations !');
    }
}

export const followVacationLogic = async (req: Request, vacationId: string) => {
    const currentUser = await getCurrentUser(req)
    const loggedUser = await User.findOne({ email: currentUser.email }) as UserType
    const currentVacation = await Vacation.findOne({ _id: vacationId }) as VacationType
    if (currentVacation.usersFollowed.includes(loggedUser._id)) {
        return new Promise(async (resolve, reject) => {
            try {
                await Vacation.findByIdAndUpdate(
                    vacationId,
                    { $pull: { usersFollowed: loggedUser._id } },
                    { new: true },
                )
                await User.findByIdAndUpdate(
                    loggedUser._id,
                    { $pull: { vacationsFollowed: vacationId } },
                    { new: true },
                )
                const newLoggedUser = await User.findOne({ email: currentUser.email }) as UserType
                resolve(newLoggedUser)
            } catch (error) {
                reject(UnauthorizedError('Failed to updating profile user'))
            }
        }
        )
    } else {
        return new Promise(async (resolve, reject) => {
            try {
                await Vacation.findByIdAndUpdate(
                    vacationId,
                    { $push: { usersFollowed: loggedUser._id } },
                    { new: true },
                )
                await User.findByIdAndUpdate(
                    loggedUser._id,
                    { $push: { vacationsFollowed: vacationId } },
                    { new: true },
                )
                const newLoggedUser = await User.findOne({ email: currentUser.email }) as UserType
                resolve(newLoggedUser)
            } catch (error) {
                reject(UnauthorizedError('Failed to updating profile user'))
            }
        }
        )
    }
}