import "./AdminNav.css";
import { Link } from "react-router-dom";

const AdminNav = () => {
    return (
        <div className="admin-nav__wrapper">

            <Link to={"/admin/create"}></Link>
        </div>
    )
}

export default AdminNav
