import { FC, useContext, useState } from "react";
import { experiencesTypeResponse } from "../../../types/respTypes";
import MoreOption from "../../popover/moreOption";
import { MainContext, mainContextType } from "../../../contexts/mainContext";

interface Props {
  data: experiencesTypeResponse;
}

const ExperienceItem: FC<Props> = ({ data }) => {
  const [showMore, setShowMore] = useState<boolean>(false);
  const { showMoreOptionUpdate } = useContext(MainContext) as mainContextType;
  const handlePopoverClick = (event: any) => {
    event.stopPropagation();
    setShowMore((prev) => !prev);
  };

  function handleClickOutside() {
    setShowMore(false);
  }
  console.log(data.to, data.status);

  return (
    <li className="mb-4 ml-4 flex flex-col gap-y-2">
      <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white "></div>
      <div className="w-full flex justify-between">
        <time className="mb-1 text-sm font-normal leading-none text-gray-500 ">
          {data.from} until {!data.to ? "now" : data.to}
        </time>

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

          <MoreOption
            id={data._id}
            type="experience"
            onClickOutside={handleClickOutside}
            show={showMore}
            showEdit={() => showMoreOptionUpdate({ state: true, data: data })}
          />
        </span>
      </div>

      <h3 className="text-lg font-semibold text-gray-900">{data.title}</h3>
      <p className="mb-4 text-base font-normal text-gray-500 ">{data.text}</p>
      {/* <a
        href="#"
        className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-200 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
      >
        Learn more{" "}
        <svg
          className="w-3 h-3 ml-2"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </a> */}
    </li>
  );
};

export default ExperienceItem;
