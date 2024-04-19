import styles from "./styles.module.css";
import classNames from "classnames";
import more from "../../../assets/more.svg";
import React, { useState } from "react";
import useClickOutside from "../../hooks/useClickOutSide";

type PropsBoard = {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  deleteAction: () => Promise<void>;
  editAction: () => Promise<void>;
  type?: string;
};

function MenuDropDown({
  title,
  setTitle,
  deleteAction,
  editAction,
  type,
}: PropsBoard) {
  const [openDropDown, setOpenDropDown] = useState(false);
  const [editData, setEditData] = useState(false);

  const refMenuDropDown = useClickOutside(() => setOpenDropDown(false));

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
    setOpenDropDown(!openDropDown);
  };

  const optionDropDown = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const option = event.currentTarget.value;
    if (option === "Edit") {
      setEditData(!editData);
    } else if (option === "Delete") {
      deleteAction(); //funcion delete pasada por prop
    }
    setOpenDropDown(false);
  };

  return (
    <div
      className={classNames(styles.containerTitle, {
        [styles.taskContainerTitle]: type === "task",
      })}
    >
      <form onSubmit={onSubmit}>
        <input
          type="text"
          className={classNames(styles.inputDisplay, {
            [styles.taskInput]: type === "task",
          })}
          style={{ display: editData ? "flex" : "none" }}
          onChange={inputEdit}
        />
        <button style={{ display: "none" }}></button>
      </form>
      <h1
        className={classNames(styles.title, {
          [styles.taskTitle]: type === "task",
        })}
        style={{ display: editData ? "none" : "block" }}
      >
        {title}
      </h1>
      <div className={styles.containerDropDown} ref={refMenuDropDown}>
        <img onClick={optionMore} src={more} alt="more" />
        <div
          className={styles.dropDown}
          style={{ display: openDropDown ? "flex" : "none" }}
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
