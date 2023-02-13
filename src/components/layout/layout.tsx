import { Outlet, useLocation } from "react-router-dom";
import SideBar from "./sidebar/sidebar";
import { FC, useContext, useRef, useState } from "react";
import { MainContext, mainContextType } from "../../contexts/mainContext";
import { PortalWithState } from "react-portal";
import ToastMessage from "../dialogs/toastify/toastMessage";
import { CSSTransition } from "react-transition-group";
import "./style.css";
const Layout: FC = () => {
  const location = useLocation();
  const [pathName] = useState<string>(location.pathname);
  const { toast } = useContext(MainContext) as mainContextType;
  const nodeRef = useRef(null);
  return (
    <div className="w-full h-full flex flex-col sm:flex-row">
      {pathName !== "/login" && <SideBar />}
      <main className={`w-full flex h-full sm:ml-64`}>
        <Outlet />
      </main>

      <PortalWithState closeOnEsc>
        {({ closePortal }) => (
          <>
            <CSSTransition
              nodeRef={nodeRef}
              in={toast.state}
              timeout={300}
              classNames="alert"
              onExit={closePortal}
              unmountOnExit
            >
              {toast.type && toast.message && (
                <ToastMessage
                  nodeRef={nodeRef}
                  type={toast.type}
                  message={toast.message}
                  position={toast.position}
                  key={self.crypto.randomUUID()}
                />
              )}
            </CSSTransition>
          </>
        )}
      </PortalWithState>
    </div>
  );
};

export default Layout;
