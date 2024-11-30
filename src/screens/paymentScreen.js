import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material"; // MUI components
import { useNavigate } from "react-router-dom"; // For React Router v6
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps"; // Assuming you already have this component
import { savePaymentMethod } from "../redux/slices/cartSlice";

function PaymentScreen() {
    // Pulling out the shipping address from the cart
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    // State for managing the selected payment method
    const [paymentMethod, setPaymentMethod] = useState("PayPal");

    // If no shipping address, redirect to the Shipping screen
    const navigate = useNavigate();
    if (!shippingAddress.address) {
        navigate("/shipping");
    }

    // Dispatch hook
    const dispatch = useDispatch();

    // Handler for form submission
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigate("/placeorder"); // After choosing the payment method, redirect to PlaceOrder screen
    };

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 /> {/* Assuming you have this component for the checkout steps */}

            <form onSubmit={submitHandler}>
                <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        Select Payment Method
                    </Typography>
                    <FormControl component="fieldset">
                        <RadioGroup
                            aria-label="payment-method"
                            name="paymentMethod"
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        >
                            <FormControlLabel
                                value="PayPal"
                                control={<Radio />}
                                label="PayPal or Credit Card"
                            />
                            {/* You can add more payment options here if needed */}
                        </RadioGroup>
                    </FormControl>
                </Box>

                <Button type="submit" variant="contained" color="primary" sx={{ width: '100%' }}>
                    Continue
                </Button>
            </form>
        </FormContainer>
    );
}

export default PaymentScreen;
