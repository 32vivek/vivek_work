import React, { useState, useEffect } from "react";
import Dropdown from "../componet/dropdown";
import Grid from "@mui/material/Grid";
import TimePickerViewRenderers from "../componet/timepicker";
import Stack from "@mui/material/Stack";
// import Button from "./../componet/button";  
import Autocmp from "./../componet/autocom";
import Typography from "@mui/material/Typography";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TextField from "@mui/material/TextField";
import { FormControl } from '@mui/material';
import { useDispatch } from 'react-redux';
import { submitFormData } from "../React-Redux/slice/data";
import { toast } from 'react-toastify';
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Button from '@mui/material/Button';

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
    const [formValues, setFormValues] = useState(editingUser || {
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
    });

    const [selectedOrgId, setSelectedOrgId] = useState("");
    const [isDayRangeHidden, setIsDayRangeHidden] = useState(false);
    const [isFromTimeHidden, setIsFromTimeHidden] = useState(false);
    const [isToTimeHidden, setIsToTimeHidden] = useState(false);
    const [isWorkingHoursHidden, setIsWorkingHoursHidden] = useState(false);
    const [isNonWorkingHoursHidden, setIsNonWorkingHoursHidden] = useState(false);
    const [formErrors, setFormErrors] = useState({
        workingType: null,
        orgId: null,
        departmentName: null,
        holiday: null,
        moduleName: null,
        fromDay: null,
        toDay: null,
        workingHrs: null,
        nonWorkingHrs: null,
        fromTime: null,
        toTime: null,
    });
    const workingTypeOptions = [
        { name: "All Day and All Time" },
        { name: "All Day and Specific Time" },
        { name: "Specific Day and All Time" },
        { name: "Specific Day and Specific Time" },
    ];

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
        if (editingUser) {
            updateFormVisibility(editingUser.workingType);
        }
    }, [editingUser]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (!Array.isArray(value) && value.trim() === "" && name !== "holiday") {
            setFormErrors((prevErrors) => ({
                ...prevErrors,
                [name]: "This field is required",
            }));
        } else {
            setFormErrors((prevErrors) => ({
                ...prevErrors,
                [name]: null,
            }));
        }

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
                    updateFormVisibility(mappedValue);
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
        if (editingUser) {
            handleEdit(formValues);
        } else {
            dispatch(submitFormData(formValues))
                .then(() => {
                    setFormValues({
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
                    });
                    handleClose();
                    updateTableData();
                    toast.success("Form submitted successfully!");
                })
                .catch((error) => {
                    console.error("Error submitting data:", error);
                    toast.error("Error submitting form. Please try again later.");
                });
        }
    };

    return (
        <>
            <ToastContainer autoClose={9000} />
            <form onSubmit={handleSubmit}>
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
                    {editingUser ? 'Edit User' : 'Register New User'}
                </Typography>
                <hr style={{ margin: "10px auto", width: "30%", color: "#ccc" }} />

                <Grid
                    container
                    spacing={2}
                    style={{ width: "100%", marginTop: "10px" }}
                >
                    <Grid item lg={4} xs={6} md={6}>
                        <Dropdown
                            label="Working Type"
                            formValues={formValues}
                            placeholder="Select Working Type"
                            name="workingType"
                            options={workingTypeOptions}
                            handleInputChange={handleInputChange}
                            error={formErrors.workingType}
                        />
                    </Grid>
                    <Grid item lg={4} xs={6} md={6}>
                        <Dropdown
                            label="Organization ID"
                            placeholder="Select Organization ID"
                            options={orgIdOptions}
                            value={selectedOrgId}
                            name="orgId"
                            handleInputChange={handleInputChange}
                            error={formErrors.orgId}
                        />
                    </Grid>
                    <Grid item lg={4} xs={6} md={6}>
                        <Dropdown
                            placeholder="Department"
                            formValues={formValues}
                            options={department}
                            name="departmentName"
                            handleInputChange={handleInputChange}
                            error={formErrors.departmentName}
                        />
                    </Grid>
                    <Grid item lg={4} xs={6} md={6}>
                        <Dropdown
                            placeholder="Holiday"
                            options={holidayOptions}
                            formValues={formValues}
                            name="holiday"
                            handleInputChange={handleInputChange}
                            error={formErrors.holiday}
                        />
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
                                error={formErrors.moduleName !== null}
                                helperText={formErrors.moduleName}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item lg={4} xs={6} md={6}>
                        <Autocmp
                            multiple={true}
                            data={data}
                            label="Select Days"
                            placeholder="Select Days"
                            onChange={(selectedDays) =>
                                handleInputChange({
                                    target: { name: "day", value: selectedDays },
                                })
                            }
                        />
                    </Grid>
                    <Grid item lg={4} xs={6} md={6}>
                        {!isDayRangeHidden && (
                            <Dropdown
                                placeholder="From Day"
                                options={data}
                                formValues={formValues}
                                name="fromDay"
                                handleInputChange={handleInputChange}
                                error={formErrors.fromDay}
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
                                error={formErrors.toDay}
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
                                error={formErrors.nonWorkingHrs}
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
                                error={formErrors.fromTime}
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
                                error={formErrors.toTime}
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
                                error={formErrors.workingHrs}
                            />
                        )}
                    </Grid>
                </Grid>

                <Stack mt="20px" display="flex" justifyContent="center" alignItems="center">
                    <Button onClick={handleSubmit} variant="contained" color="success">
                        {editingUser ? 'Update' : 'Register'}
                    </Button>
                </Stack>
            </form>
        </>
    )
}

export default ReactDatatableForm;
