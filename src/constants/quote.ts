import {StaticImageData} from "next/image";

import quoteImage1 from "/public/images/about/quote-image1.png";
import quoteImage2 from "/public/images/about/quote-image2.png";

export const coloringInterval = 100;
export const imageAnimationDuration = 1000;

export interface IQuoteItem {
    id: number,
    label: string | Array<string | StaticImageData>,
    image?: StaticImageData,
    imagePosition?: "start" | "end" | "center",
}

export const quoteSectionData: IQuoteItem[] = [
    {
        id: 0,
        label: "«Архитектура - это искусство,",
    },
    {
        id: 1,
        label: ["объединяющее", quoteImage1, " в себе"],
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