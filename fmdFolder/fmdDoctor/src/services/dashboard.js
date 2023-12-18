import { useNavigate } from "react-router-dom";
import { ROUTES, ROUTING } from "../utils/Routes";
import axios from 'axios'
import TokenService from "./tokenService";
import { baseUrl } from "./contants";

const DashboardService = () => {
    const { getToken } = TokenService();

    const token = getToken()
    let newToken = token.slice(1, -1);
 
    const getTotalPatients = (id) => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${baseUrl}/doc/dashboard/${id}/`,
        };
        return axios.request(config)
    }
    const getRemainingPatients = (id) => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${baseUrl}/doc/dashboard/remain/${id}/`,
        };
        return axios.request(config)
    }
    const getCuredPatient = (id) => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${baseUrl}/doc/dashboard/cured/${id}/`,
        };
        return axios.request(config)
    }
    const getTotalEarning = (id) => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${baseUrl}/doc/dashboard/earning/${id}/`,
        };
        return axios.request(config)
    }


    return { getTotalPatients, getRemainingPatients, getCuredPatient, getTotalEarning }
}

export default DashboardService