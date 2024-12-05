import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, Grid, Typography, Button, Card, CardContent, Divider } from "@mui/material";
import { removeFromCart } from "../redux/slices/cartSlice";
import Message from "../components/Message";
import { Link } from "react-router-dom";
import { Delete as DeleteIcon } from "@mui/icons-material";

function CartScreen() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // UseSelector is now placed inside the component body
    const cart = useSelector((state) => state.cart);
    const userInfo = useSelector((state) => state.user.userDetails); // Assuming user info is stored here
    const { cartItems = [] } = cart; // Default to empty array if cartItems is undefined

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    };

    const checkoutHandler = () => {
        // Check if the user is logged in
        console.log(userInfo)
        if (userInfo) {
            // If user is logged in, navigate directly to /shipping
            navigate("/shipping");
        } else {
            // If user is not logged in, navigate to /login with correct redirect query
            navigate("/login?redirect=shipping");
        }
        console.log(userInfo)

    };

    return (
        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 2 }}>
            {/* Cart Items Section */}
            <Grid item xs={12} md={8}>
                <Typography variant="h4" gutterBottom>
                    Shopping Cart
                </Typography>
                {cartItems.length === 0 ? (
                    <Message variant="info">
                        Your cart is empty. <Link to="/">Go Back</Link>
                    </Message>
                ) : (
                    <Box sx={{ mb: 2 }}>
                        {cartItems.map((item) => (
                            <Box key={item.product} sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                                {/* Image */}
                                <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
                                    <img
                                        src={item.image_url}
                                        alt={item.name}
                                        style={{ width: "100px", height: "100px", objectFit: "cover" }}
                                    />
                                </Box>

                                {/* Product Info */}
                                <Box sx={{ flex: 3, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                    <Link to={`/product/${item._id}`}>
                                        <Typography variant="body1" sx={{ textDecoration: "none" }}>
                                            {item.name}
                                        </Typography>
                                    </Link>
                                    <Typography variant="body2">Qty: {item.qty}</Typography>
                                    <Typography variant="body2">₹{Number(item.price).toFixed(2)}</Typography>
                                </Box>

                                {/* Remove Button */}
                                <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
                                    <Button
                                        variant="text"
                                        color="error"
                                        onClick={() => removeFromCartHandler(item._id)}
                                    >
                                        <DeleteIcon />
                                    </Button>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                )}
            </Grid>

            {/* Cart Summary Section */}
            <Grid item xs={12} md={4}>
                <Card>
                    <CardContent>
                        <Typography variant="h6">
                            Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
                        </Typography>
                        <Typography variant="h5" sx={{ mb: 2 }}>
                            ₹
                            {cartItems
                                .reduce((acc, item) => acc + item.qty * Number(item.price), 0)
                                .toFixed(2)}
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            disabled={cartItems.length === 0}
                            onClick={checkoutHandler}
                        >
                            Proceed To Checkout here
                        </Button>
                    </CardContent>
                </Card>
            </Grid>
        </Box>
    );
}

export default CartScreen;
