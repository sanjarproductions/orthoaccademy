import { useEffect, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { useParams, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import instance from "../../api/axios";
import { toast } from "react-toastify";
import "./Course.css";

const Courses = () => {
  const [courseData, setCourseData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [readFull, setReadFull] = useState(false);
  const [paymentLink, setPaymentLink] = useState("");
  const [ifUserHasCourse, setIfUserHasCourse] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  let userToken = localStorage.getItem("user-token");
  let location = useParams();

  useEffect(() => {
    instance(`courses/${location.id}`)
      .then((response) => {
        setCourseData(response.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [location.id]);

  useEffect(() => {
    if (!userToken || !courseData.id) return;
    instance(`/dashboards/${courseData.id}/one?token=${userToken}`)
      .then((response) => setIfUserHasCourse(response.data))
      .catch((err) => console.log(err));
  }, [userToken, courseData]);

  async function createOrder() {
    if (paymentLoading) return; // Prevent multiple clicks
    setPaymentLoading(true); // Start loading

    try {
      let decoded = jwtDecode(userToken);
      const orderResponse = await instance.post(
        `/courses/${courseData.id}/orders/create?token=${userToken}`,
        {
          amount: courseData.price,
          course_id: courseData.id,
          user_id: decoded.sub,
        }
      );

      const paymentResponse = await instance(
        `payment/generate-payment-link?order_id=${orderResponse.data.data.id}&amount=${orderResponse.data.data.amount}&token=${userToken}`
      );

      setPaymentLink(paymentResponse.data.url);
      window.location.href = paymentResponse.data.url;
    } catch (error) {
      console.log(error);
      if (error.response) {
        toast.error(error.response.data.detail || "Xatolik yuz berdi");
      }
    } finally {
      setPaymentLoading(false); // Stop loading
    }
  }

  return (
    <>
      {isLoading ? (
        <div className="loading-wrapper">
          <AiOutlineLoading className="loading-icon-big" />
        </div>
      ) : (
        <div className="view-course container">
          <div className="flex">
            <img src={courseData.image_url} alt="" className="course-img" />
            <div className="course-text">
              <h3>{courseData.title}</h3>
              {readFull ? (
                <p>{courseData.description}</p>
              ) : (
                <p>
                  {courseData.description.slice(0, 150) + "..."}{" "}
                  <button
                    className="read-full-btn"
                    onClick={() => setReadFull(true)}
                  >
                    T&apos;oliq
                  </button>
                </p>
              )}

              <div>
                <p className="lessons-count">{courseData.video_count} video</p>
                <strong className="course-view__price">
                  $ {courseData.price}
                </strong>
              </div>

              {userToken ? (ifUserHasCourse ? <Link className="enroll-btn" to={`/dashboard/${courseData.id}`}>Boshlash</Link> : <Link className="enroll-btn" to={paymentLink} onClick={createOrder} style={paymentLoading ? { opacity: 0.5 } : { opacity: 1 }}>Harid qilish</Link>) : <Link className="enroll-btn" to={"/signup"}>Boshlash</Link>}
          </div>
        </div>
        </div >
      )}
    </>
  );
};

export default Courses;
