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

export async function getSupplierDistricts() {
        const response = await axios.get(`${API_URL}/supplier/requests/districts/`, {
                headers: {
                        'Authorization': authToken(),
                },
        });
        return response.data;
}

export async function getSupplierRequests() {
        const response = await axios.get(`${API_URL}/supplier/requests`, {
                headers: {
                        'Authorization': authToken(),
                },
        });
        return response.data;
}

export async function getUserFavorites() {
        const response = await axios.get(`${API_URL}/favorites`, {
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

export async function updateUserDistricts(districtsIds) {
        try {
                const response = axios.put(`${API_URL}/updateuser/districts`, { district_ids: districtsIds }, {
                        headers: {
                                'Authorization': authToken(),
                        },
                });
                return response;

        } catch (error) {
                errorHandler(error);
        }
}

export async function addUserFavorites(favoriteId) {
        try {
                const response = axios.post(`${API_URL}/favorites/add`, { supplier_id: favoriteId }, {
                        headers: {
                                'Authorization': authToken(),
                        },
                });
                return response;

        } catch (error) {
                errorHandler(error);
        }
}

export async function removeUserFavorites(favoriteId) {
        try {
                const response = axios.post(`${API_URL}/favorites/remove`, { supplier_id: favoriteId }, {
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


export async function getSupplierServices() {
        const response = await axios.get(`${API_URL}/supplier/services`, {
                headers: {
                        'Authorization': authToken(),
                },
        });
        return response.data;
}

export async function updateSupplierServices(services) {
        try {
                const response = axios.put(`${API_URL}/supplier/services`, services, {
                        headers: {
                                'Authorization': authToken(),
                        },
                });
                return response;
        } catch (error) {
                errorHandler(error);
        }
}