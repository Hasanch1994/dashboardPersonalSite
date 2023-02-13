import { useLocation, Navigate, Outlet } from "react-router-dom";

const RequireAuth = () => {
  const location = useLocation();

  const user: any = JSON.parse(localStorage.getItem("user") as string);

  return user && user._accessToken && user.operatorInfo.opId ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
