import "./AdminNav.css";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { GoHomeFill } from "react-icons/go";
const AdminNav = () => {
    return (
        <div id="nav-bar">
            <input id="nav-toggle" type="checkbox" />
            <div id="nav-header"><p id="nav-title">Ortho Academy</p>
                <label htmlFor="nav-toggle"><span id="nav-toggle-burger"></span></label>
                <hr />
            </div>
            <div id="nav-content">
                <div className="nav-button"><GoHomeFill className="fas fa-palette"></GoHomeFill> <Link to={"/admin"}><span>Main</span></Link></div>
                <div className="nav-button"><FaPlus className="fas fa-palette"></FaPlus> <Link to={"/admin/create"}><span>Create</span></Link></div>
                <div className="nav-button"><FaPlus className="fas fa-palette"></FaPlus> <Link to={"/admin/update"}><span>Update</span></Link></div>
                <div className="nav-button"><FaPlus className="fas fa-palette"></FaPlus> <Link to={"/admin/delete"}><span>Delete</span></Link></div>
                <div id="nav-content-highlight"></div>
            </div>
            <input id="nav-footer-toggle" type="checkbox" />
            <div id="nav-footer">
                <div id="nav-footer-heading">
                    <div id="nav-footer-avatar"><img src="https://gravatar.com/avatar/4474ca42d303761c2901fa819c4f2547" /></div>
                    <div id="nav-footer-titlebox"><p id="nav-footer-title">uahnbu</p><span id="nav-footer-subtitle">Admin</span></div>
                </div>
            </div>
        </div>
    )
}

export default AdminNav
