import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { AiOutlineLoading } from "react-icons/ai";
import instance from "../../api/axios"
import "./Course.css"

const Courses = () => {
  const [courseData, setCourseData] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [readFull, setReadFull] = useState(false)
  const [paymentLink, setPaymentLink] = useState("")
  // const []
  let location = useParams()

  useEffect(() => {
    instance(`courses/${location.id}`)
      .then(response => {
        setCourseData(response.data)
        setIsLoading(false)
      })
      .catch(err => console.log(err))
  }, [location.id])

  useEffect(() => {
    if (!courseData.price) return;

    instance(`payment/generate-payment-link?order_id=${location.id}&amount=${courseData.price}`)
      .then(response => {
        setPaymentLink(response.data.url)
        setIsLoading(false)
      })
      .catch(err => console.log(err))
  }, [courseData.price])

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
                {
                  readFull ? <p>{courseData.description}</p> :
                    <p>{courseData.description.slice(0, 150) + "..."} <button className="read-full-btn" onClick={() => setReadFull(true)}>T&apos;oliq</button></p>
                }

                <div className="">
                  <p className="lessons-count">{courseData.video_count} video</p>
                  <strong className="course-view__price">$ {courseData.price}</strong>
                </div>
                {
                  courseData.price == 0 ? <Link to={localStorage.getItem("user-token") ? `/dashboard/${courseData.id}` : "/signup"} className="enroll-btn">Boshlash</Link> : <Link to={paymentLink} className="enroll-btn">Harid qilish</Link>
                }

              </div>
            </div>
          </div>}
    </>
  )
}

export default Courses


