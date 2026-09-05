import {
  memo,
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import clsx from "clsx";

import { SocialItems } from "@/components/widgets/social-items/social-items";
import { Portal } from "@/shared/ui/portal/portal";
import { Overlay } from "@/shared/ui/overlay/overlay";

import styles from "./mobile-menu.module.scss";
import { MobileMenuButton } from "@/shared/ui/mobile-menu-button/mobile-menu-button";
import { TCommon } from "@/types/common.type";

const ANIMATION_DELAY = 300;

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  toggleMenu: () => void;
  commonData?: TCommon;
}

export const MobileMenu = memo((props: MobileMenuProps) => {
  const { isOpen, onClose, toggleMenu, commonData } = props;

  const [isClosing, setIsClosing] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const timerRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;

  const closeHandler = useCallback(() => {
    if (onClose) {
      setIsClosing(true);
      timerRef.current = setTimeout(() => {
        onClose();
        setIsClosing(false);
      }, ANIMATION_DELAY);
    }
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  const mods = {
    [styles.opened]: isOpen,
    [styles.closed]: isClosing,
  };

  if (!isMounted) {
    return null;
  }

  return (
    <Portal>
      <div
        data-lenis-prevent="true"
        className={clsx(styles.mobileMenuModalWrapper, mods)}>
        <Overlay onClick={closeHandler} />
        <div
          className={styles.mobileMenuContainer}
          onClick={(e) => e.stopPropagation()}>
          <div className={styles.menu}>
            <Link
              href={`tel:${commonData?.contacts.phone}`}
              className={styles.navItem}>
              {commonData?.contacts.phone}
            </Link>
            {commonData?.navigation.map((item) => (
              <Link key={item.id} href={item.link} className={styles.navItem} onClick={closeHandler}>
                {item.title}
              </Link>
            ))}
            <SocialItems
              items={commonData?.socials}
              className={styles.socialsContainer}
            />
            <svg className={styles.svg}>
              <clipPath id="mobileMenuClip" clipPathUnits="objectBoundingBox">
                <path d="M0,0.036 C0,0.016,0.014,0,0.031,0 H0.969 C0.986,0,1,0.016,1,0.036 V0.755 C1,0.774,0.986,0.79,0.969,0.791 L0.88,0.791 C0.846,0.791,0.818,0.823,0.818,0.863 V0.964 C0.818,0.984,0.804,1,0.786,1 L0.031,0.999 C0.014,0.999,0,0.983,0,0.963 V0.036"></path>
              </clipPath>
            </svg>
          </div>
          <MobileMenuButton
            onClick={toggleMenu}
            isOpen={isOpen}
            className={styles.closeBtn}
          />
        </div>
      </div>
    </Portal>
  );
});

MobileMenu.displayName = "MobileMenu";
