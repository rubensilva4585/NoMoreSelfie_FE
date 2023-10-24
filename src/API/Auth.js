import { API_URL } from '../constants/General';
import axios from 'axios';
import { authToken } from './User';

const errorHandler = (error) => {
        console.error('API Error:', error);
        throw error;
};

export async function doLogin(formData) {
        try {
                const response = axios.post(`${API_URL}/auth/login`, formData);
                return response;
        } catch (error) {
                errorHandler(error);
        }
}

export async function doRegister(formData) {
        try {
                const response = axios.post(`${API_URL}/auth/register`, formData);
                return response;
        } catch (error) {
                errorHandler(error);
        }
}

export async function doLogout() {
        const response = await axios.post(`${API_URL}/auth/logout`, {
                headers: {
                        'Authorization': authToken(),
                },
        });

        return response.data;
}