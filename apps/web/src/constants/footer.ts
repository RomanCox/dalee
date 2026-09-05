import {IItem} from "@/components/widgets/social-items/social-items";

interface IInfoItem {
    id: number;
    title: string;
    value: string;
    type?: string;
}

export const info: IInfoItem[] = [
    {
        id: 1,
        title: "Телефон",
        value: "+7 (900) 000-22-32",
        type: "tel",
    },
    {
        id: 2,
        title: "E-MAIL",
        value: "info@dalee1.ru",
        type: "mailto",
    },
    {
        id: 3,
        title: "Адрес",
        value: "г. Краснодар, Димитрова 164/1, этаж 3.",
    },
];

export const socials: IItem[] = [
    {
        id: 1,
        name: "telegram",
        link: "#",
    },
    {
        id: 2,
        name: "vk",
        link: "#",
    },
    {
        id: 3,
        name: "youtube",
        link: "#",
    },
    {
        id: 4,
        name: "dzen",
        link: "#",
    },
    {
        id: 5,
        name: "dprofile",
        link: "#",
    },
    {
        id: 6,
        name: "behance",
        link: "#",
    },
];

export const socialsMobile: IItem[] = [
    {
        id: 1,
        name: "telegram",
        link: "#",
    },
    {
        id: 2,
        name: "youtube",
        link: "#",
    },
    {
        id: 3,
        name: "dprofile",
        link: "#",
    },
    {
        id: 4,
        name: "behance",
        link: "#",
    },
];