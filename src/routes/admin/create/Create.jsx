import { useState, useEffect } from "react"
import instance from "../../../api/axios"
import { toast } from "react-toastify"


const Create = () => {
    const adminToken = localStorage.getItem("admin-token")
    // const [description, setDescription] = useState("")
    // const [discount, setDescription] = useState("")
    // const [plan, setDescription] = useState("")
    // const [price, setDescription] = useState("")
    // const [shortDescription, setDescription] = useState("")
    // const [title, setDescription] = useState("")
    // const [videoCount, setDescription] = useState("")
    // const [videoId, setDescription] = useState("")
    // const [videoTitle, setDescription] = useState("")

    function CreateCourse(e) {
        e.preventDefault()
        instance.post(`/admin/courses?token=${adminToken}`, {
            description: "Detailed course description here.",
            discount: 0,
            plan: [
                "Introduction",
                "Basics",
                "Advanced Topics"
            ],
            price: 100,
            short_description: "An example short description",
            title: "Example Course Title",
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
        })
            .then(response => {
                console.log(response)
                toast.success("Kurs Yaratildi!")
            })
            .catch(err => {
                toast.error(err)
            })
    }

    return (
        <div>
            <form onSubmit={CreateCourse}>
                <input type="text" placeholder="Kurs Nomi" />
                <input type="text" placeholder="Kurs Izohi" />
                <input type="text" placeholder="Kurs Izohi (qisqa)" />
                <input type="text" placeholder="Chegirma" />
                <input type="price" placeholder="Narx" />
                <input type="number" placeholder="Videolar soni" />
                <button>Create</button>
            </form>
        </div>
    )
}

export default Create






// get all the users if needed

// users?.data?.map((user, id) =>
//   <div className="user" key={id}>
//     <div className="flex">
//       <p>Ism: {user.full_name ? user.full_name : "Yo'q"}</p>
//       <p>Telefon: {user.phone ? user.phone : "Yo'q"}</p>
//       <p>Daraja: {user.ranks ? user.ranks : "Yo'q"}</p>
//       {/*  */}
//       <p>Id: {user.id}</p>
//       <p>username: {user.username}</p>
//       <p>Email: {user.email}</p>
//     </div>
//   </div>
// )