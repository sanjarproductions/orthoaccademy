import CourseCard from "../../components/course-card/CourseCard"
import Hero from "../../assets/hero.png"
import { Link } from "react-router-dom"
import "./Home.css"

const Home = () => {
  
  return (
    <>
      <div className="hero">
        <div className="container">
          <div className="flex">
            <div className="hero-text">
              <h1>Istalgan joyda, o&apos;zingizga qulay vaqtda o&apos;qish imkoniyati</h1>
              <p className="desc">O&apos;nlab studentlar safiga q&apos;oshiling</p>
              <Link className="signup-btn" to={"/signup"}>Register</Link>
            </div>
            <div className="hero-img">
              <img src={Hero} alt="" />
              {/* <img src="https://cdn.pixabay.com/photo/2024/02/07/15/09/ai-generated-8559288_1280.png" alt="" width={580} /> */}
              {/* <img src={HeroBgImg} alt="" className="hero-img-bg" /> */}
            </div>
          </div>

        </div>
      </div>
      <CourseCard />
    </>
  )
}

export default Home
