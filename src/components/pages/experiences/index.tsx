import { useQuery } from "react-query";
import { fetchExperiencesApi } from "../../../libs/services/endpoints/actions";
import { useContext, useEffect, useState } from "react";
import { experiencesTypeResponse } from "../../../types/respTypes";
import { PortalWithState } from "react-portal";
import AddPortfolioModal from "../../dialogs/portfolioModal/addPortfolioModal";
import ExperiencesItems from "./experiencesItems";
import { MainContext, mainContextType } from "../../../contexts/mainContext";

const Experiences = () => {
  const { data } = useQuery("experiences", fetchExperiencesApi, {
    onSuccess: (data) => {
      setExperiences(data);
    },
  });

  const { updateList, showUpdateList, showToast } = useContext(
    MainContext
  ) as mainContextType;

  useEffect(() => {
    if (updateList.itemId && updateList.type === "experience")
      listDeleteUpdate();
  }, [updateList.state]);

  const [experiences, setExperiences] = useState<
    Array<experiencesTypeResponse>
  >([]);

  const listDeleteUpdate = () => {
    const cp = data && data.filter((item) => item._id !== updateList.itemId);
    if (cp) setExperiences(cp);
    showUpdateList({ itemId: "", state: false, type: "idle" });
    showToast({
      message: "experience Deleted successfully",
      position: "bottomRight",
      state: true,
      type: "success",
    });
  };

  return (
    <>
      <div className="w-full">
        <header className="w-full flex">
          <caption className="p-5  text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
            Experiences
            <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
              Here, you can declare you experiences from any company,freelancer
              works with times and title of your work on there
            </p>
          </caption>
        </header>

        <div className="px-5 w-full">
          <PortalWithState>
            {({ openPortal, closePortal, isOpen }) => (
              <>
                <span
                  className="spanLink flex items-center w-38 gap-x-1"
                  onClick={openPortal}
                >
                  <svg
                    className="w-4 h-4 transition duration-75  "
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="#2563EB"
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
                        d="M7 12L12 12M12 12L17 12M12 12V7M12 12L12 17"
                        stroke="#2563EB"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />{" "}
                    </g>
                  </svg>
                  add new experiences
                </span>
                {isOpen && (
                  <AddPortfolioModal
                    onClose={closePortal}
                    onClickOutside={closePortal}
                  />
                )}
              </>
            )}
          </PortalWithState>
        </div>

        <div className="mx-auto max-w-2xl py-4 px-4 sm:py-4 sm:px-6 lg:max-w-7xl mt-2 ">
          <div className="flex w-full items-start">
            <ExperiencesItems experiences={experiences} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Experiences;
