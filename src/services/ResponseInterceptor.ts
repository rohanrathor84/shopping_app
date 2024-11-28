import { AxiosResponse, AxiosError } from 'axios';

export const responseInterceptor = {
    success: (response: AxiosResponse) => {
        // Handle the response data
        return response;
    },

    error: async (error: AxiosError) => {
        if (error.response) {
            // Handle HTTP errors (4xx, 5xx status codes)
            console.error(`[API Error]: ${error.response.status} - ${error.response.data}`);
            if (error.response.status === 401) {
                // Token expired or not authorized, redirect to login or refresh token
            }
            if (error.response.status === 500) {
                console.error('Server error');
            }
        } else if (error.request) {
            // No response was received from the server
            console.error('[No Response]', error.request);
        } else {
            // Something else happened in setting up the request
            console.error('[Unknown Error]', error.message);
        }
        return Promise.reject(error);
    },
};
