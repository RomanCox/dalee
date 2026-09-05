import {FC, memo, SVGProps} from "react";

import clsx from "clsx";

import cls from "./icon.module.scss";

interface IconPropsType {
    className?: string;
    Svg: FC<SVGProps<SVGSVGElement>>;
}

export const Icon = memo((props: IconPropsType) => {
    const {
        className,
        Svg,
    } = props;

    return (
        <Svg className={clsx(cls.Icon, {}, [className])} />
    );
});

Icon.displayName = "Icon";