import axiosInstance from "../axiosInstance";

class OrderAPI {
    createOrder = async (order) => {
        try {
            const token = JSON.parse(localStorage.getItem("userInfo")).token;

            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };

            const { data } = await axiosInstance.post(`/api/orders/add/`, order, config);

            return data;
        } catch (error) {
            throw error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message;
        }
    };

    getOrderDetails = async (id) => {
        try {
            const token = JSON.parse(localStorage.getItem("userInfo")).token;

            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };

            const { data } = await axiosInstance.get(`/api/orders/${id}/`, config);

            return data;
        } catch (error) {
            throw error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message;
        }
    };

    payOrder = async (id, paymentResult) => {
        try {
            const token = JSON.parse(localStorage.getItem("userInfo")).token;

            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };

            const { data } = await axiosInstance.put(
                `/api/orders/${id}/pay/`,
                paymentResult,
                config
            );

            return data;
        } catch (error) {
            throw error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message;
        }
    };

    listMyOrders = async () => {
        try {
            const token = JSON.parse(localStorage.getItem("userInfo")).token;

            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };

            const { data } = await axiosInstance.get(`/api/orders/myorders/`, config);

            return data;
        } catch (error) {
            throw error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message;
        }
    };

    deliverOrder = async (order) => {
        try {
            const token = JSON.parse(localStorage.getItem("userInfo")).token;

            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };

            const { data } = await axiosInstance.put(
                `/api/orders/${order._id}/deliver/`,
                {},
                config
            );

            return data;
        } catch (error) {
            throw error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message;
        }
    };
}

const orderAPI = new OrderAPI();

export default orderAPI;
