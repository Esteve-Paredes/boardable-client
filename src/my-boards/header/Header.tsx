import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";
import styles from "../styles.module.css";

function Header() {
  const navigate = useNavigate();
  const object = localStorage.getItem("user");

  const handdleClick = () => {
    if (object) {
      localStorage.removeItem("user");
      navigate("/login");
    }
  };

  return (
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
  );
}

export default Header;
