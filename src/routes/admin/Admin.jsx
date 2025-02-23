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


// the only work whihc has last, is uploading the courses videos
// i cant work on it right now bcz of the backend not aloowing me to 