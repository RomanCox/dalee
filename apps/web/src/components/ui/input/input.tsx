import { ForwardedRef, forwardRef, InputHTMLAttributes, ReactNode } from "react";
import Icon from "../icon";
import { InputMask } from "@react-input/mask";

import styles from "./input.module.scss";

type Props = {
  type?: "text" | "number" | "phone";
  placeholder?: string;
  error?: string;
  icon?: ReactNode;
} & InputHTMLAttributes<HTMLInputElement>;

// forwardRef обязателен: react-hook-form Controller кладёт в field.ref свой
// колбэк (для фокуса на невалидном поле) — без forwardRef React его молча
// отбрасывает и ругается "Function components cannot be given refs".
const Input = forwardRef(
  (
    { type = "text", placeholder, error, icon, ...props }: Props,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    return (
      <div className={styles.wrapper}>
        <div className={styles.container}>
          {icon && <span className={styles.icon_container}>{icon}</span>}
          {type === "phone" ? (
            <InputMask
              ref={ref}
              className={styles.input}
              placeholder={placeholder}
              mask="+_ ___ ___ __ __"
              inputMode="numeric"
              replacement={{ _: /\d/ }}
              {...props}
            />
          ) : (
            <input
              ref={ref}
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
  },
);

Input.displayName = "Input";

export default Input;
