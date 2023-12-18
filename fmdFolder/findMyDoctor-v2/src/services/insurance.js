import axios from "axios";
import TokenService from "./token.service";
import { baseUrl } from "./baseUrl";

const InsuranceService = () => {
    const { getToken, rememberGet } = TokenService();
    const token = getToken(rememberGet())
    // let newToken = token?.slice(1, -1);
    let newToken = token;
    // const baseUrl = 'https://fmd.arraydigitals.com/api';

    const getAllProviders = () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${baseUrl}/insurace-providers`,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            },
        };

        return axios.request(config);
    }
    const getPackageByProvider = (id) => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${baseUrl}/insurance-plans/get-by-provider/${id}`,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            },
        };

        return axios.request(config);
    }
    const postInsuranceBooking = (data) => {
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${baseUrl}/booking-insurance/create`,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            },
            data:data
        };

        return axios.request(config);
    }
    const getUserInsuranceBooking = (id) => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${baseUrl}/booking-insurance/insured/${id}`,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            },
        };

        return axios.request(config);
    }
 


    return {
        getAllProviders, getPackageByProvider, postInsuranceBooking, getUserInsuranceBooking
    }

}
export default InsuranceService