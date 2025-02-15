import { useEffect, useState, useRef, useMemo, } from "react";
import "./Dashboard.css"
import VideoPlayer from "../../components/videoPlayer/videoPlayer";
import instance from "../../api/axios"
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";

const Dashboard = () => {
  let token = localStorage.getItem("user-token")
  let location = useParams()
  const videoRef = useRef(null)
  const progressBarRef = useRef(null)
  const [course, setCourse] = useState([])
  const [activeVideo, setActiveVideo] = useState(0)

  useEffect(() => {
    if (!location.id) return;

    instance(`/courses/${location.id}?token=${token}`)
      .then(response => setCourse(response.data))
      .catch(err => console.log(err));
  }, [location.id, token]);

  const lessons = useMemo(() => (
    course.video_title?.map((title, index) => ({ id: uuidv4(), title, video: course.video_url_list?.[index] })) || []
  ), [course]);

  const handleVideoChange = (id) => {
    setActiveVideo(id);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;  // ✅ Reset time
      progressBarRef.current.value = 0;  // ✅ Reset progress bar
    }
  };

  console.log(lessons)

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
                  <div className="lesson" key={id} onClick={() => handleVideoChange(id)}>
                    <video src={i?.video} className="video-lesson"></video>
                    <p className="title-lesson">{i?.title.slice(0, 25) + "..."}</p>
                  </div>
                )
              }
            </div>

            <div className="video-player__wrapper">

              <VideoPlayer pathToVideo={lessons?.[activeVideo]?.video}/>



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
// custom player +
// custom player / timerline +
// custom player / duration +

// next vid btn +
// the video url being shown problem

// the use state reload problem (solve)