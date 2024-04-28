import { useNavigate } from "react-router-dom";

interface Response {
  ok: boolean;
  data: {
    ok: boolean;
    data: {
      id: number;
      token: string;
      username: string;
    };
  };
}

function useSaveToken(response: Response) {
  const navigate = useNavigate();

  if (response.data.ok === true) {
    localStorage.setItem("user", JSON.stringify(response.data.data));
    navigate("/");
  }
}

export default useSaveToken;
