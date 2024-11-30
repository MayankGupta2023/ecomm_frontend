import React from "react";
import { Link } from "react-router-dom";
import { Card, CardActionArea, CardContent, CardMedia, Paper, Typography } from "@mui/material";
import Rating from "./Rating";

function Product({ product }) {
    return (
        <Paper sx={{ maxWidth: 345, margin: "5px", display: 'flex', flexDirection: 'column' }}>
            <CardActionArea component={Link} to={`/product/${product._id}`}>
                <CardMedia
                    component="img"
                    sx={{
                        objectFit: "contain",
                        height: "200px", // Adjust height to ensure image doesn't overflow
                        width: "100%", // Ensure full width scaling
                    }}
                    image={product.image}
                    alt={product.name}
                />
                <CardContent sx={{ textAlign: "center", display: 'flex', flexDirection: 'column', padding: "16px" }}>
                    <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 600 }}>
                        {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', flexDirection: "column", alignItems: 'center', marginBottom: '10px' }}>
                        <Rating
                            value={product.rating}
                            text={`${product.numReviews} reviews`}
                            color="#f8e825"
                        />
                    </Typography>
                    <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
                        ₹{product.price}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Paper>
    );
}

export default Product;
