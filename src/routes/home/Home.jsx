import CourseCard from "../../components/courseCard/CourseCard"
import Hero from "../../assets/hero.png"
import { Link } from "react-router-dom"
import "./Home.css"

const Home = () => {
  let userToken = localStorage.getItem("user-token")

  return (
    <>
      <div className="hero">
        <div className="container">
          <div className="flex">
            <div className="hero-text">
              <h1>Istalgan joyda, o&apos;zingizga qulay vaqtda o&apos;qish imkoniyati</h1>
              <p className="desc">O&apos;nlab studentlar safiga q&apos;oshiling</p>
              {
                userToken ? <></> : <Link className="signup-btn" to={"/signup"}>R&apos;oyhatdan o&apos;tish</Link>
              }
            </div>
            <div className="hero-img">
              <img src={Hero} alt="" />
            </div>
          </div>

        </div>
      </div>
      <CourseCard />
    </>
  )
}

export default Home
