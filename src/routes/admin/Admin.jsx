import "./Admin.css"
import { Outlet } from "react-router-dom"
import AdminNav from "../../components/adminNav/AdminNav"

const Admin = () => {

  return (
    <div className="admin">
      <div className="container flex">
        <AdminNav />
        <Outlet />
      </div>
    </div>
  )
}

export default Admin


