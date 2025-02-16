// import React from 'react'
// import { useState } from "react"
import "./AdminLogin.css"
// import { Link } from "react-router-dom"

// import { AiOutlineLoading } from "react-icons/ai";
// import { FaEye } from "react-icons/fa";
// import { FaEyeSlash } from "react-icons/fa";

const AdminLogin = () => {
    // const [email, setEmail] = useState("")
    // const [password, setPassword] = useState("")
    // const [passwordVisible, setPasswordVisible] = useState(false)


    return (
        <>Hello Login Admin</>
        // <div className="container login-wrapper">
        //     <div className="form-wrapper">
        //         <h1>Admin Login</h1>
        //         <form onSubmit={Login} className="login-form">
        //             <input required type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        //             <div className="password-wrapper flex">
        //                 <input required type={passwordVisible ? "text" : "password"} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        //                 {passwordVisible ? <FaEye onClick={() => setPasswordVisible(false)} /> : <FaEyeSlash onClick={() => setPasswordVisible(true)} />}
        //             </div>
        //             <button className="submit-btn">{isLoading ? <AiOutlineLoading className="loading-icon" /> : "Log In"}</button>
        //         </form>
        //         <p className="redirect">Dont have an account? <Link to={"/signup"}>Sign Up</Link></p>
        //     </div>
        // </div>
    )
}

export default AdminLogin
