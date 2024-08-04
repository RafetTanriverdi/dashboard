import { getToken } from "@rt/authentication/auth-utils";
import axios from "axios";

const {IdToken}=getToken();

export const axiosInstance = axios.create({
  baseURL: "https://4jroc6urcl.execute-api.us-east-1.amazonaws.com/dev",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization:`Bearer ${IdToken}`

  },
});
