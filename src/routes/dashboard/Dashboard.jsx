import { useEffect, useState } from "react";
import "./Dashboard.css"
import instance from "../../api/axios"

const Dashboard = () => {
  const token = localStorage.getItem("user-token")
  const [courses, setCourses] = useState([])

  useEffect(() => {
    instance(`dashboards?token=${token}`)
      .then(response => setCourses(response.data))
      .catch(err => console.log(err))
  }, []) // this one is working

  return (
    <>
      <div className="dashboard">
        <div className="container">
          hi Im Dashboard
          {
            courses.map(course => 
              console.log(course)
              // console.log(course.course.video_url_list)
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