import { useState, ReactNode } from 'react';
import { vars } from "@/styles/vars";
import { HeaderContext } from "./header-context";

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
