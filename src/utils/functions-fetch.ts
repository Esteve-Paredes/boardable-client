import axios from "axios";

export const fetchPost = async (
  url: string,
  endPoint: string,
  data: object
) => {
  try {
    return await axios.post(url + endPoint, data);
  } catch (error) {
    console.error(error);
  }
};
