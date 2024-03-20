import { useNavigate, useParams } from "react-router-dom";
import { fetchDelete, fetchPatch } from "../../../utils/functions-fetch";
import { URL } from "../../../utils/variables";
import styles from "./styles.module.css";
import more from "../../../assets/more.svg";
import { useState } from "react";

type PropsBoard = {
  title: string;
  currentPage: boolean;
  setCurrentPage: React.Dispatch<React.SetStateAction<boolean>>;
};

function MenuDropDown({ title, currentPage, setCurrentPage }: PropsBoard) {
  const [dropDown, setDropDown] = useState(false);
  const [editData, setEditData] = useState(false);
  const [titleEdit, setTitleEdit] = useState("");

  const navigate = useNavigate();

  const { id } = useParams();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (titleEdit !== "") {
      const response = await fetchPatch(URL, `/boards/${id}`, {
        title: titleEdit,
      });
      console.log(response.data.data);
    }

    setEditData(!editData);
    setCurrentPage(!currentPage);
  };

  const inputEdit = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setTitleEdit(newValue);
  };

  const optionMore = () => {
    setDropDown(!dropDown);
  };

  const object = localStorage.getItem("user");
  const user = object && JSON.parse(object);

  const optionDropDown = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const option = event.currentTarget.value;
    setDropDown(false);
    if (option === "Edit") {
      setEditData(!editData);
    } else if (option === "Delete") {
      const response = await fetchDelete(URL, `/boards/${id}`, {
        headers: {
          id: user.id,
          username: user.username,
          authorization: `Bearer ${user.token}`,
        },
      });
      navigate("/");
      console.log(response);
    }
  };

  return (
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
        style={{ display: editData ? "none" : "block" }}
      >
        {title}
      </h1>
      <div className={styles.containerDropDown}>
        <img onClick={optionMore} src={more} alt="more" />
        <div
          className={styles.dropDown}
          style={{ display: dropDown ? "flex" : "none" }}
        >
          <button
            className={styles.option}
            value="Edit"
            onClick={optionDropDown}
          >
            Edit
          </button>
          <button
            className={styles.option}
            value="Delete"
            onClick={optionDropDown}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default MenuDropDown;
