import axios from "axios";
import styles from "./styles.module.css";
import logo from "../assets/logo.svg";
import arrow from "../assets/arrow.svg";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

const initialFormData = {
  username: "",
  password: "",
};

function Signup() {
  const [formData, setFormData] = useState(initialFormData);
  const navigate = useNavigate();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formData);

    const sendData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5500/singup",
          formData
        );
        if (response.data.ok) {
          navigate("/");
        }
      } catch (error) {
        console.error(error);
      }
    };
    sendData();
  };

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    const nextFormData = { ...formData, [name]: value };
    setFormData(nextFormData);
  }

  return (
    <div className={styles.container}>
      <img className={styles.logo} src={logo} alt="logo" />
      <h1 className={styles.title}>Welcome to Boardable</h1>
      <form className={styles.formulario} onSubmit={onSubmit}>
        <div className={styles.containerInput}>
          <label className={styles.label} htmlFor="userName">
            Username
          </label>
          <input
            className={styles.input}
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div className={styles.containerInput}>
          <label className={styles.label} htmlFor="password">
            Password
          </label>
          <input
            className={styles.input}
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button className={styles.button}>Signup</button>
      </form>
      <Link className={styles.linkCreate} to={"/login"}>
        Login to your account
        <img className={styles.arrow} src={arrow} alt="arrow" />
      </Link>
    </div>
  );
}

export default Signup;
