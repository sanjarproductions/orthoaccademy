import axios from "axios";
import validateToken from "../helpers/validateAdminToken";

const instance = axios.create({
    baseURL: "https://backend-ortho-site-api-66d73427bd8c.herokuapp.com/api/v1.0",
});

// Add request interceptor for token validation
instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("user-token");
        if (token && !validateToken(token)) {
            // Token is invalid/expired
            localStorage.removeItem("user-token");
            window.location.href = "/login";
            return Promise.reject("Token expired");
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instance;