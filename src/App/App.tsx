import { Outlet } from "react-router-dom";
import styles from "./styles.module.css";

function App() {
  return (
    <div className={styles.body}>
      <Outlet />
    </div>
  );
}

export default App;
