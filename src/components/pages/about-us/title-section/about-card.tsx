"use client";

import {memo, useRef} from "react";
import gsap from "gsap";
import clsx from "clsx";

import Card from "@/components/ui/card/card";

import {TAboutCard} from "@/types/about-card.type";
import styles from "./about-card.module.scss";

export const AboutCard = memo(({item}: { item: TAboutCard }) => {
    const cardMods = {
        [styles.wide]: item.id === 4,
        [styles.circleBottomLeft]: item.id === 4,
        [styles.circleTopRight]: item.id === 3,
    };

    return (
        <Card
            variant={item.type}
            className={clsx(styles.card, styles[item.type], cardMods)}
            withoutHoverEffect={item.type === "title" || item.type === "empty"}
        >
            <h4
                className={clsx(styles.title, {
                    [styles.startWithOne]: item.title.startsWith("1"),
                })}
            >
                {item.title}
            </h4>
            <p className={styles.description}>{item.description}</p>
        </Card>
    );
});

AboutCard.displayName = "AboutCard";
