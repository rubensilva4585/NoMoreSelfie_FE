import { base_url } from './base';
import axios from 'axios';

export async function getUserById(id) {
        const response = await axios.get(`${base_url}/user/${id}`);
        // console.log(response)
        return response.data;
}

export async function getSupplierServicesById(id) {
        const response = await axios.get(`${base_url}/user/${id}/services`);
        // console.log(response)
        return response.data;
}