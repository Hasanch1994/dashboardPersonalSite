import { FC } from "react";
import SideBarItem, { SidebarItemProps } from "./sidebarItem";

interface SidebarProps {
  toggle: boolean;
  items: SidebarItemProps[];
}

const SidebarAside: FC<SidebarProps> = ({ items, toggle }) => {
  return (
    <aside
      id="sidebar-multi-level-sidebar"
      className={`w-64 z-30 h-screen border-r shadow-md transition-transform  absolute top-13 left-0 sm:fixed sm:top-0 sm:left-0 ${
        !toggle && "-translate-x-full"
      } sm:translate-x-0 `}
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto bg-white ">
        <ul className="space-y-3 ">
          {items.map((item) => (
            <SideBarItem
              key={item.id}
              id={item.id}
              title={item.title}
              icon={item.icon}
              linkDestination={item.linkDestination}
            />
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default SidebarAside;
