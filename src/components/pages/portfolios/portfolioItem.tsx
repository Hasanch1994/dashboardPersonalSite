import { portfolioTypeResponse } from "../../../types/respTypes";
import { FC, memo, useContext, useEffect, useRef, useState } from "react";
import LazyLoad from "react-lazy-load";
import "./style.css";

import { MainContext, mainContextType } from "../../../contexts/mainContext";
import { convertDate } from "../../helper/convertDate";
import PortfolioMoreOption from "./moreOption";
interface portfolioItemProps {
  data: portfolioTypeResponse;
  onClick: () => void;
}

const PortfolioItem: FC<portfolioItemProps> = memo(({ data, onClick }) => {
  const [showMore, setShowMore] = useState<boolean>(false);
  const popoverRef = useRef(null);
  const { showDeletePortfolio, showPortfolioItem } = useContext(
    MainContext
  ) as mainContextType;
  function handleClickOutside() {
    setShowMore(false);
  }

  const handlePortfolioItemClick = () => {
    data && showPortfolioItem({ portfolioItemState: true, item: data });
  };

  const handlePopoverClick = (event: any) => {
    event.stopPropagation();
    setShowMore((prev) => !prev);
  };

  return (
    <div
      onClick={handlePortfolioItemClick}
      className="group relative select-none z-10"
    >
      <div className="h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200  lg:aspect-none lg:h-80">
        <LazyLoad height={"100%"} threshold={0.5}>
          <img
            className="object-cover object-center  w-full h-full group-hover:scale-105 transition duration-500 cursor-pointer"
            width={"100%"}
            height={"100%"}
            alt={data.title}
            src={data.imageUrls[0]}
          />
        </LazyLoad>
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <a href="#">
              <span aria-hidden="true" className="absolute inset-0"></span>
              {data.title}
            </a>
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {convertDate(Number(data.date))}
          </p>
        </div>

        <span className="relative cursor-pointer" onClick={handlePopoverClick}>
          <svg
            fill="#000000"
            className="w-4 h-4 text-gray-500 transition duration-75  group-hover:text-gray-900 "
            viewBox="0 0 1920 1920"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M960 1468.235c93.448 0 169.412 75.965 169.412 169.412 0 93.448-75.964 169.412-169.412 169.412-93.448 0-169.412-75.964-169.412-169.412 0-93.447 75.964-169.412 169.412-169.412Zm0-677.647c93.448 0 169.412 75.964 169.412 169.412 0 93.448-75.964 169.412-169.412 169.412-93.448 0-169.412-75.964-169.412-169.412 0-93.448 75.964-169.412 169.412-169.412Zm0-677.647c93.448 0 169.412 75.964 169.412 169.412 0 93.447-75.964 169.412-169.412 169.412-93.448 0-169.412-75.965-169.412-169.412 0-93.448 75.964-169.412 169.412-169.412Z"
              fill-rule="evenodd"
            />
          </svg>

          <PortfolioMoreOption
            id={data._id}
            onClickOutside={handleClickOutside}
            show={showMore}
            handlePortfolioItemClick={handlePortfolioItemClick}
            showDeletePortfolio={showDeletePortfolio}
          />
        </span>
      </div>
    </div>
  );
});

export default PortfolioItem;
