import { Request } from "express"
import { User, Vacation } from "../2-utils/dal";
import { ResourceNotFoundError, UnauthorizedError } from "../4-models/ErrorModel";
import { VacationType, validateVacation, validateVacationUpdate } from "../4-models/Vacation-Model";
import { v4 as uuid } from "uuid";
import { getCurrentUser } from "./getCurrentUserLogic";

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

export const followVacationLogic = async (req: Request, vacationId: string) => {
    const currentUser = await getCurrentUser(req)
    const currentVacation = await Vacation.findOne({ _id: vacationId })
    if (currentVacation.usersFollowed.find((id: any) => id !== currentUser._id)) {
        return "user already follow this vacation"
    } else {
        return new Promise(async (resolve, reject) => {
            try {
                await Vacation.findByIdAndUpdate(
                    vacationId,
                    { $push: { usersFollowed: currentUser._id } },
                    { new: true },
                )
                await User.findByIdAndUpdate(
                    currentUser._id,
                    { $push: { vacationsFollowed: vacationId } },
                    { new: true },
                )
                resolve(`${currentUser.firstName} is now following this vacation`)
            } catch (error) {
                reject(UnauthorizedError('Failed to updating profile user'))
            }
        }
        )
    }
}