import axios from "axios"
import { LoginCredentials, SignupCredentials } from "../../Types/Auth/AuthType"
import { appConfig } from "../../utils/appConfig"

export const signinUser = async (data: LoginCredentials) => {
    return await axios.post(appConfig.auth.login, data);
}

export const signupUser = async (data: SignupCredentials) => {
        const correctData = {
            firstname: data.firstname,
            lastname: data.lastname,
            username: data.username,
            password: data.password,
        }
        return await axios.post(appConfig.auth.signup, correctData);
}