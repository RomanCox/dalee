// global.d.ts
import 'react';

declare module 'react' {
    interface CSSProperties {
        '--animationDuration'?: string;
    }
}
