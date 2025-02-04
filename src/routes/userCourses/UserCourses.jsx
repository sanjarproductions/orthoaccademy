// import React from 'react'
import { useEffect, useState } from "react"
import instance from "../../api/axios"
import { Link } from "react-router-dom"

import { IoBookSharp } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";

const UserCourses = () => {
    let token = localStorage.getItem("user-token")
    const [userCourse, setUserCourse] = useState({})
    useEffect(() => {
        instance(`/dashboards/?token=${token}`)
            .then(response => setUserCourse(response))
    }, [token])
    console.log(userCourse)
    return (
        <>
            <div className="container">
                <div className="profile-sidebar">
                    <Link to={"/profile"}><MdAccountCircle /> Akkaunt</Link>
                    <Link to={"/profile/courses"}><IoBookSharp /> Kurslar</Link>
                </div>
                <div>
                    <h1>Siz harid Qilgan kurslar</h1>
                    {
                        userCourse?.data?.map(({course}) =>
                            <>
                                <p>{course.title}</p>
                            </>
                        )
                    }
                </div>

            </div>
        </>
    )
}

export default UserCourses
