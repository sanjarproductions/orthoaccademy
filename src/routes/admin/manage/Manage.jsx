import instance from "../../../api/axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";

const Manage = () => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    instance.get("courses/all")
      .then((response) => {
        setCourses(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="loading-wrapper">
          <AiOutlineLoading className="loading-icon-big" />
        </div>
      ) : (
        <div className="admin-manage-wrapper">
          {courses.map((i) => (
            <Link to={`/admin/manage/${i.id}`} key={i.id}>
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
          ))}
        </div>
      )}
    </>
  );
};

export default Manage;