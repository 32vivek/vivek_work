import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import AOS from 'aos';
import 'aos/dist/aos.css';
import FormControl from '@mui/material/FormControl';
import Navbar from '../components/Navbar';
import { Box } from '@mui/material';
import Sidenav from '../components/Sidenav';
import Texxt from '../components/textfield';
import TextareaSizes from '../components/textarea';
import Buttton from './../components/button';
import RadioButton from './../components/radiobutton';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DropdownField from '../components/dropdown';
import Dropdown1 from '../components/dropdowN1';

const DynamicField = () => {
    const initialFormData = {
        Name: "",
        Email: "",
        Address: "",
        Number: "",
        Bio: '',
        Department: [""],
        gender: true,
    };

    const [formData, setFormData] = useState(initialFormData);

    const jsonData = {
        Name: '',
        Email: '',
        Address: '',
        Number: "",
        Department: ['HR', 'Admin', 'Director'],
        Bio: '',
        gender: false,

    };

    function handleInputChange(key, value) {
        setFormData(prevData => ({
            ...prevData,
            [key]: value
        }));
    }

    const generateFormFields = () => {
        return Object.keys(jsonData).map((key) => {
            switch (typeof jsonData[key]) {
                case 'string':
                    if (key === 'bio') {
                        return (
                            <Grid item xs={12} sm={6} key={key}>
                                <div key={key}>
                                    <TextareaSizes
                                        label={key}
                                        value={formData[key]}
                                        placeholder={`Enter ${key}`}
                                        onChange={(e) => handleInputChange(key, e.target.value)}
                                    // onChange={(value) => handleInputChange(key, value)}
                                    />
                                </div>
                            </Grid>
                        );
                    } else {
                        return (
                            <Grid item xs={12} sm={6} key={key}>
                                <Texxt
                                    label={key}
                                    // variant="standard"
                                    value={formData[key]}
                                    handleInputChange={(event) => handleInputChange(key, event.target.value)}
                                    placeholder={`Enter ${key}`}
                                />
                            </Grid>
                        );
                    }
                case 'boolean':
                    return (
                        <Grid item xs={12} sm={6} key={key} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <RadioButton
                                label={key}
                                checked={formData[key]}
                                onChange={(value) => handleInputChange(key, value)}
                                style={{ color: 'black', textAlign: 'center' }}
                            />
                        </Grid>
                    );
                case "object":
                    return (
                        <Grid Grid item xs={12} sm={6} key={key}>
                            <div key={key}>
                                <Dropdown1
                                    label={key}
                                    // placeholder={key}
                                    size="small"
                                    value={formData[key]}
                                    onChange={(value) => handleInputChange(key, value)}
                                    options={jsonData[key]}
                                    placeholder={`Select ${key}`}
                                />
                            </div>
                        </Grid>

                    )
                default:
                    return null;
            }
        });
    };

    const handleSubmit = () => {
        let isValid = true;
        const errors = {};

        // Check if number field exists in JSON data
        const isNumberFieldExists = 'Number' in jsonData;

        // Validate number if it exists in JSON data
        if (isNumberFieldExists) {
            // Check if number field is empty
            if (!formData.Number) {
                errors.Number = "Number is required";
                isValid = false;
            }

            // Validate number
            const numberRegex = /^\d{10}$/;
            if (!numberRegex.test(formData.Number)) {
                errors.Number = "Number must be a 10-digit number";
                isValid = false;
            }
        }

        // Check if name field exists in JSON data
        const isNameFieldExists = 'Name' in jsonData;

        if (isNameFieldExists) {
            if (!formData.Name) {
                errors.Name = "Name is required";
                isValid = false;
            }

            if (formData.Name.length < 3 || formData.Name.length > 15) {
                errors.Name = "Name must be between 3 and 15 characters";
                isValid = false;
            }
        }

        // Validate email
        const isEmailFieldExists = 'Email' in jsonData;

        if (isEmailFieldExists) {
            if (!formData.Email) {
                errors.Email = "Email is required";
                isValid = false;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.Email)) {
                errors.Email = "Invalid Email Address";
                isValid = false;
            }
        }



        //  validate TextArea

        const isBioFieldExists = 'Bio' in jsonData;

        if (isBioFieldExists) {
            if (!formData.Bio) {
                errors.Bio = "Bio is required";
                isValid = false;
            }

            // if (formData.bio.length < 3 || formData.bio.length > 15) {
            //     errors.bio = "Name must be between 3 and 15 characters";
            //     isValid = false;
            // }
        }

        // Validate address
        const isAddressFieldExists = 'Address' in jsonData;

        if (isAddressFieldExists) {
            if (!formData.Address) {
                errors.Address = "Address is required";
                isValid = false;
            }
            if (formData.Address.trim() === "") {
                errors.Address = "Address is required";
                isValid = false;
            }
        }

        if (!isValid) {
            // Display error toast notifications
            Object.values(errors).forEach(error =>
                toast.error(error)
            );
            return;
        }

        // Form is valid, proceed with form submission logic
        console.log('Form data:', formData);

        // Show success toast notification
        toast.success("Form submitted successfully!");
        setFormData(initialFormData);
    };


    const handleReset = () => {
        setFormData(initialFormData);
    }

    return (
        <div className="bgcolor">
            <Navbar />
            <Box height={70}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '60px' }}>
                    <Sidenav />
                    <Box component="main">
                        <Grid
                            container
                            spacing={2}
                            style={{
                                width: '100%',
                                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                                padding: '10px',
                            }}
                        >
                            <Grid item xs={12}>
                                <Typography variant="h6" style={{ display: 'flex', justifyContent: 'center', fontWeight: 'bold' }}>
                                    Dynamic Form
                                </Typography>
                                <hr style={{ marginTop: '10px', width: '30%', color: 'black' }} />
                            </Grid>
                            {generateFormFields()}
                            <Grid item xs={12} sm={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 3 }}>
                                    <Box>
                                        <Buttton size="medium" color="primary" onClick={handleSubmit} name="Submit" />
                                    </Box>
                                    <Box>
                                        <Buttton name="Reset Form" size="medium" style={{ color: "white", backgroundColor: "red" }} onClick={handleReset} />
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Box>
            <ToastContainer />
        </div>
    );
};

export default DynamicField;