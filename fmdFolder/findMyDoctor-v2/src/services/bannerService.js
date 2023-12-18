import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import TokenService from './token.service';
import { baseUrl } from './baseUrl';

const BannerService = () => {
    const { getToken, rememberGet } = TokenService();
    const navigate = useNavigate();
    const token = getToken(rememberGet())
    // let newToken = token?.slice(1, -1);
    let newToken = token;
    // console.log(newToken, 'newTokennaaa');
    // const baseUrl = 'https://fmd.arraydigitals.com/api';

    const getBanners = (type) => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${baseUrl}/banner/${type}`,
        };
        return axios.request(config)
    }

 

    return { getBanners }
}

export default BannerService