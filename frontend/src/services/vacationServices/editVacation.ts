import axios from "axios";
import { apiConfig } from "../api/apiConfig";
import { VacationPostType } from "../../types/VacationType";

export const editVacationService = async (vacation: VacationPostType,token: string) => {
  return axios
    .patch(apiConfig.apiEditVacationPath, vacation, { headers: { Authorization: `bearer ${token}` } })
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });
};