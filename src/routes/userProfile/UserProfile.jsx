// import React from 'react'
import "./userProfile.css"
import instance from "../../api/axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import RandomPersonPhoto from "../../assets/img.jpeg"

import { IoBookSharp } from "react-icons/io5";
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

                    <div className="profile-sidebar">
                        <Link to={"/"}><MdAccountCircle /> Akkaunt</Link>
                        <Link to={"/"}><IoBookSharp /> Kurslar</Link>
                        {/* <Link to={"/"}><IoBookSharp /> Kurslar</Link> */}
                        {/* <Link to={"/"}><IoBookSharp /> Kurslar</Link> */}
                        {/* <Link to={"/"}><IoBookSharp /> Kurslar</Link> */}
                        {/* <Link to={"/"}><IoBookSharp /> Kurslar</Link> */}
                        {/* <Link to={"/"}><IoBookSharp /> Kurslar</Link> */}
                    </div>

                    <div className="main-user__data">
                        <div className="user-profile__data">

                            <div className="smt">
                                <p>Name:</p>
                                <p>{userProfileData?.full_name ? userProfileData?.full_name : "No Name"}</p>
                            </div>

                            <div className="smt">
                                <p>Username:</p>
                                <p>{userProfileData?.username}</p>
                            </div>

                            <div className="smt">
                                <p>Phone:</p>
                                <p>{userProfileData?.phone ? userProfileData?.phone : "No Phone Number given"}</p>
                            </div>

                            <div className="smt">
                                <p>Email:</p>
                                <p>{userProfileData?.email}</p>
                            </div>

                            <div className="smt">
                                <p>Date:</p>
                                <p>{userProfileData?.registred_at}</p>
                            </div>

                            <div className="smt">
                                <p>Rank:</p>
                                <p>{userProfileData?.rank ? userProfileData?.rank : "No Data"}</p>
                            </div>

                            <div className="smt">
                                <p>Region:</p>
                                <p>{userProfileData?.region ? userProfileData?.region : "No Data "}</p>
                            </div>

                        </div>


                        <div className="user-profile__image">
                            <img className="profile-photo" src={userProfileData?.profile_pic == "default_profile_pic.jpg" ? RandomPersonPhoto : userProfileData?.profile_pic == "default_profile_pic.jpg"} alt="" />
                        </div>

                    </div>



                </div>
            </div>
        </div>
    )
}

export default UserProfile

