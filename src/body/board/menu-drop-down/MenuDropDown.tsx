import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import more from "../../../assets/more.svg";
import { useState } from "react";

type PropsBoard = {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  deleteAction: () => Promise<void>;
  editAction: () => Promise<void>;
};

function MenuDropDown({
  title,
  setTitle,
  deleteAction,
  editAction,
}: PropsBoard) {
  const [dropDown, setDropDown] = useState(false);
  const [editData, setEditData] = useState(false);

  const navigate = useNavigate();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    editAction(); //funcion edit pasada por prop
    setEditData(!editData);
  };

  const inputEdit = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setTitle(newValue);
  };

  const optionMore = () => {
    setDropDown(!dropDown);
  };

  const optionDropDown = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const option = event.currentTarget.value;
    setDropDown(false);
    if (option === "Edit") {
      setEditData(!editData);
    } else if (option === "Delete") {
      deleteAction(); //funcion delete pasada por prop
      navigate("/");
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
