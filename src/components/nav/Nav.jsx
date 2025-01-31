import { Link, NavLink } from 'react-router-dom'
import Logo from "/logo.png"
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import RandomPersonPhoto from "../../assets/img.jpeg"
import { useState, useEffect } from 'react';
import instance from '../../api/axios';
import "./Nav.css"

// import { MdAccountCircle } from "react-icons/md";
import { FaCartPlus } from "react-icons/fa6";
import { IoMdArrowDropdown } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import { MdOutlineAccountCircle } from "react-icons/md";

const Nav = () => {
  const token = localStorage.getItem("user-token")
  // const isLogged = useSelector(state => state.login.isLogged) // this limited solution
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [userProfileData, setUserProfileData] = useState({})
  useEffect(() => {
    instance(`/users/profile?token=${token}`)
      .then(response => setUserProfileData(response.data))
      .catch(err => console.log(err))
  }, [token])
  // console.log(userProfileData)

  function logout() {
    dispatch({ type: "LOGOUT" })
    navigate("/")
  }

  return (
    <nav>
      <div className='container nav-wrapper flex'>

        <div className="logo">
          <img src={Logo} alt="" />
          <p>OrthoAcademy</p>
        </div>
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
            {/* <MdAccountCircle className='user-profile__icon' /> */}
            <img className='user-profile__icon' src={userProfileData?.profile_pic == "default_profile_pic.jpg" ? RandomPersonPhoto : userProfileData?.profile_pic == "default_profile_pic.jpg"} alt="" />
            <ul className="profile-links">
              <li><Link to={"/profile"}><MdOutlineAccountCircle /> Profile</Link></li>
              <li onClick={logout}> <FiLogOut className='logout-icon__link' /> Log out</li>
            </ul>
          </div>}
      </div>
    </nav >
  )
}

export default Nav