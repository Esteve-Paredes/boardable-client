import styles from "../signup/styles.module.css";
import logo from "../../assets/logo.svg";
import arrow from "../../assets/arrow.svg";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { postDataFromApi } from "../../utils/functions-fetch";
import InputText from "../../Global-Components/InputText/InputText";

const initialFormData = {
  username: "",
  password: "",
};

function Login() {
  const [formData, setFormData] = useState(initialFormData);
  const [validCredentials, serValidCredentials] = useState(false);

  const navigate = useNavigate();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await postDataFromApi("/login", formData);
    console.log(response);

    if (response.data?.ok === true) {
      localStorage.setItem("user", JSON.stringify(response?.data.data));
      navigate("/");
    } else {
      serValidCredentials(true);
      console.error("usuario no encontrado");
    }
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
        <InputText
          label="Username"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        <InputText
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <button className={styles.button}>Login</button>
      </form>
      <Link className={styles.linkCreate} to={"/signup"}>
        Create an account
        <img className={styles.arrow} src={arrow} alt="arrow" />
      </Link>
      {validCredentials && (
        <span className={styles.errorMessage}>Invalid Credentials</span>
      )}
    </div>
  );
}

export default Login;
