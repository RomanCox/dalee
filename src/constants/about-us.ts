import {TCardVariant} from "@/types/global";

export interface IAboutItem {
    id: number;
    title: string;
    description?: string;
    descriptionMobile?: string;
    type: Partial<TCardVariant>;
}

export const aboutUsData: IAboutItem[] = [
    {
        id: 1,
        title: "100⁺",
        description: "сотрудников",
        type: "card-solid",
    },
    {
        id: 2,
        title: "О НАС",
        description:
            "в реальность, создавая уникальныеУзнайте, как превращаем идеи Узнайте, как превращаем идеи в реальность, создавая уникальные в реальность, создавая уникальные.",
        descriptionMobile:
            "Мы всегда стремимся вперед к покорению новых вершин, достижению масштабных результатов — рост компании, компетенций, коллектива, бизнеса и финансового благополучия компании.",
        type: "title",
    },
    {
        id: 3,
        title: "10",
        description: "лет на рынке",
        type: "card-solid",
    },
    {
        id: 4,
        title: "150⁺",
        description: "га площадь благоустройства",
        type: "card-solid",
    },
    {
        id: 5,
        title: "10 млрд",
        description: "рублей экономия на опережении сроков",
        type: "card-solid",
    },
    {
        id: 6,
        title: "30⁺",
        description: "выполненных проектов",
        type: "card-solid",
    },
    {
        id: 7,
        title: "100⁺",
        description: "га спроектировано",
        type: "card-solid",
    },
];

export const aboutUsMobileData: IAboutItem[] = [
    {
        id: 0,
        title: "100⁺",
        description: "сотрудников",
        type: "card-solid",
    },
    {
        id: 1,
        title: "10",
        description: "лет на рынке",
        type: "card-solid",
    },
    {
        id: 2,
        title: "150⁺",
        description: "га площадь благоустройства",
        type: "card-solid",
    },
    {
        id: 3,
        title: "10 млрд",
        description: "рублей экономия на опережении сроков",
        type: "card-solid",
    },
    {
        id: 4,
        title: "30⁺",
        description: "выполненных проектов",
        type: "card-solid",
    },
    {
        id: 5,
        title: "100⁺",
        description: "га спроектировано",
        type: "card-solid",
    },
];

export interface IAboutUsData {
    location: string;
    title: string;
    description: string[];
    mobileDescription?: string[];
}

export const aboutUsPageData: IAboutUsData = {
    location: "Россия, Краснодар.",
    title: "о нас",
    description: [
        "Реализуем самые смелые задачи благодаря",
        "большой команде компетентных специалистов и",
        "создаем масштабные проекты жилых комплексов",
        "комфорт и бизнес класса.",
    ],
    mobileDescription: [
        "Мы всегда стремимся вперед",
        "к покорению новых вершин,",
        "достижению масштабных",
        "результатов — рост компании,",
        "компетенций, коллектива,",
        "бизнеса и финансового",
        "благополучия компании.",
    ],
}