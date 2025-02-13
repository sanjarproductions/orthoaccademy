import { useEffect, useState, useRef, useMemo, useCallback } from "react";
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
  const totalTimeRef = useRef(null)
  const currentTimeRef = useRef(null)
  const progressBarRef = useRef(null)
  const progressLine = useRef(null)
  const progressRef = useRef(0)

  const [course, setCourse] = useState([])
  const [activeVideo, setActiveVideo] = useState(0)
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (!location.id) return;

    instance(`/courses/${location.id}?token=${token}`)
      .then(response => setCourse(response.data))
      .catch(err => console.log(err));
  }, [location.id]); // chat says that token shouldnt update too often

  // useEffect(() => {

  //   instance(`/courses/${location.id}?token=${token}`)
  //     .then(response => setCourse(response.data))
  //     .catch(err => console.log(err))
  // }, [location.id, token])


  // combine the titles and videos together
  const lessons = useMemo(() => (
    course.video_title?.map((title, index) => ({ id: uuidv4(), title, video: course.video_url_list?.[index] })) || []
  ), [course]);


  // Format time (00:00 format)
  const leadingZero = useMemo(() => new Intl.NumberFormat(undefined, { minimumIntegerDigits: 2 }), []);
  const formatTime = useCallback((time) => {
    const seconds = Math.floor(time % 60);
    const minutes = Math.floor(time / 60) % 60;
    const hours = Math.floor(time / 3600);

    return hours > 0
      ? `${hours}:${leadingZero.format(minutes)}:${leadingZero.format(seconds)}`
      : `${minutes}:${leadingZero.format(seconds)}`;
  }, [leadingZero]);

  // Update Duration & Current Time
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => {
      if (currentTimeRef.current) {
        currentTimeRef.current.textContent = formatTime(video.currentTime);
      }
      if (progressBarRef.current) {
        progressBarRef.current.value = (video.currentTime / video.duration) * 100;
      }
    };

    const setTotalDuration = () => {
      if (totalTimeRef.current && !isNaN(video.duration)) {
        totalTimeRef.current.textContent = formatTime(video.duration);
      }
    };

    video.addEventListener("loadedmetadata", setTotalDuration);
    video.addEventListener("timeupdate", updateTime);

    return () => {
      video.removeEventListener("loadedmetadata", setTotalDuration);
      video.removeEventListener("timeupdate", updateTime);
    };
  }, [formatTime]);

  // Play/Pause Class Toggle
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

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };


  // Toggle Full Screen
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      wrapperRef.current?.requestFullscreen();
      setIsFullScreen(true);
    } else {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };


  // Toggle Mute
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  // Time Line
  useEffect(() => {
    const video = videoRef.current;
    const progressLineRed = progressLine.current

    if (!video) return;

    const handleTimeUpdate = () => {
      progressRef.current = video.currentTime;
      if (progressBarRef.current) {
        // progressBarRef.current.value = video.currentTime;
        const progress = (video.currentTime / video.duration) * 100;
        progressLineRed.style.width = `${progress}%`;
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  const handleTimelineChange = (e) => {
    const progressLineRed = progressLine.current

    if (videoRef.current) {
      const newTime = (parseFloat(e.target.value) / 100) * videoRef.current.duration;
      videoRef.current.currentTime = newTime;
      progressLineRed.style.width = `${e.target.value}%`;
    }
  };

  // Ensure Reset (Timeline)

  const handleVideoChange = (id) => {
    setActiveVideo(id);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;  // ✅ Reset time
      progressBarRef.current.value = 0;  // ✅ Reset progress bar
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
                  <div className="lesson" key={id} onClick={() => handleVideoChange(id)}>
                    <video src={i?.video} className="video-lesson"></video>
                    <p className="title-lesson">{i?.title.slice(0, 25) + "..."}</p>
                  </div>
                )
              }
            </div>

            <div className="video-player__wrapper">


              <div className="video-wrapper paused" ref={wrapperRef}>
                <div className="video-controlls">
                  <div className="timeline-container">
                    <div className="progress-line" ref={progressLine}></div>
                    <input type="range" ref={progressBarRef} className="progress-bar" step="0.1" defaultValue={0} min="0" max={videoRef.current?.duration} onInput={handleTimelineChange} />

                  </div>
                  <div className="controlls">
                    <div className="first-pannel">
                      <button className="play-icon" onClick={togglePlayPause}><MdPlayArrow /></button>
                      <button className="pause-icon" onClick={togglePlayPause}><MdPause /></button>
                      <button className="vol-icon" onClick={toggleMute}>{isMuted ? <MdVolumeOff /> : <MdVolumeUp />}</button>

                      <div className="duration">
                        <div className="current-time" ref={currentTimeRef}>0:00</div>
                        /
                        <div className="total-time" ref={totalTimeRef}></div>
                      </div>
                    </div>
                    <div className="second-pannel">
                      <button className="fullscreen-icon" onClick={toggleFullScreen}>  {isFullScreen ? <MdFullscreenExit /> : <MdFullscreen />} </button>
                    </div>
                  </div>
                </div>
                <video className="video-player" src={course?.video_url_list?.[activeVideo]} ref={videoRef}></video>
              </div>



              <div className="video-player__btn">
                <button className="next-btn button-4" onClick={() => { setActiveVideo((prev) => Math.max(0, prev - 1)) }}><IoIosArrowBack /> Oldingi </button>
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