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
    const [isLoading, setIsLoading] = useState(true)
    const [isEditing, setIsEditing] = useState({ title: false, description: false, short_description: false, price: false })
    const [courseData, setCourseData] = useState({ title: "", description: "", short_description: "", price: 0 })

    useEffect(() => {
        instance(`/courses/${id}`)
            .then(response => {
                setCourseData(response.data);
                setIsLoading(false);
            })
            .catch(() => {
                toast.error("Ma'lumot olishda xatolik yuz berdi!");
            });
    }, [id]);

    const handleInputChange = (field, value) => {
        setCourseData(prev => ({ ...prev, [field]: value }));
    };


    function UpdateCourse(courseId) {
        let updatedCourse = {
            ...courseData, 
            discount: 0,
            stars: 5,
            video_count: 3,
            video_id: [1, 2, 3],
            video_title: ["lesson 1", "lesson 2", "lesson 3"],
            plan: ["Introduction", "Basics", "Advanced Topics"],
        };

        instance.put(`/admin/courses/${courseId}?token=${adminToken}`, updatedCourse)
            .then(() => {
                toast.success(`Kurs O'zgartirildi`);
                return instance(`/courses/${id}`);
            })
            .then(response => {
                setCourseData(response.data);
            })
            .catch(() => {
                toast.error("Hatolik Yuz berdi");
            })
            .finally(() => {
                setIsEditing({ title: false, description: false, short_description: false, price: false });
            });
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
                                    isEditing.title ?
                                        (<input className='courese-edit-input' type="text" required placeholder={"Enter"} defaultValue={courseData?.title} onChange={(e) => handleInputChange("title", e.target.value)} />) : (<p>{courseData?.title}</p>)
                                }
                                {
                                    isEditing.title ?
                                        (<MdDone className='btn done-btn' onClick={() => UpdateCourse(courseData?.id)} />) :
                                        (<FaRegEdit className="btn" onClick={() => setIsEditing(prev => ({ ...prev, title: true }))} />)
                                }
                            </div>
                        </div>

                        <div className='course-data-item'>
                            <label>Kurs izohi:</label>
                            <div className='flex edit-wrapper'>
                                {
                                    isEditing.description ?
                                        (<input className='courese-edit-input' type="text" required placeholder={"Enter"} value={courseData?.description} onChange={(e) => handleInputChange("description", e.target.value)} />) : (<p>{courseData?.description}</p>)
                                }
                                {
                                    isEditing.description ?
                                        (<MdDone className='btn done-btn' onClick={() => UpdateCourse(courseData?.id)} />) :
                                        (<FaRegEdit className="btn" onClick={() => setIsEditing(prev => ({ ...prev, description: true }))} />)
                                }
                            </div>
                        </div>

                        <div className='course-data-item'>
                            <label>Kurs izohi (qisqa):</label>
                            <div className='flex edit-wrapper'>
                                {
                                    isEditing.short_description ?
                                        (<input className='courese-edit-input' type="text" required placeholder={"Enter"} value={courseData?.short_description} onChange={(e) => handleInputChange("short_description", e.target.value)} />) : (<p>{courseData?.short_description}</p>)
                                }
                                {
                                    isEditing.short_description ?
                                        (<MdDone className='btn done-btn' onClick={() => UpdateCourse(courseData?.id)} />) :
                                        (<FaRegEdit className="btn" onClick={() => setIsEditing(prev => ({ ...prev, short_description: true }))} />)
                                }
                            </div>
                        </div>

                        <div className='course-data-item'>
                            <label>Kurs narxi ($) :</label>
                            <div className='flex edit-wrapper'>
                                {
                                    isEditing.price ?
                                        (<input className='courese-edit-input' type="number" required placeholder={"Enter"} value={courseData?.price} onChange={(e) => handleInputChange("short_description", e.target.value)} />) : (<p>{courseData?.price}</p>)
                                }
                                {
                                    isEditing.price ?
                                        (<MdDone className='btn done-btn' onClick={() => UpdateCourse(courseData?.id)} />) :
                                        (<FaRegEdit className="btn" onClick={() => setIsEditing(prev => ({ ...prev, price: true }))} />)
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