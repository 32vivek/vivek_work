import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './sign.css';

const defaultTheme = createTheme();

export default function SignUp() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        allowExtraEmails: false,
    });

    const handleChange = (event) => {
        const { name, value, checked } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: name === 'allowExtraEmails' ? checked : value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData);
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <div style={{ backgroundImage: "url('https://img.freepik.com/free-photo/vertical-shot-tree-with-dark-cloud_181624-3109.jpg?t=st=1711452818~exp=1711456418~hmac=8fdb6fbeb8d9309661a653c9c18f3f1820278b1c5b9f8a4182dce26c510c393e&w=360')", backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
                <Container
                    component="main"
                    maxWidth="xs"
                >
                    <Box
                        sx={{
                            marginTop: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5" style={{ color: '#fff' }}>
                            Register Yourself
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}  >
                                    <TextField
                                        autoComplete="given-name"
                                        name="firstName"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        autoFocus
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        InputProps={{
                                            className: 'white-input',
                                            style: { color: '#fff' }
                                        }}
                                        InputLabelProps={{
                                            className: 'white-label',
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}  >
                                    <TextField
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="family-name"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        InputProps={{
                                            className: 'white-input',
                                            style: { color: '#fff' }
                                        }}
                                        InputLabelProps={{
                                            className: 'white-label',
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        InputProps={{
                                            className: 'white-input',
                                            style: { color: '#fff' }
                                        }}
                                        InputLabelProps={{
                                            className: 'white-label',
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        InputProps={{
                                            className: 'white-input',
                                            style: { color: '#fff' }
                                        }}
                                        InputLabelProps={{
                                            className: 'white-label',
                                        }}
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign Up
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href="/" variant="body2" style={{ color: '#fff' }}>
                                        Already have an account? Sign in
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </div>
        </ThemeProvider>
    );
}
