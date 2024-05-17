import axios from "axios";
import { apiConfig } from "../api/apiConfig";

export const deleteVacationService = async (id: string, token: string) => {  
    return axios
      .delete(apiConfig.apiDeleteVacationPath + `/${id}`, { headers: { Authorization: `Bearer ${token}` }})
      .then((res) => res.data)
      .catch((err) => {
        console.log(err);
      });
  };