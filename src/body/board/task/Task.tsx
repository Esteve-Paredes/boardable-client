import { useParams } from "react-router-dom";
import { fetchDelete, fetchPatch } from "../../../utils/functions-fetch";
import MenuDropDown from "../menu-drop-down/MenuDropDown";
import styles from "./styles.module.css";
import { useContext, useState } from "react";
import { Page } from "../../../App/App";
import { URL } from "../../../utils/variables";
import { Tasks } from "../listTask/ListTask";

type PropsTask = {
  task: Tasks;
};

function Task({ task }: PropsTask) {
  const [titleEdit, setTitleEdit] = useState("");

  const stylesDropDown = {
    containerTitle: {
      padding: "0",
      height: "auto",
    },
    title: {
      fontSize: "16px",
      fontWeight: "400",
      lineHeight: "28px",
    },
    input: {
      height: "28px",
    },
  };

  const { id } = useParams();

  const pageContext = useContext(Page);

  if (!pageContext) {
    throw new Error("Page context is undefined");
  }
  //const navigate = useNavigate();
  const { currentPage, setCurrentPage } = pageContext;

  //configuracion de la peticion
  const object = localStorage.getItem("user");
  const user = object && JSON.parse(object);

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
  };

  //func edit para el componenete MenuDropDown
  const editAction = async () => {
    if (titleEdit !== "") {
      const response = await fetchPatch(
        URL,
        `/boards/${id}/task`,
        {
          taskId: task.id,
          title: titleEdit,
        },
        config
      );
      console.log(response);
      setCurrentPage(!currentPage);
    }
  };

  //func delete para el componente MenuDropDown
  const deleteAction = async () => {
    const response = await fetchDelete(URL, `/boards/${id}/task`, {
      headers: {
        taskId: task.id,
        authorization: `Bearer ${user.token}`,
      },
    });
    console.log(response);
    setCurrentPage(!currentPage);
  };

  return (
    <div className={styles.containerDropDown}>
      <MenuDropDown
        stylesDropDown={stylesDropDown}
        title={task.title}
        setTitle={setTitleEdit}
        editAction={editAction}
        deleteAction={deleteAction}
      />
    </div>
  );
}

export default Task;
