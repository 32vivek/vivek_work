import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import CssBaseline from '@mui/joy/CssBaseline';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input'; // Import Input component
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import { useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';

export default function Login() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');
    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleLogin = async () => {
        try {
            const response = await fetch('http://your-api.com/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (response.ok) {
                // Save JWT token to local storage
                localStorage.setItem('token', data.token);
                // Redirect to the home page
                navigate('/analytics');
            } else {
                setError('Invalid email or password');
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('Login failed');
        }
    };

    return (
        <CssVarsProvider>
            <main>
                <div style={{
                    backgroundImage: "url('https://img.freepik.com/free-photo/vertical-shot-tree-with-dark-cloud_181624-3109.jpg?t=st=1711452818~exp=1711456418~hmac=8fdb6fbeb8d9309661a653c9c18f3f1820278b1c5b9f8a4182dce26c510c393e&w=360')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                }}>
                    <CssBaseline />
                    <Sheet
                        sx={{
                            width: 400,
                            mx: 'auto', // margin left & right
                            my: 10, // margin top & bottom
                            py: 3, // padding top & bottom
                            px: 2, // padding left & right
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                            backgroundColor: 'rgba(255, 255, 255, 0.0)', // More transparent background color
                        }}
                    >
                        <div>
                            {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <LockOutlinedIcon />
                            </Avatar> */}
                            <Typography level="h4" component="h1" textAlign={"center"}  >
                                <b style={{ color: "white" }}>Welcome!</b>
                            </Typography>
                            <Typography level="body-sm" textAlign={"center"} style={{ color: "white" }}>Sign in to continue.</Typography>
                        </div>
                        <FormControl>
                            <FormLabel required style={{ color: "white" }}>Email</FormLabel>
                            <Input
                                name="email"
                                type="email"
                                placeholder="johndoe@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel required style={{ color: "white" }}>Password</FormLabel>
                            <Input
                                name="password"
                                type="password"
                                placeholder="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </FormControl>
                        {error && (
                            <Typography color="error" sx={{ mt: 1 }} style={{ color: 'red' }}>
                                {error}
                            </Typography>
                        )}
                        <Button sx={{ mt: 1 }} onClick={handleLogin}  >Log in</Button>
                        <Typography
                            endDecorator={<Link href="/sign-up">Sign up</Link>}
                            fontSize="sm"
                            sx={{ alignSelf: 'center', color: "white" }}
                        >
                            Don&apos;t have an account?
                        </Typography>
                    </Sheet>
                </div>
            </main>
        </CssVarsProvider>
    );
}
