// import React from 'react'
import "./userProfile.css"
import instance from "../../api/axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import RandomPersonPhoto from "../../assets/img.jpeg"

import { IoBookSharp } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { MdDone } from "react-icons/md";

const UserProfile = () => {

    let token = localStorage.getItem("user-token")
    const [userProfileData, setUserProfileData] = useState({})
    const [fullNameEdit, setFullNameEdit] = useState(false)

    useEffect(() => {
        instance(`/users/profile?token=${token}`)
            .then(response => setUserProfileData(response.data))
            .catch(err => console.log(err))
    }, [token])

    // /users/profile/update (patch)
    // /users/profile/update (put)

    return (
        <div>
            <div className="container">
                <div className="user-data__wrapper">

                    <div className="profile-sidebar">
                        <Link to={"/profile"}><MdAccountCircle /> Akkaunt</Link>
                        <Link to={"/profile/courses"}><IoBookSharp /> Kurslar</Link>
                    </div>

                    <div className="main-user__data">

                        <div className="wrapper">

                            <div className="data">
                                <p className="data-title">Name:</p>

                                <div className="flex data-box">
                                    <p contentEditable={fullNameEdit} style={fullNameEdit ? { border: "2px solid #0077ff", borderRadius: 10 + "px" } : { borderBottom: "1px solid #000000b7" }}>{userProfileData?.full_name ? userProfileData?.full_name : "No Data"}</p>

                                    {fullNameEdit ?  <MdDone onClick={() => setFullNameEdit(!fullNameEdit)}  />  : <FaRegEdit className="edit-btn" onClick={() => setFullNameEdit(!fullNameEdit)} />}

                                </div>

                            </div>

                            <div className="data">
                                <p>Username:</p>
                                <p>{userProfileData?.username}</p>
                            </div>

                            <div className="data">
                                <p>Phone:</p>
                                <p>{userProfileData?.phone ? userProfileData?.phone : "No Data"}</p>
                            </div>

                            <div className="data">
                                <p>Email:</p>
                                <p>{userProfileData?.email}</p>
                            </div>

                            <div className="data">
                                <p>Rank:</p>
                                <p>{userProfileData?.rank ? userProfileData?.rank : "No Data"}</p>
                            </div>

                            <div className="data">
                                <p>Region:</p>
                                <p>{userProfileData?.region ? userProfileData?.region : "No Data "}</p>
                            </div>

                        </div>


                        <div className="">
                            <img className="profile-photo" src={userProfileData?.profile_pic == "default_profile_pic.jpg" ? RandomPersonPhoto : userProfileData?.profile_pic == "default_profile_pic.jpg"} alt="" />
                            <FaRegEdit onClick={() => setFullNameEdit(!false)} />

                        </div>

                    </div>



                </div>
            </div>
        </div>
    )
}

export default UserProfile

