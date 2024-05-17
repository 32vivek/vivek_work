import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createSvgIcon } from '@mui/material/utils';
import Navbar from '../components/Navbar';
import Sidenav from '../components/Sidenav';
import { Box, Grid } from '@mui/material';
import Typography from "@mui/material/Typography";
import "../Dashboard.css";
import Texxt from '../components/textfield';
import Autocmp from "../components/autocom";
import RadioButton from '../components/radiobutton';
import Buttton from '../components/button';
import TextareaSizes from '../components/textarea';
import MyCheckbox from '../components/checkboxD';

const initialState = {
    name: '',
    email: '',
    number: '',
    address: '',
    country: '',
    state: '',
    city: '',
    age: '',
    selectedDepartment: '',
    bio: '',
    gender: '',
    responsibilities: [],
};

const ArrayForm = () => {
    const [formData, setFormData] = useState(initialState);
    const [fieldCount, setFieldCount] = useState(1);
    const [bio, setBio] = useState('');
    const [selectedValue, setSelectedValue] = useState('');
    const [gender, setRadioValue] = useState('');
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [formErrors, setFormErrors] = useState({});
    const [visibleFields, setVisibleFields] = useState(Object.keys(initialState).slice(0, fieldCount));

    const data = ['CS', "ECE", "CIVIL"];
    const option = ["HR", "Admin", "Director"];

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        let error = '';

        if (name === "name") {
            if (value.trim().length < 2 || value.trim().length > 20) {
                error = 'Name should be between 2 and 20 characters';
            }
        } else if (name === "email") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                error = 'Invalid email address';
            }
        } else if (name === "number") {
            const numberRegex = /^\d{10}$/;
            if (!numberRegex.test(value)) {
                error = 'Please enter a 10-digit number';
            }
        } else if (name === "country" || name === "city") {
            if (!value.trim()) {
                error = 'This field is required';
            }
        } else if (name === "age") {
            if (value < 1 || value > 150) {
                error = 'Please enter a valid age';
            }
        } else if (name === "gender") {
            if (value !== "male" && value !== "female" && value !== "other") {
                error = 'Please select a gender';
            }
        }

        setFormData({ ...formData, [name]: value });
        setFormErrors({ ...formErrors, [name]: error });
    };

    const handleAutocompleteChange = (event, value) => {
        setFormData({ ...formData, selectedDepartment: value });
    };

    const handleCheckboxChange = (option, checked) => {
        if (checked) {
            setSelectedOptions([...selectedOptions, option]);
        } else {
            setSelectedOptions(selectedOptions.filter((item) => item !== option));
        }
    };

    const handleRemoveField = () => {
        if (fieldCount > 1) {
            setFieldCount(prevCount => prevCount - 1);
            setVisibleFields(Object.keys(initialState).slice(0, fieldCount - 1));
        }
    };

    const handleSubmit = () => {
        let isValid = true;
        const errors = {};

        visibleFields.forEach((fieldName) => {
            let error = '';
            const value = formData[fieldName];

            if (fieldName === 'name' && (value.trim().length < 2 || value.trim().length > 20)) {
                error = 'Name should be between 2 and 20 characters';
            } else if (fieldName === 'email') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    error = 'Invalid email address';
                }
            } else if (fieldName === 'number') {
                const numberRegex = /^\d{10}$/;
                if (!numberRegex.test(value)) {
                    error = 'Please enter a 10-digit number';
                }
            } else if ((fieldName === 'country' || fieldName === 'city') && !value.trim()) {
                error = 'This field is required';
            } else if (fieldName === 'age' && (value < 1 || value > 150)) {
                error = 'Please enter a valid age';
            }

            if (error) {
                isValid = false;
                errors[fieldName] = error;
            }
        });

        setFormErrors(errors);

        if (isValid) {
            const formDatas = { ...formData, responsibilities: selectedOptions, gender: gender || '', bio: bio };
            console.log('Form Data:', formDatas);
            setFormData(initialState);
            setFieldCount(1);
            setBio('');
            // setSelectedOptions([]);
            setSelectedOptions('');
            setRadioValue('');
            setFormData((prevData) => ({ ...prevData, selectedDepartment: '' }));
            setFormErrors({});
            toast.success('Form submitted successfully!', {
                position: 'top-right',
            });
        }
    };


    return (
        <>
            <div className='bgcolor'>
                <ToastContainer />
                <Navbar />
                <Box height="auto">
                    <Box sx={{ display: "flex", marginTop: "60px" }}>
                        <Sidenav />
                        <Box component="main" sx={{ flexGrow: 1, p: 3 }} style={{
                            width: '100%',
                            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                            padding: '10px',
                        }} >
                            <Grid container spacing={2} >
                                <Grid item xs={12}>
                                    <Typography variant="h6" style={{ display: 'flex', justifyContent: 'center', fontWeight: 'bold' }}>
                                        Array Form
                                    </Typography>
                                    <hr style={{ marginTop: '10px', maxWidth: '30%', color: 'black' }} />
                                </Grid>

                                {visibleFields.map((fieldName, index) => (
                                    <Grid key={index} item lg={6} md={6} xl={6} sm={12} xs={12}>
                                        {fieldName === 'name' && (
                                            <Texxt
                                                name="name"
                                                label="Name"
                                                value={formData.name}
                                                handleInputChange={handleInputChange}
                                                formErrors={formErrors}
                                            />
                                        )}
                                        {fieldName === 'email' && (
                                            <Texxt
                                                name="email"
                                                label="Email"
                                                value={formData.email}
                                                handleInputChange={handleInputChange}
                                                formErrors={formErrors}
                                            />
                                        )}
                                        {fieldName === 'address' && (
                                            <Texxt
                                                name="address"
                                                label="Address"
                                                value={formData.address}
                                                handleInputChange={handleInputChange}
                                            />
                                        )}
                                        {fieldName === 'number' && (
                                            <Texxt
                                                name="number"
                                                label="Number"
                                                type="number"
                                                value={formData.number}
                                                handleInputChange={handleInputChange}
                                                formErrors={formErrors}
                                            />
                                        )}
                                        {fieldName === 'country' && (
                                            <Texxt
                                                name="country"
                                                label="Country"
                                                value={formData.country}
                                                handleInputChange={handleInputChange}
                                                formErrors={formErrors}
                                            />
                                        )}
                                        {fieldName === 'state' && (
                                            <Texxt
                                                name="state"
                                                label="State"
                                                value={formData.state}
                                                handleInputChange={handleInputChange}
                                            />
                                        )}
                                        {fieldName === 'city' && (
                                            <Texxt
                                                name="city"
                                                label="City"
                                                value={formData.city}
                                                handleInputChange={handleInputChange}
                                                formErrors={formErrors}
                                            />
                                        )}
                                        {fieldName === 'age' && (
                                            <Texxt
                                                name="age"
                                                label="Age"
                                                type="number"
                                                value={formData.age}
                                                handleInputChange={handleInputChange}
                                                formErrors={formErrors}
                                            />
                                        )}
                                        {fieldName === 'selectedDepartment' && (
                                            <Autocmp
                                                data={data}
                                                onChange={handleAutocompleteChange}
                                                value={formData.selectedDepartment}
                                                size="small"
                                                label="Department"
                                            />
                                        )}
                                        {fieldName === 'bio' && (
                                            <Box>
                                                <TextareaSizes
                                                    label="Bio"
                                                    value={bio}
                                                    onChange={(e) => setBio(e.target.value)}
                                                    placeholder="Enter Bio"
                                                />
                                            </Box>
                                        )}
                                        {fieldName === 'gender' && (
                                            <Box >
                                                <RadioButton
                                                    defaultValue={formData.gender}
                                                    onChange={(e) => setRadioValue(e.target.value)}
                                                    style={{ color: 'black', textAlign: 'center' }}
                                                />
                                            </Box>
                                        )}
                                        {fieldName === 'responsibilities' && (
                                            <Box display="flex" justifyContent="center" alignItems="center">
                                                <MyCheckbox
                                                    options={option}
                                                    label="Responsibilities"
                                                    selectedOptions={selectedOptions}
                                                    onChange={handleCheckboxChange}
                                                    formErrors={formErrors}
                                                />
                                            </Box>
                                        )}
                                    </Grid>
                                ))}

                                <Grid item lg={6} md={6} xl={6} sm={12} xs={12}>
                                    <Box sx={{ display: "flex", gap: 3 }}>
                                        <Box>
                                            <Buttton
                                                name="Add"
                                                size="small"
                                                onClick={() => {
                                                    setFieldCount(prevCount => prevCount + 1);
                                                    setVisibleFields(Object.keys(initialState).slice(0, fieldCount + 1));
                                                }}

                                            />
                                        </Box>
                                        <Box>
                                            <Buttton
                                                name="Remove"
                                                size="small"
                                                style={{ color: "white", backgroundColor: "red" }}
                                                onClick={handleRemoveField}
                                            />
                                        </Box>
                                        <Box>
                                            <Buttton
                                                name="Submit"
                                                size="small"
                                                onClick={handleSubmit}
                                            />
                                        </Box>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Box>
            </div>
        </>
    );
};

export default ArrayForm;
