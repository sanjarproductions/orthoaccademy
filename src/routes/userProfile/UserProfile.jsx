// import React from 'react'
import "./userProfile.css"
import instance from "../../api/axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { MdAccountCircle } from "react-icons/md";

const UserProfile = () => {
    let token = localStorage.getItem("user-token")
    const [userProfileData, setUserProfileData] = useState({})
    useEffect(() => {
        instance(`/users/profile?token=${token}`)
            .then(response => setUserProfileData(response.data))
            .catch(err => console.log(err))
    }, [token])
    console.log(userProfileData)

    return (
        <div>
            <div className="container">
                <div className="user-data__wrapper">

                    <div className="">
                        <Link to={"/"}></Link>
                        <p>Kurslarim</p>
                    </div>

                    <div className="user-profile__data">
                        <p>Full Name: {userProfileData?.full_name ? userProfileData?.full_name : "No Name"}</p>
                        <p>username: {userProfileData?.username}</p>
                        <br />
                        <p>Phone: {userProfileData?.phone ? userProfileData?.phone : "No Phone Number given"}</p>
                        <p>Email: {userProfileData?.email}</p>
                        <br />
                        <p>Date: {userProfileData?.registred_at}</p>
                        <p>Rank: {userProfileData?.rank ? userProfileData?.rank : "No Data"}</p>
                        <p>Region: {userProfileData?.region ? userProfileData?.region : "No Data "}</p>
                    </div>


                    <div className="user-profile__image">
                        <MdAccountCircle className='user-profile__icon' />
                        <img src={userProfileData?.profile_pic} alt="" />
                    </div>


                </div>
            </div>
        </div>
    )
}

export default UserProfile


// full_name
// : 
// null

// id
// : 
// 3

// is_active
// : 
// true

// is_email_verified
// : 
// false

// phone
// : 
// null

// profile_pic
// : 
// "default_profile_pic.jpg"

// ranks
// : 
// null

// region
// : 
// null

// registred_at
// : 
// "2024-12-22T08:12:29.679674"

// username
// : 
// "test"