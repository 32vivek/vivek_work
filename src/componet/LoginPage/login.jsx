import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import CssBaseline from '@mui/joy/CssBaseline';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import { useNavigate } from 'react-router-dom';

function ModeToggle() {
    // const [loggedInUser, setLoggedInUser] = useState('');
}

export default function Login() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');
    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleLogin = () => {
        if (email === 'vivek@gmail.com' && password === '12345') {
            // Successful login
            setError('');
            // Redirect to the home page
            navigate('/analytics');
            console.log('Login successful!');
        } else {
            setError('Invalid email or password');
        }
    };

    return (
        <CssVarsProvider>
            <main>
                <ModeToggle />
                <div style={{
                    backgroundImage: "url('https://img.freepik.com/free-photo/vertical-shot-tree-with-dark-cloud_181624-3109.jpg?t=st=1711452818~exp=1711456418~hmac=8fdb6fbeb8d9309661a653c9c18f3f1820278b1c5b9f8a4182dce26c510c393e&w=360')",

                    backgroundColor: 'rgba(255, 255, 255, 0.5)',
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
                            borderRadius: 'sm',
                            boxShadow: 'md',
                        }}
                        variant="outlined"
                    >
                        <div>
                            <Typography level="h4" component="h1" textAlign={"center"}>
                                <b>Welcome!</b>
                            </Typography>
                            <Typography level="body-sm" textAlign={"center"}>Sign in to continue.</Typography>
                        </div>
                        <FormControl>
                            <FormLabel>Email</FormLabel>
                            <Input
                                // html input attribute
                                name="email"
                                type="email"
                                placeholder="johndoe@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Password</FormLabel>
                            <Input
                                // html input attribute
                                name="password"
                                type="password"
                                placeholder="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </FormControl>
                        {error && (
                            <Typography color="error" sx={{ mt: 1 }}>
                                {error}
                            </Typography>
                        )}
                        <Button sx={{ mt: 1 /* margin top */ }} onClick={handleLogin}>Log in</Button>

                        <Typography
                            endDecorator={<Link href="/sign-up">Sign up</Link>}
                            fontSize="sm"
                            sx={{ alignSelf: 'center' }}
                        >
                            Don&apos;t have an account?
                        </Typography>
                    </Sheet>
                </div>
            </main>
        </CssVarsProvider>
    );
}
