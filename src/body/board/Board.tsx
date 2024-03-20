import { useNavigate, useParams } from "react-router-dom";
import styles from "./styles.module.css";
import { useContext, useEffect, useState } from "react";
import { fetchDelete, fetchGet, fetchPatch } from "../../utils/functions-fetch";
import { URL } from "../../utils/variables";
import { Page } from "../../App/App";
import MenuDropDown from "./menu-drop-down/MenuDropDown";
import CreateList from "./createList/CreateList";

const board = {
  boardData: {},
  color: "#ffffff",
  title: "",
};

function Board() {
  const [dataBoard, setDataBoard] = useState(board);
  const [titleEdit, setTitleEdit] = useState("");

  const { id } = useParams();

  const pageContext = useContext(Page);

  if (!pageContext) {
    throw new Error("Page context is undefined");
  }

  const navigate = useNavigate();
  const { currentPage, setCurrentPage } = pageContext;
  //

  const object = localStorage.getItem("user");
  const user = object && JSON.parse(object);

  //func edit para el componenete MenuDropDown
  const editAction = async () => {
    if (titleEdit !== "") {
      const response = await fetchPatch(URL, `/boards/${id}`, {
        title: titleEdit,
      });
      console.log(response.data.data);
      setCurrentPage(!currentPage);
    }
  };

  //func delete para el componente MenuDropDown
  const deleteAction = async () => {
    const response = await fetchDelete(URL, `/boards/${id}`, {
      headers: {
        id: user.id,
        username: user.username,
        authorization: `Bearer ${user.token}`,
      },
    });
    console.log(response);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetch = async () => {
      const response = await fetchGet(URL, `/boards/${id}`, {
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
        <CreateList dataTask={dataBoard.boardData} />
      </div>
    </div>
  );
}

export default Board;
