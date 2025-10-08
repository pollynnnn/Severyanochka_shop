import { api } from './client';

export async function registerUser({login, password, email, name}) {
    const { data } = await api.post('/auth/register', {login, password, email, name});
    return data;
}

export async function loginUser({login, email, password}) {
    const payload = email ? {email, password} : {login, password};
    const { data } = await api.post('/auth/login', payload);
    return data;
}
export async function fetchMe() {
    const { data } = await api.get('/users/me');
    return data;
}
