import { Navigate, Outlet } from "react-router-dom"
import "./Private.css"
import validateAdminToken from "../../helpers/validateAdminToken"

const Private = () => {
  let adminToken = localStorage.getItem("admin-token");

  if (!adminToken || !validateAdminToken(adminToken)) {
    localStorage.removeItem("admin-token");
    return <Navigate to="/adminlogin" />;
  }

  return <Outlet />;
}

export default Private
