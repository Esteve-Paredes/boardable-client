import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { fetchGet } from "../utils/functions-fetch";
import { URL } from "../utils/variables";

type DataBoars = {
  id: number;
  userid: number;
  title: string;
  color: string;
  createdat: Date;
};

function MyBoards() {
  const [dataBoards, setDataBoards] = useState<DataBoars[]>([]);

  const navigate = useNavigate();
  const object = localStorage.getItem("user");
  const user = object && JSON.parse(object);

  const handdleClick = () => {
    if (object) {
      localStorage.removeItem("user");
      navigate("/login");
    }
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await fetchGet(URL, "/", {
        headers: {
          id: user.id,
          username: user.username,
          Authorization: `Bearer ${user.token}`,
        },
      });
      setDataBoards(response.data.data);
      console.log(response.data.data);
    };

    fetch();
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <img className={styles.logo} src={logo} alt="logo" />
          <h1 className={styles.title}>Boardable</h1>
        </div>
        <div className={styles.botonContainer}>
          <button className={styles.bAccount}>My Account</button>
          <button className={styles.bLogout} onClick={handdleClick}>
            Logout
          </button>
        </div>
      </header>
      <div className={styles.bodyBoards}>
        <div className={styles.containerBoards}>
          <h1 className={styles.titleBoards}>My Boards</h1>
          <div className={styles.containerSelect}>
            <p className={styles.message}>Sort by</p>
            <select className={styles.select} name="date">
              <option value="date">created date</option>
              <option value="user1">02-02-2024</option>
              <option value="user2">02-02-2024</option>
            </select>
          </div>
        </div>
        <div className={styles.gridContainer}>
          <form className={styles.containerBoard}>
            <div className={styles.containerInputForm}>
              <p className={styles.messageTitle}>Board Title</p>
              <input className={styles.inputForm} type="text" />
            </div>
            <div className={styles.containerColor}>
              <p className={styles.colorMessage}>color</p>
              <button className={styles.Fbutton}>Create</button>
            </div>
          </form>
          {dataBoards.map((board) => {
            return (
              <Link key={board.id.toString()} className={styles.cards} to={"#"}>
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
