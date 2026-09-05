import { createRootRoute, Outlet } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import Header from "@/components/widgets/header/header";
import { Footer } from "@/components/widgets/footer/footer";
import { MobileButtons } from "@/components/pages/home/mobile-buttons/mobile-buttons";
import { HeaderProvider } from "@/shared/context/header-context";

import { CommonService } from "@/services/common";
import { RequestSectionService } from "@/services/request";
import { TCommon } from "@/types/common.type";
import { TRequestSection } from "@/types/request.type";

import "@/styles/globals.scss";
import "@/styles/swipers.scss";
import "@/lib/gsapSetup";

import styles from "./__root.module.scss";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const [commonData, setCommonData] = useState<TCommon>();
  const [requestSection, setRequestSection] = useState<TRequestSection>();

  useEffect(() => {
    CommonService.getAll().then((response) => setCommonData(response.data));
    RequestSectionService.getAll().then((response) => setRequestSection(response.data.attributes));
  }, []);

  return (
    <HeaderProvider>
      <Header commonData={commonData} />
      <main className={styles.main}>
        <Outlet />
      </main>
      {requestSection && (
        <MobileButtons commonData={commonData} requestSection={requestSection} />
      )}
      <Footer commonData={commonData} />
    </HeaderProvider>
  );
}
