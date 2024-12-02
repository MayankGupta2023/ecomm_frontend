import axiosInstance from '../axiosInstance';

class UserAPI {
    async getUserDetails(userId) {
        try {
            const token = JSON.parse(localStorage.getItem('userInfo')).token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            };

            const { data } = await axiosInstance.get(`/api/users/${userId}`, config);
            return data;
        } catch (error) {
            throw error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message;
        }
    }

    async createUser(name, email, password) {
        try {
            const csrfToken = document.cookie
                .split('; ')
                .find(row => row.startsWith('csrftoken='))
                ?.split('=')[1];

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken, // Include CSRF token
                },
                withCredentials: true, // Ensure cookies are sent
            };

            const { data } = await axiosInstance.post(
                '/api/users/register/',
                { name, email, password },
                config
            );

            return data;
        } catch (error) {
            throw error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message;
        }
    }

    async updateUserDetails(userId, updateData) {
        try {
            const token = JSON.parse(localStorage.getItem('userInfo')).token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            };
            const { data } = await axiosInstance.put(
                `/api/users/profile/update/`,
                updateData,
                config
            );
            return data;
        } catch (error) {
            throw error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message;
        }
    }

    async deleteUser(userId) {
        try {
            const token = JSON.parse(localStorage.getItem('userInfo')).token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            };
            await axiosInstance.delete(`/api/users/delete/${userId}`, config);
        } catch (error) {
            throw error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message;
        }
    }

    async login(email, password) {
        try {
            const { data } = await axiosInstance.post(
                '/api/users/login/',
                { username: email, password: password }
            );
            return data;
        } catch (error) {
            throw error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message;
        }
    }
}

const userAPI = new UserAPI();

export default userAPI;
