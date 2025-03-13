import { useEffect, useState } from "react"
import { AiOutlineLoading } from "react-icons/ai";
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { jwtDecode } from "jwt-decode"
import instance from "../../api/axios"
import "./Course.css"
import { toast } from 'react-toastify';

const Courses = () => {
  const [courseData, setCourseData] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [readFull, setReadFull] = useState(false)
  const [paymentLink, setPaymentLink] = useState("")
  let userToken = localStorage.getItem("user-token")
  let location = useParams()

  useEffect(() => {
    instance(`courses/${location.id}`)
      .then(response => {
        setCourseData(response.data)
        setIsLoading(false)
      })
      .catch(err => console.log(err))
  }, [location.id])

  function createOrder() {
  let decoded = jwtDecode(userToken);
    instance.post(`/courses/${courseData.id}/orders/create?token=${userToken}`, {
      amount: courseData.price,
      course_id: courseData.id,
      user_id: decoded.sub
    })
      .then(response => {
        console.log(response.data.data.id)
        instance(`payment/generate-payment-link?order_id=${response.data.data.id}&amount=${response.data.data.amount}&token=${userToken}`)
          .then(response => {
            setPaymentLink(response.data.url)
            setIsLoading(false)
            window.location.href = response.data.url;
          })
          .catch(err => console.log(err))
      })

      .catch(error => {
        console.log(error)
        if (error.response) {
          if (error.response.status === 409) {
            toast.error(error.response.data.detail)
          }
          else {
            toast.error("Xatolik yuz berdi")
          }
        }
      })
  }

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
                  courseData.price == 0 ? <Link to={localStorage.getItem("user-token") ? `/dashboard/${courseData.id}` : "/signup"} className="enroll-btn">Boshlash</Link> : <Link onClick={createOrder} to={localStorage.getItem("user-token") ? paymentLink : "/signup"} className="enroll-btn">Harid qilish</Link>
                }

              </div>
            </div>
          </div>}
    </>
  )
}

export default Courses