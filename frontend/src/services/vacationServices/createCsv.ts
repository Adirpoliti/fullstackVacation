import axios from "axios";
import { apiConfig } from "../api/apiConfig";

export const createCsvService = async (table: any, tableName: any, token: string) => {
  return axios
    .post(apiConfig.apiCreateCsvPath, { table, tableName }, { headers: { Authorization: `Bearer ${token}` } })
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });
}; 