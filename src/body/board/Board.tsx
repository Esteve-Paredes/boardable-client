import { useParams } from "react-router-dom";
import more from "../../assets/more.svg";
import styles from "./styles.module.css";
import { useContext, useEffect, useState } from "react";
import { fetchGet } from "../../utils/functions-fetch";
import { URL } from "../../utils/variables";
import { Page } from "../../App/App";
import Title from "./title/Title";

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
      setDataBoard(response.data.data);
      console.log(response.data);
    };

    fetch();
  }, [currentPage]);

  return (
    <div
      className={styles.bodyBoard}
      style={{ background: `${dataBoard.color}` }}>
      <div className={styles.containerBoard}>
        <Title
          dataBoard={dataBoard}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <div className={styles.containerMenuCards}>
          <form className={styles.formCreateTable}>
            <div className={styles.containerInputTable}>
              <p className={styles.titleForm}>List Title</p>
              <input className={styles.inputForm} type="text" />
            </div>
            <button className={styles.buttonCreateTable}>
              Create new list
            </button>
          </form>
          <div className={styles.containerTasks}>
            <div className={styles.containerFlex}>
              <div>
                <input
                  type="text"
                  className={styles.inputDisplay}
                  style={{ display: "none" }}
                />
                <p className={styles.subTitle}>To do</p>
              </div>
              <img src={more} alt="more" />
            </div>
            <div className={styles.containerTask}>
              <div>
                <input
                  type="text"
                  className={styles.inputDisplay}
                  style={{ display: "none" }}
                />
                <p className={styles.task}>Mi primera tarea</p>
              </div>
              <img src={more} alt="more" />
            </div>
            <div className={styles.containerAddCard}>
              <p className={styles.textAddCard}>+ Add a card</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Board;
