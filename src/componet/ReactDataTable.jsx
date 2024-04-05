import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "../React-Redux/slice/data";
import DataTable from "react-data-table-component";
import SortIcon from "@material-ui/icons/ArrowDownward";
import SideBar from "./sidebar/sidebar";
import Grid from "@mui/material/Grid";
import { Paper, Button, Typography } from "@mui/material";
import { Box, FormControl, InputAdornment, TextField } from "@material-ui/core";
import { Search as SearchIcon } from "@mui/icons-material";
import CircularProgress from "@mui/material/CircularProgress";
import * as XLSX from "xlsx";
import ReactDatatableForm from "../pages/reactDatatableForm";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

const UserForm = () => {
    const dispatch = useDispatch();
    const state = useSelector((state) => state.todo);

    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);

    const { loading, error, data } = state;

    console.log("State", state);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const columns = [
        {
            name: "Working Type",
            selector: (row) => row.workingType,
            sortable: true,
            cell: (row) => {
                let color = "#000";
                switch (row.workingType) {
                    case "SS":
                        color = "#ff0000";
                        break;
                    case "SA":
                        color = "#00ff00";
                        break;
                    case "AA":
                        color = "#0000ff";
                        break;
                    case "AS":
                        color = "#ff00ff";
                        break;
                    default:
                        break;
                }
                return <div style={{ color }}>{row.workingType}</div>;
            },
        },
        {
            name: "Module Name",
            selector: (row) => row.moduleName,
            sortable: true,
        },
        {
            name: "Department Name",
            selector: (row) => row.departmentName,
            sortable: true,
        },
        {
            name: "Holiday",
            selector: (row) => row.holiday,
            sortable: true,
            cell: (row) => {
                let symbol = "";
                let color = "#000";
                switch (row.holiday) {
                    case "yes":
                        symbol = "✓";
                        color = "#00ff00";
                        break;
                    case "no":
                        symbol = "✗";
                        color = "#ff0000";
                        break;
                    default:
                        break;
                }
                return <div style={{ color }}>{symbol}</div>;
            },
        },
        {
            name: "From Day",
            selector: (row) => row.fromDay,
            sortable: true,
        },
        {
            name: "To Day",
            selector: (row) => row.toDay,
            sortable: true,
        },
        {
            name: "From Time",
            selector: (row) => row.fromTime,
            sortable: true,
        },
        {
            name: "To Time",
            selector: (row) => row.toTime,
            sortable: true,
        },
    ];

    const customStyles = {
        headCells: {
            style: {
                fontWeight: "bold",
                position: "sticky",
                top: 0,
                zIndex: 1,
                backgroundColor: "	#D3D3D3",
            },
        },
        pagination: {
            style: {
                fontWeight: "bold",
                position: "sticky",
            },
        },
    };
    const [filterText, setFilterText] = useState("");
    const [open, setOpen] = useState(false);
    const handleFilterChange = (e) => {
        setFilterText(e.target.value);
    };

    const filteredItems =
        data && Array.isArray(data)
            ? data.filter((item) => {
                const searchText = filterText.toLowerCase();
                const rowValues = Object.values(item).join(" ").toLowerCase();
                return rowValues.includes(searchText);
            })
            : [];

    const handleExcelDownload = () => {

        const ws = XLSX.utils.json_to_sheet(filteredItems);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

        XLSX.writeFile(wb, "data.xlsx");
    };

    const updateTableData = () => {
        dispatch(fetchTodos());
    };


    return (
        <div>
            {loading && <CircularProgress />}
            {error && <div>Error: {error}</div>}
            <div>
                <Grid container>
                    <SideBar />
                    <Grid
                        item
                        xs={12}
                        md={9}
                        lg={10}
                        style={{
                            marginLeft: "auto",
                            marginRight: "auto",
                            marginTop: "100px",
                        }}
                    >
                        <Paper
                            elevation={8}
                            style={{ padding: "10px", maxHeight: "400px", overflow: "auto" }}
                        >
                            <Box display="flex" alignItems="center" justifyContent="start" marginBottom="10px">
                                <Button
                                    onClick={handleOpen}
                                    variant="contained"
                                    sx={{ marginRight: 5 }}
                                >
                                    ADD USER
                                </Button>

                                <TextField
                                    label="Search"
                                    variant="outlined"
                                    size="small"
                                    onChange={handleFilterChange}
                                    style={{ width: "140px", marginRight: "auto" }}
                                    InputProps={{
                                        startAdornment: <SearchIcon position="start" />,
                                    }}
                                />

                                <span
                                    style={{ cursor: "pointer" }}
                                    onClick={handleExcelDownload}
                                >
                                    <Button variant="contained" size="small">
                                        Export User
                                    </Button>
                                </span>
                            </Box>

                            <DataTable
                                columns={columns}
                                data={filteredItems || []}
                                defaultSortField="moduleName"
                                sortIcon={<SortIcon />}
                                dense
                                customStyles={customStyles}
                                pagination
                                paginationPerPage={10}
                                paginationRowsPerPageOptions={[10, 20, 50]}
                                highlightOnHover
                                striped
                            />
                        </Paper>
                    </Grid>
                </Grid>
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
                            transform: "translate(-50%, -50%)",
                            width: "100%",
                            maxWidth: 800,
                            bgcolor: "background.paper",
                            p: 3,
                        }}
                    >
                        <ReactDatatableForm handleClose={() => setOpen(false)} updateTableData={updateTableData} />

                    </Box>
                </Fade>
            </Modal>
        </div>
    );
};

export default UserForm;
