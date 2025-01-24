import { Link, NavLink } from 'react-router-dom'
import Logo from "/logo.png"
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import "./Nav.css"

import { MdAccountCircle } from "react-icons/md";
import { FaCartPlus } from "react-icons/fa6";
import { IoMdArrowDropdown } from "react-icons/io";

const Nav = () => {
  const token = localStorage.getItem("user-token")
  // const isLogged = useSelector(state => state.login.isLogged) // this limited solution
  const dispatch = useDispatch()
  const navigate = useNavigate()

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
            <MdAccountCircle className='user-profile__icon' />
            <ul className="profile-links">
              <li onClick={logout}>Log Out</li>
            </ul>
          </div>}
      </div>
    </nav >
  )
}

export default Nav
