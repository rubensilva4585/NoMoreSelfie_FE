import { API_URL, SESSION_TOKEN } from '../constants/General';
import axios from 'axios';

export const authToken = () => {
        return 'Bearer ' + localStorage.getItem(SESSION_TOKEN);
}

const errorHandler = (error) => {
        console.error('API Error:', error);
        throw error;
};


export async function getUser() {
        const response = await axios.get(`${API_URL}/user`, {
                headers: {
                        'Authorization': authToken(),
                },
        });
        return response.data;
}

export async function deleteUserAccount() {
        const response = await axios.delete(`${API_URL}/user`, {
                headers: {
                        'Authorization': authToken(),
                },
        });
        return response.data;
}

// User Settings
export async function updateUser(formData) {
        try {
                const response = axios.put(`${API_URL}/updateuser`, formData, {
                        headers: {
                                'Authorization': authToken(),
                        },
                });
                return response;
        } catch (error) {
                errorHandler(error);
        }
}
export async function updateUserPassword(formData) {
        try {
                const response = axios.put(`${API_URL}/updateuser/password`, formData, {
                        headers: {
                                'Authorization': authToken(),
                        },
                });
                return response;
        } catch (error) {
                errorHandler(error);
        }
}

export async function updateProfileImage(formData) {
        try {
                const response = axios.post(`${API_URL}/updateuser/avatar`, formData, {
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

export async function removeProfileImage() {
        try {
                const response = await axios.delete(`${API_URL}/updateuser/avatar`, {
                        headers: {
                                'Authorization': authToken(),
                        },
                });
                return response.data;
        } catch (error) {
                errorHandler(error);
        }
}

// Images
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


