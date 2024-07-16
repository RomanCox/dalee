"use client";

import { ReactNode } from "react";
import ReactLenis from "lenis/react";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ReactLenis options={{ lerp: 0.05, duration: 1, smoothWheel: true }} root>
      {children}
    </ReactLenis>
  );
};

export default Providers;
