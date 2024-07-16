"use client";

import { memo, useEffect, useState } from "react";
import { useWindowWidth } from "@react-hook/window-size";

import { AboutDesktop } from "@/components/pages/home/about-section/about-desktop";
import { AboutMobile } from "@/components/pages/home/about-section/about-mobile";

import styles from "./about-section.module.scss";
import { TAboutCard } from "@/types/about-card.type";

export const AboutSection = memo(
  ({ aboutCards }: { aboutCards: TAboutCard[] }) => {
    const width = useWindowWidth();

    const [isMobile, setIsMobile] = useState<boolean>(false);

    useEffect(() => {
      if (width > 767) {
        setIsMobile(false);
      } else {
        setIsMobile(true);
      }
    }, [width]);

    return (
      <section className={styles.section}>
        {isMobile ? (
          <AboutMobile aboutCards={aboutCards} />
        ) : (
          <AboutDesktop aboutCards={aboutCards} />
        )}
      </section>
    );
  },
);
AboutSection.displayName = "AboutSection";
