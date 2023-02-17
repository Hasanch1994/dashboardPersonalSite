import { FC } from "react";
import { deletePortfolioType } from "../../../contexts/mainContext";
import withClickOutside from "../../../hocs/outsideModalClick";

interface Props {
  id: string;
  show: boolean;
  handlePortfolioItemClick(): void;
  showDeletePortfolio(data: deletePortfolioType): void;
}
const PortfolioMoreOption: FC<Props> = ({
  id,
  show,
  handlePortfolioItemClick,
  showDeletePortfolio,
}) => {
  return (
    <>
      {show && (
        <div
          id="popover-hover"
          role="tooltip"
          className="componentFade absolute z-10 right-full inline-block min-w-[9rem] text-sm font-light text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-1"
        >
          <div className="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg ">
            <h3 className="font-semibold text-gray-900 ">actions</h3>
          </div>
          <ul className="text-left">
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
            <li
              onClick={() => {
                showDeletePortfolio({ itemId: id, state: true });
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
          </ul>
        </div>
      )}
    </>
  );
};

export default withClickOutside(PortfolioMoreOption);
