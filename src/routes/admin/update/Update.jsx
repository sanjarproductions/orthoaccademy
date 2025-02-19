import { useEffect } from 'react'
import instance from '../../../api/axios'

const Update = () => {
    let adminToken = localStorage.getItem("admin-token")

    // add a course
    useEffect(() => {
        instance.post(`/admin/courses?token=${adminToken}`, {
            description: "Detailed course description here.",
            discount: 10,
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
            .then(response => console.log(response))
    }, [adminToken])
    return (
        <div>
            Update
        </div>
    )
}

export default Update
