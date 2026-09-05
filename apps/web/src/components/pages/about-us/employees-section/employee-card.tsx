import {memo, MouseEvent, useCallback, useMemo, useState} from "react";
import Image from "next/image";
import clsx from "clsx";

import useMousePosition from "@/shared/hooks/use-mouse-position";

import {IEmployee} from "@/constants/employees";

import styles from "./employee-card.module.scss";
import {useWindowWidth} from "@react-hook/window-size";

interface EmployeeCardProps {
    employee: IEmployee;
    activeSlideId?: number;
    index?: number;
}

export const EmployeeCard = memo(({employee, activeSlideId, index}: EmployeeCardProps) => {
    const [isImageHover, setIsImageHover] = useState<boolean>(false);
    const [quotePosition, setQuotePosition] = useState<'left' | 'right'>('right');

    const width = useWindowWidth();

    const coefficient = useMemo(() => width / 1920 * 10, [width]);

    const {position, onMouseMove} = useMousePosition(10, 20);

    const onMouseEnterHandler = useCallback(() => {
        setIsImageHover(true);
    }, []);

    const onMouseLeaveHandler = useCallback(() => {
        setIsImageHover(false);
    }, []);

    const onMouseMoveHandler = useCallback((e: MouseEvent<HTMLElement>) => {
        onMouseMove(e);
        const quoteWidth = 49 * coefficient;
        const offsetX = 20;

        if (e.clientX + quoteWidth + offsetX > width) {
            setQuotePosition('left');
        } else {
            setQuotePosition('right');
        }
    }, [coefficient, onMouseMove, width]);

    const glowImageMods = useMemo(() =>
            !!activeSlideId !== undefined && index !== undefined ?
                {
                    [styles.activeGlowImage]: activeSlideId === index,
                } : {}
        , [activeSlideId, index]);

    const quoteMods = {
        [styles.quoteView]: isImageHover,
        [styles.quoteLeft]: quotePosition === 'left',
        [styles.quoteRight]: quotePosition === 'right',
    };

    return (
        <div className={styles.employeeCard}>
            <Image
                src={employee.image}
                className={clsx(styles.glowImage, glowImageMods)}
                alt={`photo ${employee.name}`}
                priority
            />
            <div
                className={styles.imageContainer}
                onMouseEnter={onMouseEnterHandler}
                onMouseLeave={onMouseLeaveHandler}
                onMouseMove={onMouseMoveHandler}
            >
                <Image
                    src={employee.image}
                    className={styles.image}
                    alt={`photo ${employee.name}`}
                    priority
                />
                <div
                    className={clsx(styles.quoteContainer, quoteMods)}
                    style={{
                        "--x": `${position.x}px`,
                        "--y": `${position.y}px`,
                    }}
                >
                    <p className={styles.quote}>{employee.quote}</p>
                    <div className={styles.gradient}/>
                </div>
            </div>
            <div className={styles.employeeCardTextContainer}>
                <p className={styles.name}>{employee.name}</p>
                <p className={styles.position}>{employee.position}</p>
            </div>
        </div>
    )
});

EmployeeCard.displayName = "EmployeeCard";