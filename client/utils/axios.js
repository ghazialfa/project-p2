import axios from "axios";

export const api = axios.create({
  baseURL: "https://moviking-api.ghazialfa.biz.id",
  // baseURL: "http://localhost:80",
});
