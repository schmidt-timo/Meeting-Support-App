import React from "react";
import { HeaderButton } from "../../utils/types";
import Header from "../Header/Header";
import MobileNavigation from "../MobileNavigation/MobileNavigation";

type Props = {
  header: {
    title: string;
    showArrows?: boolean;
    buttons?: HeaderButton[];
  };
  children?: React.ReactNode;
  nav: {
    activeItemId: string;
    onSelect?: (id: string) => void;
  };
};

const ViewBuilder = ({ header, children, nav }: Props) => {
  const [activeNavItem, setActiveNavItem] = React.useState(nav.activeItemId);

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
        onSelect={(selectedItemId) => setActiveNavItem(selectedItemId)}
      />
    </>
  );
};

export default ViewBuilder;
