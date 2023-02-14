import { useQuery } from "react-query";
import { fetchPortfoliosApi } from "../../../libs/services/endpoints/actions";
import PortfolioItem from "./portfolioItem";

const Portfolios = () => {
  const { data } = useQuery("portfolios", fetchPortfoliosApi, {});

  return (
    <>
      <div className="w-full">
        <div className="mx-auto max-w-2xl py-4 sm:py-4 sm:px-6 lg:max-w-7xl ">
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
            {data &&
              data.map((item) => (
                <PortfolioItem
                  key={self.crypto.randomUUID()}
                  data={item}
                  onClick={() => {}}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Portfolios;
