import axiosInstance from "../axiosInstance";

class CartAPI {
    async fetchProduct(productId) {
        try {
            const { data } = await axiosInstance.get(`/api/products/${productId}`);
            return data;
        } catch (error) {
            throw error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message;
        }
    }
}

const cartAPI = new CartAPI();

export default cartAPI;
