// import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'

import Nav from './components/nav/Nav'
import Footer from './components/footer/Footer'

import Home from './routes/home/Home'
import UserProfile from './routes/userProfile/UserProfile'
import Course from './routes/course/Course'
import Login from './routes/login/Login'
import Signup from './routes/signup/Signup'
import Dashboard from './routes/dashboard/Dashboard'
import Admin from './routes/admin/Admin'

import { ToastContainer } from "react-toastify"

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/profile' element={<UserProfile/>}/>
        <Route path='/admin' element={<Admin/>}/>
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



// profile, admin, watch the course page, payment


// home page +
// sign up page +
// login page +
// log out +         (timer for updating the token, do smt with redux bcz it's getting wanished after an update)
// about course page (courses/1) +
// invoice (pay page) stripe
// watch the course (page) - process


// admin
// admin / add course
// admin / del course
// admin / change the course

// profile page
// profile / all courses
// profile / logout
// prfile / 


// mobile








//security
// - "Parolni unutdingizmi?" havolasi reset-password saxifasiga olib boradi.

// - **Reset-password saxifasi**:

//   - Email orqali parolni tiklash formasi.
//   - Yangi parol o'rnatish uchun havola yuboriladi.

// - **One Time Password Send saxifasi**:

//   - Foydalanuvchi email kiritadi va bir martalik parol yuboriladi.

// - **One Time Password Verifikatsiya saxifasi**:

//   - Kiritilgan parolni tasdiqlash uchun forma.