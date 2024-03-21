import { useNavigate, useParams } from "react-router-dom";
import { fetchPost } from "../../../utils/functions-fetch";
import { URL } from "../../../utils/variables";
import styles from "./styles.module.css";
import React, { useContext, useState } from "react";
import { Page } from "../../../App/App";
import { DataTask } from "../Board";
import ListTask from "../listTask/ListTask";

const list = {
  title: "",
};

type Props = {
  dataTask: DataTask[];
};

function CreateList({ dataTask }: Props) {
  const [formData, setFormData] = useState(list);
  const [messageError, setMessageError] = useState(false);

  const { id } = useParams();

  const pageContext = useContext(Page);

  if (!pageContext) {
    throw new Error("Page context is undefined");
  }

  const navigate = useNavigate();
  const { currentPage, setCurrentPage } = pageContext;
  //

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
    window.scrollTo(0, 0);
    event.preventDefault();

    const postData = async () => {
      if (formData.title === "") {
        setMessageError(true);
        return;
      }
      const response = await fetchPost(URL, `/boards/${id}`, formData, config);
      if (response.ok === false) {
        localStorage.removeItem("user");
        navigate("/login");
        return;
      }
      setCurrentPage(!currentPage);
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
      {Object.keys(dataTask).length === 0 ? (
        <></>
      ) : (
        dataTask.map((task: DataTask) => {
          return <ListTask task={task} key={task.id} />;
        })
      )}
    </div>
  );
}

export default CreateList;
