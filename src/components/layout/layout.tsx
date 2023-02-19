import { Outlet, useLocation } from "react-router-dom";
import { FC, useContext } from "react";
import { MainContext, mainContextType } from "../../contexts/mainContext";
import { Portal } from "react-portal";

import SideBar from "./sidebar/sidebar";
import ToastMessage from "../dialogs/toastify/toastMessage";
import DeletePortfolioModal from "../dialogs/portfolioModal/deletePortfolioModal";
import PortfolioFullItem from "../dialogs/portfolioModal/portfolioFullItem";
import "./style.css";
import { portalNode } from "../helper/nodes";

const Layout: FC = () => {
  const location = useLocation();
  const { toast, deletePortfolio, portfolioItem, showDeletePortfolio } =
    useContext(MainContext) as mainContextType;

  return (
    <div className="w-full h-full flex flex-col sm:flex-row">
      {location.pathname !== "/login" && <SideBar />}
      <main className={`w-full flex h-full sm:ml-64`}>
        <Outlet />
      </main>

      <Portal node={portalNode}>
        {toast.state && (
          <ToastMessage
            type={toast.type ?? "success"}
            message={toast.message ?? ""}
            position={toast.position}
          />
        )}
      </Portal>

      <Portal node={portalNode}>
        {deletePortfolio.state && (
          <DeletePortfolioModal
            onClickOutside={() =>
              showDeletePortfolio({ itemId: "", state: false })
            }
            id={deletePortfolio.itemId}
          />
        )}
      </Portal>

      {portfolioItem.portfolioItemState && (
        <Portal node={portalNode}>
          <PortfolioFullItem />
        </Portal>
      )}
    </div>
  );
};

export default Layout;
