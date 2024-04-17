import { FormControl, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import bg from "../../pages/bg/signin.svg";
import bgimg from "../../pages/bg/backimg.jpg";
import { API_Auth } from "../../API/Api";
const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});

const boxstyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "75%",
    height: "70%",
    bgcolor: "background.paper",
    boxShadow: 24,
};

const center = {
    position: "relative",
    top: "50%",
    left: "37%",
};


// const API = "http://192.168.1.14:9900/userms"

export default function Login() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const checkTokenExpiration = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) return true;

                const [header, payload, signature] = token.split(".");
                if (!payload) throw new Error("Invalid token payload");

                const decodedToken = JSON.parse(atob(payload));
                const expirationTime = decodedToken.exp * 1000;

                return Date.now() >= expirationTime;
            } catch (error) {
                console.error("Error checking token expiration:", error);
                return true;
            }
        };

        const handleExpiredToken = async () => {
            if (await checkTokenExpiration()) {
                try {
                    const newToken = await refreshToken();
                    localStorage.setItem("token", newToken);
                } catch (error) {
                    console.error("Error refreshing token:", error);

                }
            }
        };

        handleExpiredToken();
    }, []);

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();

            const formData = new FormData(event.currentTarget);
            const username = formData.get("email");
            const password = formData.get("password");

            if (!username || !password) {
                toast.error("Please fill in all fields");
                return;
            }

            const userData = {
                username,
                password,
            };

            const response = await fetch(
                `${API_Auth}/authenticate`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(userData),
                }
            );

            if (response.ok) {
                try {
                    const data = await response.json();
                    console.log("Response data:", data);

                    const { access_token, refresh_token } = data;

                    localStorage.setItem("token", access_token);
                    localStorage.setItem("refreshToken", refresh_token);

                    // Now fetch user details using the access token
                    await fetchUserDetails(access_token);

                    // Navigate to analytics page
                    navigate("/analytics");
                } catch (error) {
                    console.error("Error parsing response data:", error);
                    toast.error("An unexpected error occurred while processing the response");
                }
            } else {
                const errorData = await response.json();
                const { message } = errorData;
                toast.error(message);
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("An unexpected error occurred");
        }
    };

    const fetchUserDetails = async (accessToken) => {
        try {
            const response = await fetch(
                `${API_Auth}/detail`,
                {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${accessToken}`,
                    },
                }
            );

            if (response.ok) {
                const userData = await response.json();
                console.log("User details:", userData);
                // Do something with user details
            } else {
                throw new Error("Failed to fetch user details");
            }
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    };


    const refreshToken = async () => {
        try {
            const refreshToken = localStorage.getItem("refreshToken");
            // console.log("Refresh token:", refreshToken);
            const response = await fetch(
                "http://52.220.38.150:9900/userms",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ refreshToken }),
                }
            );
            if (response.ok) {
                const { token } = await response.json();
                console.log("New access token after refresh:", token);
                return token;
            } else {
                throw new Error("Refresh failed");
            }
        } catch (error) {
            console.error("Refresh error:", error);
            throw error;
        }
    };

    const handleClickShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <>
            <ToastContainer />
            <div
                style={{
                    backgroundImage: `url(${bgimg})`,
                    backgroundSize: "cover",
                    height: "80vh",
                    color: "#f5f5f5",
                }}
            >
                <Box sx={boxstyle}>
                    <Grid container>
                        <Grid item xs={12} sm={12} lg={6}>
                            <Box
                                style={{
                                    backgroundImage: `url(${bg})`,
                                    backgroundSize: "cover",
                                    marginTop: "40px",
                                    marginLeft: "15px",
                                    marginRight: "15px",
                                    height: "63vh",
                                    color: "#f5f5f5",
                                }}
                            ></Box>
                        </Grid>
                        <Grid item xs={12} sm={12} lg={6}>
                            <Box
                                style={{
                                    backgroundSize: "cover",
                                    height: "70vh",
                                    minHeight: "500px",
                                    backgroundColor: "#3b33d5",
                                }}
                            >
                                <ThemeProvider theme={darkTheme}>
                                    <Container>
                                        <Box height={35} />
                                        <Box sx={center}>
                                            <Avatar
                                                sx={{ ml: "35px", mb: "4px", bgcolor: "#ffffff" }}
                                            >
                                                <LockOutlinedIcon />
                                            </Avatar>
                                            <Typography component="h1" variant="h4" >
                                                Sign In
                                            </Typography>
                                        </Box>
                                        <Box
                                            component="form"
                                            noValidate
                                            onSubmit={handleSubmit}
                                            sx={{ mt: 2 }}
                                        >
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                                                    <FormControl fullWidth>
                                                        <TextField
                                                            required
                                                            fullWidth
                                                            id="email"
                                                            name="email"
                                                            autoComplete="email"
                                                            label="User Name"
                                                        />
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                                                    <TextField
                                                        required
                                                        fullWidth
                                                        name="password"
                                                        label="Password"
                                                        type={showPassword ? "text" : "password"}
                                                        id="password"
                                                        autoComplete="new-password"
                                                        InputProps={{
                                                            endAdornment: (
                                                                <InputAdornment position="end">
                                                                    <IconButton
                                                                        aria-label="toggle password visibility"
                                                                        onClick={handleClickShowPassword}
                                                                        onMouseDown={handleMouseDownPassword}
                                                                    >
                                                                        {showPassword ? (
                                                                            <VisibilityOff />
                                                                        ) : (
                                                                            <Visibility />
                                                                        )}
                                                                    </IconButton>
                                                                </InputAdornment>
                                                            ),
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sx={{ ml: "5em", mr: "5em" }}>
                                                    <Button
                                                        type="submit"
                                                        variant="contained"
                                                        display="flex" justifyContent="center" alignItems="center"
                                                        sx={{
                                                            mt: "10px",
                                                            mr: "20px",
                                                            borderRadius: 28,
                                                            color: "#ffffff",
                                                            minWidth: "170px",
                                                            backgroundColor: "#FF9A01",
                                                        }}
                                                    >
                                                        Sign in
                                                    </Button>
                                                </Grid>
                                                <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                                                    <Typography
                                                        variant="body1"
                                                        component="span"
                                                        style={{ marginTop: "10px" }}
                                                    >
                                                        Not registered yet?{" "}
                                                        <span
                                                            style={{
                                                                color: "#beb4fb",
                                                                cursor: "pointer",
                                                            }}
                                                            onClick={() => {
                                                                navigate("/sign-up");
                                                            }}
                                                        >
                                                            Create an Account
                                                        </span>
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </Container>
                                </ThemeProvider>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </div>
        </>
    );
}
