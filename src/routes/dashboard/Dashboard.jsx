import { useEffect, useState } from "react";
import "./Dashboard.css"
import instance from "../../api/axios"
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";

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

  const lessons = course.video_title?.map((title, index) => ({
    title,
    video: course.video_url_list[index],
  }));
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
                lessons?.map((i, id) =>
                  <div className="lesson" key={uuidv4()} onClick={() => { setActiveVideo(id) }}>
                    <video src={i?.video} className="video-lesson"></video>
                    <p className="title-lesson">{i?.title.slice(0, 25) + "..."}</p>
                  </div>
                )
              }
            </div>

            <div className="video-player__wrapper">


              {/*  */}
              <div className="video-wrapper">
                <div className="video-controlls">
                  <div className="timeline-container"></div>
                  <div className="controlls"></div>
                </div>
                <video className="video-player" src={course?.video_url_list?.[activeVideo]}></video>
              </div>
              {/*  */}



              <div className="video-player__btn">
                <button className="next-btn button-4" onClick={() => { setActiveVideo(activeVideo - 1) }}><IoIosArrowBack /> Oldingi </button>
                <button className="next-btn button-4" onClick={() => { setActiveVideo(activeVideo + 1) }}>Keyingi <IoIosArrowForward /></button>
              </div>

              <div className="lesson-desc">
                <p>{course?.created_at?.slice(0, 10)}</p>
                <div>
                  <p className="lesson-desc__text">{course?.description?.slice(0, 150) + "..."}</p> <button>Batafsil</button>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard


// design +
// custom player 
// next vid btn +
// reload problem (solve)
