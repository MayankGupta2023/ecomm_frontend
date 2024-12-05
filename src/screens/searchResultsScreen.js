import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const SearchResultsScreen = () => {
    const location = useLocation();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const searchParams = new URLSearchParams(location.search);
    const keyword = searchParams.get("keyword") || "";
    const page = searchParams.get("page") || 1;

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const { data } = await axios.get(`/api/products`, {
                    params: { keyword, page },
                });
                setProducts(data.products);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
            setLoading(false);
        };

        fetchProducts();
    }, [keyword, page]);

    if (loading) {
        return <div>Loading...</div>;
    }


    return (
        <div>
            <h1>Search Results for "{keyword}"</h1>

            {products.map((product) => (
                <div
                    key={product._id}
                    style={{
                        marginBottom: "1rem",
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                    }}
                >
                    <Link to={`/product/${product._id}`}>
                        {/* Image */}
                        <img
                            src={product.image_url} // Assuming 'image' holds the URL to the product image
                            alt={product.name}
                            style={{
                                width: "100px",
                                height: "100px",
                                objectFit: "cover",
                                borderRadius: "8px",
                                marginLeft: "1rem", // Added margin left here
                            }}
                        />
                    </Link>

                    <div>
                        {/* Name */}
                        <Link to={`/product/${product._id}`} style={{ textDecoration: "none", color: "black" }}>
                            <h3>{product.name}</h3>
                        </Link>
                        {/* Price */}
                        <p>${product.price}</p>
                    </div>
                </div>
            ))}
        </div>

    );
};

export default SearchResultsScreen;
