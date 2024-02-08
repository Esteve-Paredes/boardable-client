import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import styles from "./styles.module.css";

function MyBoards() {
  const navigate = useNavigate();

  const handdleClick = () => {
    const objet = localStorage.getItem("user");
    if (objet) {
      localStorage.removeItem("user");
      navigate("/login");
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <img className={styles.logo} src={logo} alt="logo" />
          <h1 className={styles.title}>Boardable</h1>
        </div>
        <div className={styles.botonContainer}>
          <button className={styles.bAccount}>My Account</button>
          <button className={styles.bLogout} onClick={handdleClick}>
            Logout
          </button>
        </div>
      </header>
      <div>
        <Link to={"/signup"}>login</Link>
      </div>
    </div>
  );
}

export default MyBoards;
