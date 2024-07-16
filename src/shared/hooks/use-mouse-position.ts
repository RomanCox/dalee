import {MouseEvent, useState} from "react";

export interface IPosition {
    x: number;
    y: number;
}

const useMousePosition = (x?: number, y?: number) => {
    const [position, setPosition] = useState<IPosition>({x: 0, y: 0});

    const onMouseMove = (e: MouseEvent<HTMLElement>) => {
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        const newX = e.clientX - rect.left + (x ? x : 0);
        const newY = e.clientY - rect.top + (y ? y : 0);

        setPosition({x: newX, y: newY});
    };

    return {position, onMouseMove};
}

export default useMousePosition;