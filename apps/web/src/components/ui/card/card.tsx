import { CSSProperties, forwardRef, ReactNode } from "react";
import Image from "@/shared/ui/image/image";
import clsx from "clsx";

import useMousePosition from "@/shared/hooks/use-mouse-position";

import styles from "./card.module.scss";
import { TCardVariant } from "@/types/global";

interface CardProps {
  children: ReactNode;
  className?: string;
  imageUrl?: string;
  imageSizes?: string;
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
    imageSizes,
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
        <Image
          className={styles.image}
          src={imageUrl}
          sizes={imageSizes}
          fill
          alt=""
          aria-hidden
        />
      )}
    </article>
  );
});

Card.displayName = "Card";

export default Card;
