import { Navigate, Outlet } from "react-router-dom";
import validateToken from "../../helpers/validateAdminToken"

const UserPrivateRoute = () => {
    const userToken = localStorage.getItem("user-token");

    if (!userToken || !validateToken(userToken)) {
        localStorage.removeItem("user-token");
        return <Navigate to="/login" />;
    }

    return <Outlet />;
}

export default UserPrivateRoute
