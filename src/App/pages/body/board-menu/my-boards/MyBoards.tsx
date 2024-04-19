import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { myColors } from "../../../../utils/variables";
import useUpdatePage from "../../../../custom-hook/useUpdatePage";
import { postDataFromApi } from "../../../../utils/functions-fetch";
import useGetData from "../../../../custom-hook/useGetData";
import InputText from "../../../../components/InputText/InputText";
import MenuColor from "../../../../components/menu-color/MenuColor";

export type DataBoars = {
  id: number;
  userid: number;
  title: string;
  color: string;
  createdat: Date;
};

const initialFormData = {
  title: "",
  color: "rgba(226, 232, 240, 1)",
};

function MyBoards() {
  const [formData, setFormData] = useState(initialFormData);
  const [color, setColor] = useState(myColors.first);
  const [errorInputText, setErrorInputText] = useState(false);

  const { currentPage, setCurrentPage } = useUpdatePage();
  //

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formData.title) {
      setErrorInputText(true);
      return;
    }

    const response = await postDataFromApi("/", {
      title: formData.title,
      color: formData.color,
    });
    setCurrentPage(!currentPage);
    setErrorInputText(false);
    formData.title = "";
    console.log(response);
  };

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);
  }

  const hookConfig = {
    configEndPoint: {
      endPoint: "/",
    },
    initValue: [],
    currentPage,
  };

  const { apiResponse } = useGetData<DataBoars[]>(hookConfig);

  return (
    <div className={styles.bodyBoards}>
      <div className={styles.containerBoards}>
        <h1 className={styles.titleBoards}>My Boards</h1>
        <div className={styles.containerSelect}>
          <p className={styles.message}>Sort by</p>
          <select className={styles.select} name="date">
            <option value="date">created date</option>
          </select>
        </div>
      </div>
      <div className={styles.gridContainer}>
        <form
          className={styles.containerBoard}
          style={{ backgroundColor: color }}
          onSubmit={onSubmit}
        >
          <InputText
            parentComponentName="MyBoards"
            label="Board Title"
            name="title"
            errorInputText={errorInputText}
            value={formData.title}
            onChange={handleChange}
          />
          <div className={styles.containerColor}>
            <MenuColor
              formData={formData}
              setColor={setColor}
              setFormData={setFormData}
            />
            <button className={styles.Fbutton}>Create</button>
          </div>
        </form>
        {apiResponse.map((board) => {
          return (
            <Link
              key={board.id}
              className={styles.cards}
              style={{ backgroundColor: `${board.color}` }}
              to={`/boards/${board.id}`}
            >
              {board.title}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default MyBoards;
