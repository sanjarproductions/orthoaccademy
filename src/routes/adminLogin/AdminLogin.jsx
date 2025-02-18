import { useState } from "react"
import { AiOutlineLoading } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import instance from "../../api/axios";
import "./AdminLogin.css"


const AdminLogin = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    function LoginAdmin(e) {
        e.preventDefault()
        setIsLoading(true)

        instance.post(`/admin`, {
            email: email,
            password: password
        })
            .then(response => {
                localStorage.setItem("admin-token", response.data.data.token)
                toast.success("Hush Kelibsiz!")
                navigate('/admin')
            })
            .catch(err => {
                console.log(err)
                toast.error("Email yoki parol hato")
            })
        // if (email.trim() === "sanjarkama26@gmail.com" && password.trim() === "12345678") {
        //     toast.success("Hush Kelibsiz!")
        //     localStorage.setItem("admin-token", "acess")
        //     setIsLoading(false)
        //     navigate("/admin")
        // }
        // else {
        //     toast.error("Email yoki parol hato")
        //     setIsLoading(false)
        // }
    }

    return (
        <div className="container login-wrapper">
            <div className="form-wrapper">
                <h1>Admin Login</h1>
                <form onSubmit={LoginAdmin} className="login-form">
                    <input className="simple__input" required type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                    <div className="password-wrapper flex">
                        <input required type={passwordVisible ? "text" : "password"} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                        {passwordVisible ? <FaEye onClick={() => setPasswordVisible(false)} /> : <FaEyeSlash onClick={() => setPasswordVisible(true)} />}
                    </div>
                    <button className="submit-btn">{isLoading ? <AiOutlineLoading className="loading-icon" /> : "Log In"}</button>
                </form>
            </div>
        </div>
    )
}

export default AdminLogin
