"use client";

import clsx from "clsx";
import {memo} from "react";

import Card from "@/components/ui/card/card";

import {TAboutCard} from "@/types/about-card.type";
import styles from "./about-card-mobile.module.scss";

export const AboutCardMobile = memo(({item}: { item: TAboutCard }) => {

    return (
        <Card
            variant={item.type}
            className={styles.card}
            withoutHoverEffect={true}
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

AboutCardMobile.displayName = "AboutCardMobile";
