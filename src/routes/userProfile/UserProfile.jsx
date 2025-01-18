// import React from 'react'
import "./userProfile.css"
import instance from "../../api/axios"
import { useEffect } from "react"

const UserProfile = () => {

    useEffect(() => {
        instance("users")
            .then(response => console.log(response.data))
            .catch(err => console.log(err))
    }, [])

    return (
        <div>

        </div>
    )
}

export default UserProfile
