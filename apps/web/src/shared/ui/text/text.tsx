import {ComponentPropsWithoutRef, ElementType, memo} from "react";

import clsx from "clsx";

import styles from './text.module.scss';

export enum TextAlign {
    RIGHT = 'right',
    CENTER = 'center',
    LEFT = 'left',
}

interface TextProps<TITLE extends ElementType = "h1", TEXT extends ElementType = "span"> extends ComponentPropsWithoutRef<"h1"> {
    className?: string;
    title?: string;
    titleTag?: TITLE;
    addTitle?: string;
    text?: string;
    textTag?: TEXT;
    align?: TextAlign;
}



export const Text = memo(<TITLE extends ElementType = "h1", TEXT extends ElementType = "span">(
    props: TextProps<TITLE, TEXT> &
        Omit<ComponentPropsWithoutRef<TITLE>, keyof TextProps<TITLE, TEXT>>,) => {
    const {
        className,
        title,
        addTitle,
        text,
        align = TextAlign.LEFT,
        titleTag: TitleComponent = "h1",
    } = props;

    const mods = {
        [styles[align]]: true,
    };

    return (
        <div className={clsx(styles.textWrapper, mods, [className])}>
            {title && (
                <div className={styles.titleWrapper}>
                    <TitleComponent
                        className={styles.title}
                    >
                        {title}
                    </TitleComponent>
                    <span>{addTitle}</span>
                </div>
            )}
            {text && (
                <p
                    className={styles.text}
                >
                    {text}
                </p>
            )}
        </div>
    );
});

Text.displayName = "Text";