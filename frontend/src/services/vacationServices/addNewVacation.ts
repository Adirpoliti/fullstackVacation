import axios from "axios";
import { apiConfig } from "../api/apiConfig";
import { VacationPostType } from "../../types/VacationType";

export const addNewVacationService = async (newVacation: VacationPostType, token: string) => {  
    return axios
      .post(apiConfig.apiNewVacationPath, newVacation, { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }})
  };