import "./Admin.css"
// import { useState, useEffect } from 'react'
import { Outlet } from "react-router-dom"
// import instance from '../../api/axios'
import AdminNav from "../../components/adminNav/AdminNav"

const Admin = () => {
  // let adminToken = localStorage.getItem("admin-token")

  // const [users, setUsers] = useState({})
  // useEffect(() => {
  //   instance(`/admin/users?token=${adminToken}`)
  //     .then(response => setUsers(response))
  // }, [adminToken])
  // console.log(users)


  return (
    <div className="admin">
      <div className="container flex">
          <AdminNav />
          <Outlet/>
      </div>
    </div>
  )
}

export default Admin


