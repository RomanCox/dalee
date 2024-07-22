"use client";

import Link from "next/link";
import styles from "./header.module.scss";
import LogoIcon from "@/components/ui/logo";
import clsx from "clsx";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { TCommon } from "@/types/common.type";
import {useHeaderContext} from "@/app/context/header-context";

const Header = ({ commonData }: { commonData?: TCommon }) => {
  const [scrolled, setScrolled] = useState(false);

  const container = useRef(null);

  const { logoColor, phoneColor, navColor } = useHeaderContext();

  useLenis(({ scroll }) => {
    if (scroll > 150) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  });

  useGSAP(() => {}, { scope: container });

  return (
    <header
      ref={container}
      className={clsx(styles.header, scrolled && styles.scrolled)}>
      <span className={styles.logo} style={{color: logoColor}}>
        <Link href={"/"}>
          <LogoIcon />
        </Link>
      </span>
      <a href={`tel:${commonData?.contacts.phone}`} target="_blank" style={{color: phoneColor}}>
        {commonData?.contacts.phone}
      </a>
      <nav className={styles.links_container} style={{color: navColor}}>
        <ul className={styles.links}>
          {commonData?.navigation.map((item) => (
            <li key={item.id} className={styles.links_item}>
              <Link href={item.link}>{item.title}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
