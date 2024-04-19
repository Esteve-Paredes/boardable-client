import styles from "./styles.module.css";
import logo from "../../../assets/logo.svg";
import arrow from "../../../assets/arrow.svg";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { postDataFromApi } from "../../utils/functions-fetch";
import InputText from "../../global-components/InputText/InputText";

const initialFormData = {
  username: "",
  password: "",
};

function Signup() {
  const [formData, setFormData] = useState(initialFormData);
  const [errorMessage, setErrorMessage] = useState(false);
  const [usernameUsed, setUsernameUsed] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await postDataFromApi("/signup", formData);
    console.log(response);

    if (response.data?.ok === true) {
      localStorage.setItem("user", JSON.stringify(response.data.data));
      navigate("/");
    } else if (response.ok === false) {
      setUsernameUsed(true);
    } else {
      console.error("fallo al crear un usuario");
    }
  };

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    const nextFormData = { ...formData, [name]: value };
    setFormData(nextFormData);

    if (name === "password" && value.length < 6) {
      setErrorMessage(true);
    } else {
      setErrorMessage(false);
    }
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
        {usernameUsed && (
          <span className={styles.errorMessage}>
            El usuario esta registrado
          </span>
        )}
        <InputText
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        {errorMessage && (
          <span className={styles.errorMessage}>
            La contraseña debe tener mas de 6 letras
          </span>
        )}
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
