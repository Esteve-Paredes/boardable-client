import { ChangeEvent } from "react";
import styles from "./styles.module.css";
import classNames from "classnames";

interface PropsInputText {
  label?: string;
  type?: string;
  name: string;
  parentComponentName?: string;
  errorInputText?: boolean;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

function InputText({
  label,
  type = "text",
  name,
  parentComponentName,
  errorInputText,
  value,
  onChange,
}: PropsInputText) {
  return (
    <div
      className={classNames(styles.containerInput, {
        [styles["containerInput" + parentComponentName]]: parentComponentName,
      })}
    >
      {label && (
        <label
          className={classNames(styles.label, {
            [styles["label" + parentComponentName]]: parentComponentName,
          })}
          htmlFor={name}
        >
          {label}
        </label>
      )}
      <input
        className={classNames(styles.input, {
          [styles["input" + parentComponentName]]: parentComponentName,
        })}
        style={
          errorInputText ? { borderColor: "red" } : { borderColor: "#d4d4d4" }
        }
        type={type}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default InputText;
