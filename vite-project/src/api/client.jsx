import axios from 'axios'

const api = axios.create({
    baseURL: 'https://ivfedotovshopapi.netlify.app/.netlify/functions/app/',
    headers: {
        'Content-Type': 'application/json',
    },
});

//автопостановка токена
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('auth_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

//обработчик ошибок 401
api.interceptors.responce.use((responce) => {
    (res) => res,
    (err) => {
        if (err?.responce?.status === 401) {
            localStorage.removeItem('auth_token')
        }
        return Promise.reject(err);
    }
});

export default api

