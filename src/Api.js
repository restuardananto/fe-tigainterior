import axios from "axios";
import { BASE_URL } from "./config";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  timeout: 5000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Axios Error", error);
    return Promise.reject(error);
  }
);

export default api;
