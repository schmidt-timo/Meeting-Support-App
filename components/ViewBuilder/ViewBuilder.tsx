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
  children: React.ReactNode;
  nav: {
    activeItemId: string;
    onSelect: (id: string) => void;
  };
};

const ViewBuilder = ({ header, children, nav }: Props) => {
  const [activeNavItem, setActiveNavItem] = React.useState(nav.activeItemId);

  return (
    <div className="flex flex-col" style={{ height: "100vh" }}>
      <Header buttons={header.buttons} showBackArrow={header.showArrows}>
        {header.title}
      </Header>
      <div className="flex-1 overflow-y-scroll pb-3 min-h-300">{children}</div>
      <MobileNavigation
        activeItemId={activeNavItem}
        onSelect={(selectedItemId) => setActiveNavItem(selectedItemId)}
      />
    </div>
  );
};

export default ViewBuilder;
