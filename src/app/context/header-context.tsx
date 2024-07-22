import React, { createContext, useContext, useState, ReactNode } from 'react';
import {vars} from "@/styles/vars";

interface HeaderContextProps {
    logoColor: string;
    setLogoColor: (color: string) => void;
    phoneColor: string;
    setPhoneColor: (color: string) => void;
    navColor: string;
    setNavColor: (color: string) => void;
}

const HeaderContext = createContext<HeaderContextProps | undefined>(undefined);

export const useHeaderContext = (): HeaderContextProps => {
    const context = useContext(HeaderContext);
    if (!context) {
        throw new Error('useHeaderContext must be used within a HeaderProvider');
    }
    return context;
};

export const HeaderProvider = ({ children }: { children: ReactNode }) => {
    const [logoColor, setLogoColor] = useState<string>(vars.textColor);
    const [phoneColor, setPhoneColor] = useState<string>(vars.textColor);
    const [navColor, setNavColor] = useState<string>(vars.textColor);

    return (
        <HeaderContext.Provider value={{ logoColor, setLogoColor, phoneColor, setPhoneColor, navColor, setNavColor }}>
            {children}
        </HeaderContext.Provider>
    );
};
