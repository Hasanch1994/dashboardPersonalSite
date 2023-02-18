import React, { ReactNode, createContext, useState } from "react";
import { portfolioTypeResponse } from "../types/respTypes";

export interface toastType {
  state: boolean;
  type?: "error" | "success" | "info";
  message?: string;
  position: "bottomRight" | "topRight";
}

export interface updatePortfolioList {
  state: boolean;
  itemId: string;
}

export interface deletePortfolioType {
  state: boolean;
  itemId: string;
}

export interface showPortfolioItem {
  item?: portfolioTypeResponse;
  portfolioItemState: boolean;
}

export interface updatePortfolioList extends deletePortfolioType {}

export type mainContextType = {
  toast: toastType;
  showToast: (data: toastType) => void;
  deletePortfolio: deletePortfolioType;
  showDeletePortfolio: (data: deletePortfolioType) => void;
  updatePortfolio: updatePortfolioList;
  showUpdatePortfolioList: (data: updatePortfolioList) => void;
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

  const [deletePortfolio, setShowDeletePortfolio] =
    useState<deletePortfolioType>({
      itemId: "",
      state: false,
    });

  const showDeletePortfolio = (data: deletePortfolioType) => {
    setShowDeletePortfolio(data);
  };

  const [updatePortfolio, setShowUpdatePortfolio] =
    useState<updatePortfolioList>({ itemId: "", state: false });

  const showUpdatePortfolioList = (data: updatePortfolioList) => {
    setShowUpdatePortfolio(data);
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
        deletePortfolio,
        showDeletePortfolio,
        updatePortfolio,
        showUpdatePortfolioList,
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
