import axios from "axios";
import TokenService from "./tokenService";
import { baseUrl } from "./baseUrl";
import AxiosSettings from "./axiosInterceptor";


const reportServices = () => {
    const { getToken } = TokenService();
    const token = getToken()
    let newToken = token.slice(1, -1);
    const { axios } = AxiosSettings();



    const doctorPhysicalReportGet = () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${baseUrl}/reports/physical/`,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            }
        };
        return axios.request(config)
    }
    const doctorOnlineReportGet = () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${baseUrl}/reports/online/`,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            }
        };
        return axios.request(config)
    }
    const doctorPatientsGet = (bookingId, doctorId) => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${baseUrl}/reports/${bookingId}/${doctorId}`,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            }
        };
        return axios.request(config)
    }
    const LabStatsReport = () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${baseUrl}/reports/labs-stat`,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            }
        };
        return axios.request(config)
    }
    const PharmacyStatsReport = (param) => {
        // console.log(param, 'paramss');
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${baseUrl}/reports/${param}`,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            }
        };
        return axios.request(config)
    }
    const InsuranceReport = () => {
        // console.log(param, 'paramss');
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${baseUrl}/reports/insurance`,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            }
        };
        return axios.request(config)
    }
    
    return { InsuranceReport, doctorPhysicalReportGet, doctorOnlineReportGet, doctorPatientsGet, LabStatsReport, PharmacyStatsReport }
}
export default reportServices;