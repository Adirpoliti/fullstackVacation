import axios from "axios";
import { apiConfig } from "../api/apiConfig";

export const getOneVacationService = async (id: string, token: string) => {
  return axios
    .get(apiConfig.apiOneVacationPath + `/${id}`, { headers: { Authorization: `bearer ${token}` } })
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });
};