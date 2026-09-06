import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { AboutUs } from "@/components/pages/about-us/about-us";
import { AboutCardsService } from "@/services/about-cards";
import { RequestSectionService } from "@/services/request";
import { aboutUsPageData } from "@/constants/about-us";
import { TCardVariant } from "@/types/global";
import { TAboutCard } from "@/types/about-card.type";
import { TRequestSection } from "@/types/request.type";

export const Route = createFileRoute("/about")({
  component: AboutUsPage,
});

function AboutUsPage() {
  const [requestSection, setRequestSection] = useState<TRequestSection>();
  const [aboutUsCards, setAboutUsCards] = useState<TAboutCard[]>();

  useEffect(() => {
    let cancelled = false;

    Promise.all([
      RequestSectionService.getAll(),
      AboutCardsService.getAll(),
    ]).then(([requestSectionResponse, aboutCardsResponse]) => {
      if (cancelled) return;

      setRequestSection(requestSectionResponse.data);

      const cards = aboutCardsResponse.data
        .filter((card) => card.type !== "title" && card.aboutUsPageOrder)
        .sort((a, b) => (a.aboutUsPageOrder ?? 0) - (b.aboutUsPageOrder ?? 0))
        .map((card) => ({
          id: card.aboutUsPageOrder || 0,
          title: card.title,
          type: card.type,
          description: card.description,
          homePageOrder: card.homePageOrder,
        }));

      cards.splice(1, 0, {
        id: 0,
        title: "",
        description: "",
        homePageOrder: 0,
        type: "empty" as TCardVariant,
      });

      setAboutUsCards(cards);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <AboutUs
      requestSection={requestSection}
      aboutUsCards={aboutUsCards}
      aboutUsData={aboutUsPageData}
    />
  );
}
