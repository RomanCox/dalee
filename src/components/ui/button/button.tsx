"use client";

import { ReactNode } from "react";
import clsx from "clsx";

import useMousePosition from "@/shared/hooks/use-mouse-position";

import styles from "./button.module.scss";

interface ButtonProps {
  type?: "submit" | "button";
  className?: string;
  children: ReactNode;
  size?: "medium" | "small";
  as?: "a" | "button";
  href?: string;
  onClick?: () => void;
  withoutEffect?: boolean;
  target?: "_blank" | "blank" | "_parent" | "_top";
}

const Button = (props: ButtonProps) => {
  const {
    type = "button",
    size = "medium",
    className,
    children,
    as = "button",
    href,
    onClick,
    withoutEffect,
    target,
  } = props;

  const { position, onMouseMove } = useMousePosition();

  if (as === "a") {
    return (
      <a
        className={clsx(
          styles.button,
          { [styles.effect]: !withoutEffect },
          styles[size],
          className,
        )}
        href={href}
        onClick={onClick}
        onMouseMove={onMouseMove}
        style={{
          "--x": `${position.x}px`,
          "--y": `${position.y}px`,
        }}
        target={target}>
        {children}
      </a>
    );
  }

  return (
    <button
      className={clsx(
        styles.button,
        { [styles.effect]: !withoutEffect },
        styles[size],
        className,
      )}
      onClick={onClick}
      type={type}
      onMouseMove={onMouseMove}
      style={{
        "--x": `${position.x}px`,
        "--y": `${position.y}px`,
      }}>
      {children}
    </button>
  );
};

export default Button;
