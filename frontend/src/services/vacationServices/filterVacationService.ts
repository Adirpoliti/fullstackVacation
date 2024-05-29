import axios from "axios";
import { apiConfig } from "../api/apiConfig";

export const activeVacationService = async (token: string) => {  
    return axios
      .get(apiConfig.apiActiveVacationPath, { headers: { Authorization: `Bearer ${token}` }})
      .then((res) => res.data)
      .catch((err) => {
        console.log(err);
      });
  };

  export const currentlyActiveVacationService = async (token: string) => {  
    return axios
      .get(apiConfig.apiCurrentlyActiveVacationPath, { headers: { Authorization: `Bearer ${token}` }})
      .then((res) => res.data)
      .catch((err) => {
        console.log(err);
      });
  };

  export const followedVacationService = async (token: string) => {  
    return axios
      .get(apiConfig.apiFollowedVacationPath, { headers: { Authorization: `Bearer ${token}` }})
      .then((res) => res.data)
      .catch((err) => {
        console.log(err);
      });
  };