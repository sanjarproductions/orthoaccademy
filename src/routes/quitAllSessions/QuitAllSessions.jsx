import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AiOutlineLoading } from "react-icons/ai";
import instance from '../../api/axios'

const QuitAllSessions = () => {
    const [oneTimeCode, setOneTimeCode] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    // let userToken = localStorage.getItem("")
    let navigate = useNavigate("")

    function sendOneTimeCode(e) {
        e.preventDefault()

        setIsLoading(true)
        instance.post("/auth/check-verification-code", {
            input_code: oneTimeCode,
            token: "kfoiisghpoisanhdfbjvnapikjnbadsrfmgnvlkjhbfcsou"
        })
            .then(res => {
                console.log(res)
                setIsLoading(false)
                navigate("/profile")
            })
            .catch(err => {
                setIsLoading(false)
                console.log(err)
            })
    }
    return (
        <>
            <div className="container login-form quit-sessions-wrapper">
                <div className="form-wrapper">
                    <h1>Qayta Kirish</h1>
                    <form onSubmit={sendOneTimeCode}>
                        <input type="text" className="simple__input " onChange={(e) => setOneTimeCode(e.target.value)} placeholder='Email dagi parolni yozing' />
                        <button className="submit-btn">{isLoading ? <AiOutlineLoading className="loading-icon" /> : "Yuborish"}</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default QuitAllSessions
