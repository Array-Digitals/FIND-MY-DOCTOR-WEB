import axios from "axios";
import TokenService from "./tokenService";
import { baseUrl } from "./baseUrl";
import axiosService from "./axiosInterceptor";


const pharmacyService = () => {
    const { getToken } = TokenService();
    const { axios } = axiosService()

    // const baseUrl = 'https://fmd.arraydigitals.com/api';
    // const baseUrl = 'http://192.168.18.96:3000/api';

    const token = getToken()
    let newToken = token.slice(1, -1);


    const brandPost = data => {
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${baseUrl}/brands/create`,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            },
            data: data
        };
        return axios.request(config)
    }
    const brandUpdate = data => {
        let config = {
            method: 'patch',
            maxBodyLength: Infinity,
            url: `${baseUrl}/brands/update`,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            },
            data: data
        };
        return axios.request(config)
    }
    const categoryPost = (data) => {
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${baseUrl}/categories/`,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            },
            data: data
        };
        return axios.request(config)
    }
    const categoryUpdate = (data) => {
        let config = {
            method: 'patch',
            maxBodyLength: Infinity,
            url: `${baseUrl}/categories/`,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            },
            data: data
        };
        return axios.request(config)
    }
    const brandGet = () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${baseUrl}/brands/`,
        };
        return axios.request(config)
    }
    const categoriesGet = () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${baseUrl}/categories/`,
        };
        return axios.request(config)
    }

    const productPost = (data) => {
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${baseUrl}/products/`,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            },
            data: data
        };
        return axios.request(config)
    }
    const productUpdate = (data) => {
        let config = {
            method: 'patch',
            maxBodyLength: Infinity,
            url: `${baseUrl}/products/`,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            },
            data: data
        };
        return axios.request(config)
    }


    const ProductGet = data => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${baseUrl}/products/`,
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
    const getSingleCategory = (id) => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${baseUrl}/categories/${id}`,
        };
        return axios.request(config)
    }
    const getSingleBrand = (id) => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${baseUrl}/brands/${id}`
        };
        return axios.request(config)
    }



    const getOrderTracking = (data) => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${baseUrl}/appointments/pharmacy/track-order/${data}`,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            },
        };

        return axios.request(config)
    }
    const postOrderTracking = (data) => {
        // console.log(data, 'dasddddddd');
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${baseUrl}/appointments/pharmacy/change-status`,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            },
            data: data
        };

        return axios.request(config)
    }
    const postOrderCompletion = (data) => {
        // console.log(data, 'dasddddddd');
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${baseUrl}/appointments/pharmacy/post-for-admin/`,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            },
            data: data
        };

        return axios.request(config)
    }

    const getOrderCompletion = (id)=>{
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${baseUrl}/appointments/pharmacy/get-for-admin/${id}`,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            },
        };
    
        return axios.request(config)

    }

  

    const deleteProducts = (data) => {
        let config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: `${baseUrl}/products/delete`,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            },
            data: data
        };

        return axios.request(config)
    }
    const deleteBrands = (data) => {
        let config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: `${baseUrl}/brands/delete`,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            },
            data: data
        };

        return axios.request(config)
    }
    const deleteCategories = (data) => {
        let config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: `${baseUrl}/categories/`,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            },
            data: data
        };

        return axios.request(config)
    }
    const productActivity = (data) => {
        let config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: `${baseUrl}/products/activity`,
            headers: {
                'Authorization': `Bearer ${newToken}`,
                'Content-Type': 'application/json'
            },
            data: data
        };

        return axios.request(config)
    }


    return { productActivity,getOrderCompletion, postOrderCompletion, productUpdate, getSingleBrand, deleteBrands, deleteCategories, deleteProducts, postOrderTracking, getOrderTracking, getSingleCategory, brandUpdate, categoryUpdate, categoryPost, brandPost, brandGet, categoriesGet, productPost, ProductGet, getSingleProduct }
}
export default pharmacyService;