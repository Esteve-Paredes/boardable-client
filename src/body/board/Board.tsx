import { useParams } from "react-router-dom";
import more from "../../assets/more.svg";
import styles from "./styles.module.css";
import { useContext, useEffect, useState } from "react";
import { fetchGet, fetchPatch } from "../../utils/functions-fetch";
import { URL } from "../../utils/variables";
import { Page } from "../../App/App";

const board = {
  boardData: {},
  color: "#ffffff",
  title: "",
};

function Board() {
  const [dataBoard, setDataBoard] = useState(board);
  const [dropDown, setDropDown] = useState(false);
  const [editData, setEditData] = useState(false);
  const [titleEdit, setTitleEdit] = useState("");

  const { id } = useParams();

  const pageContext = useContext(Page);

  if (!pageContext) {
    throw new Error("Page context is undefined");
  }

  const { currentPage, setCurrentPage } = pageContext;
  //

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await fetchPatch(URL, `/boards/${id}`, {
      title: titleEdit,
    });
    console.log(response.data.data);
    setEditData(!editData);
    setCurrentPage(!currentPage);
  };

  const inputEdit = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    const newValue = event.target.value;
    setTitleEdit(newValue);
  };

  const optionMore = () => {
    setDropDown(!dropDown);
  };

  const optionDropDown = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const option = event.currentTarget.value;
    setDropDown(false);
    console.log(event.currentTarget.value);
    if (option === "Edit") {
      setEditData(!editData);
    }
  };

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
        <div className={styles.containerTitle}>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              className={styles.inputDisplay}
              style={{ display: editData ? "flex" : "none" }}
              onChange={inputEdit}
            />
            <button style={{ display: "none" }}></button>
          </form>
          <h1
            className={styles.title}
            style={{ display: editData ? "none" : "block" }}>
            {dataBoard.title}
          </h1>
          <div className={styles.containerDropDown}>
            <img onClick={optionMore} src={more} alt="more" />
            <div
              className={styles.dropDown}
              style={{ display: dropDown ? "flex" : "none" }}>
              <button
                className={styles.option}
                value="Edit"
                onClick={optionDropDown}>
                Edit
              </button>
              <button
                className={styles.option}
                value="Delete"
                onClick={optionDropDown}>
                Delete
              </button>
            </div>
          </div>
        </div>
        <div className={styles.containerMenuCards}>
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
