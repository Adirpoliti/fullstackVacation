import axios from "axios";
import { apiConfig } from "./api/apiConfig";

export const vacationService = () => {
  
    return axios
      .get(apiConfig.apiVacationPath)
      .then((res) => res.data)
      .catch((err) => {
        console.log(err);
      });
  };
  