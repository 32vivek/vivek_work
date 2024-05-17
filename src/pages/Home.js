
import React from 'react'
import VBarChart from '../chart/Barchart'
import Navbar from './../components/Navbar';
import Sidenav from '../components/Sidenav';
import StorefrontIcon from "@mui/icons-material/Storefront";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import { Box, Card, Grid } from '@mui/material';
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import CountUp from 'react-countup';
import "../Dashboard.css"
import DashAccordion from '../components/AccordionDash'
const Home = () => {
    return (
        <>
            <div className='bgcolorH'>
                <Navbar />
                <Box height="auto">
                    <Box sx={{ display: "flex", marginTop: "60px" }}>
                        <Sidenav />
                        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                            <Grid container spacing={2}>

                                <Grid item xl={3} lg={3} sm={12} xs={12} md={6}>
                                    <Card
                                        className="gradient"
                                    // sx={{ minWidth: 50 + "%", height: 140 }}
                                    >
                                        <div className="iconstylewhite">
                                            <CreditCardIcon />
                                        </div>
                                        <CardContent>
                                            <Typography
                                                gutterBottom
                                                variant="h5"
                                                component="div"
                                                sx={{ color: "#f0fcfc" }}
                                            >
                                                $<CountUp delay={0.2} end={500} duration={0.3} />
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                                sx={{ color: "white" }}
                                            >
                                                Total Earning
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>

                                <Grid item xl={3} lg={3} sm={12} xs={12} md={6}>
                                    <Card
                                        className="gradientlight1"
                                    // sx={{ minWidth: 50 + "%", height: 140 }}
                                    >
                                        <div className="iconstylewhite">
                                            <ShoppingBagIcon />
                                        </div>
                                        <CardContent>
                                            <Typography
                                                gutterBottom
                                                variant="h5"
                                                component="div"
                                                sx={{ color: "#f0fcfc" }}
                                            >
                                                $<CountUp delay={0.2} end={900} duration={0.4} />
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                                sx={{ color: "white" }}
                                            >
                                                Total Order
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xl={3} lg={3} sm={12} xs={12} md={6}>
                                    <Card
                                        className="gradient2"
                                    // sx={{ minWidth: 50 + "%", height: 140 }}
                                    >
                                        <div className="iconstylewhite">
                                            <CreditCardIcon />
                                        </div>
                                        <CardContent>
                                            <Typography
                                                gutterBottom
                                                variant="h5"
                                                component="div"
                                                sx={{ color: "#f0fcfc" }}
                                            >
                                                $<CountUp delay={0.2} end={500} duration={0.3} />
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                                sx={{ color: "white" }}
                                            >
                                                Total Earning
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xl={3} lg={3} sm={12} xs={12} md={6}>
                                    <Card
                                        className="gradientlight"
                                    // sx={{ minWidth: 50 + "%", height: 140 }}
                                    >
                                        <div className="iconstylewhite">
                                            <ShoppingBagIcon />
                                        </div>
                                        <CardContent>
                                            <Typography
                                                gutterBottom
                                                variant="h5"
                                                component="div"
                                                sx={{ color: "white" }}
                                            >
                                                $<CountUp delay={0.2} end={900} duration={0.4} />
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                                sx={{ color: "#ccd1d1" }}
                                            >
                                                Total Order
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                {/* </Stack> */}
                            </Grid>
                            {/* <Grid item xs={4}>
                                    <Stack spacing={2}>
                                        <Card className="gradientlight">
                                            <Stack spacing={2} direction="row">
                                                <div className="iconstylewhite">
                                                    <StorefrontIcon />
                                                </div>
                                                <div className="paddingall">
                                                    <span className="pricetitle fontwhite">$203k</span>
                                                    <br />
                                                    <span className="pricesubtitle fontlightgrey">
                                                        Total Income
                                                    </span>
                                                </div>
                                            </Stack>
                                        </Card>
                                        <Card>
                                            <Stack spacing={2} direction="row">
                                                <div className="iconstyle">
                                                    <StorefrontIcon />
                                                </div>
                                                <div className="paddingall">
                                                    <span className="pricetitle">$203k</span>
                                                    <br />
                                                    <span className="pricesubtitle">Total Income</span>
                                                </div>
                                            </Stack>
                                        </Card>
                                    </Stack>
                                </Grid> */}

                            <Grid container spacing={2} style={{ marginTop: '10px' }}>
                                <Grid item xl={6} lg={6} sm={12} xs={12}>
                                    <Card sx={{ height: 60 + "vh" }}>
                                        {/* <Card  > */}
                                        <CardContent>
                                            <VBarChart />
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xl={6} lg={6} sm={12} xs={12}>
                                    <Card sx={{ height: 60 + "vh" }}>
                                        {/* <Card > */}
                                        <CardContent>
                                            <div className="paddingall">
                                                <span className="pricetitle">Popular Products</span>
                                            </div>
                                            <Box height={10} />
                                            <DashAccordion />
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Box>
            </div>
        </>
    )
}

export default Home
