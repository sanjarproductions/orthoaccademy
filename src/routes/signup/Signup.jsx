import "./Signup.css"
import instance from "../../api/axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { toast } from 'react-toastify';
import { AiOutlineLoading } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const Signup = () => {
  const navigateTDashboard = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [userName, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [phone, setPhone] = useState("")
  const [region, setRegion] = useState("")
  const [rank, setRank] = useState("")

  function SignUp(e) {
    e.preventDefault()

    setIsLoading(true)
    instance.post("/auth/register", {
      email: email,
      first_name: fullName,
      phone: phone,
      ranks: rank,
      region: region,
      username: userName,
      password: password,
    })
      .then(response => {
        console.log(response.data)
        navigateTDashboard("/login")
        toast.success(response.message)
        setIsLoading(false)
      })
      .catch(error => {
        console.log(error)
        toast.error(error.response.data.detail)
        setIsLoading(false)
      })
  }


  return (
    <>
      <div className="container signup-wrapper">
        <div className="form-wrapper">
          <h1>Roʻyxatdan oʻtish</h1>
          <form className="signup-form" onSubmit={SignUp}>
            <input className="simple__input" required onChange={(e) => setUserName(e.target.value)} type="text" placeholder="username" />
            <input className="simple__input" required onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" />
            <div className="password-wrapper flex">
              <input required type={passwordVisible ? "text" : "password"} minLength={8} placeholder="Parol" onChange={(e) => setPassword(e.target.value)} />
              {passwordVisible ? <FaEye onClick={() => setPasswordVisible(false)} /> : <FaEyeSlash onClick={() => setPasswordVisible(true)} />}
            </div>

            <div className="line"></div>
            <input className="simple__input" onChange={(e) => setFullName(e.target.value)} type="text" placeholder="Toʻliq ism" />
            <input className="simple__input" onChange={(e) => setPhone(e.target.value)} type="tel" placeholder="+998()" />
            <input className="simple__input" onChange={(e) => setRegion(e.target.value)} type="text" placeholder="Mamlakat/Hudud" />
            <input className="simple__input" onChange={(e) => setRank(e.target.value)} type="text" placeholder="Daraja" />

            <button className="submit-btn">{isLoading ? <AiOutlineLoading className="loading-icon" /> : "Roʻyxatdan oʻtish"}</button>
          </form>
          <p className="redirect">Akkauntingiz bormi? <Link to={"/login"}>Kirish</Link></p>
        </div>
      </div>
    </>

  )
}

export default Signup
