import { useParams } from "react-router-dom";
import styles from "./styles.module.css";
import { useState } from "react";
import { Tasks } from "../list-task/ListTask";
import useUpdatePage from "../../../../hooks/useUpdatePage";
import {
  deleteDataFromApi,
  editDataFromApi,
} from "../../../../utils/functions-fetch";
import MenuDropDown from "../../../../components/menu-drop-down/MenuDropDown";

type PropsTask = {
  task: Tasks;
};

function Task({ task }: PropsTask) {
  const [titleEdit, setTitleEdit] = useState("");

  const { currentPage, setCurrentPage } = useUpdatePage();
  const { id } = useParams();

  //func edit para el componenete MenuDropDown
  const editAction = async () => {
    if (titleEdit !== "") {
      await editDataFromApi(`/boards/${id}/task`, {
        taskId: task.id,
        title: titleEdit,
      });
      setCurrentPage(!currentPage);
    }
  };

  //func delete para el componente MenuDropDown
  const deleteAction = async () => {
    await deleteDataFromApi(`/boards/${id}/task`, {
      params: {
        taskId: task.id,
      },
    });
    setCurrentPage(!currentPage);
  };

  return (
    <div className={styles.containerDropDown}>
      <MenuDropDown
        type="task"
        title={task.title}
        setTitle={setTitleEdit}
        editAction={editAction}
        deleteAction={deleteAction}
      />
    </div>
  );
}

export default Task;
