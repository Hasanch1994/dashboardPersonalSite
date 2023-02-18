import { FC, memo } from "react";
import PortfolioImageListItem from "./portfolioImageListItem";

interface Props {
  lists: File[];
}

const PortfolioImageLists: FC<Props> = memo(({ lists }) => {
  return (
    <div className="w-full grid grid-cols-3 gap-2">
      {lists &&
        lists.map((item, index) => (
          <PortfolioImageListItem
            key={self.crypto.randomUUID()}
            file={item}
            alt={`item${index}`}
          />
        ))}
    </div>
  );
});

export default PortfolioImageLists;
