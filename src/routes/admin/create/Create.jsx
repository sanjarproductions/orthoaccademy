import { useState } from "react"
import instance from "../../../api/axios"
import { toast } from "react-toastify"


const Create = () => {
    const adminToken = localStorage.getItem("admin-token")
    const [newCourseTitle, setNewCourseTitle] = useState("")
    const [newCourseDescription, setNewCourseDescription] = useState("")
    const [newCourseShortDescription, setNewCourseShortDescription] = useState("")
    const [newCoursePrice, setNewCoursePrice] = useState(0)


    function CreateCourse(e) {
        e.preventDefault()

        let createCourse = {
            description: newCourseDescription,
            discount: 0,
            plan: [
                "Introduction",
                "Basics",
                "Advanced Topics"
            ],
            price: newCoursePrice,
            short_description: newCourseShortDescription,
            title: newCourseTitle,
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

        instance.post(`/admin/courses?token=${adminToken}`, createCourse)
            .then(() => {
                toast.success("Kurs Yaratildi!")
                setNewCourseTitle("")
                setNewCourseDescription("")
                setNewCourseShortDescription("")
                setNewCoursePrice(0)
            })
            .catch(err => {
                toast.error(err)
            })
    }

    // console.log(
    //     newCourseTitle,
    //     newCourseDescription,
    //     newCourseShortDescription,
    //     newCoursePrice
    // )

    return (
        <div className="admin-create-course">
            <form className="admin-create" onSubmit={CreateCourse}>
                <div className="input-wrapper">
                    <label>Kurs Nomi:</label>
                    <input required value={newCourseTitle} className="create-course-inp" type="text" onChange={(e) => setNewCourseTitle(e.target.value)} />
                </div>
                <div className="input-wrapper">
                    <label>Kurs Izohi:</label>
                    <textarea required value={newCourseDescription} className="create-course-inp" type="text" onChange={(e) => setNewCourseDescription(e.target.value)} />
                </div>
                <div className="input-wrapper">
                    <label>Kurs Izohi (qisqa)</label>
                    <input required value={newCourseShortDescription} className="create-course-inp" type="text" onChange={(e) => setNewCourseShortDescription(e.target.value)} />
                </div>
                <div className="input-wrapper">
                    <label>Kurs Narxi:</label>
                    <input required value={newCoursePrice} className="create-course-inp" type="number" onChange={(e) => setNewCoursePrice(e.target.value)} />
                </div>
                <div className="create-course">
                    <button className="course-create-btn">Yaratish</button>
                </div>
            </form>
        </div>
    )
}

export default Create