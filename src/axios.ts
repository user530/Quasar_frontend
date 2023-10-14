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
            throw error;

        // Refresh attempt starts
        // Set refresh flag
        triedRefresh = true;

        // Try to refresh access token
        await axiosInstance.get('auth/refresh')
            .catch(() => { return });

        // Try to make initial request and reset the refresh flag
        return axiosInstance(error.config as AxiosRequestConfig)
            .catch((err) => { throw err })
            .finally(() => triedRefresh = false);
    }
);

export default axiosInstance;