import axios from "axios";

export const axoisInstance = axios.create({
  baseURL: "https://api.storerestapi.com/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
