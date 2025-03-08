import { useEffect, useState, useRef, useMemo, } from "react";
import "./Dashboard.css";
import VideoPlayer from "../../components/videoPlayer/videoPlayer";
import instance from "../../api/axios";
import { AiOutlineLoading } from "react-icons/ai";
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
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    if (!location.id) return;

    instance(`/courses/${location.id}?token=${token}`)
      .then(response => {
        setCourse(response.data)
        setIsLoading(false)
      })
      .catch(err => console.log(err));
  }, [location.id, token]);

  const lessons = useMemo(() => (
    course.video_title?.map((title, index) => ({ id: uuidv4(), title, video: course.video_url_list?.[index] })) || []
  ), [course]);

  const handleVideoChange = (id) => {
    setActiveVideo(id);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      progressBarRef.current.value = 0;
    }
  };

  return (
    <>
      {
        isLoading ?
          <div className="loading-wrapper">
            <AiOutlineLoading className="loading-icon-big" />
          </div> :

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

                  <VideoPlayer pathToVideo={lessons?.[activeVideo]?.video} />



                  <div className="video-player__btn">
                    <button className="next-btn button-4" disabled={activeVideo == 0 ? true : false} onClick={() => { setActiveVideo(activeVideo - 1) }}><IoIosArrowBack /> Oldingi </button>
                    <button className="next-btn button-4" disabled={activeVideo === course.video_url_list.length - 1} onClick={() => { setActiveVideo(activeVideo + 1) }}>Keyingi <IoIosArrowForward /></button>
                  </div>

                  <div className="lesson-desc">
                    <p>{course?.created_at?.slice(0, 10)}</p>
                    <div>
                      
                      <p>{course?.description?.slice(0, 150) + "..."}</p>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          </div>}
    </>
  )
}

export default Dashboard

