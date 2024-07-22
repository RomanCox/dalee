interface IImageData {
    width: number;
    height: number;
    data: Uint8ClampedArray;
}

export const getImageBrightness = (imageData: IImageData): number => {
    let r: number, g: number, b: number, avg: number;
    let count = 0;
    let totalBrightness = 0;

    for (let i = 0; i < imageData.width; i++) {
        for (let j = 0; j < imageData.height; j++) {
            const index = (j * imageData.width + i) * 4;
            r = imageData.data[index];
            g = imageData.data[index + 1];
            b = imageData.data[index + 2];
            avg = (r * 299 + g * 587 + b * 114) / 1000;
            totalBrightness += avg;
            count++;
        }
    }

    return totalBrightness / count;
};
