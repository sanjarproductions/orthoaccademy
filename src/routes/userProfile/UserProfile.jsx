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
    // const [fullNameEdit, setFullNameEdit] = useState(false)
    const [editMode, setEditMode] = useState(null)

    useEffect(() => {
        instance(`/users/profile?token=${token}`)
            .then(response => setUserProfileData(response.data))
            .catch(err => console.log(err))
    }, [token])

    function updateProfile() {
        instance.patch(`/users/profile/update?token=${token}`, {
            // email: "new@new.com",
            full_name: "John Doe",
            // new_password: "new_password",
            // phone: "+998901234567",
            // ranks: "Magister",
            // region: "Tashkent",
            // username: "newuser"
        })
            .then(response => console.log(response.data))
            .catch(err => console.log(err))
    }

    const fields = [
        { label: "Name", key: "full_name" },
        { label: "Username", key: "username" },
        { label: "Phone", key: "phone" },
        { label: "Email", key: "email" },
        { label: "Rank", key: "rank" },
        { label: "Region", key: "region" }
    ];

    return (
        <div>
            <div className="container">
                {/* <button onClick={() => changeData()}>Click</button> */}
                <div className="user-data__wrapper">

                    <div className="profile-sidebar">
                        <Link to={"/profile"}><MdAccountCircle /> Akkaunt</Link>
                        <Link to={"/profile/courses"}><IoBookSharp /> Kurslar</Link>
                    </div>

                    <div className="main-user__data">

                    {
                        fields.map(i => 
                            <>
                                <div>
                                    <label>{i.label}</label>
                                    <p>{i.key}</p>
                                </div>
                            </>
                        )
                    }

                        {/* <div className="wrapper">
                            <div className="data">
                                <label className="data-title">Name:</label>
                                <div className="flex data-box">
                                    <p contentEditable={fullNameEdit} style={fullNameEdit ? { border: "2px solid #0077ff", borderRadius: 10 + "px" } : { borderBottom: "1px solid #000000b7" }}> {userProfileData?.full_name ? userProfileData?.full_name : "No Data"} </p>
                                    {fullNameEdit ? <MdDone onClick={() => setFullNameEdit(!fullNameEdit)} /> : <FaRegEdit className="edit-btn" onClick={() => setFullNameEdit(!fullNameEdit)} />}
                                </div>
                            </div>

                            <div className="data">
                                <label>Username:</label>
                                <p>{userProfileData?.username}</p>
                            </div>

                            <div className="data">
                                <label>Phone:</label>
                                <p>{userProfileData?.phone ? userProfileData?.phone : "No Data"}</p>
                            </div>

                            <div className="data">
                                <label>Email:</label>
                                <p>{userProfileData?.email}</p>
                            </div>

                            <div className="data">
                                <label>Rank:</label>
                                <p>{userProfileData?.rank ? userProfileData?.rank : "No Data"}</p>
                            </div>

                            <div className="data">
                                <label>Region:</label>
                                <p>{userProfileData?.region ? userProfileData?.region : "No Data "}</p>
                            </div>

                        </div> */}


                        <div>
                            <img className="profile-photo"
                                src={userProfileData?.profile_pic === "default_profile_pic.jpg"
                                    ? RandomPersonPhoto
                                    : userProfileData?.profile_pic}
                                alt="User Profile" />
                            <FaRegEdit />
                        </div>
                    </div>



                </div>
            </div>
        </div>
    )
}

export default UserProfile

