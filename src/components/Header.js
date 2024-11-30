import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
    AppBar,
    Toolbar,
    IconButton,
    MenuItem,
    Menu,
    Box,
    Typography,
} from "@mui/material";  // Updated to MUI v5
import { ShoppingCart, AccountCircle } from "@mui/icons-material";  // Updated icons import
import SearchBox from "./SearchBox";
import logo from "../logo.png";
import { logout } from "../redux/slices/userSlice";

const Header = () => {
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.user);
    const { userDetails } = userLogin;

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        dispatch(logout());
        handleMenuClose();
        window.location.reload(); // Reload the page
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: "#212121" }}>
                <Toolbar>
                    <Link to="/" style={{ textDecoration: "none" }}>
                        <img
                            src={logo}
                            alt="FooTshop"
                            style={{
                                height: 60,
                            }}
                        />
                    </Link>
                    <Box sx={{ ml: "5vw" }}>
                        <SearchBox />
                    </Box>
                    <Box sx={{ flexGrow: 1 }} />

                    <Box>
                        <IconButton
                            aria-label="show cart items"
                            color="inherit"
                            component={Link}
                            to="/cart"
                        >
                            <ShoppingCart />
                        </IconButton>
                    </Box>
                    {userDetails ? (
                        <>
                            <IconButton
                                edge="end"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>

                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                open={open}
                                onClose={handleMenuClose}
                            >
                                <MenuItem
                                    component={Link}
                                    to="/profile"
                                    onClick={handleMenuClose}
                                >
                                    Profile
                                </MenuItem>

                                <MenuItem onClick={handleLogout}>
                                    Logout
                                </MenuItem>
                            </Menu>
                        </>
                    ) : (
                        <Box>
                            <IconButton
                                aria-label="login"
                                color="inherit"
                                component={Link}
                                to="/login"
                            >
                                <AccountCircle />
                            </IconButton>
                        </Box>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;
