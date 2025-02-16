import { Navigate, Outlet } from "react-router-dom"
import "./Private.css"
// import validateAdminToken from "../../helpers/validateAdminToken"

const Private = () => {
  let adminToken = localStorage.getItem("admin-token");

  return adminToken ? (
   <Outlet/>
  ) : <Navigate to={"/adminlogin"}/>
}

export default Private
