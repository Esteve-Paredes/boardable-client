import { useNavigate, useParams } from "react-router-dom";
import styles from "./styles.module.css";
import { useContext, useEffect, useState } from "react";
import { fetchGet } from "../../utils/functions-fetch";
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
        <MenuDropDown
          dataBoard={dataBoard}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <CreateList />
      </div>
    </div>
  );
}

export default Board;
