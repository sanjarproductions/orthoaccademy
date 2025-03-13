import { useEffect, useState, useRef, useMemo } from "react";
import "./Dashboard.css";
import VideoPlayer from "../../components/videoPlayer/videoPlayer";
import instance from "../../api/axios";
import { AiOutlineLoading } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const Dashboard = () => {
  let token = localStorage.getItem("user-token");
  let location = useParams();

  const activeVideoRef = useRef(0);
  const [course, setCourse] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [videoSrc, setVideoSrc] = useState("");


  useEffect(() => {
    if (!location.id) return;

    instance(`/courses/${location.id}?token=${token}`)
      .then((response) => {
        setCourse(response.data);
        setVideoSrc(response.data.video_url_list?.[0] || ""); // Set initial video
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [location.id, token]);

  const lessons = useMemo(
    () =>
      course.video_title?.map((title, index) => ({
        id: uuidv4(),
        title,
        video: course.video_url_list?.[index],
      })) || [],
    [course]
  );

  const handleVideoChange = (id) => {
    activeVideoRef.current = id;
    setVideoSrc(lessons[id]?.video); // 🔥 Updates only the video URL
  };

  return (
    <>
      {isLoading ? (
        <div className="loading-wrapper">
          <AiOutlineLoading className="loading-icon-big" />
        </div>
      ) : (
        <div className="dashboard">
          <div className="container">
            <div className="course-details">
              <h1 className="course-title">{course.title}</h1>
              <p>{course.short_description}</p>
            </div>

            <div className="course-lessons">
              <div className="course-lessons__list">
                {lessons?.map((lesson, id) => (
                  <div className="lesson" key={lesson.id} onClick={() => handleVideoChange(id)}>
                    <video src={lesson.video} className="video-lesson"></video>
                    <p className="title-lesson">{lesson.title.slice(0, 25) + "..."}</p>
                  </div>
                ))}
              </div>

              <div className="video-player__wrapper">
                <VideoPlayer key={videoSrc} pathToVideo={videoSrc} />

                <div className="video-player__btn">
                  <button
                    className="next-btn button-4"
                    disabled={activeVideoRef.current === 0}
                    onClick={() => handleVideoChange(activeVideoRef.current - 1)}
                  >
                    <IoIosArrowBack /> Oldingi
                  </button>
                  <button
                    className="next-btn button-4"
                    disabled={activeVideoRef.current === course.video_url_list?.length - 1}
                    onClick={() => handleVideoChange(activeVideoRef.current + 1)}
                  >
                    Keyingi <IoIosArrowForward />
                  </button>
                </div>


                <div className="lesson-desc">
                  <p>{course?.created_at?.slice(0, 10)}</p>
                  <div><p>{course?.description}</p></div>
                </div>


              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
