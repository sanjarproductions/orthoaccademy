function validateAdminToken(token) {
    if (!token) return false;

    try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        return new Date().getTime() < payload.exp * 1000;
    } catch (error) {
        console.error("Invalid token:", error);
        return false; 
    }
}

export default validateAdminToken;