import axios from "axios";
import { apiConfig } from "../api/apiConfig";

export const getAllVacationsService = async () => {
  return axios
    .get(apiConfig.apiVacationPath)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });
};

// export const getAllVacationsService = async (token: string) => {
//   return axios
//     .get(apiConfig.apiVacationPath, { headers: { Authorization: `bearer ${token}`}})
//     .then((res) => res.data)
//     .catch((err) => {
//       console.log(err);
//     });
// };
