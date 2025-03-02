import { useState } from 'react'
import { toast } from 'react-toastify';
import instance from '../../api/axios'
import "./ResetPassword.css"

const ResetPassword = () => {
    const [userEmail, setUserEmail] = useState("")

    function ResetPassword(e) {
        e.preventDefault();
        instance.post("/auth/reset_password", { email: userEmail })
            .then(response => {
                toast.success(response.data.message)
                console.log(response)
                localStorage.setItem("rest-password-token", response.data.reset_token)
                setUserEmail("")
            })
            .catch(err => {
                toast.error(err.response.statusText)
            })
    }
    
    return (
        <div className='container'>
            <div className="reset-password-wrapper">
                <form onSubmit={ResetPassword}>
                    <input required className="simple__input" type="email" placeholder="Email kiriting" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
                    <button className='submit-btn'>Qayta tiklash</button>
                </form>
            </div>
        </div>
    )
}

export default ResetPassword
