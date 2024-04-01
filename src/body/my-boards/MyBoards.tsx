import { useEffect, useState } from "react";
import { getDataFromApi, postDataFromApi } from "../../utils/functions-fetch";
import { myColors } from "../../utils/variables";
import MenuColor from "../menu-color/MenuColor";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import useUpdatePage from "../board/custom-hook/useUpdatePage";

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
  const [dataBoards, setDataBoards] = useState<DataBoars[]>([]);
  const [formData, setFormData] = useState(initialFormData);
  const [color, setColor] = useState(myColors.first);
  const [errorInputText, setErrorInputText] = useState(false);

  const { currentPage, setCurrentPage } = useUpdatePage();
  const navigate = useNavigate();
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

  useEffect(() => {
    const fetch = async () => {
      const response = await getDataFromApi("/");
      console.log(response);
      if (response.ok === false) {
        localStorage.removeItem("user");
        navigate("/login");
        return;
      }
      setDataBoards(response.data.data);
    };

    fetch();
  }, [currentPage]);

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
          <div className={styles.containerInputForm}>
            <p className={styles.messageTitle}>Board Title</p>
            <input
              className={styles.inputForm}
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              style={
                errorInputText
                  ? { border: "1px solid red" }
                  : { border: "1px solid #d4d4d4" }
              }
            />
          </div>
          <div className={styles.containerColor}>
            <MenuColor
              formData={formData}
              setColor={setColor}
              setFormData={setFormData}
            />
            <button className={styles.Fbutton}>Create</button>
          </div>
        </form>
        {dataBoards.map((board) => {
          return (
            <Link
              key={board.id.toString()}
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
