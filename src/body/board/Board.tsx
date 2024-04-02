import { useNavigate, useParams } from "react-router-dom";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import {
  deleteDataFromApi,
  getDataFromApi,
  editDataFromApi,
} from "../../utils/functions-fetch";
import MenuDropDown from "./menu-drop-down/MenuDropDown";
import CreateListBoardTasks from "./1-create-list-board-tasks/CreateListBoardTasks";
import useUpdatePage from "./custom-hook/useUpdatePage";

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
  const [dataBoard, setDataBoard] = useState(board);
  const [titleEdit, setTitleEdit] = useState("");

  const { currentPage, setCurrentPage } = useUpdatePage();
  const { id } = useParams();
  const navigate = useNavigate();
  //

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

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetch = async () => {
      const response = await getDataFromApi(`/boards/${id}`);
      if (response.ok === false) {
        localStorage.removeItem("user");
        navigate("/login");
        return;
      }
      setDataBoard(response.data.data);
      console.log(response.data);
    };

    fetch();
  }, [currentPage]);

  return (
    <div
      className={styles.bodyBoard}
      style={{ background: `${dataBoard.color}` }}
    >
      <div className={styles.containerBoard}>
        <div>
          <MenuDropDown
            title={dataBoard.title}
            setTitle={setTitleEdit}
            deleteAction={deleteAction}
            editAction={editAction}
          />
        </div>
        <CreateListBoardTasks dataListBoardTask={dataBoard.boardData} />
      </div>
    </div>
  );
}

export default Board;
