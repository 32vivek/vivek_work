import React from 'react'
import SideBar from '../componet/sidebar/sidebar';
import Charts from '../componet/Chart';
import Grid from '@mui/material/Grid';

const Analytics = () => {
    return (
        <>

            <div>
                <Grid container>
                    <SideBar />
                    <Grid item>
                        <Charts />
                    </Grid>
                </Grid>
            </div>
        </>
    )
}

export default Analytics;