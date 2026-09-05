import { InputHTMLAttributes, ReactNode } from "react";
import Icon from "../icon";
import { InputMask } from "@react-input/mask";

import styles from "./input.module.scss";

type Props = {
  type?: "text" | "number" | "phone";
  placeholder?: string;
  error?: string;
  icon?: ReactNode;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = (
  { type = "text", placeholder, error, icon, ...props }: Props
) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {icon && <span className={styles.icon_container}>{icon}</span>}
        {type === "phone" ? (
          <InputMask
            className={styles.input}
            placeholder={placeholder}
            mask="+_ ___ ___ __ __"
            inputMode="numeric"
            replacement={{ _: /\d/ }}
            {...props}
          />
        ) : (
          <input
            className={styles.input}
            type={type}
            placeholder={placeholder}
            {...props}
          />
        )}
      </div>
      {error && (
        <small className={styles.error}>
          <Icon height="35" width="35" name="warning" />
          {error}
        </small>
      )}
    </div>
  );
};

Input.displayName = "Input";

export default Input;
