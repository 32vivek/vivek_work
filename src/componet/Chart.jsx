import React, { useState, useEffect } from 'react';
import { Typography, Grid, Paper } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { LineChart } from '@mui/x-charts/LineChart';

const Charts = () => {
    const [profit, setProfit] = useState(0);
    const targetProfit = 4562;

    useEffect(() => {
        let currentValue = 0;
        const increment = Math.ceil(targetProfit / 50);
        const timer = setInterval(() => {
            if (currentValue >= targetProfit) {
                setProfit(targetProfit);
                clearInterval(timer);
            } else {
                currentValue += increment;
                setProfit(currentValue);
            }
        }, 5);

        return () => clearInterval(timer);
    }, []);

    const card = (
        <React.Fragment>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="white" textAlign={"start"} gutterBottom>
                    Word of the Day
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <MonetizationOnIcon sx={{ mr: 0.5, color: 'white', fontSize: '35px' }} />
                    <Typography variant="body2" textAlign={"start"} color="white" fontSize={'45px'}>
                        ${profit}
                        <br />
                        {/* {'"a benevolent smile"'} */}
                    </Typography>
                </Box>
                <Typography variant="h5" component="div" color="white" textAlign={"start"}>
                    Profit
                </Typography>
            </CardContent>
        </React.Fragment>
    );

    const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
    const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
    const xLabels = [
        'Page A',
        'Page B',
        'Page C',
        'Page D',
        'Page E',
        'Page F',
        'Page G',
    ];


    return (
        <>
            <Grid container justifyContent="center"
                alignItems="center" sx={{ marginTop: '100px' }} spacing={3}>
                <Grid item lg={4} md={4} sm={12}>
                    <Box sx={{ minWidth: 275 }}>
                        <Paper elevation={6}>
                            <Card variant="outlined" sx={{ backgroundColor: 'rgb(37,39,95)' }}>{card}</Card>
                        </Paper>
                    </Box>
                </Grid>
                <Grid item lg={4} md={4} sm={12}  >
                    <Box sx={{ minWidth: 275 }}>
                        <Paper elevation={6}>
                            <Card variant="outlined" sx={{ backgroundColor: 'green' }}>{card}</Card>
                        </Paper>
                    </Box>
                </Grid>
                <Grid item lg={4} md={4} sm={12}  >
                    <Box sx={{ minWidth: 275 }}>
                        <Paper elevation={6}>
                            <Card variant="outlined" sx={{ backgroundColor: 'orange' }}>{card}</Card>
                        </Paper>
                    </Box>
                </Grid>
            </Grid>
            <Grid container sx={{ marginTop: '10px', marginBottom: '10px' }} spacing={3}   >
                <Grid item sx={12} lg={12} md={12} sm={12}>
                    <Paper elevation={8}>
                        <Typography variant="h6" align="start" sx={{ marginLeft: "10px" }}>
                            Company Details
                        </Typography>
                        <LineChart
                            width={850}
                            height={250}
                            series={[
                                { data: pData, label: 'pv', yAxisKey: 'leftAxisId' },
                                { data: uData, label: 'uv', yAxisKey: 'rightAxisId' },
                            ]}
                            xAxis={[{ scaleType: 'point', data: xLabels }]}
                            yAxis={[{ id: 'leftAxisId' }, { id: 'rightAxisId' }]}
                            rightAxis="rightAxisId"
                        />
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
};

export default Charts;
