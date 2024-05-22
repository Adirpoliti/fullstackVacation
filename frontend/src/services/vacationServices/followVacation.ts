import axios from "axios";
import { apiConfig } from "../api/apiConfig";

export const followVacationService = async (id: string, token: string) => { 
    return axios
      .post(apiConfig.apiFollowVacationPath + `/${id}`, {}, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.data)
      .catch((err) => {
        console.log(err);
      });
  };