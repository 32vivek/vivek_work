import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import axios from 'axios';
// import SideBar from './../components/sidebar/sidebar';
import { FormControl, FormGroup, FormControlLabel, FormLabel, FormHelperText, Checkbox, Paper } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Autocmp from '../components/autocom';
import File from '../components/uploadfile';
import Texxt from '../components/textfield';
import { experimentalStyled as styled } from '@mui/material/styles';
import TextArea from '../components/textarea';
import RadioButton from '../components/radiobutton';
import Buttton from '../components/button';
import { country_API } from '../API/Api';
import { state_API } from '../API/Api';
import TextareaSizes from '../components/textarea';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from '../components/Navbar';
import Sidenav from '../components/Sidenav';
import '../Dashboard.css'
const User = () => {
    const [data, setData] = useState([]);
    const [stateData, setStateData] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [gender, setGender] = useState('');
    // const [file, setFile] = useState();
    const [formValues, setFormValues] = useState({
        name: '',
        lastname: '',
        email: '',
        country: '',
        state: '',
        mobile: '',
        checkboxData: [],
        qualification: '',
        address: '',
    });
    const [formErrors, setFormErrors] = useState({
        name: '',
        email: '',
        checkbox: '',
        gender: '',
    });
    const [state, setState] = useState({
        gilad: false,
        jason: false,
        antoine: false,
    });
    const [selectedRadio, setSelectedRadio] = useState('');
    const [defaultStates, setDefaultStates] = useState([]);
    const [file, setFile] = useState()
    const fileInputRef = useRef(null);
    const [bio, setBio] = useState('');
    const handleFileChange = (event) => {
        const file = event.target.files && event.target.files[0];
        if (file) {

            setFile(file);
        }
    };

    const handleFile = (file) => {
        setFile(file);
    };

    const handleChangeGender = (value) => {
        setGender(value);
        setFormErrors({ ...formErrors, gender: '' });
    };



    useEffect(() => {
        fetchCountryData();
    }, []);

    const fetchCountryData = async () => {
        try {
            const response = await axios.get(`${country_API}`);
            setData(response.data.data);
            const india = response.data.data.find(country => country.id === 101);
            if (india) {
                setSelectedCountry(india);
                fetchStateData(101);
                setFormValues({
                    ...formValues,
                    country: india.name,
                });

                setDefaultStates([]);
            }
        } catch (error) {
            console.log('Error fetching country data:', error);
        }
    };
    // console.log(selectedCountry, "country");

    const fetchStateData = async (countryId) => {
        try {
            if (countryId) {
                const response = await axios.get(`${state_API}/${countryId}`);
                setStateData(response.data.data);
            }
        } catch (error) {
            console.log('Error fetching state data:', error);
        }
    };
    const handleCountryChange = (selectedCountry) => {
        setSelectedCountry(selectedCountry);
        if (selectedCountry) {
            fetchStateData(selectedCountry.id);
            setFormValues({
                ...formValues,
                country: selectedCountry.name,
            });
        } else {
            setStateData([]);
            setFormValues({
                ...formValues,
                country: '',
            });
            setDefaultStates([]);
        }
    };


    useEffect(() => {
        if (Array.isArray(stateData) && stateData.length) {

            const defaultStatesForCountry = stateData.slice(0, 2);
            setDefaultStates(defaultStatesForCountry);
            setFormValues({
                ...formValues,
                state: defaultStatesForCountry.map(state => state.name).join(', '),
            });
        } else {
            setDefaultStates([]);

        }
    }, [stateData]);

    const handleStateChange = (selectedStates) => {

        setDefaultStates(selectedStates);


        setFormValues({
            ...formValues,
            state: selectedStates.map(state => state.name).join(', '),
        });
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'name' || name === 'lastname') {

            setFormValues((prevFormValues) => ({
                ...prevFormValues,
                [name]: value,

                fullname: name === 'name' ? value.trim() + ' ' + (prevFormValues.lastname || '') : (prevFormValues.name || '') + ' ' + value.trim(),
            }));

            const errors = {};
            if (!value.trim()) {
                errors[name] = name === 'name' ? 'First Name is required' : 'Last Name is required';
            } else if (value.length < 3 || value.length > 19) {
                errors[name] = `${name === 'name' ? 'First Name' : 'Last Name'} must be between 3 and 19 characters`;
            }
            setFormErrors((prevFormErrors) => ({
                ...prevFormErrors,
                ...errors,
            }));
        } else if (name === 'address') {
            setFormValues((prevFormValues) => ({
                ...prevFormValues,
                [name]: value,
            }));
        } else {

            setFormValues((prevFormValues) => ({
                ...prevFormValues,
                [name]: value,
            }));
        }
    };



    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const isValid = validateForm();
        if (isValid) {
            const fullName = `${formValues.name} ${formValues.lastname}`;
            const currentState = formValues.state || '';

            const selectedCheckboxes = Object.keys(state).filter(key => state[key]).map(key => {
                switch (key) {
                    case 'gilad':
                        return 'Development';
                    case 'jason':
                        return 'Testing';
                    case 'antoine':
                        return 'HR';
                    default:
                        return '';
                }
            });

            setFormValues(prevFormValues => ({
                ...prevFormValues,
                state: currentState,
                checkboxData: selectedCheckboxes
            }));

            // console.log('Form submitted:', {
            //     // name: formValues.name,
            //     email: formValues.email,
            //     country: formValues.country,
            //     state: formValues.state,
            //     checkboxData: selectedCheckboxes,
            //     file: file,
            //     fullName: fullName,
            //     address: formValues.address,
            //     qualification: formValues.qualification,
            //     // gender: gender,
            //     gender: selectedRadio,
            // });


            const formData = new FormData();
            formData.append('name', formValues.name);
            formData.append('email', formValues.email);
            formData.append('country', formValues.country);
            formData.append('state', formValues.state);
            selectedCheckboxes.forEach((checkbox, index) => {
                formData.append(`checkbox_${index}`, checkbox);
            });
            formData.append('file', file);


            try {
                // Make a POST request to your endpoint with formData
                // Example:
                // const response = await axios.post('your_endpoint', formData);
                // Handle the response as needed
                // console.log(response);
                // Clear form after submission
                setFormValues({
                    name: '',
                    email: '',
                    country: '',
                    state: '',
                    checkboxData: [],
                    lastname: '',
                    fullname: '',
                    mobile: '',
                    qualification: '',


                });
                setSelectedRadio('');
                setSelectedCountry(null);
                setStateData([]);
                if (fileInputRef.current) {
                    fileInputRef.current.value = null;
                }
                setState({
                    gilad: false,
                    jason: false,
                    antoine: false,
                });

                toast.success('Form submitted successfully!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } catch (error) {
                console.error('Error submitting form:', error);

                toast.error('Error submitting form. Please try again later!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        } else {
            console.log('Form validation failed.');

            toast.error('Please fill in all required fields!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };


    const validateForm = () => {
        let valid = true;
        const errors = {};
        if (!formValues.name.trim()) {
            errors.name = 'Name is required';
            valid = false;
        } else if (formValues.name.length < 3 || formValues.name.length > 19) {
            errors.name = 'Name must be between 3 and 19 characters';
            valid = false;
        }
        // if (!gender) {
        //     errors.gender = 'Please select gender';
        //     valid = false;
        // }
        if (!formValues.lastname.trim()) {
            errors.lastname = 'Last Name is required';
            valid = false;
        } else if (formValues.lastname.length < 3 || formValues.lastname.length > 19) {
            errors.lastname = 'Last Name must be between 3 and 19 characters';
            valid = false;
        }
        if (!formValues.email.trim()) {
            errors.email = 'Email is required';
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
            errors.email = 'Email is invalid';
            valid = false;
        }
        if (!formValues.country) {
            errors.country = 'Country is required';
            valid = false;
        }
        if (!formValues.state) {
            errors.state = 'State is required';
            valid = false;
        }
        if (!formValues.mobile.trim()) {
            errors.mobile = 'Mobile number is required';
            valid = false;
        } else if (!/^[1-9]\d{9}$/.test(formValues.mobile)) {
            errors.mobile = 'Mobile number must be 10 digits long and should not start with 0';
            valid = false;
        }
        if (!state.gilad && !state.jason && !state.antoine) {
            errors.checkbox = 'Please select at least one option';
            valid = false;
        }
        setFormErrors(errors);
        return valid;
    };

    const handleReset = () => {
        setFormValues({
            name: '',
            lastname: '',
            email: '',
            country: '',
            state: '',
            mobile: '',
            checkboxData: [],
            qualification: '',
            address: '',
        });
        setFormErrors({
            name: '',
            email: '',
            checkbox: '',
            gender: '',
        });
        setState({
            gilad: false,
            jason: false,
            antoine: false,
        });
        setSelectedRadio('');
        setSelectedCountry(null);
        setStateData([]);
        setDefaultStates([]);
        setFile(null);
        setBio('');


        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const { gilad, jason, antoine } = state;

    useEffect(() => {

    }, [formValues]);
    useEffect(() => {
        AOS.init();
    }, []);
    return (
        <>
            <ToastContainer />
            <div className='bgcolor'>
                {/* <ToastContainer /> */}
                <Navbar />
                <Box height={70} >
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "50px" }}>
                        <Sidenav />
                        <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 2 }}>
                            <Grid container spacing={2} style={{
                                width: '100%',
                                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                                padding: "10px",
                            }}>
                                <Grid item xs={12}>

                                    <Typography variant='h6' style={{ display: 'flex', justifyContent: 'center', fontWeight: "bold" }} data-aos="fade-down"
                                        data-aos-easing="linear"
                                        data-aos-duration="1500">
                                        USER FORM
                                    </Typography>
                                    <hr style={{ marginTop: "10px", width: "30%", color: "black" }}
                                        data-aos="fade-down"
                                        data-aos-easing="linear"
                                        data-aos-duration="1500"
                                    />

                                </Grid>

                                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                    {/* <Paper elevation={2}> */}
                                    <Box
                                        component="form"
                                        // sx={{
                                        //     '& .MuiTextField-root': { width: '56ch', marginBottom: '20px' },
                                        // }}
                                        noValidate
                                        autoComplete="on"

                                        onSubmit={handleFormSubmit}
                                    >
                                        <Box>
                                            <FormControl fullWidth>
                                                <Texxt
                                                    formValues={formValues}
                                                    formErrors={formErrors}
                                                    label={"First Name"}
                                                    placeholder={"First Name"}
                                                    name={"name"}
                                                    handleInputChange={handleInputChange}
                                                />
                                            </FormControl>

                                        </Box>
                                    </Box>
                                    {/* </Paper> */}
                                </Grid>
                                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                    {/* <Paper elevation={2}> */}
                                    <Box
                                        component="form"
                                        // sx={{
                                        //     '& .MuiTextField-root': { width: '56ch', marginBottom: '20px' },
                                        // }}
                                        noValidate
                                        autoComplete="on"
                                        onSubmit={handleFormSubmit}
                                    >
                                        <Box>
                                            <FormControl fullWidth>
                                                <Texxt
                                                    formValues={formValues}
                                                    formErrors={formErrors}
                                                    label={"Last Name"}
                                                    placeholder={"Last Name"}
                                                    name={"lastname"}
                                                    handleInputChange={handleInputChange}
                                                />
                                            </FormControl>
                                        </Box>
                                    </Box>
                                    {/* </Paper> */}
                                </Grid>
                                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                    {/* <Paper elevation={2}> */}
                                    <Box
                                        component="form"
                                        // sx={{
                                        //     '& .MuiTextField-root': { width: '56ch', marginBottom: '20px' },
                                        // }}
                                        noValidate
                                        autoComplete="on"
                                        onSubmit={handleFormSubmit}
                                    >
                                        <Box>
                                            <FormControl fullWidth>

                                                <Texxt
                                                    formValues={formValues}
                                                    formErrors={formErrors}
                                                    label={"Full Name"}
                                                    placeholder={"Full Name"}
                                                    name={"fullname"}
                                                    handleInputChange={handleInputChange}
                                                    // readOnly
                                                    disabled
                                                />
                                            </FormControl>
                                        </Box>
                                    </Box>
                                    {/* </Paper> */}
                                </Grid>

                                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                    {/* <Paper elevation={2}> */}
                                    <Box
                                        component="form"
                                        // sx={{
                                        //     '& .MuiTextField-root': { width: '56ch', marginBottom: '20px' },
                                        // }}
                                        noValidate
                                        autoComplete="on"
                                        onSubmit={handleFormSubmit}
                                    >
                                        <Box>
                                            <FormControl fullWidth>
                                                <Texxt
                                                    formValues={formValues}
                                                    formErrors={formErrors}
                                                    label={"Mobile"}
                                                    placeholder={"Mobile Number"}
                                                    name={"mobile"}
                                                    handleInputChange={handleInputChange}
                                                />
                                            </FormControl>
                                        </Box>
                                    </Box>
                                    {/* </Paper> */}
                                </Grid>

                                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                    {/* <Paper elevation={2}> */}
                                    <Box
                                        component="form"
                                        // sx={{
                                        //     '& .MuiTextField-root': { width: '56ch', marginBottom: '20px' },
                                        // }}
                                        noValidate
                                        autoComplete="on"
                                        onSubmit={handleFormSubmit}
                                    >
                                        <Box>
                                            <FormControl fullWidth>
                                                <Texxt
                                                    formValues={formValues}
                                                    formErrors={formErrors}
                                                    label={"Email"}
                                                    placeholder={"Email"}
                                                    name={"email"}
                                                    handleInputChange={handleInputChange}
                                                />
                                            </FormControl>
                                        </Box>
                                    </Box>
                                    {/* </Paper> */}
                                </Grid>
                                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                    {/* <Paper elevation={2}> */}
                                    <Box
                                        component="form"
                                        // sx={{
                                        //     '& .MuiTextField-root': { width: '56ch', marginBottom: '20px' },
                                        // }}
                                        // noValidate
                                        autoComplete="on"
                                        onSubmit={handleFormSubmit}
                                    >
                                        <Box>
                                            <FormControl fullWidth>
                                                <Texxt
                                                    formValues={formValues}
                                                    formErrors={formErrors}
                                                    label={"Address"}
                                                    placeholder={"Address"}
                                                    name={"address"}
                                                    handleInputChange={handleInputChange}
                                                />
                                            </FormControl>
                                        </Box>
                                    </Box>
                                    {/* </Paper> */}
                                </Grid>
                                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                    {/* <Paper elevation={2}> */}
                                    <FormControl fullWidth>
                                        <Autocmp
                                            multiple={false}
                                            data={data}
                                            size="small"
                                            onChange={handleCountryChange}
                                            defaultValue={selectedCountry}
                                            label="Country"
                                            placeholder="Select Country"
                                        />
                                    </FormControl>
                                    {/* </Paper> */}
                                </Grid>

                                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                    {/* <Paper elevation={2}> */}
                                    <FormControl fullWidth>
                                        <Autocmp
                                            multiple={true}
                                            size="small"
                                            data={stateData}
                                            onChange={(selectedStates) => setFormValues({
                                                ...formValues,
                                                state: selectedStates.map(state => state.name).join(', '),
                                            })}
                                            handleStateChange={handleStateChange}
                                            defaultValue={defaultStates}
                                            label="State"
                                            placeholder='Select State'
                                        />
                                    </FormControl>
                                    {/* </Paper> */}
                                </Grid>

                                <Grid item xs={12} sm={6} lg={6} xl={6}>
                                    {/* <Paper elevation={2}> */}
                                    <Box >
                                        <FormControl fullWidth>

                                            <TextareaSizes
                                                label="BIO"
                                                size="lg"
                                                placeholder="Enter your bio here"
                                                value={bio}
                                                onChange={(e) => setBio(e.target.value)}
                                            />

                                        </FormControl>

                                    </Box>
                                    {/* </Paper> */}
                                </Grid>

                                <Grid item xs={12} sm={6} lg={6} xl={6}>
                                    {/* <Paper elevation={2}> */}
                                    <Box
                                        component="form"
                                        // sx={{
                                        //     '& .MuiTextField-root': { width: '56ch', marginBottom: '20px' },
                                        // }}
                                        noValidate
                                        autoComplete="on"
                                        onSubmit={handleFormSubmit}
                                    >
                                        <Box>
                                            <FormControl fullWidth>
                                                <Texxt
                                                    formValues={formValues}
                                                    formErrors={formErrors}
                                                    label={"Qualification"}
                                                    placeholder={"Degree"}
                                                    name={"qualification"}
                                                    handleInputChange={handleInputChange}
                                                />
                                            </FormControl>
                                        </Box>
                                    </Box>
                                    {/* </Paper> */}
                                </Grid>

                                <Grid item xs={12} sm={6} lg={6} xl={6}>
                                    {/* <Paper elevation={2}> */}
                                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                        <FormControl fullWidth required error={!!formErrors.checkbox} component="fieldset"  >
                                            <FormLabel component="legend" sx={{ textAlign: 'start', color: 'black' }}>Assign responsibility</FormLabel>
                                            <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                                                <FormControlLabel
                                                    control={<Checkbox checked={state.gilad} onChange={handleChange} name="gilad" />}
                                                    label="Development"
                                                />
                                                <FormControlLabel
                                                    control={<Checkbox checked={state.antoine} onChange={handleChange} name="antoine" />}
                                                    label="HR"
                                                />
                                            </FormGroup>
                                            <FormHelperText>{formErrors.checkbox}</FormHelperText>
                                        </FormControl>

                                    </Box>
                                    <hr />
                                    <FormControl fullWidth>
                                        <RadioButton
                                            onChange={(value) => setSelectedRadio(value)}
                                            value={selectedRadio}
                                            error={formErrors.gender}
                                            style={{ color: 'black' }}
                                        />
                                    </FormControl>
                                    {/* </Paper> */}
                                </Grid>
                                <Grid item xs={12} sm={6} lg={6} xl={6} justifyContent="center">
                                    {/* <Box sx={{ mt: 4, textAlign: 'center' }}>
                        <FormControl >
                            <File onChange={handleFile} />
                        </FormControl>
                    </Box> */}
                                    <Grid item xs={12} sm={12} lg={12} xl={12}>
                                        {/* <FormControl fullWidth> */}
                                        {/* <Paper elevation={2}> */}
                                        <Box sx={{ mt: 5, display: "flex", justifyContent: "center", alignItems: "center", gap: 3 }}
                                        >
                                            <Box   >
                                                <File size="small" onChange={handleFile} />
                                            </Box>

                                            <Box>
                                                <Buttton size="small" color="primary" onClick={handleFormSubmit} name="Submit" />
                                            </Box>
                                            <Box>
                                                <Buttton name="Reset Form" onClick={handleReset} size="small" style={{ color: "white", backgroundColor: "red" }} />
                                            </Box>
                                        </Box>
                                        {/* </FormControl> */}
                                        {/* </Paper> */}
                                    </Grid>

                                    {/* <Grid item xs={12} sm={12} lg={12} xl={12}> */}
                                    {/* <Box >
                            <Buttton color="primary" size="large" onClick={handleFormSubmit} name="Submit" />
                        </Box> */}
                                    {/* </Grid> */}
                                </Grid>
                            </Grid>

                        </Box>
                    </Box>
                </Box>
            </div>

        </>
    );
};

export default User;

