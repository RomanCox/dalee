"use client";

import { memo, useCallback, useEffect, useState } from "react";
import { useWindowHeight, useWindowWidth } from "@react-hook/window-size";
import clsx from "clsx";
import { useLenis } from "lenis/react";

import { MobileMenu } from "@/components/widgets/mobile-menu/mobile-menu";
import Button from "@/components/ui/button/button";
import { MobileMenuButton } from "@/shared/ui/mobile-menu-button/mobile-menu-button";
import Modal from "@/components/widgets/modal/modal";
import { RequestSection } from "@/components/widgets/request-section/request-section";

import styles from "./mobile-menu.module.scss";
import { TCommon } from "@/types/common.type";
import { TRequestSection } from "@/types/request.type";

export const MobileButtons = memo(
  ({
    commonData,
    requestSection,
  }: {
    commonData?: TCommon;
    requestSection: TRequestSection;
  }) => {
    const [isOpenRequest, setIsOpenRequest] = useState<boolean>(false);
    const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [isView, setIsView] = useState<boolean>(false);

    const width = useWindowWidth();
    const height = useWindowHeight();

    const openRequest = useCallback(() => {
      setIsOpenRequest(true);
    }, []);

    const closeRequest = useCallback(() => {
      setIsOpenRequest(false);
    }, []);

    const toggleMenu = useCallback(() => {
      setIsOpenMenu((prev) => !prev);
    }, []);

    const closeMenu = useCallback(() => {
      setIsOpenMenu(false);
    }, []);

    useLenis(
      ({ scroll }) => {
        if (isMobile && scroll > height / 2) {
          setIsView(true);
        } else {
          setIsView(false);
        }
      },
      [width, height, isMobile],
    );

    useEffect(() => {
      if (width > 767) {
        setIsMobile(false);
      } else {
        setIsMobile(true);
      }
    }, [width]);

    if (!isMobile) {
      return null;
    }

    const mods = {
      [styles.isDisplayed]: isView,
    };

    return (
      <div className={clsx(styles.menuWrapper, mods)}>
        <div className={styles.menuContainer}>
          <Button
            className={clsx(styles.btn, { [styles.btnHide]: isOpenMenu })}
            onClick={openRequest}
            size={"small"}
            withoutEffect>
            Связаться с нами
          </Button>
          <MobileMenuButton onClick={toggleMenu} isOpen={isOpenMenu} />
        </div>
        <Modal
          isOpen={isOpenRequest}
          onClose={closeRequest}
          className={styles.modalWrapper}>
          <RequestSection
            requestSection={requestSection}
            isClearErrors={!isOpenRequest}
          />
        </Modal>
        <MobileMenu
          commonData={commonData}
          isOpen={isOpenMenu}
          onClose={closeMenu}
          toggleMenu={toggleMenu}
        />
      </div>
    );
  },
);

MobileButtons.displayName = "MobileMenu";
