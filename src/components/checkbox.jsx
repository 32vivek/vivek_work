import React from 'react'
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';

const CheckBoxx = () => {
    const [state, setState] = React.useState({
        gilad: true,
        jason: false,
        antoine: false,
    });

    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.checked,
        });
    };

    const { gilad, jason, antoine } = state;
    const error = [gilad, jason, antoine].filter((v) => v).length !== 2;

    return (
        <Box>
            <FormControl
                required
                error={error}
                component="fieldset"
                sx={{ m: 1 }}
                variant="standard"
                color="primary" focused
            >
                <FormLabel component="legend" sx={{ textAlign: 'center' }}>Assign responsibility</FormLabel>
                <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
                    <FormControlLabel
                        control={<Checkbox checked={gilad} onChange={handleChange} name="gilad" />}
                        label="Development"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={jason} onChange={handleChange} name="jason" />}
                        label="Testing"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={antoine} onChange={handleChange} name="antoine" />}
                        label="HR"
                    />
                </FormGroup>
                <FormHelperText>
                    You can choose only two options
                    <span style={{ color: 'red' }}>*</span>
                </FormHelperText>
            </FormControl>
        </Box>
    )
}

export default CheckBoxx;
