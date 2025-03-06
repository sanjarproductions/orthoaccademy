import { Link, NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaCartPlus } from "react-icons/fa6";
import { IoMdArrowDropdown } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import { MdOutlineAccountCircle } from "react-icons/md";
import instance from '../../api/axios';
import Logo from "/logo.png"
import "./Nav.css"

const Nav = () => {
  const location = useLocation()
  const ProtectedRoutes = ["/admin", "/adminlogin", "/admin/create", "/admin/manage", "/admin/manage/", "/admin/allusers"]
  const token = localStorage.getItem("user-token")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [profilePic, setProfilePic] = useState("")
  const [userProfileData, setUserProfileData] = useState({})
  // const isLogged = useSelector(state => state.login.isLogged) // this limited solution

  useEffect(() => {
    if (!token) return
    instance(`/users/profile?token=${token}`)
      .then(response => setUserProfileData(response.data))
      .catch(err => console.log(err))
  }, [token])

  useEffect(() => {
    if (!token || !userProfileData.full_name) return
    fetch(`https://ui-avatars.com/api/?name=${userProfileData.full_name}`)
      .then(data => setProfilePic(data.url))
  }, [userProfileData.full_name, token])

  function logout() {
    dispatch({ type: "LOGOUT" })
    navigate("/")
  }
  return !ProtectedRoutes.some(route => location.pathname.startsWith(route)) ? (
    <nav>
      <div className='container nav-wrapper flex'>
        <Link to={"/"}>
          <div className="logo">
            <img src={Logo} alt="" />
            <p>OrthoAcademy</p>
          </div>
        </Link>
        <div className="links-wrapper">
          <NavLink className={({ isActive }) => isActive ? "active" : ""} to={"/"}>Asosiy</NavLink>

          <div className="services-link">
            <p>Services <IoMdArrowDropdown /></p>
            <div className="sub-links">
              <a href="https://t.me/ortho_academy_bot">Ortho Academy Bot</a>
              <a href="https://t.me/custom_care_bot">Aisha Bot</a>
            </div>
          </div>

        </div>

        {!token ?
          <div className="action-btns">
            <Link className='action-btn' to={"/login"}> <FaCartPlus /> Kirish</Link>
            <Link className='action-btn' to={"/signup"}>Register</Link>
          </div>
          :
          <div className='user-profile'>

            {/* In case there is gonna be a Profile Pic */}
            {/* <img className="user-profile__icon" src={userProfileData?.profile_pic && userProfileData.profile_pic !== "default_profile_pic.jpg" ? profilePic  : userProfileData.profile_pic} alt="Profile" /> */}

            {/* For now when there is no profile pic */}
            <img className="user-profile__icon" src={userProfileData?.profile_pic && userProfileData.profile_pic !== "default_profile_pic.jpg" ? <></> : profilePic} alt="Profile" />

            <ul className="profile-links">
              <li><Link to={"/profile"}><MdOutlineAccountCircle /> Profile</Link></li>
              <li onClick={logout}> <FiLogOut className='logout-icon__link' /> Log out</li>
            </ul>
          </div>}
      </div>
    </nav >
  ) : <></>
}

export default Nav