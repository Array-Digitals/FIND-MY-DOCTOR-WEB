import axios from "axios";
import TokenService from "./token.service";
import { baseUrl } from "./baseUrl";

const PharmacyBuy = () => {
    const { getToken, rememberGet } = TokenService();
    const token = getToken(rememberGet())
    // let newToken = token?.slice(1, -1); 
    let newToken = token; 
    
    // let newToken = token; 
    // console.log(newToken, 'tokennnn');
    // const baseUrl = 'https://fmd.arraydigitals.com/api';

    const postPharmaBooking = (data) => {
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${baseUrl}/booking-pharmacy/create`,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            },
            data: data
        };

        return axios.request(config);
    }
    const getCategory = () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${baseUrl}/categories/`,
        };
        return axios.request(config)
    }
    const getBrand = () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${baseUrl}/brands/`,
        };
        return axios.request(config)
    }
    const getSingleProduct = (id) => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${baseUrl}/products/${id}`,
        };
        return axios.request(config)
    }
    const getFrequentlyBought = () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${baseUrl}/products/best/`,
        };
        return axios.request(config)
    }
    const getProductByBrand = () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${baseUrl}/products/by-best-brand/`,
        };
        return axios.request(config)
    }
    const getActivePharmBooking = () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            },
            url: `${baseUrl}/appointments/pharmacy/my-active`,
        };
        return axios.request(config)
    }
    const getHistoryPharmBooking = () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            },
            url: `${baseUrl}/appointments/pharmacy/my-history/`,
        };
        return axios.request(config)
    }
    const getCategoryProduct = (id) => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            },
            url: `${baseUrl}/products/category/${id}`,
        };
        return axios.request(config)
    }
    const getBrandProduct = (id) => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            },
            url: `${baseUrl}/products/brand/${id}`,
        };
        return axios.request(config)
    }
    const getSearchProduct = (name) => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            },
            url: `${baseUrl}/products/search/${name}`,
        };
        return axios.request(config)
    }


    return {
        getSearchProduct, getBrandProduct, getCategoryProduct, getFrequentlyBought, getCategory, getBrand, getProductByBrand, getSingleProduct, postPharmaBooking, getActivePharmBooking, getHistoryPharmBooking
    }

}
export default PharmacyBuy