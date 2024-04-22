// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const checkTokenExpiry = () => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//         return true; // Token does not exist
//     }

//     const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decoding token payload
//     const expiryTime = decodedToken.exp * 1000;
//     const currentTime = Date.now();

//     return expiryTime < currentTime; // Returns true if token is expired
// };

// const RedirectOnTokenExpiry = () => {
//     const navigate = useNavigate();

//     useEffect(() => {
//         if (checkTokenExpiry()) {
//             navigate("/"); // Redirect to login page if token is expired
//         }
//     }, []);

//     return null; // This component doesn't render anything visible
// };

// export default RedirectOnTokenExpiry;
