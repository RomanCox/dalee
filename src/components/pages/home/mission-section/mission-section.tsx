"use client";

import { memo, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import gsap from "gsap";
import { useLenis } from "lenis/react";
import { useGSAP } from "@gsap/react";
import { useWindowHeight, useWindowWidth } from "@react-hook/window-size";

import { useMediaQuery } from "@/shared/hooks/use-match-media";

import VideoModal from "@/components/widgets/modal/video-modal";
import MissionSectionMobile from "./mission-section-mobile";
import { Row } from "@/components/pages/home/mission-section/row";
import PlayBtn from "@/components/ui/play-btn/play-btn";

import {
  imageAnimationDuration,
  IMissionItem,
  missionDataMobile,
} from "@/constants/mission";

import styles from "./mission-section.module.scss";
import { MissionSectionTablet } from "@/components/pages/home/mission-section/mission-section-tablet";
import { HomeService } from "@/services/home-page";

export interface MissionSectionProps {
  missionData: IMissionItem[];
}

export const MissionSection = memo(({ missionData }: MissionSectionProps) => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const [isModalOpened, setIsModalOpened] = useState(false);
  const [isFirstImageShow, setIsFirstImageShow] = useState(false);
  const [isSecondImageShow, setIsSecondImageShow] = useState(false);
  const [isThirdImageShow, setIsThirdImageShow] = useState(false);
  const [animationIndex, setAnimationIndex] = useState<number>(-1);

  useEffect(() => {
    const fetchHomeData = async () => {
      const response = await HomeService.getAll();
      setVideoUrl(response.data?.attributes.missionVideoLink);
    };

    fetchHomeData();
  }, []);

  let totalCharacters = 1;

  missionData.forEach((item) => {
    if (Array.isArray(item.label)) {
      totalCharacters += item.label.reduce(
        (sum, part) => sum + (typeof part === "string" ? part.length : 0),
        0,
      );
    } else {
      totalCharacters += item.label.length;
    }

    if (item.image) {
      totalCharacters += 1;
    }
  });

  const height = useWindowHeight();
  const width = useWindowWidth();

  const widthCoefficient = useMemo(() => (width / 1920) * 400, [width]);

  const scrollCoefficient = useMemo(() => {
    return Math.ceil((height - widthCoefficient) / totalCharacters);
  }, [height, totalCharacters, widthCoefficient]);

  const containerRef = useRef(null);
  const imageRef1 = useRef(null);
  const imageRef2 = useRef(null);
  const imageRef3 = useRef(null);

  const isMobile = useMediaQuery("(max-width: 767px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");

  useGSAP(
    () => {
      gsap.to([imageRef1.current, imageRef2.current, imageRef3.current], {
        scrollTrigger: {
          scrub: true,
        },
        yPercent: 40,
      });
    },
    { scope: containerRef },
  );

  useLenis(
    ({ scroll }) => {
      const newValue = Math.floor(
        (scroll - widthCoefficient) / scrollCoefficient,
      );
      setAnimationIndex(newValue);
    },
    [widthCoefficient, scrollCoefficient],
  );

  useEffect(() => {
    if (animationIndex >= missionData[0].label.length) {
      setIsFirstImageShow(true);
    } else {
      setIsFirstImageShow(false);
    }
    if (
      animationIndex >=
      missionData[0].label.length +
        missionData[1].label.length +
        missionData[2].label.length
    ) {
      setIsSecondImageShow(true);
    } else {
      setIsSecondImageShow(false);
    }
    if (
      typeof missionData[4].label[0] === "string" &&
      animationIndex >=
        missionData[0].label.length +
          missionData[1].label.length +
          missionData[2].label.length +
          missionData[3].label.length +
          missionData[4].label[0].length
    ) {
      setIsThirdImageShow(true);
    } else {
      setIsThirdImageShow(false);
    }
  }, [animationIndex, missionData]);

  if (isMobile) {
    return (
      <section ref={containerRef} id="mission" className={styles.section}>
        <MissionSectionMobile
          missionData={missionDataMobile}
          openModal={() => setIsModalOpened(true)}
        />
        {videoUrl && (
          <VideoModal
            opened={isModalOpened}
            close={() => setIsModalOpened(false)}
            url={videoUrl}
          />
        )}
      </section>
    );
  }

  if (isTablet) {
    return (
      <section ref={containerRef} id="mission" className={styles.section}>
        <MissionSectionTablet
          missionData={missionData}
          openModal={() => setIsModalOpened(true)}
        />
        {videoUrl && (
          <VideoModal
            opened={isModalOpened}
            close={() => setIsModalOpened(false)}
            url={videoUrl}
          />
        )}
      </section>
    );
  }

  return (
    <section ref={containerRef} id="mission" className={styles.section}>
      <div className={styles.container}>
        {missionData.map((row, index) => (
          <div key={row.id} className={styles.rowContainer}>
            {Array.isArray(row.label) ? (
              <div className={styles.lastRowsContainer}>
                {row.label.map((item, i) => {
                  if (typeof item === "string") {
                    return (
                      <Row
                        key={item}
                        rowIndex={index}
                        text={item}
                        animationIndex={animationIndex}
                        lastString={i === 2}
                      />
                    );
                  } else {
                    return (
                      <span
                        key={String(item)}
                        className={clsx(styles.image_container, {
                          [styles.displayedImage]: isThirdImageShow,
                        })}
                        style={{ "--duration": `${imageAnimationDuration}ms` }}>
                        <Image ref={imageRef3} src={item} alt="" aria-hidden />
                      </span>
                    );
                  }
                })}
              </div>
            ) : (
              <div key={row.id} className={styles.rowContainer}>
                {row.id === 1 && row.image && (
                  <span
                    className={clsx(styles.image_container, {
                      [styles.displayedImage]: isFirstImageShow,
                    })}
                    style={{ "--duration": `${imageAnimationDuration}ms` }}>
                    <Image ref={imageRef1} src={row.image} alt="" aria-hidden />
                  </span>
                )}
                <Row
                  text={row.label}
                  rowIndex={index}
                  animationIndex={animationIndex}
                />
                {row.id === 2 && row.image && (
                  <div className={styles.video_container}>
                    <span
                      className={clsx(styles.image_container, {
                        [styles.displayedImage]: isSecondImageShow,
                      })}
                      style={{ "--duration": `${imageAnimationDuration}ms` }}>
                      <Image
                        ref={imageRef2}
                        src={row.image}
                        alt=""
                        aria-hidden
                      />
                    </span>
                    <PlayBtn
                      variant="blurred"
                      className={clsx(styles.play_btn, {
                        [styles.displayedImage]: isSecondImageShow,
                      })}
                      style={{ "--duration": `${imageAnimationDuration}ms` }}
                      onClick={() => setIsModalOpened(true)}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {videoUrl && (
        <VideoModal
          opened={isModalOpened}
          close={() => setIsModalOpened(false)}
          url={videoUrl}
        />
      )}
    </section>
  );
});

MissionSection.displayName = "MissionSection";
