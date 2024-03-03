import { useParams } from "react-router-dom";
import more from "../../../assets/more.svg";
import { fetchPost } from "../../../utils/functions-fetch";
import { URL } from "../../../utils/variables";
import styles from "./styles.module.css";
import React, { useState } from "react";

const list = {
  title: "",
};

function CreateList() {
  const [formData, setFormData] = useState(list);
  const [messageError, setMessageError] = useState(false);

  const { id } = useParams();

  const getTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (value.length < 1) {
      setMessageError(true);
    } else {
      setMessageError(false);
    }

    const nextFormData = { ...formData, [name]: value };
    setFormData(nextFormData);
  };
  //configuracion de la peticion
  const object = localStorage.getItem("user");
  const user = object && JSON.parse(object);

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
  };
  //

  const postList = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const postData = async () => {
      if (formData.title === "") {
        setMessageError(true);
        return;
      }
      const response = await fetchPost(URL, `/boards/${id}`, formData, config);
      console.log(response);
    };

    postData();
  };

  return (
    <div className={styles.containerMenuCards}>
      <form className={styles.formCreateTable} onSubmit={postList}>
        <div className={styles.containerInputTable}>
          <p className={styles.titleForm}>List Title</p>
          <input
            className={styles.inputForm}
            type="text"
            name="title"
            value={formData.title}
            onChange={getTitle}
          />
        </div>
        {messageError && (
          <span className={styles.errorMessage}>
            La lista necesita un Titulo
          </span>
        )}
        <button className={styles.buttonCreateTable}>Create new list</button>
      </form>
      <div className={styles.containerTasks}>
        <div className={styles.containerFlex}>
          <div>
            <input
              type="text"
              className={styles.inputDisplay}
              style={{ display: "none" }}
            />
            <p className={styles.subTitle}>To do</p>
          </div>
          <img src={more} alt="more" />
        </div>
        <div className={styles.containerTask}>
          <div>
            <input
              type="text"
              className={styles.inputDisplay}
              style={{ display: "none" }}
            />
            <p className={styles.task}>Mi primera tarea</p>
          </div>
          <img src={more} alt="more" />
        </div>
        <div className={styles.containerAddCard}>
          <p className={styles.textAddCard}>+ Add a card</p>
        </div>
      </div>
    </div>
  );
}

export default CreateList;
