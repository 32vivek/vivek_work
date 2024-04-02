

import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import LinearProgress from "@mui/material/LinearProgress";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import GetAppIcon from "@mui/icons-material/GetApp";
import "./reactDatatable.css";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import WorkDetails from "../pages/WorkDetails";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import AddIcon from "@mui/icons-material/Add";
import { Fab } from "@mui/material";
import { format } from "date-fns";
import './reactDatatable.css';
const PaginatorTemplateDemo = ({ onSubmit }) => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [open, setOpen] = useState(false);
    const [pageSize, setPageSize] = useState(25);

    useEffect(() => {
        const fetchWorkingData = async () => {
            try {
                const response = await axios.get(
                    "https://65a4e05752f07a8b4a3dd9b7.mockapi.io/auth"
                );
                const formattedData = response.data.map((item) => ({
                    ...item,
                    date: format(new Date(item.date), "MM/dd"),
                    day: item.day ? item.day.map(day => day.name).join(', ') : '',
                }));
                setData(formattedData);
                setFilteredData(formattedData);
            } catch (error) {
                console.error("Error fetching working data:", error);
            }
        };
        fetchWorkingData();
    }, []);

    // console.log(data, "day");

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleFilterChange = (e) => {
        const searchQuery = e.target.value.toLowerCase();
        const filtered = data.filter((item) =>
            Object.values(item).some(
                (value) =>
                    typeof value === "string" && value.toLowerCase().includes(searchQuery)
            )
        );
        setFilteredData(filtered);
    };

    const handleDownload = () => {
        const fileType =
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        const fileExtension = ".xlsx";
        const exportData = filteredData.map((row) => ({ ...row }));

        const ws = XLSX.utils.json_to_sheet(exportData);
        const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const blob = new Blob([excelBuffer], { type: fileType });
        const fileName = "workingData" + fileExtension;
        saveAs(blob, fileName);
    };

    const handlePageSizeChange = (e) => setPageSize(e.target.value);

    const handleFormSubmit = async (formData) => {
        try {
            const response = await axios.post(
                "https://65a4e05752f07a8b4a3dd9b7.mockapi.io/auth",
                formData
            );
            console.log("Form submitted:", response.data);
            data()
            onSubmit(formData);
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    return (
        <div className="card">
            <div style={{ height: 400, width: "70%", marginLeft: "150px" }}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "10px",
                    }}
                >
                    <IconButton
                        onClick={handleDownload}
                        sx={{
                            bgcolor: "blue",
                            height: "50px",
                            width: "50px",
                            borderRadius: "100%",
                            "&:hover": {
                                bgcolor: "blue",
                            },
                        }}
                    >
                        <GetAppIcon sx={{ color: "white" }} />
                    </IconButton>
                    <TextField
                        label="Search"
                        focused
                        placeholder="Search Item"
                        variant="filled"
                        onChange={handleFilterChange}
                    />
                    <Fab color="primary" aria-label="add" onClick={handleOpen}>
                        <AddIcon style={{ color: "white" }} />
                    </Fab>
                </div>
                <DataGrid
                    columns={columns}
                    rows={filteredData}
                    loading={!data.length}
                    pagination
                    pageSize={pageSize}
                    rowCount={filteredData.length}
                    rowsPerPageOptions={[25, 50, 100]}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    rowHeight={28}
                    headerHeight={28}

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
                    <Box
                        sx={{
                            position: "absolute",
                            top: "48%",
                            left: "50%",
                            // bottom: '50%',
                            transform: "translate(-50%, -50%)",
                            width: "100%",
                            maxWidth: 800,
                            bgcolor: "background.paper",
                            p: 3,
                        }}

                    >
                        <WorkDetails onSubmit={handleFormSubmit} handleClose={handleClose} />
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
};

const columns = [
    {
        field: "moduleName",
        headerName: "Module Name",
        headerClassName: "custom-header",
        width: 120,
    },
    {
        field: "workingType",
        headerName: "Working Type",
        headerClassName: "custom-header",
        width: 120,
    },
    {
        field: "fromDay",
        headerName: "From Day",
        headerClassName: "custom-header",
        width: 120,
    },
    {
        field: "toDay",
        headerName: "To Day",
        headerClassName: "custom-header",
        width: 120,
    },
    {
        field: "fromTime",
        headerName: "From Time",
        headerClassName: "custom-header",
        width: 120,
    },
    {
        field: "toTime",
        headerName: "To Time",
        headerClassName: "custom-header",
        width: 120,
    },
    {
        field: "departmentName",
        headerName: "Department Name",
        headerClassName: "custom-header",
        width: 120,
    },
    {
        field: "holiday",
        headerName: "Holiday",
        headerClassName: "custom-header",
        width: 120,
    },
    {
        field: "day",
        headerName: "Excludes Days",
        headerClassName: "custom-header",
        width: 120,
    },
];

export default PaginatorTemplateDemo;
