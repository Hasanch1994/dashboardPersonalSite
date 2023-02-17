import { FC, memo } from "react";
import { portfolioTypeResponse } from "../../../types/respTypes";
import PortfolioItem from "./portfolioItem";

interface portfolioItems {
  portfolios: Array<portfolioTypeResponse> | undefined;
}

const PortfolioItems: FC<portfolioItems> = memo(({ portfolios }) => {
  return (
    <>
      {portfolios &&
        portfolios.map((item) => (
          <PortfolioItem
            key={self.crypto.randomUUID()}
            data={item}
            onClick={() => {}}
          />
        ))}
    </>
  );
});

export default PortfolioItems;
