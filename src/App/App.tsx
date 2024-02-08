import { Outlet, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import { useEffect } from "react";

type user = {
  id: string;
  username: string;
  token: string;
};

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const objet = localStorage.getItem("user");
    if (objet) {
      const user: user = JSON.parse(objet);
      console.log(user);
      navigate("/");
    } else {
      navigate("/signup");
    }
  }, [navigate]);

  return (
    <div className={styles.body}>
      <Outlet />
    </div>
  );
}

export default App;
