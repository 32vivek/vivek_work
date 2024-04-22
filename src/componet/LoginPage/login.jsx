
import { FormControl, TextField } from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from "@mui/material/Box";
import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
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
import { API_Auth } from "../../API/Api";
import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import CssBaseline from '@mui/material/CssBaseline';
import RefreshAccessToken from "../refreshToken";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});


const defaultTheme = createTheme();
const Login = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [emptyFields, setEmptyFields] = useState({
        email: false,
        password: false
    });
    const handleChange = event => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });

        if (event.target.value.trim() === '') {
            setEmptyFields({
                ...emptyFields,
                [event.target.name]: true,
            });
        } else {
            setEmptyFields({
                ...emptyFields,
                [event.target.name]: false,
            });
        }
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const username = formData.get("email");
        const password = formData.get("password");

        if (!username || !password) {
            toast.error("Please fill in all fields");
            return;
        }

        try {
            const response = await fetch(`${API_Auth}/authenticate`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("login", data);
                localStorage.setItem("token", data.access_token);
                localStorage.setItem("refreshToken", data.refresh_token);
                navigate("/analytics");
            } else {
                const errorData = await response.json();
                toast.error(errorData.message);
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("An unexpected error occurred");
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
            <RefreshAccessToken />
            <ThemeProvider theme={defaultTheme}>
                <Grid container component="main" sx={{ height: '100vh' }}>
                    <CssBaseline />
                    <Grid
                        item
                        xs={false}
                        sm={4}
                        md={7}
                        sx={{
                            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                            backgroundRepeat: 'no-repeat',
                            backgroundColor: (t) =>
                                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />
                    <Grid item xs={12} sm={8} md={5} component={Paper} square>
                        <Card sx={{ width: "100%", boxShadow: 'none' }}>
                            <CardContent style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <Box
                                    sx={{
                                        my: 8,
                                        mx: 4,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                        <LockOutlinedIcon />
                                    </Avatar>
                                    <Typography component="h1" variant="h5">
                                        Sign in
                                    </Typography>
                                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                                        <TextField
                                            fullWidth
                                            required
                                            id="email"
                                            size="small"
                                            name="email"
                                            autoComplete="email"
                                            label="User Name"
                                            placeholder='User Name'
                                            variant="outlined"
                                            value={formData.email}
                                            onChange={handleChange}

                                            sx={{
                                                borderRadius: '16px',
                                                mb: '15px',
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: '16px',
                                                    borderColor: emptyFields.email ? 'red' : undefined
                                                }
                                            }}
                                            error={emptyFields.email}
                                            InputProps={{
                                                sx: {
                                                    borderRadius: '16px',
                                                },
                                                // startAdornment: (
                                                //     <InputAdornment position="start">
                                                //         <AccountCircleIcon />
                                                //     </InputAdornment>
                                                // )


                                            }}

                                        />
                                        <TextField
                                            fullWidth
                                            required
                                            size="small"
                                            name="password"
                                            label="Password"
                                            type={showPassword ? "text" : "password"}
                                            id="password"
                                            autoComplete="new-password"
                                            variant="outlined"
                                            value={formData.password}
                                            onChange={handleChange}
                                            sx={{
                                                borderRadius: '12px',
                                                mb: '15px',
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: '12px',
                                                    borderColor: emptyFields.password ? 'red' : undefined
                                                }
                                            }}
                                            error={emptyFields.password}
                                            InputProps={{
                                                sx: {
                                                    borderRadius: '12px',
                                                },
                                                // startAdornment: (
                                                //     <InputAdornment position="start">
                                                //         <LockIcon />
                                                //     </InputAdornment>
                                                // ),
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

                                        {/* <FormControlLabel
                                                control={<Checkbox value="remember" color="primary" />}
                                                label="Remember me"
                                            /> */}
                                        <FormControl fullWidth>
                                            <Button type="submit" variant="contained" size="small" sx={{ borderRadius: '12px' }}>Sign In</Button>
                                        </FormControl>
                                        <Grid container
                                            sx={{ marginTop: "20px" }}>
                                            <Grid item xs>
                                                <Typography variant="body1" component="span"  >
                                                    <Link to="#" style={{ textDecoration: "none" }}>
                                                        Forgot Password?
                                                    </Link>
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="body1" component="span" style={{ display: "flex", justifyContent: "end", alignItems: "end" }}>
                                                    <Link to="#" style={{ textDecoration: "none" }}>
                                                        Sign - Up
                                                    </Link>
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </ThemeProvider>
        </>
    );
};

export default Login;
