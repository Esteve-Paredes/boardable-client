import axios, { AxiosResponse } from "axios";

export const axiosInterceptor = () => {
  axios.interceptors.response.use(
    (response: AxiosResponse) => {
      console.log("response", response);
      return response;
    },
    (error) => {
      console.log("error", error);
      return Promise.reject(error);
    }
  );
};
