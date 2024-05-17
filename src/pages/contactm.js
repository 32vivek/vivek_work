import React, { useState, useEffect } from "react";
import {
    TextField,
    Button,
    Grid,
    Typography,
    Modal,
    Paper,
    Fab,
    Tooltip,
    MenuItem,
    CircularProgress,
    Stack,
} from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import "./contactm.css";
import { contactForm_API } from "../API/Api";
import { Box } from "@mui/material";
import Navbar from "../components/Navbar";
import Sidenav from "../components/Sidenav";
import CloseIcon from '@mui/icons-material/Close';
import Buttton from "../components/button";

const CustomCircularProgress = ({ delay }) => {
    const [showLoader, setShowLoader] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowLoader(false);
        }, delay);

        return () => clearTimeout(timeout);
    }, [delay]);

    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            {showLoader && (
                <>
                    <CircularProgress color="primary" />
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        style={{ marginLeft: 10 }}
                    >
                        Loading...
                    </Typography>
                </>
            )}
        </div>
    );
};

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    maxWidth: 400,
    bgcolor: "white",
    boxShadow: 24,
    p: 4,
};

const ContactForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors: formErrors },
        reset,
    } = useForm();
    const [open, setOpen] = useState(false);
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${contactForm_API}`);
            setData(response.data);
            setFilteredData(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (text) => {
        setSearchText(text);
        const filtered = data.filter(
            (item) =>
                (item.name && item.name.toLowerCase().includes(text.toLowerCase())) ||
                (item.email && item.email.toLowerCase().includes(text.toLowerCase())) ||
                (typeof item.mobile === "string" && item.mobile.includes(text)) || // Check if mobile is a string
                (item.department &&
                    item.department.toLowerCase().includes(text.toLowerCase()))
        );
        setFilteredData(filtered);
    };

    const onSubmit = async (data) => {
        try {
            if (editingUser) {
                await axios.put(`${contactForm_API}/${editingUser.id}`, data);
                fetchData();
                reset();
                handleClose();
                Swal.fire("Success", "User updated successfully!", "success");
            } else {
                await axios.post(`${contactForm_API}`, data);
                fetchData();
                reset();
                handleClose();
                Swal.fire("Success", "User registered successfully!", "success");
            }
        } catch (error) {
            console.error("Error:", error);
            Swal.fire("Error", "An error occurred. Please try again later.", "error");
        }
    };



    const handleOpen = (user = null) => {
        setEditingUser(user);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEditingUser(null);
        reset();
    };

    const handleEdit = (row) => {
        handleOpen(row);
    };

    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
            width: "300px",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`${contactForm_API}/${id}`);
                    fetchData();
                    Swal.fire("Success", "User deleted successfully!", "success");
                } catch (error) {
                    console.error("Error:", error);
                    Swal.fire("Error", "An error occurred while deleting user.", "error");
                }
            }
        });
    };

    const customStyles = {
        headRow: {
            style: {
                backgroundColor: "rgb(211,211,211)",
            },
        },
        headCells: {
            style: {
                fontSize: "15px",
                fontWeight: "bold",
                color: "#333",
            },
        },
        rows: {
            style: {
                fontSize: "14px",
                minHeight: "40px",
                paddingTop: "1px",
                paddingBottom: "1px",
                boxShadow: "4px 1px 5px rgba(4, 4, 4, 0.9)",
            },
        },
    };

    const columns = [
        {
            name: "Name",
            selector: (row) => row.name,
            sortable: true,
            cell: (row) => {
                const name = row.name;
                return (
                    <Tooltip title={name.length > 15 ? name : ""}>
                        <span>
                            {name.length > 15 ? name.substring(0, 15) + "..." : name}
                        </span>
                    </Tooltip>
                );
            },
            style: {
                fontSize: "15px",
            },
        },
        {
            name: "Email",
            selector: (row) => row.email,
            sortable: true,
            cell: (row) => {
                const email = row.email;
                return (
                    <Tooltip title={email.length > 20 ? email : ""}>
                        <span>
                            {email.length > 20 ? email.substring(0, 20) + "..." : email}
                        </span>
                    </Tooltip>
                );
            },
            style: {
                fontSize: "15px",
            },
        },
        {
            name: "Mobile",
            selector: (row) => row.mobile,
            sortable: true,
            style: {
                fontSize: "15px",
            },
        },
        {
            name: "Department",
            selector: (row) => row.department,
            sortable: true,
            cell: (row) => (
                <span
                    style={{
                        backgroundColor: getDepartmentColor(row.department),
                        padding: "5px",
                        borderRadius: "5px",
                    }}
                >
                    {row.department}
                </span>
            ),
            style: {
                fontSize: "15px",
            },
        },
        {
            name: "Actions",
            cell: (row) => (
                <div>
                    <button
                        className="btn"
                        onClick={() => handleEdit(row)}
                        style={{ border: "none", background: "none" }}
                    >
                        <FontAwesomeIcon icon={faEdit} style={{ color: "blue", cursor: 'pointer' }} />
                    </button>
                    &nbsp;
                    <button
                        className="btn"
                        onClick={() => handleDelete(row.id)}
                        style={{ border: "none", background: "none", cursor: 'pointer' }}
                    >
                        <FontAwesomeIcon icon={faTrashAlt} style={{ color: "red" }} />
                    </button>
                </div>
            ),
            ignoreRowClick: true,
            button: true,
        },
    ];

    const getDepartmentColor = (department) => {
        switch (department) {
            case "IT":
                return "#98FB98"; // Green
            case "Sales":
                return "#FF6347"; // Red
            case "Marketing":
                return "#87CEEB"; // Blue
            default:
                return "inherit";
        }
    };

    const subHeaderComponentMemo = React.useMemo(() => {
        return (
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <div style={{ display: "flex", alignItems: "center" }}>
                    <div
                        style={{
                            width: "100%",
                            maxWidth: "300px",
                            fontSize: "14px",
                            marginRight: "10px",
                        }}
                    >
                        <TextField
                            placeholder="Search"
                            variant="filled"
                            size="small"
                            // width="120px"
                            onChange={(e) => handleSearch(e.target.value)}
                            fullWidth
                        />
                    </div>
                    <Fab
                        color="primary"
                        aria-label="add"
                        onClick={() => handleOpen()}
                        style={{ backgroundColor: "primary" }}
                    >
                        <AddIcon style={{ color: "white" }} />
                    </Fab>
                </div>
            </div>
        );
    }, [searchText]);

    return (
        <>
            <div className="bgcolor">
                <Navbar />
                <Box height="auto">
                    <Box sx={{ display: "flex", marginTop: "50px" }}>
                        <Sidenav />
                        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                            <div style={{ position: 'relative', zIndex: 1 }} >
                                <Modal
                                    open={open || editingUser !== null}
                                    onClose={handleClose}
                                    aria-labelledby="modal-title"
                                    aria-describedby="modal-description"
                                >
                                    <Grid container justifyContent="center" alignItems="center">
                                        <Grid item xs={12} md={8} lg={6}>
                                            <Paper sx={style}>
                                                <Grid container flexDirection="row" marginBottom="10px">
                                                    <Grid item xs={11}>
                                                        <Typography variant="h6" component="h2" style={{ textAlign: 'center' }}>
                                                            {editingUser ? 'Edit User' : 'Register New User'}
                                                        </Typography>
                                                        <hr style={{ width: "250px" }} />
                                                    </Grid>
                                                    <Grid item xs={1} style={{ textAlign: 'right' }}>
                                                        <CloseIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
                                                    </Grid>
                                                </Grid>
                                                <form onSubmit={handleSubmit(onSubmit)}>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12}>
                                                            <TextField

                                                                fullWidth
                                                                size="small"
                                                                label="Name"
                                                                {...register('name', { required: true })}
                                                                variant="filled"
                                                                error={!!formErrors.name}

                                                                helperText={formErrors.name ? 'Name is required' : ''}
                                                                defaultValue={editingUser ? editingUser.name : ''}
                                                                color="primary" focused
                                                                placeholder='Enter Name'
                                                                InputLabelProps={{ style: { color: 'black' } }}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <TextField

                                                                fullWidth
                                                                size="small"
                                                                label="Email"

                                                                {...register('email', { required: true, pattern: /^\S+@\S+\.\S+$/ })}
                                                                type="email"
                                                                variant="filled"
                                                                error={!!formErrors.email}
                                                                helperText={formErrors.email ? 'Invalid email address' : ''}
                                                                defaultValue={editingUser ? editingUser.email : ''}
                                                                color="primary" focused
                                                                placeholder='ex:example@gmail.com'
                                                                InputLabelProps={{ style: { color: 'black' } }}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <TextField

                                                                fullWidth
                                                                size="small"
                                                                label="Mobile Number"

                                                                {...register('mobile', { required: true, pattern: /^\d{10}$/ })}
                                                                variant="filled"
                                                                error={!!formErrors.mobile}
                                                                helperText={formErrors.mobile ? 'Mobile number should be 10 digits' : ''}
                                                                defaultValue={editingUser ? editingUser.mobile : ''}
                                                                color="primary" focused
                                                                placeholder='Enter Number'
                                                                InputLabelProps={{ style: { color: 'black' } }}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <TextField
                                                                select

                                                                fullWidth
                                                                size="small"
                                                                label="Department"
                                                                {...register('department', { required: true })}
                                                                variant="filled"
                                                                error={!!formErrors.department}
                                                                helperText={formErrors.department ? 'Department is required' : ''}

                                                                defaultValue={editingUser ? editingUser.department : ''}
                                                                color="primary" focused
                                                                InputLabelProps={{ style: { color: 'black' } }}

                                                            >
                                                                <MenuItem value="IT">IT</MenuItem>
                                                                <MenuItem value="Sales">Sales</MenuItem>
                                                                <MenuItem value="Marketing">Marketing</MenuItem>
                                                            </TextField>
                                                        </Grid>
                                                        <Grid item xs={12} textAlign="center">

                                                            <Button type="submit" size="small" variant="contained" style={{ backgroundColor: "primary", borderRadius: "15px" }}>
                                                                {editingUser ? 'Update' : 'Register'}
                                                            </Button>
                                                            &nbsp;&nbsp;&nbsp;&nbsp;
                                                            <Buttton size="small" onClick={handleClose} color="secondary" name="Close" />
                                                            {/* &nbsp;&nbsp;&nbsp;&nbsp;
                                                            <Buttton size="small" color="warning" name="Reset Form" onClick={handleClearForm} /> */}

                                                        </Grid>


                                                    </Grid>
                                                </form>
                                            </Paper>
                                        </Grid>
                                    </Grid>
                                </Modal>
                                <div style={{ padding: "20px 5%", marginTop: "20px", overflowX: 'auto' }}>
                                    <div style={{ margin: '0 5px' }}>
                                        <DataTable
                                            columns={columns}
                                            data={filteredData}
                                            pagination
                                            subHeader
                                            subHeaderComponent={subHeaderComponentMemo}
                                            paginationPerPage={5}
                                            paginationRowsPerPageOptions={[5, 10, 15]}
                                            customStyles={customStyles}
                                            progressPending={loading}
                                            progressComponent={<CustomCircularProgress delay={2000} />}
                                            dense

                                            conditionalRowStyles={[
                                                {
                                                    when: row => row.department === 'IT',
                                                    style: {
                                                        backgroundColor: '#98FB98', // Green
                                                    },
                                                },
                                                {
                                                    when: row => row.department === 'Sales',
                                                    style: {
                                                        backgroundColor: '#FF6347', // Red
                                                    },
                                                },
                                                {
                                                    when: row => row.department === 'Marketing',
                                                    style: {
                                                        backgroundColor: '#87CEEB', // Blue
                                                    },
                                                },
                                            ]}
                                        />
                                    </div>
                                </div>
                            </div>
                        </Box>
                    </Box>
                </Box>
            </div>
        </>
    );
};

export default ContactForm;
