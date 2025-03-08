const initialState = {
    isLogged: false,
    token: localStorage.getItem("user-token") || "",
}
const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOGIN":
            localStorage.setItem("user-token", action.payload.data.token);
            return ({
                isLogged: true,
                token: action.payload.data.token
            })
        case "LOGOUT":
            localStorage.removeItem("user-token")
            return ({
                isLogged: false,
                token: "",
            })
        default: return state
    }
}
export default loginReducer