import axios from 'axios';

class ProductAPI {
    // async getProductList(keyword = '', pageNumber = '') {
    //     try {
    //         const { data } = await axios.get(`/api/products${keyword}`, {
    //             params: {

    //                 page: pageNumber
    //             }
    //         });
    //         return data;
    //     } catch (error) {
    //         throw error.response && error.response.data.detail
    //             ? error.response.data.detail
    //             : error.message;
    //     }
    // }

    async getProductList(keyword = '', pageNumber = '') {
        try {
            const { data } = await axios.get(`/api/products`, {
                params: {
                    keyword: keyword,  // Assuming 'keyword' should be a query parameter
                    page: pageNumber,
                }
            });
            return data;
        } catch (error) {
            // Enhanced error handling
            if (error.response && error.response.data) {
                // Include response status code and message in the error
                throw new Error(`Error ${error.response.status}: ${error.response.data.detail || error.message}`);
            } else {
                throw new Error(`Network Error: ${error.message}`);
            }
        }
    }


    async getProductDetails(productId) {
        try {
            const { data } = await axios.get(`/api/products/${productId}`);
            console.log(data)
            return data;
        } catch (error) {
            throw error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message;
        }
    }

    async createProductReview(productId, review) {
        try {
            const token = JSON.parse(localStorage.getItem("userInfo")).token;

            // Extract CSRF token from cookies
            const csrfToken = document.cookie
                .split('; ')
                .find(row => row.startsWith('csrftoken='))
                ?.split('=')[1];

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'X-CSRFToken': csrfToken, // Include CSRF token
                },
            };

            console.log(config.headers);

            const { data } = await axios.post(
                `/api/products/${productId}/reviews/`,
                review,
                config
            );
            return data;
        } catch (error) {
            throw error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message;
        }
    }


    async getTopRatedProducts() {
        try {
            const { data } = await axios.get(`/api/products/top/`);
            return data;
        } catch (error) {
            throw error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message;
        }
    }
}

const productAPI = new ProductAPI();

export default productAPI;