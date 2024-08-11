import { getToken } from "@rt/authentication/auth-utils";
import axios from "axios";

const { IdToken } = getToken();

const axiosInstance = axios.create({
  baseURL: "https://4jroc6urcl.execute-api.us-east-1.amazonaws.com/dev",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(
  function (config) {
    config.headers["Authorization"] = "Bearer " + IdToken;
    return config;
  },
  function (err) {
    // Do something with request error
    return Promise.reject(err);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response;
  },
  function (err) {
    // Do something with request error
    return Promise.reject(err);
  }
);


export default axiosInstance;
