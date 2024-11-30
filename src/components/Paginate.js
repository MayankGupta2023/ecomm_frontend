import React from "react";
import { Pagination, PaginationItem } from "@mui/material";  // MUI 5 imports
import { Link } from "react-router-dom";  // React Router v6

const Paginate = ({ page, pages, keyword = "" }) => {
    return (
        pages > 1 && (
            <Pagination
                count={pages}
                page={page}
                siblingCount={1}
                boundaryCount={1}
                variant="outlined"
                shape="rounded"
                renderItem={(item) => (
                    <PaginationItem
                        {...item}
                        component={Link}
                        to={keyword ? `/search?keyword=${keyword}&page=${item.page}` : `/page/${item.page}`}
                        sx={{
                            textDecoration: "none",
                            color: "inherit",
                        }}
                    />
                )}
            />
        )
    );
};

export default Paginate;
