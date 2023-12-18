import { useNavigate } from "react-router-dom";
import { ROUTES, ROUTING } from "../utils/Routes";
import axios from 'axios'
import TokenService from "./tokenService";
import { baseUrl } from "./contants";
import axiosService from "./axiosInterceptor";

const DoctorService = () => {
    const { getToken } = TokenService();
    const { axios } = axiosService();


    const token = getToken()
    let newToken = token.slice(1, -1);
    // const baseUrl = 'https://fmd.arraydigitals.com/api';

    const getDoctorSingle = (doctorId) => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${baseUrl}/doctors/${doctorId}`,
        };
        return axios.request(config)
    }

    const updateDoctor = (data) => {
        let config = {
            method: 'patch',
            maxBodyLength: Infinity,
            url: `${baseUrl}/doctors/update`,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            },
            data: data
        };

        return axios.request(config)
    }
    const getActiveAppointment = () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${baseUrl}/appointments/doctor/active/`,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            }
        };
        return axios.request(config)
    }
    const getHistoryAppointment = () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${baseUrl}/appointments/doctor/history/`,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            }
        };
        return axios.request(config)
    }
    const getSpecialist = () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${baseUrl}/specialist-categories`,
        };
        return axios.request(config)
    }
    const getSingleSpecialist = (id) => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${baseUrl}/specialist-categories/${id}`,
        };
        return axios.request(config)
    }
    const getBookingDetails = (id) => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${baseUrl}/appointments/doctor/details/${id}`,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            }
        };
        return axios.request(config)
    }

    const getSingleType = (id) => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${baseUrl}/doctor-types/${id}`,
        };
        return axios.request(config)
    }
    const getDoctorType = () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${baseUrl}/doctor-types/`,
        };
        return axios.request(config)
    }
    const getDoctorReviews = (id) => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${baseUrl}/reviews/doctor/${id}`,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                // 'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN1bHQiOnsiaWQiOjIyOCwiZnVsbG5hbWUiOiIxMjMxMiIsImVtYWlsIjoiZmVAZ21haWwuY29tIiwicGhvbmUiOiIxMjMxMjMiLCJ0eXBlIjoyLCJzdGF0dXMiOjEsImlzdmVyaWZpZWQiOjAsImlzZGVsZXRlZCI6MSwiYWRkZWRhdCI6IjIwMjMtMDQtMjZUMDA6MzA6MTMuMDAwWiIsInVwZGF0ZWRhdCI6IjIwMjMtMDQtMjZUMDA6MzA6MTMuMDAwWiIsImdvb2dsZV9pZCI6bnVsbCwiZ29vZ2xlX2FjY2VzcyI6bnVsbH0sImlhdCI6MTcwMTg1Mzc1Nn0.CD1GcDszzZOaszbmPjA-kOvmbdxWAv5YzKPZ2z1gacU`,
                'Content-Type': 'application/json'
            }
        };
        return axios.request(config)
    }
    return { getDoctorReviews, getBookingDetails, getDoctorSingle, updateDoctor, getHistoryAppointment, getActiveAppointment, getSpecialist, getSingleSpecialist, getSingleType, getDoctorType }
}

export default DoctorService