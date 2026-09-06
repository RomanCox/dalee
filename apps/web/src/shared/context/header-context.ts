import { createContext } from 'react';

export interface HeaderContextProps {
    logoColor: string;
    setLogoColor: (color: string) => void;
    phoneColor: string;
    setPhoneColor: (color: string) => void;
    navColor: string;
    setNavColor: (color: string) => void;
}

export const HeaderContext = createContext<HeaderContextProps | undefined>(undefined);
