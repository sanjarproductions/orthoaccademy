import instance from "../../api/axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AiOutlineLoading } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import "./Login.css"

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  function Login(e) {
    e.preventDefault()

    setIsLoading(true)
    instance.post("/auth/login", {
      email: email,
      password: password
    })
      .then(response => {
        console.log(response.data)
        setEmail("")
        setPassword("")

        toast.success("Tizimga kirildi")
        setIsLoading(false)
        navigate("/")
        dispatch({ type: "LOGIN", payload: response.data });
      })
      .catch(error => {
        setIsLoading(false)
        if (error.response) {
          if (error.response.status === 412) {
            console.log(error)
            toast.error(error.response.data.detail.message);
            localStorage.setItem("quit-all-sessions-token", error.response.data.detail.token)
            navigate("/quit-all-sessions")
          } else {
            toast.error(error.response.data.detail || "Xatolik yuz berdi");
          }
        } else {
          console.log(error)
          toast.error(error.response.data.detail);
        }
        setEmail("")
        setPassword("")
      })
  }
  return (
    <>
      <div className="container login-wrapper">
        <div className="form-wrapper">
          <h1>Kirish</h1>
          <form onSubmit={Login} className="login-form">
            <input className="simple__input" required type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <div className="password-wrapper flex">
              <input required type={passwordVisible ? "text" : "password"} placeholder="Parol" value={password} onChange={(e) => setPassword(e.target.value)} />
              {passwordVisible ? <FaEye onClick={() => setPasswordVisible(false)} /> : <FaEyeSlash onClick={() => setPasswordVisible(true)} />}
            </div>
            <button className="submit-btn">{isLoading ? <AiOutlineLoading className="loading-icon" /> : "Kirish"}</button>
          </form>
          <p className="reset-password-link">Parolni unutdingizmi? <Link to={"/reset-password"}>Qayta O&apos;rnatish</Link></p>
          <p className="redirect"><Link to={"/signup"}>Registratsiya <FaArrowRightLong /></Link></p>
        </div>
      </div>
    </>
  )
}

export default Login
