import React, { useState, useEffect } from "react";
import Dropdown from "../components/dropdown";
import Grid from "@mui/material/Grid";
import TimePickerViewRenderers from "../components/timepicker";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FormControl } from '@mui/material';
import { useDispatch } from 'react-redux';
import { submitFormData } from "../React-Redux/slice/data";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Buttton from "../componets/button";
import Buttton from "../components/button"
import AOS from 'aos';
import 'aos/dist/aos.css';

const mapToAbbreviation = (value) => {
    switch (value) {
        case "All Day and All Time":
            return "AA";
        case "All Day and Specific Time":
            return "AS";
        case "Specific Day and All Time":
            return "SA";
        case "Specific Day and Specific Time":
            return "SS";
        default:
            return value;
    }
};


const ReactDatatableForm = ({ handleClose, updateTableData, editingUser, handleEdit }) => {
    const dispatch = useDispatch();
    const initialFormValues = {


        workingType: "",
        workingHrs: "",
        departmentName: "",
        holiday: "",
        moduleName: "",
        fromDay: "",
        toDay: "",
        day: [],
        fromTime: "",
        toTime: "",
        orgId: "",
    };


    const [formValues, setFormValues] = useState(editingUser || initialFormValues);
    const [workingType, setWorkingType] = useState("");
    const [workingHrs, setWorkingHrs] = useState("");
    const [selectedOrgId, setSelectedOrgId] = useState("");
    const [isDayRangeHidden, setIsDayRangeHidden] = useState(false);
    const [isFromTimeHidden, setIsFromTimeHidden] = useState(false);
    const [isToTimeHidden, setIsToTimeHidden] = useState(false);
    const [isWorkingHoursHidden, setIsWorkingHoursHidden] = useState(false);
    const [isNonWorkingHoursHidden, setIsNonWorkingHoursHidden] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const validateForm = () => {
        if (
            formValues.workingType === "" ||
            formValues.orgId === "" ||
            formValues.departmentName === "" ||
            formValues.holiday === "" ||
            formValues.moduleName === "" ||
            formValues.day.length === 0
        ) {
            setError(true);
            setErrorMessage("Please fill out all required fields.");
            return false;
        }
        return true;
    };

    const holidayOptions = [{ name: "yes" }, { name: "no" }];
    const department = [{ name: "marketing" }, { name: " developement" }];
    const data = [
        { name: "Monday" },
        { name: "Tuesday" },
        { name: "Wednesday" },
        { name: "Thursday" },
        { name: "Friday" },
        { name: "Saturday" },
        { name: "Sunday" },
    ];
    const workingTypeOptions = [
        { name: "All Day and All Time" },
        { name: "All Day and Specific Time" },
        { name: "Specific Day and All Time" },
        { name: "Specific Day and Specific Time" },
    ];

    const [orgIdOptions] = useState([
        { id: "1", name: "1" },
        { id: "2", name: "2" },
        { id: "3", name: "3" },
        { id: "4", name: "4" },
        { id: "5", name: "5" },
    ]);

    const updateFormVisibility = (workingType) => {
        switch (workingType) {
            case "AA":
                setIsDayRangeHidden(true);
                setIsFromTimeHidden(true);
                setIsToTimeHidden(true);
                setIsWorkingHoursHidden(true);
                setIsNonWorkingHoursHidden(true);
                break;
            case "AS":
                setIsDayRangeHidden(true);
                setIsFromTimeHidden(false);
                setIsToTimeHidden(false);
                setIsWorkingHoursHidden(false);
                setIsNonWorkingHoursHidden(false);
                break;
            case "SA":
                setIsDayRangeHidden(false);
                setIsFromTimeHidden(true);
                setIsToTimeHidden(true);
                setIsWorkingHoursHidden(true);
                setIsNonWorkingHoursHidden(true);
                break;
            case "SS":
                setIsDayRangeHidden(false);
                setIsFromTimeHidden(false);
                setIsToTimeHidden(false);
                setIsWorkingHoursHidden(false);
                setIsNonWorkingHoursHidden(false);
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        // console.log("Editing user:", editingUser);
        if (editingUser) {
            updateFormVisibility(editingUser.workingType);
            setFormValues(editingUser);
            setWorkingType(editingUser.workingType);
            setWorkingHrs(editingUser.workingHrs);
        }
    }, [editingUser]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === "day") {
            setFormValues((prevValues) => ({
                ...prevValues,
                [name]: value,
            }));
        } else {
            switch (name) {
                case "orgId":
                    setFormValues((prevValues) => ({
                        ...prevValues,
                        [name]: value,
                    }));
                    break;
                case "workingType":
                    const mappedValue = mapToAbbreviation(value);
                    setFormValues((prevValues) => ({
                        ...prevValues,
                        [name]: mappedValue,
                    }));
                    setWorkingType(mappedValue);
                    updateFormVisibility(mappedValue);
                    break;
                case "workingHrs":
                    setFormValues((prevValues) => ({
                        ...prevValues,
                        [name]: value,
                    }));
                    setWorkingHrs(value);
                    break;
                default:
                    setFormValues({
                        ...formValues,
                        [name]: value,
                    });
                    break;
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();


        let isValid = validateForm();

        if (!isValid) {
            return;
        }


        if (editingUser) {
            handleEdit(formValues);
        } else {
            dispatch(submitFormData(formValues))
                .then(() => {
                    setFormValues(initialFormValues);
                    handleClose();
                    updateTableData();

                    toast.success('Form submitted successfully!', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                })
                .catch((error) => {
                    console.error("Error submitting data:", error);

                    toast.error('Error submitting form. Please try again later!', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                });
        }
    };

    // console.log("Form Values:", formValues);

    const handleClearForm = () => {
        setFormValues(initialFormValues);
        setFormValues((prevValues) => ({
            ...prevValues,
            fromTime: "",
            toTime: "",
        }));
        setWorkingType("");
        setWorkingHrs("");
        setError(false);
        setErrorMessage("");
    };
    useEffect(() => {
        AOS.init();
    }, []);

    return (
        <>
            {/* <ToastContainer autoClose={9000} /> */}
            <ToastContainer />
            <form onSubmit={handleSubmit} style={{
                overflow: "hidden",
                maxHeight: "100vh",
            }}
                data-aos="fade-down"
                data-aos-easing="linear"
                data-aos-duration="1000">
                {error && (
                    <Typography variant="body2" color="error" align="center">
                        {errorMessage}
                    </Typography>
                )}
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    style={{ position: "absolute", top: 3, right: 5 }}

                >
                    <CloseIcon />
                </IconButton>
                <Typography
                    id="transition-modal-title"
                    variant="h6"
                    component="h2"
                    display="flex"
                    justifyContent="center"
                    fontWeight="bold"

                >
                    {editingUser ? 'Edit User Details' : 'Register New User'}
                </Typography>
                <hr style={{ marginTop: "10px", width: "30%", color: "black" }} />

                <Grid
                    container
                    spacing={2}
                    style={{ width: "100%", marginTop: "10px" }}

                >
                    <Grid item lg={4} xs={6} md={6}>

                        <FormControl fullWidth error={error && formValues.workingType === ""}>

                            <Dropdown
                                // label="Working Type"

                                formValues={formValues.workingType}
                                placeholder="Select Working Type"
                                name="workingType"
                                size="small"
                                label="Working type"
                                options={workingTypeOptions}
                                handleInputChange={handleInputChange}
                                selectedValue={formValues.workingType}
                            />
                            {error && formValues.workingType === "" && (
                                <Typography variant="caption" color="error">
                                    Please select Working Type.
                                </Typography>
                            )}
                        </FormControl>
                    </Grid>
                    <Grid item lg={4} xs={6} md={6}>
                        <FormControl fullWidth error={error && formValues.orgId === ""}>
                            <Dropdown
                                // label="Organization ID"
                                placeholder="Select Organization ID"
                                options={orgIdOptions}
                                formValues={formValues}
                                value={selectedOrgId}
                                name="orgId"
                                label="Org Id"
                                size="small"
                                handleInputChange={handleInputChange}
                            />
                            {error && formValues.orgId === "" && (
                                <Typography variant="caption" color="error">
                                    Please select Organization ID.
                                </Typography>
                            )}
                        </FormControl>
                    </Grid>
                    <Grid item lg={4} xs={6} md={6}>
                        <FormControl fullWidth error={error && formValues.departmentName === ""}>
                            <Dropdown
                                placeholder="Department"
                                formValues={formValues}
                                options={department}
                                name="departmentName"
                                size="small"
                                label="Department Name"
                                handleInputChange={handleInputChange}
                                value={formValues.departmentName}
                            />
                            {error && formValues.departmentName === "" && (
                                <Typography variant="caption" color="error">
                                    Please select Department Name.
                                </Typography>
                            )}
                        </FormControl>
                    </Grid>
                    <Grid item lg={4} xs={6} md={6}>
                        <FormControl fullWidth error={error && formValues.holiday === ""}>
                            <Dropdown
                                placeholder="Holiday"
                                options={holidayOptions}
                                formValues={formValues}
                                name="holiday"
                                label=" Holiday"
                                size="small"
                                handleInputChange={handleInputChange}
                                value={formValues.holiday}
                            />
                            {error && formValues.orgId === "" && (
                                <Typography variant="caption" color="error">
                                    Please select Holiday.
                                </Typography>
                            )}
                        </FormControl>
                    </Grid>
                    <Grid item lg={4} xs={6} md={6}>
                        <FormControl fullWidth>
                            <TextField
                                id="outlined-required"
                                required
                                label="Module Name"
                                size="small"
                                variant="standard"
                                placeholder="Module Name"
                                name="moduleName"
                                value={formValues.moduleName}
                                onChange={handleInputChange}
                                InputLabelProps={{ style: { color: 'black' } }}
                            />

                        </FormControl>
                    </Grid>
                    <Grid item lg={4} xs={6} md={6}>
                        <FormControl fullWidth error={error && formValues.day.length === 0}>
                            <Autocomplete
                                multiple
                                options={data}
                                size="small"
                                limitTags={2}
                                getOptionLabel={(option) => option?.name || ''}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Select Days"
                                        InputLabelProps={{ style: { color: 'black' } }}
                                        variant="standard"
                                    />
                                )}
                                onChange={(event, value) => {
                                    handleInputChange({ target: { name: 'day', value: value.map(option => option?.name || '') } });
                                    // Clear the input value
                                    event.target.value = [];
                                }}
                                value={formValues.day || []}
                            />
                            {error && formValues.day.length === 0 && (
                                <Typography variant="caption" color="error">
                                    Please select at least one day.
                                </Typography>
                            )}
                        </FormControl>
                    </Grid>
                    <Grid item lg={4} xs={6} md={6}>
                        {!isDayRangeHidden && (
                            <Dropdown
                                placeholder="From Day"
                                options={data}
                                formValues={formValues}
                                size="small"
                                name="fromDay"
                                label=" From Day"
                                handleInputChange={handleInputChange}
                                value={formValues.fromDay}
                            />
                        )}
                    </Grid>
                    <Grid item lg={4} xs={6} md={6}>
                        {!isDayRangeHidden && (
                            <Dropdown
                                placeholder="To Day"
                                options={data}
                                size="small"
                                label="To Day"
                                formValues={formValues}
                                name="toDay"
                                handleInputChange={handleInputChange}
                                value={formValues.toDay}
                            />
                        )}
                    </Grid>

                    <Grid item lg={4} xs={6} md={6}>
                        {!isNonWorkingHoursHidden && (
                            <TimePickerViewRenderers
                                label="Non Working Hours"
                                name="nonWorkingHrs"
                                size="small"
                                formValues={formValues}
                                handleInputChange={handleInputChange}
                                value={formValues.nonWorkingHrs}
                            />
                        )}
                    </Grid>
                    <Grid item lg={4} xs={6} md={6}>
                        {!isFromTimeHidden && (

                            <TimePickerViewRenderers
                                label="From Time"
                                name="fromTime"
                                size="small"
                                formValues={formValues}
                                handleInputChange={handleInputChange}
                                value={formValues.fromTime}
                            />


                        )}
                    </Grid>
                    <Grid item lg={4} xs={6} md={6}>
                        {!isToTimeHidden && (
                            <TimePickerViewRenderers
                                label="To Time"
                                name="toTime"
                                size="small"
                                formValues={formValues}
                                handleInputChange={handleInputChange}
                                value={formValues.toTime}
                            />
                        )}
                    </Grid>
                    <Grid item lg={4} xs={6} md={6}>
                        {!isWorkingHoursHidden && (
                            <TimePickerViewRenderers
                                label="Working Hours"
                                name="workingHrs"
                                size="small"
                                formValues={formValues}
                                handleInputChange={handleInputChange}
                                value={formValues.workingHrs}
                            />
                        )}
                    </Grid>
                </Grid>
                <hr style={{ marginTop: "30px", width: "40%", color: "blue" }} />

                <Stack mt="20px" display="flex" flexDirection="row" justifyContent="center" alignItems="center" sx={{ gap: 3 }}>
                    <Button onClick={handleSubmit} size="small" variant="contained" color="success"
                        sx={{ borderRadius: '15px' }} >
                        {editingUser ? 'Update' : 'Register'}
                    </Button>
                    <Buttton size="small" onClick={handleClose} color="secondary" name="Close" />

                    <Buttton size="small" onClick={handleClearForm} style={{ backgroundColor: "red", color: 'white' }} name="Reset Form" />
                </Stack>
                <hr style={{ marginTop: "20px", width: "40%", color: "blue" }} />
            </form>
        </>
    )
}

export default ReactDatatableForm;

