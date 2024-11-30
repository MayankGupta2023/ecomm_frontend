import React, { useEffect } from "react";
import { Grid, Typography, Box, Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import ProductCarousel from "../components/ProductCarousel";
import { fetchProductList } from "../redux/slices/productSlice";
import Paginate from "../components/Paginate";
import { useParams, useLocation } from "react-router-dom";

function HomeScreen() {
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.product.productList);
    const topRatedProducts = useSelector((state) => state.product.topRatedProducts);

    const { products, loading, error, page, pages } = productList;
    const { pageNumber = 1 } = useParams();  // Default to 1 if pageNumber is not available
    const { products: topProducts, loading: topLoading, error: topError } = topRatedProducts;

    // Use useLocation for handling query params with React Router v6
    const location = useLocation();
    const keyword = location.search;

    useEffect(() => {
        dispatch(fetchProductList(keyword, pageNumber)); // pageNumber will always be a valid number
    }, [dispatch, keyword, pageNumber]);

    return (
        <Box sx={{ padding: "20px" }}>
            {/* Top-rated products carousel only visible when no keyword in search */}
            {!keyword && (
                <>
                    <Typography variant="h5" sx={{ fontWeight: "bold", color: "black", mb: 2 }}>
                        TOP-RATED PRODUCTS
                    </Typography>
                    <ProductCarousel />
                </>
            )}

            {/* Latest Products Section */}
            <Typography variant="h5" sx={{ fontWeight: "bold", color: "black", mb: 2 }}>
                LATEST PRODUCTS
            </Typography>

            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <Container>
                    <Grid container spacing={3}>
                        {products.map((product) => (
                            <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
                                <Product product={product} />
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            )}

            {/* Pagination */}
            <Box sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                <Paginate page={page} pages={pages} keyword={keyword} />
            </Box>
        </Box>
    );
}

export default HomeScreen;
