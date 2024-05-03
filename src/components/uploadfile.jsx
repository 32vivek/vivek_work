import React, { useState, useRef } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CancelIcon from '@mui/icons-material/Cancel';

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

const File = ({ onChange, style, size }) => {
    const [fileName, setFileName] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            setFileName(file.name);
            setSelectedFile(file);
            onChange(file);
        }
    };

    const handleFileRemove = () => {
        setFileName('');
        setSelectedFile(null);
        onChange(null);
    };

    return (
        <>
            <Button
                component="label"
                role={undefined}
                variant="contained"
                color="secondary"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                style={style}
                size={size}
                sx={{ borderRadius: '15px' }}
            >
                {fileName ? fileName : 'file'}
                <VisuallyHiddenInput type="file" onChange={handleFileChange} ref={fileInputRef} />
            </Button>
            {selectedFile && (
                <Button
                    onClick={handleFileRemove}
                    size="large"

                    style={{ marginLeft: '8px', color: 'red' }}
                >
                    <CancelIcon />
                </Button>
            )}
        </>
    );
};

export default File;
