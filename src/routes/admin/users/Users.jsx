import { useState, useEffect } from 'react'
import instance from '../../../api/axios'

const Users = () => {
    let adminToken = localStorage.getItem("admin-token")

    const [users, setUsers] = useState({})
    useEffect(() => {
        instance(`/admin/users?token=${adminToken}`)
            .then(response => setUsers(response))
    }, [adminToken])
    console.log(users)

    return (
        <div>
            {
                
            }
        </div>
    )
}

export default Users
