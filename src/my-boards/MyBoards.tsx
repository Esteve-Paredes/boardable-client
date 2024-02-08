import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import styles from "./styles.module.css";

function MyBoards() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <img className={styles.logo} src={logo} alt="logo" />
          <h1 className={styles.title}>Boardable</h1>
        </div>
        <div className={styles.botonContainer}>
          <button className={styles.bAccount}>My Account</button>
          <button className={styles.bLogout}>Logout</button>
        </div>
      </header>
      <div>
        <Link to={"/signup"}>login</Link>
      </div>
    </div>
  );
}

export default MyBoards;
