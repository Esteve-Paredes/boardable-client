import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { useContext, useEffect, useState } from "react";
import { fetchGet, fetchPost } from "../utils/functions-fetch";
import { URL, myColors } from "../utils/variables";
import { getDate } from "../utils/get-date";
import { Page } from "../App/App";
import Header from "./header/Header";
import MenuColor from "./menu-color/MenuColor";

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

  const pageContext = useContext(Page);

  if (!pageContext) {
    throw new Error("Page context is undefined");
  }

  const { currentPage, setCurrentPage } = pageContext;

  const object = localStorage.getItem("user");
  const user = object && JSON.parse(object);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await fetchPost(URL, "/", {
      userId: user.id,
      title: formData.title,
      color: formData.color,
    });
    setCurrentPage(!currentPage);
    console.log(response);
  };

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);
  }

  useEffect(() => {
    const fetch = async () => {
      const response = await fetchGet(URL, "/", {
        headers: {
          id: user.id,
          username: user.username,
          authorization: `Bearer ${user.token}`,
        },
      });
      setDataBoards(response.data.data);
      console.log(response.data.data);
    };

    fetch();
  }, [currentPage]);

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.bodyBoards}>
        <div className={styles.containerBoards}>
          <h1 className={styles.titleBoards}>My Boards</h1>
          <div className={styles.containerSelect}>
            <p className={styles.message}>Sort by</p>
            <select className={styles.select} name="date">
              <option value="date">created date</option>
              {getDate(dataBoards).map((date, index) => {
                return (
                  <option key={index} value="user1">
                    {date}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className={styles.gridContainer}>
          <form
            className={styles.containerBoard}
            style={{ backgroundColor: color }}
            onSubmit={onSubmit}>
            <div className={styles.containerInputForm}>
              <p className={styles.messageTitle}>Board Title</p>
              <input
                className={styles.inputForm}
                type="text"
                name="title"
                onChange={handleChange}
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
                to={"#"}>
                {board.title}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default MyBoards;
