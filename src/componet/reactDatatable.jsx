import React, { useState, useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import LinearProgress from '@mui/material/LinearProgress';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import GetAppIcon from '@mui/icons-material/GetApp';
import "./reactDatatable.css";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import WorkDetails from "../pages/WorkDetails";
import axios from 'axios';
import * as XLSX from 'xlsx'; // Import XLSX library
import { saveAs } from 'file-saver'; // Import FileSaver library
import AddIcon from '@mui/icons-material/Add';
import { FormControl, Fab, MenuItem, Select } from "@mui/material";
import { format } from 'date-fns'; // Import format function from date-fns

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    maxWidth: 800,
    bgcolor: 'background.paper',
    p: 4,
};

export default function PaginatorTemplateDemo() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [open, setOpen] = useState(false);
    const [pageSize, setPageSize] = useState(10); // Default page size is set to 10

    const fetchWorkingData = async () => {
        try {
            const response = await axios.get("https://65a4e05752f07a8b4a3dd9b7.mockapi.io/auth");
            const formattedData = response.data.map(item => ({
                ...item,
                date: format(new Date(item.date), 'MM/dd'), // Format date using date-fns
            }));
            setData(formattedData);
            setFilteredData(formattedData);
        } catch (error) {
            console.error("Error fetching working data:", error);
        }
    };

    useEffect(() => {
        fetchWorkingData();
    }, []);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleFilterChange = (e) => {
        const searchQuery = e.target.value.toLowerCase();
        const filtered = data.filter(item =>
            Object.values(item).some(value =>
                typeof value === 'string' && value.toLowerCase().includes(searchQuery)
            )
        );
        setFilteredData(filtered);
    };

    const handleDownload = () => {
        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const fileExtension = '.xlsx';
        const exportData = filteredData.map(row => {
            return {
                ...row,
            };
        });

        const ws = XLSX.utils.json_to_sheet(exportData);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: fileType });
        const fileName = 'workingData' + fileExtension;
        saveAs(blob, fileName);
    };

    const handlePageSizeChange = (e) => {
        setPageSize(e.target.value);
    };

    const handleFormSubmit = async (formData) => {
        try {
            const response = await axios.post("https://65a4e05752f07a8b4a3dd9b7.mockapi.io/auth", formData);
            console.log("Form submitted:", response.data);
            fetchWorkingData(); // Update table data after successful form submission
            handleClose(); // Close modal after form submission
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    return (
        <div className="card">
            <div style={{ height: 400, width: '70%', marginLeft: '150px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <IconButton
                        onClick={handleDownload}
                        sx={{
                            bgcolor: 'blue',
                            height: '50px',
                            width: '50px',
                            borderRadius: '100%',
                            '&:hover': {
                                bgcolor: 'blue', // Maintain the same background color on hover
                            }
                        }}
                    >
                        <GetAppIcon sx={{ color: 'white' }} />
                    </IconButton>
                    <TextField
                        label="Search"
                        focused
                        placeholder="Search Item"
                        variant="filled"
                        onChange={handleFilterChange}
                    />
                    <Fab color="primary" aria-label="add" onClick={handleOpen}>
                        <AddIcon style={{ color: 'white' }} />
                    </Fab>
                </div>
                <DataGrid
                    columns={columns}
                    rows={filteredData}
                    loading={!data.length}
                    components={{
                        loadingOverlay: CustomLinearProgress
                    }}
                    componentsProps={{
                        pagination: {
                            footer: <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Select
                                    value={pageSize}
                                    onChange={handlePageSizeChange}
                                    label="Rows per page"
                                    variant="standard"
                                    sx={{ marginRight: '10px' }}
                                >
                                    <MenuItem value={10}>10</MenuItem>
                                </Select>
                            </div>
                        }
                    }}
                    pageSize={pageSize}
                />
            </div>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <WorkDetails onSubmit={handleFormSubmit} />
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}

const CustomLinearProgress = () => {
    return <LinearProgress />;
};

const columns = [
    { field: 'moduleName', headerName: 'Module Name', headerClassName: 'custom-header', width: 119 },
    { field: 'workingType', headerName: 'Working Type', headerClassName: 'custom-header', width: 119 },
    { field: 'fromDay', headerName: 'From Day', headerClassName: 'custom-header', width: 119 },
    { field: 'toDay', headerName: 'To Day', headerClassName: 'custom-header', width: 119 },
    { field: 'fromTime', headerName: 'From Time', headerClassName: 'custom-header', width: 119 },
    { field: 'toTime', headerName: 'To Time', headerClassName: 'custom-header', width: 119 },
    { field: 'departmentName', headerName: 'Department Name', headerClassName: 'custom-header', width: 119 },
    // { field: 'date', headerName: 'Date', headerClassName: 'custom-header', width: 119 },
    { field: 'holiday', headerName: 'Holiday', headerClassName: 'custom-header', width: 119 }
];
