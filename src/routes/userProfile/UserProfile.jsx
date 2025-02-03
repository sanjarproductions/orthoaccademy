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
    const [editMode, setEditMode] = useState({})
    const [inputValue, setInputValue] = useState({})

    useEffect(() => {
        instance(`/users/profile?token=${token}`)
            .then(response => setUserProfileData(response.data))
            .catch(err => console.log(err))
    }, [token])

    function updateProfile(fieldKey) {
        instance.patch(`/users/profile/update?token=${token}`, { [fieldKey]: inputValue[fieldKey] })
            .then(response => 
                console.log(response.data),
                setUserProfileData({ ...userProfileData, [fieldKey]: inputValue[fieldKey] }),
                setEditMode({ ...editMode, [fieldKey]: false }) // Close only the edited field
            )
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
                                fields.map(({ label, key }) =>
                                    <>
                                        <div className="user-data">
                                            <label>{label}:</label>
                                            <div className="box">
                                                {
                                                    editMode[key] ? (
                                                        <input type="text" value={ inputValue[key] || userProfileData[key] || "Enter"} onChange={(e) => setInputValue({ ...inputValue, [key]: e.target.value })} />
                                                    ) : (<p>{userProfileData[key] || "No Data"}</p>)
                                                }
                                                {
                                                    editMode[key] ? (
                                                        <MdDone onClick={() => updateProfile(key)} />
                                                    ) : (<FaRegEdit className="edit-btn" onClick={() => setEditMode((prev) => ({ ...prev, [key]: !prev[key] }))} />)
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

