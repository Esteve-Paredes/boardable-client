import styles from "./styles.module.css";
import MenuDropDown from "../menu-drop-down/MenuDropDown";
import ButtonAddCard from "../button-add-a-card/ButtonAddCard";
import { URL } from "../../../utils/variables";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchDelete,
  fetchGet,
  fetchPatch,
} from "../../../utils/functions-fetch";
import { useContext, useEffect, useState } from "react";
import { Page } from "../../../App/App";
import { DataTask } from "../Board";
import Task from "../task/Task";

type PropsTask = {
  task: DataTask;
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

  const { id } = useParams();

  const pageContext = useContext(Page);

  if (!pageContext) {
    throw new Error("Page context is undefined");
  }
  const navigate = useNavigate();
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

  useEffect(() => {
    const getTasks = async () => {
      const response = await fetchGet(URL, `/boards/${id}/task`, {
        headers: {
          id: user.id,
          username: user.username,
          authorization: `Bearer ${user.token}`,
        },
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
