import { useEffect, useState, useRef } from "react";
import "./Dashboard.css"
import instance from "../../api/axios"
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { MdPause } from "react-icons/md";
import { MdPlayArrow } from "react-icons/md";
import { MdFullscreen } from "react-icons/md";
import { MdFullscreenExit } from "react-icons/md";

import { MdVolumeUp } from "react-icons/md";
import { MdVolumeOff } from "react-icons/md";

const Dashboard = () => {
  let token = localStorage.getItem("user-token")
  let location = useParams()
  const wrapperRef = useRef(null)
  const videoRef = useRef(null)

  const [course, setCourse] = useState([])
  const [activeVideo, setActiveVideo] = useState(0)
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    instance(`/courses/${location.id}?token=${token}`)
      .then(response => setCourse(response.data))
      .catch(err => console.log(err))
  }, [location.id, token])
  // combine the titles and videos together
  const lessons = course.video_title?.map((title, index) => ({ title, video: course.video_url_list[index] }));



  useEffect(() => {
    const video = videoRef.current;
    const wrapper = wrapperRef.current;

    if (!video || !wrapper) return;

    const handlePlay = () => wrapper.classList.remove("paused");
    const handlePause = () => wrapper.classList.add("paused");

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
    };
  }, []);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      if (wrapperRef.current.requestFullscreen) {
        wrapperRef.current.requestFullscreen();
        setIsFullScreen(true)
      } else if (wrapperRef.current.mozRequestFullScreen) { // Firefox
        wrapperRef.current.mozRequestFullScreen();
      } else if (wrapperRef.current.webkitRequestFullscreen) { // Chrome, Safari, Opera
        wrapperRef.current.webkitRequestFullscreen();
      } else if (wrapperRef.current.msRequestFullscreen) { // IE/Edge
        wrapperRef.current.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        setIsFullScreen(false)
        document.exitFullscreen();
      }
    }
  };


  const togglePlayPause = () => {
    const video = videoRef.current;
    console.log(video)
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

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


              <div className="video-wrapper paused " ref={wrapperRef}>
                <div className="video-controlls">
                  <div className="timeline-container"></div>
                  <div className="controlls">
                    <div className="first-pannel">
                      <button className="play-icon" onClick={togglePlayPause}><MdPlayArrow /></button>
                      <button className="pause-icon" onClick={togglePlayPause}><MdPause /></button>
                      <button className="vol-icon" onClick={toggleMute}>{isMuted ? <MdVolumeOff /> : <MdVolumeUp />}</button>
                    </div>
                    <div className="second-pannel">
                      <button className="fullscreen-icon" onClick={toggleFullScreen}>  {isFullScreen ? <MdFullscreenExit /> : <MdFullscreen />} </button>
                    </div>
                  </div>
                </div>
                <video className="video-player" src={course?.video_url_list?.[activeVideo]} ref={videoRef}></video>
              </div>



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
// the vide ourl being shown problem

// the use state reload problem (solve)