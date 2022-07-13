import React from "react";
import { HeaderButton } from "../../../utils/types";
import Header from "../../Header/Header";
import MobileNavigation from "../../MobileNavigation/MobileNavigation";
import { NAVIGATION_IDS } from "../../../utils/constants";
import { useRouter } from "next/router";

type Props = {
  header: {
    title: string;
    showArrows?: boolean;
    buttons?: HeaderButton[];
  };
  activeNavItemId: string;
  children?: React.ReactNode;
};

const PageLayout = ({ header, activeNavItemId, children }: Props) => {
  const router = useRouter();
  const [activeNavItem, setActiveNavItem] = React.useState(activeNavItemId);

  return (
    <>
      <Header buttons={header.buttons} showBackArrow={header.showArrows}>
        {header.title}
      </Header>

      <div
        className="overflow-y-scroll min-h-300"
        style={{
          paddingBottom: "calc(64px + 0.8rem)",
          paddingTop: "64px",
        }}
      >
        {children}
      </div>
      <MobileNavigation
        activeItemId={activeNavItem}
        onClick={(selectedItemId) => {
          setActiveNavItem(selectedItemId);
          if (selectedItemId === NAVIGATION_IDS.meetings) {
            router.push("/");
          }
          if (selectedItemId === NAVIGATION_IDS.reports) {
            router.push("/reports");
          }
          if (selectedItemId === NAVIGATION_IDS.profile) {
            router.push("/profile");
          }
        }}
      />
    </>
  );
};

export default PageLayout;
