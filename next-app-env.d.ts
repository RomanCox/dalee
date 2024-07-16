/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.
import 'react';

declare module 'react' {
    interface CSSProperties {
        [key: `--${string}`]: string | number;
    }
}