import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom"; // Updated import
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
// import { PayPalButton } from "react-paypal-button-v2";
import { useDispatch, useSelector } from "react-redux";

import Message from "../components/Message";
import Loader from "../components/Loader";
import { payOrder } from "../redux/slices/orderSlice";

function OrderScreen() {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Using useNavigate instead of history

    const [sdkReady, setSdkReady] = useState(false);

    const order = useSelector((state) => state.order);
    const { orderDetails, error, loading } = order;

    const userLogin = useSelector((state) => state.user);
    const { userDetails } = userLogin;

    // Calculate items price
    const calculateItemsPrice = () => {
        if (orderDetails?.orderItems?.length > 0) {
            return orderDetails.orderItems.reduce(
                (total, item) => total + item.price * item.qty,
                0
            ).toFixed(2);
        }
        return 0;
    };

    const itemsPrice = calculateItemsPrice();

    // PayPal Button Script
    const addPayPalScript = () => {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src =
            "https://www.paypal.com/sdk/js?client-id=YOUR_CLIENT_ID"; // Replace with your PayPal client ID
        script.async = true;
        script.onload = () => {
            setSdkReady(true);
        };
        document.body.appendChild(script);
    };

    useEffect(() => {
        if (!userDetails) {
            navigate("/login");
        } else if (orderDetails && !orderDetails.isPaid) {
            if (!window.paypal) {
                addPayPalScript();
            } else {
                setSdkReady(true);
            }
        }
    }, [dispatch, navigate, orderDetails, userDetails]);

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(orderDetails._id, paymentResult));
    };

    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant="danger">{error}</Message>
    ) : (
        <div>
            <h1>Order: {orderDetails?._id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Name: </strong> {orderDetails?.user?.name}
                            </p>
                            <p>
                                <strong>Email: </strong>
                                <a href={`mailto:${orderDetails?.user?.email}`}>
                                    {orderDetails?.user?.email}
                                </a>
                            </p>
                            <p>
                                <strong>Address: </strong>
                                {orderDetails?.shippingAddress?.address},{" "}
                                {orderDetails?.shippingAddress?.city},{" "}
                                {orderDetails?.shippingAddress?.postalCode},{" "}
                                {orderDetails?.shippingAddress?.country}
                            </p>
                            {orderDetails?.isDelivered ? (
                                <Message variant="success">
                                    Delivered on {orderDetails?.deliveredAt?.substring(0, 10)}
                                </Message>
                            ) : (
                                <Message variant="warning">Not Delivered</Message>
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment</h2>
                            <p>
                                <strong>Method: </strong> {orderDetails?.paymentMethod}
                            </p>
                            {orderDetails?.isPaid ? (
                                <Message variant="success">
                                    Paid on {orderDetails?.paidAt?.substring(0, 10)}
                                </Message>
                            ) : (
                                <Message variant="warning">Not Paid</Message>
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {orderDetails?.orderItems?.length === 0 ? (
                                <Message>Order is empty</Message>
                            ) : (
                                <ListGroup variant="flush">
                                    {orderDetails.orderItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        fluid
                                                        rounded
                                                    />
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} x ₹{item.price} = ₹
                                                    {(item.qty * item.price).toFixed(2)}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items:</Col>
                                    <Col>₹{itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping:</Col>
                                    <Col>₹{orderDetails?.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax:</Col>
                                    <Col>₹{orderDetails?.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total:</Col>
                                    <Col>₹{orderDetails?.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            {!orderDetails?.isPaid && (
                                <ListGroup.Item>
                                    {!sdkReady ? (
                                        <Loader />
                                    ) : (
                                        // <PayPalButton
                                        //     amount={orderDetails?.totalPrice}
                                        //     onSuccess={successPaymentHandler}
                                        // />
                                        <Button>Nothing </Button>
                                    )}
                                </ListGroup.Item>
                            )}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default OrderScreen;
