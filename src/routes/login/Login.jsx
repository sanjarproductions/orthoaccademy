import instance from "../../api/axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AiOutlineLoading } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
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
        toast.success("Tizimga kirildi")
        setIsLoading(false)
        navigate("/")
        dispatch({ type: "LOGIN", payload: response.data });
      })
      .catch(error => {
        console.log(error)
        toast.error(error.response.data.detail)
        setIsLoading(false)
      })
  }
  return (
    <>
      <div className="container login-wrapper">
        <div className="form-wrapper">
          <h1>Kirish</h1>
          <form onSubmit={Login} className="login-form">
            <input className="simple__input" required type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <div className="password-wrapper flex">
              <input required type={passwordVisible ? "text" : "password"} placeholder="Parol" onChange={(e) => setPassword(e.target.value)} />
              {passwordVisible ? <FaEye onClick={() => setPasswordVisible(false)} /> : <FaEyeSlash onClick={() => setPasswordVisible(true)} />}
            </div>
            <button className="submit-btn">{isLoading ? <AiOutlineLoading className="loading-icon" /> : "Kirish"}</button>
          </form>
          <p className="redirect">Parolni unutdingizmi? <Link to={"/reset-password"}>Click</Link></p>
        </div>
      </div>
    </>
  )
}

export default Login
