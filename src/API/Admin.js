import { API_URL, SESSION_TOKEN } from '../constants/General';
import axios from 'axios';

export const authToken = () => {
        return 'Bearer ' + localStorage.getItem(SESSION_TOKEN);
}

const errorHandler = (error) => {
        console.error('API Error:', error);
        throw error;
};


export async function getSuppliersList() {
        const response = await axios.get(`${API_URL}/admin/suppliers`, {
                headers: {
                        'Authorization': authToken(),
                },
        });
        return response.data;
}
export async function validateSupplier(formData, supplierId) {
        try {
                const response = await axios.post(`${API_URL}/admin/supplier/validate/${supplierId}`, formData, {
                        headers: {
                                'Authorization': authToken(),
                        },
                });
                return response.data;
        } catch (error) {
                errorHandler(error);
        }
}
