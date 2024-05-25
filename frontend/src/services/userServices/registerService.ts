import axios from "axios";
import { UserRegisterCredentialsType } from "../../types/UserType";
import { apiConfig } from "../api/apiConfig";

export const registerService = async (userCreds: UserRegisterCredentialsType) => {
  return axios.post(apiConfig.apiRegistrationPath, userCreds)
};
