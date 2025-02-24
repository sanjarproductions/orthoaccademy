function validateAdminToken(token) {
    if (!token) return false;

    try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        return new Date().getTime() < payload.exp * 1000; // Check if token is still valid
    } catch (error) {
        console.error("Invalid token:", error);
        return false; // Treat errors as an invalid token
    }
}

export default validateAdminToken;