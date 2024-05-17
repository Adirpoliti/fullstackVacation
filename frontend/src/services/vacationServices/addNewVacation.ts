import axios from "axios";
import { apiConfig } from "../api/apiConfig";
import { VacationPostType } from "../../types/VacationType";

export const addNewVacationService = async (newVacation: VacationPostType) => {
  return axios
    .post(apiConfig.apiNewVacationPath, newVacation, { headers: {'Content-Type': 'multipart/form-data',} })
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });
};

// export const addNewVacationService = async (newVacation: VacationType, token: string) => {
//     console.log(newVacation);
  
//     return axios
//       .post(apiConfig.apiNewVacationPath, newVacation, { headers: { Authorization: `Bearer ${token}` }})
//       .then((res) => res.data)
//       .catch((err) => {
//         console.log(err);
//       });
//   };
