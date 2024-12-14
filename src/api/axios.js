import axios from "axios";

const instance = axios.create({
    baseURL: "https://backend-ortho-site-api-66d73427bd8c.herokuapp.com/api/v1.0/",
    // baseURL: "https://jsonplaceholder.typicode.com/",
})

export default instance