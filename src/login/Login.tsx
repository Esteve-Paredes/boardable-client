import styles from "../signup/styles.module.css";
import logo from "../assets/logo.svg";
import arrow from "../assets/arrow.svg";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className={styles.container}>
      <img className={styles.logo} src={logo} alt="logo" />
      <h1 className={styles.title}>Welcome to Boardable</h1>
      <form className={styles.formulario} action="">
        <div className={styles.containerInput}>
          <label className={styles.label} htmlFor="userName">
            Username
          </label>
          <input className={styles.input} type="text" />
        </div>
        <div className={styles.containerInput}>
          <label className={styles.label} htmlFor="password">
            Password
          </label>
          <input className={styles.input} type="text" />
        </div>
        <button className={styles.button}>Login</button>
      </form>
      <Link className={styles.linkCreate} to={"/signup"}>
        Create an account
        <img className={styles.arrow} src={arrow} alt="arrow" />
      </Link>
    </div>
  );
}

export default Login;
