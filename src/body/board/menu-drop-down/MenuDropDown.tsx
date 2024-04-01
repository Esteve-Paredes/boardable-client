import styles from "./styles.module.css";
import more from "../../../assets/more.svg";
import { useState } from "react";

type PropsBoard = {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  deleteAction: () => Promise<void>;
  editAction: () => Promise<void>;
  stylesDropDown?: {
    containerTitle: object;
    title: object;
    input: object;
  };
};

function MenuDropDown({
  title,
  setTitle,
  deleteAction,
  editAction,
  stylesDropDown,
}: PropsBoard) {
  const [dropDown, setDropDown] = useState(false);
  const [editData, setEditData] = useState(false);

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
    }
  };

  const getStylesTitle = () => {
    //funcion para convinar los estilos del titulo con los pasados por props
    const stylesTitle = {
      display: editData ? "none" : "block",
    };

    if (!stylesDropDown) return stylesTitle;
    return { ...stylesTitle, ...stylesDropDown.title };
  };

  const getStylesContainerTitle = () => {
    //funcion para obtener los estilos del containertitle mediante los props
    if (!stylesDropDown) return;
    return { ...stylesDropDown.containerTitle };
  };

  const getStylesInput = () => {
    const styleInput = { display: editData ? "flex" : "none" };

    if (!stylesDropDown) return styleInput;
    return { ...styleInput, ...stylesDropDown.input };
  };

  return (
    <div className={styles.containerTitle} style={getStylesContainerTitle()}>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          className={styles.inputDisplay}
          style={getStylesInput()}
          onChange={inputEdit}
        />
        <button style={{ display: "none" }}></button>
      </form>
      <h1 className={styles.title} style={getStylesTitle()}>
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
