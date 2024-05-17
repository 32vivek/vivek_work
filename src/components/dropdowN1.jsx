import React, { useState, useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";

export default function Dropdown1({
    options,
    handleInputChange,
    name,
    error,
    formValues = {},
    label,
    defaultOption,
    size,
    onChange,
    value,
    placeholder,
}) {

    const [selectedValue, setSelectedValue] = useState("");

    useEffect(() => {
        setSelectedValue(formValues[name] || defaultOption || "");
    }, [formValues[name], defaultOption]);

    return (
        <div>
            {/* <FormControl fullWidth variant="standard" error={error}> */}
            <FormControl fullWidth>
                <InputLabel htmlFor={`${name}-select`} style={{ color: "black" }}>
                    {label}
                    <span style={{ color: "red" }}>*</span>
                </InputLabel>
                <Select
                    id={`${name}-select`}
                    value={value}
                    placeholder={placeholder}
                    onChange={(e) => onChange(e.target.value)}
                    label={label}
                    size={size}
                >
                    {defaultOption && (
                        <MenuItem value={defaultOption}>{defaultOption}</MenuItem>
                    )}
                    {options &&
                        options.map((option, index) => (
                            <MenuItem key={index} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                </Select>
                {/* {error && <FormHelperText>Please select an option</FormHelperText>} */}
            </FormControl>
        </div>
    );
}
