
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import TokenService from './token.service';
import { baseUrl } from './baseUrl';

const BookLabAPI = () => {
    const { getToken, rememberGet } = TokenService();
    const navigate = useNavigate();
    const token = getToken(rememberGet());
    let newToken = token;
    // let newToken = token?.slice(1, -1);
    // const baseUrl = 'https://fmd.arraydigitals.com/api';
    const getCities = () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${baseUrl}/cities/`,
        };
        return axios.request(config)
    }
    // const getLab = () => {
    //     let config = {
    //         method: 'get',
    //         maxBodyLength: Infinity,
    //         url: `${baseUrl}/labs/`,
    //     };
    //     return axios.request(config)
    // }
    const getLabByCity = (id) => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${baseUrl}/labs/by-city/${id}`,
        };
        return axios.request(config)
    }
    const getTestByLab = (id) => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${baseUrl}/lab/test/lab/${id}`,
        };
        return axios.request(config)
    }

    const labBookingAPI = (data) => {
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${baseUrl}/booking-lab/create`,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            },
            data: data
        };
        return axios.request(config)
    }

    return { getCities, getLabByCity, getTestByLab, labBookingAPI }
}

export default BookLabAPI