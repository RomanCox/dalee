const quoteImage1 = "/images/about/quote-image1.png";
const quoteImage2 = "/images/about/quote-image2.png";

export const coloringInterval = 100;
export const imageAnimationDuration = 1000;

// Как и в constants/mission.ts: в Next.js картинка внутри label отличалась
// через next/image (StaticImageData — объект). В Vite это обычная строка,
// поэтому typeof item === "string" перестал отличать текст от картинки —
// заворачиваем картинку в объект.
export interface IQuoteImageItem {
    image: string,
}

export interface IQuoteItem {
    id: number,
    label: string | Array<string | IQuoteImageItem>,
    image?: string,
    imagePosition?: "start" | "end" | "center",
}

export const quoteSectionData: IQuoteItem[] = [
    {
        id: 0,
        label: "«Архитектура - это искусство,",
    },
    {
        id: 1,
        label: ["объединяющее", { image: quoteImage1 }, " в себе"],
        imagePosition: "center",
    },
    {
        id: 2,
        label: "функциональность, эстетику",
    },
    {
        id: 3,
        label: "и гармонию»",
        image: quoteImage2,
        imagePosition: "start",
    },
];