import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import axiosRetry from 'axios-retry';
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

// Configure axios-retry
axiosRetry(apiClient, {
    retries: 3, // Number of retries
    retryDelay: (retryCount) => {
        console.log(`Retrying request... Attempt ${retryCount}`);
        return retryCount * 1000; // Exponential backoff: 1s, 2s, 3s, etc.
    },
    retryCondition: (error) => {
        // Retry on network errors or 5xx server errors
        if (
            axiosRetry.isNetworkError(error) || // Retry for network errors
            axiosRetry.isRetryableError(error) || // Retry for retryable errors
            (error.response && error.response.status >= 500 && error.response.status <= 599) // Retry for 5xx server errors
        ) {
            return true;
        }
        return false; // Explicitly return false when conditions are not met
    },
});

export async function apiRequest<T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    url: string,
    data?: any,
    config?: AxiosRequestConfig
): Promise<T> {
    try {
        const response = await apiClient.request<T>({
            method,
            url,
            data,
            ...config,
        });
        return response.data;
    } catch (error) {
        // Handle error globally if needed
        console.error('[Global API Error]', error);
        throw error;
    }
}

export default apiClient;
