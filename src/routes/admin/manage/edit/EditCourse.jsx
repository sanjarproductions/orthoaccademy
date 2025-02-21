import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import instance from "../../../../api/axios"

// import { IoBookSharp } from "react-icons/io5";
// import { MdAccountCircle } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { MdDone } from "react-icons/md";
import { AiOutlineLoading } from "react-icons/ai";

const EditCourse = () => {
    let navigate = useNavigate()
    let { id } = useParams()
    const adminToken = localStorage.getItem("admin-token")
    const [courseData, setCourseData] = useState({})
    const [editMode, setEditMode] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const [courseTitle, setCourseTitle] = useState("")
    console.log(courseTitle);

    useEffect(() => {
        instance(`/courses/${id}`)
            .then(response => {
                setCourseData(response.data)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }, [id])
    console.log(courseData)

    let obj = {
        description: "Detailed course description here.",
        discount: 10,
        id: courseData?.id,
        plan: [
            "Introduction",
            "Basics",
            "Advanced Topics"
        ],
        price: 100,
        short_description: "An example short description",
        stars: 5,
        title: courseTitle,
        video_count: 10,
        video_id: [
            1,
            2,
            3
        ],
        video_title: [
            "lesson 1",
            "lesson 2",
            "lesson 3"
        ]
    }

    function UpdateCourse(courseId) {
        instance.put(`/admin/courses/${courseId}?token=${adminToken}`, obj)
            .then((response) => {
                toast.success("Success")
                // console.log(response)
            })
            .catch((err) => {
                toast.error("Error")
                // console.log(err)
            })
    }

    function DeleteCourse(courseId) {
        let confirmDelete = window.confirm("Kursni o'chirmoqchimisiz?")
        if (confirmDelete) {
            instance.delete(`/admin/courses/${courseId}?token=${adminToken}`)
                .then(() => {
                    toast.success("Kurs O'chirildi")
                    navigate("/admin/manage")
                })
                .catch(() => {
                    toast.error("Hatolik Yuz berdi")
                })
        }
    }


    return (
        <>
            {isLoading ? (
                <div className="loading-wrapper">
                    <AiOutlineLoading className="loading-icon-big" />
                </div>
            ) : (
                <div className='edit-course-wrapper'>
                    <button>Edit</button> <br />
                    <div className="main">
                        <div className='course-data-item'>
                            <label>Kurs Nomi:</label>
                            <div className='flex edit-wrapper'>
                                {editMode ?
                                    <input type="text" name="" id="" /> :
                                    <p onChange={(e) => setCourseTitle(e.target.value)}>{courseData?.title}</p>
                                }
                                {
                                    editMode ? (
                                        <MdDone onClick={() => UpdateCourse(courseData?.id)} />
                                    ) : (<FaRegEdit className="edit-btn" onClick={() => setEditMode(true)} />)
                                }
                            </div>
                        </div>

                        <div className='course-data-item'>
                            <label>Kurs izohi:</label>
                            <div className='flex edit-wrapper'>
                                <p className='editable'>{courseData?.description}</p>
                                {
                                    editMode ? (
                                        <MdDone onClick={() => UpdateCourse(courseData?.id)} />
                                    ) : (<FaRegEdit className="edit-btn" onClick={() => setEditMode(true)} />)
                                }
                            </div>
                        </div>

                        <div className='course-data-item'>
                            <label>Kurs izohi (qisqa):</label>
                            <div className='flex edit-wrapper'>
                                <p className='editable'>{courseData?.short_description}</p>
                                {
                                    editMode ? (
                                        <MdDone onClick={() => UpdateCourse(courseData?.id)} />
                                    ) : (<FaRegEdit className="edit-btn" onClick={() => setEditMode(true)} />)
                                }
                            </div>
                        </div>

                        <div className='course-data-item'>
                            <label>Kurs narxi ($) :</label>
                            <div className='flex edit-wrapper'>
                                <p className='editable'>{courseData?.price}</p>
                                {
                                    editMode ? (
                                        <MdDone onClick={() => UpdateCourse(courseData?.id)} />
                                    ) : (<FaRegEdit className="edit-btn" onClick={() => setEditMode(true)} />)
                                }
                            </div>
                        </div>

                        <div className='course-img'>
                            <label>Kurs Rasmi:</label>
                            <img className='editable' width={100 + "%"} src={courseData?.image_url} />
                        </div>
                    </div>

                    <div className="delete-course">
                        <button className='course-delete-btn' onClick={() => DeleteCourse(courseData?.id)}> Kursni O&apos;chirish</button>
                    </div>
                </div>
            )
            }
        </>

    )
}

export default EditCourse
// make the patch/put method actually work! inshallah