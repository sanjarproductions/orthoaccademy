import "./userProfile.css"
import { Link } from "react-router-dom";
import { useEffect, useState } from "react"
import RandomPersonPhoto from "../../assets/img.jpeg"
import instance from "../../api/axios"

import { IoBookSharp } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { MdDone } from "react-icons/md";

const UserProfile = () => {
    let token = localStorage.getItem("user-token")
    const [userProfileData, setUserProfileData] = useState({})
    const [editMode, setEditMode] = useState(false)

    useEffect(() => {
        instance(`/users/profile?token=${token}`)
            .then(response => setUserProfileData(response.data))
            .catch(err => console.log(err))
    }, [token])

    function updateProfile() {
        instance.patch(`/users/profile/update?token=${token}`, {
            full_name: "John Doe",
            // email: "new@new.com",
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
                <div className="user-data__wrapper">

                    <div className="profile-sidebar">
                        <Link to={"/profile"}><MdAccountCircle /> Akkaunt</Link>
                        <Link to={"/profile/courses"}><IoBookSharp /> Kurslar</Link>
                    </div>

                    <div className="main-content">
                        <div className="user-wrapper">
                            {
                                fields.map(i =>
                                    <>
                                        <div className="user-data">
                                            <label>{i.label}:</label>
                                            <div className="box">
                                                {
                                                    editMode ? (
                                                        <input type="text" />
                                                    ) : (<p>{userProfileData[i.key] || "No Data"}</p>)
                                                }
                                                {
                                                    editMode ? (
                                                        <MdDone onClick={() => updateProfile()} />
                                                    ) : (<FaRegEdit className="edit-btn" onClick={() => setEditMode(!editMode)} />)
                                                }
                                            </div>
                                        </div>
                                    </>
                                )
                            }
                        </div>

                        <div className="profile-photo__wrapper">
                            <img className="profile-photo"
                                src={userProfileData?.profile_pic === "default_profile_pic.jpg"
                                    ? RandomPersonPhoto
                                    : userProfileData?.profile_pic}
                                alt="User Profile" />
                            {/* <FaRegEdit /> */}
                        </div>
                    </div>



                </div>
            </div>
        </div>
    )
}

export default UserProfile

