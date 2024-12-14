// import React from 'react'
import "./Footer.css"
import Logo from "/logo.png"
import { Link } from "react-router-dom"

import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer>
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
              <li><a href="tel:+998-90-938-09-10">+998-90-938-09-10</a></li>
            </ul>
          </div>


        </div>
        <div className="flex sub-footer__flex">
          <p className="desc">© Ortho Academy 2024. Barcha huquqlari himoyalangan.</p>
          <div className="icons">
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaLinkedin /></a>
            <a href="https://www.instagram.com/ortho_academy_uz/"><FaInstagram /></a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
