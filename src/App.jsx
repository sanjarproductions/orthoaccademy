// import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'

import Nav from './components/nav/Nav'
import Footer from './components/footer/Footer'

import Home from './routes/home/Home'
import Course from './routes/course/Course'
import Login from './routes/login/Login'
import Signup from './routes/signup/Signup'
import Dashboard from './routes/dashboard/Dashboard'

import { ToastContainer } from "react-toastify"

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/dashboard/:id' element={<Dashboard />} />
        <Route path='/course/:id' element={<Course />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
      <Footer />
      <ToastContainer limit={2} />
    </>
  )
}

export default App


// home page +
// sign up page +
// login page +
// log out +
// about course page (courses/1) +
// invoice (pay page) stripe
// watch the course (page)

// admin
// admin / add course
// admin / del course
// admin / change the course

// mobile

// profile page
// profile / all courses
// profile / logout
// prfile / 