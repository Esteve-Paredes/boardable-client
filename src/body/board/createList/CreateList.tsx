import { useNavigate, useParams } from "react-router-dom";
import { postDataFromApi } from "../../../utils/functions-fetch";
import styles from "./styles.module.css";
import React, { useState } from "react";
import { DataListTask } from "../Board";
import ListTask from "../listTask/ListTask";
import useUpdatePage from "../custom-hook/useUpdatePage";
import { getUserLocalStorage } from "../../../utils/getUserLocalStorage";

const list = {
  title: "",
};

type Props = {
  dataListTask: DataListTask[];
};

function CreateList({ dataListTask }: Props) {
  const [formData, setFormData] = useState(list);
  const [messageError, setMessageError] = useState(false);

  const { currentPage, setCurrentPage } = useUpdatePage();
  const { id } = useParams();
  const navigate = useNavigate();
  //
  const user = getUserLocalStorage();

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
  //
  const postList = (event: React.FormEvent<HTMLFormElement>) => {
    window.scrollTo(0, 0);
    event.preventDefault();

    const postData = async () => {
      if (formData.title === "") {
        setMessageError(true);
        return;
      }
      const response = await postDataFromApi(`/boards/${id}`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (response.ok === false) {
        localStorage.removeItem("user");
        navigate("/login");
        return;
      }
      setCurrentPage(!currentPage);
      formData.title = "";
      console.log(response.data);
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
      {Object.keys(dataListTask).length === 0 ? (
        <></>
      ) : (
        dataListTask.map((task: DataListTask) => {
          return <ListTask task={task} key={task.id} />;
        })
      )}
    </div>
  );
}

export default CreateList;
