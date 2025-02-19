import Nav from './components/nav/Nav'
import Footer from './components/footer/Footer'
import ScrollToTop from './components/scrollToTop/ScrollToTop'
import Home from './routes/home/Home'
import UserProfile from './routes/userProfile/UserProfile'
import UserCourses from './routes/userCourses/userCourses'
import Course from './routes/course/Course'
import Login from './routes/login/Login'
import Signup from './routes/signup/Signup'
import Dashboard from './routes/dashboard/Dashboard'
import Admin from './routes/admin/Admin'
import Private from './routes/private/Private'
import AdminLogin from './routes/adminLogin/AdminLogin'
import Update from './routes/admin/update/Update'
import Create from './routes/admin/create/Create'
import Delete from './routes/admin/delete/Delete'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from "react-toastify"
import './App.css'

function App() {
  return (
    <>
      <ScrollToTop />
      <Nav />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/dashboard/:id' element={<Dashboard />} />
        <Route path='/course/:id' element={<Course />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/profile' element={<UserProfile />} />
        <Route path='/profile/courses' element={<UserCourses />} />
        <Route path='adminlogin' element={<AdminLogin />}></Route>

        <Route path='/' element={<Private />}>
          <Route path='/admin' element={<Admin />}>
            <Route path='/admin/create' element={<Create />} />
            <Route path='/admin/update' element={<Update />} />
            <Route path='/admin/delete' element={<Delete />} />
          </Route>
        </Route>
      </Routes>

      <Footer />
      <ToastContainer limit={2} />
    </>
  )
}

export default App



// admin, watch the course page, payment


// fix the proble with token getting old & etc
// do something with the redux & local storage problem (no getting saved) /Behzod is working
// have to make a sceleton (home page, what the course, course/1)


// invoice (pay page)
// watch the course (page) - process
// about course page (courses/1) +


// admin
// admin / add course
// admin / del course
// admin / change the course


// mobile







// //////////////








// home page +
// sign up page +
// login page +
// log out +         (timer for updating the token, do smt with redux bcz it's getting wanished after an update)
// profile / all courses +
// profile / logout + 
// profile / +




// fix the problem in Nav (to fetch the pic, if only there is a token) +
// fix the problem with the footer's styles +


//security
// - "Parolni unutdingizmi?" havolasi reset-password saxifasiga olib boradi.

// - **Reset-password saxifasi**:

//   - Email orqali parolni tiklash formasi.
//   - Yangi parol o'rnatish uchun havola yuboriladi.

// - **One Time Password Send saxifasi**:

//   - Foydalanuvchi email kiritadi va bir martalik parol yuboriladi.

// - **One Time Password Verifikatsiya saxifasi**:

//   - Kiritilgan parolni tasdiqlash uchun forma.