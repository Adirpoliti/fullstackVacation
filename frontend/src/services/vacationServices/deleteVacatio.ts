import axios from "axios";
import { apiConfig } from "../api/apiConfig";
import toast from "react-hot-toast";

export const deleteVacationService = async (id: string, token: string) => {
  return axios
    .delete(apiConfig.apiDeleteVacationPath + `/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      toast.success("Vacation was deleted successfully!", {
        style: {
          background: "#333",
          color: "#fff",
        },
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
