import { Outlet, useNavigate, useLocation } from "react-router-dom";
import styles from "./styles.module.css";
import { useEffect } from "react";

/* type user = {
  id: string;
  username: string;
  token: string;
}; */

function App() {
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
    <div className={styles.body}>
      <Outlet />
    </div>
  );
}

export default App;
