import "./Admin.css"
import { useState, useEffect } from 'react'
import instance from '../../api/axios'
import AdminNav from "../../components/adminNav/AdminNav"

const Admin = () => {
  let adminToken = localStorage.getItem("admin-token")

  const [users, setUsers] = useState({})
  useEffect(() => {
    instance(`/admin/users?token=${adminToken}`)
      .then(response => setUsers(response))
  }, [adminToken])
  console.log(users)


  return (
    <div>
      <div className="container">
        <div className="flex">
          <AdminNav />
          <div className="admin-main">
            <div className="users-grid">
              {
                // users?.data?.map((user, id) =>
                //   <div className="user" key={id}>
                //     <div className="flex">
                //       <p>Ism: {user.full_name ? user.full_name : "Yo'q"}</p>
                //       <p>Telefon: {user.phone ? user.phone : "Yo'q"}</p>
                //       <p>Daraja: {user.ranks ? user.ranks : "Yo'q"}</p>
                //       {/*  */}
                //       <p>Id: {user.id}</p>
                //       <p>username: {user.username}</p>
                //       <p>Email: {user.email}</p>
                //     </div>
                //   </div>
                // )
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admin
