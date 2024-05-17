import { baseUrl } from "./baseUrl";

export const apiConfig = {
    apiRegistrationPath: baseUrl + "/auth/register",
    apiLoginPath: baseUrl + "/auth/login",
    apiVacationPath: baseUrl + "/vacations",
    apiNewVacationPath: baseUrl + "/vacations/new",
    apiEditVacationPath: baseUrl + "/vacations/edit",
    apiFollowVacationPath: baseUrl + "/vacations/follow/:id"
}