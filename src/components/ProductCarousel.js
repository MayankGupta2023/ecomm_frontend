import React, { useEffect } from "react";
import { Box, Typography, Grid, IconButton } from "@mui/material";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material"; // For navigation arrows
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "./Loader.js";
import Message from "./Message.js";
import { fetchTopRatedProducts } from "../redux/slices/productSlice.js";

function ProductCarousel() {
    const dispatch = useDispatch();
    const topRatedProducts = useSelector((state) => state.product.topRatedProducts);
    const { error, loading, products } = topRatedProducts;

    const [currentIndex, setCurrentIndex] = React.useState(0);

    useEffect(() => {
        dispatch(fetchTopRatedProducts());
    }, [dispatch]);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
    };

    const handlePrev = () => {
        setCurrentIndex(
            (prevIndex) => (prevIndex - 1 + products.length) % products.length
        );
    };

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <Message variant="danger">{error}</Message>;
    }

    if (products.length === 0) {
        return <Message variant="info">No products found</Message>;
    }

    return (
        <Box
            sx={{
                position: "relative",
                width: "70%", // Set carousel width to 70%
                margin: "0 auto", // Center the carousel horizontally
                overflow: "hidden",
                backgroundColor: "#c5c6c8",
                paddingTop: "20px", // Added padding to top
                paddingBottom: "20px", // Added padding to bottom
            }}
        >
            <Grid container justifyContent="center" alignItems="center">
                <Grid item xs={12} sm={10} md={8}>
                    <Box sx={{ position: "relative", display: "flex", justifyContent: "center" }}>
                        <Box
                            sx={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            {/* Product Image */}
                            <Link to={`/product/${products[currentIndex]._id}`}>
                                <img
                                    src={products[currentIndex].image_url}
                                    alt={products[currentIndex].name}
                                    style={{
                                        width: "250px", // Set the size of the image
                                        height: "250px",
                                        objectFit: "cover",
                                        borderRadius: "50%", // Make it circular
                                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", // Optional shadow for effect
                                    }}
                                />
                            </Link>
                        </Box>

                        {/* Carousel Caption */}
                        <Box
                            sx={{
                                position: "absolute",
                                bottom: "10px", // Adjust the position
                                left: "20px",
                                color: "#fff",
                                backgroundColor: "rgba(0, 0, 0, 0.7)", // Darker background
                                padding: "4px 10px", // Smaller padding for a compact look
                                borderRadius: "5px",
                            }}
                        >
                            <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
                                {products[currentIndex].name} (₹{products[currentIndex].price})
                            </Typography>
                        </Box>

                        {/* Navigation Arrows */}
                        <IconButton
                            onClick={handlePrev}
                            sx={{
                                position: "absolute",
                                top: "50%",
                                left: "10px",
                                transform: "translateY(-50%)",
                                backgroundColor: "rgba(0, 0, 0, 0.5)",
                                color: "white",
                                "&:hover": {
                                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                                },
                            }}
                        >
                            <ArrowBackIosNew />
                        </IconButton>
                        <IconButton
                            onClick={handleNext}
                            sx={{
                                position: "absolute",
                                top: "50%",
                                right: "10px",
                                transform: "translateY(-50%)",
                                backgroundColor: "rgba(0, 0, 0, 0.5)",
                                color: "white",
                                "&:hover": {
                                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                                },
                            }}
                        >
                            <ArrowForwardIos />
                        </IconButton>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

export default ProductCarousel;
