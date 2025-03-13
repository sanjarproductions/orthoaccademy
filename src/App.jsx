import Nav from './components/nav/Nav'
import Footer from './components/footer/Footer'
import ScrollToTop from './components/scrollToTop/ScrollToTop'
import Home from './routes/home/Home'
import UserPrivateRoute from './routes/userPrivateRoute/UserPrivateRoute'
import UserProfile from './routes/userProfile/UserProfile'
import UserCourses from './routes/userCourses/UserCourses'
import Course from './routes/course/Course'
import Login from './routes/login/Login'
import ResetPassword from './routes/resetPassword/ResetPassword'
import ConfirmReset from './routes/resetPassword/confirmReset/ConfirmReset'
import Signup from './routes/signup/Signup'
import Dashboard from './routes/dashboard/Dashboard'
import Admin from './routes/admin/Admin'
import Private from './routes/private/Private'
import AdminLogin from './routes/adminLogin/AdminLogin'
import Users from './routes/admin/users/Users'
import Create from './routes/admin/create/Create'
import Manage from './routes/admin/manage/Manage'
import EditCourse from './routes/admin/manage/edit/EditCourse'
import QuitAllSessions from './routes/quitAllSessions/QuitAllSessions'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from "react-toastify"
import './Mobile.css'

function App() {
  return (
    <>
      <ScrollToTop />
      <Nav />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/course/:id' element={<Course />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/confirm-reset' element={<ConfirmReset />} />
        <Route path='/quit-all-sessions' element={<QuitAllSessions />} />
        <Route path='/adminlogin' element={<AdminLogin />}></Route>

        <Route element={<UserPrivateRoute />}>
          <Route path='/profile' element={<UserProfile />} />
          <Route path='/dashboard/:id' element={<Dashboard />} />
          <Route path='/profile/courses' element={<UserCourses />} />
        </Route>

        <Route element={<Private />}>
          <Route path='/admin' element={<Admin />}>
            <Route path='/admin/allusers' element={<Users />} />
            <Route path='/admin/create' element={<Create />} />
            <Route path='/admin/manage' element={<Manage />} />
            <Route path='/admin/manage/:id' element={<EditCourse />} />
          </Route>
        </Route>
      </Routes>

      <Footer />
      <ToastContainer limit={2} />
    </>
  )
}

export default App

// make so even the free courses we should make an order, so that they could later access this course from /profile/courses
// bcz we dont need them to insert their credit card, bro

// mobile +
// translate the entire website to uzbek +

// a fucntion to log-out a user if he has more than 3 active sessions
// payment

// Dashboard
// the video url being shown problem - not worth trying
// the use state reload problem (solve) +
// the description not wrapping problem - not worth it

// Admin
// the only work which has last, is uploading the courses videos & course thumbnail
// i cant work on it right now bcz of the backend not aloowing me to 



























// watch the course page +
// Reset-password saxifasi +
// - make the previous and next btns dynamic depending on if there is a next or oprevious video +
// - To'lov turlari logotiplari +


// userCourses
//  - Kurs progress bari
//  - Boshlash" yoki "Davom ettirish" tugmasi
// May be (because to be proffesional)
// do something with the redux & local storage problem (no getting saved)
// block making a screenshot & recording a video
// - Darsning progress bari (darsning qancha qismi ko'rilganligini ko'rsatadi)


// //////////////






// have to make a sceleton (home page, what the course, course/1) + 
// fix the proble with token getting old & etc +

// home page +
// sign up page +
// login page +
// log out +         (timer for updating the token, do smt with redux bcz it's getting wanished after an update)
// profile / all courses +
// profile / logout + 
// profile / +

// watch the course (page) +
// about course page (courses/1) +

// admin +
// admin / add course +
// admin / del course +
// admin / change the course +

// fix the problem in Nav (to fetch the pic, if only there is a token) +
// fix the problem with the footer's styles +


//security

// - **Reset-password saxifasi**:

//   - Email orqali parolni tiklash formasi.
//   - Yangi parol o'rnatish uchun havola yuboriladi.

// - **One Time Password Send saxifasi**:

//   - Foydalanuvchi email kiritadi va bir martalik parol yuboriladi.

// - **One Time Password Verifikatsiya saxifasi**:

//   - Kiritilgan parolni tasdiqlash uchun forma.