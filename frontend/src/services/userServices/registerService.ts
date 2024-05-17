import axios from "axios";
import { UserRegisterCredentialsType } from "../../types/UserType";
import { apiConfig } from "../api/apiConfig";

export const registerService = async (userCreds: UserRegisterCredentialsType) => {
  axios
    .post(apiConfig.apiRegistrationPath, userCreds)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });
};