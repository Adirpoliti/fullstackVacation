import { baseUrl } from "./baseUrl";

export const apiConfig = {
    apiRegistrationPath: baseUrl + "/auth/register",
    apiLoginPath: baseUrl + "/auth/login",
    apiVacationPath: baseUrl + "/vacations",
    apiOneVacationPath: baseUrl + "/vacations/one",
    apiNewVacationPath: baseUrl + "/vacations/new",
    apiEditVacationPath: baseUrl + "/vacations/edit",
    apiDeleteVacationPath: baseUrl + "/vacations/remove",
    apiFollowVacationPath: baseUrl + "/vacations/follow",
    apiActiveVacationPath: baseUrl + "/vacations/active",
    apiCurrentlyActiveVacationPath: baseUrl + "/vacations/currentlyActive",
    apiFollowedVacationPath: baseUrl + "/vacations/followed",
    apiCreateCsvPath: baseUrl + "/csv",
}