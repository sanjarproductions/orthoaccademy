// import React from 'react'
import { useState } from "react"
import instance from "../../api/axios"
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  function SignUp(e) {
    e.preventDefault()

    instance.post("/auth/login", {
      email: email,
      password: password
    })
      .then(response => {
        console.log(response.data)
        toast.success(response.message)
      })
      .catch(error => {
        console.log(error)
        toast.error(error.response.data.detail)
      })
    console.log(email, password)
  }
  return (
    <>
      <div className="container">
        <h1>Login</h1>
        <form onSubmit={SignUp}>
          <input type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
          <input type="password" minLength={8} placeholder="password" onChange={(e) => setPassword(e.target.value)} />
          <button>click</button>
        </form>
      </div>

    </>
  )
}

export default Login
