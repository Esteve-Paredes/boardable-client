import styles from "./styles.module.css";
import Header from "./header/Header";
import { Outlet } from "react-router-dom";

function Body() {
  return (
    <div className={styles.container}>
      <Header />
      <Outlet />
    </div>
  );
}

export default Body;
