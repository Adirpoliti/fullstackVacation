import { baseUrl } from "./baseUrl";

export const apiConfig = {
    apiRegistrationPath: baseUrl + "/auth/register",
    apiLoginPath: baseUrl + "/auth/login",
    apiVacationPath: baseUrl + "/vacations",
    apiOneVacationPath: baseUrl + "/vacations/one",
    apiNewVacationPath: baseUrl + "/vacations/new",
    apiEditVacationPath: baseUrl + "/vacations/edit",
    apiDeleteVacationPath: baseUrl + "/vacations/remove",
    // apiFollowVacationPath: baseUrl + "/vacations/follow/:id",
}