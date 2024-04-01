import React from 'react'
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { FormControl, Typography, TextareaAutosize } from '@mui/material';
import SideBar from './sidebar/sidebar';
const ContactDetails = () => {

    return (

        <>
            <Grid container spacing={4} sx={{ marginTop: "100px", marginBottom: '100px' }} >
                <SideBar />
                <Grid item sx={6} lg={6} md={6} sm={12}>
                    <Paper elevation={8}>
                        <Typography variant='h6'>
                            Personal Information
                        </Typography>
                        <FormControl>
                            <Box
                                component="form"
                                sx={{
                                    '& > :not(style)': { m: 1, width: '30ch' },
                                }}
                                noValidate
                                autoComplete="off"
                            >
                                <TextField
                                    id="filled-read-only-input"
                                    label="Name"
                                    defaultValue="Vivek Singh"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    variant="filled"
                                />
                                <TextField id="filled-read-only-input"
                                    label="Email"
                                    defaultValue="vivek@gmail.com"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    variant="filled" />
                            </Box>
                            <Box
                                component="form"
                                sx={{
                                    '& > :not(style)': { m: 1, width: '30ch' },
                                }}
                                noValidate
                                autoComplete="off"
                            >
                                <TextField
                                    id="filled-read-only-input"
                                    label="Number"
                                    defaultValue="9878789845"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    variant="filled"
                                />
                                <TextField id="filled-read-only-input"
                                    label="Location"
                                    defaultValue="India"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    variant="filled" />
                            </Box>
                        </FormControl>
                        <FormControl>
                            <Box
                                component="form"
                                sx={{
                                    '& > :not(style)': { m: 1, width: '35ch' },
                                }}
                                noValidate
                                autoComplete="off"
                            >
                                <TextareaAutosize
                                    aria-label="Bio"
                                    placeholder="Name"
                                    defaultValue="bsyufgvw8 ijbefuiwgef bijcbsodf jbf9qwf8u oqhifon joefg98q cbuwfhy9w kajsbfoa"
                                    readOnly
                                    style={{ width: '100%', minHeight: 100 }}
                                    variant="filled"
                                />
                            </Box>
                        </FormControl>
                    </Paper>
                </Grid>
            </Grid>
        </>
    )
}

export default ContactDetails
