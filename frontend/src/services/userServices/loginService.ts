import axios from "axios";
import { UserLoginCredentialsType } from "../../types/UserType";
import { apiConfig } from "../api/apiConfig";
import toast from "react-hot-toast";

export const loginService = async (userCreds: UserLoginCredentialsType) => {
  return axios
    .post(apiConfig.apiLoginPath, userCreds)
    .then((res) => {
      const prettyName =
        res.data.registeredUser.firstName.charAt(0).toUpperCase() +
        res.data.registeredUser.firstName.substring(1);

      toast(`Welcome ${prettyName}`, {
        icon: "👋",
        style: {
          background: "#333",
          color: "#fff",
        },
      });
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};
