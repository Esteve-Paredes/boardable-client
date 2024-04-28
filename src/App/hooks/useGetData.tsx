import { useEffect, useState } from "react";
import { getDataFromApi } from "../utils/functions-fetch";
import { useNavigate } from "react-router-dom";

interface EndPointAndParamas {
  endPoint: string;
  params?: object;
}

interface HookConfig<T> {
  configEndPoint: EndPointAndParamas;
  initValue: T;
  currentPage: boolean;
}

function useGetData<T>(hookConfig: HookConfig<T>) {
  const [apiResponse, setApiResponse] = useState<T>(hookConfig.initValue);

  const navigate = useNavigate();

  const { endPoint, params } = hookConfig.configEndPoint;

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetch = async () => {
      const response = await getDataFromApi(endPoint, params);
      if (response.data.ok === false) {
        localStorage.removeItem("user");
        navigate("/login");
        return;
      }
      setApiResponse(response.data.data);
    };

    fetch();
  }, [hookConfig.currentPage]);

  return { apiResponse };
}

export default useGetData;
