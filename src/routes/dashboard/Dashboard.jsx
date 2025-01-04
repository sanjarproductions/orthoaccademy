// import React from 'react'
import { useEffect } from "react";
import "./Dashboard.css"
import { jwtDecode } from "jwt-decode";
import instance from "../../api/axios"

const Dashboard = () => {
  const token = localStorage.getItem("user-token")
  const decoded = jwtDecode(token);
  console.log(decoded.sub)

  // useEffect(() => {
  //   instance(`/users?user_id=${decoded.sub}`)
  //   .then(response => console.log(response.data)) 
  //   .catch(err => console.log(err))
  // }, [decoded.sub])

  // useEffect(() => {
  //   instance(`/dashboards?user_id=${decoded.sub}`, {

  //   })
  //   .then(response => console.log(response.data)) 
  //   .catch(err => console.log(err))
  // }, [decoded.sub])

  useEffect(() => {
    instance(`/vidoes`, {
      dashboard_id: 1,
      token
    })
    .then(response => console.log(response.data)) 
    .catch(err => console.log(err))
  }, [token])

  return (
    <>
      <div className="dashboard">
        <div className="container">
          hi Im Dashboard
        </div>
      </div>
    </>
  )
}

export default Dashboard
