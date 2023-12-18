import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import TokenService from './token.service';
import { baseUrl } from './baseUrl';

const BookDoctorAPI = () => {
    const { getToken, rememberGet } = TokenService();
    const navigate = useNavigate();
    const token = getToken(rememberGet())
    // let newToken = token?.slice(1, -1);
    let newToken = token;
    // console.log(newToken, 'newTokennaaa');
    // const baseUrl = 'https://fmd.arraydigitals.com/api';

    const getConsultation = () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${baseUrl}/consultation-type/`,
        };
        return axios.request(config)
    }
    const getSingleDoctor = (id) => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${baseUrl}/doctors/${id}`,
        };
        return axios.request(config)
    }

    const getAllDoctor = () =>{
        
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${baseUrl}/doctors/`,
        };
        return axios.request(config)
    }

    const getSpecilities = () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${baseUrl}/specialist-categories/`,
        };
        return axios.request(config)
    }

    
    const getSpecilitiesDoctor = (id) => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${baseUrl}/doctors/category/${id}/`,
        };
        return axios.request(config)
    }

    const onlineDoctorTimeAPI = (data) =>{
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${baseUrl}/doctors/available-slots`,
            data: data
        };

        return axios.request(config);
    }
    const getDoctorType = () =>{
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${baseUrl}/doctor-types/`,
        };
        return axios.request(config)
    }
    const doctorBookingApi = (data) =>{
        // console.log(newToken, 'tokeenn');
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${baseUrl}/booking-doctor/create`,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            },
            data: data
        };

        return axios.request(config);
    }

    return {newToken,getSingleDoctor, doctorBookingApi, onlineDoctorTimeAPI, getSpecilitiesDoctor, getConsultation, getSpecilities, getDoctorType, getAllDoctor }
}

export default BookDoctorAPI