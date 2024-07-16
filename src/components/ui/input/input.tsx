"use client";

import { forwardRef, ReactNode } from "react";
import styles from "./input.module.scss";
import Icon from "../icon";
import clsx from "clsx";
import { InputMask } from "@react-input/mask";

type Props = {
  type?: "text" | "number" | "phone";
  placeholder?: string;
  error?: string;
  icon?: ReactNode;
  containerClassName?: string;
};

const Input = forwardRef<HTMLInputElement, Props>(
  (
    { type = "text", placeholder, error, icon, containerClassName, ...props },
    ref,
  ) => {
    return (
      <div className={styles.wrapper}>
        <div className={clsx(styles.container, containerClassName)}>
          {icon && <span className={styles.icon_container}>{icon}</span>}
          {type === "phone" ? (
            <InputMask
              className={styles.input}
              ref={ref}
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
              ref={ref}
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
