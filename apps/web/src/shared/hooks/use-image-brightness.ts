import {useEffect, useRef, useState} from "react";
import {StaticImageData} from "next/image";
import {getImageBrightness} from "@/shared/helpers/getImageBrightness";

interface IOptions {
    sx?: number;
    sy?: number;
    sw?: number;
    sh?: number;
}

export const useImageBrightness = (image: StaticImageData, setTextColor: (color: string) => void, options?: IOptions) => {
    const [brightness, setBrightness] = useState<number | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas!.getContext('2d');
        const imageElement = new Image();
        imageElement.src = image.src;

        imageElement.onload = () => {
            if (canvas && context) {
                canvas.width = image.width;
                canvas.height = image.height;
                context.drawImage(imageElement, 0, 0);
                const imageData = context.getImageData(options?.sx || 0, options?.sy || 0, options?.sw || image.width, options?.sh || 100);
                const brightness = getImageBrightness(imageData);
                setBrightness(brightness);
            }
        }
    }, [image, options?.sh, options?.sw, options?.sx, options?.sy, setTextColor]);

    return { brightness, canvasRef };
};
