import { MouseEventHandler } from "react";
import { Link } from "react-router-dom";

export interface sidebarItemProps {
  title: string;
  icon?: any;
  linkDestination: string;
}

const SideBarItem = ({ title, icon, linkDestination }: sidebarItemProps) => {
  return (
    <Link
      className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
      to={linkDestination}
    >
      {icon && icon}
      <span className="flex-1 ml-3 whitespace-nowrap">{title}</span>
    </Link>
  );
};

export default SideBarItem;
