import axios, { AxiosRequestConfig } from "axios";
import { URL } from "./variables";
import { getUserLocalStorage } from "./getUserLocalStorage";

type Response = {
  config: object;
  data: object;
  headers: object;
  request: object;
  status: number;
  statusText: string;
};

type Config = {
  headers: object;
  params: object;
};

const user = getUserLocalStorage();
let config: AxiosRequestConfig<Config> | undefined;
if (!user) {
  config = {};
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

export const postDataFromApi = async (endPoint: string, data: object) => {
  try {
    return await axios.post<Response>(URL + endPoint, data, config);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data;
    }
  }
};

export const getDataFromApi = async (endPoint: string, params?: object) => {
  try {
    if (params) {
      config = { ...config, ...params };
    }
    return await axios.get<Response>(URL + endPoint, config);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data;
    }
  }
};

export const editDataFromApi = async (endPoint: string, data: object) => {
  try {
    return await axios.patch<Response>(URL + endPoint, data, config);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data;
    }
  }
};

export const deleteDataFromApi = async (endPoint: string) => {
  try {
    return await axios.delete<Response>(URL + endPoint, config);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data;
    }
  }
};
