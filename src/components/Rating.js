import React from "react";
import { Typography, Box } from "@mui/material"; // Updated import
import { Star, StarHalf, StarBorder } from "@mui/icons-material"; // Updated import

function Rating({ value, text, color }) {
    return (
        <>
            <Box display="flex" alignItems="center">
                {/* Repeat the star logic for each value */}
                {[1, 2, 3, 4, 5].map((star) => (
                    <Box key={star} mr={1}>
                        {value >= star ? (
                            <Star sx={{ color }} fontSize="small" />
                        ) : value >= star - 0.5 ? (
                            <StarHalf sx={{ color }} fontSize="small" />
                        ) : (
                            <StarBorder sx={{ color }} fontSize="small" />
                        )}
                    </Box>
                ))}
            </Box>
            <Typography variant="subtitle2" color="textSecondary">
                {text ? text : ""}
            </Typography>
        </>
    );
}

export default Rating;
