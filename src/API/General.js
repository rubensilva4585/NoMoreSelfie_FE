import { API_URL } from '../constants/General';
import axios from 'axios';


// Districts
export async function getDistricts() {
        const response = await axios.get(`${API_URL}/general/districts/getalldistricts`);
        return response.data;
}
export async function getSupplierDistrictsById(id) {
        const response = await axios.get(`${API_URL}/supplier/requests/districts/${id}`);
        return response.data;
}

// Categories
export async function getCategories() {
        const response = await axios.get(`${API_URL}/general/categories/getallcategories`);
        return response.data;
}

// Requests
export async function submitRequest(request) {
        const response = await axios.post(`${API_URL}/supplier/storerequest`, request);
        return response.data;
}

// User / Supplier
export async function getUserById(id) {
        const response = await axios.get(`${API_URL}/user/${id}`);
        return response.data;
}

export async function getValidSuppliersList() {
        const response = await axios.get(`${API_URL}/suppliers/valid`);
        return response.data;
}

export async function getSupplierServicesById(id) {
        const response = await axios.get(`${API_URL}/supplier/${id}/services`);
        return response.data;
}

export async function getSupplierImagesById(id) {
        const response = await axios.get(`${API_URL}/supplier/${id}/images`);
        return response.data;
}