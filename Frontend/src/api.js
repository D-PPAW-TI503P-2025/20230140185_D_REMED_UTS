import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api'
});

// Helper to set role and user headers
export const setRoleHeader = (role) => {
    if (role) {
        api.defaults.headers.common['x-user-role'] = role;
        // Set a default user ID for borrowing simulation
        api.defaults.headers.common['x-user-id'] = '123';
    } else {
        delete api.defaults.headers.common['x-user-role'];
        delete api.defaults.headers.common['x-user-id'];
    }
};

export default api;
