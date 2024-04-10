import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { FormControl } from "@mui/material";

const Autocmp = ({ data, label, placeholder, onChange, defaultValue, multiple, handleStateChange, style }) => {

    const defaultOption = data.find(option => option.name === (defaultValue && defaultValue.name));

    const defaultValueToUse = defaultOption || defaultValue;

    const handleSelectionChange = (event, value) => {
        onChange({
            target: { name: "day", value: value },
        });
        if (handleStateChange) {
            handleStateChange(value);
        }
    }

    return (
        <FormControl fullWidth>
            <Autocomplete
                multiple={multiple}
                limitTags={1}
                id="multiple-limit-tags"
                options={data}
                size="small"
                style={style}
                getOptionLabel={(option) => option.name}
                onChange={handleSelectionChange}
                value={defaultValue}
                isOptionEqualToValue={(option, value) => option.name === value.name}
                renderInput={(params) => (
                    <TextField {...params} label={label} placeholder={placeholder} color="primary" focused />
                )}
            />
        </FormControl>
    );
};
export default Autocmp;