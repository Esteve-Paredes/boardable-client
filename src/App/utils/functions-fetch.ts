import axios, { AxiosRequestConfig } from "axios";
import { URL } from "./variables";
import { getUserLocalStorage } from "./getUserLocalStorage";

/* type Response = {
  config: object;
  data: {
    ok: boolean;
    data: object;
  };
  headers: object;
  request: object;
  status: number;
  statusText: string;
}; */

type Config = {
  headers: object;
  params: object;
};

const getConfig = (params?: object) => {
  const user = getUserLocalStorage();
  let config: AxiosRequestConfig<Config> | undefined;
  if (!user) {
    return (config = {});
  } else {
    config = {
      headers: {
        "Content-Type": "application/json",
        Id: user.id,
        Username: user.username,
        Authorization: `Bearer ${user.token}`,
      },
    };
  }
  if (params) {
    config = { ...config, ...params };
  }
  return config;
};

export const postDataFromApi = (endPoint: string, body: object) => {
  return axios.post(URL + endPoint, body, getConfig());
};

export const getDataFromApi = (endPoint: string, params?: object) => {
  return axios.get(URL + endPoint, getConfig(params));
};

export const editDataFromApi = async (endPoint: string, data: object) => {
  return await axios.patch(URL + endPoint, data, getConfig());
};

export const deleteDataFromApi = async (endPoint: string, params?: object) => {
  return await axios.delete(URL + endPoint, getConfig(params));
};
