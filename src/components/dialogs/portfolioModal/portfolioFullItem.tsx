import { FC, useContext, useState } from "react";
import { MainContext, mainContextType } from "../../../contexts/mainContext";
import Carousel from "../../carousel";

import "./style.css";
import { Link } from "react-router-dom";

const PortfolioFullItem: FC = () => {
  const { portfolioItem, showPortfolioItem } = useContext(
    MainContext
  ) as mainContextType;

  const [showDescription, setShowDescription] = useState<boolean>(false);

  const handleDescriptionClick = () => {
    setShowDescription((prev) => !prev);
  };

  const handlePortfolioItemClick = () => {
    showPortfolioItem({ portfolioItemState: false, item: undefined });
  };

  return (
    <main className="componentFade flex flex-col w-full h-full absolute top-0 left-0 right-0 bottom-0 bg-gray-900 z-50">
      <header className="w-full p-3 relative h-14 bg-gray-50/10">
        <h3 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-base">
          {portfolioItem.item?.title}
        </h3>

        <span
          title="close"
          onClick={handlePortfolioItemClick}
          className="absolute right-0 top-1/2 -translate-y-1/2 mr-3 cursor-pointer"
        >
          <svg
            className="w-6 h-6 "
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_429_11083)">
              <path
                d="M7 7.00006L17 17.0001M7 17.0001L17 7.00006"
                stroke="#fff"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_429_11083">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </span>

        {/* show description */}
        <span
          onClick={handleDescriptionClick}
          title="read description"
          className="absolute left-0 top-1/2 -translate-y-1/2 ml-3 cursor-pointer"
        >
          {!showDescription ? (
            <svg
              className="w-6 h-6 "
              fill="#fff"
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
          ) : (
            <svg
              className="w-6 h-6 "
              viewBox="0 0 1024 1024"
              xmlns="http://www.w3.org/2000/svg"
              fill="#000000"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0" />

              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <g id="SVGRepo_iconCarrier">
                <path
                  d="M876.8 156.8c0-9.6-3.2-16-9.6-22.4-6.4-6.4-12.8-9.6-22.4-9.6-9.6 0-16 3.2-22.4 9.6L736 220.8c-64-32-137.6-51.2-224-60.8-160 16-288 73.6-377.6 176C44.8 438.4 0 496 0 512s48 73.6 134.4 176c22.4 25.6 44.8 48 73.6 67.2l-86.4 89.6c-6.4 6.4-9.6 12.8-9.6 22.4 0 9.6 3.2 16 9.6 22.4 6.4 6.4 12.8 9.6 22.4 9.6 9.6 0 16-3.2 22.4-9.6l704-710.4c3.2-6.4 6.4-12.8 6.4-22.4Zm-646.4 528c-76.8-70.4-128-128-153.6-172.8 28.8-48 80-105.6 153.6-172.8C304 272 400 230.4 512 224c64 3.2 124.8 19.2 176 44.8l-54.4 54.4C598.4 300.8 560 288 512 288c-64 0-115.2 22.4-160 64s-64 96-64 160c0 48 12.8 89.6 35.2 124.8L256 707.2c-9.6-6.4-19.2-16-25.6-22.4Zm140.8-96c-12.8-22.4-19.2-48-19.2-76.8 0-44.8 16-83.2 48-112 32-28.8 67.2-48 112-48 28.8 0 54.4 6.4 73.6 19.2L371.2 588.8ZM889.599 336c-12.8-16-28.8-28.8-41.6-41.6l-48 48c73.6 67.2 124.8 124.8 150.4 169.6-28.8 48-80 105.6-153.6 172.8-73.6 67.2-172.8 108.8-284.8 115.2-51.2-3.2-99.2-12.8-140.8-28.8l-48 48c57.6 22.4 118.4 38.4 188.8 44.8 160-16 288-73.6 377.6-176C979.199 585.6 1024 528 1024 512s-48.001-73.6-134.401-176Z"
                  fill="#ffffff"
                />

                <path
                  d="M511.998 672c-12.8 0-25.6-3.2-38.4-6.4l-51.2 51.2c28.8 12.8 57.6 19.2 89.6 19.2 64 0 115.2-22.4 160-64 41.6-41.6 64-96 64-160 0-32-6.4-64-19.2-89.6l-51.2 51.2c3.2 12.8 6.4 25.6 6.4 38.4 0 44.8-16 83.2-48 112-32 28.8-67.2 48-112 48Z"
                  fill="#ffffff"
                />
              </g>
            </svg>
          )}
        </span>

        {/* github link */}

        {portfolioItem.item && portfolioItem.item.githubLink && (
          <Link
            target="_blank"
            title="github link"
            to={portfolioItem.item.githubLink}
          >
            <span className="absolute left-11 top-1/2 -translate-y-1/2 ml-3 cursor-pointer text-white text-base">
              Github
            </span>
          </Link>
        )}
      </header>
      <div className="flex min-w-full h-full relative">
        {portfolioItem.item && (
          <Carousel
            images={portfolioItem.item.imageUrls}
            showArrows
            autoPlay={false}
            infiniteLoop={true}
            slideTime={3000}
            arrowSlide
            paused={showDescription}
          />
        )}

        {showDescription && portfolioItem.item && (
          <div className="animComponent absolute left-0 top-0 right-0 bottom-0 w-full h-full bg-gray-800/90 p-4 overflow-y-auto">
            <pre className="text-white text-base whitespace-pre-wrap font-mono">
              {portfolioItem.item.description}
            </pre>
          </div>
        )}
      </div>
    </main>
  );
};

export default PortfolioFullItem;
