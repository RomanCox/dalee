import {StaticImageData} from "next/image";

import patriki from "../../public/images/projects/patriki.png"
import elizabethPark from "../../public/images/projects/elizabethPark.png"
import europeCity from "../../public/images/projects/europeCity.png"
import svetlograd from "../../public/images/projects/svetlograd.png"
import coloredBoulevard from "../../public/images/projects/coloredBoulevard.png"
import origami from "../../public/images/projects/origami.png"

export interface ISlide {
    id: number;
    empty?: boolean;
    title: string;
    status?: string;
    location?: string;
    area?: string;
    year?: string;
    image?: StaticImageData;
}

export const slides: ISlide[] = [
    {
        id: 0,
        title: "ЖК Патрики",
        status: "Реализация",
        location: "Россия, Краснодар",
        area: "200 000",
        image: patriki,
    },
    {
        id: 1,
        title: "ЖК Елизаветинский Парк",
        status: "Реализация",
        location: "Россия, Краснодар",
        area: "150 000",
        image: elizabethPark,
    },
    {
        id: 2,
        title: "ЖК Европа Сити",
        status: "Реализация",
        location: "Россия, Краснодар",
        area: "25 000",
        image: europeCity,
    },
    {
        id: 3,
        title: "ЖК Светлоград",
        status: "Концепция",
        location: "Россия, Краснодар",
        area: "200 000",
        year: "2022",
        image: svetlograd,
    },
    {
        id: 4,
        title: "ЖК Цветной Бульвар",
        status: "Реализация",
        location: "Россия, Краснодар",
        area: "250 000",
        year: "2022",
        image: coloredBoulevard,
    },
    {
        id: 5,
        title: "НИЦ Оригами",
        status: "Реализация",
        location: "Россия, Нижний Новгород",
        year: "2024",
        image: origami,
    },
    {
        id: 6,
        empty: true,
        title: "Все\nпроекты",
    },
]