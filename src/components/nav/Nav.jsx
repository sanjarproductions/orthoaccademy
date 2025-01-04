// import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import Logo from "/logo.png"
import instance from "../../api/axios"
import "./Nav.css"
// import { jwtDecode } from "jwt-decode";


import { MdAccountCircle } from "react-icons/md";
import { FaCartPlus } from "react-icons/fa6";
import { IoMdArrowDropdown } from "react-icons/io";

const Nav = () => {
  const token = localStorage.getItem("user-token")
  // const decoded = jwtDecode(token);
  // console.log(decoded)

  function logout() {
    instance.post(`/auth/logout`, {
      email: "sanjar@gmail.com",
      password: "12345678"
    })
      .then(response => console.log(response.data))
      .catch(err => console.log(err))
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
            <MdAccountCircle className='user-profile__icon' />
            {/* <ul className="profile-links">
              <li onClick={logout}>Log Out</li>
            </ul> */}
          </div>}
      </div>
    </nav >
  )
}

export default Nav
