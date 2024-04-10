import React, { useState, useEffect } from "react";
import Dropdown from "../componet/dropdown";
import Grid from "@mui/material/Grid";
import TimePickerViewRenderers from "../componet/timepicker";
import Stack from "@mui/material/Stack";
import Autocmp from "./../componet/autocom";
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
        console.log("Editing user:", editingUser);
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

        // Validate form before submission
        let isValid = validateForm();

        if (!isValid) {
            return;
        }

        // Attempt to submit the form data
        if (editingUser) {
            handleEdit(formValues);
        } else {
            dispatch(submitFormData(formValues))
                .then(() => {
                    setFormValues(initialFormValues);
                    handleClose();
                    updateTableData();
                    // Show success toast message
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
                    // Show error toast message
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
    console.log("Form Values:", formValues);

    const handleClearForm = () => {
        setFormValues(initialFormValues);
        setWorkingType("");
        setWorkingHrs("");
        setError(false);
        setErrorMessage("");
    };

    return (
        <>
            {/* <ToastContainer autoClose={9000} /> */}
            <ToastContainer />
            <form onSubmit={handleSubmit}>
                {error && (
                    <Typography variant="body2" color="error" align="center">
                        {errorMessage}
                    </Typography>
                )}
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    style={{ position: "absolute", top: 5, right: 5 }}
                >
                    <CloseIcon />
                </IconButton>
                <Typography
                    id="transition-modal-title"
                    variant="h6"
                    component="h2"
                    display="flex"
                    justifyContent="center"
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
                                variant="outlined"
                                placeholder="Module Name"
                                name="moduleName"
                                value={formValues.moduleName}
                                onChange={handleInputChange}
                                style={{
                                    padding: "0px",
                                }}
                            />

                        </FormControl>
                    </Grid>
                    <Grid item lg={4} xs={6} md={6}>
                        <FormControl fullWidth error={error && formValues.day.length === 0}>
                            <Autocomplete
                                multiple
                                options={data}
                                size="small"
                                limitTags={1}
                                getOptionLabel={(option) => option?.name || ''}
                                renderInput={(params) => <TextField {...params} label="Select Days" />}
                                onChange={(event, value) => {
                                    if (value) {
                                        handleInputChange({ target: { name: 'day', value: value.map(option => option?.name || '') } });
                                    } else {
                                        handleInputChange({ target: { name: 'day', value: [] } });
                                    }
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
                                name="fromDay"
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
                                label="Non-Working Hours"
                                name="nonWorkingHrs"
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
                                formValues={formValues}
                                handleInputChange={handleInputChange}
                                value={formValues.workingHrs}
                            />
                        )}
                    </Grid>
                </Grid>
                <hr style={{ marginTop: "30px", width: "100%", color: "black" }} />

                <Stack mt="20px" display="flex" flexDirection="row" justifyContent="center" alignItems="center">


                    <Button onClick={handleSubmit} variant="contained" color="success" size="small">
                        {editingUser ? 'Update' : 'Register'}
                    </Button>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <Button variant="contained" size="small" onClick={handleClose} style={{ backgroundColor: "#D3D3D3", color: 'black' }}>
                        Close
                    </Button>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <Button variant="contained" size="small" onClick={handleClearForm} style={{ backgroundColor: "#D3D3D3", color: 'black' }}>
                        Reset Form
                    </Button>

                </Stack>
            </form>
        </>
    )
}

export default ReactDatatableForm;
