import { InternalAxiosRequestConfig } from 'axios';

export const requestInterceptor = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    // Add custom headers or logic before the request is sent
    const token = 'your-access-token'; // Retrieve the token from a secure storage
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    // You can also add other headers, modify config, etc.
    config.headers['Content-Type'] = 'application/json';
    return config;
};
