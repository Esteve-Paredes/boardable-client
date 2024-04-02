import { useParams } from "react-router-dom";
import {
  deleteDataFromApi,
  editDataFromApi,
} from "../../../utils/functions-fetch";
import MenuDropDown from "../menu-drop-down/MenuDropDown";
import styles from "./styles.module.css";
import { useState } from "react";
import { Tasks } from "../2-list-task/ListTask";
import useUpdatePage from "../custom-hook/useUpdatePage";

type PropsTask = {
  task: Tasks;
};

function Task({ task }: PropsTask) {
  const [titleEdit, setTitleEdit] = useState("");

  const { currentPage, setCurrentPage } = useUpdatePage();
  const { id } = useParams();

  const stylesTask = {
    taskContainerTitle: "taskContainerTitle",
    taskTitle: "taskTitle",
    taskInput: "taskInput",
  };

  //func edit para el componenete MenuDropDown
  const editAction = async () => {
    if (titleEdit !== "") {
      const response = await editDataFromApi(`/boards/${id}/task`, {
        taskId: task.id,
        title: titleEdit,
      });
      console.log(response);
      setCurrentPage(!currentPage);
    }
  };

  //func delete para el componente MenuDropDown
  const deleteAction = async () => {
    const response = await deleteDataFromApi(`/boards/${id}/task`, {
      params: {
        taskId: task.id,
      },
    });
    console.log(response);
    setCurrentPage(!currentPage);
  };

  return (
    <div className={styles.containerDropDown}>
      <MenuDropDown
        stylesTask={stylesTask}
        title={task.title}
        setTitle={setTitleEdit}
        editAction={editAction}
        deleteAction={deleteAction}
      />
    </div>
  );
}

export default Task;
