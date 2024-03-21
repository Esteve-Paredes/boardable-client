import styles from "./styles.module.css";
import MenuDropDown from "../menu-drop-down/MenuDropDown";
import ButtonAddCard from "../button-add-a-card/ButtonAddCard";
import { URL } from "../../../utils/variables";
import { useParams } from "react-router-dom";
import { fetchDelete, fetchPatch } from "../../../utils/functions-fetch";
import { useContext, useState } from "react";
import { Page } from "../../../App/App";
import { DataTask } from "../Board";

type PropsTask = {
  task: DataTask;
};

function ListTask({ task }: PropsTask) {
  const [titleEdit, setTitleEdit] = useState("");

  const { id } = useParams();

  const pageContext = useContext(Page);

  if (!pageContext) {
    throw new Error("Page context is undefined");
  }

  const { currentPage, setCurrentPage } = pageContext;

  //configuracion de la peticion
  const object = localStorage.getItem("user");
  const user = object && JSON.parse(object);

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
  };

  //func edit para el componenete MenuDropDown
  const editAction = async () => {
    if (titleEdit !== "") {
      const response = await fetchPatch(
        URL,
        `/boards/${id}/listtask`,
        {
          taskId: task.id,
          title: titleEdit,
        },
        config
      );
      console.log(response);
      setCurrentPage(!currentPage);
    }
  };

  //func delete para el componente MenuDropDown
  const deleteAction = async () => {
    const response = await fetchDelete(URL, `/boards/${id}/listtask`, {
      headers: {
        taskId: task.id,
        authorization: `Bearer ${user.token}`,
      },
    });
    console.log(response);
    setCurrentPage(!currentPage);
  };

  return (
    <div className={styles.containerTasks}>
      <MenuDropDown
        title={task.title}
        setTitle={setTitleEdit}
        editAction={editAction}
        deleteAction={deleteAction}
      />
      <ButtonAddCard />
    </div>
  );
}

export default ListTask;
