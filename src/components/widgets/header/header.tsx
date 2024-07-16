"use client";

import Link from "next/link";
import styles from "./header.module.scss";
import LogoIcon from "@/components/ui/logo";
import clsx from "clsx";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { TCommon } from "@/types/common.type";

const menu = [
  {
    id: 1,
    name: "О нас",
    href: "/about",
  },
  {
    id: 2,
    name: "Проекты",
    href: "/about",
  },
  {
    id: 3,
    name: "Вакансии",
    href: "/about",
  },
];

const Header = ({ commonData }: { commonData?: TCommon }) => {
  const [scrolled, setScrolled] = useState(false);

  const container = useRef(null);

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
      <span className={styles.logo}>
        <Link href={"/"}>
          <LogoIcon />
        </Link>
      </span>
      <a href={`tel:${commonData?.contacts.phone}`} target="_blank">
        {commonData?.contacts.phone}
      </a>
      <nav className={styles.links_container}>
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
