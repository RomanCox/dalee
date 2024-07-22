"use client";

import {ReactNode} from "react";
import ReactLenis from "lenis/react";
import {HeaderProvider} from "@/app/context/header-context";

const Providers = ({children}: { children: ReactNode }) => {
    return (
        <ReactLenis options={{lerp: 0.05, duration: 1, smoothWheel: true}} root>
            <HeaderProvider>
                {children}
            </HeaderProvider>
        </ReactLenis>
    );
};

export default Providers;
