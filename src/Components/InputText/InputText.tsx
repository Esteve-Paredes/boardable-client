import { ChangeEvent } from "react";
import styles from "./styles.module.css";
import classNames from "classnames";

interface PropsInputText {
  classStyles?: {
    containerInput?: string;
    label?: string;
    input?: string;
  };
  label?: string;
  type?: string;
  name: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

function InputText({
  classStyles,
  label,
  type = "text",
  name,
  value,
  onChange,
}: PropsInputText) {
  const getStylesToInput = (nameElement: string) => {
    if (!classStyles) return;
    const { containerInput, label, input } = classStyles;
    if (containerInput && nameElement === "containerInput")
      return { [styles[containerInput]]: containerInput };
    if (label && nameElement === "label") return { [styles[label]]: label };
    if (input && nameElement === "input") return { [styles[input]]: input };
  };

  return (
    <div
      className={classNames(
        styles.containerInput,
        getStylesToInput("containerInput")
      )}
    >
      {label && (
        <label
          className={classNames(styles.label, getStylesToInput("label"))}
          htmlFor={name}
        >
          {label}
        </label>
      )}
      <input
        className={classNames(styles.input, getStylesToInput("input"))}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default InputText;
