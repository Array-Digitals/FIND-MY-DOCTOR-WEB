import axios from "axios";
import TokenService from "./token.service";
import { baseUrl } from "./baseUrl";

const contactUsService = () => {
    const { getToken, rememberGet } = TokenService();
    const token = getToken(rememberGet())
    // let newToken = token?.slice(1, -1); 
    let newToken = token; 
    
    // let newToken = token; 
    // console.log(newToken, 'tokennnn');
    // const baseUrl = 'https://fmd.arraydigitals.com/api';

    const contactUsPost = (data) => {
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${baseUrl}/contact/`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        return axios.request(config);
    }
    const newsLetter = (data) => {
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${baseUrl}/contact/news`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        return axios.request(config);
    }
   


    return {
        contactUsPost, newsLetter
    }

}
export default contactUsService