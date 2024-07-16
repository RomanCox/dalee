"use client";

import { memo, useEffect, useState } from "react";
import { useWindowWidth } from "@react-hook/window-size";

import { FooterDesktop } from "@/components/widgets/footer/footer-desktop";
import { FooterMobile } from "@/components/widgets/footer/footer-mobile";

import styles from "./footer.module.scss";
import { TCommon } from "@/types/common.type";

export const Footer = memo(({ commonData }: { commonData?: TCommon }) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const width = useWindowWidth();

  useEffect(() => {
    if (width > 767) {
      setIsMobile(false);
    }
    if (width <= 767) {
      setIsMobile(true);
    }
  }, [width]);

  return (
    <footer className={styles.footer}>
      {isMobile ? (
        <FooterMobile commonData={commonData} />
      ) : (
        <FooterDesktop commonData={commonData} />
      )}
    </footer>
  );
});

Footer.displayName = "Footer";
