import "./UserCourses.css"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import instance from "../../api/axios"
import { FaPlay } from "react-icons/fa";

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
            <div className="container user-courses">
                <div className="flex">

                    {/* <div className="profile-sidebar">
                        <Link to={"/profile"}><MdAccountCircle /> Akkaunt</Link>
                        <Link to={"/profile/courses"}><IoBookSharp /> Kurslar</Link>
                    </div> */}

                    <div className="user-courses__main">
                        
                        {userCourse?.data?.length > 0 ? <h1>Siz harid qilgan kurslar:</h1> : <h1>Siz harid qilgan kurs:</h1>}

                        <div className="user-courses__grid">
                            {
                                userCourse?.data?.map(({ course }) =>
                                    <div className="course__card" key={course.id}>
                                        <img src={course.image_url} alt="" />
                                        <h4>{course.title}</h4>
                                        <p>{course.short_description.slice(0, 50) + "..."}</p>
                                        <Link to={`/dashboard/${course.id}`} className=""><FaPlay /> Boshlash</Link>
                                    </div>
                                )
                            }
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default UserCourses
