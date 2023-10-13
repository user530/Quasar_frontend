import axios, { AxiosError, AxiosRequestConfig } from 'axios';

// Refresh flag
let triedRefresh = false;

// Axios Instance with default settings
const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 5000,
    withCredentials: true
});

// Interceptor setup
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        // Handle regular errors and failed refresh attempts
        if (error.response?.status !== 401 || triedRefresh)
            return error;

        // Refresh attempt starts
        // Set refresh flag
        triedRefresh = true;

        try {
            // Try to refresh access token
            await axiosInstance.get('auth/refresh');

            // Try to make initial request and reset the refresh flag
            return axiosInstance(error.config as AxiosRequestConfig)
                .finally(() => triedRefresh = false);
        } catch (error) {
            throw error
        }
    }
);

export default axiosInstance;