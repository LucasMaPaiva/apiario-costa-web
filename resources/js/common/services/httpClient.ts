import axios from 'axios';

const httpClient = axios.create({
    baseURL: '/', // Use root for WEB routes
    withCredentials: true,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json',
    },
});

export default httpClient;
