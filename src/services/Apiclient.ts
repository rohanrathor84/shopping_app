import axios, { AxiosInstance } from 'axios';
import { requestInterceptor } from './RequestInterceptor';
import { responseInterceptor } from './ResponseInterceptor';
import { BASE_URL } from './Urls';

// Create an Axios instance
const apiClient: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000, // Timeout in milliseconds
});

// Apply interceptors
apiClient.interceptors.request.use(requestInterceptor);
apiClient.interceptors.response.use(responseInterceptor.success, responseInterceptor.error);

// Retry logic
const retryRequest = async (error: any) => {
    const config = error.config;
    // Only retry if config option for retry is true
    if (config && config.retry && config.__retryCount < config.retry) {
        config.__retryCount += 1;
        return apiClient(config);
    }
    return Promise.reject(error);
};

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => retryRequest(error)
);

export default apiClient;
