import instance from '../../../api/axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Manage = () => {
  const [courses, setCourses] = useState([])

  useEffect(() => {
    instance(`courses/all`)
      .then(response => setCourses(response))
      .catch(err => console.log(err))
  }, [courses])

  return (
    <div className='admin-manage-wrapper'>
      {
        courses?.data?.map(i =>
          <Link to={`/admin/manage/${i.id}`} key={i.id} >
            <div className="admin-course-card">
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
  )
}

export default Manage
