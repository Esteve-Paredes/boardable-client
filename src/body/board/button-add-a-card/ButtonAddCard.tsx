import { useContext, useState } from "react";
import styles from "./styles.module.css";
import { fetchPost } from "../../../utils/functions-fetch";
import { URL } from "../../../utils/variables";
import { useNavigate, useParams } from "react-router-dom";
import { Page } from "../../../App/App";
import { DataTask } from "../Board";

type PropsTask = {
  task: DataTask;
};

const list = {
  title: "",
};

function ButtonAddCard({ task }: PropsTask) {
  const [formData, setFormData] = useState(list);
  const [messageError, setMessageError] = useState(false);
  const [inputDisplay, setInputDisplay] = useState(false);

  const { id } = useParams();

  const pageContext = useContext(Page);

  if (!pageContext) {
    throw new Error("Page context is undefined");
  }

  const navigate = useNavigate();
  const { currentPage, setCurrentPage } = pageContext;

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

  //configuracion de la peticion
  const object = localStorage.getItem("user");
  const user = object && JSON.parse(object);

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
  };

  const onSubmitTask = (event: React.FormEvent<HTMLFormElement>) => {
    window.scrollTo(0, 0);
    event.preventDefault();

    const postData = async () => {
      if (formData.title === "") {
        setMessageError(true);
        return;
      }
      const response = await fetchPost(
        URL,
        `/boards/${id}/task`,
        {
          title: formData.title,
          boardId: task.boardid,
          tasklistId: task.id,
        },
        config
      );
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
