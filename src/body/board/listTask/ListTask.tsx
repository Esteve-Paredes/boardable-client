import styles from "./styles.module.css";
import MenuDropDown from "../menu-drop-down/MenuDropDown";
import ButtonAddCard from "../button-add-a-card/ButtonAddCard";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteDataFromApi,
  getDataFromApi,
  editDataFromApi,
} from "../../../utils/functions-fetch";
import { useEffect, useState } from "react";
import { DataListTask } from "../Board";
import Task from "../task/Task";
import useUpdatePage from "../custom-hook/useUpdatePage";

type PropsTask = {
  task: DataListTask;
};

export type Tasks = {
  id: number;
  userid: number;
  boardid: number;
  tasklistid: number;
  title: string;
  createdat: string;
};

function ListTask({ task }: PropsTask) {
  const [titleEdit, setTitleEdit] = useState("");
  const [tasks, setTasks] = useState([]);

  const { currentPage, setCurrentPage } = useUpdatePage();
  const { id } = useParams();
  const navigate = useNavigate();

  //func edit para el componenete MenuDropDown
  const editAction = async () => {
    if (titleEdit !== "") {
      const response = await editDataFromApi(`/boards/${id}/listtask`, {
        taskId: task.id,
        title: titleEdit,
      });
      console.log(response);
      setCurrentPage(!currentPage);
    }
  };

  //func delete para el componente MenuDropDown
  const deleteAction = async () => {
    const response = await deleteDataFromApi(`/boards/${id}/listtask`);
    console.log(response);
    setCurrentPage(!currentPage);
  };

  useEffect(() => {
    const getTasks = async () => {
      const response = await getDataFromApi(`/boards/${id}/task`, {
        params: {
          boardId: task.boardid,
          listTaskId: task.id,
        },
      });
      if (response.ok === false) {
        localStorage.removeItem("user");
        navigate("/login");
        return;
      }
      setTasks(response.data.data);
      console.log(response.data);
    };

    getTasks();
  }, [currentPage]);

  return (
    <div className={styles.containerTasks}>
      <MenuDropDown
        title={task.title}
        setTitle={setTitleEdit}
        editAction={editAction}
        deleteAction={deleteAction}
      />
      {!tasks ? (
        <></>
      ) : (
        tasks.map((task: Tasks) => {
          return <Task key={task.id} task={task} />;
        })
      )}
      <ButtonAddCard task={task} />
    </div>
  );
}

export default ListTask;
