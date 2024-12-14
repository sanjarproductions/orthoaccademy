// import React from 'react'
import { useEffect, useState } from "react"
import "./Course.css"
import { useParams } from "react-router-dom"
import instance from "../../api/axios"
import Image from "/car.jpeg"
import { Link } from "react-router-dom"
const Courses = () => {
  const [courseData, setCourseData] = useState([])
  let location = useParams()
  useEffect(() => {
    instance(`courses/${location.id}`)
      .then(response => setCourseData(response.data))
      .catch(err => console.log(err))
  }, [location.id])

  console.log(courseData)
  return (
    <>
      <div className="container">
        <div className="flex">
          <img src={Image} alt="" width={100 + "%"} height={100 + "%"} className="course-img" />
          <div className="course-text">
            <h3>{courseData.title}</h3>
            <p>{courseData.description}</p>
            <div className="flex">
              <strong>$ {courseData.price}</strong>
              <p className="lessons-count">{courseData.video_count} video</p>
            </div>
            <Link to={"/"} className="enroll-btn">Boshlash</Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Courses
