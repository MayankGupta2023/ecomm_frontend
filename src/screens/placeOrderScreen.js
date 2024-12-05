import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, Grid, Typography, Button, Card, List, ListItem, ListItemText, Divider, CardContent } from "@mui/material";
import { createOrder } from "../redux/slices/orderSlice";
import CheckoutSteps from "../components/CheckoutSteps";
import Message from "../components/Message";

function PlaceOrderScreen() {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Using useNavigate instead of history

    const cart = useSelector((state) => state.cart);
    const order = useSelector((state) => state.order);
    const { error } = order;

    // Price calculations
    const itemsPrice = cart.cartItems.reduce(
        (acc, item) => acc + item.price * item.qty,
        0
    );
    const shippingPrice = itemsPrice > 100 ? 0 : 10;
    const taxPrice = Number((0.082 * itemsPrice).toFixed(2));
    const totalPrice = (
        Number(itemsPrice) +
        Number(shippingPrice) +
        Number(taxPrice)
    ).toFixed(2);

    useEffect(() => {
        if (!cart.paymentMethod) {
            navigate("/payment");
        }
    }, [cart.paymentMethod, navigate]);

    const data = {
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: itemsPrice.toFixed(2).toString(),
        shippingPrice: shippingPrice.toFixed(2).toString(),
        taxPrice: taxPrice.toFixed(2).toString(),
        totalPrice: totalPrice.toString(),
    };

    const placeOrder = async () => {
        try {
            await dispatch(createOrder(data)).unwrap();
            navigate(`/orderDetail`);
        } catch (error) {
            console.error("Order creation failed", error);
        }
    };

    return (
        <Box sx={{ padding: 2 }}>
            <CheckoutSteps step1 step2 step3 step4 />
            <Grid container spacing={3}>
                <Grid item md={8} xs={12}>
                    <Card sx={{ padding: 2 }}>
                        <List>
                            <ListItem>
                                <Typography variant="h6">Shipping</Typography>
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="Shipping Address"
                                    secondary={`${cart.shippingAddress.address}, ${cart.shippingAddress.city}, ${cart.shippingAddress.postalCode}, ${cart.shippingAddress.country}`}
                                />
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <Typography variant="h6">Payment</Typography>
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Payment Method" secondary={cart.paymentMethod} />
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <Typography variant="h6">Order Items</Typography>
                            </ListItem>
                            {cart.cartItems.length === 0 ? (
                                <Message variant="info">Your cart is empty</Message>
                            ) : (
                                <List>
                                    {cart.cartItems.map((item, index) => (
                                        <ListItem key={index}>
                                            <Grid container spacing={2} alignItems="center">
                                                <Grid item md={2} xs={3}>
                                                    <img
                                                        src={item.image_url}
                                                        alt={item.name}
                                                        style={{ width: "100%", height: "auto", objectFit: "cover" }}
                                                    />
                                                </Grid>
                                                <Grid item md={6} xs={7}>
                                                    <Link to={`/product/${item.product}`} style={{ textDecoration: "none" }}>
                                                        <Typography variant="body1">{item.name}</Typography>
                                                    </Link>
                                                </Grid>
                                                <Grid item md={4} xs={2}>
                                                    <Typography variant="body2">{item.qty} x ₹{item.price} = ₹{(item.qty * item.price).toFixed(2)}</Typography>
                                                </Grid>
                                            </Grid>
                                        </ListItem>
                                    ))}
                                </List>
                            )}
                        </List>
                    </Card>
                </Grid>
                <Grid item md={4} xs={12}>
                    <Card sx={{ padding: 2 }}>
                        <List>
                            <ListItem>
                                <Typography variant="h6">Order Summary</Typography>
                            </ListItem>
                            <ListItem>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <Typography variant="body1">Items:</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body1">₹{itemsPrice.toFixed(2)}</Typography>
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <ListItem>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <Typography variant="body1">Shipping:</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body1">₹{shippingPrice.toFixed(2)}</Typography>
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <ListItem>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <Typography variant="body1">Tax:</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body1">₹{taxPrice}</Typography>
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <ListItem>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <Typography variant="body1">Total:</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body1">₹{totalPrice}</Typography>
                                    </Grid>
                                </Grid>
                            </ListItem>
                            {error && (
                                <ListItem>
                                    <Message variant="danger">{error}</Message>
                                </ListItem>
                            )}
                            <ListItem>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    disabled={cart.cartItems.length === 0}
                                    onClick={placeOrder}
                                >
                                    Place Order
                                </Button>
                            </ListItem>
                        </List>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}

export default PlaceOrderScreen;
