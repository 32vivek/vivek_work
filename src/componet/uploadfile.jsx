import React, { useState, useRef } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});
const File = ({ onChange }) => {
    const [fileName, setFileName] = useState('');
    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            setFileName(file.name);
            onChange(file);
        }
    };

    return (
        <>
            <Button
                component="label"
                role={undefined}
                variant="outlined"
                color="primary"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                size="small"
            >
                {fileName ? fileName : 'Upload file'}
                <VisuallyHiddenInput type="file" onChange={handleFileChange} ref={fileInputRef} />
            </Button>
        </>
    );
};

export default File;
