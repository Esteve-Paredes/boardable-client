import { useParams } from "react-router-dom";
import more from "../../assets/more.svg";
import styles from "./styles.module.css";

function Board() {
  const { id } = useParams();

  return (
    <div className={styles.bodyBoard}>
      <div className={styles.containerBoard}>
        <div className={styles.containerTitle}>
          <h1 className={styles.title}>My board title</h1>
          <div>
            <img src={more} alt="" />
            <div>
              <p>Edit</p>
              <p>Delete</p>
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
