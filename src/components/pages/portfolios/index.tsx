import { useQuery } from "react-query";
import { fetchPortfoliosApi } from "../../../libs/services/endpoints/actions";
import { useContext, useEffect, useState } from "react";
import { MainContext, mainContextType } from "../../../contexts/mainContext";
import { portfolioTypeResponse } from "../../../types/respTypes";
import PortfolioItems from "./portfolioItems";
import { PortalWithState } from "react-portal";
import AddNewSkillModal from "../../dialogs/skillsModal/addNewSkillModal";
import AddPortfolioModal from "../../dialogs/portfolioModal/addPortfolioModal";

const Portfolios = () => {
  const { data } = useQuery("portfolios", fetchPortfoliosApi, {
    onSuccess: (data) => {
      setPortfolios(data);
    },
  });
  const [portfolios, setPortfolios] = useState<Array<portfolioTypeResponse>>(
    []
  );
  const { updatePortfolio, showUpdatePortfolioList, showToast } = useContext(
    MainContext
  ) as mainContextType;

  useEffect(() => {
    if (updatePortfolio.itemId) listDeleteUpdate();
  }, [updatePortfolio.state]);

  const listDeleteUpdate = () => {
    const cp =
      data && data.filter((item) => item._id !== updatePortfolio.itemId);
    if (cp) setPortfolios(cp);
    showUpdatePortfolioList({ itemId: "", state: false });
    showToast({
      message: "portfolio Deleted successfully",
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
            Portfolios
            <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
              Here, you can declare your portfolio with images, title,date and
              description for every portfolio. And you can add,delete them
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
                  add new portfolio
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

        <div className="mx-auto max-w-2xl py-4 px-4 sm:py-4 sm:px-6 lg:max-w-7xl ">
          <div className=" grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            <PortfolioItems portfolios={portfolios} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Portfolios;
