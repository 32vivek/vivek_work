import React, { useState, useEffect } from "react";
import Dropdown from "../componet/dropdown";
import Grid from "@mui/material/Grid";
import TimePickerViewRenderers from "../componet/timepicker";
import Stack from "@mui/material/Stack";
import axios from "axios";
import Buttton from "./../componet/button";
import Autocmp from "./../componet/autocom";
import Typography from "@mui/material/Typography";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TextField from "@mui/material/TextField";
import { FormControl } from '@mui/material';
import { useDispatch } from 'react-redux';


import { submitFormData } from "../React-Redux/slice/data";

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
const ReactDatatableForm = ({ handleClose, updateTableData }) => {
    const dispatch = useDispatch();
    const [formValues, setFormValues] = useState({
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
    const [workingData, setWorkingData] = useState([]);
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
                    switch (mappedValue) {
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formValues.workingType || !formValues.orgId || !formValues.departmentName || !formValues.holiday) {
            setFormErrors({
                ...formErrors,
                workingType: !formValues.workingType ? "This field is required" : null,
                orgId: !formValues.orgId ? "This field is required" : null,
                departmentName: !formValues.departmentName ? "This field is required" : null,
                holiday: !formValues.holiday ? "This field is required" : null,
            });

            return;
        }
        try {
            await dispatch(submitFormData(formValues));
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
            updateTableData()
        } catch (error) {
            console.error("Error submitting data:", error);

        }
    };


    return (
        <>
            <ToastContainer autoClose={7000} />
            <form onSubmit={handleSubmit}>
                <Typography
                    id="transition-modal-title"
                    variant="h4"
                    component="h2"
                    display="flex"
                    justifyContent="center"
                >
                    User Working Details
                </Typography>
                <hr style={{ margin: "10px auto", width: "50%", color: "#ccc" }} />

                <Grid
                    container
                    spacing={2}
                    style={{ width: "90%", marginLeft: "35px", marginTop: "10px" }}
                >
                    <Grid item lg={4} xs={12} md={6}>
                        <Dropdown
                            label="Working Type"
                            formValues={formValues}
                            placeholder="Select Working Type"
                            name="workingType"
                            // size="small"
                            options={workingTypeOptions}
                            handleInputChange={handleInputChange}
                            error={formErrors.workingType}
                        />
                    </Grid>
                    <Grid item lg={4} xs={12} md={6}>
                        <Dropdown
                            label="Organization ID"
                            placeholder="Select Organization ID"
                            options={orgIdOptions}
                            value={selectedOrgId}
                            // size="small"
                            name="orgId"
                            handleInputChange={handleInputChange}
                            error={formErrors.orgId}
                        />
                    </Grid>
                    <Grid item lg={4} xs={12} md={6}>
                        <Dropdown
                            placeholder="Department"
                            formValues={formValues}
                            options={department}
                            // size="small"
                            name="departmentName"
                            handleInputChange={handleInputChange}
                            error={formErrors.departmentName}
                        />
                    </Grid>
                    <Grid item lg={4} xs={12} md={6}>
                        <Dropdown
                            placeholder="Holiday"
                            options={holidayOptions}
                            formValues={formValues}
                            // size="small"
                            name="holiday"
                            handleInputChange={handleInputChange}
                            error={formErrors.holiday}
                        />
                    </Grid>
                    <Grid item lg={4} xs={12} md={6}>
                        {!isDayRangeHidden && (
                            <Dropdown
                                placeholder="From Day"
                                options={data}
                                // size="small"
                                formValues={formValues}
                                name="fromDay"
                                handleInputChange={handleInputChange}
                                error={formErrors.fromDay}
                            />
                        )}
                    </Grid>
                    <Grid item lg={4} xs={12} md={6}>
                        {!isDayRangeHidden && (
                            <Dropdown
                                placeholder="To Day"
                                options={data}
                                // size="small"
                                formValues={formValues}
                                name="toDay"
                                handleInputChange={handleInputChange}
                                error={formErrors.toDay}
                            />
                        )}
                    </Grid>
                    <Grid item lg={4} xs={12} md={6}>
                        <FormControl fullWidth>
                            <TextField
                                id="outlined-required"
                                required
                                label="Module Name"
                                size="small"
                                variant="outlined"
                                placeholder="Module Name"
                                // focused
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

                    <Grid item lg={4} xs={12} md={6}>
                        {!isWorkingHoursHidden && (
                            <TimePickerViewRenderers
                                label="Working Hours"
                                name="workingHrs"
                                // size="small"
                                formValues={formValues}
                                handleInputChange={handleInputChange}
                                error={formErrors.workingHrs}
                            />
                        )}
                    </Grid>
                    <Grid item lg={4} xs={12} md={6}>
                        {!isNonWorkingHoursHidden && (
                            <TimePickerViewRenderers
                                label="Non-Working Hours"
                                name="nonWorkingHrs"
                                // size="small"
                                formValues={formValues}
                                handleInputChange={handleInputChange}
                                error={formErrors.nonWorkingHrs}
                            />
                        )}
                    </Grid>
                    <Grid item lg={4} xs={12} md={6}>
                        {!isFromTimeHidden && (
                            <TimePickerViewRenderers
                                label="From Time"
                                // size="small"
                                name="fromTime"
                                formValues={formValues}
                                handleInputChange={handleInputChange}
                                error={formErrors.fromTime}
                            />
                        )}
                    </Grid>
                    <Grid item lg={4} xs={12} md={6}>
                        {!isToTimeHidden && (
                            <TimePickerViewRenderers
                                label="To Time"
                                // size="small"
                                name="toTime"
                                formValues={formValues}
                                handleInputChange={handleInputChange}
                                error={formErrors.toTime}
                            />
                        )}
                    </Grid>
                    <Grid item lg={4} xs={12} md={6}>
                        <Autocmp
                            multiple={true}
                            data={data}
                            label="Select Days"
                            // size="small"
                            placeholder="Select Days"
                            onChange={(selectedDays) =>
                                handleInputChange({
                                    target: { name: "day", value: selectedDays },
                                })
                            }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Stack marginLeft="100px" mt="20px">
                            <Buttton onClick={handleSubmit} name="Save Data"
                            />
                        </Stack>
                    </Grid>
                </Grid>
            </form>
        </>
    )
}

export default ReactDatatableForm
