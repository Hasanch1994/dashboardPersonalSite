import { FC, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export interface SidebarItemProps {
  id: string | number;
  title: string;
  icon?: React.ReactNode;
  linkDestination: string;
}

const SideBarItem: FC<SidebarItemProps> = ({
  title,
  icon,
  linkDestination,
}) => {
  const location = useLocation();
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    if (location.pathname === linkDestination) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [location.pathname, linkDestination]);

  const activeClass = isActive ? "bg-gray-100" : "";

  return (
    <li>
      <Link
        to={linkDestination}
        className={`flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100 ${activeClass}`}
      >
        {icon && icon}
        <span className="flex-1 ml-3 whitespace-nowrap">{title}</span>
      </Link>
    </li>
  );
};

export default SideBarItem;
