import axios from "axios";
import { UserRegisterCredentialsType, UserType } from "../../types/UserType";
import { apiConfig } from "../api/apiConfig";

export const registerService = async (userCreds: UserRegisterCredentialsType): Promise<UserType> => {
  try {
    const response = await axios.post(apiConfig.apiRegistrationPath, userCreds);
    return response.data;
  } catch (err) {
    console.error(err);
    throw new Error('Registration failed');
  }
};