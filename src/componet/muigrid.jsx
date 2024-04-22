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
import SideBar from "./sidebar/sidebar";
import { API_Auth } from "../API/Api";
import Box from "@mui/material/Box";

const UserDetails = () => {
    const [userDetails, setUserDetails] = useState(null);

    const fetchUserDetails = async () => {
        try {
            const response = await fetch(`${API_Auth}/user/detail`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

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

    return (
        <>
            <Grid mt="100px">
                <Box style={{ width: "80%", marginLeft: "130px" }}>
                    <Paper elevation={8}>
                        <Card variant="outlined">
                            {/* sx={{ aspectRatio: '16 / 9' }} */}
                            <CardContent>
                                <Typography
                                    variant="h5"
                                    component="h2"
                                    fontStyle="bold"
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    USER PROFILE
                                </Typography>
                                <hr />
                                <Grid container spacing={1}>
                                    <Grid item lg={4} md={4} sx={{ marginTop: "10px" }} >
                                        <Paper elevation={2}>
                                            <Card variant="outlined" sx={{ width: "100%" }} >
                                                <CardContent>
                                                    <Typography
                                                        variant="h6"
                                                        component="h2"
                                                        fontSize="15px"
                                                        display="flex"
                                                        justifyContent="center"
                                                        alignItems="center"
                                                    >
                                                        {userDetails && userDetails.fullName}
                                                    </Typography>
                                                    <hr />
                                                    <EmailIcon fontSize="13px" />
                                                    <span style={{ marginLeft: "15px" }}>

                                                        {userDetails && userDetails.email}
                                                    </span>
                                                    <hr />
                                                    <PhoneIcon fontSize="13px" />
                                                    <span style={{ marginLeft: "15px" }}>

                                                        {userDetails && userDetails.mobileNumber}
                                                    </span>
                                                </CardContent>
                                                <CardActions>
                                                    <Button size="small">Edit</Button>
                                                    <Button size="small">Delete</Button>
                                                </CardActions>
                                            </Card>
                                        </Paper>
                                    </Grid>
                                    <Grid item lg={8} md={8} sx={{ marginTop: "10px" }}  >
                                        <Paper elevation={2}>
                                            <Card variant="outlined" sx={{ width: "100%" }}  >
                                                <CardContent>
                                                    <Typography
                                                        variant="h6"
                                                        fontSize="13px"
                                                        component="h2"
                                                        display="flex"
                                                        justifyContent="center"
                                                        alignItems="center"
                                                        color="black"
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
            <SideBar userDetails={userDetails} />
        </>
    );
};

export default UserDetails;
