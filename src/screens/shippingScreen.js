import React, { useState } from "react";

/* REACT BOOTSTRAP */
import { Button, Form } from "react-bootstrap";

/* COMPONENTS */
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";

/* REACT - REDUX */
import { useDispatch, useSelector } from "react-redux";

/* ACTION CREATORS */
import { saveShippingAddress } from "../redux/slices/cartSlice";

/* REACT ROUTER DOM */
import { useNavigate } from "react-router-dom";

function ShippingScreen() {
    // PULLING OUT SHIPPING ADDRESS FROM CART
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    // STATE
    const [address, setAddress] = useState(shippingAddress.address || "");
    const [city, setCity] = useState(shippingAddress.city || "");
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || "");
    const [country, setCountry] = useState(shippingAddress.country || "");

    const dispatch = useDispatch();
    const navigate = useNavigate(); // useNavigate hook replaces history.push in react-router-dom v6

    // HANDLERS
    const submitHandler = (e) => {
        e.preventDefault();

        /* FIRING OFF THE ACTION CREATORS USING DISPATCH TO SAVE ADDRESS */
        dispatch(
            saveShippingAddress({
                address,
                city,
                postalCode,
                country,
            })
        );

        // PUSHING USER TO PAYMENTS PAGE AFTER SAVING ADDRESS
        navigate("/payment");
    };

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 />

            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Enter Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="city">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Enter City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="postalCode">
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Enter Postal Code"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="country">
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Enter Country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    />
                </Form.Group>

                <Button className="my-3" type="submit" variant="primary">
                    Continue
                </Button>
            </Form>
        </FormContainer>
    );
}

export default ShippingScreen;
