import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { AiOutlineLoading } from "react-icons/ai";
import instance from "../../api/axios"
import "./Course.css"

const Courses = () => {
  const [courseData, setCourseData] = useState([])
  const [isLoading, setIsLoading] = useState(true);

  let location = useParams()

  useEffect(() => {
    instance(`courses/${location.id}`)
      .then(response => {
        setCourseData(response.data)
        setIsLoading(false)
      })
      .catch(err => console.log(err))
  }, [location.id])

  return (
    <>
      {
        isLoading ?
          <div className="loading-wrapper">
            <AiOutlineLoading className="loading-icon-big" />
          </div> :
          <div className="view-course container">
            <div className="flex">
              <img src={courseData.image_url} alt="" className="course-img" />
              <div className="course-text">
                <h3>{courseData.title}</h3>
                <p>{courseData.description}</p>
                <div className="">
                  <p className="lessons-count">{courseData.video_count} video</p>
                  <strong className="course-view__price">$ {courseData.price}</strong>
                </div>
                <Link to={localStorage.getItem("user-token") ? `/dashboard/${courseData.id}` : "/signup"} className="enroll-btn">Boshlash</Link>
              </div>
            </div>
          </div>}
    </>
  )
}

export default Courses


