import React from 'react'
import Sidenav from '../components/Sidenav'
import Navbar from '../components/Navbar'
import UserForm from '../components/ReactDataTable'
import { Box } from '@mui/material';
const WorkingHours = () => {
    return (
        <div className='bgcolor'>
            <Navbar />
            <Box height="auto">
                <Box sx={{ display: "flex", marginTop: "40px" }}>
                    <Sidenav />
                    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                        <UserForm />
                    </Box>
                </Box>

            </Box>
        </div>
    )
}

export default WorkingHours
