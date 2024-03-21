import { useState } from "react";
import styles from "./styles.module.css";

function ButtonAddCard() {
  const [inputDisplay, setInputDisplay] = useState(false);

  const onSubmitTask = (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
  };

  const handleClick = () => {
    setInputDisplay(!inputDisplay);
  };

  return (
    <>
      <form
        className={styles.formTask}
        style={inputDisplay ? { display: "flex" } : { display: "none" }}
        onSubmit={onSubmitTask}
      >
        <input className={styles.InputAddCard} type="text" />
        <div className={styles.containerInputAndButton}>
          <button>Aceptar</button>
          <button onClick={handleClick}>Cancelar</button>
        </div>
      </form>
      <div
        className={styles.containerAddCard}
        style={inputDisplay ? { display: "none" } : { display: "flex" }}
        onClick={handleClick}
      >
        <p className={styles.textAddCard}>+ Add a card</p>
      </div>
    </>
  );
}

export default ButtonAddCard;
