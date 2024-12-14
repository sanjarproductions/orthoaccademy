// import React from 'react'
import "./Signup.css"
import instance from "../../api/axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Signup = () => {
  const navigateTDashboard = useNavigate()
  // console.log(navigateTDashboard) // navigateTDashboard("/dashboard")

  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  function SignUp(e) {
    // e.preventDefault()

    instance.post("/auth/register", {
      // email: email,
      // first_name: firstname,
      // last_name: lastname,
      // password: password,

      email: "test@example.com",
      first_name: "John",
      last_name: "Doe",
      password: "password123"
    })
      .then(response => {
        console.log(response.data)
      })
      .catch(error => console.log(error))
      //  console.log(typeof (firstname), typeof (lastname), typeof (email), typeof (password))
  }
  SignUp()


  return (
    <>
      <div className="container">
        <div className="form-wrapper">
          <h1>Sign Up</h1>
          <form className="signup-form" onSubmit={SignUp}>
            <input onChange={(e) => setFirstname(e.target.value)} type="text" placeholder="First Name" />
            <input onChange={(e) => setLastname(e.target.value)} type="text" placeholder="Last Name" />
            <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" />
            <input onChange={(e) => setPassword(e.target.value)} type="password" minLength={8} placeholder="Password" />
            <button>Click</button>
          </form>
        </div>
      </div>
    </>

  )
}

export default Signup
