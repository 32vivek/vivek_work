import React, { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    Typography,
    CardActions,
    Button,
    Paper,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
// import SideBar from "./sidebar/sidebar";
import { API_Auth } from "../API/Api";
import Box from "@mui/material/Box";
import Tooltip from '@mui/material/Tooltip';
import AOS from 'aos';
import 'aos/dist/aos.css';
// import Buttton from "./button";
import Buttton from "../components/button";
import Navbar from "../components/Navbar";
import Sidenav from "../components/Sidenav";
const UserDetails = () => {
    const [userDetails, setUserDetails] = useState(null);

    const fetchUserDetails = async () => {
        try {

            const getCookie = (name) => {
                const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
                return cookieValue ? cookieValue.pop() : '';
            };

            const token = getCookie('token');

            const response = await fetch(
                `${API_Auth}/user/detail`,
                {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                }
            );

            if (response.ok) {
                const userData = await response.json();
                setUserDetails(userData);
            } else {
                throw new Error("Failed to fetch user details");
            }
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    };



    useEffect(() => {
        fetchUserDetails();
    }, []);

    // console.log(userDetails, "ssss");
    useEffect(() => {
        AOS.init();
    }, []);

    return (
        <>

            <div className=" bgcolor">
                <Navbar />
                <Box height={70}>
                    <Box sx={{ display: "flex", marginTop: "60px" }}>
                        <Sidenav />
                        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                            <Grid container >
                                {/* <SideBar userDetails={userDetails} /> */}
                                <Box style={{ backgroundColor: "rgb(239,213,236)" }}>

                                    <Paper elevation={8}  >
                                        <Card variant="outlined" >

                                            {/* sx={{ aspectRatio: '16 / 9' }} */}
                                            <CardContent  >
                                                <Typography
                                                    variant="h5"
                                                    component="h2"
                                                    fontStyle="bold"
                                                    display="flex"
                                                    justifyContent="center"
                                                    alignItems="center"
                                                    fontWeight="bold"
                                                >
                                                    USER PROFILE
                                                </Typography>
                                                <hr style={{ width: "30%", color: "black" }} />

                                                <Grid container spacing={1}>
                                                    <Grid item lg={4} md={4} sx={{ marginTop: "10px" }} >
                                                        <Paper elevation={2}>
                                                            <Card sx={{ width: "100%", backgroundColor: "rgb(242,243,243)" }} >
                                                                <CardContent>
                                                                    <Typography
                                                                        variant="h6"
                                                                        component="h2"
                                                                        fontSize="15px"
                                                                        display="flex"
                                                                        justifyContent="center"
                                                                        alignItems="center"
                                                                        fontWeight="bold"
                                                                    >
                                                                        {/* {userDetails && userDetails.fullName} */}
                                                                        {(userDetails && userDetails.fullName) ? `${userDetails.fullName} USER` : "USER"}
                                                                    </Typography>
                                                                    <hr />
                                                                    <Tooltip title={userDetails && userDetails.email}>
                                                                        <div style={{ display: "flex", alignItems: "center" }}>
                                                                            <EmailIcon fontSize="small" style={{ color: "rgb(230,113,220)" }} />
                                                                            <span style={{ marginLeft: "8px", maxWidth: "15ch", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                                                                {userDetails && userDetails.email}
                                                                            </span>
                                                                        </div>
                                                                    </Tooltip>
                                                                    <hr />
                                                                    <PhoneIcon fontSize="13px" style={{ color: "rgb(230,113,220)" }} />
                                                                    <span style={{ marginLeft: "20px" }}>

                                                                        {userDetails && userDetails.mobileNumber}
                                                                    </span>
                                                                </CardContent>
                                                                <CardActions>
                                                                    {/* <Button size="small">Edit</Button>
                                                    <Button size="small">Delete</Button> */}
                                                                    <Buttton name="Edit" size="small" color="secondary" />
                                                                    <Buttton name="Delete" size="small" color="warning" />
                                                                </CardActions>
                                                            </Card>
                                                        </Paper>
                                                    </Grid>
                                                    <Grid item lg={8} md={8} sx={{ marginTop: "10px" }}  >
                                                        <Paper elevation={2}>
                                                            <Card variant="outlined" sx={{ width: "100%", backgroundColor: "rgb(242,243,243)" }}
                                                                data-aos="flip-left"
                                                                data-aos-easing="ease-out-cubic"
                                                                data-aos-duration="2000">
                                                                <CardContent>
                                                                    <Typography
                                                                        variant="h6"
                                                                        fontSize="13px"
                                                                        component="h2"
                                                                        display="flex"
                                                                        justifyContent="center"
                                                                        alignItems="center"
                                                                        color="black"
                                                                        fontWeight="bold"
                                                                    >
                                                                        About Me
                                                                    </Typography>
                                                                    <hr />
                                                                    <Typography color="textSecondary" fontSize="13px">
                                                                        body2. Lorem ipsum dolor sit amet, consectetur
                                                                        adipisicing elit. Quos blanditiis tenetur unde suscipit,
                                                                        quam beatae rerum inventore consectetur, neque
                                                                        doloribus, cupiditate numquam dignissimos laborum fugiat
                                                                        deleniti .
                                                                    </Typography>
                                                                    <hr />
                                                                    <Typography
                                                                        variant="h6"
                                                                        fontSize="13px"
                                                                        component="h2"
                                                                        display="flex"
                                                                        justifyContent="center"
                                                                        alignItems="center"
                                                                        color="black"
                                                                        fontWeight="bold"
                                                                    >
                                                                        User Details
                                                                    </Typography>
                                                                    {/* <hr />
                                            <Typography color="black" fontSize="13px">
                                                First Name : <span style={{ color: "rgba(0, 0, 0, 0.54)", marginLeft: "40px" }}>{userDetails && userDetails.firstName}</span>
                                            </Typography>

                                            <hr />
                                            <Typography fontSize="13px" color="black">
                                                Last Name :                                             <span style={{ color: "rgba(0, 0, 0, 0.54)", marginLeft: "40px" }}>{userDetails && userDetails.lastName}</span>

                                            </Typography> */}
                                                                    <hr />
                                                                    <Typography fontSize="13px" color="black">
                                                                        Full Name :
                                                                        <span
                                                                            style={{
                                                                                color: "rgba(0, 0, 0, 0.54)",
                                                                                marginLeft: "40px",
                                                                            }}
                                                                        >
                                                                            {userDetails && userDetails.fullName}
                                                                        </span>
                                                                    </Typography>
                                                                    <hr />
                                                                    <Typography fontSize="13px" color="black">
                                                                        Mobile No :
                                                                        <span
                                                                            style={{
                                                                                color: "rgba(0, 0, 0, 0.54)",
                                                                                marginLeft: "40px",
                                                                            }}
                                                                        >
                                                                            {userDetails && userDetails.mobileNumber}
                                                                        </span>
                                                                    </Typography>
                                                                    <hr />
                                                                    <Typography fontSize="13px" color="black">
                                                                        Email :
                                                                        <span
                                                                            style={{
                                                                                color: "rgba(0, 0, 0, 0.54)",
                                                                                marginLeft: "68px",
                                                                            }}
                                                                        >
                                                                            {userDetails && userDetails.email}
                                                                        </span>
                                                                    </Typography>
                                                                </CardContent>
                                                            </Card>
                                                        </Paper>
                                                    </Grid>
                                                </Grid>
                                            </CardContent>
                                        </Card>
                                    </Paper>
                                </Box>
                            </Grid>
                        </Box>
                    </Box>

                </Box>
            </div>
            {/* <SideBar userDetails={userDetails} /> */}
        </>
    );
};

export default UserDetails;
