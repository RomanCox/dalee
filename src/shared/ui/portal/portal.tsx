import {ReactNode, useEffect, useState} from 'react'
import { createPortal } from 'react-dom'

interface PortalProps {
    children: ReactNode;
    elementId?: string;
}

export const Portal = (props: PortalProps) => {
    const {
        children,
        elementId,
    } = props

    const [mounted, setMounted] = useState(false);
    const [container, setContainer] = useState<Element | DocumentFragment | null>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const element = elementId ? document.getElementById(elementId) : document.body;
        setContainer(element);
    }, [elementId]);

    if (!mounted || !container) {
        return null;
    }

    return createPortal(children, container)
};
