import {RequestSectionService} from "@/services/request";
import {AboutUs} from "@/components/pages/about-us/about-us";
import {AboutCardsService} from "@/services/about-cards";

const AboutUsPage = async () => {
    const [
        requestSectionResponse,
        aboutCardsResponse,
    ] = await Promise.all([
        RequestSectionService.getAll(),
        AboutCardsService.getAll(),
    ]);

    const aboutPageCardsSort = (arr: any[]) => {
        if (arr.length <= 4) {
            return arr.sort((a, b) => a.id - b.id);
        } else {
            const sortedArr = arr.sort((a, b) => a.id - b.id);
            const fourthElement = sortedArr.splice(3, 1)[0];
            sortedArr.push(fourthElement);
            return sortedArr;
        }
    }

    const aboutCards = aboutPageCardsSort(aboutCardsResponse.data)
        .map((card, index) => ({
            id: index + 1,
            title: card.attributes.title,
            type: card.attributes.type,
            description: card.attributes.description,
        }));

    return (
        <main>
            <AboutUs
                requestSection={requestSectionResponse.data.attributes}
                aboutCards={aboutCards}
            />
        </main>
    );
}

export default AboutUsPage;