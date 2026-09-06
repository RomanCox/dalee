import { useContext } from "react";

import { HeaderContext, HeaderContextProps } from "./header-context";

export const useHeaderContext = (): HeaderContextProps => {
    const context = useContext(HeaderContext);
    if (!context) {
        throw new Error('useHeaderContext must be used within a HeaderProvider');
    }
    return context;
};
