import httpClient from '../../../common/services/httpClient';

export const loginService = async (credentials: any) => {
    // Get CSRF cookie before login
    try {
        await httpClient.get('/sanctum/csrf-cookie', { baseURL: '' });
    } catch (e) {
        // Fallback or ignore if already set
    }
    
    const response = await httpClient.post('/auth/login', credentials);
    return response.data;
};

export const logoutService = async () => {
    const response = await httpClient.post('/auth/logout');
    return response.data;
};
