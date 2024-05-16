import axios from "axios";
import { UserRegisterCredentialsType } from "../types/UserType";
import { apiConfig } from "./api/apiConfig";

export const registerService = async (
  userCreds: UserRegisterCredentialsType
) => {
  console.log(userCreds);

  axios
    .post(apiConfig.apiRegistrationPath, userCreds)
    .then((res) => console.log(res))
    .catch((err) => {
      console.log(err);
    });
};
