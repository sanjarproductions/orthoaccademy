import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { AiOutlineLoading } from "react-icons/ai";
import instance from "../../api/axios"
import "./CourseCard.css"

const CourseCard = () => {
  const [cards, setCards] = useState([])
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    instance("courses/all", {})
      .then(response => {
        setCards(response.data)
        setIsLoading(false);
      })
  }, [])

  return (
    <>
      {isLoading ?
        <div className="loading-wrapper">
          <AiOutlineLoading className="loading-icon-big" />
        </div> :
        <div className="cards">
          <div className="container">
            <h2>Kurslar</h2>
            <div className="cards-grid">
              {
                cards.map(i =>
                  <Link key={i.id} to={`/course/${i.id}`}>
                    <div className="card">
                      <img src={i.image_url} alt="" className="card-img" />
                      <div className="card-text">
                        <h3>{i.title}</h3>
                        <p>{i.description.slice(0, 75) + "..."}</p>
                        <div className="flex">
                          <strong>${i.price}</strong>
                          <p>{i.video_count} video</p>
                        </div>

                      </div>
                    </div>
                  </Link>
                )
              }
            </div>
          </div>
        </div>
      }

    </>
  )
}

export default CourseCard
