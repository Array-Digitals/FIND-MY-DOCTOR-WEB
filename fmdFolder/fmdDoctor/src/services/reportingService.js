import { useNavigate } from "react-router-dom";
import { ROUTES, ROUTING } from "../utils/Routes";
import axios from 'axios'
import TokenService from "./tokenService";
import { baseUrl } from "./contants";

const ReportingService = () => {
    const { getToken } = TokenService();

    const token = getToken()
    let newToken = token.slice(1, -1);
 
    const getCompletedOrders = (id) => {
        // console.log(id, 'iddd');
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${baseUrl}/doc/dashboard/complete/${id}/`,
        };
        return axios.request(config)
    }
    const getInCompletedOrders = (id) => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${baseUrl}/doc/dashboard/incomplete/${id}/`,
        };
        return axios.request(config)
    }
 

    return { getInCompletedOrders , getCompletedOrders}
}

export default ReportingService