import styles from "./styles.module.css";
import Header from "../../components/header/Header";
import { Outlet } from "react-router-dom";
//crear un adapter para la informacion del usuario y boards
function Body() {
  return (
    <div className={styles.container}>
      <Header />
      <Outlet />
    </div>
  );
}

export default Body;
