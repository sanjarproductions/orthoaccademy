import { useEffect, useState } from "react";
import "./Dashboard.css"
import instance from "../../api/axios"
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

const Dashboard = () => {
  let token = localStorage.getItem("user-token")
  let location = useParams()
  const [course, setCourse] = useState([])
  const [activeVideo, setActiveVideo] = useState(0)

  useEffect(() => {
    instance(`/courses/${location.id}?token=${token}`)
      .then(response => setCourse(response.data))
      .catch(err => console.log(err))
  }, [location.id])
  console.log(course)

  return (
    <>
      <div className="dashboard">
        <div className="container">
          <div className="course-details">
            <h1 className="course-title">{course.title}</h1>
            <p>{course.short_description}</p>
          </div>

          <div className="course-lessons">

            <div className="course-lessons__list">
              {
                course?.video_url_list?.map((videoLesson, id) =>
                  <>
                    <video src={videoLesson} key={uuidv4()} onClick={() => { setActiveVideo(id) }}></video>
                  </>
                )
              }
            </div>


            <div>
              <video src={course?.video_url_list?.[activeVideo]} controls className="video-player"></video>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard