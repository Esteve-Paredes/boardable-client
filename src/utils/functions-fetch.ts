import axios from "axios";

type Response = {
  config: object;
  data: object;
  headers: object;
  request: object;
  status: number;
  statusText: string;
};

export const fetchPost = async (
  url: string,
  endPoint: string,
  data: object
) => {
  try {
    return await axios.post<Response>(url + endPoint, data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data;
    }
  }
};
