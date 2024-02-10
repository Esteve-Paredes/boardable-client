import { Outlet, useNavigate, useLocation } from "react-router-dom";
import styles from "./styles.module.css";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";

interface IPageContext {
  currentPage: boolean;
  setCurrentPage: Dispatch<SetStateAction<boolean>>;
}

export const Page = createContext<IPageContext | undefined>(undefined);

function App() {
  const [currentPage, setCurrentPage] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    const objet = localStorage.getItem("user");
    if (objet) {
      if (path === "/signup" || path === "/login") {
        navigate("/", { replace: true });
      }
    } else {
      if (path === "/") {
        navigate("/signup");
      }
    }
  }, [location]);

  return (
    <Page.Provider value={{ currentPage, setCurrentPage }}>
      <div className={styles.body}>
        <Outlet />
      </div>
    </Page.Provider>
  );
}

export default App;
