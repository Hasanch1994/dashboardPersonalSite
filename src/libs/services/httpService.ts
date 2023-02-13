import axios from "axios";

const serverBaseUrl = "http://127.0.0.1:9187";
import tokenService from "./tokenService";
const instance = axios.create({
  baseURL: serverBaseUrl,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

instance.interceptors.request.use(
  (request) => {
    const token = tokenService.getLocalAccessToken();
    if (token) {
      request.headers["x-access-token"] = "Bearer " + token;
    }
    // Edit request config
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (err) => {
    const originalConfig = err.config;
    if (originalConfig.url !== "/user/login" && err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          const rs = await instance.post("/action/refreshToken");

          const { _accessToken } = rs.data;
          tokenService.updateLocalAccessToken(_accessToken);

          return instance(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }
  }
);

export default {
  get: instance.get,
  post: instance.post,
  put: instance.put,
  delete: instance.delete,
};
