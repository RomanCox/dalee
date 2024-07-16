import { CSSProperties, forwardRef, ReactNode } from "react";
import Image from "next/image";
import clsx from "clsx";

import useMousePosition from "@/shared/hooks/use-mouse-position";

import styles from "./card.module.scss";
import { TCardVariant } from "@/types/global";

interface CardProps {
  children: ReactNode;
  className?: string;
  imageUrl?: string;
  variant: TCardVariant;
  style?: CSSProperties;
  withoutHoverEffect?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>((props, ref) => {
  const {
    children,
    className,
    variant = "card-solid",
    imageUrl,
    style,
    withoutHoverEffect,
  } = props;

  const { position, onMouseMove } = useMousePosition();

  return (
    <article
      ref={ref}
      className={clsx(styles.card, className, styles[variant], {
        [styles.hoverEffect]: !withoutHoverEffect,
      })}
      onMouseMove={onMouseMove}
      style={{
        ...style,
        "--x": `${position.x}px`,
        "--y": `${position.y}px`,
      }}>
      {children}
      {imageUrl && (
        <>
          <Image
            className={styles.image}
            src={imageUrl}
            fill
            alt=""
            aria-hidden
          />
        </>
      )}
    </article>
  );
});

Card.displayName = "Card";

export default Card;
