import axios from "axios";
import { UserLoginCredentialsType } from "../types/UserType";
import { apiConfig } from "./api/apiConfig";

export const loginService = async (userCreds: UserLoginCredentialsType) => {
  console.log(userCreds);

  return axios
    .post(apiConfig.apiLoginPath, userCreds)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });
};
