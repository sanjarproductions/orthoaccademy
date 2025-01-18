import { useEffect, useState } from "react";
import "./Dashboard.css"
import instance from "../../api/axios"
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

const Dashboard = () => {
  let token = localStorage.getItem("user-token")
  let location = useParams()
  const [course, setCourse] = useState([])

  useEffect(() => {
    instance(`/courses/${location.id}?token=${token}`)
      .then(response => setCourse(response.data))
      .catch(err => console.log(err))
  }, [])
  console.log(course)

  return (
    <>
      <div className="dashboard">
        <div className="container">
          <h1>{course.title}</h1>
          <p>{course.short_description}</p>
          {

            course.video_url_list.map(i => 
              <video controls src={i} key={uuidv4()}></video>
            )

          }
        </div>
      </div>
    </>
  )
}

export default Dashboard


// the problem: to figure out to which course a user has clicked
// bcz we dont know,
// in order to render a specific course we have to know a dasboard_id 