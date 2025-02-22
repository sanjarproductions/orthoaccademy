import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import instance from "../../../../api/axios"

import { FaRegEdit } from "react-icons/fa";
import { MdDone } from "react-icons/md";
import { AiOutlineLoading } from "react-icons/ai";

const EditCourse = () => {
    let navigate = useNavigate()
    let { id } = useParams()
    const adminToken = localStorage.getItem("admin-token")
    const [courseData, setCourseData] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [editModeTitle, setEditModeTitle] = useState(false);
    const [editModeDescription, setEditModeDescription] = useState(false);
    const [editModeShortDescription, setEditModeShortDescription] = useState(false);
    const [editModePrice, setEditModePrice] = useState(false);
    const [courseTitle, setCourseTitle] = useState("");
    const [courseDescription, setCourseDescription] = useState("");
    const [courseShortDescription, setCourseShortDescription] = useState("");
    const [coursePrice, setCoursePrice] = useState(0);

    useEffect(() => {
        instance(`/courses/${id}`)
            .then(response => {
                const data = response.data;
                setCourseData(data);
                setCourseTitle(data.title);
                setCourseDescription(data.description);
                setCourseShortDescription(data.short_description);
                setCoursePrice(data.price);
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }, [id])


    function UpdateCourse(courseId) {

        let updatedCourse = {
            description: courseDescription,
            discount: 0,
            id: courseData?.id,
            plan: [
                "Introduction",
                "Basics",
                "Advanced Topics"
            ],
            price: coursePrice,
            short_description: courseShortDescription,
            stars: 5,
            title: courseTitle,
            video_count: 3,
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

        instance.put(`/admin/courses/${courseId}?token=${adminToken}`, updatedCourse)
            .then(() => {
                toast.success(`Kurs O'zgartirildi`)

                instance(`/courses/${id}`)
                    .then(response => {
                        const data = response.data;
                        setCourseData(data);
                        setCourseTitle(data.title);
                        setCourseDescription(data.description);
                        setCourseShortDescription(data.short_description);
                        setCoursePrice(data.price);
                    })
                    .catch(err => console.log(err))

                setEditModeTitle(false)
                setEditModeDescription(false)
                setEditModeShortDescription(false)
                setEditModePrice(false)
            })
            .catch(() => {
                toast.error("Hatolik Yuz berdi")
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
                    <div className="main">
                        <div className='course-data-item'>
                            <label>Kurs Nomi:</label>
                            <div className='flex edit-wrapper'>
                                {
                                    editModeTitle ?
                                        (<input className='courese-edit-input' type="text" required placeholder={"Enter"} value={courseTitle || courseData?.title} onChange={(e) => setCourseTitle(e.target.value)} />) : (<p>{courseData?.title}</p>)
                                }
                                {
                                    editModeTitle ?
                                        (<MdDone className='btn done-btn' onClick={() => UpdateCourse(courseData?.id)} />) :
                                        (<FaRegEdit className="btn" onClick={() => setEditModeTitle(true)} />)
                                }
                            </div>
                        </div>

                        <div className='course-data-item'>
                            <label>Kurs izohi:</label>
                            <div className='flex edit-wrapper'>
                                {
                                    editModeDescription ?
                                        (<input className='courese-edit-input' type="text" required placeholder={"Enter"} value={courseDescription || courseData?.description} onChange={(e) => setCourseDescription(e.target.value)} />) : (<p>{courseData?.description}</p>)
                                }
                                {
                                    editModeDescription ?
                                        (<MdDone className='btn done-btn' onClick={() => UpdateCourse(courseData?.id)} />) :
                                        (<FaRegEdit className="btn" onClick={() => setEditModeDescription(true)} />)
                                }
                            </div>
                        </div>

                        <div className='course-data-item'>
                            <label>Kurs izohi (qisqa):</label>
                            <div className='flex edit-wrapper'>
                                {
                                    editModeShortDescription ?
                                        (<input className='courese-edit-input' type="text" required placeholder={"Enter"} value={courseShortDescription || courseData?.short_description} onChange={(e) => setCourseShortDescription(e.target.value)} />) : (<p>{courseData?.short_description}</p>)
                                }
                                {
                                    editModeShortDescription ?
                                        (<MdDone className='btn done-btn' onClick={() => UpdateCourse(courseData?.id)} />) :
                                        (<FaRegEdit className="btn" onClick={() => setEditModeShortDescription(true)} />)
                                }
                            </div>
                        </div>

                        <div className='course-data-item'>
                            <label>Kurs narxi ($) :</label>
                            <div className='flex edit-wrapper'>
                                {
                                    editModePrice ?
                                        (<input className='courese-edit-input' type="number" required placeholder={"Enter"} value={coursePrice || courseData?.price} onChange={(e) => setCoursePrice(e.target.value)} />) : (<p>{courseData?.price}</p>)
                                }
                                {
                                    editModePrice ?
                                        (<MdDone className='btn done-btn' onClick={() => UpdateCourse(courseData?.id)} />) :
                                        (<FaRegEdit className="btn" onClick={() => setEditModePrice(true)} />)
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
//https://chatgpt.com/c/679f22ee-bc78-8002-a100-99de303cedea asked for things that i can make better in this code & didnt implemented them yet so fix that inshallah