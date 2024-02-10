import { useState } from "react";
import { myColors } from "../../utils/variables";
import styles from "./styles.module.css";

function MenuColor({ formData, setColor, setFormData }) {
  const [showMenuColors, setShowMenuColors] = useState(false);

  const handdleMenuColor = () => {
    setShowMenuColors(!showMenuColors);
  };

  const colorBackground = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const colorId = event.currentTarget.id;
    const newFormData = { ...formData, color: colorId };
    setColor(colorId);
    setFormData(newFormData);
  };

  return (
    <div className={styles.containerMenuColor}>
      <p className={styles.colorMessage}>color</p>
      <div className={styles.menuColors} onClick={handdleMenuColor}>
        <div
          className={styles.containerColors}
          style={{ display: showMenuColors ? "grid" : "none" }}>
          <div
            className={styles.menuColors}
            id={myColors.first}
            style={{ backgroundColor: myColors.first }}
            onClick={colorBackground}></div>
          <div
            className={styles.menuColors}
            id={myColors.second}
            style={{ backgroundColor: myColors.second }}
            onClick={colorBackground}></div>
          <div
            className={styles.menuColors}
            id={myColors.third}
            style={{ backgroundColor: myColors.third }}
            onClick={colorBackground}></div>
          <div
            className={styles.menuColors}
            id={myColors.fourth}
            style={{ backgroundColor: myColors.fourth }}
            onClick={colorBackground}></div>
          <div
            className={styles.menuColors}
            id={myColors.fifth}
            style={{ backgroundColor: myColors.fifth }}
            onClick={colorBackground}></div>
          <div
            className={styles.menuColors}
            id={myColors.sixth}
            style={{ backgroundColor: myColors.sixth }}
            onClick={colorBackground}></div>
          <div
            className={styles.menuColors}
            id={myColors.seventh}
            style={{ backgroundColor: myColors.seventh }}
            onClick={colorBackground}></div>
          <div
            className={styles.menuColors}
            id={myColors.eighth}
            style={{ backgroundColor: myColors.eighth }}
            onClick={colorBackground}></div>
        </div>
      </div>
    </div>
  );
}

export default MenuColor;
