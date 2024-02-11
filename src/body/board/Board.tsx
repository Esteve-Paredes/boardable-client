import { useParams } from "react-router-dom";
import more from "../../assets/more.svg";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { fetchGet } from "../../utils/functions-fetch";
import { URL } from "../../utils/variables";

function Board() {
  const [dataBoard, setDataBoard] = useState({ color: "#ffffff" });

  const { id } = useParams();

  const optionDropDown = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    console.log(event.currentTarget.value);
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
  }, []);

  return (
    <div
      className={styles.bodyBoard}
      style={{ background: `${dataBoard.color}` }}>
      <div className={styles.containerBoard}>
        <div className={styles.containerTitle}>
          <input
            type="text"
            className={styles.inputDisplay}
            style={{ display: "none" }}
          />
          <h1 className={styles.title}>My board title</h1>
          <div className={styles.containerDropDown}>
            <img src={more} alt="more" />
            <div className={styles.dropDown}>
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
