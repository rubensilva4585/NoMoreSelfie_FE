import { API_URL } from '../constants/General';
import axios from 'axios';

export async function getUserById(id) {
        const response = await axios.get(`${API_URL}/user/${id}`);
        // console.log(response)
        return response.data;
}

export async function getSupplierServicesById(id) {
        const response = await axios.get(`${API_URL}/supplier/${id}/services`);
        // console.log(response)
        return response.data;
}

export async function getSupplierImagesById(id) {
        const response = await axios.get(`${API_URL}/supplier/${id}/images`);
        // console.log(response)
        return response.data;
}

// distritos
export async function getDistricts() {
        const response = await axios.get(`${API_URL}/general/districts/getalldistricts`);
        return response.data;
}

export async function getSupplierDistrictsById(id) {
        const response = await axios.get(`${API_URL}/supplier/requests/districts/${id}`);
        return response.data;
}

export async function submitRequest(request) {
        const response = await axios.post(`${API_URL}/supplier/storerequest`, request);
        return response.data;
}