import {useEffect, useRef, useState} from "react";
import {getImageBrightness} from "@/shared/helpers/getImageBrightness";

interface IOptions {
    sx?: number;
    sy?: number;
    sw?: number;
    sh?: number;
}

export const useImageBrightness = (image: string, setTextColor: (color: string) => void, options?: IOptions) => {
    const [brightness, setBrightness] = useState<number | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas!.getContext('2d');
        const imageElement = new Image();
        imageElement.src = image;

        imageElement.onload = () => {
            if (canvas && context) {
                const width = imageElement.naturalWidth;
                const height = imageElement.naturalHeight;
                canvas.width = width;
                canvas.height = height;
                context.drawImage(imageElement, 0, 0);
                const imageData = context.getImageData(options?.sx || 0, options?.sy || 0, options?.sw || width, options?.sh || 100);
                const brightness = getImageBrightness(imageData);
                setBrightness(brightness);
            }
        }
    }, [image, options?.sh, options?.sw, options?.sx, options?.sy, setTextColor]);

    return { brightness, canvasRef };
};
