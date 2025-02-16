// function validateToken(token) {
//     try {
//         const payload = JSON.parse(atob(token.split(".")[1]));
//         return new Date().getTime() < payload.exp * 1000;
//     } catch (error) {
//         console.error("Invalid token", error);
//         return false; // Treat invalid tokens as expired
//     }
// }

// export default validateToken
