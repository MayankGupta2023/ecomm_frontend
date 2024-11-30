import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Updated import
import { Box, InputBase, IconButton, styled } from "@mui/material"; // Updated import for MUI v5
import { Search as SearchIcon } from "@mui/icons-material"; // Updated import for MUI v5

// Use the styled API to create styled components
const RootBox = styled(Box)(({ theme }) => ({
    display: "flex",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "#fff",
    boxShadow: "0 0 3px 1px rgba(0, 0, 0, 0.1)",
    width: "100%",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    marginLeft: theme.spacing(2),
    flex: 1,
    fontSize: "1rem",
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
    padding: theme.spacing(1),
    backgroundColor: "grey",
    color: "#fff",
    "&:hover": {
        backgroundColor: "black",
    },
}));

function SearchBox() {
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate(); // Replaced useHistory with useNavigate

    // const submitHandler = (e) => {
    //     e.preventDefault();

    //     // Use navigate to push the URL with the query parameters
    //     navigate(`/?keyword=${keyword}&page=1`); // Updated navigation with navigate
    // };

    const submitHandler = (e) => {
        e.preventDefault();

        // Redirect to the desired path with query parameters
        const searchPath = keyword.trim() ? `/search?keyword=${keyword}&page=1` : '/search';
        navigate(searchPath);
    };


    return (
        <RootBox component="form" onSubmit={submitHandler}>
            <StyledInputBase
                placeholder="Search for products..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            />
            <StyledIconButton type="submit" aria-label="search">
                <SearchIcon />
            </StyledIconButton>
        </RootBox>
    );
}

export default SearchBox;
