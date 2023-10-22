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