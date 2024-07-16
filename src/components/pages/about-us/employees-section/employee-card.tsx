import {memo, useCallback, useState} from "react";
import Image from "next/image";
import clsx from "clsx";

import useMousePosition from "@/shared/hooks/use-mouse-position";

import {IEmployee} from "@/constants/employees";

import styles from "./employee-card.module.scss";

interface EmployeeCardProps {
    employee: IEmployee;
}

export const EmployeeCard = memo(({employee}: EmployeeCardProps) => {
    const [isHover, setIsHover] = useState<boolean>(false);

    const {position, onMouseMove} = useMousePosition(10, 20);

    const onMouseEnterHandler = useCallback(() => {
        setIsHover(true);
    }, []);

    const onMouseLeaveHandler = useCallback(() => {
        setIsHover(false);
    }, []);

    const mods = {
        [styles.quoteView]: isHover,
    };

    return (
        <div className={styles.employeeCard}>
            <div
                className={styles.imageContainer}
                onMouseEnter={onMouseEnterHandler}
                onMouseLeave={onMouseLeaveHandler}
                onMouseMove={onMouseMove}
            >
                <Image
                    src={employee.image}
                    alt={`photo ${employee.name}`}
                    priority
                />
                <div
                    className={clsx(styles.quoteContainer, mods)}
                    style={{
                        "--x": `${position.x}px`,
                        "--y": `${position.y}px`,
                    }}
                >
                    <p className={styles.quote}>{employee.quote}</p>
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