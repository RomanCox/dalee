import {StaticImageData} from "next/image";

import image1 from "/public/images/mission/mission1.jpg";
import videoImage from "/public/images/mission/mission-video-image.jpg";
import image2 from "/public/images/mission/mission2.jpg";

export const coloringInterval = 100;
export const imageAnimationDuration = 1000;

export interface IMissionItem {
    id: number,
    label: string | Array<string | StaticImageData>,
    image?: StaticImageData,
    imagePosition?: "start" | "end" | "center",
}

export const missionData: IMissionItem[] = [
    {
        id: 0,
        label: "CОЗДАЕМ КОНЦЕПТУАЛЬНУЮ",
    },
    {
        id: 1,
        label: "ИННОВАЦИОННУЮ АРХИТЕКТУРУ,",
        image: image1,
        imagePosition: "start",
    },
    {
        id: 2,
        label: "ФОРМИРУЯ ОБЛИК ЖИЛЫХ",
        image: videoImage,
        imagePosition: "end",
    },
    {
        id: 3,
        label: "КВАРТАЛОВ, ВПИСЫВАЮЩИХСЯ",
    },
    {
        id: 4,
        label: ["В ИСТОРИЧЕСКУЮ", image2, "ТКАНЬ ГОРОДОВ."],
        imagePosition: "center",
    },
];

export const missionDataMobile: IMissionItem[] = [
    {
        id: 0,
        label: "CОЗДАЕМ КОНЦЕПТУАЛЬНУЮ",
    },
    {
        id: 1,
        label: "ИННОВАЦИОННУЮ ",
        image: image1,
        imagePosition: "end",
    },
    {
        id: 2,
        label: "АРХИТЕКТУРУ, ФОРМИРУЯ",
    },
    {
        id: 3,
        label: "ОБЛИК ЖИЛЫХ КВАРТАЛОВ,",
    },
    {
        id: 4,
        label: "ВПИСЫВАЮЩИХСЯ",
        image: videoImage,
        imagePosition: "start",
    },
    {
        id: 5,
        label: "В ИСТОРИЧЕСКУЮ ТКАНЬ",
    },
    {
        id: 6,
        label: "ГОРОДОВ",
        image: image2,
        imagePosition: "end",
    },
];