import React, { useState, useEffect } from "react";
import { Box, Grid, Typography, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, updateUser } from "../redux/slices/userSlice";
import { listMyOrders, getOrderDetails } from "../redux/slices/orderSlice";
import Message from "../components/Message";
import Loader from "../components/Loader";
import CancelIcon from '@mui/icons-material/Cancel';
import { Link, useNavigate } from "react-router-dom";  // Use Link from react-router-dom for navigation

function ProfileScreen() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");

    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const { userDetails, loading, error } = user;
    const userData = {
        id: userDetails._id,
        name: name,
        email: email,
        password: password,
    };

    const order = useSelector((state) => state.order);
    const { listorder, loading: loadingOrders, error: errorOrders } = order;

    const navigate = useNavigate(); // Use useNavigate from React Router

    useEffect(() => {
        if (!userDetails) {
            navigate("/login");
        } else {
            dispatch(listMyOrders());
            setName(userDetails.name);
            setEmail(userDetails.email);
        }
    }, [dispatch, navigate, userDetails]);

    const submitHandler = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage("Passwords do not match");
        } else {
            dispatch(updateUser(userDetails.id, userData));
            setMessage("");
        }
    };

    const handleDeleteUser = () => {
        dispatch(deleteUser(userDetails.id));
        navigate('/');  // Use navigate to go back to the homepage
        window.location.reload(); // Reload the page
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* User Profile Section */}
            <Grid container spacing={2} sx={{ flexDirection: { xs: 'column', md: 'row' } }}>
                <Grid item md={3} xs={12}>
                    <Typography variant="h5" component="h2" sx={{ mb: 2 }}>User Profile</Typography>
                    {message && <Message variant="danger">{message}</Message>}
                    {error && <Message variant="danger">{error}</Message>}
                    {loading && <Loader />}
                    <form onSubmit={submitHandler}>
                        <TextField
                            required
                            label="Name"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <TextField
                            required
                            label="Email Address"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            label="Password"
                            variant="outlined"
                            type="password"
                            fullWidth
                            margin="normal"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <TextField
                            label="Confirm Password"
                            variant="outlined"
                            type="password"
                            fullWidth
                            margin="normal"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                            Update
                        </Button>
                    </form>

                    <Button
                        variant="contained"
                        color="error"
                        sx={{ mt: 2 }}
                        onClick={handleDeleteUser}
                    >
                        <CancelIcon sx={{ fontSize: "20px", mr: 1 }} />
                        Delete Account
                    </Button>
                </Grid>

                {/* Orders Section */}
                <Grid item md={9} xs={12}>
                    <Typography variant="h5" component="h2" sx={{ mb: 2 }}>My Orders</Typography>
                    {loadingOrders ? (
                        <Loader />
                    ) : errorOrders ? (
                        <Message variant="danger">{errorOrders}</Message>
                    ) : (
                        <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
                            <Table sx={{ minWidth: 650 }} size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ID</TableCell>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Total</TableCell>
                                        <TableCell>Paid</TableCell>
                                        <TableCell>Delivered</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {listorder
                                        .filter((order) => order.isPaid) // Filter out unpaid orders
                                        .map((order) => (
                                            <TableRow key={order._id}>
                                                <TableCell>{order._id}</TableCell>
                                                <TableCell>{order.createdAt ? order.createdAt.substring(0, 10) : null}</TableCell>
                                                <TableCell>${order.totalPrice}</TableCell>
                                                <TableCell>
                                                    {order.isPaid ? (
                                                        order.paidAt ? (
                                                            order.paidAt.substring(0, 10)
                                                        ) : null
                                                    ) : (
                                                        <i className="fas fa-times" style={{ color: "red" }}></i>
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    <Link to={`/orderDetail/${order._id}`}>
                                                        <Button
                                                            variant="outlined"
                                                            onClick={() => dispatch(getOrderDetails(order._id))}
                                                        >
                                                            Details
                                                        </Button>
                                                    </Link>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </Grid>
            </Grid>
        </Box>
    );
}

export default ProfileScreen;
