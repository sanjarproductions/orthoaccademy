import "./userProfile.css"
import { Link } from "react-router-dom";
import { useEffect, useState } from "react"
import { toast } from 'react-toastify';
import { IoBookSharp } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { MdDone } from "react-icons/md";
import instance from "../../api/axios"

const UserProfile = () => {
    let token = localStorage.getItem("user-token")
    const [userProfileData, setUserProfileData] = useState({})
    const [editMode, setEditMode] = useState({})
    const [inputValue, setInputValue] = useState({})
    const [profilePic, setProfilePic] = useState("")

    useEffect(() => {
        instance(`/users/profile?token=${token}`)
            .then(response => setUserProfileData(response.data))
            .catch(err => console.log(err))
    }, [token])

    useEffect(() => {
        fetch(`https://ui-avatars.com/api/?name=${userProfileData.full_name}`)
            .then(response => response.url)
            .then(data => setProfilePic(data))
    }, [userProfileData.full_name])

    function updateProfile(fieldKey) {
        instance.patch(`/users/profile/update?token=${token}`, { [fieldKey]: inputValue[fieldKey] })
            .then(response => {
                console.log(response.data),
                    setUserProfileData(prev => ({ ...prev, [fieldKey]: inputValue[fieldKey] })),
                    setEditMode(prev => ({ ...prev, [fieldKey]: false })),
                    toast.success("Updated!")
            })
            .catch(err => {
                console.log(err);
                toast.error("Try again later")
            });
    }
    console.log(userProfileData)

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
                                fields.map(({ label, key, }) =>
                                    <div className="user-data" key={key}>
                                        <label>{label}:</label>
                                        <div className="box">
                                            {editMode[key] ? (
                                                <input type="text" value={inputValue[key] ?? ""} onChange={(e) => setInputValue(prev => ({ ...prev, [key]: e.target.value }))} />
                                            ) : (
                                                <p>{userProfileData[key] || "No Data"}</p>
                                            )}

                                            {
                                                editMode[key] ? (
                                                    <MdDone onClick={() => updateProfile(key)} />
                                                ) : (<FaRegEdit className="edit-btn" onClick={() => setEditMode(prev => ({ ...prev, [key]: !prev[key] }))} />)
                                            }
                                        </div>
                                    </div>
                                )
                            }
                        </div>

                        <div className="profile-photo__wrapper">
                            <img className="profile-photo"
                                src={userProfileData?.profile_pic && userProfileData.profile_pic !== "default_profile_pic.jpg" ? userProfileData.profile_pic : profilePic} alt="User Profile" />
                        </div>
                    </div>



                </div>
            </div>
        </div>
    )
}

export default UserProfile

