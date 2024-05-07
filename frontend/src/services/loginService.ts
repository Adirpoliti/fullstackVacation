import axios from "axios";
import { UserLoginCredentialsType } from "../types/UserType";
import { apiConfig } from "./api/apiConfig";

export const loginService = (userCreds: UserLoginCredentialsType) => {
  console.log(userCreds);

  axios
    .post(apiConfig.apiLoginPath, userCreds)
    .then((res) => console.log(res))
    .catch((err) => {
      console.log(err);
    });
};
