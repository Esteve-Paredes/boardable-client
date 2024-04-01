import axios from "axios";
import { URL } from "./variables";

type Response = {
  config: object;
  data: object;
  headers: object;
  request: object;
  status: number;
  statusText: string;
};

export const postDataFromApi = async (
  endPoint: string,
  data: object,
  config?: object
) => {
  try {
    return await axios.post<Response>(URL + endPoint, data, config);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data;
    }
  }
};

export const getDataFromApi = async (endPoint: string, data: object) => {
  try {
    return await axios.get<Response>(URL + endPoint, data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data;
    }
  }
};

export const editDataFromApi = async (
  endPoint: string,
  data: object,
  config?: object
) => {
  try {
    return await axios.patch<Response>(URL + endPoint, data, config);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data;
    }
  }
};

export const deleteDataFromApi = async (endPoint: string, data: object) => {
  try {
    return await axios.delete<Response>(URL + endPoint, data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data;
    }
  }
};
