import { FC, useContext } from "react";
import {
  MainContext,
  deleteMoreOptionType,
  mainContextType,
} from "../../contexts/mainContext";
import withClickOutside from "../../hocs/outsideModalClick";
import { PortalWithState } from "react-portal";
import EditExperienceModal from "../dialogs/experienceModal/editExperienceModal";

interface Props {
  id: string;
  show: boolean;
  handlePortfolioItemClick?: () => void;
  showEdit?: () => void;
  type: "portfolio" | "experience" | "idle";
}
const MoreOption: FC<Props> = ({
  id,
  show,
  handlePortfolioItemClick,
  showEdit,
  type,
}) => {
  const { showMoreOptionDelete } = useContext(MainContext) as mainContextType;
  return (
    <>
      {show && (
        <div
          id="popover-hover"
          role="tooltip"
          className="componentFade absolute z-10 right-full inline-block min-w-[9rem] text-sm font-light text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-lg opacity-1"
        >
          <div className="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg ">
            <h3 className="font-semibold text-gray-900 ">actions</h3>
          </div>
          <ul className="text-left">
            {handlePortfolioItemClick && (
              <li
                onClick={handlePortfolioItemClick}
                className="py-3 px-2 flex items-center justify-start gap-x-2 hover:bg-gray-100"
              >
                <svg
                  fill="#000000"
                  className="w-4 h-4 text-gray-500 transition duration-75  group-hover:text-gray-900 "
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="read">
                    <g>
                      <path d="M12,18.883a10.8,10.8,0,0,1-9.675-5.728,2.6,2.6,0,0,1,0-2.31A10.8,10.8,0,0,1,12,5.117a10.8,10.8,0,0,1,9.675,5.728h0a2.6,2.6,0,0,1,0,2.31A10.8,10.8,0,0,1,12,18.883ZM12,6.117a9.787,9.787,0,0,0-8.78,5.176,1.586,1.586,0,0,0,0,1.415A9.788,9.788,0,0,0,12,17.883a9.787,9.787,0,0,0,8.78-5.176,1.584,1.584,0,0,0,0-1.414h0A9.787,9.787,0,0,0,12,6.117Z" />
                      <path d="M12,16.049A4.049,4.049,0,1,1,16.049,12,4.054,4.054,0,0,1,12,16.049Zm0-7.1A3.049,3.049,0,1,0,15.049,12,3.052,3.052,0,0,0,12,8.951Z" />
                      <circle cx="12" cy="12" r="2.028" />
                    </g>
                  </g>
                </svg>
                <span className=" text-sm text-gray-800">show</span>
              </li>
            )}

            <li
              onClick={() => {
                if (type === "portfolio")
                  showMoreOptionDelete({
                    itemId: id,
                    state: true,
                    type: "portfolio",
                  });
                else if (type === "experience")
                  showMoreOptionDelete({
                    itemId: id,
                    state: true,
                    type: "experience",
                  });
              }}
              className="py-3 px-2 flex items-center justify-start gap-x-2 hover:bg-gray-100"
            >
              <svg
                className="w-4 h-4 text-gray-500 transition duration-75  group-hover:text-gray-900 "
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#f41a1a"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0" />

                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M10 11V17"
                    stroke="#000000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />{" "}
                  <path
                    d="M14 11V17"
                    stroke="#000000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />{" "}
                  <path
                    d="M4 7H20"
                    stroke="#000000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />{" "}
                  <path
                    d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z"
                    stroke="#000000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />{" "}
                  <path
                    d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
                    stroke="#000000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />{" "}
                </g>
              </svg>
              <span className=" text-sm text-gray-800">delete</span>
            </li>
            {showEdit && (
              <li
                onClick={() => {
                  showEdit();
                }}
                className="py-3 px-2 hover:bg-gray-100"
              >
                <PortalWithState closeOnEsc>
                  {({ openPortal, closePortal, isOpen }) => (
                    <>
                      <span
                        className="cursor-pointer  flex items-center justify-start gap-x-2 "
                        onClick={openPortal}
                      >
                        <svg
                          className="w-4 h-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="m3.99 16.854-1.314 3.504a.75.75 0 0 0 .966.965l3.503-1.314a3 3 0 0 0 1.068-.687L18.36 9.175s-.354-1.061-1.414-2.122c-1.06-1.06-2.122-1.414-2.122-1.414L4.677 15.786a3 3 0 0 0-.687 1.068zm12.249-12.63 1.383-1.383c.248-.248.579-.406.925-.348.487.08 1.232.322 1.934 1.025.703.703.945 1.447 1.025 1.934.058.346-.1.677-.348.925L19.774 7.76s-.353-1.06-1.414-2.12c-1.06-1.062-2.121-1.415-2.121-1.415z"
                            fill="#000000"
                          />
                        </svg>
                        <span className=" text-sm text-gray-800">edit</span>
                      </span>
                      {isOpen && (
                        <EditExperienceModal
                          preData={item}
                          onClickOutside={closePortal}
                          onUpdate={listUpdate}
                          onClose={closePortal}
                          key={self.crypto.randomUUID()}
                        />
                      )}
                    </>
                  )}
                </PortalWithState>
              </li>
            )}
          </ul>
        </div>
      )}
    </>
  );
};

export default withClickOutside(MoreOption);
