import { useEffect, useState } from 'react'
import instance from "../../../../api/axios"
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const EditCourse = () => {
    let params = useParams()
    const adminToken = localStorage.getItem("admin-token")
    const [courseData, setCourseData] = useState({})
    useEffect(() => {
        instance(`/courses/${params.id}`)
            .then(response => setCourseData(response))
            .catch(err => console.log(err))
    }, [params])
    console.log(courseData)

    function DeleteCourse(courseId) {
        let confirmDelete = window.confirm("Kursni o'chirmoqchimisiz?")
        if (confirmDelete) {
            instance.delete(`/admin/courses/${courseId}?token=${adminToken}`)
                .then(response => {
                    toast.success("Kurs O'chirildi")
                    console.log(response)
                })
                .catch(err => {
                    toast.error("Hatolik Yuz berdi")
                    console.log(err)
                })
        }
    }

    return (
        <div>
            <button onClick={DeleteCourse}>Click</button>
        </div>
    )
}

export default EditCourse
