import Nav from './components/nav/Nav'
import Footer from './components/footer/Footer'
import ScrollToTop from './components/scrollToTop/ScrollToTop'
import Home from './routes/home/Home'
import UserPrivateRoute from './routes/userPrivateRoute/UserPrivateRoute'
import UserProfile from './routes/userProfile/UserProfile'
import UserCourses from './routes/userCourses/userCourses'
import Course from './routes/course/Course'
import Login from './routes/login/Login'
import Signup from './routes/signup/Signup'
import Dashboard from './routes/dashboard/Dashboard'
import Admin from './routes/admin/Admin'
import Private from './routes/private/Private'
import AdminLogin from './routes/adminLogin/AdminLogin'
import Users from './routes/admin/users/Users'
import Create from './routes/admin/create/Create'
import Manage from './routes/admin/manage/Manage'
import EditCourse from './routes/admin/manage/edit/EditCourse'
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
        <Route path='/course/:id' element={<Course />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='adminlogin' element={<AdminLogin />}></Route>

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



// watch the course page --
// have to make a sceleton (home page, what the course, course/1) + 
// fix the proble with token getting old & etc +
// invoice (pay page)
// mobile
// - **Reset-password saxifasi**:

// May be (because to be proffesional)
// do something with the redux & local storage problem (no getting saved) / Behzod is working









// //////////////








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
// - "Parolni unutdingizmi?" havolasi reset-password saxifasiga olib boradi.

// - **Reset-password saxifasi**:

//   - Email orqali parolni tiklash formasi.
//   - Yangi parol o'rnatish uchun havola yuboriladi.

// - **One Time Password Send saxifasi**:

//   - Foydalanuvchi email kiritadi va bir martalik parol yuboriladi.

// - **One Time Password Verifikatsiya saxifasi**:

//   - Kiritilgan parolni tasdiqlash uchun forma.