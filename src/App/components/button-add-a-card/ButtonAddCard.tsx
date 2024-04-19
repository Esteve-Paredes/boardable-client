import { useState } from "react";
import styles from "./styles.module.css";
import { postDataFromApi } from "../../utils/functions-fetch";
import { useNavigate, useParams } from "react-router-dom";
import { DataListTask } from "../../body/board/Board";
import useUpdatePage from "../../hooks/useUpdatePage";

type PropsTask = {
  task: DataListTask;
};

const list = {
  title: "",
};

function ButtonAddCard({ task }: PropsTask) {
  const [formData, setFormData] = useState(list);
  const [messageError, setMessageError] = useState(false);
  const [inputDisplay, setInputDisplay] = useState(false);

  const { currentPage, setCurrentPage } = useUpdatePage();
  const { id } = useParams();

  const navigate = useNavigate();

  const getTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (value.length < 1) {
      setMessageError(true);
    } else {
      setMessageError(false);
    }

    const nextFormData = { ...formData, [name]: value };
    setFormData(nextFormData);
  };

  const onSubmitTask = (event: React.FormEvent<HTMLFormElement>) => {
    window.scrollTo(0, 0);
    event.preventDefault();

    const postData = async () => {
      if (formData.title === "") {
        setMessageError(true);
        return;
      }
      const response = await postDataFromApi(`/boards/${id}/task`, {
        title: formData.title,
        boardId: task.boardid,
        tasklistId: task.id,
      });
      if (response.ok === false) {
        localStorage.removeItem("user");
        navigate("/login");
        return;
      }
      setInputDisplay(!inputDisplay);
      setCurrentPage(!currentPage);
      formData.title = "";
      console.log(response);
    };

    postData();
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
        <input
          className={styles.InputAddCard}
          type="text"
          name="title"
          value={formData.title}
          onChange={getTitle}
        />
        {messageError && (
          <span className={styles.errorMessage}>
            La task necesita un Titulo
          </span>
        )}
        <div className={styles.containerInputAndButton}>
          <button type="submit">Aceptar</button>
          <button type="button" onClick={handleClick}>
            Cancelar
          </button>
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
