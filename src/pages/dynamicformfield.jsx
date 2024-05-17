import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import { Box } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar';
import Sidenav from '../components/Sidenav';
import Buttton from './../components/button';
import RadioButton from './../components/radiobutton';
import Dropdown1 from '../components/dropdowN1';
import Texxt from "../components/textfield";
import TextareaSizes from "../components/textarea";
import Autocmp from '../components/autocom';

const DynamicField = () => {

    const navigate = useNavigate();

    const gotoArrayForm = () => {
        navigate('/arrayform');
    };

    const initialFormData = {
        Name: "",
        Email: "",
        Address: "",
        Number: "",
        Bio: '',
        Department: "",
        gender: "",
    };

    const [formData, setFormData] = useState(initialFormData);
    const [fieldErrors, setFieldErrors] = useState({});

    const [jsonData] = useState({
        Name: {
            type: 'string',
            label: 'Name',
            minLength: 3,
            maxLength: 15
        },
        Email: {
            type: 'string',
            label: 'Email',
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        },
        Address: {
            type: 'string',
            label: 'Address',
            minLength: 3,
            maxLength: 50
        },
        Number: {
            type: 'string',
            label: 'Number',
            pattern: /^\d{10}$/
        },
        Bio: {
            type: 'string',
            label: 'Bio'
        },
        Department: {
            type: 'array',
            label: 'Department',
            options: ['HR', 'Admin', 'Director']
        },
        gender: {
            type: 'boolean',
            label: 'Gender'
        }
    });

    const handleInputChange = (key, value) => {
        const error = validateField(key, value);
        setFieldErrors(prevErrors => ({
            ...prevErrors,
            [key]: error
        }));
        setFormData(prevData => ({
            ...prevData,
            [key]: value
        }));
    };

    const generateFormFields = () => {
        return Object.keys(jsonData).map((key) => {
            const fieldConfig = jsonData[key];
            const fieldValue = formData[key];
            const error = fieldErrors[key];



            switch (fieldConfig.type) {
                case 'string':
                    if (key === 'Bio') {
                        return (
                            <Grid item xs={12} sm={6} key={key}>
                                <TextareaSizes
                                    label={fieldConfig.label}
                                    value={fieldValue}
                                    onChange={(e) => handleInputChange(key, e.target.value)}
                                    placeholder={`Enter ${fieldConfig.label}`}
                                    error={error}

                                />
                            </Grid>
                        );
                    }
                    return (
                        <Grid item xs={12} sm={6} key={key}>
                            <Texxt
                                label={fieldConfig.label}
                                value={fieldValue}
                                handleInputChange={(event) => handleInputChange(key, event.target.value)}
                                placeholder={`Enter ${fieldConfig.label}`}
                                error={error}

                            />
                        </Grid>
                    );
                case 'boolean':
                    return (
                        <Grid item xs={12} sm={6} key={key} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <RadioButton
                                label={fieldConfig.label}
                                value={fieldValue}
                                onChange={(e) => handleInputChange(key, e.target.value)}
                                style={{ color: 'black', textAlign: 'center' }}
                                error={error}
                            />
                        </Grid>
                    );
                case "array":
                    return (
                        <Grid item xs={12} sm={6} key={key}>
                            <Autocmp
                                label={fieldConfig.label}
                                size="small"
                                value={fieldValue}
                                onChange={(value) => handleInputChange(key, value)}
                                options={fieldConfig.options || []}
                                placeholder={`Select ${fieldConfig.label}`}
                                error={error}
                            />
                        </Grid>
                    );
                default:
                    return null;
            }
        });
    };


    const validateField = (key, value) => {
        const fieldConfig = jsonData[key];
        if (!fieldConfig) {
            return '';
        }

        let error = '';

        if (fieldConfig.minLength && value.length < fieldConfig.minLength) {
            error = `${fieldConfig.label} must be at least ${fieldConfig.minLength} characters`;
        }
        if (fieldConfig.maxLength && value.length > fieldConfig.maxLength) {
            error = `${fieldConfig.label} must be at most ${fieldConfig.maxLength} characters`;
        }
        if (fieldConfig.pattern && !fieldConfig.pattern.test(value)) {
            error = `${fieldConfig.label} must be in the correct format`;
        }
        if (fieldConfig.type === 'array' && !value) {
            error = `Please select ${fieldConfig.label}`;
        }
        return error;
    };

    const handleSubmit = () => {
        const errors = {};
        let hasError = false;
        Object.keys(formData).forEach(key => {
            const fieldData = formData[key];
            const error = validateField(key, fieldData);
            if (error) {
                errors[key] = error;
                hasError = true;
            }
        });

        if (hasError) {
            toast.error('Please fill all required fields !');
            setFieldErrors(errors);
            return;
        }

        console.log('Form data:', formData);
        setFormData(initialFormData);
        toast.success('Form submitted successfully!');
    };

    const handleReset = () => {
        setFormData(initialFormData);
    };

    return (
        <div className="bgcolorD">
            <Navbar />
            <Box height="auto">
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '60px' }}>
                    <Sidenav />
                    <Box component="main"
                        style={{
                            width: '100%',
                            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                            // backgroundColor: "#fff",
                            padding: '10px',
                        }}>
                        <Grid container spacing={2} >
                            <Grid item xs={12}>
                                <Typography variant="h6" style={{ display: 'flex', justifyContent: 'center', fontWeight: 'bold' }}>
                                    Dynamic Form
                                </Typography>
                                <hr style={{ marginTop: '10px', maxWidth: '30%', color: 'black' }} />
                            </Grid>

                            {generateFormFields()}

                            <Grid item xs={12} sm={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 3 }}>
                                    <Box>
                                        <Buttton size="small" color="primary" onClick={handleSubmit} name="Submit" />
                                    </Box>
                                    <Box>
                                        <Buttton name="Reset Form" size="small" style={{ color: "white", backgroundColor: "red" }} onClick={handleReset} />
                                    </Box>
                                    <Box>
                                        <Buttton name="Array Form" size="small" onClick={gotoArrayForm} />
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <ToastContainer />
            </Box>
        </div>
    );
};

export default DynamicField;
