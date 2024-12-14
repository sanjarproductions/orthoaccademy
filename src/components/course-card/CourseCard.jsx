// import React from 'react'
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import instance from "../../api/axios"
import Image from "/car.jpeg"
import "./CourseCard.css"

const CourseCard = () => {
  const [cards, setCards] = useState([])

  useEffect(() => {
    instance("courses/all", {})
      .then(response => setCards(response.data))
  }, [])
  // console.log(cards)
  return (
    <>
      <div className="cards">
        <div className="container">
          <h2>Kurslar</h2>
          <div className="flex">
            {
              cards.map(i =>
                <Link key={i.id} to={`/course/${i.id}`}>
                  <div className="card">
                    {/* <img src={i.image_url} alt="" width={100 + "%"} height={100 + "%"} /> */}
                    <img src={Image} alt="" width={100 + "%"} height={100 + "%"} />
                    <div className="card-text">
                      <h3>{i.title}</h3>
                      <p>{i.description}</p>
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
    </>
  )
}

export default CourseCard
