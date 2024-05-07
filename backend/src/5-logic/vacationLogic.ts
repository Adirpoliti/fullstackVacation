import { Request } from "express"
import { Vacation } from "../2-utils/dal";
import { UnauthorizedError } from "../4-models/ErrorModel";
import { VacationType, validateVacation } from "../4-models/Vacation-Model";
import { v4 as uuid } from "uuid";
import { getCurrentUser } from "./getCurrentUserLogic";

export const getAllVacationsLogic = async () => {
    try {
        const vacations = await Vacation.find() as VacationType[];
        return vacations;
    } catch (error) {
        UnauthorizedError('Failed to fetch the vacations !');
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