import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom"; // Updated import for React Router v6
import { Grid, TextField, Button, Typography, Box } from "@mui/material"; // Updated imports for MUI v5
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/slices/userSlice"; // Assuming login action exists in userSlice
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";

function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate(); // Updated to useNavigate hook
    const location = useLocation(); // Updated to useLocation hook

    // Extract the redirect query param
    const redirect = new URLSearchParams(location.search).get("redirect") || "/";

    // Getting user login state from Redux store
    const userLogin = useSelector((state) => state.user);
    const { userDetails, loading, error } = userLogin;

    useEffect(() => {
        if (userDetails) {
            navigate(redirect); // Updated to use navigate for redirection
        }
    }, [navigate, userDetails, redirect]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password)); // Dispatch login action
    };

    return (
        <FormContainer>
            <Typography component="h1" variant="h5" sx={{ fontWeight: "bold" }}>
                Sign In
            </Typography>
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader />}
            <Box
                component="form"
                sx={{
                    mt: 2,
                    width: "100%",
                }}
                onSubmit={submitHandler}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            variant="filled"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="filled"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="outlined"
                    color="primary"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Sign In
                </Button>
                <Grid container justifyContent="flex-start">
                    <Grid item>
                        New Customer?{" "}
                        <Link
                            to={redirect ? `/register?redirect=${redirect}` : "/register"}
                            style={{ textDecoration: "none", color: "inherit" }}
                        >
                            Register
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </FormContainer>

    );
}

export default LoginScreen;
