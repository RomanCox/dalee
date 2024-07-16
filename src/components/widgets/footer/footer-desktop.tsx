import Image from "next/image";
import { memo } from "react";

import Button from "@/components/ui/button/button";

import Icon from "@/components/ui/icon";
import LogoFullIcon from "@/components/ui/logo-full";
import watermark from "/public/images/watermark.png";

import styles from "@/components/widgets/footer/footer.module.scss";
import { SocialItems } from "@/components/widgets/social-items/social-items";
import { TCommon } from "@/types/common.type";
import Link from "next/link";

export const FooterDesktop = memo(
  ({ commonData }: { commonData?: TCommon }) => {
    return (
      <>
        <div className={styles.header}>
          <Link href={"/"}>
            <LogoFullIcon className={styles.logo} />
          </Link>
          <ul className={styles.info_list}>
            <li className={styles.info_item}>
              <p className={styles.info_title}>Телефон</p>

              <a href={`tel:${commonData?.contacts.phone}`}>
                {commonData?.contacts.phone}
              </a>
            </li>
            <li className={styles.info_item}>
              <p className={styles.info_title}>E-MAIL</p>

              <a target="_blank" href={`mailto:${commonData?.contacts.email}`}>
                {commonData?.contacts.email}
              </a>
            </li>
            <li className={styles.info_item}>
              <p className={styles.info_title}>Адрес</p>

              <a target="_blank" href={commonData?.contacts.addressLink}>
                {commonData?.contacts.address}
              </a>
            </li>
          </ul>
          <Button
            as="a"
            href={commonData?.ourVacanciesLink}
            size="small"
            className={styles.button}
            target="_blank">
            Наши вакансии
            <Icon name="arrow-down" width="52" height="52" />
          </Button>
        </div>
        <hr />
        <div className={styles.bottom}>
          <SocialItems items={commonData?.socials} />
          <p>&copy; {new Date().getFullYear()} «ДАЛЕЕ»</p>

          <div className={styles.watermarkContainer}>
            <a
              className={styles.watermark}
              target="_blank"
              href="https://alpa.studio">
              <Image src={watermark} alt="watermark" />
            </a>
          </div>
        </div>
      </>
    );
  },
);

FooterDesktop.displayName = "FooterDesktop";
