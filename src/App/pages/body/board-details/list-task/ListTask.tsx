import styles from "./styles.module.css";
import { useParams } from "react-router-dom";
import { useState } from "react";
import Task from "../task/Task";
import { DataListTask } from "../../board-menu/board/Board";
import useUpdatePage from "../../../../hooks/useUpdatePage";
import {
  deleteDataFromApi,
  editDataFromApi,
} from "../../../../utils/functions-fetch";
import useGetData from "../../../../hooks/useGetData";
import MenuDropDown from "../../../../components/menu-drop-down/MenuDropDown";
import ButtonAddCard from "../../../../components/button-add-a-card/ButtonAddCard";

type PropsTask = {
  listTask: DataListTask;
};

export type Tasks = {
  id: number;
  userid: number;
  boardid: number;
  tasklistid: number;
  title: string;
  createdat: string;
};

function ListTask({ listTask }: PropsTask) {
  const [titleEdit, setTitleEdit] = useState("");
  const { currentPage, setCurrentPage } = useUpdatePage();
  const { id } = useParams();

  //func edit para el componenete MenuDropDown
  const editAction = async () => {
    if (titleEdit !== "") {
      const response = await editDataFromApi(`/boards/${id}/listtask`, {
        taskId: listTask.id,
        title: titleEdit,
      });
      console.log(response);
      setCurrentPage(!currentPage);
    }
  };

  //func delete para el componente MenuDropDown
  const deleteAction = async () => {
    const response = await deleteDataFromApi(`/boards/${id}/listtask`, {
      params: {
        listTask: listTask.id,
      },
    });
    console.log(response);
    setCurrentPage(!currentPage);
  };

  const hookConfig = {
    configEndPoint: {
      endPoint: `/boards/${id}/task`,
      params: {
        params: {
          boardId: listTask.boardid,
          listTaskId: listTask.id,
        },
      },
    },
    initValue: [],
    currentPage,
  };

  const { apiResponse } = useGetData<Tasks[]>(hookConfig);

  return (
    <div className={styles.containerTasks}>
      <MenuDropDown
        title={listTask.title}
        setTitle={setTitleEdit}
        editAction={editAction}
        deleteAction={deleteAction}
      />
      {apiResponse
        ?.sort((a: Tasks, b: Tasks) => a.id - b.id)
        ?.map((task: Tasks) => {
          return <Task key={task.id} task={task} />;
        })}
      <ButtonAddCard task={listTask} />
    </div>
  );
}

export default ListTask;
