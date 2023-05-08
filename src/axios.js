import axios from "axios";

export const makeRequest = axios.create({
  baseURL: "https://social-dev.cloud/public/",
  withCredentials: true,
});
