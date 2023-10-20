import axios, { AxiosError, AxiosRequestConfig, CreateAxiosDefaults } from 'axios';

export class MyAxiosInstance {
    private controller = new AbortController();
    private defaultAxiosConfig: CreateAxiosDefaults = {
        baseURL: process.env.API,
        timeout: 5000,
        withCredentials: true,
        signal: this.controller.signal
    };
    private myAxios = axios.create(this.defaultAxiosConfig);

    constructor() {
        // Add response interceptor to handle refresh token attempt
        this.myAxios.interceptors.response.use(
            (response) => response,
            async (error: AxiosError) => {
                // Pass non auth errors through
                if (error.response?.status !== 401) throw error;

                // Try to refresh the token
                await axios.get('auth/refresh', { baseURL: process.env.API, withCredentials: true }).catch(() => { return });

                // Make a second attempt
                return axios(error.config as AxiosRequestConfig)
            }
        )
    }

    public makeGetRequest = async <T>(url: string, config?: AxiosRequestConfig | undefined) => {
        this.controller.abort();

        const newController = new AbortController();
        this.controller = newController;

        return this.myAxios.get<T>(url, { ...config, signal: newController.signal });
    }

    public makePostRequest = async <T>(url: string, data?: unknown, config?: AxiosRequestConfig | undefined) => {
        this.controller.abort();

        const newController = new AbortController();
        this.controller = newController;

        return this.myAxios.post<T>(url, data, { ...config, signal: newController.signal });
    }

    public makePatchRequest = async <T>(url: string, data?: unknown, config?: AxiosRequestConfig | undefined) => {
        this.controller.abort();

        const newController = new AbortController();
        this.controller = newController;

        return this.myAxios.patch<T>(url, data, { ...config, signal: newController.signal });
    }

    public makeDeleteRequest = async <T>(url: string, config?: AxiosRequestConfig | undefined) => {
        this.controller.abort();

        const newController = new AbortController();
        this.controller = newController;

        return this.myAxios.delete<T>(url, { ...config, signal: newController.signal });
    }
}