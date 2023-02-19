import React, { ReactNode, createContext, useState } from "react";
import { portfolioTypeResponse } from "../types/respTypes";

export interface toastType {
  state: boolean;
  type?: "error" | "success" | "info";
  message?: string;
  position: "bottomRight" | "topRight";
}

export interface deleteMoreOptionType {
  state: boolean;
  itemId: string;
  type: "portfolio" | "experience" | "idle";
}

export interface updateList extends deleteMoreOptionType {}

export interface showPortfolioItem {
  item?: portfolioTypeResponse;
  portfolioItemState: boolean;
}

export interface updatePortfolioList
  extends Omit<deleteMoreOptionType, "type"> {}

export type mainContextType = {
  toast: toastType;
  showToast: (data: toastType) => void;
  moreOptionDelete: deleteMoreOptionType;
  showMoreOptionDelete: (data: deleteMoreOptionType) => void;
  updateList: updateList;
  showUpdateList: (data: updateList) => void;
  portfolioItem: showPortfolioItem;
  showPortfolioItem: (data: showPortfolioItem) => void;
  addPortfolio: boolean;
  showAddPortfolio: (state: boolean) => void;
};

export const MainContext = createContext<mainContextType | null>(null);

const MainProvider: React.FC<ReactNode | any> = ({ children }) => {
  const [toast, setToast] = useState<toastType>({
    state: false,
    message: "",
    type: "success",
    position: "bottomRight",
  });
  const showToast = (data: toastType) => {
    setToast(data);
  };

  const [moreOptionDelete, setShowMoreOptionDelete] =
    useState<deleteMoreOptionType>({
      itemId: "",
      state: false,
      type: "idle",
    });

  const showMoreOptionDelete = (data: deleteMoreOptionType) => {
    setShowMoreOptionDelete(data);
  };

  const [updateList, setUpdateList] = useState<updateList>({
    itemId: "",
    state: false,
    type: "idle",
  });

  const showUpdateList = (data: updateList) => {
    setUpdateList(data);
  };

  const [portfolioItem, setShowPortfolioItem] = useState<showPortfolioItem>({
    item: undefined,
    portfolioItemState: false,
  });

  const showPortfolioItem = (data: showPortfolioItem) => {
    setShowPortfolioItem(data);
  };

  const [addPortfolio, setAddPortfolio] = useState<boolean>(false);

  const showAddPortfolio = (state: boolean) => {
    setAddPortfolio(state);
  };

  return (
    <MainContext.Provider
      value={{
        toast,
        showToast,
        moreOptionDelete,
        showMoreOptionDelete,
        updateList,
        showUpdateList,
        portfolioItem,
        showPortfolioItem,
        addPortfolio,
        showAddPortfolio,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export default MainProvider;
