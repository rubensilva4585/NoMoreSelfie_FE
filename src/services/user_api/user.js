import axios from "axios";

const apiUrl = 'http://127.0.0.1:8000/api';

export async function getUserByID(id) {

    try {
        const [userData, profileData] = await Promise.all([
            axios.get(`${apiUrl}/users/${id}`),
            axios.get(`${apiUrl}/profiles/${id}`)
        ]);

        const user = {
            name: userData.data.name,
            email: userData.data.email,
            district_id: profileData.data.district_id,
            dob: profileData.data.dob,
            phone: profileData.data.phone,
        }
        return user;
    } catch (error) {
        console.error(error);
    }
}

export async function updateUser(userData, token) {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }

    return axios.put(`${apiUrl}/updateuser`, userData, { headers: headers })
        .then((response) => {
            return response.data;
        }).catch((error) => {
            console.error(error);
        });
}

export async function updateUserPassword(passwordData, token, updateError) {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }

    return axios.put(`${apiUrl}/updateuser/password`, passwordData, { headers: headers })
        .then((response) => {
            if (response.status == 400) {
                console.log(response.data.error);
                updateError('password', response.data.error);
            }
            if (response.status === 401) {
                console.log(response.data.error);
                updateError('password', response.data.error);
            }
            return response.data;
        }).catch((error) => {
            console.error(error);
        });
}
