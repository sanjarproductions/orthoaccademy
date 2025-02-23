// import React from 'react'
import "./Footer.css"
import Logo from "/logo-white.png"
import { Link } from "react-router-dom"
import { useLocation } from "react-router-dom";

import { FaTelegram } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
  const location = useLocation()
  const ProtectedRoutes = ["/admin", "/adminlogin", "/admin/create", "/admin/manage", "/admin/allusers"]

  return !ProtectedRoutes.some(route => location.pathname.startsWith(route)) ? (
    <footer>
      <div className="footer-wrapper">
        <div className="container">
          <div className="flex">

            <div className="logo-wrapper">
              <div className="">
                <img src={Logo} alt="" className="footer-logo" />
              </div>
              <p>Toshkent shahar, <br />
                Mirzo Ulug&apos;bek <br />
                tumani, Navoi <br />
                ko&apos;chasi, 11A</p>
            </div>
            <div className="flex-links">
              <ul>
                <li>Links:</li>
                <li><Link to={"/"}>Home</Link></li>
                <li><Link to={"https://t.me/ortho_academy_bot"}>Ortho Academy Bot</Link></li>
                <li><Link to={"https://t.me/custom_care_bot"}>Aisha Bot</Link></li>
                <li><Link to={"/signup"}>Sign up</Link></li>
                <li><Link to={"/login"}>Login</Link></li>
              </ul>
              <ul>
                <li>Contact:</li>
                <li><a href="tel:+998979175291">+998 97 917 52 91</a></li>
              </ul>
            </div>


          </div>
          <div className="flex sub-footer__flex">
            <p className="desc">© Ortho Academy 2024. Barcha huquqlari himoyalangan.</p>
            <div className="icons">
              <a href="https://t.me/ortho_academy"><FaTelegram /></a>
              <a href="https://www.instagram.com/moonlight_ortho_lab?igsh=MTJhbXJreDV2MmVpcw=="><FaInstagram /></a>
              <a href="https://www.instagram.com/doc.ulugbek.abdusattarov?igsh=M3JsMm5uNTQ5dG5s&utm_source=qr"><FaInstagram /></a>
            </div>
          </div>
        </div>
      </div>

    </footer>
  ) : <></>
}

export default Footer
