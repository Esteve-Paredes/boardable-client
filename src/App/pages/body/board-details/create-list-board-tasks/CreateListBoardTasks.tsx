import { useNavigate, useParams } from "react-router-dom";
import styles from "./styles.module.css";
import React, { useState } from "react";
import { DataListTask } from "../../board-menu/board/Board";
import useUpdatePage from "../../../../hooks/useUpdatePage";
import { postDataFromApi } from "../../../../utils/functions-fetch";
import InputText from "../../../../components/InputText/InputText";
import ListTask from "../list-task/ListTask";

const list = {
  title: "",
};

type Props = {
  dataListBoardTask: DataListTask[];
};

function CreateListBoardTasks({ dataListBoardTask }: Props) {
  const [formData, setFormData] = useState(list);
  const [messageError, setMessageError] = useState(false);

  const { currentPage, setCurrentPage } = useUpdatePage();
  const { id } = useParams();
  const navigate = useNavigate();
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
  //
  const postList = (event: React.FormEvent<HTMLFormElement>) => {
    window.scrollTo(0, 0);
    event.preventDefault();

    const postData = async () => {
      if (formData.title === "") {
        setMessageError(true);
        return;
      }
      const response = await postDataFromApi(`/boards/${id}`, formData);
      if (response.data.ok === false) {
        localStorage.removeItem("user");
        navigate("/login");
        return;
      }
      setCurrentPage(!currentPage);
      formData.title = "";
    };

    postData();
  };

  return (
    <div className={styles.containerMenuCards}>
      <form className={styles.formCreateTable} onSubmit={postList}>
        <InputText
          name="title"
          label="List Title"
          parentComponentName="CreateListBoard"
          value={formData.title}
          onChange={getTitle}
        />
        {messageError && (
          <span className={styles.errorMessage}>
            La lista necesita un Titulo
          </span>
        )}
        <button className={styles.buttonCreateTable}>Create new list</button>
      </form>
      {Object.keys(dataListBoardTask).length === 0 ? (
        <></>
      ) : (
        dataListBoardTask
          .sort((a: DataListTask, b: DataListTask) => a.id - b.id)
          .map((listTask: DataListTask) => {
            return <ListTask listTask={listTask} key={listTask.id} />;
          })
      )}
    </div>
  );
}

export default CreateListBoardTasks;
