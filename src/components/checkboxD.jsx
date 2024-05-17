import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Box, Grid } from '@mui/material';

function MyCheckbox({ options, selectedOptions, onChange, label, formErrors }) {
    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                    <Box>
                        <label style={{ fontWeight: 'bolder' }}>{label}
                            <span style={{ color: "red" }}>*</span></label>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    {options.map((option, index) => (
                        <FormControlLabel
                            key={index}
                            control={
                                <Checkbox
                                    checked={selectedOptions.includes(option)}
                                    onChange={(e) => onChange(option, e.target.checked)}
                                />
                            }
                            label={option}
                            error={formErrors[label]}
                        />
                    ))}
                </Grid>
                {formErrors[label + '_required'] && (
                    <Grid item xs={12}>
                        <Box sx={{ color: 'red', marginLeft: '12px', fontSize: '0.75rem' }}>
                            {formErrors[label + '_required']}
                        </Box>
                    </Grid>
                )}
            </Grid>
        </>
    );
}

export default MyCheckbox;
