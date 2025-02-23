import { useState, useEffect } from 'react'
import instance from '../../../api/axios'
import { AiOutlineLoading } from "react-icons/ai";
import { FaUser } from "react-icons/fa6";

const Users = () => {
    let adminToken = localStorage.getItem("admin-token")
    const [isLoading, setIsLoading] = useState(true);
    const [users, setUsers] = useState([])

    useEffect(() => {
        instance(`/admin/users?token=${adminToken}`)
            .then(response => {
                setUsers(response.data)
                setIsLoading(false);
            })
    }, [adminToken])
    // console.log(users)

    return (
        <>
            {
                isLoading ?
                    <div className="loading-wrapper">
                        <AiOutlineLoading className="loading-icon-big" />
                    </div> :
                    <div className='admin-users-wrapper'>
                        {
                            users?.map((user, id) =>
                                <div key={id} className='user-card'>
                                    <FaUser className='user-icon' />
                                    <p className='user-info'>Ism: {user.full_name ? user.full_name : <p className='no-data-message'>No region</p>}</p>
                                    <p>username: {user.username}</p>
                                    <p className='user-info'>Telefon: {user.phone ? user.phone : <p className='no-data-message'>No region</p>}</p>
                                    <p className='user-info'>Rank: {user.ranks ? user.ranks : <p className='no-data-message'>No region</p>}</p>
                                    <p className='user-info'>Region: {user.region ? user.region : <p className='no-data-message'>No region</p>}</p>
                                    <p>Email: {user.email}</p>
                                </div>
                            )
                        }
                    </div>
            }
        </>
    )
}

export default Users
