import axios from "axios";
import { UserLoginCredentialsType } from "../../types/UserType";
import { apiConfig } from "../api/apiConfig";

export const loginService = async (userCreds: UserLoginCredentialsType) => {
  return axios.post(apiConfig.apiLoginPath, userCreds);
};
