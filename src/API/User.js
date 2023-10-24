import { API_URL, SESSION_TOKEN } from '../constants/General';
import axios from 'axios';

export const authToken = () => {
        return 'Bearer ' + sessionStorage.getItem(SESSION_TOKEN);
}

const errorHandler = (error) => {
        console.error('API Error:', error);
        throw error;
};

export async function getSupplierImages() {
        const response = await axios.get(`${API_URL}/supplier/images`, {
                headers: {
                        'Authorization': authToken(),
                },
        });
        return response.data;
}

export async function uploadSupplierImages(imageFiles) {
        const formData = new FormData();
        imageFiles.forEach((file, index) => {
                formData.append(`images[${index}]`, file);
        });

        try {
                const response = axios.post(`${API_URL}/supplier/images`, formData, {
                        headers: {
                                'Content-Type': 'multipart/form-data',
                                'Authorization': authToken(),
                        },
                });
                return response;

        } catch (error) {
                errorHandler(error);
        }
}

export async function removeSupplierImage(imageId) {
        try {
                const response = await axios.delete(`${API_URL}/supplier/images/${imageId}`, {
                        headers: {
                                'Authorization': authToken(),
                        },
                });
                return response.data;
        } catch (error) {
                errorHandler(error);
        }
}