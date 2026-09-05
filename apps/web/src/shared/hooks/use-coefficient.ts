import {useMemo} from "react";
import {useWindowWidth} from "@react-hook/window-size";

export const useCoefficient = () => {
    const width = useWindowWidth();
    return useMemo(() => width / 1920 * 10, [width]);
}