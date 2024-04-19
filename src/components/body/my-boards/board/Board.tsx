import { useNavigate, useParams } from "react-router-dom";
import styles from "./styles.module.css";
import { useState } from "react";
import useUpdatePage from "../../../../custom-hook/useUpdatePage";
import {
  deleteDataFromApi,
  editDataFromApi,
} from "../../../../utils/functions-fetch";
import useGetData from "../../../../custom-hook/useGetData";
import MenuDropDown from "../../../../Global-Components/menu-drop-down/MenuDropDown";
import CreateListBoardTasks from "./create-list-board-tasks/CreateListBoardTasks";

export type DataListTask = {
  boardid: number;
  createdat: string;
  id: number;
  title: string;
  userid: number;
};

type Board = {
  boardData: DataListTask[] | never[];
  color: string;
  title: string;
};

const board: Board = {
  boardData: [],
  color: "#ffffff",
  title: "",
};

function Board() {
  const [titleEdit, setTitleEdit] = useState("");

  const { currentPage, setCurrentPage } = useUpdatePage();
  const { id } = useParams();
  const navigate = useNavigate();

  //func edit para el componenete MenuDropDown
  const editAction = async () => {
    if (titleEdit !== "") {
      const response = await editDataFromApi(`/boards/${id}`, {
        title: titleEdit,
      });
      console.log(response.data.data);
      setCurrentPage(!currentPage);
    }
  };

  //func delete para el componente MenuDropDown
  const deleteAction = async () => {
    const response = await deleteDataFromApi(`/boards/${id}`);
    console.log(response);
    navigate("/");
  };

  const hookConfig = {
    configEndPoint: {
      endPoint: `/boards/${id}`,
    },
    initValue: board,
    currentPage,
  };

  const { apiResponse } = useGetData<Board>(hookConfig);

  return (
    <div
      className={styles.bodyBoard}
      style={{ background: `${apiResponse.color}` }}
    >
      <div className={styles.containerBoard}>
        <div>
          <MenuDropDown
            title={apiResponse.title}
            setTitle={setTitleEdit}
            deleteAction={deleteAction}
            editAction={editAction}
          />
        </div>
        <CreateListBoardTasks dataListBoardTask={apiResponse.boardData} />
      </div>
    </div>
  );
}

export default Board;
