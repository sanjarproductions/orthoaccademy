import { useState } from 'react'
import { toast } from 'react-toastify';
import instance from "../../../api/axios"

const ConfirmReset = () => {
    const [userSecretCode, setUserSecretCode] = useState("");
    const [userNewPassword, setUserNewPassword] = useState("");

    function ConfirmResetPassword(e) {
        e.preventDefault();

        let resetPasswordBody = {
            token: userSecretCode,
            new_password: userNewPassword
        }
        instance.post("/auth/reset_password", resetPasswordBody)
            .then(response => {
                toast.success(response.data.message)
            })
            .catch(err => {
                toast.error(err.response.statusText)
            })
    }
    return (
        <div className='container'>
            <div className="reset-password-wrapper">
                <form onSubmit={ConfirmResetPassword}>
                    <input required className="simple__input" type="text" placeholder="Yangi Parol kiriting" onChange={(e) => setUserSecretCode(e.target.value)} />
                    <input required className="simple__input" type="text" placeholder="Yangi Parol qayta kiriting" onChange={(e) => setUserNewPassword(e.target.value)} />
                    <button className='submit-btn'>Tasdiqlash</button>
                </form>
            </div>
        </div>
    )
}

export default ConfirmReset
