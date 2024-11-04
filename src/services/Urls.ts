export const BASE_URL = 'https://api.example.com';

export const urls = {
    getUser: '/users',
    createUser: '/users/create',
    updateUser: (id: number) => `/users/${id}/update`,
    deleteUser: (id: number) => `/users/${id}/delete`,
};
