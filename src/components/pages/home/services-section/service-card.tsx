"use client";

import clsx from "clsx";
import {forwardRef} from "react";

import Card from "@/components/ui/card/card";

import {TService} from "@/types/service.type";
import styles from "./service-card.module.scss";
import {generateImageUrl} from "@/utils/helpers";

interface ServiceCardProps {
    item: TService;
    className?: string;
    top?: number;
}

const ServiceCard = forwardRef<
    HTMLDivElement,
    ServiceCardProps
>(({item, className, top}, ref) => {
    const cardMods = {
        [styles.circleBottomLeft]: item.id === 5,
        [styles.circleTopRight]: item.id === 4,
    };

    return (
        <Card
            ref={ref}
            variant={item.type}
            className={clsx(styles.card, className, styles[item.type], cardMods)}
            imageUrl={
                item.imageUrl?.data &&
                generateImageUrl(item.imageUrl?.data.attributes.url)
            }
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
