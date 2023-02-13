import React, { ReactNode, createContext, useState } from "react";

export interface toastType {
  state: boolean;
  type?: "error" | "success" | "info";
  message?: string;
  position: "bottomRight" | "topRight";
}

export type mainContextType = {
  toast: toastType;
  showToast: (data: toastType) => void;
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

  return (
    <MainContext.Provider value={{ toast, showToast }}>
      {children}
    </MainContext.Provider>
  );
};

export default MainProvider;
