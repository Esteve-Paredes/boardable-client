import { useNavigate, useParams } from "react-router-dom";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import {
  deleteDataFromApi,
  getDataFromApi,
  editDataFromApi,
} from "../../utils/functions-fetch";
import MenuDropDown from "./menu-drop-down/MenuDropDown";
import CreateList from "./createList/CreateList";
import useUpdatePage from "./custom-hook/useUpdatePage";
import { getUserLocalStorage } from "../../utils/getUserLocalStorage";

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

  const user = getUserLocalStorage();

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
    const response = await deleteDataFromApi(`/boards/${id}`, {
      headers: {
        id: user.id,
        username: user.username,
        authorization: `Bearer ${user.token}`,
      },
    });
    console.log(response);
    navigate("/");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetch = async () => {
      const response = await getDataFromApi(`/boards/${id}`, {
        headers: {
          id: user.id,
          username: user.username,
          authorization: `Bearer ${user.token}`,
        },
      });
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
        <CreateList dataListTask={dataBoard.boardData} />
      </div>
    </div>
  );
}

export default Board;
