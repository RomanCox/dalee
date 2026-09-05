export interface IServiceGridItem {
    id: number;
    title: string;
    description?: string;
    type: "title" | "card-bg-image" | "card-solid";
    imageUrl?: string;
}

export const services: IServiceGridItem[] = [
    {
        id: 1,
        title: "ПОСАДКА ЗДАНИЙ",
        type: "card-solid",
    },
    {
        id: 2,
        title: "УСЛУГИ",
        description:
            "Архитектурное бюро полного цикла, являемся членом СРО. Выполняем полный спектр услуга «под ключ» в сфере проектирования и дизайна.",
        type: "title",
    },
    {
        id: 3,
        title: "МАСТЕРПЛАН",
        description: "Стратегия пространственного развития территории.",
        type: "card-bg-image",
        imageUrl: "/images/services/service1.png",
    },
    {
        id: 4,
        title: "ДЕТАЛЬНАЯ КОНЦЕПЦИЯ",
        description:
            "Комплекс работ по проектированию здания, определяющий функциональное зонирование,  планировки, внешний облик,  конструктивные и инженерные решения объекта.",
        type: "card-solid",
    },
    {
        id: 5,
        title: "ДИЗАЙН ИНТЕРЬЕРА",
        description:
            "Учитывают все особенности помещений, их назначениеи пожелания заказчиков.",
        type: "card-solid",
    },
    {
        id: 6,
        title: "РАБОЧАЯ ДОКУМЕНТАЦИЯ",
        type: "card-bg-image",
        imageUrl: "/images/services/service2.png",
    },
    {
        id: 7,
        title: "ПРОЕКТНАЯ ДОКУМЕНТАЦИЯ",
        type: "card-solid",
    },
    {
        id: 8,
        title: "СТРОИТЕЛЬСТВО",
        description:
            "Реализуем ваши идеии обеспечим высокое качество работ. Мы используем только качественные материалыи современное оборудование.",
        type: "card-bg-image",
        imageUrl: "/images/services/service2.png",
    },
];
