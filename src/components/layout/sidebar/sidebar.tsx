import { useState } from "react";
import SideBarItem, { sidebarItemProps } from "./sidebarItem";

const SideBar = () => {
  const [toggle, setToggle] = useState<boolean>(false);

  const handleCloseToggle = () => {
    setToggle((pre) => !pre);
  };

  const items: Array<sidebarItemProps> = [
    {
      title: "dashboard",
      icon: (
        <svg
          aria-hidden="true"
          className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
          <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
        </svg>
      ),
      linkDestination: "/",
    },

    {
      title: "Inbox",
      icon: (
        <svg
          aria-hidden="true"
          className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path>
          <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path>
        </svg>
      ),
      linkDestination: "/inbox",
    },
    {
      title: "Skills",
      icon: (
        <svg
          className="w-6 h-6 text-gray-500 transition duration-75  dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
          fill="rgb(107,114,128)"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
        >
          <g>
            <path
              d="M77.3,55.7L70,44.9l0-0.9c0-13.2-10.8-24-24-24c-1.9,0-3.8,0.2-5.7,0.7C29.7,23.1,22,32.9,22,44
         c0,4.9,1.2,9.3,3.6,12.7c4.2,6,7,10.8,5.3,17.3c-0.4,1.5-0.1,3,0.9,4.2c0.9,1.2,2.2,1.8,3.7,1.8h19.7c2.3,0,4.3-1.6,4.7-3.8
         c0.1-0.4,0.2-0.8,0.2-1.2c0.2-1.2,1.2-2,2.4-2h1.4c2.2,0,4.1-1.3,4.7-3.4c0.6-2.3,1.4-5.6,1.5-9.6h5.2c0.9,0,1.8-0.8,2.2-1.6
         C77.9,57.6,77.8,56.3,77.3,55.7z M61.4,42c-0.8,1.3-2.4,2-4.7,2c-12.3,0-13.2,9-13.2,13.3c0,2-1.6,3.7-3.6,3.7h-0.3
         c-1.7,0-3.1-1.2-3.5-2.9c-0.4-1.8-1.6-2.8-2.8-3.7c-0.8-0.6-1.6-1.2-2-2.1c-1.1-2.3-2.2-5-2.2-8.4c0-7.8,5.4-14.6,12.7-16.3
         c1.4-0.3,2.7-0.5,4.1-0.5c6.8,0,12.9,4.1,15.5,10.3C61.5,37.7,62.6,40.1,61.4,42z"
            />
          </g>
        </svg>
      ),
      linkDestination: "/skills",
    },
    {
      title: "Portfolio",
      icon: (
        <svg
          className="w-6 h-6 text-gray-500 transition duration-75  dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
          viewBox="0 0 32 32"
          fill="rgb(107,114,128)"
          version="1.1"
        >
          <g id="icomoon-ignore"></g>
          <path
            d="M19.732 7.203v-2.666h-7.464v2.666h-9.063v20.259h25.59v-20.259h-9.063zM13.334 5.604h5.331v1.599h-5.331v-1.599zM12.268 8.27h15.461v8.53h-7.997v-2.133h-7.464v2.133h-7.997v-8.53h7.997zM18.666 15.733v3.199h-5.331v-3.199h5.331zM4.271 26.396v-8.53h7.997v2.133h7.464v-2.133h7.997v8.53h-23.457z"
            fill="#000000"
          ></path>
        </svg>
      ),
      linkDestination: "/portfolios",
    },
    {
      title: "experiences",
      icon: (
        <svg
          className="w-6 h-6 text-gray-500 transition duration-75  dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
          fill="rgb(107,114,128)"
          viewBox="0 0 22 22"
          xmlns="http://www.w3.org/2000/svg"
          id="memory-alpha-e"
        >
          <path d="M15 1V2H17V3H18V4H19V5H20V7H21V15H20V17H19V18H18V19H17V20H15V21H7V20H5V19H4V18H3V17H2V15H1V7H2V5H3V4H4V3H5V2H7V1H15M14 3H8V4H6V5H5V6H4V8H3V14H4V16H5V17H6V18H8V19H14V18H16V17H17V16H18V14H19V8H18V6H17V5H16V4H14V3M8 6H14V8H10V10H14V12H10V14H14V16H8V6Z" />
        </svg>
      ),
      linkDestination: "/experiences",
    },
    {
      title: "logout",
      icon: (
        <svg
          className="w-6 h-6 text-gray-500 transition duration-75  dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
          fill="rgb(107,114,128)"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2 6.5C2 4.01472 4.01472 2 6.5 2H12C14.2091 2 16 3.79086 16 6V7C16 7.55228 15.5523 8 15 8C14.4477 8 14 7.55228 14 7V6C14 4.89543 13.1046 4 12 4H6.5C5.11929 4 4 5.11929 4 6.5V17.5C4 18.8807 5.11929 20 6.5 20H12C13.1046 20 14 19.1046 14 18V17C14 16.4477 14.4477 16 15 16C15.5523 16 16 16.4477 16 17V18C16 20.2091 14.2091 22 12 22H6.5C4.01472 22 2 19.9853 2 17.5V6.5ZM18.2929 8.29289C18.6834 7.90237 19.3166 7.90237 19.7071 8.29289L22.7071 11.2929C23.0976 11.6834 23.0976 12.3166 22.7071 12.7071L19.7071 15.7071C19.3166 16.0976 18.6834 16.0976 18.2929 15.7071C17.9024 15.3166 17.9024 14.6834 18.2929 14.2929L19.5858 13L11 13C10.4477 13 10 12.5523 10 12C10 11.4477 10.4477 11 11 11L19.5858 11L18.2929 9.70711C17.9024 9.31658 17.9024 8.68342 18.2929 8.29289Z"
            fill="rgb(107,114,128)"
          />
        </svg>
      ),
      linkDestination: "/logout",
    },
  ];

  return (
    <div className="sm:max-w-[16rem] flex-col">
      <header className="flex sm:hidden bg-white shadow-lg shadow-gray-300 z-50">
        <span
          onClick={handleCloseToggle}
          data-drawer-target="sidebar-multi-level-sidebar"
          data-drawer-toggle="sidebar-multi-level-sidebar"
          aria-controls="sidebar-multi-level-sidebar"
          className="inline-flex h-11 p-1 mt-2 ml-3 z-30 text-sm text-gray-500 rounded-lg md:hidden"
        >
          <span className="sr-only">Open sidebar</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            ></path>
          </svg>
        </span>
      </header>

      <aside
        id="sidebar-multi-level-sidebar"
        className={`w-64 z-30 h-screen border-r shadow-md transition-transform  absolute top-13 left-0 sm:fixed sm:top-0 sm:left-0 ${
          !toggle && "-translate-x-full"
        } sm:translate-x-0 `}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-white ">
          <ul className="space-y-3">
            {items.map((item) => (
              <SideBarItem
                key={self.crypto.randomUUID()}
                title={item.title}
                icon={item.icon}
                linkDestination={item.linkDestination}
              />
            ))}
          </ul>
        </div>
      </aside>
      {/* overlay layer */}
      {toggle && (
        <div
          onClick={handleCloseToggle}
          className="w-full h-full absolute left-0 top-13 right-0 bg-gray-50 opacity-50 z-20"
        ></div>
      )}
    </div>
  );
};

export default SideBar;
