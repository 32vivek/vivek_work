import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar';
import Sidenav from '../components/Sidenav';
import { Box, Grid } from '@mui/material';
import Typography from "@mui/material/Typography";
import "../Dashboard.css";
import Texxt from '../components/textfield';
import Autocmp from "../components/autocom";
import RadioButton from '../components/radiobutton';
import Buttton from '../components/button';
import './array.css';

const ArrayFormm = () => {
    const [formDataArray, setFormDataArray] = useState([{ name: "", email: "", number: "", department: "", gender: "" }]);
    const [formErrors, setFormErrors] = useState([]);

    const departments = ['CS', "ECE", "CIVIL"];
    const genders = ["Male", "Female", "Other"];

    const handleAddForm = () => {
        setFormDataArray([...formDataArray, { name: "", email: "", number: "", department: "", gender: "" }]);
    };

    const handleRemoveForm = () => {
        if (formDataArray.length > 1) {
            setFormDataArray(formDataArray.slice(0, -1));
        }
    };

    const handleSubmit = () => {
        const newErrors = formDataArray.map(formData => ({
            name: formData.name.trim().length < 2 || formData.name.trim().length > 20
                ? "Name must be between 2 and 20 characters"
                : "",
            email: !/^\S+@\S+\.\S+$/.test(formData.email.trim())
                ? "Invalid email format"
                : "",
            number: !/^\d{10}$/.test(formData.number.trim())
                ? "Phone number must be 10 digits"
                : "",
            department: formData.department.trim() === "" ? "Department is required" : "",
            gender: formData.gender === "" ? "Gender is required" : ""
        }));

        setFormErrors(newErrors);

        const hasErrors = newErrors.some(error => Object.values(error).some(value => value));

        if (hasErrors) {
            toast.error("Please fill all required fields !");
            return;
        }

        console.log("Form Data Array:", formDataArray);


        setFormDataArray(formDataArray.map(() => ({
            name: "",
            email: "",
            number: "",
            department: "",
            gender: ""
        })));

        setFormErrors([]);
        toast.success("Form submitted successfully!");
    };

    return (
        <>
            <div className='bgcolorA'>
                <ToastContainer />
                <Navbar />
                <Box height="auto">
                    <Box sx={{ display: "flex", marginTop: "60px" }}>
                        <Sidenav />
                        <Box component="main" className="main-container" sx={{ flexGrow: 1, p: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography variant="h6" style={{ display: 'flex', justifyContent: 'center', fontWeight: 'bold' }}>
                                        Array Form
                                    </Typography>
                                    <hr style={{ marginTop: '10px', maxWidth: '30%', color: 'black' }} />
                                </Grid>
                                {formDataArray.map((formData, index) => (
                                    <Box key={index} className="form-container" sx={{ p: 4, mb: 2, width: '100%' }}>
                                        <Grid container spacing={2}>
                                            <Grid item lg={6} md={6} xs={12} sm={12}>
                                                <Texxt
                                                    name="name"
                                                    label="Name"
                                                    size="small"
                                                    placeholder="Enter Name"
                                                    variant="standard"
                                                    value={formData.name}
                                                    error={formErrors[index]?.name}
                                                    handleInputChange={(e) => {
                                                        const updatedFormDataArray = [...formDataArray];
                                                        updatedFormDataArray[index].name = e.target.value;
                                                        setFormDataArray(updatedFormDataArray);
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item lg={6} md={6} xs={12} sm={12}>
                                                <Texxt
                                                    name="email"
                                                    label="Email"
                                                    placeholder="Enter Email"
                                                    variant="standard"
                                                    size="small"
                                                    value={formData.email}
                                                    error={formErrors[index]?.email}
                                                    handleInputChange={(e) => {
                                                        const updatedFormDataArray = [...formDataArray];
                                                        updatedFormDataArray[index].email = e.target.value;
                                                        setFormDataArray(updatedFormDataArray);
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item lg={6} md={6} xs={12} sm={12}>
                                                <Texxt
                                                    name="number"
                                                    label="Number"
                                                    variant="standard"
                                                    placeholder="Enter Number"
                                                    size="small"
                                                    value={formData.number}
                                                    error={formErrors[index]?.number}
                                                    handleInputChange={(e) => {
                                                        const updatedFormDataArray = [...formDataArray];
                                                        updatedFormDataArray[index].number = e.target.value;
                                                        setFormDataArray(updatedFormDataArray);
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item lg={6} md={6} xs={12} sm={12}>
                                                <Autocmp
                                                    data={departments}
                                                    value={formData.department}
                                                    size="small"
                                                    label="Department"
                                                    variant="standard"
                                                    placeholder="Select Department"
                                                    error={formErrors[index]?.department}
                                                    onChange={(value) => {
                                                        const updatedFormDataArray = [...formDataArray];
                                                        updatedFormDataArray[index].department = value;
                                                        setFormDataArray(updatedFormDataArray);
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item lg={6} md={6} xs={12} sm={12}>
                                                <RadioButton
                                                    style={{ color: 'black', textAlign: 'center' }}
                                                    options={genders}
                                                    label="Gender"
                                                    value={formData.gender}
                                                    error={formErrors[index]?.gender}
                                                    onChange={(e) => {
                                                        const updatedFormDataArray = [...formDataArray];
                                                        updatedFormDataArray[index].gender = e.target.value;
                                                        setFormDataArray(updatedFormDataArray);
                                                    }}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Box>
                                ))}
                                <Grid item lg={12} md={12} xs={12} sm={12}>
                                    <Box sx={{ display: "flex", gap: 3 }}>
                                        <Box>
                                            <Buttton
                                                name="Add"
                                                size="small"
                                                onClick={handleAddForm}
                                            />
                                        </Box>
                                        <Box>
                                            <Buttton
                                                name="Remove"
                                                size="small"
                                                style={{ color: "white", backgroundColor: "red" }}
                                                onClick={handleRemoveForm}
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
    )
}

export default ArrayFormm;
