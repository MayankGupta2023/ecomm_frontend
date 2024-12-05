import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Box, Card, CardMedia, Typography, Button, TextField, MenuItem, CircularProgress, Alert } from "@mui/material";
import { fetchProductDetails, createReview } from "../redux/slices/productSlice";
import { addToCart } from "../redux/slices/cartSlice";
import Rating from "../components/Rating";

function ProductScreen() {
    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const productDetails = useSelector((state) => state.product.productDetails);
    const { product, loading, error } = productDetails;

    const userLogin = useSelector((state) => state.user);
    const { userDetails } = userLogin;

    const productReviewCreate = useSelector((state) => state.product.createReview);
    const { loading: loadingProductReview, error: errorProductReview, success: successProductReview } = productReviewCreate;

    useEffect(() => {
        if (successProductReview) {
            setRating(0);
            setComment("");
        }
        dispatch(fetchProductDetails(id));
    }, [dispatch, id, successProductReview]);

    const addToCartHandler = () => {
        navigate(`/cart/${id}?qty=${qty}`);
        dispatch(addToCart(id, Number(qty)));
    };

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(createReview(id, { rating, comment }));
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Button variant="outlined" component={Link} to="/" sx={{ marginBottom: 2 }}>
                Go Back
            </Button>
            {loading ? (
                <CircularProgress />
            ) : error ? (
                <Alert severity="error">{error}</Alert>
            ) : (
                <Grid container spacing={4}>
                    {/* Product Image and Details */}
                    <Grid item xs={12} sm={6} md={4}>
                        <Card>
                            <CardMedia component="img" image={product.image_url} alt={product.name} />
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Box sx={{ backgroundColor: '#f0f0f0', padding: 2, }}>
                            <Typography variant="h4">{product.name}</Typography>
                            <Rating value={product.rating} text={`${product.numReviews} reviews`} color={"#f8e825"} />
                            <Typography variant="h6">Price: ₹{product.price}</Typography>
                            <Typography>Description: {product.description}</Typography>
                        </Box>


                    </Grid>

                    {/* Add to Cart Section */}
                    <Grid item xs={12} sm={6} md={4}>
                        <Card variant="outlined" sx={{ padding: 2 }}>
                            <Typography variant="h6">
                                Price: <strong>₹{product.price}</strong>
                            </Typography>
                            <Typography variant="h6">
                                Status: {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                            </Typography>
                            {product.countInStock > 0 && (
                                <TextField
                                    select
                                    label="Quantity"
                                    value={qty}
                                    onChange={(e) => setQty(e.target.value)}
                                    fullWidth
                                    sx={{ marginTop: 2 }}
                                >
                                    {[...Array(product.countInStock).keys()].map((x) => (
                                        <MenuItem key={x + 1} value={x + 1}>
                                            {x + 1}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            )}
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={addToCartHandler}
                                fullWidth
                                disabled={product.countInStock === 0}
                                sx={{ marginTop: 2 }}
                            >
                                Add to Cart
                            </Button>
                        </Card>
                    </Grid>

                    {/* Reviews Section */}
                    <Grid item xs={12}>
                        <Typography variant="h5">Reviews</Typography>
                        {product.reviews.length === 0 && <Alert severity="info">No reviews yet</Alert>}
                        {product.reviews.map((review) => (
                            <Box key={review._id} sx={{ borderBottom: "1px solid #ddd", padding: 2 }}>
                                <Typography variant="subtitle1">{review.name}</Typography>
                                <Rating color={"#f8e825"} value={review.rating} />
                                <Typography variant="body2">{review.createdAt.substring(0, 10)}</Typography>
                                <Typography>{review.comment}</Typography>
                            </Box>
                        ))}
                        <Box sx={{ marginTop: 4 }}>
                            <Typography variant="h6">Write a Review</Typography>
                            {loadingProductReview && <CircularProgress />}
                            {successProductReview && <Alert severity="success">Review submitted</Alert>}
                            {errorProductReview && <Alert severity="error">{errorProductReview}</Alert>}
                            {userDetails ? (
                                <Box component="form" onSubmit={submitHandler} sx={{ marginTop: 2 }}>
                                    <TextField
                                        select
                                        label="Rating"
                                        value={rating}
                                        onChange={(e) => setRating(e.target.value)}
                                        fullWidth
                                        sx={{ marginBottom: 2 }}
                                    >
                                        <MenuItem value="">Select...</MenuItem>
                                        <MenuItem value="1">1 - Poor</MenuItem>
                                        <MenuItem value="2">2 - Fair</MenuItem>
                                        <MenuItem value="3">3 - Good</MenuItem>
                                        <MenuItem value="4">4 - Very Good</MenuItem>
                                        <MenuItem value="5">5 - Excellent</MenuItem>
                                    </TextField>
                                    <TextField
                                        label="Comment"
                                        multiline
                                        rows={3}
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        fullWidth
                                        sx={{ marginBottom: 2 }}
                                    />
                                    <Button type="submit" variant="contained" color="primary">
                                        Submit
                                    </Button>
                                </Box>
                            ) : (
                                <Alert severity="info">
                                    Please <Link to="/login">sign in</Link> to write a review
                                </Alert>
                            )}
                        </Box>
                    </Grid>
                </Grid>
            )}
        </Box>
    );
}

export default ProductScreen;
