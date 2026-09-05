import {StaticImageData} from "next/image";
import patrikiTitle from "/public/images/projects/patriki/patriki_title.png";
import mainSlide from "/public/images/projects/patriki/main_slide.png";
import conceptSlide1 from "/public/images/projects/patriki/concept_slide1.png";
import conceptSlide2 from "/public/images/projects/patriki/concept_slide2.png";
import conceptSlide3 from "/public/images/projects/patriki/concept_slide3.png";
import generalPlanSlide1 from "/public/images/projects/patriki/general_plan_slide1.png";
import generalPlanSlide2 from "/public/images/projects/patriki/general_plan_slide2.png";
import architectureSlide1 from "/public/images/projects/patriki/architecture_slide1.png";

import svetlograd from "/public/images/projects/svetlograd.png";
import origami from "/public/images/projects/origami.png";

const slideTypes = ["Концепция", "Генплан", "Архитектура"] as const;
export type SlideType = (typeof slideTypes)[number];

interface IDescriptionProject {
    label: string;
    value: string | string[];
}

interface IMainSlide {
    description: IDescriptionProject[],
    image: StaticImageData;
}

export interface ISlide {
    title: SlideType;
    description: string,
    image: StaticImageData;
}

export interface IProjectData {
    id: string;
    title: StaticImageData;
    label: string;
    mainSlide: IMainSlide;
    slideTypes: SlideType[];
    otherSlides: ISlide[];
}

export const projectData: IProjectData = {
    id: "01",
    title: patrikiTitle,
    label: "патрики",
    mainSlide: {
        description: [
            {
                label: "Статус",
                value: "Реализация",
            },
            {
                label: "Год",
                value: "2022",
            },
            {
                label: "Геопозиция",
                value: "Россия, Краснодар",
            },
            {
                label: "Площадь",
                value: "250 000",
            },
            {
                label: "Заказчик",
                value: "ГК «Точно»",
            },
            {
                label: "Команда",
                value: ["Гозенко Александр", "Тлехусеж Юлия", "Антон Даренский"],
            },
        ],
        image: mainSlide,
    },
    slideTypes: ["Концепция", "Генплан", "Архитектура"],
    otherSlides: [
        {
            title: slideTypes[0],
            description: "За основу взяли образ писателя Михаила Булгакова — отсылкак Патриаршим прудам в Москве. Теперь в Краснодаре появится собственный Кот Бегемот. Гранд-аллея в центре «Патриков» станет излюбленным местом для летних фестивалей, новогодних праздникови неторопливого расслабленного отдыха.",
            image: conceptSlide1,
        },
        {
            title: slideTypes[0],
            description: "Водоемы, как и на Патриарших в Москве, в «Патриках» будут пруды. Правда, не строгой прямоугольной формы, а природной, округлой. Одним из главных украшений первой части аллеи станет бассейн с подсветкой и бьющими струями в центре, через которые можно будет перешагивать на плитку. Во второй части бульвара предложили разместить каскадные террасированные водопады.",
            image: conceptSlide2,
        },
        {
            title: slideTypes[0],
            description: "Мы хотели разбавить строгую архитектуру фасадов природными мотивами. Предусмотрели пышное озеленение, водоемы, газоны. Выход из паркинга обыграли в виде кроличьей норы: прикрыли его холмами, деревьями и кустарниками. Прогулочные дорожки на бульваре выложили извилисто вдоль фонарей. В качестве покрытия выбрали террасную доску и речную гальку.",
            image: conceptSlide3,
        },
        {
            title: slideTypes[1],
            description: "У заказчика была готовая концепция застройки квартала. Нам предстояло ее доработать, чтобы решить ряд задач:\n" +
                "1. Избавить жителей от шума дорог.\n" +
                "2. Сохранить безбарьерный доступ к ЖК со всех сторон при 4-метровом перепаде высоты на участке.\n" +
                "3. Переосмыслить конфигурацию подземного паркинга из-за нехватки машино-мест и компактно устроить технические помещения.",
            image: generalPlanSlide1,
        },
        {
            title: slideTypes[1],
            description: "По первоначальной концепции, часть жильцов должны были парковаться во дворе — на стилобате. В паркинге не хватало пространства. Мы изменили его конфигурацию: увеличили площадь на 371 м² и получили 33 дополнительных машино-места. Наземную парковку по периметру квартала оставили для гостей,а на кровле паркинга расположили двор. Это решение позволило создать полноценное благоустройство на участке в 1 га.",
            image: generalPlanSlide2,
        },
        {
            title: slideTypes[2],
            description: "Перераспределяющие балки для ликвидных планировок. По плану, несущие конструкции располагались так, чтобы уместить больше машино-мест с удобными проездами. Подходящая для этой цели расстановка пилонов мешала созданию эргономичных квартир. В комнатах могли появиться лишние углы. Мы сместили часть колонн при помощи перераспределяющих балок и спроектировали 46 ликвидных планировок.",
            image: architectureSlide1,
        },
    ],
}

export interface IProjectLink {
    image: StaticImageData,
    position: "left" | "center" | "right",
    title: string,
    slug: string,
}

export const projectLinksData: IProjectLink[] = [
    {
        image: svetlograd,
        position: "left",
        title: "светлоград",
        slug: "svetlograd",
    },
    {
        image: origami,
        position: "right",
        title: "ниц «оригами»",
        slug: "origami",
    }
]