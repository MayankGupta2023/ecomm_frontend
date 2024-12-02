import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL, // Automatically picks the environment variable
});

export default axiosInstance;
