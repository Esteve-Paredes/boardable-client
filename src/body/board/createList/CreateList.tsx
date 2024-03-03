import more from "../../../assets/more.svg";
import styles from "./styles.module.css";

function CreateList() {
  return (
    <div className={styles.containerMenuCards}>
      <form className={styles.formCreateTable}>
        <div className={styles.containerInputTable}>
          <p className={styles.titleForm}>List Title</p>
          <input className={styles.inputForm} type="text" />
        </div>
        <button className={styles.buttonCreateTable}>Create new list</button>
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
  );
}

export default CreateList;
