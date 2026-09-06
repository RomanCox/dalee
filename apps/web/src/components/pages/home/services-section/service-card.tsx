import clsx from "clsx";
import { forwardRef } from "react";

import Card from "@/components/ui/card/card";

import { TService } from "@/types/service.type";
import styles from "./service-card.module.scss";
import { generateImageUrl } from "@/utils/helpers";

interface ServiceCardProps {
  item: TService;
  className?: string;
  top?: number;
}

const ServiceCard = forwardRef<
  HTMLDivElement,
  ServiceCardProps
>(({ item, className, top: _top }, ref) => {
  const cardMods = {
    [styles.circleBottomLeft]: item.position === 5,
    [styles.circleTopRight]: item.position === 4,
  };

  return (
    <Card
      ref={ref}
      variant={item.type}
      className={clsx(styles.card, className, styles[item.type], cardMods)}
      imageUrl={
        item.imageUrl &&
        generateImageUrl(item.imageUrl.url)
      }
      imageSizes={item.imageUrl && (item.position === 5 ? "(max-width: 767px) calc(100vw - 5.2rem), calc(100vw - 130.4rem)" : "(max-width: 767px) calc(100vw - 5.2rem), 38rem")}
      // style={{ height: `calc(100vh - ${top}px - 1rem)` }}
      withoutHoverEffect={item.type === "title"}>
      {item.type === "title" ? (
        <h2 className={styles.title}>{item.title}</h2>
      ) : (
        <h4 className={styles.title}>{item.title}</h4>
      )}
      <p className={styles.description}>{item.description}</p>
    </Card>
  );
});

ServiceCard.displayName = "ServiceCard";

export default ServiceCard;
