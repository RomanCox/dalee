"use client";

import { memo, useCallback, useState } from "react";
import clsx from "clsx";

import Button from "@/components/ui/button/button";
import { Accordion } from "@/shared/ui/accordion/accordion";
import LogoFullIcon from "@/components/ui/logo-full";
import Icon from "@/components/ui/icon";

import styles from "@/components/widgets/footer/footer.module.scss";
import { SocialItems } from "@/components/widgets/social-items/social-items";
import { TCommon } from "@/types/common.type";
import Link from "next/link";

export const FooterMobile = memo(({ commonData }: { commonData?: TCommon }) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState<boolean>(false);

  const onToggleHandler = useCallback(() => {
    setIsAccordionOpen((prev) => !prev);
  }, []);

  return (
    <>
      <div className={styles.header}>
        <SocialItems items={commonData?.socials.slice(0, 4)} />
        <Button
          as="a"
          href={commonData?.ourVacanciesLink}
          target="_blank"
          size="small"
          className={styles.button}>
          Наши вакансии
          <Icon name="arrow-down" width="52" height="52" />
        </Button>
      </div>
      <div className={styles.middle}>
        <Accordion
          label={
            <div
              className={clsx(styles.label, {
                [styles.open]: isAccordionOpen,
              })}>
              <span>{"Связаться с нами"}</span>
              <Icon name={"cross-small"} width={"1.2rem"} height={"1.2rem"} />
            </div>
          }
          className={styles.accordion}
          startValue={isAccordionOpen}
          onToggle={onToggleHandler}>
          <div className={styles.contentContainer}>
            <hr />
            <div className={styles.content}>
              <a href={`tel:${commonData?.contacts.commonPhone}`}>
                <span>{commonData?.contacts.commonPhone}</span>
                <span>общая линия</span>
              </a>
              <a href={`tel:${commonData?.contacts.clientsPhone}`}>
                <span>{commonData?.contacts.clientsPhone}</span>
                <span>для застройщиков</span>
              </a>
              <a href={`mailto:${commonData?.contacts.email}`}>
                {commonData?.contacts.email}
              </a>
              <a target="_blank" href={commonData?.contacts.addressLink}>
                {commonData?.contacts.address}
              </a>
            </div>
          </div>
        </Accordion>
      </div>
      <div className={styles.bottom}>
        <div className={styles.logosContainer}>
          <Link href={"/"}>
            <LogoFullIcon className={styles.logo} />
          </Link>
          <Icon name={"x-small"} width={"0.8rem"} height={"0.8rem"} />
          <a
            className={styles.watermark}
            target="_blank"
            href="https://alpa.studio">
            <Icon name={"alpa-mobile"} width={"2rem"} height={"1.6rem"} />
          </a>
        </div>
        <p>&copy; {new Date().getFullYear()} «ДАЛЕЕ»</p>
      </div>
    </>
  );
});

FooterMobile.displayName = "FooterMobile";
