import { useQuery } from "react-query";
import { fetchPortfoliosApi } from "../../../libs/services/endpoints/actions";
import { useContext, useEffect, useState } from "react";
import { MainContext, mainContextType } from "../../../contexts/mainContext";
import { portfolioTypeResponse } from "../../../types/respTypes";
import PortfolioItems from "./portfolioItems";

const Portfolios = () => {
  const { data } = useQuery("portfolios", fetchPortfoliosApi, {
    staleTime: 900000,
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
        <div className="mx-auto max-w-2xl py-4 px-4 sm:py-4 sm:px-6 lg:max-w-7xl ">
          <header className="w-full flex">
            <caption className=" text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
              Portfolios
              <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                Here, you can declare your portfolio with images, title,date and
                description for every portfolio. And you can add,delete them
              </p>
            </caption>
          </header>

          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            <PortfolioItems portfolios={portfolios} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Portfolios;
