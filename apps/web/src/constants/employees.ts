import {StaticImageData} from "next/image";
import Employee from "/public/images/about/employee.png";
import Team from "/public/images/about/team.png";
import OtherEmployee from "/public/images/about/otherEmployee.png";

interface ITeamPhoto {
    id: number;
    photo: StaticImageData,
}

export const teamPhotos: ITeamPhoto[] = [
    {
        id: 1,
        photo: Team,
    },
    {
        id: 2,
        photo: Team,
    },
    {
        id: 3,
        photo: Team,
    },
]

export interface IEmployee {
    id: number,
    image: StaticImageData,
    name: string,
    position: string,
    quote: string,
}

export const employees: IEmployee[] = [
    {
        id: 1,
        image: Employee,
        name: "Гозенко Александр Сергеевич",
        position: "CEO",
        quote: "Наша главная миссия — реализовывать самые смелые задачи благодаря большой команде компетентных специалистов.",
    },
    {
        id: 2,
        image: Employee,
        name: "Тлехусеж Юлия",
        position: "Главный архитектор\nпроектов",
        quote: "Наша главная миссия — реализовывать самые смелые задачи благодаря большой команде компетентных специалистов.",
    },
    {
        id: 3,
        image: Employee,
        name: "Даренский Антон",
        position: "Главный инженер\nпроектов",
        quote: "Наша главная миссия — реализовывать самые смелые задачи благодаря большой команде компетентных специалистов.",
    },
    {
        id: 4,
        image: Employee,
        name: "Шека Илья",
        position: "Руководитель отдела\nконцепций",
        quote: "Наша главная миссия — реализовывать самые смелые задачи благодаря большой команде компетентных специалистов.",
    },
    {
        id: 5,
        image: Employee,
        name: "Бурлак Владимир",
        position: "Руководитель отдела\nЭС",
        quote: "Наша главная миссия — реализовывать самые смелые задачи благодаря большой команде компетентных специалистов.",
    },
    {
        id: 6,
        image: Employee,
        name: "Якушев Александр",
        position: "Руководитель отдела\nВК и ОВ",
        quote: "Наша главная миссия — реализовывать самые смелые задачи благодаря большой команде компетентных специалистов.",
    },
    {
        id: 7,
        image: Employee,
        name: "Красовская Ирина",
        position: "Руководитель отдела выпуска\nпечатной документации",
        quote: "Наша главная миссия — реализовывать самые смелые задачи благодаря большой команде компетентных специалистов.",
    },
    {
        id: 8,
        image: Employee,
        name: "Макаренко Даниил",
        position: "Руководитель отдела\nмаркетинга и дизайна",
        quote: "Наша главная миссия — реализовывать самые смелые задачи благодаря большой команде компетентных специалистов.",
    },
];

// export const SliderTime = 30000;
export const SliderTime = 10000;

export interface IOtherEmployee {
    id: number;
    photo: StaticImageData;
}

export const otherEmployees: IOtherEmployee[] = [
    {
        id: 1,
        photo: OtherEmployee,
    },
    {
        id: 2,
        photo: OtherEmployee,
    },
    {
        id: 3,
        photo: OtherEmployee,
    },
    {
        id: 4,
        photo: OtherEmployee,
    },
    {
        id: 5,
        photo: OtherEmployee,
    },
    {
        id: 6,
        photo: OtherEmployee,
    },
    {
        id: 7,
        photo: OtherEmployee,
    },
    {
        id: 8,
        photo: OtherEmployee,
    },
    {
        id: 9,
        photo: OtherEmployee,
    },
    {
        id: 10,
        photo: OtherEmployee,
    },{
        id: 11,
        photo: OtherEmployee,
    },
    {
        id: 12,
        photo: OtherEmployee,
    },
    {
        id: 13,
        photo: OtherEmployee,
    },
]