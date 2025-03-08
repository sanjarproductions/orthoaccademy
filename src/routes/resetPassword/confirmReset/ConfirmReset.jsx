import { useState } from 'react'
import { toast } from 'react-toastify';
import instance from "../../../api/axios"
import { useNavigate } from 'react-router-dom';
const ConfirmReset = () => {
    let navigate = useNavigate("")
    const [userNewPassword, setUserNewPassword] = useState("");
    const [verifyNewPassword, setVerifyNewPassword] = useState("");
    const ResetUserPasswordToken = localStorage.getItem("rest-password-token")

    function ConfirmResetPassword(e) {
        e.preventDefault();

        let resetPasswordBody = {
            token: ResetUserPasswordToken,
            new_password: userNewPassword,
            repeat_new_password: verifyNewPassword
        }
        instance.post("/auth/reset_password/confirm", resetPasswordBody)
            .then(response => {
                toast.success(response.data.message)
                setUserNewPassword("");
                setVerifyNewPassword("");
                localStorage.removeItem("reset-password-token")
                navigate('/login')
            })
            .catch(() => {
                toast.error("Hatolik yuz berdi")
            })
    }

    console.log(ResetUserPasswordToken, userNewPassword, verifyNewPassword);

    return (
        <div className='container'>
            <div className="reset-password-wrapper">
                <form onSubmit={ConfirmResetPassword}>
                    <input required className="simple__input" type="text" placeholder="Yangi Parol kiriting" value={userNewPassword} onChange={(e) => setUserNewPassword(e.target.value)} />
                    <input required className="simple__input" type="text" placeholder="Yangi Parol qayta kiriting" value={verifyNewPassword} onChange={(e) => setVerifyNewPassword(e.target.value)} />
                    <button className='submit-btn'>Tasdiqlash</button>
                </form>
            </div>
        </div>
    )
}

export default ConfirmReset
