import React from "react";
import { Link } from "react-router-dom";
import { Breadcrumbs, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

// Using MUI v5 styled API for styling
const LinkStyled = styled(Link)(({ theme }) => ({
    display: "flex",
    color: theme.palette.grey[600],
    textDecoration: "none",
    "&.active": {
        color: theme.palette.primary.main,
    },
}));

const TypographyStyled = styled(Typography)(({ theme }) => ({
    display: "flex",
    color: theme.palette.grey[600],
    "&.active": {
        color: theme.palette.primary.main,
    },
}));

function CheckoutSteps({ step1, step2, step3 }) {
    return (
        <Breadcrumbs aria-label="breadcrumb">
            <LinkStyled
                to="/login"
                className={step1 ? "active" : ""}
            >
                {step1 ? "Login" : "Login (Incomplete)"}
            </LinkStyled>

            <LinkStyled
                to="/shipping"
                className={step2 ? "active" : ""}
            >
                {step2 ? "Shipping" : "Shipping (Incomplete)"}
            </LinkStyled>

            <TypographyStyled
                color={step3 ? "textPrimary" : "textSecondary"}
                className={step3 ? "active" : ""}
            >
                {step3 ? "Place Order" : "Place Order (Incomplete)"}
            </TypographyStyled>
        </Breadcrumbs>
    );
}

export default CheckoutSteps;
